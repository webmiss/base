<?php

namespace app\modules\admin\controller;

use app\library\Centre;

class UserInfoController extends UserBase {

  /* 列表 */
  function listAction(){
    $res = Centre::uinfo(self::$token->uid);
    $data = $res->info;
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
    $res = Centre::uinfoEdit(self::$token->uid,$data);
    $uinfo = json_decode($data,true);
    return $res->code==0?self::getJSON(['code'=>0,'uinfo'=>$uinfo]):self::getJSON(['code'=>4011,'msg'=>$res->msg]);
  }

  /* 上传图片 */
  function upImageAction(){
    $base64 = $this->request->get('base64');
    if(empty($base64)) return self::getJSON(['code'=>4000]);
    $res = Centre::uinfoImg(self::$token->uid,$base64);
    return $res->code==0?self::getJSON(['code'=>0,'img'=>$res->img]):self::getJSON(['code'=>4030,'msg'=>$res->msg]);
  }
}