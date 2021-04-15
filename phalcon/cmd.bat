@echo off
CHCP 65001 >nul

REM 配置
set s=%1%
set ip=127.0.0.1
set port=9000
set cli=cli.php

REM 运行
 if "%s%"=="serve" (
  ( php -S %ip%:%port% -t public ) || ( echo ^> 请安装'php' )
REM 安装
) else if "%s%"=="install" (
  ( del composer.lock 2>nul && composer install ) || ( echo ^> 请安装'composer' )
REM Socket-运行
) else if "%s%"=="socket" (
  ( php %cli% socket start ) || ( echo ^> 请安装'php' )
REM Logs-运行
) else if "%s%"=="logs" (
  ( php %cli% redis logs ) || ( echo ^> 请安装'php' )
) else (
  echo ----------------------------------------------------
  echo [use] cmd.bat ^<command^>
  echo ----------------------------------------------------
  echo ^<command^>
  echo   serve         运行: php -S %ip%:%port% -t public
  echo   install       依赖包: composer install
  echo ^<WebSocket^>
  echo   socket        运行
  echo ^<Logs^>
  echo   logs          运行
  echo ----------------------------------------------------
)