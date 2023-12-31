/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader"
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app-ocxcquangtr3n3frprod.cms.optimizely.com',
        pathname: '/contentassets/**'
      },
      {
        protocol: 'https',
        hostname: '*.cmp.optimizely.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
      }
    ],
    dangerouslyAllowSVG: true,
  }
}

module.exports = nextConfig
