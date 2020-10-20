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
    // 控制器权限
    self::$tokenData = AdminToken::urlVerify('UserInfo');
  }

  /* 头像上传 */
  function upImgAction(){
    $base64 = $this->request->get('base64');
    if(empty($base64)) return self::getJSON(['code'=>4000,'msg'=>'Base64内容为空!']);
    // 上传
    $res = Upload::base64(['path'=>self::$imgDir,'base64'=>$base64]);
    if($res){
      $model = UserInfo::findFirst(['uid='.self::$tokenData->uid]);
      if(!$model){
        $model = new UserInfo();
        $model->uid = self::$tokenData->uid;
      }
      // 头像
      $img = isset($model->img)?$model->img:'';
      $model->img = self::$imgDir.$res['filename'];
      // 保存
      if($model->save()){
        @unlink($img);
        return self::getJSON(['code'=>0,'msg'=>'成功','img'=>Env::$base_url.self::$imgDir.$res['filename']]);
      }else{
        return self::getJSON(['code'=>4000,'msg'=>'保存图片失败!']);
      }
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'保存图片失败!']);
    }
  }

}