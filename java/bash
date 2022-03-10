#!/bin/bash

# 配置
s=$1
jar='java-1.0.0.jar'
log='public/upload/server.log'

# 运行
if [ "$s" == "serve" ]; then
  java -jar $jar
# 安装
elif [ "$s" == "install" ]; then
  mvn clean install -e -U -DskipTests
# 打包
elif [ "$s" == "build" ]; then
  mvn package -DskipTests && rm -fr "./$jar" && cp "target/$jar" ./
# 启动
elif [ "$s" == "start" ]; then
  nohup java -jar $jar > $log 2>&1 &
# 停止
elif [ "$s" == "stop" ]; then
  ps -aux | grep java | grep -v grep | awk {'print $2'} | xargs kill
else
  echo "----------------------------------------------------"
  echo "[use] ./bash <command>"
  echo "----------------------------------------------------"
  echo "  ./bash <command>"
  echo "<command>"
  echo "  serve         运行: java -jar $jar"
  echo "  install       安装依赖包: pom.xml"
  echo "  build         打包: mvn package -DskipTests"
  echo "<Server>"
  echo "  start         启动"
  echo "  stop          停止"
  echo "----------------------------------------------------"
fi
