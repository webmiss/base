# Let's Encrypt免费证书

## 证书工具
### CentOS
```bash
# CentOS
dnf install epel-release -y
dnf install python3-certbot-nginx -y
# Ubuntu
apt install python3-certbot-nginx -y
# 验证
certbot -h
```

## Nginx
```nginx
server {
    listen 80;
    listen       [::]:80;
    server_name webmis.vip www.webmis.vip;
    root /home/www/base/web/dist;
    index index.html;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.html;
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
# 生成
certbot --nginx
# 重启Nginx
systemctl restart nginx
```
<br />

## 定时续期证书
``` bash
# 定时器
crontab -e
```
- 0 2 28 * * sh /home/shell/ssl.sh > /dev/null 2>&1 &
- 每月28号2点更新证书后重启Nginx

**/home/sh/ssl.sh**
``` bash
#!/bin/bash
# find / -name '.certbot.lock' -exec rm {} \;
/usr/local/bin/certbot renew --force-renewal
systemctl reload nginx
```

## iOS缓慢问题
#### 1) OCSP( iOS缓慢问题 )
```bash
vi /etc/hosts
```
- 23.44.51.27 ocsp.int-x3.letsencrypt.org
#### 2) OCSP( iOS缓慢问题 )
```nginx
    #SSL
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout  10m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4:!DH:!DHE;
    ssl_prefer_server_ciphers on;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_certificate /etc/letsencrypt/live/demo.webmis.vip/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/demo.webmis.vip/privkey.pem;
```