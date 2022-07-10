<?php
namespace Library\Google;

use Service\Base;
use Config\Google;
use Library\Redis;
use Library\Curl;

/* YouTube */
class YouTube extends Base {

  /* 获取Code */
  static function GetCode($name, $client_id){
    $cfg = Google::Config();
    return Oauth::GetCode($client_id, $cfg->youtubeScope, $cfg->RedirectUris, $name);
  }

  /* 获取Token */
  static function GetToken($name, $code=''){
    $param = explode('_', $name);
    $client = Google::YouTube();
    $cfg = $client[$param[0]][$param[1]];
    if($code){
      // 获取
      $res = Oauth::GetToken($cfg['ClientId'], $cfg['ClientSecret'], $code);
      if(isset($res->access_token)) self::SaveToken($name, $res);
      return $res;
    }else{
      // 缓存
      $redis = new Redis();
      $access_token = $redis->Gets('access_token_'.$name);
      $refresh_token = $redis->Gets('refresh_token_'.$name);
      $time = $redis->Ttl('access_token_'.$name);
      if($time>0) return (object)['access_token'=>$access_token, 'expires_in'=>$time, 'refresh_token'=>$refresh_token];
      // 刷新
      $res = Oauth::RefreshToken($cfg['ClientId'], $cfg['ClientSecret'], $refresh_token);
      if(isset($res->access_token)) self::SaveToken($name, $res);
      $res = (object)[];
      return $res;
    }
  }
  /* 保存Token */
  static private function SaveToken($name, $data){
    $cfg = Google::Config();
    $redis = new Redis();
    $redis->Set('access_token_'.$name, $data->access_token);
    $redis->Expire('access_token_'.$name, $cfg->TokenTime);
    if(isset($data->refresh_token)) $redis->Set('refresh_token_'.$name, $data->refresh_token);
  }
  /* 撤销Token */
  static function RevokeToken($token){
    return Oauth::RevokeToken($token);
  }

  /* 请求数据 */
  static function GetData($user, $method, $url, $param){
    // 获取Token
    $redis = new Redis();
    $n = $redis->Gets('token_num_'.$user);
    $token = self::GetToken($user.'_'.$n);
    // 参数
    $headers = [
      'Authorization'=> 'Bearer '.$token->access_token,
      'Accept'=> 'application/json',
      'Content-Type'=> 'application/json',
    ];
    // 请求方式
    if($method=='GET'){
      $param['key'] = $redis->Gets('token_apikey_'.$user);
      $param = Curl::UrlEncode($param);
      return Curl::Request($url.'?'.$param, '', $method, $headers);
    }else{
      $param = json_encode($param);
      return Curl::Request($url, $param, $method, $headers);
    }
  }

  /* 直播-列表 */
  static function LiveBroadcastsList(string $user){
    $data = [
      'part'=> 'snippet',
      'broadcastStatus'=> 'active',
      'broadcastType'=> 'event',
    ];
    return self::GetData($user, 'GET', 'https://www.googleapis.com/youtube/v3/liveBroadcasts', $data);
  }

  /* 直播-评论 */
  static function LiveChatMessagesInsert(string $user, string $liveChatId, string $name, string $msg){
    $redis = new Redis();
    $key = $redis->Gets('token_apikey_'.$user);
    $data = [
      'snippet'=>[
        'liveChatId'=> $liveChatId,
        'type'=> 'textMessageEvent',
        'textMessageDetails'=> ['messageText'=>$name.' '.$msg],
      ],
      'authorDetails'=>[
        'displayName'=>$name
      ]
    ];
    return self::GetData($user, 'POST', 'https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet,authorDetails&key='.$key, $data);
  }

}