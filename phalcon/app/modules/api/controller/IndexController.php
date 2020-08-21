<?php
namespace app\modules\api\controller;

use app\controller\Base;
use app\library\Code;

class IndexController extends Base{

  /* 首页 */
  function indexAction(){
    return self::getJSON(['code'=>0,'msg'=>'Api']);
  }

  /* 错误代码 */
  function allCodeAction(){
    return self::getJSON(['code'=>0,'list'=>Code::get('all')]);
  }

  /* APP更新 */
  function appUpdateAction(){
    $os  = $this->request->get('os','string');
    if($os=='iOS') $file = 'upload/down/ios.ipa';
    elseif($os=='Android') $file = 'upload/down/android.apk';
    else return self::getJSON(['code'=>4000,'msg'=>'未知平台,暂无下载!']);
    $size = is_file($file)?filesize($file):0;
    return self::getJSON(['code'=>0,'version'=>'1.0.0','size'=>$size,'file'=>$this->config->base_url.$file]);
  }
  
}