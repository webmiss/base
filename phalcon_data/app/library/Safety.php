<?php

/**
* 安全验证类
*/

namespace app\library;

use Phalcon\Crypt;

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

	/* 加密 */
	static function encode($data=[],$key=''){
		$text = is_array($data)?json_encode($data):$data;
		$crypt = new Crypt();
		$token = $crypt->encryptBase64($text, $key);
		$token = str_replace('+','_',$token);
		return $token;
	}

	/* 解密 */
	static function decode($token='',$key=''){
		$token = str_replace('_','+',$token);
		$crypt = new Crypt();
		$data = json_decode($crypt->decryptBase64($token, $key));
		return $data;
	}

}