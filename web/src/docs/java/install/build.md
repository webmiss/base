# 服务器环境

## JRE
```bash
# CentOS
dnf install java-latest-openjdk -y
# Ubuntu
apt install openjdk-17-jre -y
# 查看版本
java --version
```

## 运行
```bash
# 进入项目
cd /xxx/java
mkdir public/upload
chmod -R 777 public/upload
# 启动
./bash start
```

## 开机启动
```bash
# 权限
chmod +x /etc/rc.d/rc.local
# 编辑文件
vi /etc/rc.d/rc.local
```
- cd /xxx/java/ && ./bash start

<br/>

## Nginx
``` nginx
upstream java {
    server localhost:9020;
}
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

server {
    listen       80;
    listen       [::]:80;
    server_name  java.webmis.vip;
    set $root_path /home/www/base/java/public;
    root $root_path;
    index index.html;

    charset utf-8;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://java;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }

    location ~* ^/(upload|favicon.png)/(.+)$ {
        root $root_path;
    }

}
```

## SSL证书
```bash
certbot --nginx
```

<br/><br/>