<?php

namespace app\modules\admin\controller;

use app\Env;
use app\common\Base;
use app\common\AdminToken;
use app\library\Upload;
use app\model\SysConfig;

/* 用户信息 */
class SysConfigController extends Base{

  private static $imgDir = 'upload/admin/img/';

  /* 构造函数 */
  function initialize(){
    parent::initialize();
    // 验证
    AdminToken::urlVerify('SysConfig');
  }

  /* 列表 */
  function listAction(){
    // 查询
    $config = SysConfig::find(['columns'=>'name,val'])->toArray();
    $list = [];
		foreach($config as $val){
      $list[$val['name']] = $val['val'];
      // 图片
      if($val['name']=='logo' || $val['name']=='login_bg'){
        $list[$val['name']] = $val['val']?Env::$base_url.$val['val']:'';
      }
		}
    return self::getJSON(['code'=>0,'msg'=>'成功','list'=>$list]);
  }

  /* 编辑 */
  function editAction(){
    // 参数
    $data = $this->request->get('data');
    if(empty($data)) return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    $data = json_decode($data);
    // 查询
    $model = SysConfig::find('name in ("title","http","copy")');
    // 保存
    foreach($model as $val){
      if($val->name=='title') $val->val = trim($data->title);
      else if($val->name=='http') $val->val = trim($data->http);
      else if($val->name=='copy') $val->val = trim($data->copy);
      $val->save();
    }
    // 结果
    return self::getJSON(['code'=>0,'msg'=>'成功']);
  }

  /* 头像上传 */
  function upImgAction(){
    $type = $this->request->get('type');
    $base64 = $this->request->get('base64');
    if(empty($type) || empty($base64)) return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    // 类型
    if($type=='logo') $name = 'logo';
    else if($type=='login_bg') $name = 'login_bg';
    else return self::getJSON(['code'=>4000,'msg'=>'类型错误!']);
    // 上传
    $res = Upload::base64(['path'=>self::$imgDir,'base64'=>$base64]);
    if($res){
      $model = SysConfig::findFirst('name="'.$name.'"');
      // 头像
      $img = isset($model->val)?$model->val:'';
      // 保存
      $model->val = self::$imgDir.$res['filename'];
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