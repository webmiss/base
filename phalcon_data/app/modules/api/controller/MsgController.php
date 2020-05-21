<?php

namespace app\modules\api\controller;

use app\model\Msg;
use app\model\MsgGroup;
use app\library\Socket;

class MsgController extends UserBase {

  /* 列表 */
  function listAction(){
    $uid = $this->request->get('uid','int');
    $page = $this->request->get('page','int')??1;
    $limit = $this->request->get('limit','int')??10;
    if(empty($uid) || empty($limit)) self::error(4000);
    $start = $page*$limit;
    $list = Msg::find(['uid='.$uid,'columns'=>'title,content,is_new,ctime','order'=>'ctime DESC','limit'=>['number'=>$limit,'offset'=>$start]]);
    return self::getJSON(['code'=>0,'list'=>$list]);
  }

  /* 发送消息 */
  function sendMsgAction(){
    self::getJSON();
    $token = $this->request->get('token');
    $uid = $this->request->get('uid','int');
    $title = $this->request->get('title','string');
    $content = $this->request->get('content');
    if(empty($title) || empty($content)) self::error(4000);
    // 在线提醒
    $fd = $this->redis->hGet('SocketUid',$uid);
    if(!empty($fd)) Socket::send($token,[
      'type'=>'system',
      'gid'=>1,
      'fd'=>$fd,
      'data'=>['type'=>0,'uid'=>$uid,'fid'=>1,'ctime'=>date('Y-m-d H:i:s'),'title'=>$title,'content'=>$content,'img'=>'']
    ]);
    // 保存信息
    $model = new Msg();
    $model->uid = $uid;
    $model->fid = 1;
    $model->gid = 1;
    $model->ctime = date('YmdHis');
    $model->title = $title;
    $model->content = trim($content);
    $model->save();
    return $model->save()===true?self::getJSON(['code'=>0,'info'=>['id'=>$model->id]]):self::error(4021);
  }

}