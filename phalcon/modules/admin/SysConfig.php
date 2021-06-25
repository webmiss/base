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
	static function List() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    // 查询
    $m = new SysConfigM();
    $m->Columns('name', 'val');
    $data = $m->Find();
    $list = [];
    foreach($data as $val) {
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
  static function Edit() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $data = self::JsonName($json, 'data');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($data)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    // 模型
    $m = new SysConfigM();
    $param = json_decode($data);
    foreach($param as $key=>$val) {
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
  static function Upimg() {
    // 参数
    $json = self::Json();
    $token = self::JsonName($json, 'token');
    $name = self::JsonName($json, 'name');
    $base64 = self::JsonName($json, 'base64');
    // 验证
    $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    if(empty($base64)) {
      return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    }
    if($name!='logo' && $name!='login_bg') {
      return self::GetJSON(['code'=>4000,'msg'=>'类型错误!']);
    }
    // 上传
    $img = Upload::Base64(['path'=>self::$ImgDir, 'base64'=>$base64]);
    if(empty($img)) {
      return self::GetJSON(['code'=>5000, 'msg'=>'上传失败!']);
    }
    // 模型
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