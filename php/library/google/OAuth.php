<?php
namespace Library\Google;

use Service\Base;
use Config\Google;
use Google\Client;
use Google\Service\YouTube;

/* 授权 */
class OAuth extends Base {
  
  /* YouTube-Code */
  static function YouTubeClient() {
    // 配置
    $cfg = Google::YouTubeCfg();
    // 客户端
    $client = new Client();
    $client->setClientId($cfg->ClientId);
    $client->setClientSecret($cfg->ClientSecret);
    $client->setScopes('https://www.googleapis.com/auth/youtube');
    $client->setRedirectUri($cfg->RedirectUris);
    $client->setApplicationName($cfg->AppName);
    $client->setAccessType('offline');
    // 设置Toekn

    return $client;
  }

  /* YouTube-Code */
  static function YouTubeCode(): string {
    $client = self::YouTubeClient();
    $client->setState(mt_rand());
    return $client->createAuthUrl();
  }

  /* YouTube-Token */
  static function YouTubeToken(string $code) {
    $client = self::YouTubeClient();
    $token = $client->fetchAccessTokenWithAuthCode($code);
    self::Print('Token', $token);
    return $token;
  }

}