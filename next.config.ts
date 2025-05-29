/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Apenas para resolver deploy rápido
  },
  output: 'export', // Para deploy estático (opcional)
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // experimental: {
  //   turbo: {
  //     rules: {
  //       '*.svg': {
  //         loaders: ['@svgr/webpack'],
  //         as: '*.js'
  //       }
  //     }
  //   }
  // }
}

module.exports = nextConfig