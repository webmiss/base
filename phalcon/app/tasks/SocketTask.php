<?php

use \Swoole\WebSocket\Server as WebSocket;
use \Swoole\Coroutine\Http\Client;

use app\model\UserMsg;

class SocketTask extends TaskBase{

  /* 属性 */
  static private $msg_limit = 100;  // 消息总条数
  static private $suid = '';        // 系统消息ID
  static private $uid = '';         // 用户ID
  static private $name_fd = '';     // 缓存:SocketFD
  static private $name_uid = '';    // 缓存:用户ID

  /* 构造函数 */
  function initialize(){
    self::$suid = $this->config->socket_suid;
    self::$name_fd = $this->config->socket_name.'Fd';
    self::$name_uid = $this->config->socket_name.'Uid';
  }

  /* 客户端 */
  function sendAction($data=[]){
    $data = ['type'=>'msg','data'=>[
      'uid'=>'202005131808010001',
      'fid'=>'1',
      'title'=>'测试',
      'content'=>'内容',
    ]];
    // 是否数组
    if(!is_array($data)) exit('必须数组!');
    // 系统Token
    $token = $this->config->key;
    // 链接
    $client = new Client('127.0.0.1',$this->config->socket_port);
    // 协程
    go(function () use ($client,$token,$data) {
      $res = $client->upgrade('/?token='.$token);
      print_r($res);
      if($res) return $client->push(json_encode($data));
    });
  }

  /* 启动 */
  function startAction(){

    /* Socket服务器 */
    $server = new WebSocket($this->config->socket_ip, $this->config->socket_port);
    // 清理缓存
    if(self::redis()->get(self::$name_fd)) self::redis()->delete(self::$name_fd);
    if(self::redis()->get(self::$name_uid)) self::redis()->delete(self::$name_uid);

    /* 链接成功 */
    $server->on('open',function($server,$request){
      // 验证Token
      if(!isset($request->get['token'])) return false;
      $token = $request->get['token'];
      $res = self::verToken($token);
      if(isset($res->uid) || $token==$this->config->key){
        // 用户ID
        echo self::$uid = isset($res->uid)?$res->uid:self::$suid;
        echo "\n";
        // 记录FD
        self::redis()->hSet(self::$name_fd,$request->fd,self::$uid);
        self::redis()->hSet(self::$name_uid,self::$uid,$request->fd);
      }else{
        $server->disconnect($request->fd);
      }
    });
    /* 退出 */
    $server->on('close',function ($ser,$fd){
      $uid = self::redis()->hGet(self::$name_fd,$fd);
      if($uid){
        self::redis()->hDel(self::$name_fd,$fd);
        if(self::redis()->hGet(self::$name_uid,$uid)){
          self::redis()->hDel(self::$name_uid,$uid);
        }
      }
    });
    /* 监听消息 */
    $server->on('message',function($server,$frame) {
      self::getRouter($server, $frame);
    });
    /* 启动 */
    $server->start();
  }

