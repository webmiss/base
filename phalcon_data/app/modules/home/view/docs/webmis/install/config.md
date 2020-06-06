## 数据中心( phalcon_data/app/config/env.php )
```php
<?php

/* 正式 */
$img_url = 'https://data.webmis.vip/';

return [
  'version'=>'1.0.0',  //版本
  'title'=>'WebMIS-数据中心',  //标题
  'Keywords'=>'WebMIS,数据中心',  //关键字
  'description'=>'WebMIS',  //简介300字以内
  /* 加密 */
  'key'=>'',  //加密字符串
  'token_name'=>'DataToken_', //Token命名前缀
  'token_time'=>7*24*3600,  //Token有效时长
  /* 命令行 */
  'cli'=>'php '.__DIR__.'/../cli.php ', //命令行入口文件
  /* 本地资源 */
  'img_url'=>$img_url,  //图片根目录
  /* 数据库 */
  'database' => [
    'adapter'=>'Mysql', //类型
    'host'=>'', //主机
    'username'=>'', //用户名
    'password'=>'', //密码
    'dbname'=>'', //数据库名
    'charset'=>'utf8',  //编码
  ],
  /* 缓存 */
  'redis'=>[
    'host'=>'127.0.0.1',  //服务器地址
    'port'=>6379, //端口
    'pwd'=>'',  //密码
    'db'=>0,  //硬盘
  ],
  /* APP配置 */
  'application' => [
    'appDir'=>APP_PATH.'/', //APP目录
    'cacheDir'=> BASE_PATH.'/cache/', //缓存目录
    'baseUri'=>'',  //根目录
  ],
  /* Socket */
  'socket_name'=> 'BaseSocket', // 缓存名称
  'socket_ip'=> '0.0.0.0',  // IP地址
  'socket_port'=> 9010, // 端口
  /* 百度AI */
  'baidu_appKey'=>'', //Key
  'baidu_appSecret'=>'',  //Secret
  /* 钉钉 */
  'ding_appKey'=>'',  //Key
  'ding_appSecret'=>'', //Secret
  /* 微信小程序 */
  'wechat_token'=>'', //消息Token
  'wechat_EncodingAESKey'=>'', //消息AESKey
  'wechat_AppID'=>'', //应用ID
  'wechat_AppSecret'=>'', //应用Secret
  'wechat_MchID'=>'', //商户ID
  'wechat_Key'=>'', //商户Key
  /* 支付宝 */
  'alipay_appId'=>'', //应用ID
  'alipay_signType'=>'RSA2',  //加密方式
  'alipay_charset'=>'UTF-8',  //编码
  'alipay_version'=>'1.0',  //版本
  'alipay_rsaPrivateKey'=>'', //商户私钥
  'alipay_rsaPublicKey'=>'',  //支付宝公钥
  'alipay_appCertSn'=>'../app/library/ali/appCertPublicKey.crt',  //APP证书
  'alipay_publicCertSn'=>'../app/library/ali/alipayCertPublicKey.crt',  //支付宝证书
  'alipay_rootCertSn'=>'../app/library/ali/alipayRootCert.crt', //支付宝根证书
];

```

