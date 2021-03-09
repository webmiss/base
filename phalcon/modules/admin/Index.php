<?php
namespace App\Admin;

use Base\Base;
use Config\Env;
use Model\SysConfig;

class Index extends Base {

  /* 首页 */
  static function Index() {
    return self::GetJSON(['code'=>0, 'msg'=>'Admin']);
  }

  /* 系统配置 */
  static function getConfig() {
    $config = new SysConfig();
    $config->Columns('name','val');
    $config->Where('name in ("title","copy","logo","login_bg")');
    $data = $config->Find();
    // 数据
    $list = [];
    foreach($data as $val){
      if($val['name']=='logo' || $val['name']=='login_bg'){
        $list[$val['name']] = $val['val']?Env::$base_url.$val['val']:'';
      }else{
        $list[$val['name']] = $val['val'];
      }
    }
    // 返回
    return self::GetJSON(['code'=>0, 'msg'=>'成功', 'list'=>$list]);
  }

}
