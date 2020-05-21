## 一、安装JDK
``` bash
pacman -S jdk-openjdk
```

## 二、安装AndroidStudio
``` bash
# 安装
pacman -S android-studio
# 下载
File > Settings > Android SDK
```
- Android SDK Platform 26
- Android SDK Build-tools 26
- Android SDK Platform-tools
- Android SDK Tools

## 三、Android开发环境
``` bash
# 环境变量
vim /etc/profile
```
- export ANDROID_HOME=/opt/android-sdk
- export PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH

``` bash
 # 配置生效
source /etc/profile
# 查看
android
```

## 四、模拟器Genymotion
```bash
pacman -S genymotion
```

## 五、打包发布
``` bash
# 生成签名文件
keytool -genkey -v -keystore appName.keystore -alias appName.keystore -keyalg RSA -validity 20000

# 签名包
jarsigner -verbose -keystore appName.keystore -signedjar ./android-release.apk ./android-debug.apk appName.keystore

# 查看签名（SHA1）
keytool -v -list -keystore appName.keystore
```
