<?php

namespace app\library;

use Phalcon\Session\Adapter\Files as SessionAdapter;


/**
* 图像处理类
*/

class Images{

	/*
	* 验证码类
	* @param1 int width  - 宽度
	* @param2 int height - 高度
	* @param3 string fonts  - 字体路径
	*/
	static function getCode($width=80, $height=28, $fonts='upload/fonts/ariblk.ttf'){
		// 清空当前缓冲区的数据
		ob_clean();
		// 创建图片
		$image  = imagecreatetruecolor($width, $height);
		// 设置背景
		$bgcolor=imagecolorallocate($image, 200, 200, 200);
		// 填充背景颜色到图片
		imagefilledrectangle($image, 0, 0, $width, $height, $bgcolor);

		/* 创建干扰点 */
		for ($i=0; $i<300; $i++){
			$diancolor =imagecolorallocate($image, rand(100,200), rand(60,120),rand(122,255));
			imagesetpixel($image, rand(0,$width),rand(0,$height),$diancolor);
		}

		/* 随机字符 */
		$tri   = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
		$code = '';
		for($i=0; $i < 4; $i++){
			// 获取字符
			$fontContent = substr($tri,rand(0,strlen($tri)-1),1);
			$code .= $fontContent;
			// 随机设置字体的颜色
			$fontcolor=imagecolorallocate($image, rand(0,114), rand(0,114), rand(0,114));
		 	// 设置字体坐标
			$x = rand(5,15)+($width*$i/5);
			$y = rand(15,20)+($height/4);
			// 填充图片
			imagefttext($image, 16, rand(10,30), $x, $y, $fontcolor, $fonts, $fontContent);
		}
		// 保存Session
		$session = new SessionAdapter();
		$session->start();
    $session->set('V_CODE',strtolower($code));
    // 保存Redis
    $redis = new \Redis();
    $redis->connect('127.0.0.1',6379);
    $redis->setex('V_CODE_'.strtolower($code),30*60,strtolower($code));

		/* 输出到浏览器 */
		header('content-type: image/png'); 	// 声明验证码的类型
		imagepng($image);					// 生成一个png格式的图片
		imagedestroy($image);				// 销毁原图
	}


	/*
	* 缩略图类
	* @param1 string src  - 原图路径
	* @param3 int width  - 字体路径
	* @param2 int height - 高度
	*/
	static function getThumb($src,$width=120,$height=75){
		// 图片是否存在
		if(!is_file($src)){die('原图不存在: '.$src);}

		// 获取能够使用的后缀
		$ext = self::getFunctionName($src);
		// 拼凑函数名
		$open = 'imagecreatefrom'.$ext;
		// 打开原图资源
		$src_img = $open($src);

		// 缩略图
		$dst_img = imagecreatetruecolor($width,$height);
		// 背景色填充白色
		$dst_bg_color = imagecolorallocate($dst_img,255,255,255);
		imagefill($dst_img,0,0,$dst_bg_color);
		// 宽高比确定宽高
		$dst_size = $width/$height;

		// 获取原图数据
		$file_info = getimagesize($src);
		$src_size = $file_info[0]/$file_info[1];

		// 获取高宽
		if($src_size > $dst_size){
			$w = $width;
			$h = round($w/$src_size);
		}else{
			$h = $height;
			$w = round($h*$src_size);
		}
		//求出缩略图起始位置
		$dst_x = round($width-$w)/2;
		$dst_y = round($height-$h)/2;

		// 制作缩略图
		if(imagecopyresampled($dst_img,$src_img,$dst_x,$dst_y,0,0,$w,$h,$file_info[0],$file_info[1])){
			// 文件名
			$path = dirname($src);
			$thumb_name = 'thumb_'.basename($src);
			// 保存图片
			$save = 'image'.$ext;
			$save($dst_img,$path.'/'.$thumb_name);

			return $thumb_name;
		}else{
			die('缩略图采样失败！');
		}
	}

	/*
	* 图片水印类
	* @param1 string src  - 原图路径
	* @param2 string path - 保存路径
	* @param3 int width  - 字体路径
	* @param2 int height - 高度
	*/
	static function getWater($src,$water='upload/water.png',$position='center',$opacity=70){
		// 图片是否存在
		if(!is_file($src)){die('原图不存在: '.$src);}
		// 图片是否存在
		if(!is_file($water)){die('水印不存在: '.$water);}

		// 获取能够使用的后缀
		$s_ext = self::getFunctionName($src);
		$w_ext = self::getFunctionName($water);
		// 拼凑函数名
		$s_open = 'imagecreatefrom'.$s_ext;
		$w_open = 'imagecreatefrom'.$w_ext;

		// 打开原图资源
		$s_img = $s_open($src);
		$w_img = $w_open($water);
		
		// 图片宽、高
		list($src_w, $src_h) = getimagesize($src);
		list($water_w, $water_h) = getimagesize($water);

		// x、y坐标
		if($position=='ltop'){
			$x=10;
			$y=10;
		}elseif($position=='ctop'){
			$x=($src_w-$water_w)/2;
			$y=10;
		}elseif($position=='rtop'){
			$x=$src_w-$water_w-10;
			$y=10;
		}elseif($position=='rbottom'){
			$x=$src_w-$water_w-10;
			$y=$src_h-$water_h-10;
		}elseif($position=='cbottom'){
			$x=($src_w-$water_w)/2;
			$y=$src_h-$water_h-10;
		}elseif($position=='lbottom'){
			$x=10;
			$y=$src_h-$water_h-10;
		}elseif($position=='center'){
			$x=($src_w-$water_w)/2;
			$y=($src_h-$water_h)/2;
		}

		// 制作水印图
		if(imagecopymerge($s_img, $w_img, $x, $y, 0, 0, $water_w, $water_h, $opacity)){
			// 路径、文件名
			$path = dirname($src);
			$water_name = 'water_'.basename($src);
			// 保存图片
			$save = 'image'.$s_ext;
			$save($s_img,$path.'/'.$water_name);

			return $water_name;
		}else{
			die('水印图采样失败！');
		}
	}

	// 获取文件后缀名
	private static function getFunctionName($file){
		// 常用后缀
		$func = array(
			'gif' => 'gif',
			'png' => 'png',
			'jpg' => 'jpeg',
			'jpeg' => 'jpeg',
			'pjpeg' => 'jpeg'
		);
		//文件后缀
		$file_info = pathinfo($file);
		$ext = $file_info['extension'];
		//返回值
		return $func[$ext];
	}

}
