#!/bin/bash

# 配置
s=$1

# 运行
if [ "$s" == "serve" ]; then
  {
    flutter run
  } || {
    echo "> 请安装'flutter"
  }
# 安装
elif [ "$s" == "install" ]; then
  {
    flutter pub get
  } || {
    echo "> 请安装'flutter"
  }
# 打包
elif [ "$s" == "build" ]; then
  {
    flutter build apk
  } || {
    flutter build ios
  } || {
    echo "> 请安装'flutter"
  }
else
  echo "----------------------------------------------------"
  echo "[use] ./bash.sh <command>"
  echo "----------------------------------------------------"
  echo "<command>"
  echo "  serve         运行: flutter run"
  echo "  install       安装依赖包: flutter pub get"
  echo "  build         打包: flutter build apk/ios"
  echo "----------------------------------------------------"
fi
