@echo off
CHCP 65001 >nul

REM 配置
set s=%1%
set ip=127.0.0.1
set dbPort7=7777
set dbPort8=8888
set dbPort9=9999
set dbFile=adminer.php

REM 数据库工具-7
if "%s%"=="adminer7" (
  ( php -S %ip%:%dbPort7% %dbFile% ) || ( echo ^> 请安装'php' )
REM 数据库工具-8
) else if "%s%"=="adminer8" (
  ( php -S %ip%:%dbPort8% %dbFile% ) || ( echo ^> 请安装'php' )
REM 数据库工具-9
) else if "%s%"=="adminer9" (
  ( php -S %ip%:%dbPort9% %dbFile% ) || ( echo ^> 请安装'php' )
) else (
  echo ----------------------------------------------------
  echo [use] cmd.bat ^<command^>
  echo ----------------------------------------------------
  echo ^<command^>
  echo   adminer7      数据库工具: 7777
  echo   adminer8      数据库工具: 8888
  echo   adminer9      数据库工具: 9999
  echo ----------------------------------------------------
)