<?php
namespace App\Admin;

use Base\Base;
use Model\SysMenu;

class SysMenus extends Base {

  private static $menus = [];

  /* 获取菜单 */
  static function GetMenus() {
    // 全部菜单
    $model = new SysMenu();
    $model->Columns('id', 'fid', 'title', 'url', 'ico');
    $model->Order('sort DESC, id');
    $data = $model->Find();
    foreach($data as $val){
      $fid = (string)$val['fid'];
      self::$menus[$fid][] = $val;
    }
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功', 'menus'=>self::_getMenu('0')]);
  }
  // 递归菜单
  private static function _getMenu(string $fid) {
    $data = [];
    $M = isset(self::$menus[$fid])?self::$menus[$fid]:[];
    foreach($M as $val){
      $id = (string)$val['id'];
      $tmp = [
        'icon'=>$val['ico'],
        'label'=>$val['title'],
        'value'=>$val['url'],
      ];
      $menu = self::_getMenu($id);
      if(!empty($menu)) $tmp['children'] = $menu;
      $data[] = $tmp;
    }
    return $data;
  }

}
