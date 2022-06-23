<?php
namespace Service;

use Config\Env;
use Library\Safety;
use Library\Redis;
use Model\ApiMenu;

/* 后台Token */
class ApiToken extends Base {

  /* 验证 */
  static function Verify(string $token, string $urlPerm): string {
    // Token
    if($token=='') return 'Token不能为空!';
    $tData = Safety::Decode($token);
    if(!$tData) return 'Token验证失败!';
    // 是否过期
    $uid = (string)$tData->uid;
    $key = Env::$api_token_prefix.'_token_'.$uid;
    $redis = new Redis();
    $access_token = $redis->Gets($key);
    $time = $redis->Ttl(Env::$api_token_prefix.'_token_'.$uid);
    $redis->Close();
    if(Env::$api_token_sso && md5($token)!=$access_token) return '强制退出!';
    if($time<1) return 'Token已过期!';
    // 续期
    if(Env::$api_token_auto){
      $redis = new Redis();
      $redis->Expire(Env::$api_token_prefix.'_token_'.$uid, Env::$api_token_time);
      $redis->Expire(Env::$api_token_prefix.'_perm_'.$uid, Env::$api_token_time);
      $redis->Close();
    }
    // URL权限
    if($urlPerm=='') return '';
    $arr = explode('/', $urlPerm);
    $action = end($arr);
    array_pop($arr);
    $controller = implode('/', $arr);
    // 菜单
    $menu = new ApiMenu();
    $menu->Columns('id','action');
    $menu->Where('controller=?', $controller);
    $menuData = $menu->FindFirst();
    if(empty($menuData)) return '菜单验证无效!';
    // 验证-菜单
    $id = (string)$menuData['id'];
    $permData = self::perm($token);
    if(!isset($permData[$id])) return '无权访问菜单!';
    // 验证-动作
    $actionVal = (int)$permData[$id];
    $permArr = json_decode($menuData['action']);
    $permVal = 0;
    foreach($permArr as $val){
      if($action==$val->action){
        $permVal = (int)$val->perm;
        break;
      }
    }
    self::Print($actionVal, $permVal);
    if(($actionVal&$permVal)==0) return '无权访问动作!';
    return '';
  }
  
  /* 权限数组 */
  static function Perm(string $token): array {
    $permAll = [];
    // Token
    $tData = Safety::Decode($token);
    if(!$tData) return $permAll;
    // 权限
    $redis = new Redis();
    $permStr = $redis->Gets(Env::$api_token_prefix.'_perm_'.$tData->uid);
    $redis->Close();
    // 拆分
    $arr = !empty($permStr)?explode(' ',$permStr):[];
    foreach($arr as $val){
      $s = explode(':',$val);
      $permAll[$s[0]] = (int)$s[1];
    }
    return $permAll;
  }

  /* 生成 */
  static function Create(array $data): ?string {
    $data['l_time'] = date('Y-m-d H:i:s');
    $token = Safety::Encode($data);
    // 缓存
    $redis = new Redis();
    $key = Env::$api_token_prefix.'_token_'.$data['uid'];
    $redis->Set($key, md5($token));
    $redis->Expire($key, Env::$api_token_time);
    $redis->Close();
    return $token;
  }

  /* 解析 */
  static function Token(string $token): ?object {
    $token = Safety::Decode($token);
    if($token){
      $redis = new Redis();
      $token->time = $redis->Ttl(Env::$api_token_prefix.'_token_'.$token->uid);
      $redis->Close();
    }
    return $token;
  }

}