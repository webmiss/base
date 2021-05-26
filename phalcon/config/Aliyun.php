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
      'Endpoint'=> 'oss-cn-chengdu.aliyuncs.com',
      'Bucket'=> 'webmis-upload',
      'ImgUrl'=> 'http://img.webmis.vip/',
    ];
  }

}