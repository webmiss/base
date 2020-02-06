## 安装PPPOE
``` bash
# CentOS
yum install ppp rp-pppoe
```

### 允许本地验证
``` bash
vi /etc/ppp/options
#lock local
```

### 添加DNS
``` bash
vi /etc/ppp/pppoe-server-options

#require-pap
require-chap # 使用chap验证
login
lcp-echo-interval 10
lcp-echo-failure 2
ms-dns 8.8.8.8
ms-dns 8.8.4.4
```

### 帐号密码
``` bash
vi /etc/ppp/chap-secrets

# Client Server Passwd IP
admin pptpd 654321 *
```

### 启动服务
``` bash
pppoe-server -I eth2 -L 192.168.10.1 -R 192.168.10.5 -N 245
```
I : 指定响应PPPOE请求的端口<br>
L : PPPOE服务器的IP地址<br>
R : 分配给客户端IP地址,从192.168.10.5开始<br>
N : IP地址递增几个, 192.168.10.5-250<br>

## 开启IP转发功能
``` bash
vi /etc/sysctl.conf
```
net.ipv4.ip_forward = 1
``` bash
sysctl -p
```

## 防火墙配置
### 1) Firewalld
``` bash
# 添加包转发
firewall-cmd --permanent --direct --add-rule ipv4 filter POSTROUTING 0 -t nat -s 192.168.10.0/24 -o eth0 -j MASQUERADE

# 重启防火墙
firewall-cmd --reload
```

### 2) Iptables
``` bash
# 添加包转发
iptables -t nat -A POSTROUTING -s 192.168.10.0/24 -o eth0 -j MASQUERADE
service iptables save
```

### 限制速度(10/sec 大概30kb/s)
``` bash
vi /etc/sysconfig/iptables
```
-A FORWARD -s 192.168.10.4 -m limit --limit 10/sec -j ACCEPT<br>
-A FORWARD -s 192.168.10.4 -j DROP<br>
-A FORWARD -s 192.168.10.120 -m limit --limit 20/sec -j ACCEPT<br>
-A FORWARD -s 192.168.10.120 -j DROP<br>
``` bash
# 重启服务
service iptables restart
service pptpd restart
```
