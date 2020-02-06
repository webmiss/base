## 一、安装
```bash
pip install flask
```
## 二、测试
```bash
mkdir $HOME/works/www/flask
```
###入口文件( flask/index.py )
```python
#!/bin/python
# -*- coding: UTF-8 -*-

from flask import Flask
app = Flask(__name__)
 
@app.route('/',methods=['GET', 'POST'])
def index():
    return 'Hello World!'
```
运行
```bash
env FLASK_APP=index.py flask run --host=0.0.0.0
```

## 三、uWSGI
```bash
pip install uwsgi
```
**配置文件( flash/server-config.ini )**
```bash
[uwsgi]
chdir = /home/webmis/works/www/flask/
wsgi-file = %(chdir)index.py
socket = %(chdir)server.sock
logto = %(chdir)web.log
callable = app
processes = 4
chmod-socket = 666
``` 
**启动uWSGI**
```bash
uwsgi --ini /home/webmis/works/www/flask/server-config.ini &
```

## 四、Nginx( flask.conf )
```nginx
upstream flask {
    server unix:///home/webmis/works/www/flask/server.sock;
}

server {
    listen       80;
    server_name  flask.webmis.cn;

    charset utf-8;

    location / {
        uwsgi_pass  flask;
        uwsgi_send_timeout 60;  # 连接超时时间
        uwsgi_connect_timeout 60;  # 请求超时时间
        uwsgi_read_timeout 60;  # 读取超时时间
        include /etc/nginx/uwsgi_params;   # uwsgi参数
        # 允许跨域请求
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
    }

}
```
重启Nginx
```bash
systemctl restart nginx
```

## 五、VSCode( launch.json )
```bash
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python: Flask",
            "type": "python",
            "request": "launch",
            "module": "flask",
            "env": {
                "FLASK_APP": "index.py"
            },
            "args": [
                "run",
                "--host=0.0.0.0",
                "--no-debugger",
                "--no-reload"
            ],
            "jinja": true
        }
    ]
}
```
