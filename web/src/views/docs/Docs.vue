<template>
  <div class="html_body_ct">
    <!-- 打印 -->
    <div class="doc_print" @click="clickPrint">打印/下载</div>
    <!-- 更多 -->
    <div class="doc_more" @click="showMenus()"><i class="ui ui_menu"></i></div>
    <!-- 菜单 -->
    <div ref="leftMenusBG" class="doc_menu_bg" @click="showMenus()"></div>
    <div ref="leftMenus" class="doc_menu_body">
      <wm-scroll-view class="doc_menu" :isUpper="false" :isLower="false">
        <wm-menu ref="docMenu" height="36" :data="menuData" :defaultIndex="menuIndex" @active="activeMenus"></wm-menu>
      </wm-scroll-view>
    </div>
    <!-- 菜单 End -->
    <!-- 内容 -->
    <div class="doc_body">
      <!-- 位置 -->
      <div class="doc_body_top">
        <span class="doc_ct_addr" v-for="(val,key) in position" :key="key">{{ val || '' }}</span>
      </div>
      <!-- Html -->
      <div class="doc_ct_html">
        <wm-scroll-view ref="docScroll" class="doc_ct" :isUpper="false" :isLower="false" :preventDefault="false">
          <div id="Print" class="doc_html" v-html="docHtml"></div>
        </wm-scroll-view>
      </div>
      <!-- Html End -->
    </div>
    <!-- 内容 End -->
  </div>
</template>

<style>
@import url('/docs/print.css');
</style>

<style scoped>
/* 文档-打印 */
.doc_print{cursor: pointer; position: absolute; z-index: 6; top: 4px; right: 4px; padding: 8px; font-size: 12px; color: #666;}
.doc_print:hover{color: #6FB737;}

/* 文档-更多 */
.doc_more{display: none; position: absolute; z-index: 8; top: 10px; right: 10px; width: 40px; height: 40px; line-height: 40px; text-align: center; background-color: #FFF; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.1);}
.doc_more .ui_menu{font-size: 20px; color: #6FB737;}
.doc_more:hover{background-color: #6FB737;}
.doc_more:hover .ui_menu{color: #FFF;}

/* 文档-菜单 */
.doc_menu_body{position: absolute; z-index: 10; width: 224px; padding: 8px; height: calc(100% - 16px); background-color: #F2F4F6;}
.doc_menu_bg{display: none; position: absolute; z-index: 9; width: 100%; height: 100%; background-color: rgba(0,0,0,0.7);}
.doc_menu{width: 100%; height: 100%;}

/* 文档-内容 */
.doc_body{padding-left: 240px; height: 100%;}
.doc_body_top{overflow: hidden; height: 40px; line-height: 40px; padding: 0 8px;}
.doc_ct_addr{font-size: 12px; color: #666;}
.doc_ct_html{position: relative; padding: 15px; height: calc(100% - 70px); background-color: #FFF; border-radius: 8px 0 0 0;}
.doc_ct{width: 100%; height: 100%;}

/* 响应式布局 */
@media screen and ( max-width: 1024px ){
}
@media screen and ( max-width: 768px ){
}
@media screen and ( max-width: 640px ){
  .doc_print{display: none;}
  .doc_more{display: block;}
  .doc_menu_body{display: none;}
  .doc_body{padding-left: 0px;}
}
@media screen and ( max-width: 375px ){
}
@media screen and ( max-width: 320px ){
}
</style>

<script lang="ts" src="./Docs.ts"></script>