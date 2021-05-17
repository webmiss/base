<?php
namespace App\Admin;

use Service\Base;
use Service\AdminToken;
use Model\ApiMenu;

class ApiMenus extends Base {

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
    $fid = isset($param->fid)?trim($param->fid):'';
    $title = isset($param->title)?trim($param->title):'';
    $url = isset($param->url)?trim($param->url):'';
    // 统计
    $m = new ApiMenu();
    $m->Columns('count(*) AS num');
    $m->Where('fid like ? AND title like ? AND url like ?', '%'.$fid.'%', '%'.$title.'%', '%'.$url.'%');
    $total = $m->FindFirst();
    // 查询
    $m->Columns('id', 'fid', 'title', 'ico', 'FROM_UNIXTIME(ctime) as ctime', 'FROM_UNIXTIME(utime) as utime', 'sort', 'url', 'controller', 'action');
    $m->Where('fid like ? AND title like ? AND url like ?', '%'.$fid.'%', '%'.$title.'%', '%'.$url.'%');
    $m->Order('sort DESC', 'fid');
    $m->Page($page, $limit);
    $list = $m->Find();
    // 数据
    foreach ($list as $key => $val) {
      $list[$key]['action'] = $val['action']!=''?json_decode($val['action'], true):'';
    }
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
    $title = isset($param->title)?trim($param->title):'';
    if($title==''){
      return self::GetJSON(['code'=>4000, 'msg'=>'名称不能为空!']);
    }
    // 数据
    $m = new ApiMenu();
    $m->Values([
      'fid'=> isset($param->fid)?trim($param->fid):0,
      'title'=> $title,
      'url'=> isset($param->url)?trim($param->url):'',
      'ico'=> isset($param->ico)?trim($param->ico):'',
      'sort'=> isset($param->sort)?trim($param->sort):0,
      'controller'=> isset($param->controller)?trim($param->controller):'',
      'ctime'=> time(),
    ]);
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
    $title = isset($param->title)?trim($param->title):'';
    if($title==''){
      return self::GetJSON(['code'=>4000, 'msg'=>'名称不能为空!']);
    }
    // 数据
    $m = new ApiMenu();
    $m->Set([
      'fid'=> isset($param->fid)?trim($param->fid):0,
      'title'=> $title,
      'url'=> isset($param->url)?trim($param->url):'',
      'ico'=> isset($param->ico)?trim($param->ico):'',
      'sort'=> isset($param->sort)?trim($param->sort):0,
      'controller'=> isset($param->controller)?trim($param->controller):'',
      'utime'=> time(),
    ]);
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
    $m = new ApiMenu();
    $m->Where('id in('.$ids.')');
    if($m->Delete()){
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'删除失败!']);
    }
  }

  /* 动作权限 */
  static function Perm(){
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
    // 执行
    $m = new ApiMenu();
    $m->Set(['action'=>$data]);
    $m->Where('id=?', $id);
    if($m->Update()){
      return self::GetJSON(['code'=>0,'msg'=>'成功']);
    } else {
      return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
    }
  }

}
