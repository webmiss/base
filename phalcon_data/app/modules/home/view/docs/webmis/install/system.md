## 防火墙
```bash
# 开机启动
systemctl enable firewalld
# 启动
systemctl start firewalld
# 添加规则
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https
firewall-cmd --permanent --zone=public --add-service=mysql
# 重启
firewall-cmd --reload
```

## 软件仓库
```bash
# Epel源
dnf install epel-release -y
# PHP7.4
dnf install http://rpms.remirepo.net/enterprise/remi-release-8.rpm -y
```

## 一、安装Nginx
```bash
# Nginx官方源
vi /etc/dnf.repos.d/nginx.repo
```
```bash
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/mainline/centos/8/$basearch/
gpgcheck=0
enabled=1
```
```bash
# 安装
dnf install nginx -y
# 开机启动
systemctl enable nginx
systemctl start nginx
```
### 配置
```bash
vi /etc/nginx/nginx.conf
```
```nginx

	user root

	keepalive_timeout 30;

	# Gzip压缩
	gzip on;
	gzip_buffers 4 8k;
	gzip_min_length 1k;
	gzip_types application/javascript text/css application/octet-stream application/pdf image/gif image/jpeg image/png image/x-icon;
	gzip_vary on;

	#include /etc/nginx/conf.d/*.conf;
	include /home/vhosts/*.conf;
```

## 二、配置虚拟主机
```bash
# 创建目录
mkdir -p /home/vhosts
# 编辑配置文件
vi /home/vhosts/default.conf
```
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
### 测试
```bash
# 创建文件
mkdir -p /home/www
echo '<h1>WebMIS</h1>' > /home/www/index.html
chmod -R 777 /home/www/index.html
# 重启Nginx
systemctl restart nginx
```
http://服务器IP/index.html

## 三、安装PHP
```bash
# PHP7.4
dnf install php74-php-fpm php74-php-cli php74-php-gd php74-php-pdo php74-php-mbstring -y
# Phalcon
dnf install php74-php-phalcon4 -y
# Swoole
dnf install php74-php-pecl-swoole4 -y
# Redis
dnf install redis php74-php-pecl-redis5 -y
# 开机启动
systemctl enable redis
systemctl enable php74-php-fpm
# 启动
systemctl start redis
systemctl start php74-php-fpm
```
### PHP配置
```bash
vi /etc/opt/remi/php74/php.ini
```
```bash
date.timezone = "Asia/Shanghai"	#时区
session.save_path = "/tmp"	#Session目录
```
### PHP-FPM配置
```bash
vi /etc/opt/remi/php74/php-fpm.d/www.conf
```
```bash
user = nginx
group = nginx
listen = /var/opt/remi/php74/run/php-fpm/www.sock
```
### Session问题
```bash
chmod -R 777 /var/opt/remi/php74/lib/php/session
```
### PHP环境
```bash
# 探针
echo '<?php phpinfo(); ?>' > /home/www/phpinfo.php
chmod -R 777 /home/www/phpinfo.php
# 重启PHP
systemctl restart nginx
```
### Nginx调用PHP-FPM
```bash
    location ~ \.php$ {
        #fastcgi_pass   127.0.0.1:9000;
        fastcgi_pass   unix:/var/opt/remi/php74/run/php-fpm/www.sock;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
```

## 四、安装MariaDB
```bash
# 安装
dnf install mariadb mariadb-server -y
# 开机启动
systemctl enable mariadb
systemctl start mariadb
# 查看运行
netstat -tap | grep mysql
```
### 配置(root密码)
```bash
mysql_secure_installation
```
## 五、数据库管理工具
- [Adminer](https://github.com/vrana/adminer/releases/)


