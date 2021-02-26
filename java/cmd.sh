#!/bin/bash

# 配置
jar="java-1.0.0.jar"
s=$1

# 帮助
helpText(){
  echo "用法:"
  echo "  ./cmd.sh <command>"
  echo "<command>"
  echo "  serve         运行"
  echo "  install       安装依赖包: pom.xml"
  echo "  build         打包"
  echo "  start         服务器端启动"
  echo "  restart       重启服务: 中断进程并重启"
  echo "  stop          停止服务"
  echo "<args>"
  echo "  jar         JAR包名称: $f"
}

# 运行
if [ "$s" == "serve" ]; then
  java -jar $jar
# 安装
elif [ "$s" == "install" ]; then
  mvn clean install -e -U -DskipTests
# 打包
elif [ "$s" == "build" ]; then
  mvn package -DskipTests && rm "./$jar" && cp "target/$jar" ./
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
  helpText
fi
