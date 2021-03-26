<?php
namespace Library;

use Base\Base;

/* 上传类 */
class Upload extends Base {

  /* 单文件 */
  static function File(array $param=[]): string {
    // 参数
    $param = array_merge([
      'upName'=>'up',  //上传名称
      'path'=>'upload/',  //上传目录
      'filename'=>'', //文件名
      'bind'=>['jpg','jpeg','png','gif','mov','mp4','wav','mp3'], //允许格式
    ],$param);
    // 文件
    $file = $_FILES[$param['upName']];
    // 限制格式
    $ext = strtolower(substr(strrchr($file['name'],'.'),1));
    if($param['bind']){
      if(!in_array($ext,$param['bind'])){
        self::Print('只支持'.implode(',',$param['bind']).'格式!');
        return '';
      }
    }
    // 是否重命名
    $param['filename'] = empty($param['filename'])?$file['name']:$param['filename'].'.'.$ext;
    // 创建目录
    if (!file_exists($param['path'])) mkdir($param['path'],0777,true);
    // 移动文件
    if(@move_uploaded_file($file['tmp_name'],$param['path'].$param['filename'])){
      return $param['filename'];
    }else{
      return '';
    }
  }

  /* Base64 */
  static function Base64(array $param=[]): string {
    // 参数
    $param = array_merge([
      'path'=>'upload/',  //上传目录
      'base64'=>'',  //文件内容
      'filename'=>'', //文件名
      'ext'=>'png', //后缀
    ],$param);
    // 内容
    $base64 = $param['base64'];
    // 否有类型
    $ct = explode(',',$param['base64']);
    if(count($ct)>1){
      if($ct[0]=='data:image/jpeg;base64') $param['ext']='jpg';
      elseif($ct[0]=='data:image/png;base64') $param['ext']='png';
      elseif($ct[0]=='data:image/gif;base64') $param['ext']='gif';
      $base64 = $ct[1];
    }
    // 创建目录
    if (!file_exists($param['path'])) mkdir($param['path'],0777,true);
    // 文件名
    $filename = empty($param['filename'])?self::_getName().'.'.$param['ext']:$param['filename'];
    // 保存文件
    if(file_put_contents($param['path'].$filename,base64_decode($base64))){
      return $filename;
    }else{
      return '';
    }
  }

  // 获取名称
  private static function _getName(){
    list($msec, $sec) = explode(' ', microtime());
    return date('YmdHis').substr($msec,2,4);
  }

}