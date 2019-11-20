<?php

/**
* 文件类
*/

namespace app\library;

class File{
	public $file_root = '.';
	
	/* Lists */
	function lists($path='/') {
		$path = $path?$path:'/';
		$path = preg_replace('/\.\.\/|\.\/|\.\./','',$path);
		$path = $path=='/'?$path:'/'.trim($path, '/').'/';

		$data['path'] = $path;
		$data['dirNum'] = 0;
		$data['fileNum'] = 0;
		$data['size'] = 0;
		
		$root = $this->file_root.$path;

		if(is_dir($root)) {
			$d = opendir($root);
			while($f = readdir($d)) {
				if($f == "." || $f == ".."){continue;}
				$ff = $root . '/' . $f;
				$ext = strtolower(substr(strrchr($f, '.'), 1));
				$ctime = $this->getctime($ff);
				$mtime = $this->getmtime($ff);
				$perm = $this->perm($ff);
				if(is_dir($ff)){
					$size = $this->dirsize($ff);
					$data['folder'][] = array('name'=>$f, 'ctime'=>$ctime, 'mtime'=>$mtime, 'size'=>$this->formatBytes($size), 'perm'=>$perm);
					$data['size'] += $size;
					$data['dirNum']++;
				}else {
					$size = $this->size($ff);
					$class = $this->ico_class($ext);
					$data['files'][] =  array('name'=>$f, 'ctime'=>$ctime, 'mtime'=>$mtime, 'size'=>$this->formatBytes($size), 'perm'=>$perm, 'ext'=>$ext, 'class'=>$class);
					$data['size'] += $size;
					$data['fileNum']++;
				}
			}
		}else{return FALSE;}
		$data['size'] = $this->formatBytes($data['size']);
		isset($data['folder'])?sort($data['folder']):FALSE;
		isset($data['files'])?sort($data['files']):FALSE;
		return $data;
	}

	/* File Ico */
	private function ico_class($ext='file') {
		$class = array('file'=>'ico-file','ico'=>'ico-ico','htm'=>'ico-html','html'=>'ico-html','php'=>'ico-php','css'=>'ico-css','jpg'=>'ico-img','png'=>'ico-img','gif'=>'ico-img',
			'pdf'=>'ico-pdf','zip'=>'ico-zip','txt'=>'ico-txt','doc'=>'ico-doc','docx'=>'ico-doc','xls'=>'ico-xls','xlsx'=>'ico-xls','odt'=>'ico-odt',
		);
		$date = isset($class[$ext])?$class[$ext]:'ico-file';
		return $date;
	}

	/* Mkdir */
	function addDir($path,$perm=0755) {
		$dir = $this->file_root.$path;
		if(!is_dir($dir)){
			return mkdir($dir,octdec($perm))==TRUE?TRUE:FALSE;
		}else{return FALSE;}
	}
	/* AddFile */
	function addFile($file,$data=''){
		$file = $this->file_root.$file;
		if(!is_file($file)){
			return file_put_contents($file,$data)==TRUE?TRUE:FALSE;
		}else{return FALSE;}
	}
	/* EditFile */
	function editFile($file,$data=''){
		$file = $this->file_root.$file;
		if(is_file($file)){
			return file_put_contents($file,$data)==TRUE?TRUE:FALSE;
		}else{return FALSE;}
	}

	/* Rename */
	function reName($rename,$name) {
		$ff = $this->file_root.$rename;
		$f = $this->file_root.$name;
		return rename($ff,$f)==TRUE?TRUE:FALSE;
	}

	/* Delete folder and file */
	function del($path,$f) {
		$data = FALSE;
		foreach($f as $val){
			$ff = $this->file_root.$path.$val;
			if(!is_dir($ff)) {
				$data = unlink($ff)==TRUE?TRUE:FALSE;
			}else {
				$data = $this->deldir($ff)==TRUE?TRUE:FALSE;
			}
			if($data==FALSE){break;}
		}
		return $data;
	}
	function deldir($dir){
		$data = TRUE;
		$d = opendir($dir);
		while ($file = readdir($d)){
			if($file == "." || $file == ".."){continue;}
			$fullpath = $dir . "/" . $file;
			if (!is_dir($fullpath)){
				$data = unlink($fullpath)==TRUE?TRUE:FALSE;
			}else{
				$data = $this->deldir($fullpath)==TRUE?TRUE:FALSE;
			}
			if($data==FALSE){break;}
		}
		closedir($d);
		return rmdir($dir)==TRUE&&$data?TRUE:FALSE;
	}

	/* EditPerm */
	function editPerm($path,$perm) {
		$ff = $this->file_root.$path;
		$perm = octdec($perm);
		$data = FALSE;
		if(!is_dir($ff)) {
			$data = chmod($ff,$perm)==TRUE?TRUE:FALSE;
		}else {
			$data = $this->editDirPerm($ff,$perm)==TRUE?TRUE:FALSE;
		}
		return $data;
	}
	function editDirPerm($dir,$perm) {
		$data = TRUE;
		$d = opendir($dir);
		while ($file = readdir($d)){
			if($file == "." || $file == ".."){continue;}
			$fullpath = $dir . "/" . $file;
			if(!is_dir($fullpath)){
				$data = chmod($fullpath,$perm)==TRUE?TRUE:FALSE;
			}else{
				$data = $this->editDirPerm($fullpath,$perm)==TRUE?TRUE:FALSE;
			}
			if($data==FALSE){break;}
		}
		closedir($d);
		return chmod($dir,$perm)==TRUE&&$data?TRUE:FALSE;
	}
	
	/* Download */
	function down($f){
		$fileinfo = pathinfo($f);
		header('Content-type: application/x-'.$fileinfo['extension']);
		header('Content-Disposition: attachment; filename='.$fileinfo['basename']);
		header('Content-Length: '.filesize($f));
		readfile($f);
		exit();
	}

	/* Folder Size */
	function dirsize($dir) {
		$handle=opendir($dir);
		$size = 0;
		while($file=readdir($handle)){
			if($file == "." || $file == ".."){continue;}
			if(is_dir("$dir/$file")){
				$size += $this->dirsize("$dir/$file");
			}else{
				$size += filesize("$dir/$file");
			}
		}
		closedir($handle);
		return $size;
	}
	/* File Size */
	function size($f='') {
		return filesize($f);
	}

	/* File Perm */
	function perm($f='') {
		return substr(sprintf('%o', fileperms($f)), -4);
	}
	/* Ctime */
	function getctime($f='') {
		return date("Y-m-d H:i:s",filectime($f));
	}
	/* Mtime */
	function getmtime($f='') {
		return date("Y-m-d H:i:s",filemtime($f));
	}
	/* Format Byte */
	function formatBytes($bytes){
		if($bytes >= 1073741824){
			$bytes = round($bytes / 1073741824 * 100) / 100 . ' GB';
		}elseif($bytes >= 1048576){
			$bytes = round($bytes / 1048576 * 100) / 100 . ' MB';
		}elseif($bytes >= 1024){
			$bytes = round($bytes / 1024 * 100) / 100 . ' KB';
		}else{
			$bytes = $bytes . ' B';
		}
		return $bytes;
	}
}