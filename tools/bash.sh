#!/bin/bash

# 配置
s=$1
ip="127.0.0.1"
dbPort7="7777"
dbPort8="8888"
dbPort9="9999"
dbFile="adminer.php"

# 数据库工具-7
if [ "$s" == "adminer7" ]; then
  php -S $ip:$dbPort7 $dbFile
# 数据库工具-8
elif [ "$s" == "adminer8" ]; then
  php -S $ip:$dbPort8 $nameDb
# 数据库工具-9
elif [ "$s" == "adminer9" ]; then
  php -S $ip:$dbPort9 $nameDb
else
  echo "----------------------------------------------------"
  echo "[use] ./bash.sh <command>"
  echo "----------------------------------------------------"
  echo "<command>"
  echo "  adminer7       数据库工具: 7777"
  echo "  adminer8       数据库工具: 8888"
  echo "  adminer9       数据库工具: 9999"
  echo "----------------------------------------------------"
fi
