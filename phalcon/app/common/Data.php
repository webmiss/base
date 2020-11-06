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

  /* 关键字高亮 */
  static function keyHH($str='', $phrase='', $tag_open='<span style="color:#FF6600">', $tag_close='</span>'){
    if ($str=='') return FALSE;
    if ($phrase!='') return preg_replace('/('.preg_quote($phrase, '/').')/i', $tag_open."\\1".$tag_close, $str);
    return $str;
  }

  /* 字符串截取 */
  static function subStr($str='', $len=0, $append='...'){
    if(strlen($str) <= $len ){
      return $str;
    }else{
      $I = 0;
      while ($I < $len){
        $strTmp = substr($str,$I,1);
        if( ord($strTmp) >=224 ){
          $strTmp = substr($str,$I,3);
          $I = $I + 3;
        }elseif( ord($strTmp) >=192 ){
          $strTmp = substr($str,$I,2);
          $I = $I + 2;
        }else{
          $I = $I + 1;
        }
        $strLast[] = $strTmp;
      }
      $strLast = implode('',$strLast);
      if($append) $strLast.=$append;
      return $strLast;
    }
  }

}