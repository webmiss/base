@echo off
CHCP 65001 >nul

REM 配置
set s=%1%
set jar="java-1.0.0.jar"

REM 运行
if "%s%"=="serve" (
  java -jar %jar%
REM 安装
) else if "%s%"=="install" (
  mvn clean install -e -U -DskipTests
REM 打包
) else if "%s%"=="build" (
  mvn package -DskipTests && del .\%jar% && copy target\%jar% .\
) else (
  echo ----------------------------------------------------
  echo [use] .\cmd ^<command^>
  echo ----------------------------------------------------
  echo ^<command^>
  echo   serve         运行: java -jar %jar%
  echo   install       安装依赖包: pom.xml
  echo   build         打包: mvn package -DskipTests
  echo ----------------------------------------------------
)