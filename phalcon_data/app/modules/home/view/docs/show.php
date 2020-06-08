<?php
use app\library\Parsedown;
?>
<div class="html_body doc_body">
  <div class="body">
    <!-- 菜单 -->
    <div class="doc_left_menu" onclick="showMenus()"><i class="icons icon_menus"></i></div>
    <!-- Left -->
    <div id="LeftMenusBG" class="doc_left_bg" onclick="showMenus()"></div>
    <aside id="LeftMenus" class="doc_left">
      <div>
      <h1><?php echo $ctitle; ?></h1>
      <div class="doc_left_ct">
<?php foreach($Meuns['menus'] as $k1=>$v1){?>
			  <h2><?php echo isset($v1['url'])?'<a href="/'.$this->dispatcher->getControllerName().'/'.$this->dispatcher->getActionName().'/'.$k1.'"'.($Url==$k1?' class="an"':'').'>'.$v1['title'].'</a>':$v1['title'];?></h2>
<?php if(isset($v1['menus'])){?>
			  <ul>
<?php foreach($v1['menus'] as $k2=>$v2){?>
				  <li><a href="<?php echo '/'.$this->dispatcher->getControllerName().'/'.$this->dispatcher->getActionName().'/'.$k1.'/'.$k2;?>"<?php echo $Url==$k1.'/'.$k2?' class="an"':'';?>><?php echo $v2['title'];?></a></li>
<?php }?>
			  </ul>
<?php }}?>
      </div>
      </div>
    </aside>
    <!-- Content -->
    <div class="doc_right">
      <div class="print">
        <span onclick="printJS('Print', 'html')">打印/下载</span>
      </div>
      <div id="Print" class="markdown-body doc_html">
        <h1><?php echo $WebTitle; ?></h1>
<?php
if(is_file($File)){
	$MD = new Parsedown();
	echo $MD->text(file_get_contents($File));
}else{echo '暂无内容！';}
?>
<style>
.doc_html{overflow: hidden; padding: 16px 16px 48px; line-height: 32px; font-size: 14px;}
.doc_html h1,.doc_html h3,.doc_html p{padding: 8px 0;}
.doc_html h1{font-size: 26px; text-align: center;}
.doc_html h2{padding: 24px 0 8px;}
.doc_html ul{list-style: initial; list-style-position: inside;}
.doc_html ul li{padding-left: 16px;}
.doc_html pre{overflow: hidden; height: auto; padding: 16px;}
</style>
      </div>
    </div>
    <!-- Content -->
  </div>
</div>
<!-- 滑块 -->
<script src="https://cdn.jsdelivr.net/npm/better-scroll"></script>
<!-- 代码高亮 -->
<script src="/themes/home/prism/prism.js"></script>
<link rel="stylesheet" type="text/css" href="/themes/home/prism/prism.css" />
<!-- 打印 -->
<script src="/themes/home/js/print.min.js"></script>
<script>

/* 加载完成 LeftMenus */
let scroll = null;
window.onload = function(){
  /* 左侧菜单-滑动 */
  let wrapper = document.querySelector('#LeftMenus');
  scroll = new BScroll(wrapper);
}
  
/* 左侧菜单-显示/隐藏 */
function showMenus(){
  let menus = document.getElementById('LeftMenus');
  let bg = document.getElementById('LeftMenusBG');
  menus.style.display = menus.style.display=='block'?'':'block';
  bg.style.display = bg.style.display=='block'?'':'block';
  if(scroll) scroll.refresh();
}

</script>