/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  env: {
    MONGO_URI: process.env.MONGO_URI,
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,

  },
}

module.exports = nextConfig
