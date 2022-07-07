<?php
namespace Library\Google;

use Service\Base;
use Config\Google;
use Library\Redis;
use Library\Curl;

/* YouTube */
class YouTube extends Base {

  /* 获取Code */
  static function GetCode(){
    $cfg = Google::YouTube();
    return Oauth::GetCode($cfg->ClientId, $cfg->Scope, $cfg->RedirectUris);
  }

  /* 获取Token */
  static function GetToken($code=''){
    if($code){
      // 获取
      $res = Oauth::GetToken($code);
      self::SaveToken($res);
      return $res;
    }else{
      // 缓存
      $client = Google::YouTubeClient();
      $redis = new Redis();
      $access_token = $redis->Gets($client->access_token);
      $refresh_token = $redis->Gets($client->refresh_token);
      $time = $redis->Ttl($client->access_token);
      if($time>0) return (object)['access_token'=>$access_token, 'expires_in'=>$time, 'refresh_token'=>$refresh_token];
      // 刷新
      $res = Oauth::RefreshToken($refresh_token);
      self::SaveToken($res);
      return $res;
    }
  }
  /* 保存Token */
  static private function SaveToken($data){
    $client = Google::YouTubeClient();
    $redis = new Redis();
    $redis->Set($client->access_token, $data->access_token);
    $redis->Expire($client->access_token, $client->refresh_time);
    if(isset($data->refresh_token)) $redis->Set($client->refresh_token, $data->refresh_token);
  }

  /* 请求数据 */
  static function GetData($method, $url, $param){
    $cfg = Google::YouTube();
    $token = self::GetToken();
    $param['key'] = $cfg->ApiKey;
    $param = Curl::UrlEncode($param);
    $headers = [
      'Authorization'=> 'Bearer '.$token->access_token,
      'Accept'=> 'application/json',
    ];
    if($method=='GET') return Curl::Request($url.'?'.$param, '', $method, $headers);
    else return Curl::Request($url, $param, $method, $headers);
  }

  /* 视频-列表 */
  static function LiveBroadcastsList(){
    $data = [
      'part'=> 'id,snippet,contentDetails',
      'broadcastStatus'=> 'all',
      'broadcastType'=> 'all',
    ];
    return self::GetData('GET', 'https://www.googleapis.com/youtube/v3/liveBroadcasts', $data);
  }

}