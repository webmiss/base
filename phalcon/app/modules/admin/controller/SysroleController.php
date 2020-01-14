<?php

namespace app\modules\admin\controller;

use app\model\UserRole;
use app\modules\admin\model\SysMenu;
use app\modules\admin\model\SysMenuAction;

class SysRoleController extends UserBase {

  static private $menus=[];

  /* 列表 */
  function listAction(){
    // 条件
    $where = self::getSeaWhere()['where'];
    // 分段
    $page = $this->request->get('page','int');
    $limit = $this->request->get('limit','int');
    $start = ($page-1)*$limit;
    $total = UserRole::count([$where]);
    $menus = UserRole::find([
      $where,
      'columns'=>'id,role,utime,perm',
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
    $model = new UserRole();
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
    $model = UserRole::findFirst(['id=:id:','bind'=>['id'=>$id]]);
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
    $model = UserRole::find(['id in('.$id.')']);
    return $model->delete()?self::getJSON(['code'=>0]):self::error(4023);
  }

  /* 获取全部菜单 */
  function allMenusAction(){
    // 全部菜单
    $all = SysMenu::find(['','columns'=>'id,fid,title,perm','order'=>'sort DESC,id'])->toArray();
    foreach($all as $val){
      self::$menus[$val['fid']][] = $val;
    }
    // 获取菜单
    $menus = self::getMenu();
    // 动作菜单
    $aMenus = SysMenuAction::find(['columns'=>'name,perm']);
    // 组合结果
    $data = []; $n1=0; $allID=[];
    foreach($menus as $v1){
      $data[$n1] = ['id'=>$v1['id'].','.$v1['id'].':0','label'=>$v1['title']];
      $n2=0;
      foreach($v1['menus'] as $v2){
        $data[$n1]['children'][$n2] = ['id'=>$v1['id'].','.$v2['id'].':0','label'=>$v2['title']];
        if(empty($v2['menus'])){
          $n4=0;
          foreach($aMenus as $v4){
            if(intval($v2['perm'])&intval($v4['perm'])){
              $data[$n1]['children'][$n2]['children'][$n4] = ['id'=>$v1['id'].','.$v2['id'].':'.$v4['perm'],'label'=>$v4['name']];
              $allID[$v2['id'].':'.$v4['perm']] = $v1['id'].','.$v2['id'].':'.$v4['perm'];
              $n4++;
            }
          }
        }else{
          $n3=0;
          foreach($v2['menus'] as $v3){
            $data[$n1]['children'][$n2]['children'][$n3] = ['id'=>$v1['id'].'-'.$v2['id'].','.$v3['id'].':0','label'=>$v3['title']];
            $n4=0;
            foreach($aMenus as $v4){
              if(intval($v3['perm'])&intval($v4['perm'])){
                $data[$n1]['children'][$n2]['children'][$n3]['children'][$n4] = ['id'=>$v1['id'].'-'.$v2['id'].','.$v3['id'].':'.$v4['perm'],'label'=>$v4['name']];
                $allID[$v3['id'].':'.$v4['perm']] = $v1['id'].'-'.$v2['id'].','.$v3['id'].':'.$v4['perm'];
                $n4++;
              }
            }
            $n3++;
          }
        }
        $n2++;
      }
      $n1++;
    }
    return self::getJSON(['code'=>0,'menus'=>$data,'id'=>$allID]);
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

  /* 编辑权限 */
  function permAction(){
    $id = $this->request->get('id','int');
    $perm = trim($this->request->get('perm','string'));
    if(empty($id) || empty($perm)) return self::error('参数错误！');
    // 数据处理
    $model = UserRole::findFirst(['id=:id:','bind'=>['id'=>$id]]);
    $model->perm = $perm;
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }
  
}