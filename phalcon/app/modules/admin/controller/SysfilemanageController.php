<?php

namespace app\modules\admin\controller;

use app\Env;
use app\common\Base;
use app\common\AdminToken;
use app\library\Files;
use app\library\Upload;
use app\library\Down;

/* 文件管理 */
class SysFileManageController extends Base{

  private static $dirRoot = 'upload/';

  /* 构造函数 */
  function initialize(){
    parent::initialize();
    // 控制器权限
    AdminToken::urlVerify('SysFileManage');
    // 文件根目录
    Files::$file_root = self::$dirRoot;
    if (!is_dir(self::$dirRoot)) mkdir(self::$dirRoot,0777,true);
  }

  /* 列表 */
  function listAction(){
    $path = $this->request->get('path','string');
    $list = Files::lists($path);
    return self::getJSON(['code'=>0,'url'=>Env::$base_url.self::$dirRoot,'data'=>$list]);
  }

  /* 新建文件夹 */
  function mkDirAction(){
    // 参数
    $path = trim($this->request->get('path','string'));
    $name = trim($this->request->get('name','string'));
    if(empty($path) || empty($name)) return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    // 结果
    if(Files::mkDir($path.$name)){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'新建文件夹失败!']);
    }
  }

  /* 重命名 */
  function reNameAction(){
    // 参数
    $path = trim($this->request->get('path','string'));
    $rename = trim($this->request->get('rename','string'));
    $name = trim($this->request->get('name','string'));
    if(empty($path) || empty($rename) || empty($name)) return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    // 结果
    if(Files::reName($path.$rename,$path.$name)){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>'重命名失败!']);
    }
  }

  /* 上传 */
  function upFileAction(){
    $path = $this->request->get('path','string');
    if(empty($path)) return self::getJSON(['code'=>4000,'msg'=>'参数错误!']);
    // 执行
    $res = Upload::file(['path'=>self::$dirRoot.$path,'bind'=>'']);
    if($res['state']){
      return self::getJSON(['code'=>0,'msg'=>'成功']);
    }else{
      return self::getJSON(['code'=>5000,'msg'=>$res['msg']]);
    }
  }

  /* 下载 */
  function downFileAction(){
    // 参数
    $path = $this->request->get('path','string');
    $filename = $this->request->get('filename','string');
    if(empty($path) || empty($filename)) return null;
    // 文件流
    return Down::fileBlob(self::$dirRoot.$path,$filename);
  }

  /* 删除 */
  function rmFileAction(){
    // 参数
    $path = trim($this->request->get('path','string'));
    $data = trim($this->request->get('data'),'string');
    $data = json_decode($data,true);
    if(empty($path) || empty($data)) return self::getJSON(['code'=>4000]);
    // 执行
    foreach($data as $val) Files::delAll($path.$val);
    return self::getJSON(['code'=>0,'msg'=>'成功']);
  }

}