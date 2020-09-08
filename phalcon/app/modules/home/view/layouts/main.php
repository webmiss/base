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
  <script src="/themes/library/pub/axios.min.js"></script>
  <script src="/themes/library/pub/vue.min.js"></script>
	<script type="module" src="/themes/home/main.js"></script>
  <!-- CSS -->
<?php if(isset($LoadCSS)){foreach($LoadCSS as $val){;?>
  <link rel="stylesheet" type="text/css" href="<?php echo $val;?>" />
<?php }}?>
  <!-- JS模块 -->
<?php if(isset($LoadJS)){foreach($LoadJS as $val){;?>
  <script type="module" src="<?php echo $val;?>"></script>
<?php }}?>
</head>
<body>
  <!-- 头部 -->
  <div id="main" class="top_body">
    <div class="body top">
      <!-- Logo -->
      <a href="https://webmis.vip/" class="bgImg top_logo" title="WebMIS"></a>
      <!-- 菜单 -->
      <wm-scroll-view :scroll-x="true" :upper-load="false" :lower-load="false" class="top_nav_body">
        <ul class="top_nav" :style="{width: 8*80+'px'}">
          <li><a href="https://webmis.vip/docs/app/install/index"<?php echo $this->dispatcher->getActionName()=='app'?' class="an"':'';?>>VueAPP</a></li>
          <li><a href="https://webmis.vip/docs/admin/install/index"<?php echo $this->dispatcher->getActionName()=='admin'?' class="an"':'';?>>Admin</a></li>
          <li><a href="https://webmis.vip/docs/flutter/install/index"<?php echo $this->dispatcher->getActionName()=='flutter'?' class="an"':'';?>>Flutter</a></li>
          <li><a href="https://webmis.vip/docs/api/install/index"<?php echo $this->dispatcher->getActionName()=='api'?' class="an"':'';?>>Api</a></li>
          <li><a href="https://webmis.vip/docs/phalcon/install/index"<?php echo $this->dispatcher->getActionName()=='phalcon'?' class="an"':'';?>>Phalcon</a></li>
          <li><a href="https://webmis.vip/docs/python/install/index"<?php echo $this->dispatcher->getActionName()=='python'?' class="an"':'';?>>Python</a></li>
          <li><a href="https://webmis.vip/docs/java/install/index"<?php echo $this->dispatcher->getActionName()=='java'?' class="an"':'';?>>SpringBoot</a></li>
          <li><a href="https://webmis.vip/docs/linux/shell/index"<?php echo $this->dispatcher->getActionName()=='linux'?' class="an"':'';?>>Linux</a></li>
        </ul>
      </wm-scroll-view>
      <!-- 用户 -->
      <div class="top_right flex">
        <a class="login" @click="showMsg('正在开发!')">登录</a>|<a class="register" @click="showMsg('正在开发!')">注册</a>
      </div>
    </div>
  </div>
  <!-- 内容 -->
  <div id="app" class="html_body">
    <div class="body">
<?php echo $this->getContent(); ?>
      <div class="mask html_body_bg"></div>
    </div>
    <!-- 版权 -->
    <div class="copy">{{copy}}</div>
  </div>
  <!-- 内容 End -->
</body>
</html>