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
  static function verify(string $token, string $urlPerm): string {
    // Token
    $tData = Safety::decode($token);
    if(!$tData) return 'Token验证失败!';
    // 续期
    if(Env::$admin_token_auto){
      $redis = new Redis();
      $redis->Expire(Env::$admin_token_prefix.'_token_'.$tData->uid, Env::$admin_token_time);
      $redis->Expire(Env::$admin_token_prefix.'_perm_'.$tData->uid, Env::$admin_token_time);
      $redis->Close();
    }
    // URL权限
    if($urlPerm=='') return '';
    $arr = explode('/', $urlPerm);
    $action = end($arr);
    array_pop($arr);
    $controller = implode('/', $arr);
    // 菜单
    $menu = new SysMenu();
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
    if($permVal==0) return '动作验证无效!';
    if(($actionVal&$permVal)==0) return '无权访问动作!';
    return '';
  }
  
  /* 权限数组 */
  static function perm(string $token): array {
    $permAll = [];
    // Token
    $tData = Safety::decode($token);
    if(!$tData) return $permAll;
    // 权限
    $redis = new Redis();
    $key = Env::$admin_token_prefix.'_perm_'.$tData->uid;
    $permStr = $redis->Gets($key);
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

  /* 获取 */
  static function token(string $token) {
    return Safety::decode($token);
  }

}