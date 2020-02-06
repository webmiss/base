## 一、安装
``` bash
yum install git -y
```
### 创建用户组
``` bash
groupadd gitgroup
```
### 创建用户
``` bash
useradd -G gitgroup -M gituser
```
### 修改密码
``` bash
passwd gituser
```
### 禁止登录
``` bash
vi /etc/passwd
```
gituser:x:1001:1001:,,,:/home/git:/usr/bin/git-shell

## 二、仓库
``` bash
# 目录
mkdir /home/git && cd /home/git

# 权限组
chown -R nobody:nobody /home/git
# 用户组
chgrp -R gitgroup /home/git/
# 权限
chmod -R 777 /home/git

# 初始化仓库
git init --bare webmis.git

# 修改所属
chown -R gituser:gitgroup webmis.git

# 检出
git clone gituser@IP:/home/git/webmis.git
```

## 三、自动更新
``` bash
vi /home/git/webmis.git/hooks/post-update
```
cd /home/www/项目 && sshpass -p '密码' git pull
