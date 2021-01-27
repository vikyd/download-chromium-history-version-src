module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? 'https://vikyd.github.io/download-chromium-history-version/'
      : '/',
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
  },
}
