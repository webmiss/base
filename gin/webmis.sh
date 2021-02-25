#!/bin/bash

# 配置
s=$1
name='webmis'
index='main.go'

# 帮助
helpText(){
  echo "用法:"
  echo "  ./webmis.sh <command>"
  echo "<command>"
  echo "  serve         运行: go run $index"
  echo "  install       安装依赖包: go get -v"
  echo "  build         打包: go build"
  echo "  http          预览: ./$name"
  echo "  start         启动"
  echo "  restart       重启"
  echo "  stop          停止"
}

# 运行
if [ "$s" == "serve" ]; then
  go run $index
# 安装
elif [ "$s" == "install" ]; then
  go clean --modcache
  go get -v
# 打包
elif [ "$s" == "build" ]; then
  go build
# 预览
elif [ "$s" == "http" ]; then
  ./$name
# 启动
elif [ "$s" == "start" ]; then
  nohup ./$name &
# 重启
elif [ "$s" == "restart" ]; then
  ps -aux | grep ./$name | grep -v grep | awk {'print $2'} | xargs kill
  nohup ./$name &
# 停止
elif [ "$s" == "stop" ]; then
  ps -aux | grep ./$name | grep -v grep | awk {'print $2'} | xargs kill
else
  helpText
fi
