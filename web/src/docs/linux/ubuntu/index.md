## 关闭SELinux
``` bash
vi /etc/selinux/config
```
SELINUX=disabled

## 升级系统
``` bash
# Desktop版
sudo update-manager -d
Server版
sudo do-release-upgrade -d
```

## 双网卡配置
``` bash
# The primary network interface
auto eth0
iface eth0 inet static
	address 222.56.42.xxx
	netmask 255.255.255.xxx
	gateway 222.56.42.xxx
		dns-nameservers 211.98.72.8 211.98.2.4
auto eth2
iface eth2 inet static
	address 192.168.1.248
	netmask 255.255.255.0
```

## 查看DNS
``` bash
cat /etc/resolv.conf
```
nameserver 211.98.72.8<br/>
nameserver 211.98.2.4<br/>

## 修改计算机名
``` bash
# 计算机名
echo webserver.ksphp.com > /etc/hostname
/etc/init.d/hostname restart
# 查看
hostname
hostname -f
# 重新加载网络
/etc/init.d/networking restart
```
