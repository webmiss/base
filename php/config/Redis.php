<?php
namespace Config;

/* Redis配置 */
class Redis {

  /* 默认 */
  static function Default(): array {
    return [
      'host'=> '127.0.0.1',       //主机
      'port'=> 6379,              //端口
      'password'=> '',            //密码
      'db'=> 0,                   //硬盘
      'timeout'=> 10,             //阻塞时间(秒)
    ];
  }

  /* 其它 */
  static function Other(): array {
    return [
      'host'=> '127.0.0.1',       //主机
      'port'=> 6379,              //端口
      'password'=> '',            //密码
      'db'=> 0,                   //硬盘
      'timeout'=> 60,             //阻塞时间(秒)
    ];
  }

}