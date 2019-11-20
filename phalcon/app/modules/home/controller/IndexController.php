<?php

namespace app\modules\home\controller;

use app\controller\Base;

/**
* 网站：首页
*/
class IndexController extends Base{

	public function indexAction(){
    return self::getJSON(['code'=>0]);
    // $this->view->setTemplateAfter('main');
		// return $this->view->pick('index/index');
	}

}