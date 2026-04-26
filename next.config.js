/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        ...(config.watchOptions || {}),
        ignored: [
          '**/.next/**',
          '**/node_modules/**',
          '**/*.log',
          '**/tsconfig.tsbuildinfo',
          '**/database.json'
        ],
        poll: 1000,
        aggregateTimeout: 300
      }
    }

    if (!dev && !isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false
      }
    }

    return config
  }
}

module.exports = nextConfig
