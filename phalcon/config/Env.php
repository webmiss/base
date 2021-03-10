<?php
namespace Config;

/* 公共配置 */
class Env {

  static $base_url = 'https://demo-php.webmis.vip/';    //根目录
  static $key = 'e4b99adec618e653400966be536c45f8';     //KEY
  /* Token */
  static $admin_token_prefix = 'AdminToken_';           //前缀
  static $admin_token_time = 1*3600;                    //有效时长
  static $admin_token_auto = true;                      //自动续期
  static $api_token_prefix = 'ApiToken_';               //前缀
  static $api_token_time = 7*24*3600;                   //有效时长
  static $api_token_auto = true;                        //自动续期

}