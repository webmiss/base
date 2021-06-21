## Pulsar安装
```bash
cd /opt
wget https://archive.apache.org/dist/pulsar/pulsar-2.8.0/apache-pulsar-2.8.0-bin.tar.gz
tar xvfz apache-pulsar-2.8.0-bin.tar.gz
mv apache-pulsar-2.8.0 pulsar
rm -fr apache-pulsar-2.8.0-bin.tar.gz
cd pulsar
```

## 一、ZooKeeper( vi conf/zookeeper.conf )
```bash
# 端口
clientPort=2181
# 数据
dataDir=/home/data/zookeeper
# 心跳间隔(毫秒)
tickTime=1000
initLimit=5
syncLimit=2
# 集群(本机: 0.0.0.0)
server.1=0.0.0.0:2888:3888
server.2=192.168.1.11:2888:3888
server.3=192.168.1.12:2888:3888
```
### myid
```bash
# 集群(本机1, 其它两台分别添加2 3到myid)
mkdir -p /home/data/zookeeper
echo 1 > /home/data/zookeeper/myid
```
### 启动
```bash
# 后台
./bin/pulsar-daemon start zookeeper
# 前台
./bin/pulsar zookeeper
```

### 初始化元数据
```bash
./bin/pulsar initialize-cluster-metadata \
  --cluster WebMIS \
  --zookeeper localhost:2181 \
  --configuration-store localhost:2181 \
  --web-service-url http://pulsar.test.com:8080 \
  --web-service-url-tls https://pulsar.test.com:8443 \
  --broker-service-url pulsar://pulsar.test.com:6650 \
  --broker-service-url-tls pulsar+ssl://pulsar.test.com:6651
```
- --cluster 集群名称
- --zookeeper 集群节点(其中1个)
- --configuration-store 集群节点(其中1个)
- --web-service-url 集群Web服务的URL+端口
- --web-service-url-tls 集群Web提供TLS服务的URL+端口
- --broker-service-url 集群brokers服务URL
- --broker-service-url-tls 集群brokers提供TLS服务的URL

## 二、BookKeeper( vi conf/bookkeeper.conf )
```bash
zkServers=192.168.1.10,192.168.1.11:2181,192.168.1.12:2181
```
### 启动
```bash
# 后台
./bin/pulsar-daemon start bookie
# 前台
./bin/bookkeeper bookie
# 测试
./bin/bookkeeper shell bookiesanity
# 恢复
./bin/bookkeeper autorecovery
```

## 三、Broker( vi conf/broker.conf )
```bash
# 集群节点
zookeeperServers=192.168.1.10:2181,192.168.1.11:2181,192.168.1.12:2181
configurationStoreServers=192.168.1.10:2181,192.168.1.11:2181,192.168.1.12:2181
# 集群名称
clusterName=WebMIS
```

### 启动
```bash
# 后台
./bin/pulsar-daemon start broker
# 前台
./bin/pulsar broker
```

## 四、日志( vi conf/log4j2.yaml )
```bash
immediateFlush: true
```

## 五、创建
```bash
# 租户
./bin/pulsar-admin tenants create <MyTenant> --allowed-clusters WebMIS
# 空间、设置集群
./bin/pulsar-admin namespaces create <MyTenant/MyNameSpace>
./bin/pulsar-admin namespaces set-clusters <MyTenant/MyNameSpace> --clusters WebMIS
# 主题
./bin/pulsar-admin topics create-partitioned-topic persistent://MyTenant/MyNameSpace/MyTopic --partitions 4
./bin/pulsar-admin topics create persistent://MyTenant/MyNameSpace/MyTopic
./bin/pulsar-admin persistent list MyTenant/MyNameSpace
# 授权
./bin/pulsar-admin topics grant-permission --actions produce,consume --role AppHmsAlert persistent://MyTenant/MyNameSpace/MyTopic
```

## 六、客户端
```bash
# 生产者
./bin/pulsar-client produce MyTopic --messages "hello-pulsar"
# 消费者
./bin/pulsar-client consume MyTopic -s "first-subscription"
```
