<?php
namespace app\common;

/* 数据类 */
class Data{

  /* 自动编号ID-18位 */
  static function getId(){
    list($msec, $sec) = explode(' ', microtime());
    return date('YmdHis').substr($msec,2,4);
  }

  /* 计算年龄 */
	static function getAge($birthday){
		$date = date("Y-m-d");
		list($y,$m,$d)=explode("-",$birthday);
		list($ty,$tm,$td)=explode("-", $date);
		$age=$ty-$y;
		if($tm>$m || $tm==$m&&$td>$d) $age+=1;
		return $age;
	}

}