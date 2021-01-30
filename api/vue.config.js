const Env = require('./src/env');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'?'./':'/',
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    // 项目配置
    config.plugin('html').tap(args => {
      args[0].title = Env.title
      args[0].keywords = Env.keywords
      args[0].description = Env.description
      return args
    })
  }
}