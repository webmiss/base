<?php

namespace app\modules\admin\controller;

use app\modules\admin\model\SysMenu;

class SysMenusController extends UserBase {

  static private $menus=[]; // 菜单

  /* 列表 */
  function listAction(){
    // 全部菜单
    $all = SysMenu::find(['','order'=>'sort DESC,id'])->toArray();
    foreach($all as $val){
      self::$menus[$val['fid']][] = $val;
    }
    // 获取菜单
    $menus = self::getMenu();
    // 组合结果
    $data = []; $n1=0;
    foreach($menus as $v1){
      $v1['label'] = $v1['title'];
      $data[$n1] = $v1;
      $n2=0;
      foreach($v1['menus'] as $v2){
        $v2['label'] = $v2['title'];
        $data[$n1]['children'][$n2] = $v2;
        if(!empty($v2['menus'])){
          $n3=0;
          foreach($v2['menus'] as $v3){
            $v3['label'] = $v3['title'];
            $data[$n1]['children'][$n2]['children'][$n3] = $v3;
            $n3++;
          }
        }
        $n2++;
      }
      $n1++;
    }
    return self::getJSON(['code'=>0,'list'=>$data]);
  }

  /* 添加 */
  function addAction(){
    $data = $this->request->get('data');
    if(empty($data)) return self::getJSON(['code'=>4000]);
    // 数据处理
    $model = new SysMenu();
    $data = json_decode($data);
    foreach($data as $key=>$val){
      if($key=='id') continue;
      $model->$key = trim($val);
    }
    $model->ctime = date('YmdHis');
    // 执行
    return $model->save()?self::getJSON(['code'=>0]):self::error(4021);
  }

  /* 编辑 */
  function editAction(){
    $id = trim($this->request->getPost('id'));
    $data = trim($this->request->getPost('data'));
    if(empty($id) || empty($data)) return self::getJSON(['code'=>4000]);
    // 数据处理
    $model = SysMenu::findFirst(['id=:id:','bind'=>['id'=>$id]]);
    if(!$model) return self::getJSON(['code'=>4020]);
    $data = json_decode($data);
    foreach($data as $key=>$val){
      if($key=='id') continue;
      $model->$key = trim($val);
    }
    $model->utime = date('YmdHis');
    // 执行
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 删除 */
  function delAction(){
    $data = $this->request->get('data');
    if(empty($data)) return self::getJSON(['code'=>4000]);
    // 数据处理
    $id = implode(',',json_decode($data));
    // 执行
    $model = SysMenu::find(['id in('.$id.')']);
    return $model->delete()?self::getJSON(['code'=>0]):self::error(4023);
  }

  /* 获取分类 */
  function getClassAction($type=''){
    if($type=='fid'){
      // 全部
      $all = SysMenu::find(['columns'=>'id,fid,title'])->toArray();
      foreach($all as $val){
        self::$menus[$val['fid']][] = $val;
      }
      $menus = self::getMenu();
      // 组合结果
      $data = []; $n1=0;
      foreach($menus as $v1){
        $data[$n1] = ['value'=>$v1['id'],'label'=>$v1['title']];
        $n2=0;
        foreach($v1['menus'] as $v2){
          $data[$n1]['children'][$n2] = ['value'=>$v2['id'],'label'=>$v2['title']];
          $n3=0;
          foreach($v2['menus'] as $v3){
            $data[$n1]['children'][$n2]['children'][$n3] = ['value'=>$v3['id'],'label'=>$v3['title']];
            $n3++;
          }
          $n2++;
        }
        $n1++;
      }
    }
    return self::getJSON(['code'=>0,'list'=>$data]);
  }
  // 递归菜单
  static private function getMenu($fid=0){
    $data=[];
    $M = isset(self::$menus[$fid])?self::$menus[$fid]:[];
    foreach($M as $val){
      $val['menus'] = self::getMenu($val['id']);
      $data[] = $val;
    }
    return $data;
  }
  
}