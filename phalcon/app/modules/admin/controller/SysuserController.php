<?php

namespace app\modules\admin\controller;

use app\Env;
use app\common\Base;
use app\common\AdminToken;
use app\common\Inc;
use app\library\Safety;
use app\model\User;

/* 用户管理 */
class SysUserController extends Base{

  /* 构造函数 */
  function initialize(){
    // 控制器权限
    AdminToken::urlVerify('SysUser');
  }

  /* 列表 */
  function listAction(){
    $data = $this->request->get('data');
    // 搜索
    $where = '';
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
      $list[$key]['img'] = $val['img']?Env::$base_url.$val['img']:'';
      $list[$key]['birthday'] = $val['birthday']?$val['birthday']:'';
      $list[$key]['rtime'] = $val['rtime']?$val['rtime']:'';
      $list[$key]['ltime'] = $val['ltime']?$val['ltime']:'';
      $list[$key]['utime'] = $val['utime']?$val['utime']:'';
    }
    return self::getJSON(['code'=>0,'msg'=>'成功','list'=>$list,'total'=>$total]);
  }

  /* 添加 */
  function addAction(){
    // 参数
    $data = $this->request->get('data');
    $data = json_decode($data);
    if(!$data || !isset($data->tel) || empty($data->tel)){
      return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    }
    $tel = trim($data->tel);
    $passwd = $data->passwd?md5($data->passwd):md5('123456');
    // 验证手机
    if(!Safety::isRight('tel',$tel)){
      return self::getJSON(['code'=>4000,'msg'=>'手机号码有误!']);
    }
    // 是否存在
    $res = User::findFirst(['tel=:tel:','bind'=>['tel'=>$tel]]);
    if($res) return self::getJSON(['code'=>4000,'msg'=>'该用户已存在!']);
    // 保存
    $model = new User();
    $model->id = Inc::getId();
    $model->tel = $tel;
    $model->password = $passwd;
    $model->rtime = date('YmdHis');
    // 结果
    if($model->save()){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'添加失败!']);
    }
  }

}