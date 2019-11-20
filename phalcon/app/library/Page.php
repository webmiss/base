<?php

/**
* 分页类
*/

namespace app\library;

use Phalcon\Paginator\Adapter\Model as PaginatorModel;

class Page{
	/* Page */
	static public function get($config=array()){
		if(isset($config['data'])){
			$controller = isset($config['controller'])?$config['controller']:'';
			$limit = isset($config['limit'])?$config['limit']:15;
			$getUrl = isset($config['getUrl'])?$config['getUrl']:'';
			// Page
			$page = !isset($_GET['page'])||empty(intval($_GET['page']))||$_GET['page']<0?1:intval($_GET['page']);
			$paginator  = new PaginatorModel(['data'=>$config['data'],'limit'=>$limit,'page'=>$page]);
			$Page = $paginator->getPaginate();
			// Page Html
			$html = '';
			if(empty($page) || $page==1){
				$html .= '<span>首页</span>';
				$html .= '<span>上一页</span>';
			}else{
				$html .= '<a href="'.Inc::BaseUrl($controller).'?page=1'.$getUrl.'&search">首页</a>';
				$html .= '<a href="'.Inc::BaseUrl($controller).'?page='.$Page->before.$getUrl.'&search">上一页</a>';
			}
			if($Page->total_pages==0 || $page==$Page->last){
				$Page->current = $Page->total_pages?$Page->current:0;
				$html .= '<span>下一页</span>';
				$html .= '<span>末页</span>';
			}else{
				$html .= '<a href="'.Inc::BaseUrl($controller).'?page='.$Page->next.$getUrl.'&search">下一页</a>';
				$html .= '<a href="'.Inc::BaseUrl($controller).'?page='.$Page->last.$getUrl.'&search">末页</a>';
			}
			$html .= ' Page : '.$Page->current.'/'.$Page->total_pages;
			$Page->PageHtml = $html;
			return $Page;
		}else{return FALSE;}
	}
	// Page Where
	static public function where(){
		$getUrl = '';
		$like = $_GET;
		$page = isset($like['page'])?$like['page']:1;
		unset($like['_url']);
		unset($like['page']);
		foreach($like as $key=>$val){if($val==''){unset($like[$key]);}else{$getUrl .= '&'.$key.'='.$val;}}
		unset($like['search']);
		return array('getUrl'=>$getUrl,'data'=>$like,'search'=>'?search&page='.$page.$getUrl);
	}
}