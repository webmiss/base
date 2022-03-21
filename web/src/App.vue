<template>
<div id="app">
  <!-- 导航 -->
  <div class="top_body">
    <div class="body top flex">
      <div class="bgImg top_logo" @click="openUrl('/')"></div>
      <wm-scroll-view class="top_nav" :scroll-x="true" :scroll-y="false" :scrollbar="null">
        <span @click="openUrl('/docs/vue/install/index')" class="item" :class="$route.params.m1=='vue'?'active':''">Vue</span>
        <span @click="openUrl('/docs/flutter/install/index')" class="item" :class="$route.params.m1=='flutter'?'active':''">Flutter</span>
        <span @click="openUrl('/docs/phalcon/install/index')" class="item" :class="$route.params.m1=='phalcon'?'active':''">Phalcon</span>
        <span @click="openUrl('/docs/python/install/index')" class="item" :class="$route.params.m1=='python'?'active':''">Python</span>
        <span @click="openUrl('/docs/java/install/index')" class="item" :class="$route.params.m1=='java'?'active':''">SpringBoot</span>
        <span @click="openUrl('/docs/gin/install/index')" class="item" :class="$route.params.m1=='gin'?'active':''">Gin</span>
        <span @click="openUrl('/docs/linux/install/index')" class="item" :class="$route.params.m1=='linux'?'active':''">Linux</span>
      </wm-scroll-view>
      <a href="https://github.com/webmiss/base" class="top_github">GitHub</a>
    </div>
  </div>
  <!-- 内容 -->
  <div class="html_body">
    <div class="mask html_body_bg"></div>
    <!-- 客服 -->
    <ul class="ser_body">
      <li>
        <div class="bgImg weixin"></div>
        <div class="ser_code">
          <div class="code"><img :src="apiUrl+'index/qrcode/server1'" /><p>业务咨询</p></div>
          <div class="arrow"><div class="arrow_right"></div></div>
        </div>
      </li>
      <li>
        <div class="bgImg weixin"></div>
        <div class="ser_code">
          <div class="code"><img :src="apiUrl+'index/qrcode/server2'" /><p>技术问题</p></div>
          <div class="arrow"><div class="arrow_right"></div></div>
        </div>
      </li>
    </ul>
    <!-- 内容 -->
    <router-view class="body" />
    <!-- 版权 -->
    <div class="copy">{{copy}}</div>
  </div>
</div>
</template>

<style>
/* 表单缩放问题 */
@media only screen and (min-device-width : 320px) and (max-device-width : 1024px) {
  select:focus,
  textarea:focus,
  input:focus {font-size: 16px !important;}
}
/* UI */
@import url('./assets/style/ui.css');
/* Main */
@import url('./assets/style/main.css');
</style>
<style scoped>
/* APP */
@import url('./assets/style/app.css');
</style>

<script lang="ts" src="./App.ts"></script>
