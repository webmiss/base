<?php
return [
  'title'=>'WebMIS',
  'version'=>'0.0.1',
  'key'=>md5('demo.webmis'),
  'token_time'=>7*24*3600,
  'login_num'=>50,
  'login_num_time'=>12*3600,
  // 数据库
  'db_adapter'=>'Mysql',
  'db_host'=>'localhost',
  'db_username'=>'webmis',
  'db_password'=>'webmis',
  'db_name'=>'mvc_vue',
  'db_charset'=>'utf8',
  // 缓存
  'redis_host'=>'127.0.0.1',
  'redis_port'=>6379,
  'redis_pwd'=>'',
  'redis_db'=>0,
  // Socket
  'socket_port'=> 9010,
  'socket'=>'ws://39.108.152.251:9010',
  // 百度AI
  'baidu_appKey'=>'fFu2i5oNALIrRQ1KAhAvV5v5',
  'baidu_appSecret'=>'AQsHFNfgugbGErIdu7Dwxap6Pvreiu0z',
  // 钉钉
  'ding_appKey'=>'',
  'ding_appSecret'=>'',
  // 微信小程序
  'wechat_token'=>'',
  'wechat_EncodingAESKey'=>'',
  'wechat_AppID'=>'',
  'wechat_AppSecret'=>'',
  'wechat_MchID'=>'',
  'wechat_Key'=>'',
  // 支付宝
  'alipay_appId'=>'',
  'alipay_signType'=>'RSA2',
  'alipay_charset'=>'UTF-8',
  'alipay_version'=>'1.0',
  'alipay_rsaPrivateKey'=>'',
  'alipay_rsaPublicKey'=>'',
];
