#!/bin/bash

# 配置
s=$1
name='golang'
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
else
  helpText
fi
