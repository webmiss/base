@REM 配置
@set s=%1%
@set ip=127.0.0.1
@set port=9000
@set cli=cli.php

@REM 运行
@ if "%s%"=="serve" (
  php -S %ip%:%port% -t public
@REM 安装
) else if "%s%"=="install" (
  del composer.lock 2>nul
  composer install
) else (
  echo ----------------------------------------------------
  echo [use]
  echo   cmd.bat ^<command^>
  echo ^<command^>
  echo   serve         运行: php -S %ip%:%port% -t public
  echo   install       依赖包: composer install
  echo   ^>
  echo   socket        WebSocket-调试
  echo   -
  echo ----------------------------------------------------
)