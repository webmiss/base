<template>
  <div id="app">
		<!-- TOP -->
		<div class="top_html">
			<div class="body">
				<div class="flex">
					<!-- Logo -->
					<div class="flex top_logo">
						<h1>W</h1><h2>EBMIS</h2>
					</div>
					<ul class="top_nav flex_left">
						<li><router-link to="/" :class="$route.path=='/'?'an':''">首页</router-link></li>
						<li><router-link to="/doc" :class="$route.path=='/doc'?'an':''">文档</router-link></li>
					</ul>
				</div>
				<div class="top_right flex">
					<a class="github" href="https://github.com/webmiss/base">Github</a>
					<a class="el-icon-menu" @click="$store.state.showMenu=!$store.state.showMenu" title="菜单"></a>
				</div>
			</div>
		</div>
		<!-- Content -->
		<router-view />
		<!-- Copy -->
		<div class="bottom_copy">WebMIS © 2019-2022 滇ICP备14000710号</div>
  </div>
</template>

<style>
*{margin: 0; padding: 0;}
html,body,#app{height: 100%;}
body{font-size: 14px; color: #333; background: no-repeat center; background-size: auto 150%;}
img,video{border: none; vertical-align: top;}
ul{list-style: none;}
a{color: #6FB737; text-decoration: none;}
a:hover{color: #FF6600;}
textarea{border: #999 1px solid; background: #FFF; padding: 5px; overflow: hidden;}
input{outline: medium; vertical-align: middle;}
input:focus, textarea:focus{box-shadow: 0 0 6px rgba(153, 153, 153, 0.7);}
.html{height: 100%;}

/* UI */

/* 布局 */
.flex{display: flex; justify-content: space-between; flex-wrap: wrap;}
.flex_left{display: flex; justify-content: flex-start; flex-wrap: wrap;}
.flex_right{display: flex; justify-content: flex-end; flex-wrap: wrap;}
.flex_center{display: flex; justify-content: center;}
.nowrap{overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.nowrap_text{overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}

/* Top */
.top_html{position: fixed; z-index: 999; width: 100%; height: 60px; line-height: 60px; background-color: #24292E;}
.top_logo{cursor: pointer; padding: 0 5px; margin-top: 10px; line-height: 40px; text-align: center;}
.top_logo h1{width: 40px; height: 40px; font-size: 24px; border-radius: 50%; background-color: #6FB737; color: #FFF;}
.top_logo h1{transition: All 0.4s ease-in-out;}
.top_logo h2{padding: 0 5px; color: #6FB737; font-weight: 300;}
.top_logo:hover h1{background-color: #FF6600; color: #FFF; transform: rotate(360deg);}

.top_nav{overflow: hidden; width: calc(100% - 140px);}
.top_nav li{padding: 0 25px;}
.top_nav a{color: #999;}
.top_nav .an{color: #6FB737;}

.top_right{position: absolute; right: 0; top: 0; background-color: #24292E; color: #666;}
.top_right a{padding: 0 8px; margin: 0 8px;}
.top_right .el-icon-menu{font-size: 20px; line-height: 60px;}

/* Content */
.body{max-width: 1200px; margin: 0 auto;}
.content_body{padding-top: 60px;}

.bottom_copy{overflow: hidden; line-height: 60px; color: #999; text-align: center;}

/* Doc */
.doc_menus{width: 240px;}
.doc_menus .el-menu{border: none;}
.doc_menus .el-submenu__title{height: 42px; line-height: 42px;}
.doc_menus .el-submenu__title:hover{background-color: #F2F2F2;}
.doc_menus .el-submenu .el-menu-item{height: 30px; line-height: 30px; color: #333;}
.doc_menus .el-menu-item:hover{background-color: #F2F2F2; color: #6FB737;}
.doc_menus .el-menu-item.is-active{color: #6FB737;}
.doc_bg{display: none; position: fixed; width: 100%; height: 100%; background-color: rgba(0,0,0,.6);}

.doc_copy{line-height: 36px; font-size: 12px; color: #CCC; text-align: center; border-top: #F2F2F2 1px solid;}

/* 文档 */
.doc_print{text-align: right;}
.doc_print a{cursor: pointer; padding: 5px 15px;}
.doc_body{background-color: #FFF;}
.doc_title{padding: 20px 0; text-align: center; font-size: 20px;}
.doc_html h1{padding: 20px 0 5px; font-size: 18px;}
.doc_html h2{padding: 20px 0 5px; font-size: 16px;}
.doc_html h3{padding: 20px 0 5px; font-size: 14px;}
.doc_html p{padding: 5px 0; line-height: 24px; color: #666;}
.doc_html pre{border-radius: 5px;}
.doc_html li{line-height: 28px;}

/* 响应式布局 */
@media screen and ( max-width: 1024px ) {
	
}
@media screen and ( max-width: 768px ) {
	.doc_bg{display: block;}
	.doc_menus{position: fixed; right: 0;}
}
@media screen and ( max-width: 640px ) {
	
}
@media screen and ( max-width: 420px ) {
	.top_logo h2{display: none;}
	.top_nav{width: calc(100% - 50px);}
}
@media screen and ( max-width: 360px ) {
	.top_right .github{display: none;}
}

</style>

<script src="./App.js"></script>


