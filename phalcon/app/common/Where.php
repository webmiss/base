<?php
namespace app\common;

class Where extends Base {

  /* 搜索条件 */
  static function getSearch($jsonStr){
    $get = trim($jsonStr);
    $where = '';
    $data = [];
    if($get){
      $get = json_decode($get);
      foreach($get as $k=>$v){
        if(!is_array($v)) $where .= $k." LIKE '%".$v."%' AND ";
        if(!empty($v) || $v==='0' || $v===0) $data[$k] = $v;
      }
      $where = rtrim($where,'AND ');
    }
    return ['where'=>$where,'data'=>$data];
  }

}