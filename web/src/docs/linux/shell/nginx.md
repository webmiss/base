## 1. Nginx反向代理和负载均衡
使用代理服务器可以将请求转发给内部的Web服务器，使用这种加速模式显然可以提升静态网页的访问速度。因此也可以考虑使用这种技术，让代理服务器将请求均匀转发给多台内部Web服务器之一上，从而达到负载均衡的目的。这种代理方式与普通的代理方式有所不同，标准代理方式是客户使用代理访问多个外部Web服务器，而这种代理方式是多个客户使用它访问内部Web服务器，因此也被称为反向代理模式。
### 1.1 配置主WEB服务器
```bash
vi /home/vhosts/default.conf
```
**配置内容**
```nginx
# 设定负载均衡的服务器列表
upstream webservice {
    # weight为权重值
    server 127.0.0.1:8081 weight=3;
    server 127.0.0.1:8082 weight=3;
    server 127.0.0.1:8083 weight=3;
}

server {
    listen       80 default_server;
    server_name  localhost;
    root /home/www/;
    index index.php;

    charset utf-8;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        # 反向代理
        proxy_pass  http://webservice;
        # 相关配置
        proxy_redirect     off;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_max_temp_file_size 0;
        proxy_connect_timeout      90;
        proxy_send_timeout         90;
        proxy_read_timeout         90;
        proxy_buffer_size          4k;
        proxy_buffers              4 32k;
        proxy_busy_buffers_size    64k;
        proxy_temp_file_write_size 64k;
    }
}
```
**重启Nginx**
```bash
systemctl restart nginx
```

### 1.2 脚本测试( test.sh )
```bash
#!/bin/bash
for((i=1;i<=1000;i++));
do
curl http://localhost:80
done
```
**执行脚本**
```bash
sh test.sh
```