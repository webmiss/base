<?php

namespace app\modules\admin\model;

use app\model\BaseModel;

class SysMenu extends BaseModel{

  public $id;
  private $fid;
  private $title;

  public function initialize(){
    // 数据表
    $this->setSource('sys_menus');
  }

  /* FID */
  public function setFid($fid){
    if(empty($fid)) $fid = '0';
    $this->fid = $fid;
  }
  public function getFid(){
    return $this->fid;
  }
  
  /* 名称 */
  public function setTitle($title){
    $num = mb_strlen($title,"utf-8");
    if($num<2 || $num>12){
      return self::error('名称为2~12位字符！');
    }
    $this->title = $title;
  }
  public function getTitle(){
    return $this->title;
  }

}
