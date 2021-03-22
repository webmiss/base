#!/bin/bash

# 配置
s=$1
name='webmis'                 #项目名称
index='main.go'               #入口文件
zookeeperHost='localhost'     #zookeeper-主机
zookeeperPort=2181            #zookeeper-端口
kafka='/opt/kafka/bin'        #kafka-脚本
kafkaLog='/tmp/kafka-logs'    #kafka-缓存
topicHost='localhost'         #kafka-主题-主机
topicPort=9092                #kafka-主题-端口
topicName='logs'              #kafka-主题-名称
topicPartitions=4             #kafka-主题-分区
topicTime=10000               #kafka-主题-数据存储时间
producer='producer'           #kafka-生产者-用户名
consumer='consumer'           #kafka-消费者-用户名

# 运行
if [ "$s" == "serve" ]; then
  {
    go run $index
  } || {
    echo "> 请安装'go'"
  }
# 安装
elif [ "$s" == "install" ]; then
  {
    go clean --modcache && go get -v
  } || {
    echo "> 请安装'go'"
  }
# 清理
elif [ "$s" == "clear" ]; then
  {
    go mod tidy
  } || {
    echo "> 请安装'go'"
  }
# 打包
elif [ "$s" == "build" ]; then
  {
    go build
  } || {
    echo "> 请安装'go'"
  }
# 预览
elif [ "$s" == "http" ]; then
  {
    ./$name
  } || {
    echo "> 请安装'go'"
  }
# 启动
elif [ "$s" == "start" ]; then
  nohup ./$name &
# 重启
elif [ "$s" == "restart" ]; then
  ps -aux | grep ./$name | grep -v grep | awk {'print $2'} | xargs kill && nohup ./$name &
# 停止
elif [ "$s" == "stop" ]; then
  ps -aux | grep ./$name | grep -v grep | awk {'print $2'} | xargs kill
  ps -aux | grep go-build | grep -v grep | awk {'print $2'} | xargs kill
# Socket-运行
elif [ "$s" == "socket" ]; then
  {
    go run cli/socket/index.go
  } || {
    echo "> 请安装'go'"
  }
# Socket-启动
elif [ "$s" == "socketStart" ]; then
  nohup go run cli/socket/index.go &
# ZooKeeper-运行
elif [ "$s" == "zookeeper" ]; then
  $kafka/zookeeper-server-start.sh $kafka/../config/zookeeper.properties
# ZooKeeper-启动
elif [ "$s" == "zookeeperStart" ]; then
  nohup $kafka/zookeeper-server-start.sh $kafka/../config/zookeeper.properties &
# ZooKeeper-停止
elif [ "$s" == "zookeeperStop" ]; then
  $kafka/zookeeper-server-stop.sh
# Kafka-运行
elif [ "$s" == "kafka" ]; then
  $kafka/kafka-server-start.sh $kafka/../config/server.properties
# Kafka-启动
elif [ "$s" == "kafkaStart" ]; then
  nohup $kafka/kafka-server-start.sh $kafka/../config/server.properties &
# Kafka-停止
elif [ "$s" == "kafkaStop" ]; then
  $kafka/kafka-server-stop.sh
# Kafka-主题-列表
elif [ "$s" == "topicList" ]; then
  $kafka/kafka-topics.sh --list --zookeeper $zookeeperHost:$zookeeperPort
# Kafka-主题-查看
elif [ "$s" == "topicShow" ]; then
  $kafka/kafka-topics.sh --describe --zookeeper $zookeeperHost:$zookeeperPort --topic $topicName
# Kafka-主题-创建
elif [ "$s" == "topicCreate" ]; then
  $kafka/kafka-topics.sh --create --zookeeper $zookeeperHost:$zookeeperPort --topic $topicName --partitions $topicPartitions --replication-factor 1
# Kafka-主题-设置时间
elif [ "$s" == "topicTime" ]; then
  $kafka/kafka-configs.sh --alter --zookeeper $zookeeperHost:$zookeeperPort --topic $topicName --add-config retention.ms=$topicTime
# Kafka-主题-设置分区
elif [ "$s" == "topicPartitions" ]; then
  $kafka/kafka-topics.sh --alter --zookeeper $zookeeperHost:$zookeeperPort --topic $topicName --partitions $topicPartitions
# Kafka-主题-清空数据
elif [ "$s" == "topicClear" ]; then
  $kafka/kafka-topics.sh --alter --zookeeper $zookeeperHost:$zookeeperPort --topic $topicName --config cleanup.policy=delete
# Kafka-主题-删除
elif [ "$s" == "topicDelete" ]; then
  $kafka/kafka-topics.sh --delete --zookeeper $zookeeperHost:$zookeeperPort --topic $topicName && rm -fr $kafkaLog
# Kafka-写入事件
elif [ "$s" == "topicProducer" ]; then
  $kafka/kafka-console-producer.sh --topic $topicName --bootstrap-server $topicHost:$topicPort --producer.config $kafka/../config/producer.properties
# Kafka-阅读事件
elif [ "$s" == "topicConsumer" ]; then
  $kafka/kafka-console-consumer.sh --topic $topicName --from-beginning --bootstrap-server $topicHost:$topicPort --consumer.config $kafka/../config/consumer.properties
else
  echo "----------------------------------------------------"
  echo "[use] ./bash.sh <command>"
  echo "----------------------------------------------------"
  echo "  <command>"
  echo "    serve                 运行: go run $index"
  echo "    install               安装依赖包: go get -v"
  echo "    clear                 清理依赖包: go mod tidy"
  echo "    build                 打包: go build"
  echo "    http                  预览: ./$name"
  echo "  <Server>"
  echo "    start                 启动"
  echo "    restart               重启"
  echo "    stop                  停止"
  echo "  <WebSocket>"
  echo "    socket                 运行"
  echo "    socketStart            启动"
  echo "  <ZooKeeper $zookeeperHost:$zookeeperPort>"
  echo "    zookeeper             运行"
  echo "    zookeeperStart        启动"
  echo "    zookeeperStop         停止"
  echo "  <Kafka $zookeeperHost:$zookeeperPort>"
  echo "    kafka                 运行"
  echo "    kafkaStart            启动"
  echo "    kafkaStop             停止"
  echo "  <Kafka-Topic $topicHost:$topicPort>"
  echo "    topicList             主题列表"
  echo "    topicShow             详情: $topicName"
  echo "    topicCreate           创建: $topicName"
  echo "    topicTime             清除时间: $topicName , $topicTime ms"
  echo "    topicPartitions       分区: $topicPartitions"
  echo "    topicClear            清除数据: $topicName"
  echo "    topicDelete           删除: $topicName"
  echo "    -"
  echo "    topicProducer         写入事件: $topicName"
  echo "    topicConsumer         阅读事件: $topicName"
  echo "----------------------------------------------------"
fi
