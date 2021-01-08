<?php
namespace app\library;

use app\Env;
use Phalcon\Crypt;

/**
* 安全验证类
*/
class Safety{

  /* 正则-公共 */
  static function isRight(string $name='',string $val=''): bool {
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
  static function test(string $reg, $val): bool {
    return preg_match('/'.$reg.'/',$val)?true:false;
  }

  /* 加密-字符串 */
	static function key(string $str): string {
		return md5($str.Env::$key);
	}
	/* 加密-数组 */
	static function keyArray(array $param=[]): string {
		ksort($param);
		reset($param);
		$param['sign'] = Env::$key;
		return md5(http_build_query($param));
	}

  /* 加密-Base64 */
  static function encode(array $param=[]): ?string {
    $text = is_array($param)?json_encode($param):$param;
    try{
      $crypt = new Crypt();
      $token = @$crypt->encryptBase64($text, Env::$key);
      $token = str_replace('+','_',$token);
      return $token;
    }catch (\Exception $e){
      return null;
    }
  }

  /* 解密-Base64 */
  static function decode($token=''): ?object {
    $token = str_replace('_','+',$token);
    try{
      $crypt = new Crypt();
      $data = json_decode(@$crypt->decryptBase64($token, Env::$key));
      return $data;
    }catch (\Exception $e){
      return null;
    }
  }

}