# WebMIS-Java
采用Java + SpringBoot开发，包括HMVC模块化管理、Token验证、Redis缓存等
- 网站-API( [https://demo-java.webmis.vip/](https://demo-java.webmis.vip/) )
- 前端-API( [https://demo-java.webmis.vip/api/](https://demo-java.webmis.vip/api/index) )
- 后台-API( [https://demo-java.webmis.vip/admin/](https://demo-java.webmis.vip/admin/index) )

<br/>

## 一、下载
```bash
git clone https://github.com/webmiss/base.git --depth=1
```
- WebMIS-Base > java
- 网站根目录: public下创建upload目录，修改权限为777
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
# 打包
./bash build
```

#### Cmd命令
```bash
# 依赖包
.\cmd.bat install
# 运行
.\cmd.bat serve
# 打包
.\cmd.bat build
```

<br/><br/>