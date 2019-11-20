<?php

namespace app\modules\admin\controller;

use app\library\Upload;
use app\model\UserInfo;

class UserInfoController extends UserBase {

  static private $imgDir = 'upload/user/img/';

  /* 列表 */
  function listAction(){
    $data = UserInfo::findFirst(['uid='.self::$token->uid]);
    $list = [
      'position'=>$data->position?$data->position:'',
      'nickname'=>$data->nickname?$data->nickname:'',
      'name'=>$data->name?$data->name:'',
      'gender'=>$data->gender?$data->gender:'',
      'birthday'=>$data->birthday?$data->birthday:'',
      'img'=>$data->img?$data->img:'',
    ];
		return self::getJSON(['code'=>0,'list'=>$list]);
  }

  /* 编辑 */
  function editAction(){
    $data = $this->request->get('data');
    if(empty($data)) return self::getJSON(['code'=>4000]);
    // 模型
    $data = json_decode($data);
    $model = UserInfo::findFirst(['uid='.self::$token->uid]);
    if(!$model){
      $model = new UserInfo();
      $model->uid = self::$token->uid;
    }
    foreach($data as $key=>$val){
      if($key=='img') continue;
      $model->$key = trim($val);
    }
    return $model->save()==true?self::getJSON(['code'=>0]):self::error(4022);
  }

  /* 上传图片 */
  function upImageAction(){
    $base64 = $this->request->get('base64');
    if(empty($base64)) return self::getJSON(['code'=>4000]);
    // 上传
    $up = Upload::base64(self::$imgDir,$base64);
    // 模型
    if ($up['status']){
      $model = UserInfo::findFirst(['uid='.self::$token->uid]);
      if(!$model){
        $model = new UserInfo();
        $model->uid = self::$token->uid;
      }
      $img = isset($model->img)?$model->img:'';
      // 头像
      $model->img = self::$imgDir.$up['file'];
      // 保存
      if($model->save()==true){
        @unlink($img);
        return self::getJSON(['code'=>0,'img'=>self::$imgDir.$up['file']]);
      }else{
        return self::getJSON(['code'=>4030]);
      }
    }else{
      return self::getJSON(['code'=>4030]);
    }
  }

}