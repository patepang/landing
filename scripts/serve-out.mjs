// Serves the static export in out/ the way a plain static host would: files as they are, `/` as
// index.html, `/name` as name.html, and anything else as 404.html with status 404. No
// dependencies, local only. Usage: node scripts/serve-out.mjs [dir]  (PORT, HOST env overrides)
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
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

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
  const file = await findFile(url.pathname);
  const path = file ?? join(root, '404.html');
  try {
    const body = await readFile(path);
    response.writeHead(file ? 200 : 404, {
      'content-type': types[extname(path)] ?? 'application/octet-stream',
      'cache-control': 'no-store',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Nothing to serve yet: run `pnpm build` first.\n');
  }
}).listen(port, host, () => {
  console.log(`Serving ${root} at http://${host}:${port}`);
});
