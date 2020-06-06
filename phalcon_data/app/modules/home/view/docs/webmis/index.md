
## WebMIS
基于Phalcon全套前端分离开发方案，包括MVC框架、后台管理、Web、WebAPP、Flutter、微信小程序、API接口工具等，整套框架只封装基础功能，对于使用者还需具备扎实的计算机编程基础和设计模式。

## 一、下载项目
``` bash
git clone https://github.com/webmiss/base
```

## 二、目录结构
### 1、基础系统后台(Vue)

### 2、数据中心后台(Vue)
``` javascript
admin_data
  |--public //公共资源
  |--src //源文件
```
### 3、支付宝小程序
``` javascript
aliapp
  |--assets //静态资源
  |--components //组件
  |--libray //自定义库
  |--pages  //视图
  app.js  //入口
  env.js  //配置文件
  store.js  //全局状态
```
### 4、API接口工具(Vue)
``` javascript
api
  |--public //公共资源
  |--src //源文件
    |--assets //静态资源
    |--components //组件
    |--views  //视图
    config.js //接口菜单
```
### 5、Flutter APP(Hybrid)
``` javascript
flutter //Hybrid App(Flutter)
  |--android  //Android配置
  |--ios  //Ios配置
```
### 6、基础系统(API)

### 7、数据中心(API)
``` javascript
phalcon_data
  |--app  //源文件
  |--public //资源根目录
  |--vendor //第三方类库
  composer.json //Composer配置文件
```
