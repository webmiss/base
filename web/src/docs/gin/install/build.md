# 服务器环境

## 安装Go
```bash
# CentOS
dnf install golang -y
# Ubunut
apt install golang -y
# 查看版本
go version
```

## 运行
```bash
# 进入项目
cd /xxx/gin
mkdir public/upload
chmod -R 777 public/upload
# 安装依赖包
./bash install
# 打包
./bash build
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

## Nginx虚拟主机
``` nginx
upstream go {
    server localhost:9030;
}
upstream go_websocket {
    server localhost:9031;
}
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

server {
    listen       80;
    listen       [::]:80;
    server_name  go.webmis.vip;
    set $root_path /home/www/base/gin/public;
    root $root_path;
    index index.html;

    charset utf-8;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://go;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }

    location ~* ^/(upload|favicon.png)/(.+)$ {
        root $root_path;
    }

    location /wss {
        proxy_pass http://go_websocket;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Connection "keep-alive";
        proxy_set_header X-Real-IP $remote_addr;
    }

}
```

## SSL证书
```bash
certbot --nginx
```

<br/><br/>