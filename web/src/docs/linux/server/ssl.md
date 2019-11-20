## LetsEncrypt免费证书
``` bash
# Epel源
yum install epel-release
# 下载
cd /home/sh
wget https://dl.eff.org/certbot-auto --no-check-certificate
chmod +x ./certbot-auto
# 安装
./certbot-auto -n
# 测试
./certbot-auto -h
```

## 获取证书
### 1、验证网站
``` nginx
# Nginx
server {
    listen 80;
    server_name webmis.vip www.webmis.vip;

    location / {
        rewrite ^(.*) https://$server_name$1 permanent;
    }

    # 证书验证
    location ~ /.well-known {
        allow all;
    }
}
```
创建证书时Certbot会在网站根目录下创建.well-known临时目录验证网站，所以要保证该文件夹能被外网访问！
``` bash
# 创建目录
mkdir /home/www/webmis/public/.well-known
# 修改权限
chmod -R 755 /home/www/webmis/public/.well-known
```

### 2、生成证书
``` bash
/home/sh/certbot-auto certonly --webroot --email admin@webmis.vip -w /home/www/webmis/public/ -d webmis.vip -d www.webmis.vip
```
注意：执行此命令后会生成证书, 保存在 /etc/letsencrypt/live 中对应的域名目录下面。<br>
<br>
cert.pem # Apache服务器端证书<br>
chain.pem # Apache根证书和中继证书<br>
fullchain.pem # Nginx所需要ssl_certificate文件<br>
privkey.pem #安全证书KEY文件<br>

### 3、Nginx证书配置
``` nginx
server {
    listen       443 ssl http2;
    server_name  webmis.vip www.webmis.vip;
    ssl on;
    ssl_certificate /etc/letsencrypt/live/webmis.vip/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/webmis.vip/privkey.pem;
}
```

## 定时续期证书
``` bash
# crontab -e
0 2 28 * * /home/sh/certbot-auto renew --quiet && systemctl restart nginx 2>&1
```
每月28号2点更新证书后重启Nginx

### 其他
``` bash
# 测试续期
/home/sh/certbot-auto renew --dry-run

# 禁止输出信息
/home/sh/certbot-auto renew --quiet
```
