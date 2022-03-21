## 软件仓库
```bash
# Epel源
dnf install epel-release -y
# PHP7.4
dnf install http://rpms.remirepo.net/enterprise/remi-release-8.rpm -y
```

## 交换空间
```bash
# 查看
swapon --show
free -m
# 创建
fallocate -l 8G /swapfile
# 权限
chmod 600 /swapfile
# 设置、激活
mkswap /swapfile
swapon /swapfile
# 开机挂载
vi /etc/fstab
```
- 末尾添加"/swapfile swap swap defaults 0 0"
#### 阿里云服务器
```bash
vi /etc/sysctl.conf
```
- vm.swappiness = 60
- reboot

## 防火墙( Firewall )
```bash
# 开机启动
systemctl enable firewalld
# 启动
systemctl start firewalld
# 重启
firewall-cmd --reload
```

#### 1) 服务
```bash
# 允许
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https
firewall-cmd --permanent --zone=public --add-service=mysql
# 禁用
firewall-cmd --permanent --zone=public --remove-service=mysql
```

#### 2) 端口
```bash
# 允许
firewall-cmd --permanent --zone=public --add-port=8080/tcp
# 禁用
firewall-cmd --permanent --zone=public --remove-port=8080/tcp
```

#### 3) 查看
```bash
# 所以规则
firewall-cmd --zone=public --list-all
# 永久选项所支持的服务
firewall-cmd --permanent --get-services
# 支持的永久区域
firewall-cmd --permanent --get-zones
# 默认区域
firewall-cmd --get-default-zone
# 服务状态
firewall-cmd --query-service=http
```