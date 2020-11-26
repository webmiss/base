<?php
namespace app\model;

use app\library\Safety;

/* 系统菜单表 */
class SysMenu extends Model {

  protected $id;
  protected $fid;
  protected $title;
  protected $url;
  protected $perm;
  protected $ctime;
  protected $utime;

  /* 构造函数 */
  public function initialize(){
    $this->setSource('sys_menus');  //数据表
  }

  /* FID */
  public function setFid($val){
    if(!is_numeric($val)){
      self::error('FID为正整数!');
    }
    $this->fid = (int)$val;
  }
  public function getFid(){
    return $this->fid;
  }

  /* 名称 */
  public function setTitle($val){
    $num = mb_strlen($val,'utf-8');
    if($num<2 || $num>8){
      self::error('名称为2~8位字符!');
    }
    $this->title = $val;
  }
  public function getTitle(){
    return $this->title;
  }

  /* 控制器 */
  public function setUrl($val){
    if(!empty($val) && !Safety::test('^[a-zA-Z]{2,24}$',$val)){
      self::error('控制器为2~24位英文!');
    }
    $this->url = $val;
  }
  public function getUrl(){
    return $this->url;
  }

  /* 预设权限 */
  public function setPerm($val){
    if(!is_numeric($val)){
      self::error('权限值为正整数!');
    }
    $this->perm = (int)$val;
  }
  public function getPerm(){
    return $this->perm;
  }

  /* 创建 */
  public function beforeCreate(){
    $this->ctime = date('YmdHis');
  }

  /* 更新 */
  public function beforeUpdate(){
    $this->utime = date('YmdHis');
  }

}