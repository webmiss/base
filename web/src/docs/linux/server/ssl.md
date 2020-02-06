## LetsEncrypt免费证书
``` bash

# Epel源
yum install epel-release

# python3包管理(pip)
yum install python3-pip

# Nginx插件
pip3 install certbot-nginx

```

## Nginx配置
``` nginx
upstream websocket {
    server 127.0.0.1:9010;
}
server {
    listen 80;
    server_name webmis.vip www.webmis.vip;

    location / {
        rewrite ^(.*) https://$server_name$1 permanent;
    }
}
server {
    listen       443 http2 ssl;
    server_name  www.webmis.vip webmis.vip;
    set $root_path /home/www/base/web/dist/;
    root $root_path;
    index index.html;

    #SSL
    #ssl on;
    #ssl_session_cache shared:SSL:1m;
    #ssl_certificate /etc/letsencrypt/live/webmis.vip/fullchain.pem;
    #ssl_certificate_key /etc/letsencrypt/live/webmis.vip/privkey.pem;
    #include /etc/letsencrypt/options-ssl-nginx.conf;
    #ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    charset utf-8;

    location / {
    }

    # Socket Wss
    location /wss {
        proxy_pass http://websocket;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Connection "keep-alive";
        proxy_set_header X-Real-IP $remote_addr;
    }

    error_page 404 /404.html;
    location = /40x.html {
    }
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
    }
}
```

## 自动生成(不能使用中文)
``` bash
certbot --nginx
```
- https://www.ssllabs.com/ssltest/analyze.html?d=webmis.vip

## 手动生成证书
``` bash
certbot certonly --webroot --email admin@webmis.vip -w /home/www/webmis/public/ -d webmis.vip -d www.webmis.vip
```
注意：执行此命令后会生成证书, 保存在 /etc/letsencrypt/live 中对应的域名目录下面。
- cert.pem # Apache服务器端证书
- chain.pem # Apache根证书和中继证书
- fullchain.pem # Nginx所需要ssl_certificate文件
- privkey.pem #安全证书KEY文件

## 定时续期证书
``` bash
# crontab -e
0 2 28 * * certbot renew --quiet && systemctl restart nginx 2>&1
```
每月28号2点更新证书后重启Nginx

### 其他
``` bash
# 测试续期
certbot renew --dry-run

# 禁止输出信息
certbot renew --quiet

# pyOpenSSL错误、urllib3错误
pip install --upgrade --force-reinstall 'requests==2.6.0'
pip install --upgrade urllib3
```
