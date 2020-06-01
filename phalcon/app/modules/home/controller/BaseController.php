<?php
namespace app\modules\home\controller;

use app\controller\Base;

class BaseController extends Base{

  /* 构造函数 */
	public function initialize(){
    // SEO
		$this->view->setVar('WebTitle',$this->config->title);
		$this->view->setVar('Keywords',$this->config->Keywords);
		$this->view->setVar('Description',$this->config->description);
  }

  /* 调用试图 */
  protected function display($view='',$layout='main'){
    $this->view->setTemplateAfter('main');
		return $this->view->pick($view);
  }

}