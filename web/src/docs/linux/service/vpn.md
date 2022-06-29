# VPN 服务器

## PPTP
#### 1) 安装
```bash
# Ubuntu
apt install docker.io
# CentOS
dnf install docker
```

#### 2)账号和密码
```bash
mkdir /home/vpn
vi /home/vpn/chap-secrets
```
- webmis * eckingsoul *

### 3)拉取镜像
```bash
docker pull mobtitude/vpn-pptp
```

### 4)运行容器
```bash
docker run -d --name vpn-server --net=host --privileged -v /home/vpn/chap-secrets:/etc/ppp/chap-secrets mobtitude/vpn-pptp
```

## 其他操作
```bash
docker ps -a
docker stop 容器ID
docker start 容器ID
docker kill 容器ID
docker rm 容器ID
```
