#!/bin/bash

# 配置
ip="127.0.0.1"
port="9010"
portDb="8888"
cli="cli.php"
s=$1

# 帮助
helpText(){
  echo "用法:"
  echo "  ./cmd.sh <command>"
  echo "<command>"
  echo "  serve         运行"
  echo "  install       已安装模块"
  echo "  adminer       数据库管理工具"
  echo "  socket        WebSocket-调试"
  echo "  socketStart   WebSocket-启动"
  echo "  socketRestart WebSocket-重启"
  echo "  socketStop    WebSocket-停止"
  echo "<args>"
  echo "  ip            服务器IP: $ip"
  echo "  port          端口: $port"
}

# 运行
if [ "$s" == "serve" ]; then
  cd public && php -S $ip:$port
# 安装
elif [ "$s" == "install" ]; then
  rm -fr composer.lock && composer install
# 数据库工具
elif [ "$s" == "adminer" ]; then
  php -S $ip:$portDb adminer.php
# Socket
elif [ "$s" == "socket" ]; then
  php $cli socket start
# Socket[start]
elif [ "$s" == "socketStart" ]; then
  nohup php $cli socket start &
# Socket[restart]
elif [ "$s" == "socketRestart" ]; then
  ps -aux | grep "$cli socket" | grep -v grep | awk {'print $2'} | xargs kill
  nohup php $cli socket start &
# Socket[stop]
elif [ "$s" == "socketStop" ]; then
  ps -aux | grep "$cli socket" | grep -v grep | awk {'print $2'} | xargs kill
# 停止
elif [ "$s" == "stop" ]; then
  ps -aux | grep java | grep -v grep | awk {'print $2'} | xargs kill
else
  helpText
fi
