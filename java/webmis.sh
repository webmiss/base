#!/bin/bash

# 帮助
helpText(){
  echo "用法: webmis <command> <args>"
  echo "<command>"
  echo "    run         运行"
  echo "    build       打包"
  echo "    start       服务器端启动"
  echo "    restart     重启服务: 中断进程并且重新启动"
  echo "    stop        停止服务"
  echo "<args>"
  echo "    -f          指定, 默认: $f"
}

# 默认
s=$1
f="java-1.0.0.jar"

# 参数
while getopts ":f:h:" opt
do
  case $opt in
    f) f="$OPTARG" ;;
    ?)
    helpText
    exit 1;;
  esac
done

# 运行
if [ "$s" == "run" ]; then
  java -jar $f
# 打包
elif [ "$s" == "build" ]; then
  mvn package && rm "./$f" && cp "target/$f" ./
# 启动
elif [ "$s" == "start" ]; then
  nohup java -jar $f >> log.txt &
# 重启
elif [ "$s" == "restart" ]; then
  ps -aux | grep java | grep -v grep | awk {'print $2'} | xargs kill -2
  nohup java -jar $f >> log.txt &
# 停止
elif [ "$s" == "stop" ]; then
  ps -aux | grep java | grep -v grep | awk {'print $2'} | xargs kill -2
else
  helpText
fi

