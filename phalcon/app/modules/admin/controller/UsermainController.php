<?php

namespace app\modules\admin\controller;

use app\modules\admin\model\SysMenu;
use app\modules\admin\model\SysMenuAction;
use app\library\BaiduAi;

class UserMainController extends UserBase{

  static private $menus=[];

  /* 百度Token */
  function baiduAudioAction(){
    $text = $this->request->get('text');
    if(empty($text)) return self::getJSON(['code'=>4000]);
    // Token
    $token = $this->redis->get('baidu_token');
    if(!$token){
      $token = BaiduAi::getToken();
      $this->redis->setex('baidu_token',1.9*3600,$token);
    }
    $url = 'https://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=1&tex='.$text.'&tok='.$token;
    return self::getJSON(['code'=>0,'url'=>$url]);
  }

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
      'menuAction'=>isset($mid->id)?self::actionMenus(self::$perm[$mid->id]):[],
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
  
}