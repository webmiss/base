## 1) 安装
``` bash
# CentOS
yum install dhcp dhcp-devel
```

## 2) 配置
``` bash
# 拷贝配置文件
cp /usr/share/doc/dhcp*/dhcpd.conf.sample /etc/dhcp/dhcpd.conf
# 编辑
vi /etc/dhcp/dhcpd.conf
```

### 文件内容
``` bash
# 动态 IP 分配
subnet 192.168.1.0 netmask 255.255.255.0 {
	range 192.168.1.10 192.168.1.240;		# IP地址范围
	option domain-name-servers 211.98.72.7,211.98.72.8; # DNS1,DNS2
	option routers 192.168.1.1;			# 网关
	default-lease-time 21600;			# 预设的租约时间,单位：秒
	max-lease-time 43200;				# 超过租约时间还可续约,最长 518400 秒
}
# 外网不能动态获取
subnet 222.56.42.0 netmask 255.255.255.0 {}
```

## 3) 启动DHCP服务
``` bash
# CentOS 7
systemctl enable dhcpd
systemctl start dhcpd

# CentOS 6
chkconfig --levels 235 dhcpd on
service dhcpd start
```

## 4) 查看租约信息
``` bash
cat /var/lib/dhcpd/dhcpd.leases
```