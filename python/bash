#!/bin/bash

# 配置
s=$1
index="main.py"
config="server.ini"
cli="cli.py"
package="python-dateutil flask flask_cors PyJWT redis wheel DBUtils pymysql websockets websocket-client qrcode Image zxing oss2"

# 运行
if [ "$s" == "serve" ]; then
  python $index
# 安装
elif [ "$s" == "install" ]; then
  {
    sudo pip install $package
  } || {
    pip install $package
  } || {
    echo "> 请安装'pip'"
  }
# 启动
elif [ "$s" == "start" ]; then
  uwsgi --ini $config 2>&1 &
# 停止
elif [ "$s" == "stop" ]; then
  ps -aux | grep uwsgi | grep -v grep | awk {'print $2'} | xargs kill
# Socket-运行
elif [ "$s" == "socket" ]; then
  {
    python $cli socket start
  } || {
    echo "> 请安装'python'"
  }
# Socket-启动
elif [ "$s" == "socketStart" ]; then
  python $cli socket start &
# Socket-停止
elif [ "$s" == "socketStop" ]; then
  ps -aux | grep "$cli socket start" | grep -v grep | awk {'print $2'} | xargs kill
# Logs-运行
elif [ "$s" == "logs" ]; then
  {
    python $cli redis logs
  } || {
    echo "> 请安装'python'"
  }
# Logs-启动
elif [ "$s" == "logsStart" ]; then
  python $cli redis logs &
# Logs-停止
elif [ "$s" == "logsStop" ]; then
  ps -aux | grep "$cli redis logs" | grep -v grep | awk {'print $2'} | xargs kill
else
  echo "----------------------------------------------------"
  echo "[use] ./bash <command>"
  echo "----------------------------------------------------"
  echo "<command>"
  echo "  serve         运行"
  echo "  install       安装依赖包: $package"
  echo "<Server>"
  echo "  start         启动: uwsgi --ini $config &"
  echo "  stop          停止"
  echo "<Socket>"
  echo "  socket        运行"
  echo "  socketStart   启动"
  echo "  socketStop    停止"
  echo "<Logs>"
  echo "  logs          运行"
  echo "  logsStart     启动"
  echo "  logsStop      停止"
  echo "----------------------------------------------------"
fi

