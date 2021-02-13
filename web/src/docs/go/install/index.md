# WebMIS-Golang
采用Go + Iris开发，包括HMVC模块化管理、Token验证、Redis缓存等
- 网站-API( [https://demo-go.webmis.vip/](https://demo-go.webmis.vip/) )
- 前端-API( [https://demo-go.webmis.vip/api/](https://demo-go.webmis.vip/api/index) )
- 后台-API( [https://demo-go.webmis.vip/admin/](https://demo-go.webmis.vip/admin/index) )

<br/>

## 一、下载
```bash
git clone https://github.com/webmiss/base
```
- WebMIS-Base > golang
- 网站根目录: public下创建upload目录，修改权限为777
- 数据库: project/database/data.sql
- 修改密码: user表password字段，md5加密即可
- 管理员账号: admin 密码:123456

<br/>

## 二、运行
#### Bash命令
```bash
# 依赖包
./webmis.sh install
# 运行
./webmis.sh serve
# 打包
./webmis.sh build
```

#### Go命令
```bash
# 依赖包
go get -v
# 运行
go run main.go
# 打包
 go build
```

<br/><br/>