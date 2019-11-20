## 一、安装Cordova
``` bash
# 安装 NodeJS
pacman -S npm
# 安装 Cordova
npm install -g cordova
```
### 创建测试项目
``` bash
# 新建项目
cordova create MyApp

# 创建平台
cd MyApp
cordova platform add browser

# 运行项目
cordova run browser
```

## 二、Android开发环境
### 安装JDK
``` bash
pacman -S jdk8-openjdk
```

### 安装SDK( http://www.androiddevtools.cn/ )
``` bash
 vim /etc/profile
```
export ANDROID_HOME=/home/android-sdk-linux<br>
export PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH<br>
``` bash
 # 配置生效
source /etc/profile
# 更新代理配置
android
```
Android SDK Manager > Tools > Options
``` bash
HTTP Proxy Server : mirrors.neusoft.edu.cn
HTTP Proxy Port : 80
v Force https://... sources to be fetched using http://...
# 更新完成后，安装以下包 Android SDK Tools
Android SDK Platform-tools
Android SDK Build-tools
Intel x86 Atom_64 System Image
Intel x86 Atom System Image
Android Support Repository
```
### 模拟器
``` bash
android avd

# 文件下载失败
cd $HOME/.gradle/wrapper/dists/gradle-2.14.1-all/4cj8p00t3e5ni9e8iofg8ghvk7
axel http://services.gradle.org/distributions/gradle-2.14.1-all.zip
```

## 三、创建Android平台
``` bash
cordova platform add android
cordova run android
```

## 四、打包发布
``` bash
# 生成签名文件
keytool -genkey -v -keystore android.keystore -alias android.keystore -keyalg RSA -validity 20000

# 签名包
jarsigner -verbose -keystore android.keystore -signedjar ./android-release.apk ./android-debug.apk android

# 打包并签名
cordova build android --release -- --keystore="android.keystore" --storePassword=PSSWD --alias=android

# Cordova 配置文件
vim build.json
	{
		"android": {
			"release": {
				"keystore": "key/android.keystore",
				"alias": "android",
				"storePassword": "PSSWD",
				"password": "PSSWD"
			}
		}
	}
# 打包并签名
cordova build android --release
```
