<?php

namespace app\modules\admin\controller;

use app\Env;
use app\common\Base;
use app\common\AdminToken;
use app\library\Upload;
use app\model\UserInfo;

/* 用户信息 */
class UserInfoController extends Base{

  private static $tokenData;
  private static $imgDir = 'upload/user/img/';

  /* 构造函数 */
  function initialize(){
    parent::initialize();
    // 控制器权限
    self::$tokenData = AdminToken::urlVerify('UserInfo');
  }

  /* 列表 */
  function listAction(){
    $model = UserInfo::findFirst(['uid='.self::$tokenData->uid]);
    // 添加
    if(!$model){
      $model = new UserInfo();
      $model->uid = self::$tokenData->uid;
      $model->ctime = date('YmdHis');
      $model->save();
    }
    // 数据
    $list = [
      'img'=>!empty($model->img)?Env::$base_url.$model->img:'',
      'nickname'=>$model->nickname,
      'name'=>$model->name,
      'gender'=>$model->gender,
      'birthday'=>$model->birthday,
      'position'=>$model->position,
    ];
    return self::getJSON(['code'=>0,'msg'=>'成功','list'=>$list]);
  }

  /* 编辑 */
  function editAction(){
    $data = $this->request->get('data');
    if(empty($data)) return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    $data = json_decode($data);
    // 数据
    $model = UserInfo::findFirst(['uid='.self::$tokenData->uid]);
    $model->nickname = trim($data->nickname);
    $model->name = trim($data->name);
    $model->gender = trim($data->gender);
    $model->birthday = trim($data->birthday);
    $model->position = trim($data->position);
    // 用户信息
    $uinfo = [
      'img'=>trim($data->img),
      'nickname'=>trim($data->nickname),
      'name'=>trim($data->name),
      'gender'=>trim($data->gender),
      'birthday'=>trim($data->birthday),
      'position'=>trim($data->position),
    ];
    // 保存
    if($model->save()){
      return self::getJSON(['code'=>0,'msg'=>'成功','uinfo'=>$uinfo]);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'保存失败!']);
    }
  }

  /* 头像上传 */
  function upImgAction(){
    $base64 = $this->request->get('base64');
    if(empty($base64)) return self::getJSON(['code'=>4000,'msg'=>'Base64内容为空!']);
    // 上传
    $res = Upload::base64(['path'=>self::$imgDir,'base64'=>$base64]);
    if($res){
      $model = UserInfo::findFirst(['uid='.self::$tokenData->uid]);
      // 头像
      $img = isset($model->img)?$model->img:'';
      // 保存
      $model->img = self::$imgDir.$res['filename'];
      if($model->save()){
        // 清理头像
        if(is_file($img)) unlink($img);
        return self::getJSON(['code'=>0,'msg'=>'上传成功','img'=>Env::$base_url.self::$imgDir.$res['filename']]);
      }else{
        return self::getJSON(['code'=>5000,'msg'=>'保存数据失败!']);
      }
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'保存图片失败!']);
    }
  }

}