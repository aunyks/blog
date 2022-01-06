module.exports = {
  swcMinify: true,
  webpack: (config) => {
    return Object.assign({}, config, {
      experiments: { asyncWebAssembly: true }
    })
  }
}
