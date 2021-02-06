module.exports = {
  publicPath: process.env.NODE_ENV === 'production'?'./':'/',
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    // 项目配置
    config.plugin('html').tap(args => {
      args[0].title = 'WebMIS-VueAPP'
      args[0].keywords = 'WebMIS,Vue混合型APP'
      args[0].description = 'WebMIS全栈开发基础框架.技术,PHP,Python,SpringBoot,Phalcon,Flutter,NodeJS,Vue,Socket,Redis,API'
      return args
    })
  }
}