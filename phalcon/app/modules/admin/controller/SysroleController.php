<?php
namespace app\modules\admin\controller;

use app\common\Base;
use app\common\AdminToken;
use app\model\UserRole;

/* 用户角色 */
class SysRoleController extends Base{

  /* 构造函数 */
  function initialize(){
    parent::initialize();
    // 控制器权限
    AdminToken::urlVerify('SysRole');
  }

  /* 列表 */
  function listAction(){
    // 搜索
    $data = json_decode($this->request->get('data'));
    $role = isset($data->role)?trim($data->role):'';
    $where = UserRole::bindWhere(
      'role LIKE "%:role:%"',
      ['role'=>$role]
    );
    // 分页
    $page = $this->request->get('page','int');
    $limit = $this->request->get('limit','int');
    $start = ($page-1)*$limit;
    // 统计
    $total = UserRole::count($where);
    // 数据
    $list = UserRole::find([
      $where,
      'limit'=>['number'=>$limit,'offset'=>$start]
    ])->toArray();
    // 状态
    foreach ($list as $key => $val) {
      $list[$key]['ctime'] = $val['ctime']?$val['ctime']:'';
      $list[$key]['utime'] = $val['utime']?$val['utime']:'';
    }
    return self::getJSON(['code'=>0,'msg'=>'成功','list'=>$list,'total'=>$total]);
  }

  /* 添加 */
  function addAction(){
    // 参数
    $data = trim($this->request->get('data'));
    $data = json_decode($data);
    if(empty($data)){
      return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    }
    // 数据
    $model = new UserRole();
    $model->role = isset($data->role)?trim($data->role):'';
    // 结果
    if($model->save()){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'添加失败!']);
    }
  }

  /* 编辑 */
  function editAction(){
    // 参数
    $data = trim($this->request->get('data'));
    $data = json_decode($data);
    if(empty($data)){
      return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    }
    $id = trim($this->request->get('id'));
    // 数据
    $model = UserRole::findFirst(['id=:id:','bind'=>['id'=>$id]]);
    $model->role = isset($data->role)?trim($data->role):'';
    // 结果
    if($model->save()){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'编辑失败!']);
    }
  }

  /* 删除 */
  function deleteAction(){
    // 参数
    $data = trim($this->request->get('data'));
    $data = json_decode($data);
    if(empty($data)){
      return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    }
    // ID
    $ids = implode(',',$data);
    $where = UserRole::bindWhere('id in(:ids:)',['ids'=>$ids]);
    $model = UserRole::find($where);
    // 结果
    if($model->delete()){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'删除失败!']);
    }
  }

}