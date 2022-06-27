# VPN 服务器

## PPTPD
#### 1) 安装
```bash
apt install pptpd
```

#### 2) 配置-IP范围
```bash
vi /etc/pptpd.conf
```
- localip 192.168.100.1
- remoteip 192.168.100.5-254

#### 3) 配置-参数
```bash
vi /etc/ppp/pptpd-options
```
- refuse-pap # 拒绝pap身份验证
- refuse-chap # 拒绝chap身份验证
- refuse-mschap # 拒绝mschap身份验证
- require-mschap-v2 # 使用mschap-v2身份验证
- require-mppe-128 # 要求128位MPPE加密
- ms-dns 8.8.8.8
- ms-dns 8.8.4.4
- proxyarp # 启动ARP代理

#### 4) 帐号密码
```bash
vi /etc/ppp/chap-secrets
```
- webmis pptpd eckingsoul *

#### 5) 开启转发
```bash
vi /etc/sysctl.conf
```
- net.ipv4.ip_forward=1
- 更新: sysctl -p

#### 6) 启动服务
```bash
systemctl enable pptpd
systemctl start pptpd
```

## 防火墙配置
### 1) 安装
``` bash
apt install iptables
```

### 2) 配置
``` bash
apt install iptables
# 开启gre协议
iptables -A INPUT -p gre -j ACCEPT
iptables -A INPUT -p tcp --dport 1723 -j ACCEPT
iptables -A INPUT -p tcp --dport 47 -j ACCEPT
iptables -A FORWARD -j REJECT --reject-with icmp-host-prohibited
# 添加包转发
iptables -t nat -A POSTROUTING -s 192.168.100.0/24 -o eth0 -j MASQUERADE
iptables -t nat -A POSTROUTING -s 192.168.100.0/24 -o eth0 -j SNAT --to-source 10.0.4.17
```
