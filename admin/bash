#!/bin/bash

# 配置
s=$1

# 运行
if [ "$s" == "serve" ]; then
  {
    yarn serve
  } || {
    yarn install && yarn serve
  } || {
    echo "> 请安装'npm install -g yarn'"
  }
# 安装
elif [ "$s" == "install" ]; then
  {
    yarn install
  } || {
    echo "> 请安装'npm install -g yarn'"
  }
# 打包
elif [ "$s" == "build" ]; then
  {
    yarn install && yarn build
  } || {
    echo "> 请安装'npm install -g yarn'"
  }
# 预览
elif [ "$s" == "http" ]; then
  {
    yarn install && yarn build
    http-server ./dist
  } || {
    echo "> 准备安装'yarn global add http-server'"
    yarn global add http-server
    yarn install && yarn build
    http-server ./dist
  }
else
  echo "----------------------------------------------------"
  echo "[use] ./bash <command>"
  echo "----------------------------------------------------"
  echo "<command>"
  echo "  serve         运行: yarn serve"
  echo "  install       安装依赖包: yarn install"
  echo "  build         打包: yarn build"
  echo "  http          预览: http-server ./dist"
  echo "----------------------------------------------------"
fi
