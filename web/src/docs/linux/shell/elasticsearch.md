## 安装
```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
apt install apt-transport-https
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-7.x.list
apt update && apt install elasticsearch
```

## 配置( vi /etc/elasticsearch/elasticsearch.yml )
```bash
cluster.name: my-application
node.name: node-1
cluster.initial_master_nodes: ["node-1"]
network.host: 0.0.0.0
http.port: 9200
path.data: /home/elasticsearch/data
path.logs: /home/elasticsearch/log
```

## 启动
```bash
# 修改权限
chmod -R 777 /home/elasticsearch/*
# 启动服务
systemctl start elasticsearch
# 测试
curl localhost:9200
```
- 外网访问 http://47.108.105.202:9200/
