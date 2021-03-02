<template>
  <div>
    <!-- 项目 -->
    <div class="index_ct">
      <h1>WebMIS</h1>
      <div class="index_key">
        全栈开发基础框架.技术<br>
        PHP / Python / SpringBoot / Gin / Phalcon / Flutter / NodeJS / Vue / Socket / Redis / API
      </div>
      <div class="index_an">
        <a class="an1" @click="openUrl('/docs/vue/install/index')">文档</a>
        <a class="an2" href="https://github.com/webmiss/base">GitHub</a>
      </div>
      <!-- 二维码 -->
      <ul class="index_qr flex_center">
        <li>
          <div><img :src="apiUrl+'index/qrcode/docs'" @click="showCode('index/qrcode/docs')" /></div>
          <p>文档</p>
        </li>
        <li>
        <div><img :src="apiUrl+'index/qrcode/demo'" @click="showCode('index/qrcode/demo')" /></div>
          <p>Demo</p>
        </li>
        <li>
          <div><img :src="apiUrl+'index/qrcode/wechat'" @click="showCode('index/qrcode/wechat')" /></div>
          <p>公众号</p>
        </li>
      </ul>
    </div>
    <!-- 项目 End -->
    <!-- 二维码-显示 -->
    <wm-popup :show="code.show" @update:show="code.show=$event">
      <div class="index_qr_show">
        <img :src="code.img" />
        <p class="an" @click="downCode()">下载二维码</p>
      </div>
    </wm-popup>
  </div>
</template>

<style scoped>
/* 首页 */
.index_ct{position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); color: #FFF; text-align: center; padding: 16px;}
.index_ct h1{font-size: 40px; line-height: 60px; font-weight: normal;}
.index_key{line-height: 30px; font-size: 16px; color: #999;}
.index_key span{padding: 0 8px;}
.index_an{padding: 24px 0;}
.index_an a{display: inline-block; margin: 8px; width: 160px; line-height: 48px; color: #FFF; font-size: 16px; border-radius: 3px;}
.index_an .an1{background-color: #379;}
.index_an .an2{background-color: #595;}
.index_qr{overflow: hidden; padding: 8px 0;}
.index_qr li{margin: 0 24px;}
.index_qr div{width: 64px; height: 64px; padding: 4px; background-color: #F2F4F6; border-radius: 3px;}
.index_qr div img{cursor: pointer; width: 100%;}
.index_qr p{line-height: 30px; font-size: 12px; color: #999;}

/* 二维码 */
.index_qr_show{width: 200px; padding: 16px; background-color: #FFF; border-radius: 5px;}
.index_qr_show img{width: 100%;}
.index_qr_show p{line-height: 32px; margin-top: 8px; text-align: center; background-color: #595; color: #FFF; border-radius: 3px;}

/* 响应式布局 */
@media screen and ( max-width: 1024px ){
}
@media screen and ( max-width: 768px ){
}
@media screen and ( max-width: 640px ){
.index_qr li{margin: 0 16px;}
}
@media screen and ( max-width: 375px ){
.index_qr li{margin: 0 8px;}
}
@media screen and ( max-width: 320px ){
}
</style>

<script lang="ts" src="./Index.ts"></script>
