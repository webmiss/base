FROM ubuntu:latest

MAINTAINER webmis.vip

# 升级系统、访问https
RUN apt update && apt install ca-certificates curl -y
# 安装Nginx
RUN apt install nginx -y
# 安装Go
RUN apt install golang -y
RUN go env -w GO111MODULE=on && go env -w GOPROXY=https://goproxy.cn,direct
