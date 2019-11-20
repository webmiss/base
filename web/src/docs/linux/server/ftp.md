## FTP服务器
FTP 是File Transfer Protocol（文件传输协议）的英文简称，而中文简称为“文传协议”。用于Internet上的控制文件的双向传输。同时，它也是一个应用程序（Application）。基于不同的操作系统有不同的FTP应用程序，而所有这些应用程序都遵守同一种协议以传输文件。在FTP的使用当中，用户经常遇到两个概念："下载"（Download）和"上传"（Upload）。"下载"文件就是从远程主机拷贝文件至自己的计算机上；"上传"文件就是将文件从自己的计算机中拷贝至远程主机上。用Internet语言来说，用户可通过客户机程序向（从）远程主机上传（下载）文件。
### 1) 防火墙设置
``` bash
# 添加FTP服务
firewall-cmd --permanent --zone=public --add-service=ftp
# 重启防火墙
firewall-cmd --reload
# 查看是否允许
firewall-cmd --query-service=ftp
```

### 2) 安装PureFTP
``` bash
yum install pure-ftpd openssl
```

### 3) 配置
``` bash
vi /etc/pure-ftpd/pure-ftpd.conf
```
    # 虚拟用户数据
    PureDB /etc/pure-ftpd/pureftpd.pdb
    # 上传文件权限为777
    Umask 000:000
    # SSL加密
    TLS 0

### 4) 启动服务
``` bash
# 开机启动
systemctl enable pure-ftpd
# 启动
systemctl start pure-ftpd
```

### 5) 创建FTP系统用户
``` bash
# 创建用户组
groupadd ftpgroup
# 添加FTP用户
useradd -g ftpgroup -d /dev/null -s /etc ftpuser
```

### 6) 添加虚拟用户
``` bash
# 虚拟用户'mvc'
(echo 密码; echo 确认秘密) | pure-pw useradd mvc -u ftpuser -d /home/www/mvc
# 刷新数据
pure-pw mkdb
# 创建FTP目录
mkdir -p /home/www/mvc
# 修改所属
chown -R ftpuser:ftpgroup /home/www/mvc
# 修改权限
chmod -R 755 /home/www/mvc
# 重启服务
systemctl restart pure-ftpd
```

### 7) 客户端登陆FTP
打开文件夹 地址栏输入“ftp://服务器IP”（注意：点击右键“登陆”）

### 8) 其他操作
``` bash
# 查看用户信息
pure-pw show test
# 修改密码
pure-pw passwd test
# 删除用户
pure-pw userdel test
pure-pw mkdb
```

### 9) SSL认证方式
``` bash
vi /etc/pure-ftpd/pure-ftpd.conf
```
改成 TLS 1
**生成加密证书**
``` bash
# 创建目录
mkdir -p /etc/ssl/private
# 生成证书
openssl req -x509 -nodes -days 7300 -newkey rsa:2048 -keyout /etc/ssl/private/pure-ftpd.pem -out /etc/ssl/private/pure-ftpd.pem
```
- Country Name (2 letter code) [XX]: <-- 国家 "CN"
- State or Province Name (full name) []: <-- 省份 "YN"
- Locality Name (eg, city) [Default City]: <-- 城市 "KunMing"
- Organization Name (eg, company) [Default Company Ltd]: <-- 公司名称 "WebMIS"
- Organizational Unit Name (eg, section) []: <-- 公司名称
- Common Name (eg, your name or your server's hostname) []: <--主机名 "server1.example.com"
- Email Address []: <-- 邮箱地址
**重启服务**
``` bash
# 修改权限
chmod 600 /etc/ssl/private/pure-ftpd.pem
# 重启服务
systemctl restart pure-ftpd
```