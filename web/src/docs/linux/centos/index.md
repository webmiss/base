## 关闭SELinux
``` bash
vi /etc/selinux/config
```
SELINUX=disabled

### 开启防火墙
``` bash
# CentOS 6
system-config-firewall-tui
# CentOS 7
systemctl start firewalld
```

## 软件源
### 添加Epel源
``` bash
# CentOS 6
rpm -Uvh http://download.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
# CentOS 7
yum install epel-release
```

## 更新服务器时间
``` bash
# 查看时间
date
# 在线更新时间
ntpdate time.daruizi.com
# 将时间同步到BIOS
hwclock -w
```

## Yum软件管理
``` bash
# 安装记录
cat /var/log/yum.log

# 查看事务
yum history list
yum history info N

# 重做
yum history redo N

# 回滚
yum history undo N
```

## 双网卡配置
### 外网配置
``` bash
vi /etc/sysconfig/network-scripts/ifcfg-eth0
```
ONBOOT=yes<br>
BOOTPROTO=none # dhcp自动获取<br>
IPADDR=222.56.42.154<br>
NETMASK=255.255.255.192<br>
GATEWAY=222.56.42.129<br>
DNS1=211.98.72.7<br>
DNS2=211.98.72.8<br>

### 内网配置
``` bash
vi /etc/sysconfig/network-scripts/ifcfg-eth2
```
ONBOOT=yes<br>
BOOTPROTO=none # dhcp自动获取<br>
IPADDR=192.168.1.248<br>
NETMASK=255.255.255.0<br>

## 常用网络命令
``` bash
# 安装网络工具包
yum install net-tools -y
# 查看网络
ifconfig
# 加载网卡eth0
ifconfig eth0 up
```

### 重启网络
``` bash
# CentOS 6
service network restart
# CnetOS 7
systemctl restart network
```
