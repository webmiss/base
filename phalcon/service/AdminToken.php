<?php
namespace Service;

use Base\Base;
use Config\Env;
use Library\Safety;
use Library\Redis;
use Model\SysMenu;

/* 后台Token */
class AdminToken extends Base {

  /* 验证 */
  static function verify(string $token, string $urlPerm): array {
    // Token
    $tData = Safety::decode($token);
    if(!$tData) return [false, 'Token验证失败!'];
    // 续期Token
    if(Env::$admin_token_auto){
      $redis = new Redis();
      $key = Env::$admin_token_prefix.'_token_'.$tData->uid;
      $redis->Expire($key, Env::$admin_token_time);
      $redis->Close();
    }
    // URL权限
    if($urlPerm=='') return [true, ''];
    $arr = explode('/', $urlPerm);
    $action = end($arr);
    array_pop($arr);
    $controller = implode('/', $arr);
    // 菜单
    $menu = new SysMenu();
    $menu->Columns('id, action');
    $menu->Where('controller=?', $controller);
    $menuData = $menu->FindFirst();
    if(!$menuData) return [false, '验证菜单无效!'];
    // 动作
    $permArr = json_decode($menuData['action']);
    $permVal = 0;
    foreach($permArr as $val){
      if($action==$val->action){
        $permVal = (int)$val->perm;
        break;
      }
    }
    if($permVal==0) return [false, '验证动作无效!'];
    // 验证
    $permData = self::perm($tData->uid);
    if(!isset($permData[$menuData['id']])) return [false, '无权访问菜单!'];
    $actionVal = (int)$permData[$menuData['id']];
    if($actionVal&$permVal<=0) return [false, '无权访问动作!'];
    // 续期Perm
    if(Env::$admin_token_auto){
      $redis = new Redis();
      $key = Env::$admin_token_prefix.'_perm_'.$tData->uid;
      $redis->Expire($key, Env::$admin_token_time);
      $redis->Close();
    }
    return [true, ''];
  }
  
  /* 权限数组 */
  static function perm(string $uid): array {
    // 权限
    $redis = new Redis();
    $key = Env::$admin_token_prefix.'_perm_'.$uid;
    $permStr = $redis->Gets($key);
    $redis->Close();
    // 拆分
    $permAll = [];
    $arr = !empty($permStr)?explode(' ',$permStr):[];
    foreach($arr as $val){
      $s = explode(':',$val);
      $permAll[$s[0]] = (int)$s[1];
    }
    return $permAll;
  }

  /* 生成 */
  static function create(array $data): ?string {
    $data['l_time'] = date('Y-m-d H:i:s');
    $token = Safety::encode($data);
    // 缓存
    $redis = new Redis();
    $key = Env::$admin_token_prefix.'_token_'.$data['uid'];
    $redis->Set($key, '1');
    $redis->Expire($key, Env::$admin_token_time);
    $redis->Close();
    return $token;
  }

}