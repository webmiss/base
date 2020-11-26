<?php

namespace app\modules\admin\controller;

use app\common\Base;
use app\common\AdminToken;
use app\model\SysMenu;

class SysMenusController extends Base {

  static private $menus=[]; // 菜单
  private static $tokenData;
  private static $permAll;

  /* 构造函数 */
  function initialize(){
    parent::initialize();
  }

  /* 列表 */
  function listAction(){
    // 验证
    AdminToken::urlVerify('SysMenus');
    // 搜索
    $data = json_decode($this->request->get('data'));
    $fid = isset($data->fid)?trim($data->fid):'';
    $title = isset($data->title)?trim($data->title):'';
    $url = isset($data->url)?trim($data->url):'';
    $where = SysMenu::bindWhere(
      'fid LIKE "%:fid:%" AND title LIKE "%:title:%" AND url LIKE "%:url:%"',
      ['fid'=>$fid,'title'=>$title,'url'=>$url]
    );
    // 分页
    $page = $this->request->get('page','int');
    $limit = $this->request->get('limit','int');
    $start = ($page-1)*$limit;
    // 统计
    $total = SysMenu::count($where);
    // 数据
    $list = SysMenu::find([
      $where,
      'limit'=>['number'=>$limit,'offset'=>$start],
      'order'=>'sort DESC, fid'
    ])->toArray();
    // 状态
    foreach ($list as $key => $val) {
      $list[$key]['ctime'] = $val['ctime']?$val['ctime']:'';
      $list[$key]['utime'] = $val['utime']?$val['utime']:'';
    }
    return self::getJSON(['code'=>0,'msg'=>'成功','list'=>$list,'total'=>$total]);
  }

  /* 获取[菜单] */
	function getMenusAction(){
    // 验证
    self::$tokenData = AdminToken::verify();
    // 全部菜单
    self::$menus = [];
    $all = SysMenu::find(['columns'=>'id,fid,title,url,ico','order'=>'sort DESC,id'])->toArray();
    foreach($all as $val){
      self::$menus[$val['fid']][] = $val;
    }
    // 全部权限
    self::$permAll = AdminToken::perm(self::$tokenData->uid);
    // 组合菜单
    return self::getJSON(['code'=>0,'menus'=>self::_getMenu(0)]);
  }
  // 递归菜单
	static private function _getMenu($fid){
    $data = [];
    $M = isset(self::$menus[$fid])?self::$menus[$fid]:[];
		foreach($M as $val){
      if(isset(self::$permAll[$val['id']])){
        $val['children'] = self::_getMenu($val['id']);
        $data[] = $val;
      }
		}
		return $data;
  }
  
}