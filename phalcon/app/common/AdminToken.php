<?php
namespace app\common;

use Phalcon\Http\Request;

use app\Env;
use app\library\Safety;
use app\library\Redis;
use app\model\SysMenu;
use app\model\UserPerm;
use app\model\UserRole;

class AdminToken extends Base {

  /* 验证-Socket */
  static function socket(string $token=''): array {
    // 验证Token
    $res = Safety::decode($token);
    if(!$res) return ['state'=>false,'msg'=>'Token验证失败!'];
    $name = Env::$admin_token_prefix.$res->uid;
    // 是否超时
    $time =  Redis::run()->ttl($name);
    if($time<=0) return ['state'=>false,'msg'=>'Token已超时!'];
    $res->n_time =  $time;
    return ['state'=>true,'data'=>$res];
  }

  /* 验证&数据 */
  static function verify(string $token=''): ?object {
    // 获取Token
    $request = new Request();
    $token = $token?:$request->get('token');
    // 验证Token
    $res = Safety::decode($token);
    if(!$res) self::error('Token验证失败!');
    $name = Env::$admin_token_prefix.$res->uid;
    // 是否超时
    $time =  Redis::run()->ttl($name);
    if($time<=0) self::error('Token已超时!');
    $res->n_time =  $time;
    // 是否续期
    if(Env::$admin_token_auto) Redis::run()->setex($name,Env::$admin_token_time,'1');
    return $res;
  }

  /* 生成 */
  static function create(array $data): ?string {
    $data['l_time'] = date('Y-m-d H:i:s');
    $token = Safety::encode($data);
    // 缓存
    $name = Env::$admin_token_prefix.$data['uid'];
    Redis::run()->setex($name,Env::$admin_token_time,'1');
    return $token;
  }

  /* 用户权限 */
  static function perm(string $uid): array {
    $perm = UserPerm::findFirst(['uid='.$uid,'columns'=>'perm,role']);
    if(!$perm) self::error('没有分配权限!');
    if($perm->role!='') $perm=UserRole::findFirst(['id='.$perm->role,'columns'=>'perm']);
    // 拆分
    $permAll = [];
    $permStr = $perm->perm;
    $arr = !empty($permStr)?explode(' ',$permStr):[];
    foreach($arr as $val){
      $s = explode(':',$val);
      $permAll[$s[0]] = $s[1];
    }
    return $permAll;
  }

  /* Url权限 */
  static function urlVerify(string $url): ?object {
    $token = self::verify();
    // 全部菜单
    $all = SysMenu::find(['url<>""','columns'=>'id,url']);
    $menus = [];
    foreach($all as $val) $menus[$val->url]=$val->id;
    // 是否存在
    if(!isset($menus[$url])) self::error('Url错误!');
    // 权限
    $permAll = self::perm($token->uid);
    // 是否有权限
    if(!isset($permAll[$menus[$url]])) self::error('无权访问!');
    return $token;
  }

}