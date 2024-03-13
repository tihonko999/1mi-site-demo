// /**
//  * @type {import('next').NextConfig}
//  **/
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  async rewrites() {
    const rewrites = [
      // prometheus
      {
        source: "/metrics",
        destination: "/api/metrics",
      },
    ];

    const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN;
    if (domain) {
      rewrites.push({
        source: "/attachments/:path*",
        destination: `https://${domain}/attachments/:path*`,
      });
    }
    return rewrites;
  },
});
