<?php

/**
* 上传类
*/

namespace app\library;

class Upload{

  // 上传处理
  static function file($path){
    $upName = 'up';
    $type = ['jpg','jpeg','png','gif','mov','mp4','wav','mp3'];
    $ext = substr(strrchr($_FILES[$upName]['name'],'.'),1);
    $file = date('YmdHis').rand(1000,9999).'.'.$ext;
    if(in_array($ext,$type)){
      // 创建目录
      if (!file_exists($path)) mkdir($path,0777,true);
      // 移动文件
      if(move_uploaded_file($_FILES[$upName]['tmp_name'],$path.$file)){
        return ['status'=>true,'msg'=>'上传成功','file'=>$file];
      }else{
        return ['status'=>false,'msg'=>'保存图片失败！'];
      }
    }else{
      return ['status'=>false,'msg'=>'只支持'.implode(',',$type).'格式！'];
    }
  }

  /* Base64上传 */
  static function base64($path,$base64,$prefix=''){
    $base64 = str_replace(' ','+',$base64);
    // 否有逗号
    if (strstr($base64,',')) $base64=explode(',',$base64)[1];
    // 创建目录
    if (!file_exists($path)) mkdir($path,0777,true);
    // 文件名
    $ext = 'png';
    $file = $prefix.date('YmdHis').rand(1000,9999).'.'.$ext;
    // 保存文件
    if(file_put_contents($path.$file,base64_decode($base64))){
      return ['status'=>true,'msg'=>'上传成功','file'=>$file];
    }else{
      return ['status'=>false,'msg'=>'保存图片失败！'];
    }
  }

  /* 获取Html图片 */
  static function getHtmlImg($content){
    $pattern="/<img.*?src=[\'|\"](.*?)[\'|\"].*?[\/]?>/";
    preg_match_all($pattern,htmlspecialchars_decode($content),$match);
    $imgs = [];
    foreach($match[1] as $val){
      $imgs[] = basename($val);
    }
    return $imgs;
  }

  /* 清理图片 */
  static function clearImg($dir,$imgs){
    $all = scandir($dir);
    foreach($all as $val){
      if($val=='.' || $val=='..') continue;
      if(!in_array($val,$imgs)) unlink($dir.$val);
    }
  }

  /* 删除目录 */
  static function delDir($dir){
    array_map('unlink', glob($dir.'*'));
    rmdir($dir);
  }

}