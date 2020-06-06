<?php
use app\library\Parsedown;
?>
<div class="html_body doc_body">
  <div class="body">
    <!-- Left -->
    <div class="doc_left">
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
.doc_html{overflow: hidden; padding: 16px 16px 48px; line-height: 32px; font-size: 16px;}
.doc_html h1,.doc_html h3,.doc_html p{padding: 8px 0;}
.doc_html h1{font-size: 28px; text-align: center;}
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
<!-- 代码高亮 -->
<script src="/themes/home/prism/prism.js"></script>
<link rel="stylesheet" type="text/css" href="/themes/home/prism/prism.css" />
<!-- 打印 -->
<script src="/themes/home/js/print.min.js"></script>
<script>
function printClick(){
  let dom = document.getElementById('Print');
  Print(dom);
}
</script>