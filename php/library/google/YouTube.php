<?php
namespace Library\Google;

use Service\Base;
use Config\Google;
use Library\Redis;

/* YouTube */
class YouTube extends Base {

  /* 获取Code */
  static function GetCode(){
    $cfg = Google::YouTube();
    return Oauth::GetCode($cfg->ClientId, $cfg->Scope, $cfg->RedirectUris);
  }

  /* 获取Token */
  static function GetToken(){}

  // static private $client;
  
  // /* 初始化 */
  // static function Init() {
  //   if(self::$client) return null;
  //   // 配置
  //   $cfg = Google::YouTubeCfg();
  //   // 客户端
  //   self::$client = new Client();
  //   self::$client->setClientId($cfg->ClientId);
  //   self::$client->setClientSecret($cfg->ClientSecret);
  //   self::$client->setScopes('https://www.googleapis.com/auth/youtube');
  //   self::$client->setRedirectUri($cfg->RedirectUris);
  //   self::$client->setApplicationName($cfg->AppName);
  //   self::$client->setAccessType('offline');
  // }

  // /* 获取Code */
  // static function GetCode(): string {
  //   self::Init();
  //   self::$client->setState(mt_rand());
  //   return self::$client->createAuthUrl();
  // }

  // /* Token-获取 */
  // static function GetToken(string $code) {
  //   self::Init();
  //   $res = self::$client->fetchAccessTokenWithAuthCode($code);
  //   if(isset($res['error'])) return $res['error_description'];
  //   // 保存Token
  //   self::SaveToken($res);
  //   return self::$client->getAccessToken();
  // }

  // /* Token-更新 */
  // static function RefreshToken(){
  //   self::Init();
  //   // 查询
  //   $redis = new Redis();
  //   $access_token = $redis->Gets('youtube_access_token');
  //   $refresh_token = $redis->Gets('youtube_refresh_token');
  //   $time = $redis->Ttl('youtube_access_token');
  //   if($time>60) return ['access_token'=>$access_token, 'refresh_token'=>$refresh_token, 'expires_in'=>$time];
  //   self::$client->setAccessToken($refresh_token);
  //   // 保存Token
  //   $res = self::$client->getAccessToken();
  //   self::SaveToken($res);
  //   return $res;
  // }

  // /* Token-保存 */
  // static function SaveToken($data) {
  //   $redis = new Redis();
  //   $redis->Set('youtube_access_token', $data['access_token']);
  //   $redis->Set('youtube_refresh_token', $data['access_token']);
  //   $redis->Expire('youtube_access_token', 60);
  //   $redis->Close();
  // }

  // /* 视频列表 */
  // static function GetPlayList(){
  //   self::RefreshToken();
  //   $res = self::$client->getAccessToken();
  //   $youtube = new YouTubeService(self::$client);
  //   // $channelsResponse = $youtube->channels->listChannels('contentDetails', [
  //   //   'mine' => 'true',
  //   // ]);
  //   self::Print($youtube);
  //   // foreach ($channelsResponse['items'] as $channel) {
  //   //   self::Print($channel);
  //   // }
    

  // }

}