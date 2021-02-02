## Project
#### 模板( AdobeXD )
- project/设计图/APP.xd
- project/设计图/Screen.xd

#### 使用技巧
- 推荐“AdobeXD”设计APP，图标制作成矢量，便于导出 SVG 格式
- 安装 Adobe Flutter 插件，复制 SVG 内容到 “lib/library/ui/ui-icons.dart” 方便使用
- 在“APP.xd”设计图标和启动画面，复制到“Screen.xd”缩放成各种尺寸，Ctrl+e选择目录，覆盖对应文件
<br/><br/>

## Android
#### 1) 证书
```bash
# 存放目录
cd android/app/

# 生成签名文件(jks)
keytool -genkey -v -keystore key.jks -alias key -keyalg RSA -keysize 2048 -validity 20000

# 查看签名(sha1)
keytool -v -list -keystore key.jks

# keystore转jks
keytool -importkeystore -srckeystore XXX.keystore  -srcstoretype JKS -deststoretype PKCS12 -destkeystore key.p12
keytool -v -importkeystore -srckeystore key.p12  -srcstoretype PKCS12 -destkeystore key.jks -deststoretype JKS
keytool -importkeystore -srckeystore key.jks -destkeystore key.jks -deststoretype pkcs12
```
**配置打包**( android/key.properties )
```bash
storePassword=123456
keyPassword=123456
keyAlias=key
storeFile=key.jks
```

#### 2) 打包
```bash
flutter build apk
```

<br/>

## IOS
#### 1) 相关文档
- 系统: [安装&配置](/docs/linux/archlinux/macos)
- 证书: [VueAPP > 打包&发布 > iOS](/docs/vue/install/build)


#### 2) 打包&上架
- 编译: flutter build ios --release
- Xcode打开: flutter > ios > Runner.xcworkspace
- Profile: Signings & Capabilities > 填写BundleID和选择证书Profile文件
- 证书: Build Signings > Code Signing > Release > 选择"开发或生产"
- 测试IPA: Product > Archive > Ad Hoc > Export( 导出ipa文件 )
- 提交上架: Product > Archive > iOS App Store > Upload( 提交到AppStore )
- 切换账户: Xcode > Preferences > Accounts


#### MinimumOSVersion问题
- flutter clean
- flutter build ios --release
- Xcode > Runner > Flutter > AppFrameworkInfo.plist ( MinimumOSVersion: 10.0 )
- Xcode > Runner > Runner > Info.plist  ( MinimumOSVersion: 10.0 )
- Xcode > Runner > info > Deployment Target > ( 10.0 )


#### UniversalLink( 通用链接 )
**https://webmis.vip/.well-known/apple-app-site-association**
```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "ABCDE12345(团队ID).com.example.app(包名)",
        "paths": ["/app/*"]
      }
    ]
  }
}
```
**xcode > Capabilities > Associated Domains**
```text
applinks:webmis.vip
applinks:www.webmis.vip
```
- 从这里填入的域名请求文件 apple-app-site-association
- 测试: 发短信 "https://webmis.vip/app/" > 点击打开APP > 成功