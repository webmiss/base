<?php
namespace app;

class Env{

  static $debug = false; //调试模式
  /* Web */
  static $title = 'WebMIS'; //标题
  static $keywords = 'WebMIS,开放平台'; //关键字
  static $description = 'WebMIS全栈开发基础框架.技术,PHP,Python,SpringBoot,Phalcon,Flutter,NodeJS,Vue,Swoole,Redis,API'; //关键字
  /* 资源 */
  static $base_url = 'https://demo-php.webmis.vip/'; //根目录
  /* 加密 */
  static $key = 'e4b99adec618e653400966be536c45f8';  //KEY
  /* Token */
  static $admin_token_prefix = 'AdminToken_';  //前缀
  static $admin_token_time = 1*3600;  //有效时长
  static $admin_token_auto = true;  //自动续期
  static $api_token_prefix = 'AdminToken_';  //前缀
  static $api_token_time = 7*24*3600;  //有效时长
  static $api_token_auto = true;  //自动续期
  /* Socket */
  static $socket_name = 'Socket_'; //缓存名称
  static $socket_ip = '0.0.0.0'; //IP地址
  static $socket_port = 9011; //端口
  /* Cli */
  static $cli = 'php ../cli.php';

  /* 数据库 */
  static function db() {
    return [
      'adapter'=> 'Mysql',  //类型
      // 'host'=> '127.0.0.1', //主机
      'host'=> '154.91.144.171', //主机
      'port'=> 3306,  //端口
      'username'=> 'webmis',  //用户名
      'password'=> 'e4b99adec618e653400966be536c45f8',  //密码
      'dbname'=> 'data', //数据库名
      'charset'=> 'utf8', //编码
      'persistent'=> true, //持久链接
    ];
  }

  /* 缓存数据库 */
  static function redis() {
    return [
      'host'=> '127.0.0.1', //主机
      'port'=> 6379,  //端口
      'password'=> '',  //密码
      'db'=> 0, //硬盘
    ];
  }

  /* 百度AI */
  static function baidu() {
    return [
      'appKey'=> 'fFu2i5oNALIrRQ1KAhAvV5v5', //Key
      'appSecret'=> 'AQsHFNfgugbGErIdu7Dwxap6Pvreiu0z', //Key
    ];
  }

}