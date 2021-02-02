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
``` nginx
upstream demo_php_websocket {
    server 127.0.0.1:9011;
}

server {
    listen       80;
    server_name  demo.webmis.vip;
    set $root_path /xxx/base/phalcon/public;
    root $root_path;
    index index.php;

    charset utf-8;

    try_files $uri $uri/ @rewrite;
    location @rewrite {
        rewrite ^/(.*)$ /index.php?_url=/$1;
    }
    location ~* ^/(webmis|upload|themes|favicon.png)/(.+)$ {
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
        fastcgi_pass   unix:/var/opt/remi/php74/run/php-fpm/www.sock;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }

    location ~ /\.ht {
        deny  all;
    }
}
```
<br/>

## 交换分区( 扩充内存 )
``` bash
# 创建分区文件
dd if=/dev/zero of=/swapfile bs=1M count=4096

# 生成SWAP
mkswap /swapfile

# 激活SWAP
swapon /swapfile

# 添加到分区列表
echo '/swapfile swap swap defaults 0 0' >> /etc/fstab

# 查看
free -m

# 重启服务器
reboot
```
**如果是阿里云服务器**
``` bash
vi /etc/sysctl.conf
```
vm.swappiness = 60
``` bash
# 重启服务器
reboot
```

<br/><br/>