<?php

namespace app\modules\admin\controller;

use app\controller\Base;
use app\model\SysConfig;

/**
* 网站：首页
*/
class IndexController extends Base{

  /* 首页 */
  public function indexAction(){
    return self::getJSON(['code'=>0,'msg'=>'Admin']);
  }

  /* APP更新 */
  function appUpdateAction(){
    $os  = $this->request->get('os','string');
    if($os=='iOS'){
      $file = 'upload/admin/down/ios.ipa';
      $size = filesize($file);
    }elseif($os=='Android'){
      $file = 'upload/admin/down/android.apk';
      $size = filesize($file);
    }
    return self::getJSON(['code'=>0,'version'=>'1.0.0','size'=>$size,'file'=>$file]);
  }

  /* 系统配置 */
  public function getConfigAction(){
    $config = SysConfig::find(['','columns'=>'name,title,val'])->toArray();
    $data = [];
    $arr = ['title','copy','logo','login_bg'];
    foreach($config as $val){
      if(in_array($val['name'],$arr)){
        $data[$val['name']] = $val['val'];
        if($val['name']=='logo' || $val['name']=='login_bg'){
          $data[$val['name']] = $val['val']?$this->config->base_url.$val['val']:'';
        }
      }
    }
    return self::getJSON(['code'=>0,'list'=>$data]);
  }

}