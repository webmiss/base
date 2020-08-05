<?php

namespace app\modules\admin\controller;

use app\model\Msg;

class WebMsgController extends UserBase {

  /* 列表 */
  function listAction(){
    // 条件
    $where = self::getSeaWhere()['where'];
    $where .= ' AND uid='.self::$token->uid;
    // 分页
    $page = $this->request->get('page','int');
    $limit = $this->request->get('limit','int');
    $start = ($page-1)*$limit;
    // 查询数据
    $total = Msg::count([$where]);
    $menus = Msg::find([
      $where,
      'columns'=>'id,is_new,ctime,title,content',
      'order'=>'id DESC',
      'limit'=>['number'=>$limit,'offset'=>$start]
    ]);
    return self::getJSON(['code'=>0,'list'=>$menus,'total'=>$total]);
  }

  /* 删除 */
  function delAction(){
    $data = $this->request->get('data','string');
    if(empty($data)) return self::getJSON(['code'=>4000]);
    // 数据处理
    $id = trim($data,',');
    // 执行
    $model = Msg::find(['id in('.$id.')']);
    return $model->delete()?self::getJSON(['code'=>0]):self::error(4023);
  }

  /* 修改状态 */
  function stateAction(){
    $id = $this->request->get('id','int');
    $model = Msg::findFirst(['id=:id:','bind'=>['id'=>$id]]);
    $model->is_new = '1';
    // 执行
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }
  
}