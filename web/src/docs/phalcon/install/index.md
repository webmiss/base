# WebMIS-Phalcon
采用PHP7+Phalcon4开发，包括HMVC模块化管理、自动路由、CLI命令行、Socket通信、redis缓存、Token机制等功能，提供支付宝、微信、文件上传、图像处理、二维码等常用类。
- 网站-API( [https://demo-php.webmis.vip/](https://demo-php.webmis.vip/) )
- 前端-API( [https://demo-php.webmis.vip/api/](https://demo-php.webmis.vip/api/) )
- 后台-API( [https://demo-php.webmis.vip/admin/](https://demo-php.webmis.vip/admin/) )

<br/>

## 一、下载
```bash
git clone https://github.com/webmiss/base.git --depth=1
```
- WebMIS-Base > phalcon
- 网站根目录: public下创建upload目录，修改权限为777
- 数据库: project/database/data.sql
- 修改密码: user表password字段，md5加密即可
- 管理员账号: admin 密码:123456

<br/>

## 二、运行
#### Bash命令
```bash
# 依赖包
./shell install
# 运行
./shell serve
# 数据库工具
./shell adminer
```

#### Php命令
```bash
# 依赖包
composer install
# 运行
cd public
php -S 127.0.0.1:9010
# 数据库工具
php -S 127.0.0.1:8080 adminer.php
```

<br/><br/>