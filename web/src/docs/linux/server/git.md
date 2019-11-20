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

## 二、仓库
``` bash
# 目录
mkdir /home/git && cd /home/git

# 初始化仓库
git init --bare webmis.git

# 修改所属
chown -R gituser:gitgroup webmis.git

# 检出
git clone gituser@IP:/home/git/webmis.git
```

