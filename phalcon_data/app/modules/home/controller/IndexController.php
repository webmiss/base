<?php

namespace app\modules\home\controller;

/**
* 首页
*/
class IndexController extends BaseController{

	public function indexAction(){
		$this->view->setVar('LoadJS',[]);
    return self::display('index/index');
	}

}