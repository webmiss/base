# 服务器环境

## CentOS
```bash
# Python3
dnf install python3-devel -y
pip3 install uwsgi
# 命令
ln -s /usr/bin/python3 /usr/bin/python
ln -s /usr/bin/pip3 /usr/bin/pip
# 查看版本
python -V
```

## Ubuntu
```bash
apt install python3-dev -y
pip install uwsgi
```

## 运行
```bash
# 进入项目
cd /xxx/python
mkdir public/upload
chmod -R 777 public/upload
# 依赖包
./bash install
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
- cd /xxx/python/ && ./bash start

<br/>

## Nginx虚拟主机
``` nginx
upstream flask {
    server unix:///home/www/base/python/tmp/web.sock;
}
upstream python_websocket {
    server 127.0.0.1:9011;
}

server {
    listen       80;
    listen       [::]:80;
    server_name  python.webmis.vip;
    set $root_path /home/www/base/python/public;
    root $root_path;
    index index.html;

    charset utf-8;

    location / {
        uwsgi_pass  flask;
        uwsgi_send_timeout 60;
        uwsgi_connect_timeout 60;
        uwsgi_read_timeout 60;
        include /etc/nginx/uwsgi_params;
    }
    location ~* ^/(upload|favicon.png)/(.+)$ {
        root $root_path;
    }
    location /wss {
        proxy_pass http://python_websocket;
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