# CentOS 服务器

## 安装Composer
```bash
# PHP命令
ln -s /usr/local/bin/php74 /usr/bin
# 下载
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
# 安装
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
# 查看
composer -V
# 安装依赖包
cd /xxx/phalcon && composer install
```
<br/>

## Nginx虚拟主机
```bash
vi /home/vhosts/demo-php.webmis.vip.conf
```
#### 内容
```nginx
upstream demo_php_websocket {
    server 127.0.0.1:9001;
}

server {
    listen       80;
    listen       [::]:80;
    server_name  demo-php.webmis.vip;
    set $root_path /home/www/base/phalcon/public;
    root $root_path;
    index index.php;

    charset utf-8;

    try_files $uri $uri/ @rewrite;
    location @rewrite {
        rewrite ^/(.*)$ /index.php?_url=/$1;
    }
    location ~* ^/(upload|favicon.png)/(.+)$ {
        root $root_path;
    }
    location /wss {
        proxy_pass http://demo_php_websocket;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Connection "keep-alive";
        proxy_set_header X-Real-IP $remote_addr;
    }

    location ~ \.php$ {
        fastcgi_pass   unix:/run/php/php7.4-fpm.sock;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```

## SSL证书
```bash
certbot --nginx
```

<br/><br/>