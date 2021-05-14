@echo off
CHCP 65001 >nul

REM 配置
set s=%1%

REM 运行
if "%s%"=="serve" (
  ( yarn serve ) || ( yarn install && yarn serve ) || ( echo ^> 请安装'npm install -g yarn' )
REM 安装
) else if "%s%"=="install" (
  ( yarn install ) || ( echo ^> 请安装'npm install -g yarn' )
REM 打包
) else if "%s%"=="build" (
  ( yarn install && yarn build ) || ( echo ^> 请安装'npm install -g yarn' )
REM 预览
) else if "%s%"=="http" (
  (
    yarn install && yarn build
    http-server ./dist
  ) || (
    echo ^> 准备安装'npm install -g http-server'
    npm install -g http-server
    yarn install && yarn build
    http-server ./dist
  )
) else (
  echo ----------------------------------------------------
  echo [use] .\cmd ^<command^>
  echo ----------------------------------------------------
  echo ^<command^>
  echo   serve         运行: yarn serve
  echo   install       安装依赖包: yarn install
  echo   build         打包: yarn build
  echo   http          预览: http-server ./dist
  echo ----------------------------------------------------
)