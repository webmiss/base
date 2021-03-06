# CentOS 服务器

## 安装Go
```bash
dnf install golang -y
# 安装依赖包
cd /xxx/golang && ./bash install
# 打包
./bash build
# 启动
./bash start
```
**开机启动**
```bash
# 权限
chmod +x /etc/rc.d/rc.local
# 编辑文件
vi /etc/rc.d/rc.local
```
- cd /xxx/golang/ && ./bash start

<br/>

## Nginx虚拟主机
``` nginx
upstream demo_go {
    server localhost:9030;
}
upstream demo_go_websocket {
    server localhost:9031;
}
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

server {
    listen       80;
    server_name  demo-go.webmis.vip;
    set $root_path /xxx/golang/;
    root $root_path;
    index index.html;

    charset utf-8;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://demo_go;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }

    location ~* ^/(upload|favicon.png)/(.+)$ {
        root $root_path;
    }

    location /wss {
        proxy_pass http://demo_go_websocket;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Connection "keep-alive";
        proxy_set_header X-Real-IP $remote_addr;
    }

    location ~ /\.ht {
        deny  all;
    }
}
```

<br/><br/>