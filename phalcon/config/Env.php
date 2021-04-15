<?php
namespace Config;

/* 公共配置 */
class Env {

  static $base_url = 'https://demo-php.webmis.vip/';        //资源
  // static $base_url = 'http://localhost/phalcon/public/';    //资源
  static $root_dir = 'public/';                             //根目录
  static $key = 'e4b99adec618e653400966be536c45f8';         //KEY
  /* Token */
  static $admin_token_prefix = 'Admin';                     //前缀
  static $admin_token_time = 2*3600;                        //有效时长(2小时)
  static $admin_token_auto = true;                          //自动续期
  static $api_token_prefix = 'Api';                         //前缀
  static $api_token_time = 7*24*3600;                       //有效时长(7天)
  static $api_token_auto = true;                            //自动续期
  /* Logs */
  static $log_on = false;                                   //访问日志
}