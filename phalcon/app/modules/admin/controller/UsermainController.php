<?php

namespace app\modules\admin\controller;

use app\modules\admin\model\SysMenu;
use app\modules\admin\model\SysMenuAction;

use app\model\Msg;
use app\library\baidu\Ai;

class UserMainController extends UserBase{

  static private $menus=[];

	/* 获取菜单 */
	function getMenusAction(){
    // 全部菜单
    $all = SysMenu::find(['','columns'=>'id,fid,title,url,ico','order'=>'sort DESC,id'])->toArray();
    foreach($all as $val){
      self::$menus[$val['fid']][] = $val;
    }
    // 查询菜单
    return self::getJSON(['code'=>0,'menus'=>self::getMenu()]);
  }
  // 递归菜单
	static private function getMenu($fid=0){
    $data=[];
    $M = isset(self::$menus[$fid])?self::$menus[$fid]:[];
		foreach($M as $val){
			if(isset(self::$perm[$val['id']])){
        $val['menus'] = self::getMenu($val['id']);
				$data[] = $val;
			}
		}
		return $data;
  }

  /* 动作菜单 */
  function getMenusActionAction(){
    $url = trim($this->request->get('url'));
    $mid = SysMenu::findFirst(['url=:url:','bind'=>['url'=>$url],'columns'=>'id']);
    return self::getJSON([
      'code'=>0,
      'menuAction'=>self::actionMenus(self::$perm[$mid->id]),
    ]);
  }
  // 动作菜单
	static private function actionMenus($perm=''){
		$data = [];
    // 全部动作菜单
    $aMenus = SysMenuAction::find(['','columns'=>'name,action,ico,perm']);
    foreach($aMenus as $val){
			// 匹配权限值
			if(intval($perm)&intval($val->perm)){
				$data[] = ['name'=>$val->name,'action'=>$val->action,'ico'=>$val->ico];
			}
    }
    return $data;
  }

  /* 全部动作菜单 */
  function getActionAllAction(){
    $aMenus = SysMenuAction::find(['','columns'=>'name,action,perm']);
    return self::getJSON(['code'=>0,'aMenus'=>$aMenus]);
  }

  /* 新消息 */
  function msgNewAction(){
    $model = Msg::find(['is_new="0" AND uid=:uid:','bind'=>['uid'=>self::$token->uid],'columns'=>'id,title,content','order'=>'id DESC']);
    $num = $model->count();
    $id='';$title='';$content='';
    if(isset($model[0])){
      $id = $model[0]->id;
      $title = $model[0]->title;
      $content = $model[0]->content;
    }
    return self::getJSON(['code'=>0,'num'=>$num,'name'=>'','id'=>$id,'title'=>$title,'content'=>$content]);
  }
  function msgNewStateAction(){
    $id = $this->request->get('id');
    $model = Msg::findFirst(['id=:id: AND uid=:uid:','bind'=>['id'=>$id,'uid'=>self::$token->uid]]);
    $model->is_new = '1';
    // 执行
    return $model->save()?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 百度Token */
  function baiduTokenAction(){
    $token = Ai::getToken();
    return self::getJSON(['code'=>0,'token'=>$token]);
  }
  
}