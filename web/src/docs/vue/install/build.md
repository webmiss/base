## 一、打包
#### Bash命令
```bash
./bash build
```
#### Yarn命令
```bash
yarn build
```
### HBuilder 云打包
- [HBuilder X](https://www.dcloud.io/hbuilderx.html)
- 打包: 打开"dist"目录 > 发布 > 原生App-云打包
- 配置文件: public/manifest.json
<br/>

## 二、本地预览
#### Bash命令
```bash
./bash http
```
#### Yarn命令
```bash
# 安装
yarn global add http-server
# 运行
http-server ./dist
```

<br>

## 三、发布
## Web
```nginx
server {
    listen       80;
    server_name  app.webmis.vip;
    root /home/www/base/vueapp/dist;
    index index.html;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~ /\.ht {
        deny  all;
    }
}
```

## Android
**证书**
``` bash
# 生成签名文件
keytool -genkey -v -keystore appName.keystore -alias appName.keystore -keyalg RSA -validity 20000
# 签名包
jarsigner -verbose -keystore appName.keystore -signedjar ./android-release.apk ./android-debug.apk appName.keystore
# 查看签名（SHA1）
keytool -v -list -keystore appName.keystore
```

## iOS
- [苹果开发者中心](https://developer.apple.com/)
- 无苹果电脑可参考 Linux > [VirtualBox-MacOS](/docs/linux/shell/macos)

### 1) P12证书
- 钥匙串访问 > 证书助理 > 从证书颁发结构请求证书 > 储存到本地
- 苹果开发者 > 创建证书 > iOS Distribution > 上传刚生成到密钥 > 下载证书 > 导入到登录
- 钥匙串访问 > 登录 > 证书 > 右键导出

### 2) 证书管理( Certificates, Identifiers & Profiles )
- Certificates // 创建证书 例如: iOS Development(开发版)、iOS Distribution(发行版)
- Identifiers // 创建AppID 例如: com.xxx.项目名称
- Devices  // 调试设备UDID 例如: 79dd895e0e6733603914a81af4f6d94544a2acba
- Profiles // 描述文件 例如: iOS App Development(开发版)、App Store(应用商店)

### 3) 上架资料
- [AppStore](https://appstoreconnect.apple.com/)

### 4) AppStore
- 打包提交： xcode > Product > Archive
- 软件方式: Transporter

### 5) Transporter问题
Transporter 安装上第一次打开后，会在硬盘 ~/Library/Caches/com.apple.amp.itmstransporter 目录下下载一些缓存文件，这些缓存文件没有下载完，或者下载失败没下载完时，使用Transporter去提交应用这个页面就会卡住或者这个页面很慢。
```bash
# 下载
/Applications/Transporter.app/Contents/itms/bin/iTMSTransporter
# 大小
du -sh ~/Library/Caches/com.apple.amp.itmstransporter
```
- 如果失败删除com.apple.amp.itmstransporter目录，再重试

<br/><br/>