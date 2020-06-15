<?php

/**
* 文件类
*/

namespace app\library;

class File{

	static public $file_root = '.';
	static private $zipObj = null;
	
	/* Lists */
	static function lists($path='/') {
		// 路径处理
		$path = $path?$path:'/';
		$path = preg_replace('/\.\.\/|\.\/|\.\./','',$path);
		$path = $path=='/'?$path:'/'.trim($path, '/').'/';
		// 参数
		$data['path'] = $path;
		$data['dirNum'] = 0;
		$data['fileNum'] = 0;
		$data['size'] = 0;
		$data['folder'] = [];
		$data['files'] = [];
		// 是否根目录
		$root = self::$file_root.$path;
		if(!is_dir($root)) return false;
		// 遍历
		$d = opendir($root);
		while($f = readdir($d)) {
			if($f == "." || $f == ".."){continue;}
			$ff = $root . '/' . $f;
			$ext = strtolower(substr(strrchr($f, '.'), 1));
			$ctime = self::getctime($ff);
			$mtime = self::getmtime($ff);
			$perm = self::perm($ff);
			if(is_dir($ff)){
				$size = self::dirsize($ff);
				$data['folder'][] = ['name'=>$f, 'ctime'=>$ctime, 'mtime'=>$mtime, 'size'=>self::formatBytes($size), 'perm'=>$perm, 'check'=>false];
				$data['size'] += $size;
				$data['dirNum']++;
			}else {
				$size = self::size($ff);
				$class = self::ico_class($ext);
				$data['files'][] = ['name'=>$f, 'ctime'=>$ctime, 'mtime'=>$mtime, 'size'=>self::formatBytes($size), 'perm'=>$perm, 'ext'=>$ext, 'class'=>$class, 'check'=>false];
				$data['size'] += $size;
				$data['fileNum']++;
			}
		}
		// 单位、排序
		$data['size'] = self::formatBytes($data['size']);
		!empty($data['folder'])?sort($data['folder']):false;
		!empty($data['files'])?sort($data['files']):false;
		return $data;
	}

	/* File Ico */
	static private function ico_class($ext='file') {
		$class = array('file'=>'ico-file','ico'=>'ico-ico','htm'=>'ico-html','html'=>'ico-html','php'=>'ico-php','css'=>'ico-css','jpg'=>'ico-img','png'=>'ico-img','gif'=>'ico-img',
			'pdf'=>'ico-pdf','zip'=>'ico-zip','txt'=>'ico-txt','doc'=>'ico-doc','docx'=>'ico-doc','xls'=>'ico-xls','xlsx'=>'ico-xls','odt'=>'ico-odt',
		);
		$date = isset($class[$ext])?$class[$ext]:'ico-file';
		return $date;
	}

	/* Mkdir */
	static function mkDir($path) {
		$dir = self::$file_root.$path;
		if(!is_dir($dir)){
			return mkdir($dir,0777,true)===true?true:false;
		}else{return false;}
	}
	/* saveFile */
	static function saveFile($file,$content=''){
		return file_put_contents($file,$content)===true?true:false;
	}

	/* Rename */
	static function reName($rename,$name) {
		$ff = self::$file_root.$rename;
		$f = self::$file_root.$name;
		return rename($ff,$f)===true?true:false;
	}

	/* All Files */
	static function zipAll($path,$files,$name){
		self::$zipObj = new \ZipArchive();
		$filename = self::$file_root.$path.$name.'.zip';
		if(!self::$zipObj->open($filename,\ZipArchive::CREATE)) return false;
		// 追加文件
		foreach($files as $val){
			self::zipAdd($path,$val);
		}
		self::$zipObj->close();
		return $filename;
	}
	static private function zipAdd($path,$name){
		if(is_dir(self::$file_root.$path.$name)){
			$dirs = scandir(self::$file_root.$path.$name);
			foreach ($dirs as $dir) {
				if ($dir != '.' && $dir != '..') {
					// 目录和文件
					$sonDir = $path.$name.'/'.$dir;
					if(is_dir(self::$file_root.$sonDir)){
						// 递归
						self::zipAdd($sonDir,$dir);
					}else{
						self::$zipObj->addFile(self::$file_root.$sonDir,$sonDir);
					}
				}
			}
		}else{
			if(is_file(self::$file_root.$path.$name)){
				self::$zipObj->addFile(self::$file_root.$path.$name,$path.$name);
			}
		}
	}

