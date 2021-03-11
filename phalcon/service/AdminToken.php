<?php
namespace Service;

use Base\Base;
use Config\Env;
use Library\Safety;
use Library\Redis;

/* 后台Token */
class AdminToken extends Base {

  /* 生成 */
  static function create(array $data): ?string {
    $data['l_time'] = date('Y-m-d H:i:s');
    $token = Safety::encode($data);
    // 缓存
    $key = Env::$admin_token_prefix.$data['uid'];
    $redis = new Redis();
    $redis->Set($key, '1');
    $redis->Expire($key, Env::$admin_token_time);
    $redis->Close();
    return $token;
  }

}