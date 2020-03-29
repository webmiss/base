# WebMIS
基于Phalcon全套前端分离开发方案，包括MVC框架、后台管理、Web、WebAPP、Flutter、微信小程序、API接口工具等，整套框架只封装基础功能，对于使用者还需具备扎实的计算机编程基础和设计模式。
```bash
git clone https://github.com/webmiss/base
```

## 一、Phalcon后台框架
主要为每个客户端提供接口验证和数据，需要安装扩展如下：
- PHP-FPM PHP环境
- Phalcon C扩展编写的PHP框架
- Swoole 消息推送
- Redis 缓存数据库
- MariaDB 主数据库

可以参考： Linux文档 > CentOS > Nginx+PHP+Mariadb

### 1) 创建用户、导入数据库
数据库文件: phalcon/mvc_vue.sql

### 2) Nginx配置
配置参考文件: phalcon/nginx.conf

### 3) Socket消息推送
https://api.webmis.vip/api/index/socket


## 二、Admin后台管理
多用户、多权限、多角色管理，必要时可打包成APP自动更新
```bash
# 进入目录
cd admin
# 安装依赖
yarn install
# 运行
yarn serve
```
### 在线体验( https://admin.webmis.vip 帐号: admin 密码: 123456 )

## 三、Web前端
多年开发总结的技术文档，包括工具安装、Linux服务器配置等
```bash
# 进入目录
cd web
# 安装依赖
yarn install
# 运行
yarn serve
```
### 在线体验( https://webmis.vip )

## 四、WebAPP混合型
使用Vue路由模拟手机页面切换效果，HBuilder打包和访问原生功能
```bash
# 进入目录
cd webapp
# 安装依赖
yarn install
# 运行
yarn serve
```
### 在线体验( https://webapp.webmis.vip/ )

## 五、Wechat微信小程序
图片压缩、高德地图、定位、socket消息推送、客服消息、支付、本地硬盘等
```bash
# 进入目录
cd wechat
```

## 六、Flutter
图片裁切、图片压缩、请求相应、高德地图、本地硬盘等
```bash
# 进入目录
cd flutter
# 安装依赖
flutter pub get
# 运行
flutter run
```

## 七、API接口请求工具
docs > src > config.js 添加接口
```bash
# 进入目录
cd api
# 安装依赖
yarn install
# 运行
yarn serve
```

## 八、Project项目资料
APP设计标准和开发文档
```bash
# 进入目录
cd project
```
