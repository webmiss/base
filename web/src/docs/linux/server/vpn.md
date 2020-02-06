## 安装PPTPD
``` bash
# CentOS
yum install pptpd
$ Ubuntu
apt-get install pptpd
```

## 配置
``` bash
vi /etc/pptpd.conf
```
option /etc/ppp/options.pptpd # 配置文件<br>
debug # 日志写入 /var/log/messages<br>
localip 192.168.100.1 # VPN服务器地址,可以任意<br>
remoteip 192.168.100.5-254 # 客户端IP段,可以任意<br>

### 配置文件
``` bash
vi /etc/ppp/options.pptpd
```
refuse-pap # 拒绝pap身份验证<br>
refuse-chap # 拒绝chap身份验证<br>
refuse-mschap # 拒绝mschap身份验证<br>
require-mschap-v2 # 使用mschap-v2身份验证<br>
require-mppe-128 # 要求128位MPPE加密<br>
ms-dns 8.8.8.8<br>
ms-dns 8.8.4.4<br>
proxyarp # 启动ARP代理<br>

### 帐号密码
``` bash
vi /etc/ppp/chap-secrets
```
admin pptpd 654321 *

## 启动服务
``` bash
# CentOS 7
systemctl enable pptpd
systemctl start pptpd

# CentOS 6
chkconfig pptpd on
service pptpd start
```

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
# firewall-cmd --permanent --direct --add-rule ipv4 filter POSTROUTING 0 -t nat -s 192.168.100.0/24 -o eth0 -j MASQUERADE
firewall-cmd --permanent --direct --add-rule ipv4 filter POSTROUTING 0 -t nat -o eth0 -j MASQUERADE

firewall-cmd --permanent --direct --add-rule ipv4 filter FORWARD 0 -i ppp+ -o eth0 -j ACCEPT
firewall-cmd --permanent --direct --add-rule ipv4 filter FORWARD 0 -i eth0 -o ppp+ -j ACCEPT

# 添加PPTP端口和GRE协议
firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 0 -i eth0 -p tcp --dport 1723 -j ACCEPT
firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 0 -p gre -j ACCEPT

# 查看服务
firewall-cmd --list-services
firewall-cmd --list-port

# 重启防火墙
firewall-cmd --reload
```

### 2) Iptables
``` bash
# 添加包转发
iptables -t nat -A POSTROUTING -s 192.168.100.0/24 -o eth0 -j MASQUERADE

# 保存规则
service iptables save
```

### 配置文件
``` bash
vi /etc/sysconfig/iptables
```
-A INPUT -p tcp -m state --state NEW -m tcp --dport 47 -j ACCEPT<br>
-A INPUT -p tcp -m state --state NEW -m tcp --dport 1723 -j ACCEPT<br>
-A INPUT -p gre -j ACCEPT<br>
<br>
-A FORWARD -j REJECT --reject-with icmp-host-prohibited #能链接不能上网问题<br>
``` bash
# 重启服务
service iptables restart
service pptpd restart
```