## 基础框架( phalcon/app/config/env.php )
```php
<?php

/* 正式 */
$img_url = 'https://api.webmis.vip/';
$centre_url = 'https://data.webmis.vip/api/';

return [
  'version'=>'1.0.0', //版本
  'title'=>'基础系统',  //标题
  'Keywords'=>'WebMIS,基础系统',  //关键字
  'description'=>'基础系统',  //简介300字以内
  /* 加密 */
  'key'=>'',  //加密字符串
  'token_name'=>'Token_', //Token命名前缀
  'token_time'=>7*24*3600,  //Token有效时长
  /* 命令行 */
  'cli'=>'php '.__DIR__.'/../cli.php ', //命令行入口文件
  /* 本地资源 */
  'img_url'=>$img_url,  //图片根目录
  /* 数据中心 */
  'centre_url'=>$centre_url,  //服务器地址
  'centre_id'=>'', //ID
  'centre_secret'=>'',  //Secret
  /* 数据库 */
  'database' => [
    'adapter'=>'Mysql', //类型
    'host'=>'', //主机
    'username'=>'', //用户名
    'password'=>'', //密码
    'dbname'=>'', //数据库名
    'charset'=>'utf8',  //编码
  ],
  /* 缓存 */
  'redis'=>[
    'host'=>'127.0.0.1',  //服务器地址
    'port'=>6379, //端口
    'pwd'=>'',  //密码
    'db'=>0,  //硬盘
  ],
  /* APP配置 */
  'application' => [
    'appDir'=>APP_PATH.'/', //APP目录
    'cacheDir'=> BASE_PATH.'/cache/', //缓存目录
    'baseUri'=>'',  //根目录
  ],
  /* Socket */
  'socket_name'=> 'BaseSocket', // 缓存名称
  'socket_ip'=> '0.0.0.0',  // IP地址
  'socket_port'=> 9010, // 端口
  /* 百度AI */
  'baidu_appKey'=>'', //Key
  'baidu_appSecret'=>'',  //Secret
  /* 钉钉 */
  'ding_appKey'=>'',  //Key
  'ding_appSecret'=>'', //Secret
  /* 微信小程序 */
  'wechat_token'=>'', //消息Token
  'wechat_EncodingAESKey'=>'', //消息AESKey
  'wechat_AppID'=>'', //应用ID
  'wechat_AppSecret'=>'', //应用Secret
  'wechat_MchID'=>'', //商户ID
  'wechat_Key'=>'', //商户Key
  /* 支付宝 */
  'alipay_appId'=>'', //应用ID
  'alipay_signType'=>'RSA2',  //加密方式
  'alipay_charset'=>'UTF-8',  //编码
  'alipay_version'=>'1.0',  //版本
  'alipay_rsaPrivateKey'=>'', //商户私钥
  'alipay_rsaPublicKey'=>'',  //支付宝公钥
  'alipay_appCertSn'=>'../app/library/ali/appCertPublicKey.crt',  //APP证书
  'alipay_publicCertSn'=>'../app/library/ali/alipayCertPublicKey.crt',  //支付宝证书
  'alipay_rootCertSn'=>'../app/library/ali/alipayRootCert.crt', //支付宝根证书
];
```

## 后台管理( admin/src/env.js )
```javascript
/* 正式 */
const title = '数据中心/基础框架';
const baseUrl = 'https://api.webmis.vip/';
const socket = 'wss://webmis.vip/wss';

export default {
  dev: false, //开发模式
  title: title, //应用名称
  version: '1.0.0', //应用版本
  baseUrl: baseUrl, //数据地址
  apiUrl: baseUrl+'admin/', //数据接口地址
  copy: 'Copyright © WebMIS.vip 2020',  //版权信息
  /* 请求 */
  request:{
    headers: {
      "Content-Type":"multipart/form-data"  //表单方式
    },
  },
  /* 状态栏 */
  statusBar:{
    height:'0px', //默认高度
    color: '#333',  //字体颜色
    bgColor:'#FFF'  //背景颜色
  },
  /* 更新 */
  update: {
    start: true,  //开启更新
    bg: '#6FB737',  //背景颜色
    logoBg: '#FFF', //Logo背景
    loading: '#FFF',  //加载中
    loaded: '#666', //未加载
    copy: '#333', //版权颜色
    butColor: '#666', //按钮颜色
    butBg: '#FFF',  //按钮背景
    butText: '下载并安装' //按钮文字
  },
  upIosUrl: '', //IOS下载链接
  /* 地图 */
  amapKey: '',  //高德JSKEY
  /* 百度AI */
  baiduOcr: 'https://aip.baidubce.com/rest/2.0/ocr/v1/',  //语音识别接口
  /* Socket */
  socket: {
    start: false, //启动
    server: socket, //链接地址
  },
  /* 消息阅读 */
  msgRead: 300, //延迟时间：0(不开启)
  msgContent: 'content',  //阅读：title(标题)、content(内容)
  msgBrowser: false,  //浏览器信息
}
```

