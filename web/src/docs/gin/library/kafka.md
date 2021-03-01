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

### 服务端
```bash
# ZooKeeper 服务
./shell zookeeper
# Kafka 服务
./shell kafka
# 创建主题
./shell topicCreate
```

## 客户端 Kafka-Go
```bash
go get github.com/segmentio/kafka-go
```
### 事件写入
```bash
  kafka := (&library.Kafka{}).Conn("test", 0)
  kafka.TopicList()
	kafka.Producer("Go Test1")
	kafka.Producer("Go Test2")
	kafka.Producer("Go Test3")
	kafka.Close()
```

### 阅读事件
```bash
  kafka := (&library.Kafka{})
	r := kafka.Consumer("test", 0)
	// 配置
	// r.SetOffset(100)	//开始读取
	// 数据
	for {
		m, err := r.FetchMessage(context.Background())
		if err != nil {
			break
		}
		fmt.Printf("message at offset %d: %s = %s\n", m.Offset, string(m.Key), string(m.Value))
	}
	if err := r.Close(); err != nil {
		fmt.Println("Kafka关闭错误:", err)
	}
```