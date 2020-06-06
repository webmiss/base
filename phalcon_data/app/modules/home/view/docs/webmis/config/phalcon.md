
## 添加文件

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