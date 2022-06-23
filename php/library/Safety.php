<?php
namespace Library;

use Config\Env;
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

/* 验证类 */
class Safety {

  /* 正则-公共 */
  static function IsRight(string $name='',string $val=''): bool {
    $data = [
      'uname'=>'/^[a-zA-Z][a-zA-Z0-9\_\@\-\*\&]{3,15}$/',
      'passwd'=>'/^[a-zA-Z0-9|_|@|-|*|&]{6,16}$/',
      'tel'=>'/^1\d{10}$/',
      'email'=>'/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/',
      'idcard'=>'/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/',
    ];
    return preg_match($data[$name],$val)?true:false;
  }

  /* 正则-验证 */
  static function Test(string $reg, $val): bool {
    return preg_match('/'.$reg.'/',$val)?true:false;
  }

  /* Base64-加密 */
  static function Encode(array $param=[]): ?string {
    try{
      return JWT::encode($param, Env::$key, 'HS256');
    }catch (\Exception $e){
      return null;
    }
  }

  /* Base64-解密 */
  static function Decode(string $token=''): ?object {
    try{
      return JWT::decode($token, new \Firebase\JWT\Key(Env::$key, 'HS256'));
    }catch (\Exception $e){
      return null;
    }
  }

}