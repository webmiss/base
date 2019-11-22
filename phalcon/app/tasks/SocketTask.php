<?php

use \Swoole\WebSocket\Server as WebSocket;
use app\model\Msg;

class SocketTask extends Base{

  /* 首页 */
  function mainAction(){

    /* Socket服务器 */
    $server = new WebSocket($this->config->socket_ip, $this->config->socket_port);

    /* 链接成功 */
    $server->on('open', function ($server, $request) {
      // 记录FD
      $token = isset($request->get['token'])?$request->get['token']:'';
      if((strlen($token)>64 && $res=self::verToken($token))){
        $this->redis->hSet('SocketFd',$request->fd,$res->uid);
        $this->redis->hSet('SocketUid',$res->uid,$request->fd);
      }elseif($token==$this->config->key){
        $this->redis->hSet('SocketFd',$request->fd,'system');
        $this->redis->hSet('SocketUid','system',$request->fd);
      }else{
        $server->disconnect($request->fd);
      }
    });
    
    /* 监听消息 */
    $server->on('message', function ($server, $frame) {
      self::getRouter($server, $frame);
    });

    /* 退出 */
    $server->on('close', function ($ser, $fd) {
      $uid = $this->redis->hGet('SocketFd',$fd);
      if($uid){
        $this->redis->hDel('SocketFd',$fd);
        $this->redis->hDel('SocketUid',$uid);
      }
    });

    /* 启动 */
    $server->start();
  }

  /* 消息路由 */
  private function getRouter($server, $frame){
    $data = json_decode($frame->data);
    // 格式错误
    if(!is_object($data)){
      $server->push($frame->fd, json_encode(['code'=>400,'msg'=>'格式错误']));
      return false;
    }
    /* 系统消息 */
    $uid = $this->redis->hGet('SocketFd',$frame->fd);
    if($data->type=='system' && $uid=='system'){
      if(isset($data->fd)){
        // 单发
        $data->code = 0;
        $fd = $data->fd;
        unset($data->fd);
        $server->push($fd, json_encode($data));
      }else{
        // 群发
        $data->code = 0;
        foreach($server->connections as $fd){
          $server->push($fd, json_encode($data));
        }
      }
    /* 用户-最新消息数、1条消息 */
    }elseif($data->type=='newMsg'){
      $res = [];
      $res['code'] = 0;
      $res['type'] = $data->type;
      $res['num'] = Msg::find(['is_new="0" AND uid='.$uid])->count();
      $server->push($frame->fd, json_encode($res));
    }elseif($data->type=='getMsg'){
      $time = date('Y-m-d H:i:s', strtotime('-10 minute'));
      $model = Msg::findFirst([
        'is_new="0" AND uid='.$uid.' AND ctime > "'.$time.'"',
        'columns'=>'id,title,content,ctime',
        'order'=>'ctime DESC'
      ]);
      $res = $model?$model->toArray():[];
      $res['code'] = 0;
      $res['type'] = $data->type;
      $server->push($frame->fd, json_encode($res));
    }
  }

}