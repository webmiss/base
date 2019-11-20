## 防火墙
```bash
# 添加规则
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=mysql

# 重启
firewall-cmd --reload
```

## 软件仓库
```bash
yum install epel-release -y

# PHP7.3
yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm -y
```

## 一、安装Nginx
```bash
# Nginx 官方源
vi /etc/yum.repos.d/nginx.repo
```
**添加如下内容**
```bash
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/mainline/centos/7/$basearch/
gpgcheck=0
enabled=1
```

### 安装
```bash
yum install nginx -y

# 开机启动
systemctl enable nginx
systemctl start nginx
```

### 测试
```bash
http://服务器IP
```

### 配置
```bash
vi /etc/nginx/nginx.conf
```
文件内容
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
# 拷贝配置文件
cp /etc/nginx/conf.d/*.conf /home/vhosts/default.conf
# 编辑配置文件
vi /home/vhosts/default.conf
```
文件内容
```nginx
server {
	# 监听80端口(默认服务器只允许一台虚拟主机)
	listen       80 default_server;
	# 监听域名
	server_name  localhost;
	# 指向目录
	root /home/www/;
	# 默认打开文件
	index index.php index.html;

	# 设置编码
	charset utf-8;

	# 网站根目录
	location / {

	}

	# 禁用.ht文件
	location ~ /\.ht {
		deny  all;
	}
}
```
### 重启Nginx
```bash
systemctl restart nginx
```
### 测试
```bash
echo '<h1>Server</h1>' > /home/www/test.html
```
http://服务器IP/test.html

## 三、安装PHP
```bash
# PHP5
yum install php-fpm php-mysql php-cli php-gd php-pdo php-mbstring -y

# PHP7.3
yum install php73-php-fpm php73-php-cli php73-php-gd php73-php-pdo php73-php-mbstring -y

# Phalcon
yum install php73-php-phalcon3 -y

# Swoole
yum install php73-php-pecl-swoole4 -y

# Redis
yum install redis php73-php-pecl-redis5 -y

# 开机启动
systemctl enable php-fpm
systemctl start php-fpm

systemctl enable redis
systemctl start redis

systemctl enable php73-php-fpm
systemctl start php73-php-fpm
```

### 配置
```bash
vi /etc/php.ini
vi /etc/opt/remi/php73/php.ini
```
- date.timezone = "Asia/Shanghai"	#时区
- session.save_path = "/tmp"	#Session目录

### Session问题
```bash
chmod -R 777 /var/opt/remi/php73/lib/php/session
```

### PHP-FPM配置
```bash
vi /etc/opt/remi/php73/php-fpm.d/www.conf
```
- user = nginx
- group = nginx

### Nginx调用PHP
```nginx
	# 调用PHP环境
	location ~ \.php$ {
		fastcgi_pass   127.0.0.1:9000;
		fastcgi_index  index.php;
		fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
		include        fastcgi_params;
	}
```

## 四、安装MariaDB
```bash
# 安装
yum install mariadb mariadb-server -y

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

## 五、数据库管理
```bash
https://github.com/vrana/adminer/releases/download/v4.7.5/adminer-4.7.5.php
```

## 六、ThinkPHP5重写
### 1) PHP配置
```bash
vi /etc/php.ini
```
cgi.fix_pathinfo = 1
### 2) Nginx配置
```bash
    location / {
        index  index.html index.htm index.php;
        if (!-e $request_filename) {
            rewrite  ^(.*)$  /index.php?s=/$1  last;
            break;
        }
     }

     location ~ \.php$ {
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_split_path_info  ^((?U).+\.php)(/?.+)$;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        fastcgi_param  PATH_INFO  $fastcgi_path_info;
        fastcgi_param  PATH_TRANSLATED  $document_root$fastcgi_path_info;
        include        fastcgi_params;
    }
```
### 3) 重启服务
```bash
systemctl restart nginx php-fpm
```
