#!/bin/bash

# 配置
ip="127.0.0.1"
port="9010"
portDb="8080"
cli="cli.php"
s=$1

# 帮助
helpText(){
  echo "用法:"
  echo "  ./webmis.sh <command>"
  echo "<command>"
  echo "  serve         运行"
  echo "  socket        WebSocket-调试"
  echo "  socketStart   WebSocket-启动"
  echo "  adminer       数据库管理工具"
  echo "<args>"
  echo "  ip            服务器IP: $ip"
  echo "  port          端口: $port"
}

# 运行
if [ "$s" == "serve" ]; then
  cd public && php -S $ip:$port
# Socket
elif [ "$s" == "socket" ]; then
  php $cli socket start
# Socket[start]
elif [ "$s" == "socketStart" ]; then
  nohup php $cli socket start &
# 数据库工具
elif [ "$s" == "adminer" ]; then
  php -S $ip:$portDb adminer.php
else
  helpText
fi

