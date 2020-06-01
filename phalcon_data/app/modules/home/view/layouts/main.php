<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="author" content="WebMIS" />
	<title><?php echo $WebTitle;?></title>
	<link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="format-detection" content="telephone=no">
	<meta name="msapplication-tap-highlight" content="no">
	<meta name="keywords" content="<?php echo $Keywords;?>" />
	<meta  name="description"  content="<?php echo $Description;?>"/>
	<link rel="stylesheet" type="text/css" href="/themes/home/main.css" />
</head>
<body>
	<div id="app">
		<div></div>
		<?php echo $this->getContent(); ?>
	</div>
<!-- VUE -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<!-- 动态JS -->
<?php if(isset($LoadJS)){foreach($LoadJS as $val){;?>
<script type="text/javascript" src="<?php echo $val;?>"></script>
<?php }}?>
</body>
</html>