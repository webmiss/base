#!/bin/bash

# 配置
ip=127.0.0.1
port=9010
portDb=8082
s=$1

# 帮助
helpText(){
  echo "用法:"
  echo "  ./webmis.sh <command>"
  echo "<command>"
  echo "  serve       运行"
  echo "  adminer     数据库管理工具"
  echo "<args>"
  echo "  ip         服务器IP: $ip"
  echo "  port       端口: $port"
}

# 运行
if [ "$s" == "serve" ]; then
  cd public && php -S $ip:$port
# 数据库工具
elif [ "$s" == "adminer" ]; then
  php -S $ip:$portDb adminer.php
else
  helpText
fi

