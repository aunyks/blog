module.exports = {
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: false
  },
  webpack: (config) => {
    return Object.assign({}, config, {
      experiments: { asyncWebAssembly: true }
    })
  }
}
