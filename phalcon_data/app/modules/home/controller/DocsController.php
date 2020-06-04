<?php

namespace app\modules\home\controller;

/**
* 文档
*/
class DocsController extends BaseController{

  /* 首页 */
	public function indexAction(){
		// $this->view->setVar('LoadJS',['/themes/home/main.js']);
    // return self::display('index/index');
  }
  
  /* WebMIS */
	function webmisAction($m1='',$m2=''){
		$m1 = !empty($m1)?$m1:'index';
		return self::_show($m1,$m2);
  }

  /* Linux */
	function linuxAction($m1='',$m2=''){
		$m1 = !empty($m1)?$m1:'index';
		return self::_show($m1,$m2);
  }
  
  // 详情
	private function _show($m1='',$m2=''){
    $dir = __DIR__.'/../view/'.$this->dispatcher->getControllerName().'/'.$this->dispatcher->getActionName().'/';
    // 全部菜单
		$menus = json_decode(file_get_contents($dir.'menus.json'),true);
    $this->view->setVar('Meuns',$menus);
    // 路径
		$url = '';
		$url .= !empty($m1)?$m1:'';
		$url .= !empty($m2)?'/'.$m2:'';
    $this->view->setVar('Url',$url);
    // 标题
		$this->view->setVar('ctitle',$menus['title']);
		$title = $menus['title'].' - '.$menus['menus'][$m1]['title'];
		if(isset($menus['menus'][$m1]['menus'][$m2])){
			$title = $menus['title'].' - '.$menus['menus'][$m1]['menus'][$m2]['title'];
		}
    // SEO
    $this->view->setVar('WebTitle',$title);
    // 文件
    $this->view->setVar('File',$dir.$url.'.md');
    // LoadJS
		$this->view->setVar('LoadJS',[
			'themes/home/js/docs.js'
		]);
    /* 加载视图 */
    $this->view->setVar('LoadJS',['/themes/home/docsShow.js']);
    return self::display('docs/show');
  }

}