@echo off
CHCP 65001 >nul

REM 配置
set s=%1%
set name=webmis
set index=main.go

REM 运行
if "%s%"=="serve" (
  ( go run %index% ) || ( echo ^> 请安装'go' )
REM 安装
) else if "%s%"=="install" (
  ( go clean --modcache && go get -v ) || ( echo ^> 请安装'go' )
REM 清理
) else if "%s%"=="clear" (
  ( go mod tidy ) || ( echo ^> 请安装'go' )
REM 打包
) else if "%s%"=="build" (
  ( go build ) || ( echo ^> 请安装'go' )
REM 预览
) else if "%s%"=="http" (
  ( .\%name% ) || ( echo ^> 请安装'go' )
REM Socket-运行
) else if "%s%"=="socket" (
  ( go run cli/socket/index.go ) || ( echo ^> 请安装'go' )
) else (
  echo ----------------------------------------------------
  echo [use] .\cmd.bat ^<command^>
  echo ----------------------------------------------------
  echo ^<command^>
  echo   serve         运行: go run %index%
  echo   install       安装依赖包: go get -v
  echo   clear         清理依赖包: go mod tidy
  echo   build         打包: go build
  echo   http          预览: .\%name%
  echo ^<WebSocket^>
  echo   socket        运行
  echo ----------------------------------------------------
)