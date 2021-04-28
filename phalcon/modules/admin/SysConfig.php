<?php
namespace App\Admin;

use Service\Base;
use Service\Data;
use Service\AdminToken;
use Library\FileEo;
use Library\Upload;
use Model\SysConfig as SysConfigM;

class SysConfig extends Base {

  private static $ImgDir = 'upload/admin/img/';

  /* 列表 */
	static function List(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 查询
    $m = new SysConfigM();
    $m->Columns('name', 'val');
    $data = $m->Find();
    $list = [];
    foreach($data as $val){
      if($val['name']=='logo' || $val['name']=='login_bg'){
        $list[$val['name']] = Data::Img($val['val']);
      } else {
        $list[$val['name']] = $val['val'];
      }
    }
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功','list'=>$list]);
  }

  /* 编辑 */
  static function Edit(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $data = self::Post('data');
    if(empty($data)) return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    // 数据
    $m = new SysConfigM();
    $param = json_decode($data);
    foreach($param as $key=>$val){
      if($key=='logo' || $key=='login_bg') continue;
      $m->Set(['val'=> trim($val)]);
      $m->Where('name=?', $key);
      if(!$m->Update()){
        return self::GetJSON(['code'=>5000,'msg'=>'更新失败!']);
      }
    }
    return self::GetJSON(['code'=>0,'msg'=>'成功']);
  }

  /* 头像 */
  static function Upimg(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 参数
    $name = self::Post('name');
    $base64 = self::Post('base64');
    if(empty($base64)) return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    // 类型
    if($name!='logo' && $name!='login_bg'){
      return self::GetJSON(['code'=>4000,'msg'=>'类型错误!']);
    }
    // 上传
    $img = Upload::Base64(['path'=>self::$ImgDir, 'base64'=>$base64]);
    if(empty($img)) return self::GetJSON(['code'=>5000, 'msg'=>'上传失败!']);
    // 数据
    $m = new SysConfigM();
    $m->Columns('val');
    $m->Where('name=?', $name);
    $imgData = $m->FindFirst();
    $m->Set(['val'=> self::$ImgDir.$img]);
    $m->Where('name=?', $name);
    if(!$m->Update()) return self::GetJSON(['code'=>5000, 'msg'=>'上传失败!']);
    // 清理
    $rmImg = (string)$imgData['val'];
    FileEo::RemoveAll($rmImg);
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功', 'img'=>Data::Img(self::$ImgDir.$img)]);
  }

}