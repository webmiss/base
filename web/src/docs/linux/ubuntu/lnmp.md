# LNMP 环境搭建

## Nginx
#### 1) 安装
```bash
apt install nginx -y
apt autoremove -y
# 查看
systemctl status nginx
```
#### 2) 配置 ( vi /etc/nginx/nginx.conf )
```nginx

    user www-data

    keepalive_timeout 30;

    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 4 8k;
    gzip_min_length 1k;
    gzip_http_version 1.0;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/octet-stream application/pdf image/gif image/jpeg image/png image/x-icon;

    #include /etc/nginx/conf.d/*.conf;
    include /home/vhosts/*.conf;
```

#### 3) 虚拟主机
```bash
# 创建目录
mkdir -p /home/vhosts
# 编辑配置文件
vi /home/vhosts/default.conf
```
**文件内容**
```nginx
server {
    listen       80 default_server;
    listen       [::]:80 default_server;
    server_name  _;
    root         /home/www/;
    index index.html;

    location / {
    }

    error_page 404 /404.html;
    location = /40x.html {
    }
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
    }
}
```

#### 4) 测试
```bash
# 创建文件
mkdir -p /home/www
echo '<h1>WebMIS</h1>' > /home/www/index.html
chmod -R 777 /home/www/index.html
# 重启Nginx
systemctl restart nginx
```
- 预览: http://IP/index.html


## MariaDB
#### 1) 安装
```bash
# 安装
apt install mariadb-server -y
# 开机启动
systemctl status mariadb
# 查看运行
netstat -tap | grep mysql
```
#### 2) 设置密码
```bash
mysql_secure_installation
```
#### 3) 数据库工具
- [Adminer](https://github.com/vrana/adminer/releases/)

#### 4) 允许Root远程访问
```bash
# 登录
mysql -uroot -p
# 设置权限
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'IDENTIFIED BY '登录密码' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost'IDENTIFIED BY 'EC12webmis@' WITH GRANT OPTION;
# 刷新
flush privileges;
# 查看
select user,host,password from mysql.user;
# 修改配置
vi /etc/mysql/mariadb.conf.d/50-server.cnf
```
- 修改"bind-address = 0.0.0.0"
- 重启服务"systemctl restart mariadb"


## Redis
```bash
# 安装
apt install redis-server -y
# 查看
systemctl status redis
# 远程访问
vi /etc/redis.conf
```
- 远程访问: (1)注释 # bind 127.0.0.1  (2)protected-mode no
- 设置密码: requirepass 新密码


## PHP
#### 1) 安装PHP7
```bash
apt install php-fpm php-cli php-mysql php-curl php-gd -y
```
#### 2) 添加扩展
```bash
# Redis
apt install php-redis

# Phalcon
curl -s https://packagecloud.io/install/repositories/phalcon/stable/script.deb.sh | sudo bash
apt install php-psr php7.4-phalcon -y
```

#### 3) PHP配置
```bash
vi /etc/php/7.4/fpm/php.ini
```
- date.timezone = "Asia/Shanghai"
- session.save_path = "/tmp"
- 

#### 4) PHP-FPM配置
```bash
vi /etc/php/7.4/fpm/pool.d/www.conf
```
- user = www-data
- group = www-data
- listen = /run/php/php7.4-fpm.sock

#### 5) Session问题
```bash
chmod -R 777 /var/lib/php/sessions
```

#### 7) 探针
```bash
echo '<?php phpinfo(); ?>' > /home/www/phpinfo.php
chmod -R 777 /home/www/phpinfo.php
```

#### 8) Nginx调用PHP-FPM
vi /home/vhosts/default.conf
```bash
    # PHP-FPM
    location ~ \.php$ {
        #fastcgi_pass   127.0.0.1:9000;
        fastcgi_pass   unix:/run/php/php7.4-fpm.sock;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
```
**重启**
```bash
systemctl restart nginx
```