## 一、Docker容器
是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的`Linux`机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。
### 1.1 安装
```bash
# CentOS
yum install docker
# 开机启动
systemctl enable docker
# 启动
systemctl start docker
```

### 1.2 镜像管理
```bash
# 搜索
docker search centos
# 下载
docker pull centos
# 查看
docker images
# 删除
docker rmi centos
```

### 1.3 运行镜像
```bash
# 运行
docker run -it centos

# 运行一个新容器，同时为它命名、端口映射、文件夹映射
docker run --name redmine -p 9003:80 -p 9023:22 -d -v /var/redmine/files:/redmine/files -v /var/redmine/mysql:/var/lib/mysql centos

# 退出并停止
exit

# 如何退出容器而不停止容器？
Ctrl+P+Q
```

### 1.4 容器管理
```bash
# 查看/停止/启动/杀死/移除
docker ps -a
docker stop 容器ID
docker start 容器ID
docker kill 容器ID
docker rm 容器ID

# 查看容器信息
docker inspect 容器ID

# 进入正在运行的容器
docker attach 容器ID

# 将容器储存为镜像
docker commit 容器ID 名称
```

### 1.5 镜像迁移
```bash
# 保存
docker save 镜像名称 > /home/save.tar
# 复制的服务器
scp /home/save.tar root@IP:/home/
# 导入到镜像
docker load < /home/save.tar
```

### 1.6 容器-导出/导入
```bash
docker export 容器ID > /home/export.tar
docker import export.tar
```

### 1.7 容器内部文件-拷贝/删除
```bash
docker cp 容器ID:路径 ./
docker rm 容器ID:路径 ./
```

## 二、案例：Ubuntu+Nginx服务器
### 2.1 下载并运行
```bash
# 下载Ubuntu镜像
docker pull ubuntu

# 运行容器
docker run --privileged=true -it --name nginx-ubuntu -v /home/www:/home/www ubuntu /bin/bash
```
### 2.2 安装Nginx
```bash
# 更新
apt update
# 安装
apt install nginx
# 启动
service nginx start
```
### 2.3 配置文件
```bash
# 安装vim
apt install vim
# 修改虚拟主机存放位置
vi /etc/nginx/nginx.conf
	# include /etc/nginx/conf.d/*.conf;
	# include /etc/nginx/sites-enabled/*;
	include /home/www/nginx-s1/*.conf;
# 虚拟主机目录
mkdir /home/www/nginx-s1/
# 拷贝默认配置文件
cp /etc/nginx/sites-enabled/default /home/www/nginx-s1/default.conf
```
### 2.4 配置虚拟主机
```bash
vi /home/www/nginx-s1/default.conf
```
**内容如下：**
```nginx
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        server_name localhost;
        root /home/www/s1/;
        index index.html;

        location / {
                try_files $uri $uri/ =404;
        }

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #       include snippets/fastcgi-php.conf;
        #
        #       # With php7.0-cgi alone:
        #       fastcgi_pass 127.0.0.1:9000;
        #       # With php7.0-fpm:
        #       fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        location ~ /\.ht {
                deny all;
        }
}
```
**创建网站目录**
```bash
# 网站目录
mkdir /home/www/s1
# 测试文件
echo '<h1>Server1</h1>' > /home/www/s1/index.html
# 重启服务
service nginx restart
```
### 2.5 安装SSH
```bash
# 安装
apt install openssh-server
# 启动
service ssh start

# 无法链接
vi /etc/ssh/sshd_config
	PermitRootLogin yes
	UsePAM no
```

### 2.6 如何退出容器而不停止容器？
```bash
Ctrl+P+Q
```

### 2.7 将容器储存为镜像
```bash
docker commit 容器ID ubuntu-server
```

### 2.8 运行容器
```bash
docker run --privileged=true -it --name ubuntu-s1 -v /home/www:/home/www  -p 8081:80 ubuntu-server /bin/bash

# 启动Nginx
service nginx start

# 退出容器命令行
Ctrl+P+Q
```

### 2.9 测试容器
```bash
# 查看容器ID
docker ps -a
# 查看容器IP地址
ip address
# 测试网站服务器
curl http://172.17.0.1:8081
```

## 三、服务器集群
**制作三台服务器**
- 1.进入nginx-ubuntu
- 2.修改Nginx
- 3.将容器储存为镜像
- 4.运行容器
- 5.测试结果