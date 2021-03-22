#!/bin/bash

# 配置
s=$1
jar="java-1.0.0.jar"

# 运行
if [ "$s" == "serve" ]; then
  {
    java -jar $jar
  } || {
    echo "> 请安装'java'"
  }
# 安装
elif [ "$s" == "install" ]; then
  {
    mvn clean install -e -U -DskipTests
  } || {
    echo "> 请安装'mvn'"
  }
# 打包
elif [ "$s" == "build" ]; then
  {
    mvn package -DskipTests && rm "./$jar" && cp "target/$jar" ./
  } || {
    echo "> 请安装'mvn'"
  }
# 启动
elif [ "$s" == "start" ]; then
  nohup java -jar $jar >> log.txt &
# 重启
elif [ "$s" == "restart" ]; then
  ps -aux | grep java | grep -v grep | awk {'print $2'} | xargs kill
  nohup java -jar $jar >> log.txt &
# 停止
elif [ "$s" == "stop" ]; then
  ps -aux | grep java | grep -v grep | awk {'print $2'} | xargs kill
else
  echo "----------------------------------------------------"
  echo "[use] ./bash.sh <command>"
  echo "----------------------------------------------------"
  echo "  ./bash.sh <command>"
  echo "<command>"
  echo "  serve         运行: java -jar $jar"
  echo "  install       安装依赖包: pom.xml"
  echo "  build         打包: mvn package -DskipTests"
  echo "<Server>"
  echo "  start         启动"
  echo "  restart       重启服务: 中断进程并重启"
  echo "  stop          停止服务"
  echo "----------------------------------------------------"
fi
