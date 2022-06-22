
## 安装Nginx
``` bash
pacman -S nginx
systemctl start nginx
```
**配置**( /etc/nginx/nginx.conf )
``` bash
 # 403拒绝访问问题
user root;  #必须Root
http {
	keepalive_timeout  65;

	#gzip  on;

	#vhost
	include /home/webmis/works/vhosts/*.conf;

	# 导入数据库文件限制
	client_max_body_size 150m;
}
```
<br/>

## 安装MariaDB
``` bash
pacman -S mariadb
mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
systemctl start mysqld
```
**设置root密码**
``` bash
mysql_secure_installation
```
**允许远程访问**
``` bash
mysql -u root -p
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'IDENTIFIED BY '123456' WITH GRANT OPTION;
flush privileges;
```
<br/>

## 安装PHP
``` bash
pacman -S php-fpm
systemctl start php-fpm
```
#### 1) 配置PHP( /etc/php/php.ini )
``` bash
# CGI
cgi.fix_pathinfo=0
# 数据库
extension=mysqli
extension=pdo_mysql
# 时区
date.timezone = "Asia/Shanghai"
# 加速 PHP
zend_extension=opcache
opcache.enable=1
opcache.enable_cli=1
opcache.file_cache=/tmp
```
#### 2) 配置PHP-FPM( vi /etc/php/php-fpm.d/www.conf )
``` bash
# 系统用户
user = webmis #系统账户
group = webmis  #账户组名
# 链接方式( 文件、TCP )
listen = /run/php-fpm/php-fpm.sock
;listen = 127.0.0.1:9000
```
#### 3) 扩展
``` bash
# Composer
pacman -S composer
# Phalcon
yay -S php-phalcon
# Redis
pacman -S redis php-redis
```
- extension=psr
- extension=phalcon

<br/>

## 虚拟主机
``` bash
mkdir -p /home/webmis/works/vhosts/
vi /home/webmis/vhosts/webmis.conf
```
**文件内容**
``` bash
# nginx
server {
	listen 80 default_server;
	server_name localhost;
	root '/home/webmis/www/';
	index index.php index.html;

	# 目录预览
	autoindex on;
	autoindex_exact_size off;
	autoindex_localtime on;

	location /{
	}

	# PHP
	location ~ \.php$ {
		fastcgi_pass   unix:/run/php-fpm/php-fpm.sock;
		#fastcgi_pass 127.0.0.1:9000;
		fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
		include        fastcgi_params;
	}
	# deny access to .htaccess files, if Apache's document root
	location ~ /\.ht {
		deny all;
	}

}
```

<br/><br/>