<?php
namespace Service;

use Config\Env;
use Library\Safety;
use Library\Redis;

/* 后台Token */
class AdminToken {

  /* 生成 */
  static function create(array $data): ?string {
    $data['l_time'] = date('Y-m-d H:i:s');
    $token = Safety::encode($data);
    // 缓存
    $key = Env::$admin_token_prefix.$data['uid'];
    Redis::Set($key, '1');
    Redis::Expire($key, Env::$admin_token_time);
    return $token;
  }

}