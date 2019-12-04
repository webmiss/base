## 安装
```bash
# Archlinux
yaourt -S tesseract
# 英文、中文
yaourt -S tesseract-data-eng tesseract-data-chi_sim
```

## 识别
```bash
# 默认英文
tesseract test.png file
# 多语言
tesseract -l chi_sim+eng test.png file
```

## 训练
```bash
# Java软件
jTessBoxEditor
```

## 二维码识别
```bash
pacman -S zbar
```
```php
  /* 识别二维码 */
	function qrcodeAction(){
		$base64 = $this->request->get('base64');
		// 上传
		$dir = 'upload/';
		$up = Upload::base64($dir,$base64);
		$file = $dir.$up['file'];
		// 处理
		$url = shell_exec('zbarimg -q '.$file);
		$url = ltrim($url,'QR-Code:');
		$url = rtrim($url,"\n");
		// 删除缓存
		unlink($file);
		return self::getJSON(['code'=>0,'url'=>$url]);
	}
```