/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // better-sqlite3 is a native module; keep it external to the server bundle.
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
  // Redirect "/" to the default locale at the routing layer. A page-level
  // redirect() gets prerendered and served from cache as a 307 without a
  // Location header, which crawlers (Google Search Console) can't follow.
  async redirects() {
    return [{ source: "/", destination: "/bs", permanent: false }];
  },
};

export default nextConfig;
