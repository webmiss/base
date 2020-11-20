<?php
namespace app\model;

/* 用户信息表 */
class Demo extends Model {

  public $uid;
  public $title;
  public $ctime;
  public $utime;
  
  /* 构造函数 */
  public function initialize(){
    $this->setSource('test'); //数据表
  }

  /* 标题 */
  function setTitle($val){
    $this->title = $val;
  }
  function getTitle(){
    return $this->title;
  }

  /* 保存 */
  public function beforeSave(){
    // 生日
    if(empty($this->birthday)) $this->birthday = null;
  }

  /* 创建 */
  public function beforeCreate(){
    $this->ctime = date('YmdHis');
  }

  /* 更新 */
  public function beforeUpdate(){
    $this->utime = date('YmdHis');
  }

  /* 删除 */
  public function beforeDelete(){
  }

}
