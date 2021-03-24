# CentOS 服务器

## 打包
```bash
mvn package
```

## Bash命令
```bash
# 打包
./bash build
# 启动
./bash start
# 重启
./bash restart
# 停止
./bash stop
```
**开机启动**
```bash
# 权限
chmod +x /etc/rc.d/rc.local
# 编辑文件
vi /etc/rc.d/rc.local
```
- cd /xxx/java/ && ./bash start

<br/>

## Nginx虚拟主机
``` nginx
upstream demo_java {
    server localhost:9000;
}
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

server {
    listen       80;
    server_name  demo-java.webmis.vip;
    set $root_path /xxx/java/;
    root $root_path;
    index index.html;

    charset utf-8;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://demo_java;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }

    location ~* ^/(webmis|upload|themes|favicon.png)/(.+)$ {
        root $root_path;
    }

    location ~ /\.ht {
        deny  all;
    }
}
```

<br/><br/>