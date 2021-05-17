<?php
namespace App\Admin;

use Service\Base;
use Service\AdminToken;
use Model\ApiRole as ApiRoleM;
use Model\ApiMenu;

class ApiRole extends Base {

  private static $menus = [];   //全部菜单
  private static $permAll = []; //用户权限

  /* 列表 */
	static function List(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $data = self::Post('data');
    $page = self::Post('page');
    $limit = self::Post('limit');
    if(empty($data) || empty($page) || empty($limit)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    $param = json_decode($data);
    $name = isset($param->name)?trim($param->name):'';
    // 统计
    $m = new ApiRoleM();
    $m->Columns('count(*) AS num');
    $m->Where('name like ?', '%'.$name.'%');
    $total = $m->FindFirst();
    // 查询
    $m->Columns('id', 'name', 'FROM_UNIXTIME(ctime) as ctime', 'FROM_UNIXTIME(utime) as utime', 'perm');
    $m->Where('name like ?', '%'.$name.'%');
    $m->Page($page, $limit);
    $list = $m->Find();
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功','list'=>$list,'total'=>(int)$total['num']]);
  }

  /* 添加 */
  static function Add(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $data = self::Post('data');
    if(empty($data)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    $param = json_decode($data);
    $name = isset($param->name)?trim($param->name):'';
    if($name==''){
      return self::GetJSON(['code'=>4000, 'msg'=>'名称不能为空!']);
    }
    // 数据
    $m = new ApiRoleM();
    $m->Values(['name'=> $name, 'ctime'=> time()]);
    if($m->Insert()){
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'添加失败!']);
    }
  }

  /* 编辑 */
  static function Edit(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $id = self::Post('id');
    $data = self::Post('data');
    if(empty($id) || empty($data)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    $param = json_decode($data);
    $name = isset($param->name)?trim($param->name):'';
    if($name==''){
      return self::GetJSON(['code'=>4000, 'msg'=>'名称不能为空!']);
    }
    // 数据
    $m = new ApiRoleM();
    $m->Set(['name'=>$name, 'utime'=>time()]);
    $m->Where('id=?', $id);
    if($m->Update()){
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

  /* 删除 */
  static function Del(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $data = self::Post('data');
    if(empty($data)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    $param = json_decode($data);
    $ids = implode(',',$param);
    // 执行
    $m = new ApiRoleM();
    $m->Where('id in('.$ids.')');
    if($m->Delete()){
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'删除失败!']);
    }
  }

  /* 权限 */
  static function Perm(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $id = self::Post('id');
    $perm = self::Post('perm');
    if(empty($id)){
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 数据
    $m = new ApiRoleM();
    $m->Set(['perm'=>$perm, 'utime'=>time()]);
    $m->Where('id=?', $id);
    if($m->Update()){
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

  /* 角色-列表 */
  static function RoleList(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 查询
    $m = new ApiRoleM();
    $m->Columns('id', 'name');
    $data = $m->Find();
    $lists = [['label'=>'无', 'value'=>0]];
    foreach($data as $val) {
      $lists[] = ['label'=>$val['name'], 'value'=>(int)$val['id']];
    }
    return self::GetJSON(['code'=>0,'msg'=>'成功', 'list'=>$lists]);
  }

  /* 权限-列表 */
  static function PermList(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::Verify($token, '');
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $perm = self::Post('perm');
    // 全部菜单
    $model = new ApiMenu();
    $model->Columns('id', 'fid', 'title', 'url', 'ico', 'controller', 'action');
    $model->Order('sort DESC, id');
    $data = $model->Find();
    foreach($data as $val){
      $fid = (string)$val['fid'];
      self::$menus[$fid][] = $val;
    }
    // 用户权限
    self::$permAll = self::permArr($perm);
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功', 'list'=>self::_getMenu('0')]);
  }
  // 权限-拆分
  private static function permArr(string $perm): array {
    $permAll = [];
    $arr = !empty($perm)?explode(' ',$perm):[];
    foreach($arr as $val){
      $s = explode(':',$val);
      $permAll[$s[0]] = (int)$s[1];
    }
    return $permAll;
  }
  // 递归菜单
  private static function _getMenu(string $fid) {
    $data = [];
    $M = isset(self::$menus[$fid])?self::$menus[$fid]:[];
    foreach($M as $val){
      // 菜单权限
      $id = (string)$val['id'];
      $perm = isset(self::$permAll[$id])?self::$permAll[$id]:0;
      // 动作权限
      $action = [];
      $actionArr = [];
      $actionStr = (string)$val['action'];
      if($actionStr != '') $actionArr=json_decode($actionStr, true);
      foreach($actionArr as $v){
        $permVal = (int)$v['perm'];
        $checked = ($perm&$permVal)>0?true:false;
        $action[]=[
          'id'=> $val['id']+$v['perm'],
          'label'=> $v['name'],
          'checked'=> $checked,
          'perm'=> $v['perm'],
        ];
      }
      // 数据
      $checked = isset(self::$permAll[$id])?true:false;
      $tmp = ['id'=>$val['id'], 'label'=>$val['title'], 'checked'=>$checked];
      if($val['fid']==0) $tmp['show'] = true;
      // children
      $menu = self::_getMenu($id);
      if(!empty($menu)) $tmp['children'] = $menu;
      else if(!empty($action)){
        $tmp['action'] = true;
        $tmp['children'] = $action;
      }
      $data[] = $tmp;
    }
    return $data;
  }

}