	/* Upload */
	static function upload($path,$upName){
		$file = str_replace(' ','_',$_FILES[$upName]['name']);
		return move_uploaded_file($_FILES[$upName]['tmp_name'],self::$file_root.$path.$file)===true?true:false;
	}
	
	/* Download */
	static function down($file){
		$fileinfo = pathinfo($file);
		header('Content-type: application/x-'.$fileinfo['extension']);
		header('Content-Disposition: attachment; filename='.$fileinfo['basename']);
		header('Content-Length: '.filesize($file));
		return readfile($file);
	}

	/* Delete folder and file */
	static function delAll($path){
		if(is_dir(self::$file_root.$path)){
			$dirs = scandir(self::$file_root.$path);
			foreach ($dirs as $dir) {
				if ($dir != '.' && $dir != '..') {
					// 目录和文件
					$sonDir = $path.'/'.$dir;
					if(is_dir(self::$file_root.$sonDir)){
						// 递归删除
						self::delAll($sonDir);
						// 删除空目录
						rmdir(self::$file_root.$sonDir);
					}else{
						// 删除文件
						unlink(self::$file_root.$sonDir);
					}
				}
			}
			// 删除空目录
			rmdir(self::$file_root.$path);
		}else{
			if(is_file(self::$file_root.$path)) unlink(self::$file_root.$path);
		}
	}

	/* EditPerm */
	static function editPerm($path,$perm) {
		$ff = self::$file_root.$path;
		$perm = octdec($perm);
		$data = false;
		if(!is_dir($ff)) {
			$data = chmod($ff,$perm)===true?true:false;
		}else {
			$data = self::editDirPerm($ff,$perm)===true?true:false;
		}
		return $data;
	}
	static function editDirPerm($dir,$perm) {
		$data = true;
		$d = opendir($dir);
		while ($file = readdir($d)){
			if($file == "." || $file == ".."){continue;}
			$fullpath = $dir . "/" . $file;
			if(!is_dir($fullpath)){
				$data = chmod($fullpath,$perm)===true?true:false;
			}else{
				$data = self::editDirPerm($fullpath,$perm)===true?true:false;
			}
			if($data==false){break;}
		}
		closedir($d);
		return chmod($dir,$perm)===true&&$data?true:false;
	}

	/* Folder Size */
	static function dirsize($dir) {
		$handle=opendir($dir);
		$size = 0;
		while($file=readdir($handle)){
			if($file == "." || $file == ".."){continue;}
			if(is_dir("$dir/$file")){
				$size += self::dirsize("$dir/$file");
			}else{
				$size += filesize("$dir/$file");
			}
		}
		closedir($handle);
		return $size;
	}
	/* File Size */
	static function size($file='') {
		return filesize($file);
	}

	/* File Perm */
	static function perm($file='') {
		return substr(sprintf('%o', fileperms($file)), -4);
	}
	/* Ctime */
	static function getctime($file='') {
		return date("Y-m-d H:i:s",filectime($file));
	}
	/* Mtime */
	static function getmtime($file='') {
		return date("Y-m-d H:i:s",filemtime($file));
	}
	/* Format Byte */
	static function formatBytes($bytes){
		if($bytes >= 1073741824){
			$bytes = round($bytes / 1073741824 * 100) / 100 . 'GB';
		}elseif($bytes >= 1048576){
			$bytes = round($bytes / 1048576 * 100) / 100 . 'MB';
		}elseif($bytes >= 1024){
			$bytes = round($bytes / 1024 * 100) / 100 . 'KB';
		}else{
			$bytes = $bytes . 'B';
		}
		return $bytes;
	}
}