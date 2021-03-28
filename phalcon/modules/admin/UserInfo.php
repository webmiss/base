<?php
namespace App\Admin;

use Base\Base;
use Base\Data;
use Library\FileEo;
use Library\Upload;
use Service\AdminToken;
use Model\UserInfo as UserInfoM;

class UserInfo extends Base {

  private static $ImgDir = 'upload/user/img/';

  /* 列表 */
	static function List(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    $tData = AdminToken::token($token);
    // 查询
    $model = new UserInfoM();
    $model->Columns('nickname', 'name', 'gender', 'birthday', 'position', 'img');
    $model->Where('uid=?', $tData->uid);
    $list = $model->FindFirst();
    // 数据
    $list['img'] = Data::Img($list['img']);
    $list['birthday'] = date('Y-m-d', $list['birthday']);
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功','list'=>$list]);
  }

  /* 编辑 */
  static function Edit(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    $tData = AdminToken::token($token);
    // 参数
    $data = self::Post('data');
    if(empty($data)) return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    $param = json_decode($data);
    // 数据
    $model = new UserInfoM();
    $info = [
      'nickname'=> trim($param->nickname),
      'name'=> trim($param->name),
      'gender'=> trim($param->gender),
      'birthday'=> strtotime(trim($param->birthday)),
      'position'=> trim($param->position),
    ];
    $model->Set($info);
    $model->Where('uid=?', $tData->uid);
    $model->Update();
    // 返回
    $info['uname'] = $tData->uname;
    $info['img'] = $param->img;
    $info['birthday'] = date('Y-m-d', $info['birthday']);
    return self::GetJSON(['code'=>0,'msg'=>'成功','uinfo'=>$info]);
  }

  /* 头像 */
  static function Upimg(){
    // 验证
    $token = self::Post('token');
    $msg = AdminToken::verify($token, $_SERVER['REQUEST_URI']);
    if($msg != '') return self::GetJSON(['code'=>4001, 'msg'=>$msg]);
    $tData = AdminToken::token($token);
    // 参数
    $base64 = self::Post('base64');
    if(empty($base64)) return self::GetJSON(['code'=>4000, 'msg'=>'参数错误!']);
    // 上传
    $img = Upload::Base64(['path'=>self::$ImgDir, 'base64'=>$base64]);
    if(empty($img)) return self::GetJSON(['code'=>5000, 'msg'=>'上传失败!']);
    // 数据
    $model = new UserInfoM();
    $model->Columns('img');
    $model->Where('uid=?', $tData->uid);
    $imgData = $model->FindFirst();
    $model->Set(['img'=>self::$ImgDir.$img]);
    $model->Where('uid=?', $tData->uid);
    $model->Update();
    // 清理
    $rmImg = (string)$imgData['img'];
    FileEo::RemoveAll($rmImg);
    // 返回
    return self::GetJSON(['code'=>0,'msg'=>'成功', 'img'=>Data::Img(self::$ImgDir.$img)]);
  }

}