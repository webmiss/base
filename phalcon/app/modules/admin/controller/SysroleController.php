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
    $role = trim($data->role);
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

}