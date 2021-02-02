# Flutter开发环境

## ArchLinux
#### 1) 安装Git
```bash
pacman -S git
```

#### 2) 安装JavaJdk
```bash
pacman -S jdk8-openjdk jre8-openjdk
# 查看
java --version
javac --version
```

#### 3) 安装AndroidSdk
```bash
pacman -S android-studio
# SDK目录
mkdir /opt/android-sdk
chmod -R 777 /opt/android-sdk
```
- 打开AndroidStudio，按提示安装SDK到 “/opt/android-sdk” 目录。
**环境变量** ( vi /etc/profile )
```bash
export ANDROID_HOME=/opt/android-sdk
export PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH
```
**刷新**
```bash
source /etc/profile
```

#### 4) 模拟器
```bash
pacman -S genymotion
```


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
# Android许可证
flutter doctor --android-licenses
# 检测依赖
flutter doctor -v
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
# Android许可证
flutter doctor --android-licenses
# 检测依赖
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