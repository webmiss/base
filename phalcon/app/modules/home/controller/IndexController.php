<?php

namespace app\modules\home\controller;

/**
* 首页
*/
class IndexController extends BaseController{

	public function indexAction(){
		$this->view->setVar('LoadJS',['/themes/home/js/index.js']);
		$this->view->setVar('LoadCSS',['/themes/home/css/index.css']);
    return $this->display('index/index');
	}

}