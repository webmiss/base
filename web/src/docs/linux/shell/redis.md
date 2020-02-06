## Redis
redis是一个key-value存储系统。和Memcached类似，它支持存储的value类型相对更多，包括string(字符串)、list(链表)、set(集合)、zset(sorted set --有序集合)和hash（哈希类型）。这些数据类型都支持push/pop、add/remove及取交集并集和差集及更丰富的操作，而且这些操作都是原子性的。在此基础上，redis支持各种不同方式的排序。与memcached一样，为了保证效率，数据都是缓存在内存中。区别的是redis会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件，并且在此基础上实现了master-slave(主从)同步。

### 1.1 安装
```bash
# CentOS7 PHP7
yum install redis php72w-pecl-redis -y

# 创建目录
mkdir /home/www/mvc/redis/

# PHP模块信息
echo '<?php phpinfo();?>' > /home/www/mvc/redis.php

# 开机启动
systemctl enable redis

# 重启PHP和Redis
systemctl restart php-fpm redis
```

### 远程访问（vi /etc/redis.conf）
```bash
# bind 127.0.0.1
protected-mode no
```

### 1.2 使用
```bash
# 登录
redis-cli -h 127.0.0.1 -p 6379 --raw
# 是否运行
ping
# 查看信息
info
# 设置密码
config set requirepass PWD
# 密码验证
auth PWD
# 退出
exit
```

### 键(key)值(value)
```bash
# 添加
set Test
# 查询
get Test
# 删除
del Test
```

### 哈希(Hash)
```bash
# 添加
hmset Student name '张三' age 25
# 查询
hgetall Student
# 删除
del Student
```

### 列表(List)
```bash
# 添加
lpush Student '张三' '李四'
# 查询
lrange Student 0 10
# 删除
del Student
```

### 集合(Set)
```bash
# 添加
sadd Student '张三' '李四'
# 查询
smembers Student
# 删除
del Student
```

### 有序集合(sorted set)
```bash
# 添加
zadd Student 1 '张三' 2 '李四'
# 查询
zrange Student 0 10 withscores
# 删除
del Student
```

## 案例

### 1.1 向列队中添加数据( redis.php )
```php
// 接收参数
$num=$_GET['num']?$_GET['num']:100;
addData($num);

/* 向列队中添加数据 */
function addData($num=1000){
    $redis=new Redis();
    // 打开
    $redis->connect('127.0.0.1',6379);
    echo "Redis: ".$redis->ping();
    // 随机生成消息
    for ($i=0; $i<$num; $i++) {
        $data=['id'=>$i+1,'str'=>md5(mt_rand(2,2000))];
        $redis->rPush('msg',json_encode($data));
    }
    // 关闭
    $redis->close();
    return true;
}
```

### 1.2 执行列队( msg.php )
```php
$redis=new Redis();
// 连接
$redis->connect('127.0.0.1',6379);
// 阻塞设置超时时间为3秒
while($task=$redis->blPop(array('msg'),3)){
    $msg=json_decode($task[1],true);
    echo $msg['id'].': '.$msg['str'].'<br>';
}
```