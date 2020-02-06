<?php

namespace app\modules\admin\controller;

use app\controller\Base;
use app\model\UserPerm;
use app\model\UserRole;
use app\modules\admin\model\SysMenu;

use app\model\BaseArea;

class UserBase extends Base{

  static protected $token = '';  // 用户信息
  static protected $perm = '';  // 权限值
  static private $menus=[]; // 菜单

	/* 构造函数 */
  function initialize(){
    // 拆分权限
    self::getPerm();
    // 菜单权限
    self::isPerm();
  }

  /* 拆分权限 */
  private function getPerm(){
    // Token验证
    $token = trim($this->request->get('token'));
    $res = self::verToken($token);
    if(!$res) return self::error(1001);
    self::$token = $res;
    // 拆分
    $perm = UserPerm::findFirst(['uid="'.self::$token->uid.'"','columns'=>'perm,role']);
    // 角色
    if(empty($perm->perm)) $perm = UserRole::findFirst(['id='.$perm->role,'columns'=>'perm']);
    // 权限
    $data = [];
		$arr = explode(' ',$perm->perm);
		foreach($arr as $val){
			$a = explode(':',$val);
			$data[$a[0]] = $a[1];
    }
    // 赋值权限
    self::$perm = $data;
  }

  /* 菜单权限 */
  private function isPerm(){
    $controller = $this->dispatcher->getControllerName();
    if($controller!='Usermain' && $controller!='Desktop'){
      $mid = SysMenu::findFirst(['url="'.$controller.'"','columns'=>'id']);
      if(empty($mid)) return self::error(4001);
      if(!isset(self::$perm[$mid->id])) return self::error(4002);
    }
  }

  /* 搜索条件 */
  protected function getSeaWhere(){
    $get = trim($this->request->get('data'));
    $where = '';
    $data = [];
    if($get){
      $get = json_decode($get);
      foreach($get as $k=>$v){
        if(!is_array($v)) $where .= $k." LIKE '%".$v."%' AND ";
        if(!empty($v) || $v==='0' || $v===0) $data[$k] = $v;
      }
      $where = rtrim($where,'AND ');
    }
    return ['where'=>$where,'data'=>$data];
  }

  /* Map条件 */
  static protected function getMapWhere($data,$like='=',$or='OR'){
    $data = array_filter($data);
    $where = '';
    foreach($data as $key=>$val){
      if($like=='='){
        $where .= $key.' '.$like.' "'.$val.'" '.$or.' ';
      }else{
        $where .= $key.' '.$like.' "%'.$val.'%" '.$or.' ';
      }
    }
    return rtrim($where,' '.$or.' ');
  }

  /* 区/室/组 */
  protected function getArea(){
    $all = BaseArea::find(['dtime IS NULL','columns'=>'id,fid,name'])->toArray();
    foreach($all as $val){
      self::$menus[$val['fid']][] = $val;
    }
    // 获取菜单
    return self::getMenu();
  }
  // 递归菜单
	static private function getMenu($fid=0){
    $data=[];
    $M = isset(self::$menus[$fid])?self::$menus[$fid]:[];
		foreach($M as $val){
      $val['menus'] = self::getMenu($val['id']);
			$data[] = $val;
		}
		return $data;
  }
  
}