  /* 消息路由 */
  private function getRouter($server,$frame){
    // 链接数据库
    // $db = self::redis()->get($this->config->socket_name.'DB');
    // if(!$db){
    //   $db = $this->db->connect()===true?'1':'';
    //   self::redis()->setex($this->config->socket_name.'DB',10*60,$db);
    //   echo "Redis\n";
    // }
    // var_dump($db);
    // 参数
    $data = json_decode($frame->data);
    // 格式错误
    if(!is_object($data)) return $server->push($frame->fd, json_encode(['code'=>400,'msg'=>'格式错误']));

    /* 消息组 */
    if($data->type=='group'){
      // 是否用户
      if(empty(self::$uid)) return false;
      // 100条分组
      echo 'is_del NOT LIKE "%\"'.self::$uid.'\"%" AND (fid='.self::$uid.' OR uid='.self::$uid.')';
      echo "\n";
      $all = self::db()->fetchAll(
        'SELECT * FROM user_msg WHERE is_del NOT LIKE "%\"'.self::$uid.'\"%" AND (fid='.self::$uid.' OR uid='.self::$uid.') LIMIT 0,'.self::$msg_limit
      );
      echo '条数: '.count($all);
      echo "\n";
      // $all = UserMsg::find([
      //   'is_del NOT LIKE "%\"'.self::$uid.'\"%" AND (fid='.self::$uid.' OR uid='.self::$uid.')',
      //   'order'=>'ctime DESC',
      //   'limit'=>self::$msg_limit
      // ]);
      // $all = $all?$all->toArray():[];
      // 分组
      $tmpData = [];
      $num = [];
      foreach($all as $val){
        // 是否用户
        $gid = $val['uid']!=self::$uid?'uid':'fid';
        // 是否已读
        $is_new = json_decode($val['is_new'],1);
        $is_new = in_array((string)self::$uid,$is_new)?'1':'0';
        // 组信息
        $tmpData[(string)$val[$gid]]['fid'] = $val[$gid];
        $tmpData[(string)$val[$gid]]['num'] = 0;
        $tmpData[(string)$val[$gid]]['msg'][] = [
          'id'=>$val['id'],
          'type'=>$val['type'],
          'fid'=>$val['fid'],
          'ctime'=>$val['ctime'],
          'title'=>$val['title'],
          'content'=>$val['content'],
          'img'=>self::getImg($val['fid']),
          'is_new'=>$is_new,
        ];
        // 记录未读
        if($is_new=='0'){
          if(isset($num[(string)$val[$gid]])) $num[(string)$val[$gid]]++;
          else $num[(string)$val[$gid]] = 1;
        }
      }
      // 未读数量
      foreach($num as $key=>$val){
        $tmpData[(string)$key]['num'] = $val;
      }
      // 倒序
      foreach($tmpData as $key=>$val){
        $tmpData[$key]['name'] = self::getName($key);
        $tmpData[$key]['img'] = self::getImg($key);
        $tmpData[$key]['msg'] = array_reverse($val['msg']);
      }
      // 结果
      $msg = (Object)[];
      $msg->code = 0;
      $msg->type = 'group';
      $msg->data = (Object)$tmpData;
      return $server->push($frame->fd, json_encode($msg));
    }

    /* 消息 */
    elseif($data->type=='msg'){
      // 消息-保存
      $msg = (Object)[];
      $msg->id = self::getId();
      $msg->type = '0';
      $msg->uid = $data->data->uid;
      $msg->fid = $data->data->fid;
      $msg->title = $data->data->title;
      $msg->content = $data->data->content;
      $msg->ctime = date('Y-m-d H:i:s');
      // 列队
      echo 'Redis: '.$this->config->socket_name.'MsgList';
      echo "\n";
      self::redis()->rPush($this->config->socket_name.'MsgList',json_encode($msg));
      // 消息-结果
      $res = (Object)[];
      $res->code = 0;
      $res->type = 'msg';
      $res->time = $msg->id;
      $res->data = $msg;
      // 推送消息
      $fd = self::redis()->hGet(self::$name_uid,$msg->uid);
      echo 'U-FD: '.$fd;
      echo "\n";
      if($server->isEstablished($fd)) $server->push($fd, json_encode($res));
      $fd = self::redis()->hGet(self::$name_uid,$msg->fid);
      echo 'F-FD: '.$fd;
      echo "\n";
      if($server->isEstablished($fd)) $server->push($fd, json_encode($res));
      // 保存
      sleep(1);
      self::saveMsg();
    }

  }

  /* 保存消息 */
  private function saveMsg(){
    while($data=self::redis()->blPop($this->config->socket_name.'MsgList',3)){
      $data = json_decode($data[1],true);
      // $model = new UserMsg();
      // foreach($data as $key=>$val) $model->$key=$val;
      // $model->save();
      echo $sql = self::getSql(['type'=>'add','table'=>'user_msg','data'=>$data]);
      echo "\n";
      $res = self::db()->execute($sql);
      var_dump($res);
    }
  }

  /* 用户头像 */
  private function getImg($uid){
    $img = self::redis()->get('userImg'.$uid);
		if(!$img){
      // $data = UserInfo::findFirst(['uid='.$uid,'columns'=>'img']);
      // $img = $data&&$data->img?$this->config->baseUrl.$data->img:'';
			// self::redis()->setex('userImg'.$uid,10*60,$img);
    }
    return $img;
  }
  /* 用户昵称 */
  private function getName($uid){
    $name = self::redis()->get('userName'.$uid);
		if(!$name){
      // $data = UserInfo::findFirst(['uid='.$uid,'columns'=>'nickname']);
      // $name = $data&&$data->nickname?$data->nickname:'用户昵称';
			// self::redis()->setex('userName'.$uid,10*60,$name);
    }
    return $name;
  }

}