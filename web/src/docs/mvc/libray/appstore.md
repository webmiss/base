
## 申请iOS发布证书
https://developer.apple.com/

### P12证书
- 1) 钥匙串访问 > 证书助理 > 从证书颁发结构请求证书 > 储存到本地
- 2) 苹果开发者 > 创建证书 > iOS Distribution > 上传刚生成到密钥 > 下载证书 > 导入到登录
- 3) 钥匙串访问 > 登录 > 证书 > 右键导出

### 证书管理( Certificates, Identifiers & Profiles )
- 1) Certificates // 创建证书 例如: iOS Development(开发版)、iOS Distribution(发行版)
- 2) Identifiers // 创建AppID 例如: com.xxx.项目名称
- 3) Devices  // 调试设备UDID 例如: 79dd895e0e6733603914a81af4f6d94544a2acba
- 4) Profiles // 描述文件 例如: iOS App Development(开发版)、App Store(应用商店)

### 上架资料
https://appstoreconnect.apple.com/

### 提交IPA包
xcode > Product > Archive