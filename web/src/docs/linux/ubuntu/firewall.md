## UFW防火墙
``` bash
# 安装
sudo apt-get install ufw
# 开机启动
sudo ufw enable
# 默认规则
sudo ufw default deny
```

### 重启防火墙
``` bash
sudo ufw reload
```

### 查看状态
``` bash
sudo ufw status
```

### 开启/禁用端口或服务
``` bash
# 允许外部访问80端口
sudo ufw allow 80

# 禁止外部访问80端口
sudo ufw delete allow 80

# 允许此IP访问所有的本机端口
sudo ufw allow from 192.168.1.1

# 禁止外部访问smtp服务
sudo ufw deny smtp

# 删除smtp服务
sudo ufw delete allow smtp

# 拒绝所有的流量从TCP的10.0.0.0/8 到端口22的地址192.168.0.1
ufw deny proto tcp from 10.0.0.0/8 to 192.168.0.1 port
```
