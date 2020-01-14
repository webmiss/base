<?php

namespace app\modules\admin\controller;

use app\library\Centre;

class UserInfoController extends UserBase {

  /* 列表 */
  function listAction(){
    $uinfo = Centre::uinfo(self::$token->uid);
		return self::getJSON(['code'=>0,'list'=>$uinfo]);
  }

  /* 编辑 */
  function editAction(){
    $data = $this->request->get('data');
    if(empty($data)) return self::getJSON(['code'=>4000]);
    $res = Centre::uinfoEdit(self::$token->uid,$data);
    return $res===true?self::getJSON(['code'=>0]):self::getJSON(['code'=>4011,'msg'=>$res]);
  }

  /* 上传图片 */
  function upImageAction(){
    $base64 = $this->request->get('base64');
    if(empty($base64)) return self::getJSON(['code'=>4000]);
    $res = Centre::uinfoImg(self::$token->uid,$base64);
    return $res?self::getJSON(['code'=>0,'img'=>$res]):self::getJSON(['code'=>4030]);
  }
}