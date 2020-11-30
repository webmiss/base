<?php
namespace app\modules\home\controller;

use app\Env;
use app\common\Base;

class BaseController extends Base{

  /* 构造函数 */
	public function initialize(){
    // SEO
		$this->view->setVar('WebTitle',Env::$title);
		$this->view->setVar('Keywords',Env::$keywords);
    $this->view->setVar('Description',Env::$description);
  }

  /* 调用试图 */
  protected function display($view='',$layout='main'){
    $this->view->setTemplateAfter('main');
		return $this->view->pick($view);
  }

}