<?php

/**
* 上传类
*/

namespace app\library;

class Upload{

  /* 单文件上传 */
  static function file($param=[]){
    // 参数
    $param = array_merge([
      'upName'=>'up',  //上传名称
      'path'=>'upload/',  //上传目录
      'filename'=>'', //文件名
      'type'=>['jpg','jpeg','png','gif','mov','mp4','wav','mp3'], //允许格式
    ],$param);
    // 限制格式
    $ext = substr(strrchr($_FILES[$param['upName']]['name'],'.'),1);
    $param['filename'] = empty($param['filename'])?self::_getName().'.'.$ext:$param['filename'];
    if(in_array($ext,$param['type'])){
      // 创建目录
      if (!file_exists($param['path'])) mkdir($param['path'],0777,true);
      // 移动文件
      if(move_uploaded_file($_FILES[$param['upName']]['tmp_name'],$param['path'].$param['filename'])){
        return ['filename'=>$param['filename']];
      }else{
        return '保存图片失败!';
      }
    }else{
      return '只支持'.implode(',',$param['type']).'格式!';
    }
  }

  /* Base64上传 */
  static function base64($param=[]){
    // 参数
    $param = array_merge([
      'path'=>'upload/',  //上传路径
      'base64'=>'',  //文件内容
      'filename'=>'', //文件名
      'ext'=>'png', //后缀
    ],$param);
    // 否有类型
    if(strstr($param['base64'],',')){
      $ct = explode(',',$param['base64']);
      if($ct[0]=='data:image/jpeg;base64') $param['ext']='jpg';
      elseif($ct[0]=='data:image/png;base64') $param['ext']='png';
      elseif($ct[0]=='data:image/gif;base64') $param['ext']='gif';
      $base64 = $ct[1];
    }
    // 创建目录
    if (!file_exists($param['path'])) mkdir($param['path'],0777,true);
    // 文件名
    $param['filename'] = empty($param['filename'])?self::_getName().'.'.$param['ext']:$param['filename'];
    // 保存文件
    if(file_put_contents($param['path'].$param['filename'],base64_decode($base64))){
      return ['filename'=>$param['filename']];
    }else{
      return false;
    }
  }

  /* 获取Html图片 */
  static function getHtmlImg($html){
    $pattern="/<img.*?src=[\'|\"](.*?)[\'|\"].*?[\/]?>/";
    preg_match_all($pattern,htmlspecialchars_decode($html),$match);
    $imgs = [];
    foreach($match[1] as $val){
      $imgs[] = basename($val);
    }
    return $imgs;
  }

  /* 清理图片 */
  static function clearImg($dir='',$imgs=[]){
    $all = scandir($dir);
    foreach($all as $val){
      if($val=='.' || $val=='..') continue;
      if(!in_array($val,$imgs)) unlink($dir.$val);
    }
  }

  /* 删除目录 */
  static function delDir($dir=''){
    array_map('unlink', glob($dir.'*'));
    rmdir($dir);
  }

  /* 获取名称 */
  static private function _getName(){
    list($msec, $sec) = explode(' ', microtime());
    return date('YmdHis').substr($msec,2,4);
  }

}