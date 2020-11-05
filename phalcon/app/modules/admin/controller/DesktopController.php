<?php

namespace app\modules\admin\controller;

use app\common\Base;
use app\common\AdminToken;

/* 控制台 */
class DeskTopController extends Base{

  /* 构造函数 */
  function initialize(){
    parent::initialize();
    // 控制器权限
    AdminToken::urlVerify('/');
  }

  /* 首页 */
  function indexAction(){
    return self::getJSON(['code'=>0,'msg'=>'成功']);
  }

}