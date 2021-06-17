<?php
namespace Config;

/* 阿里云配置 */
class Aliyun {

  /* RAM访问控制 */
  static function RAM(): array {
    return [
      'AccessKeyId'=> 'LTAI5tBxpsyAoe2EV1goV8wW',
      'AccessKeySecret'=> 'FhMQw6WRyZbMAsTc9jrlCw4efYh2Qx',
    ];
  }

  /* 对象存储 */
  static function OSS(): array {
    return [
      'Endpoint'=> 'oss-cn-chengdu.aliyuncs.com',                 //区域
      'Bucket'=> 'webmis-upload',                                 //存储空间
      'MaxSize'=> 100*1024*1024,                                  //最大文件
      'ExpireTime'=> 30,                                          //签名有效时间(秒)
      'CallbackUrl'=> 'https://demo-php.webmis.vip/ossCallback',  //回调URL
      'CallbackType'=> 'application/json',                        //回调数据类型
      'ImgUrl'=> 'http://img.webmis.vip/',                        //图片域名
    ];
  }

}