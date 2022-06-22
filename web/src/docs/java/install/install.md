# Java开发环境

## ArchLinux
#### 1) 安装Git
```bash
pacman -S git
```

#### 2) 安装JavaJDK
```bash
pacman -S jdk-openjdk jre-openjdk
# 查看
java --version
javac --version
```

#### 3) 安装Maven
```bash
pacman -S maven
# 查看
mvn –v
```
<br/>

## Windows
#### 1) 安装Git
- 下载: [Git](https://git-scm.com/download/win)
- 安装: 64位版 > 重启系统
- VsCode: "ctrl+`" > "终端" > "powershell" > "选择默认 shell" > "Git Bash" > 重启
- 终端输入: "cmd" 和 "bash" 可相互切换

#### 2) 安装JavaJDK
- 下载: [OpenJdk](http://jdk.java.net/15/)
- 解压: "openjdk-15.0.1_windows-x64_bin.zip" 到 "D:\server\jdk"
- 搜索: "环境变量" > "新建" > 变量名: "JAVA_HOME" 变量值: "D:\server\jdk"
- 搜索: "环境变量" > "Path" > "添加" > "%JAVA_HOME%\bin"
- CMD: "java –version" 和 "javac –version"

#### 3) 安装Maven
- 下载: [Maven](https://maven.apache.org/download.cgi)
- 解压: "apache-maven-3.6.3-bin.zip" 到 "D:\server\maven"
- 搜索: "环境变量" > "新建" > 变量名: "MAVEN_HOME" 变量值: "D:\server\maven"
- 搜索: "环境变量" > "Path" > "添加" > "%MAVEN_HOME%\bin"
- 查看: "mvn –v"
- CMD: "java –version" 和 "javac –version"

<br/>

## MacOS
#### 1) 安装Git
```bash
git
```

#### 2) 安装JavaJDK
- 下载: [OpenJdk](http://jdk.java.net/15/)

#### 3) 安装Maven
- 下载: [Maven](https://maven.apache.org/download.cgi)

<br/><br/>