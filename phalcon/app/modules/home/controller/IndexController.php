<?php

namespace app\modules\home\controller;

/**
* 网站：首页
*/
class IndexController extends Base{

	public function indexAction(){
    return md5('sharefoot.db.webmis');
    // $this->view->setTemplateAfter('main');
		// return $this->view->pick('index/index');
	}

}