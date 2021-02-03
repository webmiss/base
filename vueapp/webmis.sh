#!/bin/bash

# 配置
s=$1

# 帮助
helpText(){
  echo "用法:"
  echo "  ./webmis.sh <command>"
  echo "<command>"
  echo "  serve         运行: yarn serve"
  echo "  install       安装依赖包: yarn install"
  echo "  build         打包: yarn build"
  echo "  http          预览: http-server ./dist"
}

# 运行
if [ "$s" == "serve" ]; then
  yarn serve
# 安装
elif [ "$s" == "install" ]; then
  yarn install
# 打包
elif [ "$s" == "build" ]; then
  yarn build
# 预览
elif [ "$s" == "http" ]; then
  {
    yarn build
    http-server ./dist
  } || {
    yarn global add http-server
    yarn build
    http-server ./dist
  }
else
  helpText
fi
