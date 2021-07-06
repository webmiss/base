## 安装Java
```bash
apt install default-jre default-jdk
```

<br/>

## Pulsar安装
```bash
cd /home
wget https://archive.apache.org/dist/pulsar/pulsar-2.8.0/apache-pulsar-2.8.0-bin.tar.gz
tar xvfz apache-pulsar-2.8.0-bin.tar.gz
mv apache-pulsar-2.8.0 pulsar
rm -fr apache-pulsar-2.8.0-bin.tar.gz
cd pulsar
```

<br/>

## 单机
```bash
# 后台/前台
bin/pulsar-daemon start standalone
bin/pulsar standalone
```
<br/>

### 测试
```bash
# 消费者
bin/pulsar-client consume persistent://public/default/pulsar-test \
-n 100 \
-s "consumer-test" \
-t "Exclusive"

# 生产者
bin/pulsar-client produce persistent://public/default/pulsar-test \
-n 1 \
-m "Hello Pulsar"
```

<br/>

## 基本操作
```bash
# 租户: 列表、创建、更新、删除
bin/pulsar-admin tenants list
bin/pulsar-admin tenants create <MyTenant>
bin/pulsar-admin tenants update <MyTenant>
bin/pulsar-admin tenants delete <MyTenant>
# 命名空间: 列表、创建、设置集群、删除
bin/pulsar-admin namespaces list <MyTenant>
bin/pulsar-admin namespaces create <MyTenant/MyNameSpace>
bin/pulsar-admin namespaces set-clusters <MyTenant/MyNameSpace> --clusters webmis
bin/pulsar-admin namespaces delete <MyTenant/MyNameSpace>
# 主题: 列表、状态、创建(无分区)、创建(有分区)、卸载(已订阅)、删除(无分区)、删除(有分区)
bin/pulsar-admin topics list <MyTenant/MyNameSpace>
bin/pulsar-admin topics stats/partitioned-stats persistent://MyTenant/MyNameSpace/MyTopic
bin/pulsar-admin topics create persistent://MyTenant/MyNameSpace/MyTopic
bin/pulsar-admin topics create-partitioned-topic persistent://MyTenant/MyNameSpace/MyTopic --partitions 4
bin/pulsar-admin topics unload persistent://MyTenant/MyNameSpace/MyTopic
bin/pulsar-admin topics delete persistent://MyTenant/MyNameSpace/MyTopic
bin/pulsar-admin topics delete-partitioned-topic persistent://MyTenant/MyNameSpace/MyTopic
# 授权
bin/pulsar-admin topics grant-permission --actions produce,consume --role AppHmsAlert persistent://MyTenant/MyNameSpace/MyTopic
```

<br/>

## 集群
### Docker容器
```bash
# 下载镜像
docker pull ubuntu
# 运行镜像
docker run --name pulsar01 -it ubuntu
docker run --name pulsar02 -it ubuntu
docker run --name pulsar03 -it ubuntu
# 查看IP
apt update
apt install net-tools
ifconfig
# 退出容器
exit        #停止
Ctrl+P+Q    #不停止
# 进入容器
docker ps -a
docker start 容器ID
docker attach 容器ID
```

### 主机名解析( vi /etc/hosts )
```bash
172.17.0.2   pulsar01
172.17.0.3   pulsar02
172.17.0.4   pulsar03
```
<br/>

### 一、ZooKeeper( vi conf/zookeeper.conf )
```bash
# 数据
dataDir=data/zookeeper
# 心跳间隔(毫秒)
tickTime=1000
initLimit=5
syncLimit=2
clientPort=2181
# 集群
server.1=172.17.0.2:2888:3888
server.2=172.17.0.3:2888:3888
server.3=172.17.0.4:2888:3888
```
#### myid
```bash
# 集群(本机1, 其它两台分别添加2 3到myid)
mkdir -p /home/pulsar/data/zookeeper
echo 1 > /home/pulsar/data/zookeeper/myid
```
#### 启动
```bash
# 后台/前台
bin/pulsar-daemon start zookeeper
bin/pulsar zookeeper
# 查看(QuorumPeerMain)
jps
netstat -tnlpu|grep 4043
```
<br/>

### 二、初始化元数据
```bash
bin/pulsar initialize-cluster-metadata \
  --cluster webmis \
  --zookeeper 172.17.0.2:2181 \
  --configuration-store 172.17.0.2:2181 \
  --web-service-url http://172.17.0.2:8080,172.17.0.3:8080,172.17.0.4:8080 \
  --broker-service-url pulsar://172.17.0.2:6650,172.17.0.3:6650,172.17.0.4:6650
```
- --cluster 集群名称
- --zookeeper 集群节点(其中1个)
- --configuration-store 集群节点(其中1个)
- --web-service-url 集群Web服务的URL+端口
- --web-service-url-tls 集群Web提供TLS服务的URL+端口
- --broker-service-url 集群brokers服务URL
- --broker-service-url-tls 集群brokers提供TLS服务的URL

#### 验证初始化元数据
```bash
bin/pulsar zookeeper-shell
```
- help  //命令
- ls /  //查看
- quit  //退出

<br/>

### 三、BookKeeper( vi conf/bookkeeper.conf )
```bash
advertisedAddress=172.17.0.2
zkServers=172.17.0.2:2181,172.17.0.3:2181,172.17.0.4:2181
```
#### 初始化元数据
```bash
mkdir -p /home/pulsar/data/bookkeeper
bin/bookkeeper shell metaformat
```
#### 启动
```bash
# 后台/前台
bin/pulsar-daemon start bookie
bin/bookkeeper bookie
# 查看状态
cat /home/pulsar/data/bookkeeper/ledgers/current/VERSION
# 测试
bin/bookkeeper shell bookiesanity
# 恢复
# bookkeeper autorecovery
```
- ackQuorum   //当指定数量的 bookie ack 响应时，认为消息写入成功
- ensemble    //写入数据的 bookie 节点数量
- numEntries  //一批消息的消息数量
- writeQuorum //每条消息副本数量

<br/>

### 四、Broker( vi conf/broker.conf )
```bash
# 集群节点
zookeeperServers=172.17.0.2:2181,172.17.0.3:2181,172.17.0.4:2181
configurationStoreServers=172.17.0.2:2181,172.17.0.3:2181,172.17.0.4:2181
# 集群名称
clusterName=webmis
```

#### 启动
```bash
# 后台/前台
bin/pulsar-daemon start broker
bin/pulsar broker
# 查看
bin/pulsar-admin brokers list webmis
```

<br/>

## 五、客户端( vi conf/client.conf )
```bash
webServiceUrl=http://172.17.0.2:8080,172.17.0.3:8080,172.17.0.4:8080
brokerServiceUrl=pulsar://172.17.0.2:6650,172.17.0.3:6650,172.17.0.4:6650
```
