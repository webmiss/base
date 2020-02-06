## 一、安装MariaDB
``` bash
pacman -S mariadb
mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
systemctl start mysqld
```
### 设置root密码
``` bash
mysql_secure_installation
```
### 允许远程访问
``` bash
mysql -u root -p
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'IDENTIFIED BY '123456' WITH GRANT OPTION;
flush privileges;
```

## 二、安装Nginx
``` bash
pacman -S nginx
systemctl start nginx
```


## 三、安装PHP
``` bash
pacman -S php-fpm
systemctl start php-fpm
```
### 配置PHP( /etc/php/php.ini )
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
### 配置PHP-FPM( vi /etc/php/php-fpm.d/www.conf )
``` bash
# 系统用户
user = webmis
group = webmis
# 链接方式
;listen = /run/php-fpm/php-fpm.sock
listen = 127.0.0.1:9000
```
#### PHP-FPM7.4
``` bash
vi /usr/lib/systemd/system/php-fpm.service
```
ProtectHome=false
#### 重启PHP
``` bash
systemctl start php-fpm
```

## 四、配置Nginx( /etc/nginx/nginx.conf )
``` bash
 # 403拒绝访问问题
user root(系统用户名);
http {
	keepalive_timeout  65;

	#gzip  on;

	#vhost
	include /home/webmis/works/vhosts/*.conf;

	# 导入数据库文件限制
	client_max_body_size 150m;
}
```
### 配置虚拟主机
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

	# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
	location ~ \.php$ {
		#fastcgi_pass   unix:/run/php-fpm/php-fpm.sock;
		fastcgi_pass 127.0.0.1:9000;
		fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
		include        fastcgi_params;
	}
	# deny access to .htaccess files, if Apache's document root
	location ~ /\.ht {
		deny all;
	}
}
```

## 五、安装phpMyAdmin
``` bash
pacman -S phpmyadmin
```
**虚拟主机**
``` bash
# nginx
server {
	listen       8082;
	server_name  localhost;
	root /usr/share/webapps/phpMyAdmin;
	index index.php index.html;

	location / {
	}

	# redirect server error pages to the static page /50x.html
	#
	error_page   500 502 503 504  /50x.html;
	location = /50x.html {
		root   /usr/share/nginx/html;
	}

	# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
	#
	location ~ \.php$ {
		#fastcgi_pass   unix:/run/php-fpm/php-fpm.sock;
		fastcgi_pass   127.0.0.1:9000;
		fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
		include        fastcgi_params;
	}
	# deny access to .htaccess files, if Apache's document root
	# concurs with nginx's one
	#
	location ~ /\.ht {
		deny  all;
	}
}
```
重启Nginx
``` bash
systemctl restart nginx
```
注意： 访问 http://localhost:8082/setup 进行配置


