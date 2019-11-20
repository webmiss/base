<?php

namespace app\modules\admin\controller;

use app\modules\admin\model\SysMenuAction;

class SysMenusActionController extends UserBase {

  /* 列表 */
  function listAction(){
    // 条件
    $where = self::getSeaWhere()['where'];
    // 分段
    $page = $this->request->get('page','int');
    $limit = $this->request->get('limit','int');
    $start = ($page-1)*$limit;
    $total = SysMenuAction::count([$where]);
    $menus = SysMenuAction::find([
      $where,
      'columns'=>'id,name,action,perm,ico',
      'order'=>'id',
      'limit'=>['number'=>$limit,'offset'=>$start]
    ]);
    return self::getJSON(['code'=>0,'list'=>$menus,'total'=>$total]);
  }

  /* 添加 */
  function addAction(){
    $data = $this->request->get('data');
    if(!$data || empty($data)) return self::getJSON(['code'=>4000]);
    // 数据处理
    $model = new SysMenuAction();
    $data = json_decode($data);
    foreach($data as $key=>$val){
      if($key=='id') continue;
      $model->$key = trim($val);
    }
    // 执行
    return $model->save()?self::getJSON(['code'=>0]):self::error(4021);
  }

  /* 编辑 */
  function editAction(){
    $id = $this->request->get('id','int');
    $data = $this->request->get('data');
    if(empty($id) || empty($data)) return self::getJSON(['code'=>4000]);
    // 数据处理
    $model = SysMenuAction::findFirst(['id=:id:','bind'=>['id'=>$id]]);
    if(!$model) return self::getJSON(['code'=>4020]);
    $data = json_decode($data);
    foreach($data as $key=>$val){
      if($key=='id') continue;
      $model->$key = trim($val);
    }
    // 执行
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 删除 */
  function delAction(){
    $data = $this->request->get('data','string');
    if(empty($data)) return self::getJSON(['code'=>4000]);
    // 数据处理
    $id = trim($data,',');
    // 执行
    $model = SysMenuAction::find(['id in('.$id.')']);
    return $model->delete()?self::getJSON(['code'=>0]):self::error(4023);
  }
  
}