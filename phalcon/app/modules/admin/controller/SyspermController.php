<?php
namespace app\modules\admin\controller;

use app\Env;
use app\common\Base;
use app\common\AdminToken;

/* 用户权限 */
class SysPermController extends Base{

  private static $tokenData;

  /* 构造函数 */
  function initialize(){
    parent::initialize();
    // 控制器权限
    self::$tokenData = AdminToken::urlVerify('SysPerm');
  }

  /* 列表 */
  function listAction(){
    
    // 搜索
    $data = json_decode($this->request->get('data'));
    $uname = trim($data->uname);
    $where = 'b.uname LIKE :uname: OR b.tel LIKE :uname: OR b.email LIKE :uname:';
    $bind = ['uname'=>"%$uname%"];
    // 查询
    $builder = $this->modelsManager->createBuilder();
    $builder->addfrom('app\model\UserPerm', 'a');
    $builder->leftJoin('app\model\User', 'a.uid=b.id', 'b');
    $builder->leftJoin('app\model\UserInfo', 'a.uid=c.uid', 'c');
    $builder->where($where,$bind);
    $builder->columns('
      a.uid, a.perm, a.role, a.state_admin, a.state_app,
      b.uname, b.email, b.tel, b.state, b.rtime, b.ltime, b.utime,
      c.nickname, c.position, c.name, c.gender, c.birthday, c.img
    ');
    $builder->orderBy('a.uid DESC');
    // 统计
    $total = $builder->getQuery()->execute()->count();
    // 分页
    $page = $this->request->get('page','int');
    $limit = $this->request->get('limit','int');
    $start = ($page-1)*$limit;
    $builder->limit($limit,$start);
    // 数据
    $list = $builder->getQuery()->execute()->toArray();
    // 状态
    foreach ($list as $key => $val) {
      $list[$key]['state'] = $val['state']?true:false;
      $list[$key]['state_admin'] = $val['state_admin']?true:false;
      $list[$key]['state_app'] = $val['state_app']?true:false;
      $list[$key]['img'] = $val['img']?Env::$base_url.$val['img']:'';
      $list[$key]['birthday'] = $val['birthday']?$val['birthday']:'';
      $list[$key]['rtime'] = $val['rtime']?$val['rtime']:'';
      $list[$key]['ltime'] = $val['ltime']?$val['ltime']:'';
      $list[$key]['utime'] = $val['utime']?$val['utime']:'';
    }
    return self::getJSON(['code'=>0,'msg'=>'成功','list'=>$list,'total'=>$total]);
  }

}