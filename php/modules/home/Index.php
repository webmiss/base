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
    $mode = '';
    $redis = new Redis();
    $client = Google::YouTubeClient();
    // 参数
    if($mode=='dev'){
      $api = 'http://localhost:9000/';
      // $redis->Set($client->access_token, 'ya29.A0AVA9y1tE6BDlWGqsm6dtwKfTNAa2aJRBmBh2a1NUFWKBQD-WuyJ_LNna7duueFp4IVAFxLrIlNiXdlAf9NwHf2UpnDzXueQeQjq1qWIS6jJzMzytqy7cdlx5vvOPO5OfqKxeIv4fRtcnv3aNOL66tRM1sVMaYUNnWUtBVEFTQVRBU0ZRRl91NjFWQnc5SlFlM2RwN1pIUjY3SlA2YkhSQQ0163');
      // $redis->Set($client->refresh_token, '1//0e3LBGPs4BpfSCgYIARAAGA4SNwF-L9IrCgfH-6_cWYvUjxLf2srZ4HZ-QIbMmArhSmcs54Ef_du56DRU_Qbhp826oyoo90fzIvk');
    }else{
      $api = 'https://php.webmis.vip/';
    }
    $code = isset($_GET['code'])?$_GET['code']:'';
    $revoke = isset($_GET['revoke'])?true:false;
    $access_token = $redis->Gets($client->access_token);
    $refresh_token = $redis->Gets($client->refresh_token);
    // 撤销
    if($revoke){
      $redis->Set($client->access_token, '');
      $redis->Set($client->refresh_token, '');
      $res = YouTube::RevokeToken($revoke);
      return self::GetJSON(['code'=>0, 'msg'=>'撤销Token']);
    }
    // 授权
    if($code){
      $token = YouTube::GetToken($code);
      echo '<h2>授权成功</h2>';
      return self::GetJSON(['code'=>0, 'msg'=>'获取Token', 'data'=>$token]);
    }elseif($refresh_token){
      $token = YouTube::GetToken();
      if(!isset($token->access_token)) return self::GetJSON(['code'=>0, 'msg'=>'刷新Token', 'data'=>$token]);
      // 设置直播
      if(isset($_GET['liveChatId'])) $redis->Set($client->liveChatId, $_GET['liveChatId']);
      // 直播列表
      $res = YouTube::LiveBroadcastsList();
      $html = '<h2>直播列表</h2>';
      $liveChatId = $redis->Gets($client->liveChatId);
      foreach($res->items as $v){
        $snippet = $v->snippet;
        $state = $liveChatId==$snippet->liveChatId?'正在推送':'未开启';
        $html .= '<p><a href="'.$api.'youtube?liveChatId='.$snippet->liveChatId.'">'.$snippet->title.'( '.$state.' )</p>';
      }
      echo $html;
    }else{
      $url = YouTube::GetCode();
      $html = '<h2>获取授权</h2>';
      $html .= '<p><a href="'.$url.'">YouTube 授权</a></p>';
      if($access_token){
        $html .= '<p><a href="'.$api.'youtube?revoke='.$access_token.'">撤销授权</a></p>';
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
