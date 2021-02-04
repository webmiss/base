module.exports = {
  publicPath: process.env.NODE_ENV === 'production'?'./':'/',
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    // 项目配置
    config.plugin('html').tap(args => {
      args[0].title = 'WebMIS-后台框架'
      args[0].keywords = 'WebMIS,Vue后台框架'
      args[0].description = 'WebMIS全栈开发基础框架.技术,PHP,Python,SpringBoot,Phalcon,Flutter,NodeJS,Vue,Swoole,Redis,API'
      return args
    })
  }
}