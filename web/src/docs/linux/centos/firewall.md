## 1) Firewalld
``` bash
# 开机启动
systemctl enable firewalld
# 启动
systemctl start firewalld
# 状态
systemctl status firewalld
```

### 重启防火墙
``` bash
firewall-cmd --reload

# 查看所以规则
firewall-cmd --zone=public --list-all
# 查看永久选项所支持的服务
firewall-cmd --permanent --get-services
# 查看支持的永久区域
firewall-cmd --permanent --get-zones
# 查看默认区域
firewall-cmd --get-default-zone
# 查看服务状态
firewall-cmd --query-service=http
```

### 启用区域中的服务
``` bash
# Http/MySQL
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=mysql
```

### 启用区域中的端口
``` bash
firewall-cmd --permanent --zone=public --add-port=443/tcp
```

### 查询区域中的服务是否启用
``` bash
firewall-cmd --permanent --zone=public --query-service=mysql
```

### 禁用区域中的服务
``` bash
firewall-cmd --permanent --zone=public --remove-service=http
```

## 2) Iptables
``` bash
# CentOS 7
systemctl enable iptables
systemctl start iptables
systemctl status iptables
# CentOS 6
system-config-firewall-tui
```

### 重启防火墙
``` bash
/etc/init.d/iptables restart
```

### 配置文件
``` bash
vi /etc/sysconfig/iptables
```

### 文件内容
``` bash
# 规则
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
-A INPUT -p icmp -j ACCEPT
-A INPUT -i lo -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT
-A INPUT -j REJECT --reject-with icmp-host-prohibited
-A FORWARD -j REJECT --reject-with icmp-host-prohibited
COMMIT
```

### 端口映射
``` bash
*nat
[...]
-A PREROUTING -d 222.56.xxx.xxx -p tcp --dport 8081 -j DNAT --to 192.168.1.3:80<br/>
-A POSTROUTING -d 192.168.1.3 -p tcp --dport 80 -j SNAT --to 192.168.1.2<br/>
[...]
COMMIT
```
