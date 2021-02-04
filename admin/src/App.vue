<template>
  <div id="app">

    <!-- 更新APP -->
    <div v-if="update.show" class="update_body" :style="{backgroundColor: updateCfg.bg}">
      <div class="update_ct verticalCenter">
        <div class="logo" :style="{backgroundColor: updateCfg.logoBg}"><div></div></div>
        <div class="loading" :style="{backgroundImage: 'linear-gradient(to right, '+updateCfg.loading+', '+updateCfg.loading+' '+update.loading+', '+updateCfg.loaded+' '+update.loading+', '+updateCfg.loaded+' 100%)'}"></div>
        <div class="load_msg" :style="{color:updateCfg.msgColor}">{{update.msg}}</div>
        <div class="load_button">
          <button class="Button" v-if="update.down" @click="updateDown()" :style="{color:updateCfg.butColor,backgroundColor:updateCfg.butBg,}">{{updateCfg.butText}}</button>
        </div>
      </div>
      <div class="update_logo" :style="{color:updateCfg.copy}"><h1>{{updateTitle}}</h1><h2>{{updateCopy}}</h2></div>
    </div>
    <!-- 更新APP End -->

    <!-- 页面 -->
    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <keep-alive :include="state.keepAlive">
          <component :is="Component" class="view" />
        </keep-alive>
      </transition>
    </router-view>
    <!-- 页面 End -->

  </div>
</template>

<style>
/* 表单缩放问题 */
@media only screen and (min-device-width : 320px) and (max-device-width : 1024px) {
  select:focus, textarea:focus, input:focus { font-size: 16px !important; }
}
/* 字体图标 */
@import url('./assets/style/icon.css');
/* UI */
@import url('./assets/style/ui.css');
/* APP */
@import url('./assets/style/app.css');
</style>
<style scoped>
/* 更新 */
.update_body{position: absolute; z-index: 999; width: 100%; height: 100%}
.update_logo{position: fixed; width: 100%; left: 0; bottom: 15px; line-height: 20px; text-align: center; padding: 10px 0;}
.update_logo h1{font-size: 16px;}
.update_logo h2{font-size: 10px; font-weight: normal;}
.update_ct{width: 220px;}
.update_ct .logo{width: 100px; height: 100px; margin: 0px auto 20px; border-radius: 50%;}
.update_ct .logo div{height: 100%; background: url('./assets/logo.svg') no-repeat center; background-size: 65%;}
.update_ct .loading{height: 4px; background: none;}
.update_ct .load_msg{color: #FFF; text-align: center; padding: 8px 0; font-size: 14px;}
.update_ct .load_button{text-align: center; padding-top: 16px;}
.update_ct .load_button button{width: auto; height: 36px; line-height: 36px; padding: 0 20px; font-size: 14px;}
</style>

<script lang="ts" src="./App.ts"></script>
