@REM ����
@set s=%1%
@set ip=127.0.0.1
@set port=9000
@set cli=cli.php

@REM ����
@ if "%s%"=="serve" (
  php -S %ip%:%port% -t public
@REM ��װ
) else if "%s%"=="install" (
  del composer.lock 2>nul
  composer install
) else (
  echo ----------------------------------------------------
  echo [use]
  echo   cmd.bat ^<command^>
  echo ^<command^>
  echo   serve         ����: php -S %ip%:%port% -t public
  echo   install       ������: composer install
  echo   ^>
  echo   socket        WebSocket-����
  echo   -
  echo ----------------------------------------------------
)