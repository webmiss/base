<?php
namespace app\model;

class UserMsg extends Model{

  public $id;
  public $title;
  public $content;
  public $ctime;
  public $utime;

  /* 构造函数 */
  public function initialize(){
    $this->setSource('user_msg'); //数据表
  }

  /* 保存 */
  public function beforeSave(){
    // 标题
    $num = mb_strlen($this->title,'utf-8');
    if($num<2 || $num>16){
      return self::error('标题为2~16位字符！');
    }
    // 内容
    $num = mb_strlen($this->content,'utf-8');
    if($num<2 || $num>300){
      return self::error('内容为2~300位字符！');
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
