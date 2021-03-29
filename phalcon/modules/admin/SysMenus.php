<?php
namespace App\Admin;

use Service\Base;
use Service\AdminToken;
use Model\SysMenu;

class SysMenus extends Base {

  private static $menus = [];
  private static $permAll = [];

  /* 获取菜单 */
  static function GetMenus() {
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 全部菜单
    $model = new SysMenu();
    $model->Columns('id', 'fid', 'title', 'url', 'ico', 'controller', 'action');
    $model->Order('sort DESC, id');
    $data = $model->Find();
    foreach($data as $val){
      $fid = (string)$val['fid'];
      self::$menus[$fid][] = $val;
    }
    // 全部权限
    self::$permAll = AdminToken::perm($token);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功', 'menus'=>self::_getMenu('0')]);
  }
  // 递归菜单
  private static function _getMenu(string $fid) {
    $data = [];
    $M = isset(self::$menus[$fid])?self::$menus[$fid]:[];
    foreach($M as $val){
      $id = (string)$val['id'];
      // 权限
      if(!isset(self::$permAll[$id])) continue;
      $perm = self::$permAll[$id];
      // 动作权限
      $action = [];
      $actionArr = [];
      $actionStr = (string)$val['action'];
      if($actionStr != '') $actionArr=json_decode($actionStr, true);
      foreach($actionArr as $v){
        $permVal = (int)$v['perm'];
        if($v['type']=='1' && ($perm&$permVal)>0) $action[]=$v;
      }
      // 数据
      $value = ['url'=>$val['url'], 'controller'=>$val['controller'], 'action'=>$action];
      $tmp = ['icon'=>$val['ico'], 'label'=>$val['title'], 'value'=>$value];
      $menu = self::_getMenu($id);
      if(!empty($menu)) $tmp['children'] = $menu;
      $data[] = $tmp;
    }
    return $data;
  }

}
