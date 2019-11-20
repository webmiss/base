module.exports = {
  publicPath: process.env.NODE_ENV === 'production'?'./':'/',
  lintOnSave: false,
  // 模块配置
  chainWebpack: config => {
    config.module
    .rule('md').test(/.md$/).use('text-loader').loader('text-loader').end()
  }
}