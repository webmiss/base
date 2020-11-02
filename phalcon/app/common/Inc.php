<?php
namespace app\common;

use app\Env;

/* 公共类 */
class Inc{

	/* 获取URL */
	static function BaseUrl($url=''){
		$base_url = $_SERVER['SERVER_PORT']=='443'?'https://':'http://';
		$base_url .= $_SERVER['HTTP_HOST'].'/'.$url;
		return $base_url;
	}

	/* Post */
	static function curlPost($url='', $data=[], $type='', $header=[]){
		// 方式
		if($type=='json'){
			$header[] = 'Content-Type: application/json; charset=utf-8';
			$data = json_encode($data,JSON_UNESCAPED_UNICODE);
		}
		// Curl
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_HTTPHEADER,$header);
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
		$res = curl_exec($curl);
		curl_close($curl);
		return $type=='xml'?$res:json_decode($res);
	}

	/* 关键字高亮 */
	static function keyHH($str='', $phrase='', $tag_open='<span style="color:#FF6600">', $tag_close='</span>'){
		if ($str=='') return FALSE;
		if ($phrase!='') return preg_replace('/('.preg_quote($phrase, '/').')/i', $tag_open."\\1".$tag_close, $str);
		return $str;
	}

	/* 字符串截取 */
	static function subStr($str='', $len=0, $append='...'){
		if(strlen($str) <= $len ){
			return $str;
		}else{
			$I = 0;
			while ($I < $len){
				$strTmp = substr($str,$I,1);
				if( ord($strTmp) >=224 ){
					$strTmp = substr($str,$I,3);
					$I = $I + 3;
				}elseif( ord($strTmp) >=192 ){
					$strTmp = substr($str,$I,2);
					$I = $I + 2;
				}else{
					$I = $I + 1;
				}
				$strLast[] = $strTmp;
			}
			$strLast = implode('',$strLast);
			if($append) $strLast.=$append;
			return $strLast;
		}
	}

}