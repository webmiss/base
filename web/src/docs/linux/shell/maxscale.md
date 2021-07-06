## 安装MariaDB
```bash
# 下载
docker pull mariadb
# MariaDB服务器(1主、2从)
docker run -d -p 9091:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mariadb1 mariadb:latest
docker run -d -p 9092:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mariadb2 mariadb:latest
docker run -d -p 9093:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mariadb3 mariadb:latest
# 进入容器
docker exec -it mariadb1 /bin/bash
# 安装编辑器
apt update
apt install vim
```

## 主从同步
#### 主节点配置( vi /etc/mysql/mariadb.conf.d/50-server.cnf )
```bash
[mysqld]
server_id=1                 #全局唯一ID
log-bin=bin-log             #开启二进制日志
log-bin-index=bin-log.index #日志索引位置
expire_logs_days=30         #保留时间(天)
binlog-format=ROW           #日志格式
binlog-row-image=minimal    #日志级别
# 崩溃时信息记录到事务表
master-info-repository=TABLE
relay-log-info-repository=TABLE
# 排除不需要复制的库
binlog-ignore-db=mysql 
binlog-ignore-db=information_schema
binlog-ignore-db=performance_schema
```
#### 从节点配置( vi /etc/mysql/mariadb.conf.d/50-server.cnf )
```bash
[mysqld]
server_id=2                 #全局唯一ID
log-bin=bin-log             #开启二进制日志
log-bin-index=bin-log.index #日志索引位置
expire_logs_days=30         #保留时间(天)
# 启用中继日志
relay-log=relay-log
relay-log-index=relay-log.index
read-only=ON
# 排除不需要复制的库
binlog-ignore-db=mysql 
binlog-ignore-db=information_schema
binlog-ignore-db=performance_schema
```
#### 重启服务
```bash
docker restart mariadb1
docker restart mariadb2
docker restart mariadb3
```

<br/>

#### 主节点-创建账号
```bash
# 登录
mysql -uroot -p123456 -h127.0.0.1 -P9091
# 创建监控用户
CREATE USER 'monitor'@'%' IDENTIFIED BY '123456';
GRANT REPLICATION SLAVE, REPLICATION SLAVE ADMIN,REPLICATION MASTER ADMIN, REPLICATION SLAVE ADMIN,BINLOG MONITOR, SUPER, RELOAD on *.* to 'monitor'@'%';
# 创建路由账号
CREATE USER 'maxscale'@'%' IDENTIFIED BY '123456';
GRANT ALL on *.* to 'maxscale'@'%';
# 刷新
flush privileges;
# 查看状态
show master status;
```
#### 从节点-配置指向
```bash
# 登录
mysql -uroot -p123456 -h127.0.0.1 -P9092
mysql -uroot -p123456 -h127.0.0.1 -P9093
# 查看IP
docker inspect --format='{{.NetworkSettings.IPAddress}}' mariadb1
# 指向主节点
CHANGE MASTER TO MASTER_HOST='172.17.0.2', MASTER_PORT=3306, MASTER_USER='monitor', MASTER_PASSWORD='123456', MASTER_USE_GTID=current_pos;
# 启动从状态
START SLAVE;
# 查看状态
SHOW SLAVE STATUS\G;
```

<br/>

## 安装MaxScale
https://mariadb.com/downloads/#mariadb_platform-mariadb_maxscale
```bash
# 容器( 172.17.0.5 )
docker run -it -p 8989:8989 --name maxscale ubuntu
# 查看系统
cat /etc/issue
# 下载文件
cd /home
wget https://dlm.mariadb.com/1665026/maxscale/2.5.11/packages/ubuntu/focal/x86_64/maxscale-2.5.11-1.ubuntu.focal.x86_64.deb
# 安装依赖
apt install libxml2 libcurl4 libsasl2-2
apt --fix-broken install
# 安装
dpkg -i maxscale-2.5.11-1.ubuntu.focal.x86_64.deb
# 查看版本
maxscale -v
```

<br/>

#### 加密
```bash
# 创建密钥文件
maxkeys
# 创建加密密码
maxpasswd 123456
```
- 7683C19526E17B4FA3C72EBE49E2344FE77A9347C83DCA58DCEC808C1C63F168

<br/>

#### 配置( vi /etc/maxscale.cnf )
```bash
[maxscale]
threads=auto
admin_secure_gui=false
# 数据库1
[server1]
type=server
address=172.17.0.2
port=3306
protocol=MariaDBBackend
# 数据库2
[server2]
type=server
address=172.17.0.3
port=3306
protocol=MariaDBBackend
# 数据库3
[server3]
type=server
address=172.17.0.4
port=3306
protocol=MariaDBBackend
# 故障转移监控模板
[MariaDB-Monitor]
type=monitor
module=mariadbmon
servers=server1,server2,server3
user=monitor
password=7683C19526E17B4FA3C72EBE49E2344FE77A9347C83DCA58DCEC808C1C63F168
monitor_interval=2000
auto_failover=true  #自动故障转移
auto_rejoin=true    #自动重新加入
# 只读模块
# [Read-Only-Service]
# type=service
# router=readconnroute
# servers=server1,server2,server3
# user=maxscale
# password=123456
# router_options=slave
# 读写模块
[Read-Write-Service]
type=service
router=readwritesplit
servers=server1,server2,server3
user=maxscale
password=7683C19526E17B4FA3C72EBE49E2344FE77A9347C83DCA58DCEC808C1C63F168
# [Read-Only-Listener]
# type=listener
# service=Read-Only-Service
# protocol=MariaDBClient
# port=4008
```

<br/>

#### 服务
```bash
# 启动
service maxscale start
# 日志
cat /var/log/maxscale/maxscale.log
# 查看状态
maxctrl list services
maxctrl list servers
maxctrl list listeners Read-Write-Service
# 连接
mysql -umaxscale -p123456 -h172.17.0.5 -P4006
# 测试
create databaese data_test;
```

<br/>

