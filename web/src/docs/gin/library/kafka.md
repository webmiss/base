## 安装
```bash
# 下载
wget https://mirrors.tuna.tsinghua.edu.cn/apache/kafka/2.7.0/kafka_2.13-2.7.0.tgz
# 解压
tar -xzf kafka_2.13-2.7.0.tgz
# 移动到Opt目录
mv kafka_2.13-2.7.0 /opt/kafka
```
****

## 认证方式
### 一、服务器
#### 1) 添加 /opt/kafka/config/zookeeper_server_jaas.conf
```bash
Server {
    org.apache.kafka.common.security.plain.PlainLoginModule required
    username="admin"
    password="vip.webmis.kafka";
};
```
#### 2) 追加 /opt/kafka/bin/zookeeper-server-start.sh
```bash
export KAFKA_OPTS="-Djava.security.auth.login.config=$base_dir/../config/zookeeper_server_jaas.conf"
```
#### 3) 添加 /opt/kafka/config/kafka_server_jaas.conf
```bash
KafkaServer {
    org.apache.kafka.common.security.plain.PlainLoginModule required
    username="admin"
    password="vip.webmis.kafka"
    user_admin="vip.webmis.kafka"
    user_producer="vip.webmis.producer"
    user_consumer="vip.webmis.consumer";
};
```
#### 4) 修改 /opt/kafka/bin/kafka-server-start.sh
```bash
# exec $base_dir/kafka-run-class.sh $EXTRA_ARGS kafka.Kafka "$@"
exec $base_dir/kafka-run-class.sh $EXTRA_ARGS -Djava.security.auth.login.config=$base_dir/../config/kafka_server_jaas.conf kafka.Kafka "$@"
```
### 二、客户端
### 1) 生产者 /opt/kafka/config/kafka_producer_jaas.conf
```bash
KafkaClient {
	org.apache.kafka.common.security.plain.PlainLoginModule required
	username="producer"
	password="vip.webmis.producer";
};
```
### 消费者 /opt/kafka/config/kafka_consumer_jaas.conf
```bash
KafkaClient {
	org.apache.kafka.common.security.plain.PlainLoginModule required
	username="consumer"
	password="vip.webmis.consumer";
};
```
### 2) 修改 /opt/kafka/bin/kafka-console-producer.sh
```bash
# exec $(dirname $0)/kafka-run-class.sh kafka.tools.ConsoleProducer "$@"
base_dir=$(dirname $0)
exec $base_dir/kafka-run-class.sh -Djava.security.auth.login.config=$base_dir/../config/kafka_producer_jaas.conf kafka.tools.ConsoleProducer "$@"
```
### 修改 /opt/kafka/bin/kafka-console-consumer.sh
```bash
# exec $(dirname $0)/kafka-run-class.sh kafka.tools.ConsoleConsumer "$@"
base_dir=$(dirname $0)
exec $base_dir/kafka-run-class.sh -Djava.security.auth.login.config=$base_dir/../config/kafka_consumer_jaas.conf kafka.tools.ConsoleConsumer "$@"
```
### 3) 修改 /opt/kafka/bin/kafka-console-producer.sh
```bash
# exec $(dirname $0)/kafka-run-class.sh kafka.tools.ConsoleProducer "$@"
exec $(dirname $0)/kafka-run-class.sh -Djava.security.auth.login.config=$base_dir/../config/kafka_producer_jaas.conf kafka.tools.ConsoleProducer "$@"
```


## 服务端
```bash
# ZooKeeper 服务
./shell zookeeper
# Kafka 服务
./shell kafka
# 创建主题
./shell topicCreate
```

## 客户端
```bash
go get github.com/segmentio/kafka-go
```
### 生产者
```bash
  (&util.Logs{}).Info("日志")
	(&util.Logs{}).InfoMap(gin.H{"type": "msg", "data": 1})
```
### 消费者
```bash
  go run cli/kafka_logs/main.go
```