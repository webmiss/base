<?php
namespace Service;

use Config\Env;
use Library\Safety;

/* 后台Token */
class AdminToken {

  /* 生成 */
  static function create(array $data): ?string {
    $data['l_time'] = date('Y-m-d H:i:s');
    $token = Safety::encode($data);
    // 缓存
    $name = Env::$admin_token_prefix.$data['uid'];
    // Redis::run()->setex($name,Env::$admin_token_time,'1');
    return $token;
  }

}