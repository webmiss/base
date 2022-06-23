<?php
namespace Config;

/* 数据库配置 */
class Db {

  /* 默认 */
  static function Default(): array {
    return [
      'driver'=> 'mysql',                                 //类型
      'host'=> '127.0.0.1',                               //主机
      'port'=> 3306,                                      //端口
      'username'=> 'webmis',                              //账号
      'password'=> 'e4b99adec618e653400966be536c45f8',    //密码
      'dbname'=> 'data',                                  //数据库名
      'charset'=> 'utf8mb4',                              //编码
      'persistent'=> true,                                //持久链接
    ];
  }

  /* 其它 */
  static function Other(): array {
    return [
      'driver'=> 'mysql',                                 //类型
      'host'=> '127.0.0.1',                               //主机
      'port'=> 3306,                                      //端口
      'username'=> 'webmis',                              //账号
      'password'=> 'e4b99adec618e653400966be536c45f8',    //密码
      'dbname'=> 'data',                                  //数据库名
      'charset'=> 'utf8mb4',                              //编码
      'persistent'=> true,                                //持久链接
    ];
  }

}