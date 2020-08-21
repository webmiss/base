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
      'img'=>$data->img?$this->config->base_url.$data->img:'',
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
    $uinfo = $model->toArray();
    $uinfo['img'] = $uinfo['img']?$this->config->base_url.$uinfo['img']:'';
    return $model->save()==true?self::getJSON(['code'=>0,'uinfo'=>$uinfo]):self::error(4022);
  }

  /* 上传图片 */
  function upImageAction(){
    $base64 = $this->request->get('base64');
    if(empty($base64)) return self::getJSON(['code'=>4000]);
    // 上传
    $res = Upload::base64(['path'=>self::$imgDir,'base64'=>$base64]);
    // 模型
    if(is_array($res)){
      $model = UserInfo::findFirst(['uid='.self::$token->uid]);
      if(!$model){
        $model = new UserInfo();
        $model->uid = self::$token->uid;
      }
      $img = isset($model->img)?$model->img:'';
      // 头像
      $model->img = self::$imgDir.$res['filename'];
      // 保存
      if($model->save()==true){
        @unlink($img);
        return self::getJSON(['code'=>0,'img'=>$this->config->base_url.self::$imgDir.$res['filename']]);
      }else{
        return self::getJSON(['code'=>4030,'msg'=>'保存数据失败!']);
      }
    }else{
      return self::getJSON(['code'=>4030,'msg'=>$res]);
    }
  }

}