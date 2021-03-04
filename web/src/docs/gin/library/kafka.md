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
**不建议使用**，可以使用防火墙限制IP访问方式
```bash
# 允许
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.0.200" port protocol="tcp" port="9092" accept"
# 禁止
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.0.200" port protocol="tcp" port="9092" reject"
# 查看
firewall-cmd --zone=public --list-rich-rules
# 生效
firewall-cmd --reload
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