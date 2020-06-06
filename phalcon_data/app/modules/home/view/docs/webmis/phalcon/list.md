```javascript
phalcon
  |--app  //源文件
    |--config
    |--controller //公共控制器
    |--library  //自定义库
    |--model  //公共模型
    |--modules  //模块
      |--admin  //后台Api
      |--api  //前端Api
      |--home //MVC网站
    |--tasks  //Cli目录
      |--MainTask.php //默认入口
      |--SocketTask //Socket
      |--TaskBase //公共类
  |--public //资源根目录
  |--vendor //第三方类库
  composer.json //Composer配置文件
```