<div class="html_body doc_body">
  <div class="body">
    <!-- Left -->
    <div class="doc_left">
      <h1><?php echo $ctitle;?></h1>
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
      <div class="tright">
        <a href=""  id="PrintClick">打印/下载</a>
      </div>
      <div class="markdown-body doc_html" style="font-size: 14px;">
<?php echo $File; ?>
      </div>
    </div>
    <!-- Content -->
  </div>
</div>