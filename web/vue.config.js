module.exports = {
  publicPath: process.env.NODE_ENV === 'production'?'/':'/',
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    // 项目配置
    config.plugin('html').tap(args => {
      args[0].title = 'WebMIS 全栈开发基础框架'
      args[0].keywords = 'WebMIS,全栈开发基础框架'
      args[0].description = 'WebMIS全栈开发基础框架.技术,PHP,Python,SpringBoot,Iris,Phalcon,Flutter,NodeJS,Vue,Socket,Redis,API'
      return args
    })
    // 加载Markdown文件
    config.module.rule('md').test(/.md$/).use('text-loader').loader('text-loader').end()
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production';
      // 打包体积配置
      config["performance"] = {
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  }
}