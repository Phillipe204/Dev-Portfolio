module.exports = {
  allowedDevOrigins: ['*.spock.repl.co', '*.replit.dev'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  turbopack: {},
}
