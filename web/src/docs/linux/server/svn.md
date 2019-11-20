## 防火墙设置
``` bash
# 添加SVN端口
firewall-cmd --permanent --zone=public --add-port=3690/tcp
# 重启防火墙
firewall-cmd --reload
```

## 安装
``` bash
# CentOS
yum install subversion
$ Ubuntu
apt-get install subversion
```

## 配置
### 1) 创建版本库
``` bash
# SVN版本目录
mkdir /home/svn/ && cd /home/svn/
 # 创建webmis版本库
svnadmin create webmis
```

### 2) 添加帐号密码
``` bash
vi webmis/conf/passwd
```
[users]<br>
user = webmis654321<br>

### 3) 配置权限
``` bash
vi webmis/conf/authz
```
[/]<br>
user= rw<br>

### 4) 配置服务
``` bash
vi webmis/conf/svnserve.conf
```
anon-access = none  # 关闭匿名访问<br>
auth-access = write  # 权限用户可读写<br>
password-db = password  # 开启用户<br>
authz-db = authz  # 开启权限<br>
realm = My First Repository  # 提示信息<br>

## 启动SVN服务
``` bash
svnserve -d -r /home/svn
```

## 客户端检出
``` bash
svn checkout svn://IP/webmis/
```

## 提交时自动更新网站
``` bash
cd webmis/hooks/
cp post-commit.tmpl post-commit
chmod -R 777 post-commit
vi post-commit
```

### post-commit 文件内容
``` bash
#!/bin/sh
export LANG=en_US.UTF-8
svn update /home/www/webmis --username=user --password=webmis654321 --non-interactive
chmod -R 777 /home/www/webmis/*
```

## 常见问题
### Database is locked
``` bash
# 进入SVN目录
cd .svn
# 拷贝
mv wc.db wc.db.old
# 打开数据库
sqlite3 wc.db.old
# 备份数据
sqlite> .backup main wc.db
# 退出
sqlite> .exit
```
