@echo off
CHCP 65001 >nul

REM 配置
set s=%1%
set jar="java-1.0.0.jar"

REM 运行
if "%s%"=="serve" (
  ( java -jar %jar% ) || ( echo ^> 请安装'java' )
REM 安装
) else if "%s%"=="install" (
  ( mvn clean install -e -U -DskipTests ) || ( echo ^> 请安装'mvn' )
REM 打包
) else if "%s%"=="build" (
  ( mvn package -DskipTests && del .\%jar% && copy target\%jar% .\ ) || ( echo ^> 请安装'mvn' )
) else (
  echo ----------------------------------------------------
  echo [use] .\cmd.bat ^<command^>
  echo ----------------------------------------------------
  echo ^<command^>
  echo   serve         运行: java -jar %jar%
  echo   install       安装依赖包: pom.xml
  echo   build         打包: mvn package -DskipTests
  echo ----------------------------------------------------
)