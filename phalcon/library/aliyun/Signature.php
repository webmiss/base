<?php
namespace Library\Aliyun;

use Service\Base;
use Config\Aliyun;
use Util\Util;

/* 签名 */
class Signature extends Base {

  /* 签名直传 */
  static function PolicySign(int $expireTime, int $maxSize=0): array {
    // 配置
    $cfg = Aliyun::RAM();
    $conditions = [];
    // 限制大小
    $conditions[] = ['content-length-range', 0, $maxSize];
    // 超时时间
    $now = time();
    $expire = $now + $expireTime;
    $expiration = Util::GmtISO8601($expire);
    // 签名数据
    $policyStr = json_encode(['expiration'=>$expiration, 'conditions'=>$conditions]);
    $policy = base64_encode($policyStr);
    $signature = base64_encode(hash_hmac('sha1', $policy, $cfg['AccessKeySecret'], true));
    // 返回
    return [
      'accessid'=> $cfg['AccessKeyId'],
      'policy'=> $policy,
      'signature'=> $signature,
      'expire'=> $expire,
    ];
  }

}