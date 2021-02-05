<?php

namespace app\model;

/* 系统配置表 */
class SysConfig extends Model {

  public $id;
  public $title;
  public $name;
  public $ctime;
  public $utime;

  /* 构造函数 */
  public function initialize(){
    $this->setSource('sys_config'); //数据表
  }

  /* 保存 */
  public function beforeSave(){
    // 标题
    $num = mb_strlen($this->title,'utf-8');
    if($num<2 || $num>16){
      return self::error('标题为2~16位字符！');
    }
    // 名称
    $num = mb_strlen($this->name,'utf-8');
    if($num<2 || $num>16){
      return self::error('名称为2~16位字符！');
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
