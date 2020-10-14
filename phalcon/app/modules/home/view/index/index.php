<!-- 项目 -->
<div class="ctCenter verticalCenter index_ct">
  <h1>WebMIS</h1>
  <div class="index_key">
    全栈开发基础框架.技术<br/>
    PHP / Python / SpringBoot / Phalcon / Flutter / NodeJS / Vue / Swoole / Redis / API
  </div>
  <div class="index_an">
    <a class="an1" href="https://webmis.vip/docs/vue/install/index">文档</a>
    <a class="an2" href="https://github.com/webmiss/base">GitHub</a>
  </div>
  <!-- 二维码 -->
  <ul class="index_qr flex_center">
    <li>
      <div><img src="https://webmis.vip/index/qrcode/docs" @click="showCode('https://webmis.vip/index/qrcode/docs')" /></div>
      <p>文档</p>
    </li>
    <li>
    <div><img src="https://webmis.vip/index/qrcode/demo" @click="showCode('https://webmis.vip/index/qrcode/demo')" /></div>
      <p>Demo</p>
    </li>
    <li>
      <div><img src="https://webmis.vip/index/qrcode/wechat" @click="showCode('https://webmis.vip/index/qrcode/wechat')" /></div>
      <p>公众号</p>
    </li>
  </ul>
</div>
<!-- 项目 End -->
<!-- 二维码-显示 -->
<popup v-model="code.show" style="display: none;">
  <div class="index_qr_show">
    <img :src="code.img" />
    <p class="an" @click="downCode()">下载二维码</p>
  </div>
</popup>
