<?php

/**
* 公共类
*/

namespace app\library;

class Inc{

	/* URL */
	static function BaseUrl($url=''){
		$base_url = $_SERVER['SERVER_PORT']=='443'?'https://':'http://';
		$base_url .= $_SERVER['HTTP_HOST'].'/'.$url;
		return $base_url;
	}

	/* Key */
	static function getKey($str){
		return md5($str.'e33e907621123d2bf01b7f580f316ade');
	}
	static function getKeyArr($parameter=''){
		ksort($parameter);
		reset($parameter);
		$parameter['sign'] = 'e33e907621123d2bf01b7f580f316ade';
		return md5(http_build_query($parameter));
	}

	/* Post */
	static function curlPost($url='',$data=[],$type=''){
		$data = $type=='json'?json_encode($data,JSON_UNESCAPED_UNICODE):$data;
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		if($type=='json') curl_setopt($curl, CURLOPT_HTTPHEADER,['Content-Type: application/json; charset=utf-8']);
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
	static function keyHH($str='', $phrase, $tag_open = '<span style="color:#FF6600">', $tag_close = '</span>'){
		if ($str == ''){return FALSE;}
		if ($phrase != ''){return preg_replace('/('.preg_quote($phrase, '/').')/i', $tag_open."\\1".$tag_close, $str);}
		return $str;
	}

	/* 截取中文字符串 */
	static function sysSubStr($String,$Length,$Append = false){
		if(strlen($String) <= $Length ){
			return $String;
		}else{
			$I = 0;
			while ($I < $Length){
				$StringTMP = substr($String,$I,1);
				if( ord($StringTMP) >=224 ){
					$StringTMP = substr($String,$I,3);
					$I = $I + 3;
				}elseif( ord($StringTMP) >=192 ){
					$StringTMP = substr($String,$I,2);
					$I = $I + 2;
				}else{
					$I = $I + 1;
				}
				$StringLast[] = $StringTMP;
			}
			$StringLast = implode("",$StringLast);
			if($Append){$StringLast .= "...";}
			return $StringLast;
		}
	}

	/* 计算年龄 */
	static function getAge($birthday){
		$date = date("Y-m-d");
		list($y,$m,$d)=explode("-",$birthday);
		list($ty,$tm,$td)=explode("-", $date);
		$age=$ty-$y;
		if($tm>$m || $tm==$m&&$td>$d) $age+=1;
		return $age;
	}

	/* 时间统计 */
	static function getTime($time=0){
		$time = $time<0?-$time:$time;
		$d = 24*60*60;
		$h = 60*60;
		$m = 60;
		if($time>=$d){
			$data = round($time/$d,1).'天';
		}elseif($time>=$h){
			$data = round($time/$h,1).'小时';
		}elseif($time>=60){
			$data = round($time/$m,0).'分钟';
		}else{
			$data = $time.'秒';
		}
		return $data;
	}

}