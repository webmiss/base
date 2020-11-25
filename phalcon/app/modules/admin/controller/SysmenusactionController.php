<?php

namespace app\modules\admin\controller;

use app\common\Base;
use app\common\AdminToken;
use app\model\SysMenu;
use app\model\SysMenuAction;

class SysMenusActionController extends Base {

  private static $tokenData;

  /* 构造函数 */
  function initialize(){
    parent::initialize();
    // 验证
    self::$tokenData = AdminToken::verify();
  }

  /* 列表 */
  function listAction(){
    // 搜索
    $data = json_decode($this->request->get('data'));
    $name = trim($data->name);
    $action = trim($data->action);
    $where = SysMenuAction::bindWhere(
      'name LIKE "%:name:%" AND action LIKE "%:action:%"',
      ['name'=>$name,'action'=>$action]
    );
    // 分页
    $page = $this->request->get('page','int');
    $limit = $this->request->get('limit','int');
    $start = ($page-1)*$limit;
    // 统计
    $total = SysMenuAction::count($where);
    // 数据
    $list = SysMenuAction::find([
      $where,
      'limit'=>['number'=>$limit,'offset'=>$start],
    ])->toArray();
    // 返回
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
    $model = new SysMenuAction();
    $model->name = isset($data->name)?trim($data->name):'';
    $model->action = isset($data->action)?trim($data->action):'';
    $model->perm = isset($data->perm)?trim($data->perm):0;
    $model->ico = isset($data->ico)?trim($data->ico):'';
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
    $model = SysMenuAction::findFirst(['id=:id:','bind'=>['id'=>$id]]);
    $model->name = isset($data->name)?trim($data->name):'';
    $model->action = isset($data->action)?trim($data->action):'';
    $model->perm = isset($data->perm)?trim($data->perm):0;
    $model->ico = isset($data->ico)?trim($data->ico):'';
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
    $where = SysMenuAction::bindWhere('id in(:ids:)',['ids'=>$ids]);
    $model = SysMenuAction::find($where);
    // 结果
    if($model->delete()){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'删除失败!']);
    }
  }

  /* 获取[动作菜单] */
  function getActionAction(){
    $url = trim($this->request->get('url'));
    // 是否为空
    if(empty($url)) return self::getJSON(['code'=>4000,'msg'=>'获取动作不能为空!']);
    // 菜单ID
    $mid = SysMenu::findFirst(['url=:url:','bind'=>['url'=>$url],'columns'=>'id']);
    if(!$mid) return self::getJSON(['code'=>4000,'msg'=>'获取 '.$url.' 不存在!']);
    // 全部动作
    $action = [];
    $permAll = AdminToken::perm(self::$tokenData->uid);
    $perm = $permAll[$mid->id];
    $aMenus = SysMenuAction::find(['columns'=>'name,action,ico,perm']);
    foreach($aMenus as $val){
      // 匹配权限值
			if(intval($perm)&intval($val->perm)){
        $action[] = ['name'=>$val->name,'action'=>$val->action,'ico'=>$val->ico];
      }
    }
    return self::getJSON(['code'=>0,'action'=>$action]);
  }

}