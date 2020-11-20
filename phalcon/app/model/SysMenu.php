<?php
namespace app\model;

/* 系统菜单表 */
class SysMenu extends Model {

  private $id;
  private $fid;
  public $title;
  public $ctime;
  public $utime;

  /* 构造函数 */
  public function initialize(){
    $this->setSource('sys_menus');  //数据表
  }

  /* FID */
  public function setFid($fid){
    if(empty($fid)) $fid = '0';
    $this->fid = $fid;
  }
  public function getFid(){
    return $this->fid;
  }

  /* 保存 */
  public function beforeSave(){
    // 名称
    $num = mb_strlen($this->title,'utf-8');
    if($num<2 || $num>12){
      return self::error('名称为2~12位字符！');
    }
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