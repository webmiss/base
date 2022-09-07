# Flutter开发环境

## ArchLinux
#### 1) 安装Git
```bash
pacman -S git
```

#### 2) 安装JavaJdk
```bash
pacman -S jdk-openjdk jre-openjdk maven
# 查看
java -version
javac -version
```

#### 3) 安装AndroidSdk
```bash
pacman -S android-studio
```
**环境变量** ( vi /etc/profile )
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH
```
**刷新**
```bash
source /etc/profile
```
**SDK Manager**
打开 AndroidStudio > More Actions > SDK Manager
```bash
# SDK Location
/opt/android-sdk
# SDK Platforms
Android 10.0
Android 6.0
# SDK Tools
Android SDK Build-Tools
Android SDK Command-line Tools
Android Emulator
Android SDK Platform-Tools
```

#### 4) 模拟器
```bash
# 安装
pacman -S genymotion

# ARM Translation Tool
adb push Genymotion-ARM-Translation_for_9.0.zip /sdcard/Download
adb shell flash-archive.sh /sdcard/Download/Genymotion-ARM-Translation_for_9.0.zip
# 效验是否成功
adb shell getprop ro.product.cpu.abilist
```
- Custom Phone 6.0  480x854  160-MDPI
- https://github.com/m9rco/Genymotion_ARM_Translation/tree/master/package


#### 5) 安装Flutter
```bash
pacman -S flutter dart
# 目录权限
chmod -R 777 /opt/flutter
```
**中国镜像** ( vi /etc/profile )
```bash
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

#### 6) 依赖
```bash
flutter doctor -v
```

## UI自动化工具
#### 1)安装
```bash
# App
pip install uiautomator2 weditor
# 浏览器
pip install selenium requests
```
- 火狐浏览器: http://www.firefox.com.cn/
- 浏览器驱动: https://github.com/mozilla/geckodriver/releases

#### 2)使用
```bash
# 已连接设备
adb devices
# 当前运行应用
uiautomator2 current
# 定位元素
python -m weditor
```


<br/>

## Windows
#### 1) 安装Git
- 下载 [Git](https://git-scm.com/download/win)
- 安装: 64位版 > 重启系统
- VsCode: "ctrl+`" > "终端" > "powershell" > "选择默认 shell" > "Git Bash" > 重启
- 终端输入: "cmd" 和 "bash" 可相互切换

#### 2) 安装JavaJdk
- [OpenJdk8](https://jdk.java.net/java-se-ri/8-MR3)
- 解压: "openjdk-8u41-b04-windows-i586-14_jan_2020.zip" 到 "D:\server\jdk8"
- 搜索: "环境变量" > "新建" > 变量名: "JAVA_HOME" 变量值: "D:\server\jdk"
- 搜索: "环境变量" > "Path" > "添加" > "%JAVA_HOME%\bin"
- 查看: "java –version" 和 "javac –version"

#### 3) 安装AndroidSdk
- [AndroidStudio](http://developer.android.com/sdk/index.html)
- 安装: "android-studio-ide-191.5977832-windows.exe" 到 "D:\server\Android Studio"
- 配置: "Configure" > "Settings" > "System Settings" > "HTTP Proxy" > Automatic = "mirrors.neusoft.edu.cn:80"
- 配置: "Configure" > "Settings" > "System Settings" > "Android SDK" > "D:\server\android-sdk"
- 搜索: "环境变量" > "新建" > 变量名: "ANDROID_HOME" 变量值: "D:\server\android-sdk"
- 搜索: "环境变量" > "Path" > "添加" > "%ANDROID_HOME%\tools"
- 搜索: "环境变量" > "Path" > "添加" > "%ANDROID_HOME%\platform-tools"

#### 4) 模拟器
- [Genymotion](https://www.genymotion.com/download/)

#### 5) 安装Flutter
```bash
cd D:
cd server
git clone https://github.com/flutter/flutter.git -b stable --depth 1
```
**环境变量**
- 搜索: "环境变量" > "新建" > 变量名: "PUB_HOSTED_URL" 变量值: "https://pub.flutter-io.cn"
- 搜索: "环境变量" > "新建" > 变量名: "FLUTTER_STORAGE_BASE_URL" 变量值: "https://storage.flutter-io.cn"
- 搜索: "环境变量" > "Path" > "添加" > "D:\server\flutter\bin"

#### 6) 依赖
```bash
flutter doctor -v
```

<br/>

## MacOS
#### 1) 安装Git
```bash
git
```

#### 2) 安装XCode
- 应用商店下载

#### 3) 模拟器
```bash
open -a Simulator
```

#### 4) Flutter
```bash
cd $HOME
git clone https://github.com/flutter/flutter.git -b stable --depth 1
```
**环境变量**( vi $HOME/.bash_profile )
```bash
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
export PATH=PATH_TO_FLUTTER_GIT_DIRECTORY/flutter/bin:$PATH
export PATH=`pwd`/flutter/bin:$PATH
```
**开机启动**( vi $HOME/.zshrc )
```bash
source $HOME/.bash_profile
```

#### 5) 依赖
```bash
# 检测环境
flutter doctor -v
# xcode依赖
sudo gem install cocoapods
```

#### 6) 运行
```bash
flutter run
# 或者
flutter run -d 设备ID
# 查看设备ID
flutter doctor -v
```

<br/><br/>