<?php

namespace app\library;

use app\library\Inc;

/* 钉钉 */
class DingTalk{

  // 参数
  static private $url = 'https://oapi.dingtalk.com/';

  /* 出勤 */
  static function attendance($type='',$data=''){
    if($type=='list'){
      $res = Inc::curlPost(self::$url.'attendance/list?access_token='.self::getToken(),$data,'json');
    }
    return $res;
  }

  /* 打卡结果 */
  static function getCheck($from,$to,$id){
    $limit = 25;
    $num = ceil(count($id)/$limit);
    $all = [];
    for($i=0;$i<$num;$i++){
      $res = self::attendance('list',['workDateFrom'=>$from,'workDateTo'=>$to,'userIdList'=>$id,'offset'=>$i,'limit'=>$limit*2]);
      $all = $res->errcode==0?array_merge($all,$res->recordresult):$all;
    }
    $data = [];
    foreach($all as $val){
      if(in_array($val->userId,$id)){
        $data[$val->userId][$val->checkType] = [
          'userId'=>$val->userId,
          'sourceType'=>$val->sourceType,
          'locationResult'=>$val->locationResult,
          'timeResult'=>$val->timeResult,
          'time'=>$val->userCheckTime/1000-$val->baseCheckTime/1000,
          'baseCheckTime'=>date('Y-m-d H:i:s',$val->baseCheckTime/1000),
          'userCheckTime'=>date('Y-m-d H:i:s',$val->userCheckTime/1000),
          'workDate'=>date('Y-m-d',$val->workDate/1000),
        ];
      }
    };
    return $data;
  }

  /* 员工管理 */
  static function user($type='',$data=''){
    if($type=='add'){
      $res = Inc::curlPost(self::$url.'user/create?access_token='.self::getToken(),$data,'json');
    }elseif($type=='update'){
      $res = Inc::curlPost(self::$url.'user/update?access_token='.self::getToken(),$data,'json');
    }elseif($type=='delete'){
      $res = file_get_contents(self::$url.'user/delete?access_token='.self::getToken().'&userid='.$data);
      $res = json_decode($res);
    }
    return $res;
  }

  /* 部门管理 */
	static function department($type='',$data=''){
    if($type=='list'){
      $res = file_get_contents(self::$url.'department/list?access_token='.self::getToken().'&id='.$data);
      $res = json_decode($res);
    }elseif($type=='add'){
      $res = Inc::curlPost(self::$url.'department/create?access_token='.self::getToken(),$data,'json');
    }elseif($type=='update'){
      $res = Inc::curlPost(self::$url.'department/update?access_token='.self::getToken(),$data,'json');
    }elseif($type=='delete'){
      $res = file_get_contents(self::$url.'department/delete?access_token='.self::getToken().'&id='.$data);
      $res = json_decode($res);
    }
    return $res;
  }
  
  /* 考勤组 */
  static function groups($type='',$data){
    if($type=='list'){
      $res = Inc::curlPost(self::$url.'topapi/attendance/group/minimalism/list?access_token='.self::getToken(),['op_user_id'=>$data]);
    }elseif($type=='update'){
      $res = Inc::curlPost(self::$url.'topapi/attendance/group/member/update?access_token='.self::getToken(),$data,'json');
    }
    return $res;
  }

  /* 获取Token */
  static function getToken(){
    $config = require APP_PATH.'/config/env.php';
    $res = file_get_contents(self::$url.'gettoken?appkey='.$config['ding_appKey'].'&appsecret='.$config['ding_appSecret']);
    $data = json_decode($res);
    return isset($data->access_token)?$data->access_token:'';
  }
  
}