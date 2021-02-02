# Let's Encrypt免费证书

## 证书工具
```bash
# Epel源
dnf install epel-release
# 安装Pip
dnf install python3-pip
# Nginx插件
pip3 install certbot-nginx
```

## Nginx
#### 1) OCSP( iOS缓慢问题 )
```bash
vi /etc/hosts
```
- 23.44.51.27 ocsp.int-x3.letsencrypt.org

#### 2) Nginx配置
```nginx
server {
    listen 80;
    server_name demo.webmis.vip;

    location / {
        rewrite ^(.*) https://$server_name$1 permanent;
    }
}
server {
    listen       443 http2 ssl;
    server_name  demo.webmis.vip;
    set $root_path /home/www/base/phalcon/public;
    root $root_path;
    index index.php;

    #SSL
    ssl on;
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout  10m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4:!DH:!DHE;
    ssl_prefer_server_ciphers on;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_certificate_key /etc/letsencrypt/live/demo.webmis.vip/chain.pem;
    ssl_certificate /etc/letsencrypt/live/demo.webmis.vip/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/demo.webmis.vip/privkey.pem;

    charset utf-8;

    try_files $uri $uri/ @rewrite;
    location @rewrite {
        rewrite ^/(.*)$ /index.php?_url=/$1;
    }
    location ~* ^/(webmis|upload|themes|favicon.png)/(.+)$ {
        root $root_path;
    }

    location ~ \.php$ {
        fastcgi_pass   unix:/var/opt/remi/php74/run/php-fpm/www.sock;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }

    error_page 404 /404.html;
    location = /40x.html {
    }
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
    }
}
```
- 注意：不能使用中文注释，不要重启Nginx!

<br/>

## 获取证书
``` bash
# 自动生成
certbot --nginx
# 重启Nginx
systemctl restart nginx
```
<br/>

## 定时续期证书
``` bash
# 定时器
crontab -e
```
**添加内容**
``` bash
0 2 28 * * nohup certbot renew --quiet && systemctl reload nginx &
```
- 每月28号2点更新证书后重启Nginx

<br/><br/>