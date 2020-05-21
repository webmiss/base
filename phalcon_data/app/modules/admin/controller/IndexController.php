<?php

namespace app\modules\admin\controller;

use app\controller\Base;
use app\model\SysConfig;
use app\library\baidu\Ai;

/**
* 网站：首页
*/
class IndexController extends Base{

	/* 首页 */
	public function indexAction(){
    return 'Admin';
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
		return self::getJSON(['code'=>0,'version'=>'0.0.1','size'=>$size,'file'=>$file]);
	}

	/* 系统配置 */
	public function getConfigAction(){
		$config = SysConfig::find(['','columns'=>'name,title,val'])->toArray();
		$data = [];
		$arr = ['title','copy','logo','login_bg'];
		foreach($config as $val){
			if(in_array($val['name'],$arr)){
				$data[$val['name']] = $val['val'];
				if($val['name']=='logo' || $val['name']=='login_bg') $data[$val['name']] = $this->config->img_url.$val['val'];
			}
		}
		return self::getJSON(['code'=>0,'list'=>$data]);
	}

	/* 百度Token */
  function baiduTokenAction(){
		// 获取Token
		$token = $this->redis->get('baidu_token');
		if(!$token){
			$token = Ai::getToken();
			$this->redis->setex('baidu_token',1.9*3600,$token);
		}
    return self::getJSON(['code'=>0,'token'=>$token]);
  }

	/* 导出数据 */
	function exportAction(){
    $name = '';
		echo '<table>';
    echo '<table>';
		// 下载
		header("Content-type:application/octet-stream");
		header("Accept-Ranges:bytes");
    header("Content-type:application/vnd.ms-excel");
		header("Content-Disposition:attachment;filename=$name.xls");
		header("Pragma: no-cache");
		header("Expires: 0");
  }

}