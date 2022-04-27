@echo off
CHCP 65001 >nul

REM 配置
set s=%1%
set index=main.py
set cli=cli.py
set package=python-dateutil flask flask_cors PyJWT redis wheel DBUtils pymysql websockets websocket-client qrcode Image zxing oss2

REM 运行
 if "%s%"=="serve" (
  ( python %index% ) || ( echo ^> 请安装'python' )
REM 安装
) else if "%s%"=="install" (
  ( sudo pip install %package% ) || ( pip install %package% ) || ( echo ^> 请安装'pip' )
REM Socket-运行
) else if "%s%"=="socket" (
  ( python %cli% socket start ) || ( echo ^> 请安装'python' )
REM Logs-运行
) else if "%s%"=="logs" (
  ( python %cli% redis logs ) || ( echo ^> 请安装'python' )
) else (
  echo ----------------------------------------------------
  echo [use] cmd.bat ^<command^>
  echo ----------------------------------------------------
  echo ^<command^>
  echo   serve         运行: php -S %ip%:%port% -t public
  echo   install       依赖包: composer install
  echo ^<Socket^>
  echo   socket        运行
  echo ^<Logs^>
  echo   logs          运行
  echo ----------------------------------------------------
)