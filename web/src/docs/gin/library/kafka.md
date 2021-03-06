### 安装
```bash
# 下载
wget https://mirrors.tuna.tsinghua.edu.cn/apache/kafka/2.7.0/kafka_2.13-2.7.0.tgz
# 解压
tar -xzf kafka_2.13-2.7.0.tgz
# 移动到Opt目录
mv kafka_2.13-2.7.0 /opt/kafka
# 删除
rm -fr kafka_2.13-2.7.0.tgz
```

<br/>

### 认证
**不建议使用，速度慢数据会丢失！**，推荐防火墙规则
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

<br/>

### 服务端
```bash
# ZooKeeper 服务
./bash zookeeper
# Kafka 服务
./bash kafka
```

### 主题-日志
```bash
# 创建主题
./bash topicCreate
# 分区
./bash topicPartitions

```

### 消费者
```bash
# 运行
./bash logsServe
```

**生产者**
```bash
# 日志
(&service.Logs{}).Log("日志")
# 其它
(&service.Logs{}).Info("信息")
(&service.Logs{}).Action("操作")
(&service.Logs{}).Error("错误")
```
