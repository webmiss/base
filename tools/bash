#!/bin/bash

# 配置
s=$1
dbHost=localhost
dbUname=root
dbPasswd=123456
dbName=data
dbPath=database/$dbName.sql
dbPathBackup=database/$(date "+%Y-%m-%d_%H:%M:%S").sql
adminerIp=127.0.0.1
adminer=database/adminer.php

# 数据库工具
if [ "$s" == "adminer" ]; then
  {
    php -S $adminerIp:8880 $adminer
  } || {
    php -S $adminerIp:8881 $adminer
  } || {
    php -S $adminerIp:8882 $adminer
  } || {
    php -S $adminerIp:8883 $adminer
  } || {
    php -S $adminerIp:8884 $adminer
  } || {
    echo "> 请安装'php'"
  }
# MySQL备份
elif [ "$s" == "dbExport" ]; then
  {
    mysqldump -h$dbHost -u$dbUname -p$dbPasswd --databases $dbName --lock-all-tables --flush-logs > $dbPathBackup
  } || {
    echo "> 无法执行“mysqldump”命令"
  }
# MySQL恢复
elif [ "$s" == "dbImport" ]; then
  {
    mysql -h$dbHost -u$dbUname -p$dbPasswd $dbName < $dbPath
  } || {
    echo "> 无法执行“mysql”命令"
  }
else
  echo "----------------------------------------------------"
  echo "[use] ./bash <command>"
  echo "----------------------------------------------------"
  echo "<command>"
  echo "  adminer        PHP数据库工具"
  echo "<MySQL>"
  echo "  dbExport       备份: $dbPathBackup"
  echo "  dbImport       恢复: $dbPath"
  echo "----------------------------------------------------"
fi
