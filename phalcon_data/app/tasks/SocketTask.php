<?php

use \Swoole\WebSocket\Server as WebSocket;
use app\model\Msg;
use app\model\MsgGroup;

class SocketTask extends Base{

  static private $cid = '';
  static private $uid = '';

  /* 首页 */
  function mainAction(){

    /* Socket服务器 */
    $server = new WebSocket($this->config->socket_ip, $this->config->socket_port);

    /* 链接成功 */
    $server->on('open', function ($server, $request) {
      // 记录FD
      $token = isset($request->get['token'])?$request->get['token']:'';
      self::$uid = isset($request->get['uid'])?$request->get['uid']:'';
      // 验证Token
      if((strlen($token)>64 && $res=self::verToken($token))){
        self::$cid = $res->uid;
        // 记录FD
        $this->redis->hSet('SocketFd',$request->fd,self::$uid);
        $this->redis->hSet('SocketUid',self::$uid,$request->fd);
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
    if(!is_object($data)) return $server->push($frame->fd, json_encode(['code'=>400,'msg'=>'格式错误']));
    /* 消息组 */
    if($data->type=='group'){
      // 是否用户
      if(empty(self::$uid)) return false;
      // 信息群
      $gid = '';
      $group = MsgGroup::find(['user like "%\"'.self::$uid.'\"%"','columns'=>'id','order'=>'id DESC']);
      foreach($group as $val){
        $gid = $val->id.',';
      }
      $gid = rtrim($gid,',');
      if(!empty($gid)){
        // 消息
        $builder = $this->modelsManager->createBuilder();
        $builder->addfrom('app\model\Msg', 'a');
        $builder->leftJoin('app\model\MsgGroup', 'a.gid=b.id', 'b');
        $builder->leftJoin('app\model\UserInfo', 'a.fid=c.uid', 'c');
        $builder->where('a.gid in('.$gid.')');
        $builder->columns('
          a.gid as gid,b.name as name,a.type as type,a.uid as uid,a.fid as fid,a.is_new as is_new,a.ctime as ctime,a.title as title,a.content as content,c.img as img
        ');
        $builder->orderBy('a.id DESC');
        $builder->limit(0,30);
        $all = $builder->getQuery()->execute();
        // 结果
        foreach($all as $val){
          $msg[(string)$val->gid]['name'] = $val->name;
          $msg[(string)$val->gid]['num'] = 0;
          $msg[(string)$val->gid]['data'][] = [
            'type'=>$val->type,
            'uid'=>$val->uid,
            'fid'=>$val->fid,
            'is_new'=>$val->is_new,
            'ctime'=>$val->ctime,
            'title'=>$val->title,
            'content'=>$val->content,
            'img'=>$val->img?'https://data.ynjici.com/'.$val->img:'https://data.ynjici.com/upload/img.png',
          ];
        }
      }
      // 系统消息
      $sys = Msg::find(['gid=1 AND uid='.self::$uid,'columns'=>'gid,type,uid,fid,is_new,ctime,title,content','limit'=>10,'order'=>'id DESC']);
      $num = 0;
      foreach($sys as $val){
        if($val->is_new==0) $num++;
      }
      $msg['1']['name'] = '系统消息';
      $msg['1']['num'] = $num;
      $msg['1']['data'] = $sys?$sys->toArray():[];
      // 倒序
      foreach($msg as $key=>$val){
        $msg[$key]['data'] = array_reverse($val['data']);
      }
      // 结果
      $data->code = 0;
      $data->data = (Object)$msg;
      return $server->push($frame->fd, json_encode($data));
    }elseif($data->type=='msg'){
      if($data->gid==1){
        $data->code = 0;
        $data->data = ['type'=>0,'uid'=>self::$uid,'fid'=>1,'ctime'=>date('Y-m-d H:i:s'),'title'=>$data->data->content,'content'=>'你好！暂无功能','img'=>''];
        return $server->push($frame->fd, json_encode($data));
      }else{
        // 新消息
        $model = new Msg();
        $model->type = 0;
        $model->uid = 0;
        $model->fid = $data->data->fid;
        $model->gid = $data->gid;
        $model->title = '消息';
        $model->content = $data->data->content;
        $model->ctime = date('Y-m-d H:i:s');
        if($model->save()===true){
          // 推送用户
          $user = MsgGroup::findFirst(['id=:gid:','bind'=>['gid'=>$model->gid],'columns'=>'user']);
          $user = json_decode($user->user);
          $data->code = 0;
          $data->data = [
            'type'=>$model->type,
            'uid'=>$model->uid,
            'fid'=>$model->fid,
            'ctime'=>$model->ctime,
            'content'=>$model->content,
            'img'=>$data->data->img?$data->data->img:'https://data.ynjici.com/upload/img.png'
          ];
          foreach($user as $val){
            $fd = $this->redis->hGet('SocketUid',$val);
            if(!empty($fd)) $server->push($fd, json_encode($data));
          }
        }
      }
    }elseif($data->type=='system'){
      // 系统消息
      $data->code = 0;
      $data->type = 'msg';
      return $server->push($data->fd, json_encode($data));
    }

  }
}