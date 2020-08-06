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
		if($os=='iOS'){
			$file = 'upload/down/ios.ipa';
			$size = filesize($file);
		}elseif($os=='Android'){
			$file = 'upload/down/android.apk';
			$size = filesize($file);
		}
		return self::getJSON(['code'=>0,'version'=>'1.0.0','size'=>$size,'file'=>$file]);
	}
  
}