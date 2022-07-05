<?php
namespace App\Admin;

use Service\Base;
use Service\AdminToken;
use Model\SysMenu;

class SysMenus extends Base {

  private static $menus = [];   //全部菜单
  private static $permAll = []; //用户权限

  /* 列表 */
	static function List() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $data = self::JsonName($json, 'data');
    $page = self::JsonName($json, 'page');
    $limit = self::JsonName($json, 'limit');
    $order = self::JsonName($json, 'order');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($data) || empty($page) || empty($limit)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 条件
    $param = json_decode($data);
    list($where, $whereData) = self::getWhere($param);
    // 统计
    $m = new SysMenu();
    $m->Columns('count(*) AS num');
    $m->Where($where, ...$whereData);
    $total = $m->FindFirst();
    // 查询
    $m->Columns('id', 'fid', 'title', 'en', 'ico', 'FROM_UNIXTIME(ctime) as ctime', 'FROM_UNIXTIME(utime) as utime', 'sort', 'url', 'controller', 'action');
    $m->Where($where, ...$whereData);
    $m->Order($order?:'fid DESC,sort,id DESC');
    $m->Page($page, $limit);
    $list = $m->Find();
    // 数据
    foreach ($list as $key => $val) {
      $list[$key]['action'] = $val['action']!=''?json_decode($val['action'], true):'';
    }
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功','list'=>$list,'total'=>(int)$total['num']]);
  }
  /* 搜索条件 */
  static private function getWhere(object $param): array {
    // 参数
    $fid = isset($param->fid)?trim($param->fid):'';
    $title = isset($param->title)?trim($param->title):'';
    $en = isset($param->en)?trim($param->en):'';
    $url = isset($param->url)?trim($param->url):'';
    // 条件
    $where = 'fid like ? AND title like ? AND en like ? AND url like ?';
    $whereData = ['%'.$fid.'%', '%'.$title.'%', '%'.$en.'%', '%'.$url.'%'];
    return [$where, $whereData];
  }

  /* 添加 */
  static function Add() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $data = self::JsonName($json, 'data');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($data)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 数据
    $param = json_decode($data);
    $title = isset($param->title)?trim($param->title):'';
    if($title==''){
      return self::GetJSON(['code'=>4000, 'msg'=>'名称不能为空!']);
    }
    // 模型
    $m = new SysMenu();
    $m->Values([
      'fid'=> isset($param->fid)?trim($param->fid):0,
      'title'=> $title,
      'en'=> isset($param->en)?trim($param->en):'',
      'url'=> isset($param->url)?trim($param->url):'',
      'ico'=> isset($param->ico)?trim($param->ico):'',
      'sort'=> isset($param->sort)?trim($param->sort):0,
      'controller'=> isset($param->controller)?trim($param->controller):'',
      'ctime'=> time(),
    ]);
    if($m->Insert()) {
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'添加失败!']);
    }
  }

  /* 编辑 */
  static function Edit() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $id = self::JsonName($json, 'id');
    $data = self::JsonName($json, 'data');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($id) || empty($data)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 数据
    $param = json_decode($data);
    $title = isset($param->title)?trim($param->title):'';
    if($title=='') {
      return self::GetJSON(['code'=>4000, 'msg'=>'名称不能为空!']);
    }
    // 模型
    $m = new SysMenu();
    $m->Set([
      'fid'=> isset($param->fid)?trim($param->fid):0,
      'title'=> $title,
      'en'=> isset($param->en)?trim($param->en):'',
      'url'=> isset($param->url)?trim($param->url):'',
      'ico'=> isset($param->ico)?trim($param->ico):'',
      'sort'=> isset($param->sort)?trim($param->sort):0,
      'controller'=> isset($param->controller)?trim($param->controller):'',
      'utime'=> time(),
    ]);
    $m->Where('id=?', $id);
    if($m->Update()) {
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

  /* 删除 */
  static function Del() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $data = self::JsonName($json, 'data');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($data)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 数据
    $param = json_decode($data);
    $ids = implode(',',$param);
    // 模型
    $m = new SysMenu();
    $m->Where('id in('.$ids.')');
    if($m->Delete()) {
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'删除失败!']);
    }
  }

  /* 动作权限 */
  static function Perm() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $id = self::JsonName($json, 'id');
    $data = self::JsonName($json, 'data');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($id) || empty($data)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 模型
    $m = new SysMenu();
    $m->Set(['action'=>$data]);
    $m->Where('id=?', $id);
    if($m->Update()) {
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

  /* 获取菜单-全部 */
  static function GetMenusAll() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    // 验证
    $msg = AdminToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 全部菜单
    self::_getMenus();
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功', 'menus'=>self::_getMenusAll('0')]);
  }
  // 递归菜单
  private static function _getMenusAll(string $fid) {
    $data = [];
    $M = isset(self::$menus[$fid])?self::$menus[$fid]:[];
    foreach($M as $val){
      $id = $val['id'];
      $tmp = ['label'=>$val['title'], 'value'=>$id];
      $menu = self::_getMenusAll($id);
      if(!empty($menu)) $tmp['children'] = $menu;
      $data[] = $tmp;
    }
    return $data;
  }

  /* 获取菜单-权限 */
  static function GetMenusPerm() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    // 验证
    $msg = AdminToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 全部菜单
    self::_getMenus();
    // 用户权限
    self::$permAll = AdminToken::Perm($token);
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功', 'menus'=>self::_getMenusPerm('0')]);
  }
  // 递归菜单
  private static function _getMenusPerm(string $fid) {
    $data = [];
    $M = isset(self::$menus[$fid])?self::$menus[$fid]:[];
    foreach($M as $val){
      // 菜单权限
      $id = (string)$val['id'];
      if(!isset(self::$permAll[$id])) continue;
      $perm = self::$permAll[$id];
      // 动作权限
      $action = [];
      $actionArr = [];
      $actionStr = (string)$val['action'];
      if($actionStr != '') $actionArr=json_decode($actionStr, true);
      foreach($actionArr as $v){
        $permVal = (int)$v['perm'];
        if(($perm&$permVal)>0) $action[]=$v;
      }
      // 数据
      $value = ['url'=>$val['url'], 'controller'=>$val['controller'], 'action'=>$action];
      $tmp = ['icon'=>$val['ico'], 'label'=>$val['title'], 'en'=>$val['en'], 'value'=>$value];
      $menu = self::_getMenusPerm($id);
      if(!empty($menu)) $tmp['children'] = $menu;
      $data[] = $tmp;
    }
    return $data;
  }

  /* 全部菜单 */
  private static function _getMenus() {
    $model = new SysMenu();
    $model->Columns('id', 'fid', 'title', 'en', 'url', 'ico', 'controller', 'action');
    $model->Order('sort, id');
    $data = $model->Find();
    foreach($data as $val){
      $fid = (string)$val['fid'];
      self::$menus[$fid][] = $val;
    }
  }

}
