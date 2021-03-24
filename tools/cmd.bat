@echo off
CHCP 65001 >nul

REM 配置
set s=%1%
set dbUname=root
set dbPasswd=123456
set dbName=data
set dbPath=database\%dbName%.sql
set dbPathBackup=database\%date:~0,4%-%date:~5,2%-%date:~8,2%_%time:~0,2%:%time:~3,2%:%time:~6,2%.sql
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
    mysqldump -u%dbUname% -p%dbPasswd% --databases %dbName% --lock-all-tables --flush-logs > %dbPathBackup%
  ) || (
    echo ^> 请安装'MySQL'或'MariaDB'
  )
REM MySQL恢复
) else if "%s%"=="dbExport" (
  (
    mysql -u%dbUname% -p%dbPasswd% %dbName% < %dbPath%
  ) || (
    echo ^> 请安装'MySQL'或'MariaDB'
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