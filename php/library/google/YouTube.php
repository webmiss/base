<?php
namespace Library\Google;

use Service\Base;
use Config\Google;
use Google\Client;
use Google\Service\YouTube as YouTubeClient;

/* 授权 */
class YouTube extends Base {

  /* 测试 */
  static function Test() {
    $client = OAuth::YouTubeClient();
    $token = $client->getAccessToken();
    self::Print($token);
    $youtube = new YouTube($client);
  }

}