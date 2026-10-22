import type { NextConfig } from 'next';

/**
 * The landing is a single static page: `next build` writes plain HTML, CSS and JS to `out/`,
 * which any static file host can serve. Nothing here needs a Node.js server at runtime.
 */
const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
};

export default nextConfig;
