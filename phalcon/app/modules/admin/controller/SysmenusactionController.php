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