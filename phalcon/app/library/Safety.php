<?php
namespace app\library;

use app\Env;
use Phalcon\Crypt;

/**
* 安全验证类
*/
class Safety{

  /* 正则 */
  static function isRight($name='',$val=''){
    $data = [
      'uname'=>['/^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{3,15}$/','用户名英文开头4~16位字符'],
      'passwd'=>['/^[a-zA-Z0-9|_|@|-|*|&]{6,16}$/','密码为6~16位字符'],
      'tel'=>['/^1\d{10}$/','手机号码有误'],
      'email'=>['/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/','邮箱有误'],
      'idcard'=>['/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/','身份证有误'],
    ];
    return preg_match($data[$name][0],$val)?true:$data[$name][1];
  }

  // /* Token-验证 */
  // static function verToken($token){
  //   // 解密
  //   $data = Safety::decode($token,$this->config->key);
  //   if(!$data) return '';
  //   // 续期
  //   $tmp_token = $this->redis->get($this->config->token_name.$data->uid);
  //   if(empty($token) || $token!=$tmp_token) return false;
  //   $this->redis->setex($this->config->token_name.$data->uid,$this->config->token_time,$token);
  //   // 结果
  //   return $data;
  // }

  // /* Token-加密 */
  // protected function setToken($uid,$data){
  //   $token = Safety::encode([
  //     'uid'=>$uid,
  //     'ltime'=>date('YmdHis'),
  //     'data'=>$data,
  //   ],$this->config->key);
  //   // 缓存
  //   $this->redis->setex($this->config->token_name.$uid,$this->config->token_time,$token);
  //   return $token;
  // }

  /* 加密 */
  static function encode($data=[]){
    $text = is_array($data)?json_encode($data):$data;
    try{
      $crypt = new Crypt();
      $token = $crypt->encryptBase64($text, Env::$key);
      $token = str_replace('+','_',$token);
      return $token;
    }catch (\Exception $e){
      return '';
    }
    
  }

  /* 解密 */
  static function decode($token=''){
    $token = str_replace('_','+',$token);
    try{
      $crypt = new Crypt();
      $data = json_decode($crypt->decryptBase64($token, Env::$key));
      return $data;
    }catch (\Exception $e){
      return '';
    }
  }

}