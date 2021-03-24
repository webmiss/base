@echo off
CHCP 65001 >nul

REM 配置
set s=%1%

REM 运行
if "%s%"=="serve" (
  flutter run || ( echo ^> 请安装'flutter' )
REM 安装
) else if "%s%"=="install" (
  flutter pub get || ( echo ^> 请安装'flutter' )
REM 打包
) else if "%s%"=="build" (
  flutter build apk || flutter build ios || ( echo ^> 请安装'flutter' )
) else (
  echo ----------------------------------------------------
  echo [use] .\cmd ^<command^>
  echo ----------------------------------------------------
  echo ^<command^>
  echo   serve         运行: flutter run
  echo   install       安装依赖包: flutter pub get
  echo   build         打包: flutter build apk/ios
  echo ----------------------------------------------------
)