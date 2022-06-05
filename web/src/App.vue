<template>
<div id="app">

  <!-- Top -->
  <div class="app_top_body">
    <div class="body app_top flex">
      <div class="app_logo"></div>
      <div class="app_nav_body">
        <ul class="app_nav">
          <li
            v-for="(v,k) in nav"
            :key="k"
            :class="v.value==pos[0]?'active':''"
            @click="sea.key=''; menusClick([v.value, v.children[0].value, v.children[0].children[1].value])"
          >{{ v.label }}</li>
        </ul>
      </div>
      <ul class="app_top_tool flex">
        <li>
          <div class="ico center" @click="openUrl('https://github.com/webmiss/base')"><i class="icon ico_github"></i></div>
        </li>
        <li class="qrcode">
          <div class="ico center"><i class="icon ico_qrcode"></i></div>
          <div class="app_qrcode_box">
            <div class="app_qrcode_body">
              <div class="arrow arrow_up"></div>
              <img :src="apiUrl+'index/qrcode/docs'" />
              <p>手机扫描二维码</p>
            </div>
          </div>
        </li>
        <li class="menus">
          <div class="ico center" @click="isShow=!isShow"><i class="icon ico_menus"></i></div>
        </li>
      </ul>
    </div>
  </div>
  <!-- Top End -->

  <!-- Content -->
  <div class="app_body">
    <div class="app_content body flex">
      <!-- BG -->
      <div class="app_menus_bg" :style="{display:isShow?'block':'none'}" @click="isShow=!isShow"></div>
      <!-- Left -->
      <div class="app_left" :style="{display:isShow?'block':'none'}">
        <!-- Search -->
        <div class="app_sea_body">
          <i class="ui ui_search"></i>
          <input type="text" placeholder="请输入关键字" v-model="sea.key" @input="seaInput()" />
        </div>
        <ul class="app_sea_list" v-if="sea.list.length>0">
          <li
            v-for="(v,k) in sea.list"
            :key="k"
            :class="v.value==pos[2]?'active':''"
            @click="menusClick([pos[0], v.url, v.value])"
          >
            {{ v.label }}
          </li>
        </ul>
        <!-- Menus -->
        <div class="app_menus_body" v-else>
          <template v-for="(v1,k1) in menus" :key="k1">
            <div class="app_menus_title flex" @click="v1.checked=!v1.checked">
              <h2>{{ v1.label }}</h2>
              <span :style="{transform: v1.checked?'rotate(-0deg)':'rotate(-180deg)'}">
                <i class="icon ico_arrow_down center"></i>
              </span>
            </div>
            <div v-show="v1.checked">
              <div
                v-for="(v2,k2) in v1.children"
                :key="k2"
                class="app_menus_li"
                :class="v2.value==pos[2]?'active':''"
                @click="menusClick([pos[0], v1.value, v2.value])"
              >
                <h3>{{ v2.label }}</h3>
              </div>
            </div>
          </template>
        </div>
        <!-- Menus End -->
      </div>
      <!-- Left End -->
      <!-- Right -->
      <div class="app_right">
        <div class="app_addr flex">
          <span>{{ addr }}</span>
          <span class="app_print" @click="clickPrint">打印、下载</span>
        </div>
        <div class="app_html">
          <div v-if="docHtml!=''" id="Print" class="doc_html" v-html="docHtml"></div>
          <div v-else class="loading center">Loading...</div>
        </div>
      </div>
      <!-- Right End -->
    </div>
    <div class="app_copy">{{copy}}</div>
  </div>
  <!-- Content End -->

  <!-- Tools -->
  <ul class="app_tools">
    <li class="weixin">
      <i class="icon ico_weixin"></i>
      <div class="app_tools_box">
        <div class="app_tools_body">
          <div class="arrow arrow_right"></div>
          <img :src="apiUrl+'index/qrcode/server1'" />
          <p>联系我们</p>
        </div>
      </div>
    </li>
  </ul>
  <!-- Tools End -->

</div>
</template>

<style>
/* 表单缩放问题 */
@media only screen and (min-device-width : 320px) and (max-device-width : 1024px) {
  select:focus, textarea:focus, input:focus { font-size: 16px !important; }
}
/* 样式 */
@import url('./assets/style/icon.css');
@import url('./assets/style/ui.css');
@import url('./assets/style/app.css');
/* 打印 */
@import url('/docs/print.css');
</style>

<script lang="ts" src="./App.ts"></script>
