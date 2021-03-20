@REM 配置
@set s=%1%

@REM 运行
@ if "%s%"=="serve" (
  yarn serve
@REM 安装
) else if "%s%"=="install" (
  yarn install
@REM 打包
) else if "%s%"=="build" (
  yarn build
@REM 预览
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
  echo   serve         运行: yarn serve
  echo   install       安装依赖包: yarn install
  echo   build         打包: yarn build
  echo   http          预览: http-server ./dist
  echo   -
  echo ----------------------------------------------------
)