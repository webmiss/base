<?php

namespace app\modules\admin\controller;

use app\Env;
use app\common\Base;
use app\common\AdminToken;
use app\library\File;
use app\library\Down;

/* 文件管理 */
class SysFileManageController extends Base{

  private static $dirRoot = 'upload/';

  /* 构造函数 */
  function initialize(){
    // 控制器权限
    AdminToken::urlVerify('SysFileManage');
    // 文件类
    File::$file_root = self::$dirRoot;
    if (!is_dir(self::$dirRoot)) mkdir(self::$dirRoot,0777,true);
  }

  /* 列表 */
  function listAction(){
    $path = $this->request->get('path','string');
    $list = File::lists($path);
    return self::getJSON(['code'=>0,'url'=>Env::$base_url.self::$dirRoot,'data'=>$list]);
  }

}