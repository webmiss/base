# CentOS 服务器

## 安装Go
```bash
dnf install golang -y
# 安装依赖包
cd /xxx/golang && ./webmis.sh install
# 打包
./webmis.sh build
# 启动
./webmis.sh start
```
**开机启动**
```bash
# 权限
chmod +x /etc/rc.d/rc.local
# 编辑文件
vi /etc/rc.d/rc.local
```
- cd /xxx/golang/ && ./webmis.sh start

<br/>

## Nginx虚拟主机
``` nginx
upstream demo_go {
    server localhost:9010;
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

    location ~* ^/(webmis|upload|themes|favicon.png)/(.+)$ {
        root $root_path;
    }

    location ~ /\.ht {
        deny  all;
    }
}
```

<br/><br/>