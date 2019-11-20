<?php
/*
* WebMIS开源项目
* Author: admin@webmis.vip
*/

$config = require APP_PATH.'/config/env.php';

return new \Phalcon\Config([
  // 基础配置
  'title'=> $config['title'],
  'version' => $config['title'],
  'key'=> $config['key'],
  'token_time'=> $config['token_time'],
  'login_num'=> $config['login_num'],
  'login_num_time'=> $config['login_num_time'],
  // Socket
  'socket_port'=> $config['socket_port'],
  // 数据库配置
  'database' => [
    'adapter'=>$config['db_adapter'],
    'host'=>$config['db_host'],
    'username'=>$config['db_username'],
    'password'=>$config['db_password'],
    'dbname'=>$config['db_name'],
    'charset'=>$config['db_charset'],
  ],
  // 缓存数据库
  'redis'=>[
    'host'=>$config['redis_host'],
    'port'=>$config['redis_port'],
    'pwd'=>$config['redis_pwd'],
    'db'=>$config['redis_db'],
  ],
  // APP配置
  'application' => [
    'appDir'=>APP_PATH.'/',
    'cacheDir'=> BASE_PATH.'/cache/',
    'baseUri'=>'',
  ],
  // CLI结果新行
  'printNewLine' => true
]);
