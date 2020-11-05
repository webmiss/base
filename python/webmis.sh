#!/bin/bash

# 帮助
helpText(){
  echo "用法: webmis <command> <args>"
  echo "<command>"
  echo "    run         运行"
  echo "    start       服务器端启动"
  echo "    restart     重启服务: 中断进程并且重新启动"
  echo "    stop        停止服务"
  echo "<args>"
  echo "    -f          指定入口文件, 默认: $f"
}

# 默认
s=$1
f="web.py"
c="web.ini"

# 参数
while getopts ":f:c:h:" opt
do
  case $opt in
    f) f="$OPTARG" ;;
    c) c="$OPTARG" ;;
    ?)
    helpText
    exit 1;;
  esac
done

# 运行
if [ "$s" == "run" ]; then
  python $f
# 启动
elif [ "$s" == "start" ]; then
  uwsgi --ini web.ini &
# 重启
elif [ "$s" == "restart" ]; then
  ps -aux | grep uwsgi | grep -v grep | awk {'print $2'} | xargs kill -2
  uwsgi --ini web.ini &
# 停止
elif [ "$s" == "stop" ]; then
  ps -aux | grep uwsgi | grep -v grep | awk {'print $2'} | xargs kill -2
else
  helpText
fi

