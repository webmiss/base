#!/bin/bash

# 配置
ip=127.0.0.1
port=9010
s=$1

# 帮助
helpText(){
  echo "用法:"
  echo "  ./webmis.sh <command>"
  echo "<command>"
  echo "  serve       运行"
  echo "<args>"
  echo "  ip         服务器IP: $ip"
  echo "  port       端口: $port"
}

# 命令
if [ "$s" == "serve" ]; then
  cd public &&  php -S $ip:$port
else
  helpText
fi

