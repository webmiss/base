# WebMIS-Phalcon
采用PHP7+Laveral、Phalcon4开发，包括HMVC模块化管理、自动路由、CLI命令行、Socket通信、redis缓存、Token机制等功能，提供支付宝、微信、文件上传、图像处理、二维码等常用类。

**PHP**
- 网站-API( [https://php.webmis.vip/](https://php.webmis.vip/) )
- 前端-API( [https://php.webmis.vip/api/](https://php.webmis.vip/api/) )
- 后台-API( [https://php.webmis.vip/admin/](https://php.webmis.vip/admin/) )

**Phalcon**
- 网站-API( [https://phalcon.webmis.vip/](https://phalcon.webmis.vip/) )
- 前端-API( [https://phalcon.webmis.vip/api/](https://phalcon.webmis.vip/api/) )
- 后台-API( [https://phalcon.webmis.vip/admin/](https://phalcon.webmis.vip/admin/) )


<br/>

## 一、下载
```bash
# 克隆仓库
git clone https://github.com/webmiss/base.git --depth=1
# 修改权限(linux)
cd php
chmod -R 777 public
```
- 项目: WebMIS-Base > php, phalocn
- 数据库: project/database/data.sql
- 修改密码: user表password字段，md5加密即可
- 管理员账号: admin 密码:123456

<br/>

## 二、运行
#### Bash命令
```bash
# 依赖包
./bash install
# 运行
./bash serve
# 数据库工具
cd ../tools
./bash adminer
```

#### Cmd命令
```bash
# 依赖包
.\cmd install
# 运行
.\cmd serve
# 数据库工具
cd ../tools
.\cmd adminer
```

<br/><br/>