#!/bin/bash

# 配置
s=$1
index="main.py"
config="server.ini"
cli="cli.py"
package="flask flask_cors PyJWT redis wheel DBUtils pymysql websockets websocket-client"

# 运行
if [ "$s" == "serve" ]; then
  {
    python $index
  } || {
    echo "> 请安装'python'"
  }
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
  uwsgi --ini $config &
# 重启
elif [ "$s" == "restart" ]; then
  ps -aux | grep uwsgi | grep -v grep | awk {'print $2'} | xargs kill
  uwsgi --ini $config &
# 停止
elif [ "$s" == "stop" ]; then
  ps -aux | grep uwsgi | grep -v grep | awk {'print $2'} | xargs kill
# Socket
elif [ "$s" == "socket" ]; then
  {
    python $cli socket start
  } || {
    echo "> 请安装'python'"
  }
# Socket[start]
elif [ "$s" == "socketStart" ]; then
  nohup python $cli socket start &
# Socket[restart]
elif [ "$s" == "socketRestart" ]; then
  ps -aux | grep "$cli socket" | grep -v grep | awk {'print $2'} | xargs kill
  nohup php $cli socket start &
# Socket[stop]
elif [ "$s" == "socketStop" ]; then
  ps -aux | grep "$cli socket" | grep -v grep | awk {'print $2'} | xargs kill
else
  echo "----------------------------------------------------"
  echo "[use] ./bash.sh <command>"
  echo "----------------------------------------------------"
  echo "<command>"
  echo "  serve         运行"
  echo "  install       安装依赖包: $package"
  echo "<Server>"
  echo "  start         启动: uwsgi --ini $config &"
  echo "  restart       重启: 中断进程并且重新启动"
  echo "  stop          停止"
  echo "<Socket>"
  echo "  socket        运行"
  echo "  socketStart   启动"
  echo "  socketRestart 重启"
  echo "  socketStop    停止"
  echo "----------------------------------------------------"
fi

