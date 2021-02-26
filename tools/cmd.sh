#!/bin/bash

# 配置
ip="127.0.0.1"
portDb7="7777"
portDb8="8888"
portDb9="9999"
cli="cli.php"
s=$1

# 帮助
helpText(){
  echo "用法:"
  echo "  ./cmd.sh <command>"
  echo "<command>"
  echo "  adminer7       数据库管理工具: 7777"
  echo "  adminer8       数据库管理工具: 8888"
  echo "  adminer9       数据库管理工具: 9999"
  echo "<args>"
  echo "  ip            服务器IP: $ip"
}

# 数据库工具-7
if [ "$s" == "adminer7" ]; then
  php -S $ip:$portDb7 adminer.php
# 数据库工具-8
elif [ "$s" == "adminer8" ]; then
  php -S $ip:$portDb8 adminer.php
# 数据库工具-9
elif [ "$s" == "adminer9" ]; then
  php -S $ip:$portDb9 adminer.php
else
  helpText
fi
