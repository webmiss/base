<?php
namespace Config;

/* 数据库配置 */
class Db {

  static $Driver = 'Mysql';                               //类型
  static $Host = '127.0.0.1';                             //主机
  static $Port = '3306';                                  //端口
  static $User = 'webmis';                                //账号
  static $Password = 'e4b99adec618e653400966be536c45f8';  //密码
  static $Database = 'data';                              //数据库名
  static $Charset = 'utf8mb4';                            //编码
  static $Persistent = true;                              //持久链接

}