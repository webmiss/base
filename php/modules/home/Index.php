<?php
namespace App\Home;

use Service\Base;
use Library\Qrcode;
use Library\FileEo;
use Library\Captcha;
use Library\Upload;

use Config\Google;
use Library\Redis;
use Library\Google\YouTube;

class Index extends Base {

  /* 首页 */
  static function Index() {
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'PHP Web']);
  }

  /* 验证码 */
  static function Vcode() {
    Captcha::Vcode();
  }

  /* 二维码 */
  static function Qrcode($name=''){
    // 内容
    $text = '';
    if($name=='docs') $text = 'https://webmis.vip/';
    elseif($name=='demo') $text = 'https://demo-app.webmis.vip/';
    elseif($name=='wechat') $text = 'http://weixin.qq.com/r/mC1YQK3EDPBzrekj93iK';
    elseif($name=='server1') $text = 'https://u.wechat.com/MNFMyg4xN7d6ihWrfoWD7So';
    elseif($name=='server2') $text = 'https://u.wechat.com/MC35ApmM-JB7K6cJD6CaYJo';
    // 创建目录
    $path = 'upload/qrcode/';
    if(!FileEo::Mkdir($path)) return;
    // 是否生成
    $file = $path.$name.'.png';
    if(!FileEo::IsFile($file)){
      $ct = Qrcode::Create(['text'=>$text]);
      FileEo::Writer($file, $ct);
    }
    // 数据
    self::getJSON();
    header('content-type: image/png');
    return FileEo::Bytes($file);
  }

  /* OSS-上传回调 */
  static function OssCallback() {
    // 验证
    $param = self::Json();
    if(!Upload::OssPolicyVerify($param)) return '';
    FileEo::WriterEnd('upload/callback_oss.json', json_encode($param));
    return self::GetJSON(['Status'=>'Ok']);
  }

  /* YouTube */
  static function YouTubeToken() {
    // 参数
    $api = 'https://php.webmis.vip/';
    // $api = 'http://localhost:9000/';
    $code = isset($_GET['code'])?$_GET['code']:'';
    $revoke = isset($_GET['revoke'])?true:false;
    $redis = new Redis();
    $client = Google::YouTubeClient();
    $access_token = $redis->Gets($client->access_token);
    $refresh_token = $redis->Gets($client->refresh_token);
    // 撤销
    if($revoke){
      $redis->Set($client->access_token, '');
      $redis->Set($client->refresh_token, '');
      if($access_token) YouTube::RevokeToken($access_token);
      echo '<p><a href="https://myaccount.google.com/permissions">授权管理</p>';
    }
    // 授权
    if($code){
      $res = YouTube::GetToken($code);
      $html = '';
      if(isset($res->access_token)){
        $html .= '<h2>授权成功</h2>';
        $html .= '<p><a href="'.$api.'youtube">获取直播列表</p>';
      }else{
        $html .= '<h2>授权失败</h2>';
        $html .= '<p><a href="https://myaccount.google.com/permissions">授权管理</p>';
      }
      echo $html;
      return self::GetJSON(['code'=>0, 'msg'=>'获取Token', 'data'=>$res]);
    }elseif($refresh_token){
      $token = YouTube::GetToken();
      if(!isset($token->access_token)) return self::GetJSON(['code'=>0, 'msg'=>'刷新Token', 'data'=>$token]);
      // 设置直播
      if(isset($_GET['liveChatId'])) $redis->Set($client->liveChatId, $_GET['liveChatId']);
      // 直播列表
      $res = YouTube::LiveBroadcastsList();
      $html = '<h2>直播列表</h2>';
      if(isset($res->items)){
        $liveChatId = $redis->Gets($client->liveChatId);
        foreach($res->items as $v){
          $snippet = $v->snippet;
          $state = $liveChatId==$snippet->liveChatId?'正在推送':'未开启';
          $html .= '<p><a href="'.$api.'youtube?liveChatId='.$snippet->liveChatId.'">'.$snippet->title.'( '.$state.' )</p>';
        }
        return $html;
      }
      $html .= '<p><a href="https://myaccount.google.com/permissions">授权管理</p>';
      echo $html;
      return self::GetJSON(['code'=>0, 'msg'=>'直播列表', 'data'=>$res]);
    }else{
      $url = YouTube::GetCode();
      $html = '<h2>获取授权</h2>';
      $html .= '<p><a href="'.$url.'">YouTube 授权</a></p>';
      if($access_token){
        $html .= '<p><a href="'.$api.'youtube?revoke">撤销授权</a></p>';
      }
      echo $html;
    }
    
  }
  /* YouTube-发送评论 */
  static function YouTubeMessage(){
    $client = Google::YouTubeClient();
    $redis = new Redis();
    $liveChatId = $redis->Gets($client->liveChatId);
    $name = $_GET['name'];
    $msg = $_GET['name'].' '.$_GET['msg'];
    $res = YouTube::LiveChatMessagesInsert($liveChatId, $name, $msg);
    if(isset($res->error)){
      return self::GetJSON(['code'=>$res->error->code, 'msg'=>$res->error->message]);
    }else{
      return self::GetJSON(['code'=>0, 'msg'=>'发送消息']);
    }
    
  }

}
