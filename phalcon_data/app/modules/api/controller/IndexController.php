<?php

namespace app\modules\api\controller;

use app\controller\Base;
use app\library\Code;
use app\library\Socket;
use app\library\baidu\Ai;

class IndexController extends Base{

	/* 首页 */
	function indexAction(){
		return self::getJSON(['code'=>0]);
	}
	
	/* 错误代码 */
	function allCodeAction(){
		return self::getJSON(['code'=>0,'list'=>Code::get('all')]);
	}

	/* APP更新 */
	function appUpdateAction(){
		$os = $this->request->get('os','string');
		if($os=='iOS'){
			$file = 'upload/down/ios.ipa';
			$size = filesize($file);
		}elseif($os=='Android'){
			$file = 'upload/down/android.apk';
			$size = filesize($file);
		}
		return self::getJSON(['code'=>0,'version'=>'0.0.1','size'=>$size,'file'=>$file]);
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

	/* Socket客户端 */
	function socketAction(){
		$fd = $this->redis->hGet('SocketUid',1);
		Socket::send([
			'type'=>'system',
			'title'=>'系统消息1',
			'content'=>'系统发送消息',
			// 'fd'=>$fd
		]);
	}
  
}