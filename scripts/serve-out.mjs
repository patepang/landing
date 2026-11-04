// Serves the static export in out/ the way the production host does: files as they are, `/` as
// index.html, `/name` as name.html, anything else as 404.html with status 404, and the headers and
// redirects of vercel.json, so the tests run under the real Content-Security-Policy. No
// dependencies, local only. Usage: node scripts/serve-out.mjs [dir]  (PORT, HOST env overrides)
import { existsSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';

const root = resolve(process.argv[2] ?? 'out');
const port = Number(process.env.PORT ?? 4173);
const host = process.env.HOST ?? '127.0.0.1';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

/**
 * The subset of Vercel's path patterns that vercel.json uses: literal paths and `(.*)`. Anything
 * else stops the server, so the file can never use a rule this emulation would get wrong.
 */
function matcher(source) {
  const literal = source.split('(.*)');
  if (literal.some((part) => /[:*+?()[\]{}]/.test(part))) {
    throw new Error(`serve-out: unsupported vercel.json source ${source}`);
  }
  const escaped = literal.map((part) => part.replace(/[.\\^$|/]/g, '\\$&'));
  return new RegExp(`^${escaped.join('.*')}$`);
}

const config = existsSync('vercel.json') ? JSON.parse(readFileSync('vercel.json', 'utf8')) : {};
const redirects = (config.redirects ?? []).map((rule) => ({ ...rule, test: matcher(rule.source) }));
const headerRules = (config.headers ?? []).map((rule) => ({ ...rule, test: matcher(rule.source) }));

/** Every header whose rule matches `pathname`; a later rule wins over an earlier one. */
function headersFor(pathname) {
  const headers = {};
  for (const rule of headerRules) {
    if (!rule.test.test(pathname)) continue;
    for (const { key, value } of rule.headers) headers[key.toLowerCase()] = value;
  }
  return headers;
}

async function findFile(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  const clean = normalize(decoded);
  const candidates = clean.endsWith(sep)
    ? [join(clean, 'index.html')]
    : [clean, `${clean}.html`, join(clean, 'index.html')];
  for (const candidate of candidates) {
    const file = join(root, candidate);
    if (file !== root && !file.startsWith(root + sep)) continue;
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {
      // Not this candidate; try the next.
    }
  }
  return null;
}

createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', 'http://localhost');
  const redirect = redirects.find((rule) => rule.test.test(url.pathname));
  if (redirect) {
    response.writeHead(redirect.permanent === false ? 307 : 308, {
      ...headersFor(url.pathname),
      location: redirect.destination,
    });
    response.end();
    return;
  }
  const file = await findFile(url.pathname);
  const path = file ?? join(root, '404.html');
  try {
    const body = await readFile(path);
    response.writeHead(file ? 200 : 404, {
      'content-type': types[extname(path)] ?? 'application/octet-stream',
      'cache-control': 'no-store',
      ...headersFor(url.pathname),
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Nothing to serve yet: run `pnpm build` first.\n');
  }
}).listen(port, host, () => {
  console.log(`Serving ${root} at http://${host}:${port}`);
});
