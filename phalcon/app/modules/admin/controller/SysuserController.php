<?php

namespace app\modules\admin\controller;

use app\common\Base;
use app\common\AdminToken;
use app\common\Where;
use app\common\Inc;

/* 控制台 */
class SysUserController extends Base{

  /* 构造函数 */
  function initialize(){
    // 控制器权限
    AdminToken::urlVerify('SysUser');
  }

  /* 列表 */
  function listAction(){
    $data = $this->request->get('data');
    $data = Where::getSearch($data)['data'];
    $where = '';
    if(isset($data['uname']) && !empty($data['uname'])){
      $where = '(a.uname LIKE "%'.$data['uname'].'%" OR a.tel LIKE "%'.$data['uname'].'%" OR a.email LIKE "%'.$data['uname'].'%")';
    }
    // 分页
    $page = $this->request->get('page','int');
    $limit = $this->request->get('limit','int');
    $start = ($page-1)*$limit;
    // 查询数据
    $builder = $this->modelsManager->createBuilder();
    $builder->addfrom('app\model\User', 'a');
    $builder->leftJoin('app\model\UserInfo', 'a.id=b.uid', 'b');
    $builder->where($where);
    $builder->columns('
      a.id as uid,a.uname as uname,a.email as email,a.tel as tel,a.state as state,
      a.rtime as rtime,a.ltime as ltime,a.utime as utime,
      b.nickname as nickname,b.position as position,b.name as name,b.gender as gender,b.birthday as birthday,b.img as img
    ');
    $builder->orderBy('a.id DESC');
    // 数据
    $total = $builder->getQuery()->execute()->count();
    $builder->limit($limit,$start);
    $data = $builder->getQuery()->execute()->toArray();
    // 状态
    foreach ($data as $key => $val) {
      $data[$key]['age'] = $val['birthday']?Inc::getAge($val['birthday']):'';
      $data[$key]['state'] = $val['state']?true:false;
    }
    return self::getJSON(['code'=>0, 'msg'=>'成功', 'list'=>$data, 'total'=>$total]);
  }

}