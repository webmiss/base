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

  static private $api_url = 'https://php.webmis.vip/';
  // static private $api_url = 'http://localhost:9000/';

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

  /* YouTube-授权 */
  static function YouTubeOauth() {
    // 参数
    $redis = new Redis();
    $user = Google::YouTube();
    // 撤销授权
    $refresh = isset($_GET['refresh'])?$_GET['refresh']:'';
    if($refresh){
      YouTube::GetToken($refresh);
      return '<script language="javascript">location.href="'.self::$api_url.'youtube/oauth";</script>';
    }
    // 撤销授权
    $revoke = isset($_GET['revoke'])?$_GET['revoke']:'';
    if($revoke){
      $redis->Set('access_token_'.$revoke, '');
      $redis->Set('refresh_token_'.$revoke, '');
      $time = $redis->Ttl('access_token_'.$revoke);
      if($time>0) {
        $token = $redis->Gets('access_token_'.$revoke);
        YouTube::RevokeToken($token);
      }
      return '<script language="javascript">location.href="'.self::$api_url.'youtube/oauth";</script>';
    }
    // 账号授权
    $token = isset($_GET['token'])?$_GET['token']:'';
    $html = '<h2>账号授权</h2>';
    if($token) $html .= '<p>'.$token.'</p>';
    $html .= '<p>------------------------------------------------------------------------------------------------------------------------</p>';
    foreach($user as $k1=>$v1){
      $html .= '<h3>'.$k1.'[ <a href="'.self::$api_url.'youtube?user='.$k1.'">直播列表</a> ]</h3>';
      foreach($v1 as $k2=>$v2){
        // 参数
        $name = $k1.'_'.$k2;
        $refresh_token = $redis->Gets('refresh_token_'.$name);
        $time = $redis->Ttl('access_token_'.$name);
        // 操作
        $html .= '<p>';
        $html .= ($k2+1).' [ '.$v2['uname'].' ]&nbsp;&nbsp;';
        if(!$refresh_token){
          $url = YouTube::GetCode($name, $v2['ClientId']);
          $html .= '<a href="'.$url.'">授权</a>&nbsp;&nbsp;|&nbsp;&nbsp;';
        }else{
          $html .= '<a href="'.self::$api_url.'youtube/oauth?refresh='.$name.'">刷新</a>&nbsp;&nbsp;|&nbsp;&nbsp;';
        }
        $type = $time>0?'清除&解绑':'清除';
        $html .= '<a href="'.self::$api_url.'youtube/oauth?revoke='.$name.'">'.$type.'</a>&nbsp;&nbsp;|&nbsp;&nbsp;';
        $html .= '过期( '.$time.' ) &nbsp;&nbsp;';
        $html .= '刷新指令( '.($refresh_token?'<a href="'.self::$api_url.'youtube/oauth?token='.$refresh_token.'">查看</a>':'-').' )';
        $html .= '</p>';
      }
    }
    $html .= '<p>------------------------------------------------------------------------------------------------------------------------</p>';
    $html .= '<p>';
    $html .= '<a href="https://console.developers.google.com/iam-admin/quotas" target="_blank">查看配额</a>&nbsp;&nbsp;|&nbsp;&nbsp;';
    $html .= '<a href="https://myaccount.google.com/permissions" target="_blank">解除授权</a>';
    $html .= '</p>';
    echo $html;
  }
  
  /* YouTube-Token */
  static function YouTubeToken() {
    // 授权
    $code = isset($_GET['code'])?$_GET['code']:'';
    if($code){
      $state = isset($_GET['state'])?$_GET['state']:'';
      $res = YouTube::GetToken($state, $code);
      if(isset($res->access_token)){
        return '<script language="javascript">location.href="'.self::$api_url.'youtube/oauth";</script>';
      }
      return self::GetJSON(['code'=>0, 'msg'=>'授权失败', 'data'=>$res]);
    }
    // 直播列表
    $user = isset($_GET['user'])?$_GET['user']:'';
    if($user){
      // 切换账号
      self::setUser($user);
      // 获取数据
      $res = YouTube::LiveBroadcastsList($user);
      $html = '<h2>直播列表[ '.$user.' ]</h2>';
      $html .= '<p>------------------------------------------------------------------------------------------------------------------------</p>';
      if(isset($res->items)){
        foreach($res->items as $v){
          $snippet = $v->snippet;
          $html .= '<p>';
          $html .= '频道ID: [ <b>'.$snippet->liveChatId.'</b> ]<br/>';
          $html .= '标题: '.$snippet->title;
          $html .= '</p>';
        }
      }else{
        $html .= '<p>Error: '.json_encode($res).'</p>';
      }
      $html .= '<p>------------------------------------------------------------------------------------------------------------------------</p>';
      $html .= '<p>';
      $html .= '< <a href="'.self::$api_url.'youtube/oauth">授权管理</a>';
      $html .= '</p>';
      return $html;
    }
  }

  /* YouTube-发送评论 */
  static function YouTubeMessage(){
    // 参数
    $user = isset($_GET['user'])?$_GET['user']:'';
    $liveChatId = isset($_GET['liveChatId'])?$_GET['liveChatId']:'';
    $name = isset($_GET['name'])?$_GET['name']:'';
    $msg = isset($_GET['msg'])?$_GET['msg']:'';
    // 切换账号
    if(!self::setUser($user)) return self::GetJSON(['code'=>500, 'msg'=>'没有'.$user]);
    // 推送
    $res = YouTube::LiveChatMessagesInsert($user, $liveChatId, $name, $msg);
    if(isset($res->error)){
      return self::GetJSON(['code'=>$res->error->code, 'msg'=>$res->error->message]);
    }else{
      return self::GetJSON(['code'=>0, 'msg'=>'发送消息']);
    }
  }

  /* 切换账号 */
  static private function setUser($user){
    $redis = new Redis();
    $list = Google::YouTube();
    if(!isset($list[$user])) return false;
    // 叠加
    $num = $redis->Gets('token_num_'.$user);
    $n = (int)$num+1;
    if($n>=count($list[$user])) $n = 0;
    // 记录位置
    $redis->Set('token_num_'.$user, $n);
    $redis->Set('token_apikey_'.$user, $list[$user][$n]['ApiKey']);
    return true;
  }

}
