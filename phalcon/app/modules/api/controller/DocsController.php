<?php
namespace app\modules\api\controller;

use app\common\Base;
use app\library\Parsedown;

class DocsController extends Base{

  static private $div = __DIR__.'/../../home/view/docs/';

  /* 菜单-列表 */
  function listAction(){
    $name = $this->request->get('name','string');
    $file = self::$div.$name.'/menus.json';
    $menus = '';
    if(is_file($file)){
      $menus = json_decode(file_get_contents($file),true);
      return self::getJSON(['code'=>0,'list'=>$menus]);
    }else{
      return self::getJSON(['code'=>4000,'msg'=>'暂无分类可选择']);
    }
  }

  /* 详情 */
  function showAction(){
    $m0 = $this->request->get('m0','string');
    $m1 = $this->request->get('m1','string');
    $m2 = $this->request->get('m2','string');
    $m1 = !empty($m1)?$m1:'index';
    // 路径
		$file = self::$div.$m0.'/';
		$file .= !empty($m1)?$m1:'';
    $file .= !empty($m2)?'/'.$m2:'';
    $file .= '.md';
    // Markdown转Html
    if(is_file($file)){
      $MD = new Parsedown();
	    $html = $MD->text(file_get_contents($file));
      return self::getJSON(['code'=>0,'html'=>$html]);
    }else{
      return self::getJSON(['code'=>4000,'msg'=>'暂无文档内容！']);
    }
  }

}