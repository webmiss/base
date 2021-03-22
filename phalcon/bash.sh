#!/bin/bash

# 配置
ip="127.0.0.1"
port="9000"
cli="cli.php"
s=$1

# 运行
if [ "$s" == "serve" ]; then
  {
    php -S $ip:$port -t public
  } || {
    echo "> 请安装'php'"
  }
# 安装
elif [ "$s" == "install" ]; then
  {
    rm -fr composer.lock && composer install
  } || {
    echo "> 请安装'composer'"
  }
# Socket
elif [ "$s" == "socket" ]; then
  {
    php $cli socket start
  } || {
    echo "> 请安装'php'"
  }
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
  echo "----------------------------------------------------"
  echo "[use] ./bash.sh <command>"
  echo "----------------------------------------------------"
  echo "<command>"
  echo "  serve         运行: php -S $ip:$port -t public"
  echo "  install       依赖包: composer install"
  echo "<WebSocket>"
  echo "  socket        运行"
  echo "  socketStart   启动"
  echo "  socketRestart 重启"
  echo "  socketStop    停止"
  echo "----------------------------------------------------"
fi
