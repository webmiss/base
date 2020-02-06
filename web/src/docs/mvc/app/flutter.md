## 一、安装JAVA环境( jdk )
```bash
pacman -S jdk
```
### 环境变量
```bash
vi /etc/profile
```
- export JAVA_HOME=/usr/lib/jvm/java-11-jdk
- export JRE_HOME=$JAVA_HOME/jre
- export PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin

### 刷新
```bash
source /etc/profile
```
### 创建链接
```bash
ln -sf /usr/lib/jvm/java-10-jdk /usr/lib/jvm/default
ln -sf /usr/lib/jvm/java-10-jdk/jre /usr/lib/jvm/default-runtime
```
### 查看版本
```bash
javac --version
java --version
```

## 二、安装Android( SDK )
```bash
http://www.androiddevtools.cn/
```
### 环境变量
```bash
vi /etc/profile
```
- export ANDROID_HOME=/opt/android-sdk-linux
- export PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH

### 测试
```bash
# 刷新
source /etc/profile
# 查看
android
```

## 三、安装Flutter
```bash
pacman -S flutter
```
### 依赖检查
```bash
flutter doctor
```

## 四、模拟器Genymotion
```bash
pacman -S genymotion
```

## 五、VSCode调试
### 安装插件( ctrl+shift+p )
```bash
> Install Extensions > Flutter
```

### 依赖检查( ctrl+shift+p )
```bash
> Run Flutter Doctor
```

### 创建应用( ctrl+shift+p )
```bash
> Flutter: New Project
```