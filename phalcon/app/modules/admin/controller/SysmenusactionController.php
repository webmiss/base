<?php

namespace app\modules\admin\controller;

use app\common\Base;
use app\common\AdminToken;
use app\model\SysMenu;
use app\model\SysMenuAction;

class SysMenusActionController extends Base {

  static $tokenData;

  /* 构造函数 */
  function initialize(){
    // 验证
    self::$tokenData = AdminToken::verify();
  }

  /* 获取[动作菜单] */
  function getActionAction(){
    $url = trim($this->request->get('url'));
    // 是否为空
    if(empty($url)) return self::getJSON(['code'=>0,'msg'=>'获取动作不能为空!']);
    // 菜单ID
    $permAll = AdminToken::perm(self::$tokenData->uid);
    self::bug($permAll);
    $action = [];
    // self::bug($url);
    return self::getJSON(['code'=>0,'action'=>$action]);
  }

}