## Vue+HBuilder( vueapp/src/env.js )
```javascript

/* 正式 */
const title = 'WebMIS';
const baseUrl = 'https://api.webmis.vip/';
const socket = 'wss://webmis.vip/wss';

export default {
  dev: false, //开发模式
  title: title, //应用名称
  version: '1.0.0', //应用版本
  baseUrl: baseUrl, //数据地址
  apiUrl: baseUrl+'api/', //数据接口地址
  copy: 'Copyright © WebMIS.VIP 2020',  //版权信息
  /* 请求 */
  request:{
    headers: {
      "Content-Type":"multipart/form-data"  //表单方式
    },
  },
  /* 状态栏 */
  statusBar:{
    height:0, //默认高度
    color: '#333',  //字体颜色
    bgColor:'#FFF'  //背景颜色
  },
  /* 更新 */
  update: {
    start: true,  //开启更新
    bg: '#6FB737',  //背景颜色
    logoBg: '#FFF', //Logo背景
    loading: '#FFF',  //加载中
    loaded: '#666', //未加载
    copy: '#333', //版权颜色
    butColor: '#666', //按钮颜色
    butBg: '#FFF',  //按钮背景
    butText: '下载并安装' //按钮文字
  },
  upIosUrl: '', //IOS下载链接
  /* 地图 */
  amapKey: '',  //高德JSKEY
  /* 百度AI */
  baiduOcr: 'https://aip.baidubce.com/rest/2.0/ocr/v1/',  //语音识别接口
  /* Socket */
  socket: {
    start: false, //启动
    server: socket, //链接地址
  },
  /* 消息阅读 */
  msgRead: 300, //延迟时间：0(不开启)
  msgContent: 'content',  //阅读：title(标题)、content(内容)
  msgBrowser: false,  //浏览器信息
  /* 小程序 */
  wx_type: 0, //正式版(0)、测试版(1)、体验版(2)
  wx_id: '', // 应用ID
}
```

## 微信小程序( weapp/env.js )
```javascript

/* 正式 */
const title = 'WebMIS';
const baseUrl = 'https://api.webmis.vip/';
const socket = 'wss://webmis.vip/wss';

export default {
  name: title,  //应用名称
  baseUrl: baseUrl, //数据地址
  apiUrl: baseUrl+'api/', //数据接口地址
  httpType: 'https://', //类型
  /* 请求 */
  request:{
    headers: {
      'Content-Type':'application/x-www-form-urlencoded'  //表单方式
    },
  },
  /* 状态栏 */
  statusBar:{
    color: '#333',  //字体颜色
    bgColor:'#FFF'  //背景颜色
  },
  /* 地图 */
  amapKey: '',  //高德KEY
  /* Socket */
  socket: {
    start: false, //启动
    server: socket, //链接地址
  },
  /* 消息阅读 */
  msgRead: 300, //延迟时间：0(不开启)
  msgContent: 'content',  //阅读：title(标题)、content(内容)
}
```
## 支付宝小程序( weapp/env.js )
```javascript

/* 正式 */
const title = 'WebMIS';
const baseUrl = 'https://api.webmis.vip/';
const socket = 'wss://webmis.vip/wss';

export default {
  name: title,  //应用名称
  baseUrl: baseUrl, //数据地址
  apiUrl: baseUrl+'api/', //数据接口地址
  httpType: 'https://', //类型
  /* 请求 */
  request:{
    headers: {
      'Content-Type':'application/x-www-form-urlencoded'  //表单方式
    },
  },
  /* 状态栏 */
  statusBar:{
    color: '#333',  //字体颜色
    bgColor:'#FFF'  //背景颜色
  },
  /* 地图 */
  amapKey: '',  //高德KEY
  /* Socket */
  socket: {
    start: false, //启动
    server: socket, //链接地址
  },
  /* 消息阅读 */
  msgRead: 300, //延迟时间：0(不开启)
  msgContent: 'content',  //阅读：title(标题)、content(内容)
}
```