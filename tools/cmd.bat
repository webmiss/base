@echo off
CHCP 65001 >nul

REM 配置
set s=%1%
set dbHost=localhost
set dbUname=root
set dbPasswd=123456
set dbName=data
set dbPath=database\%dbName%.sql
set y=%date:~3,4%
set m=%date:~8,2%
set d=%date:~11,2%
set time=%time:~0,2%:%time:~3,2%:%time:~6,2%
set dbPathBackup=database\%y%-%m%-%d%.sql
set adminerIp=127.0.0.1
set adminer=database\adminer.php

REM 数据库工具
if "%s%"=="adminer" (
  (
    php -S %adminerIp%:8880 %adminer%
  ) || (
    php -S %adminerIp%:8881 %adminer%
  ) || (
    php -S %adminerIp%:8882 %adminer%
  ) || (
    php -S %adminerIp%:8883 %adminer%
  ) || (
    php -S %adminerIp%:8884 %adminer%
  ) || (
    echo ^> 请安装'php'
  )
REM MySQL备份
) else if "%s%"=="dbExport" (
  (
    mysqldump -h%dbHost% -u%dbUname% -p%dbPasswd% --databases %dbName% --lock-all-tables --flush-logs > %dbPathBackup%
  ) || (
    echo ^> 无法执行“mysqldump”命令
  )
REM MySQL恢复
) else if "%s%"=="dbImport" (
  (
    mysql -h%dbHost% -u%dbUname% -p%dbPasswd% %dbName% < %dbPath%
  ) || (
    echo ^> 无法执行“mysql”命令
  )
) else (
  echo ----------------------------------------------------
  echo [use] cmd.bat ^<command^>
  echo ----------------------------------------------------
  echo ^<command^>
  echo   adminer       PHP数据库工具
  echo ^<MySQL^>
  echo   dbExport      备份: %dbPathBackup%
  echo   dbImport      恢复: %dbPath%
  echo ----------------------------------------------------
)