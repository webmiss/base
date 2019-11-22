<?php
return [
  'title'=>'WebMIS',
  'version'=>'0.0.1',
  'key'=>md5('demo.webmis'),
  'token_time'=>7*24*3600,
  'login_num'=>50,
  'login_num_time'=>12*3600,
  /* 数据库 */
  'database' => [
    'adapter'=>'Mysql',
    'host'=>'localhost',
    'username'=>'webmis',
    'password'=>'webmis',
    'dbname'=>'mvc_vue',
    'charset'=>'utf8',
  ],
  /* 缓存 */
  'redis'=>[
    'host'=>'127.0.0.1',
    'port'=>6379,
    'pwd'=>'',
    'db'=>0,
  ],
  /* APP配置 */
  'application' => [
    'appDir'=>APP_PATH.'/',
    'cacheDir'=> BASE_PATH.'/cache/',
    'baseUri'=>'',
  ],
  /* Socket */
  'socket_ip'=> '0.0.0.0',
  'socket_port'=> 9010,
  'socket_client'=>'ws://39.108.152.251:9010',
  /* 百度AI */
  'baidu_appKey'=>'fFu2i5oNALIrRQ1KAhAvV5v5',
  'baidu_appSecret'=>'AQsHFNfgugbGErIdu7Dwxap6Pvreiu0z',
  /* 钉钉 */
  'ding_appKey'=>'',
  'ding_appSecret'=>'',
  /* 微信小程序 */
  'wechat_token'=>'',
  'wechat_EncodingAESKey'=>'',
  'wechat_AppID'=>'',
  'wechat_AppSecret'=>'',
  'wechat_MchID'=>'',
  'wechat_Key'=>'',
  /* 支付宝 */
  'alipay_appId'=>'',
  'alipay_signType'=>'RSA2',
  'alipay_charset'=>'UTF-8',
  'alipay_version'=>'1.0',
  'alipay_rsaPrivateKey'=>'',
  'alipay_rsaPublicKey'=>'',
];
