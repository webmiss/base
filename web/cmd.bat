@REM ����
@set s=%1%

@REM ����
@ if "%s%"=="serve" (
  yarn serve
@REM ��װ
) else if "%s%"=="install" (
  yarn install
@REM ���
) else if "%s%"=="build" (
  yarn build
@REM Ԥ��
) else if "%s%"=="http" (
  if "http-server ./dist 2>&1" NEQ "" (
    echo 123
  )
  echo %errorlevel%
  if errorlevel 0 (
    echo suc
  ) else (
    npm install -g http-server
    http-server ./dist
  )
) else (
  echo ----------------------------------------------------
  echo [use]
  echo   ./shell ^<command^>
  echo ^<command^>
  echo   serve         ����: yarn serve
  echo   install       ��װ������: yarn install
  echo   build         ���: yarn build
  echo   http          Ԥ��: http-server ./dist
  echo   -
  echo ----------------------------------------------------
)