<template>
<div id="app">

  <!-- 更新APP -->
  <div v-if="update.show" class="update_body" :style="{backgroundColor: upDateColor.bg}">
    <div class="update_ct verticalCenter">
      <div class="logo" :style="{backgroundColor: upDateColor.logoBg}">
        <div></div>
      </div>
      <div class="loading" :style="{backgroundImage: 'linear-gradient(to right, '+upDateColor.loading+', '+upDateColor.loading+' '+update.loading+', '+upDateColor.loaded+' '+update.loading+', '+upDateColor.loaded+' 100%)'}"></div>
      <div class="load_msg" :style="{color:upDateColor.msgColor}">{{update.msg}}</div>
      <div class="load_button">
        <button class="Button" v-if="update.down" @click="updateDown()" :style="{color:upDateColor.butColor,backgroundColor:upDateColor.butBg,}">{{upDateColor.butText}}</button>
      </div>
    </div>
    <div class="update_logo" :style="{color:upDateColor.copy}">
      <h1>{{env.title}}</h1>
      <h2>{{env.copy}}</h2>
    </div>
  </div>
  <!-- 更新APP End -->

  <!-- 登录 -->
  <div v-show="store.isLogin===false" class="login_bg bgImg bgcover" :style="{backgroundImage:'url('+(store.system.login_bg?store.system.login_bg:require('./assets/bg.jpg'))+')'}">
    <div class="login_body">
      <div class="login_logo flex_center">
        <div class="bgImg" :style="{backgroundImage:'url('+(store.system.logo?store.system.logo:require('./assets/logo.svg'))+')'}"></div>
        <h2 class="nowrap">{{store.system.title}}</h2>
      </div>
      <div class="login_ct">
        <div class="login_type">
          <div class="title">&lt; {{language[languageNum].val}} &gt;</div>
          <div class="arrow flex_center">
            <div class="arrow_up"></div>
          </div>
          <ul class="list">
            <li v-for="(val,index) in language" :key="index" @click="platform(index)">{{val.val}}</li>
          </ul>
        </div>
        <h3>会员登录</h3>
        <div class="login_input">
          <wm-input :value="login.uname" @update:value="login.uname=$event" placeholder="用户名/手机/邮箱" />
        </div>
        <div class="login_input">
          <wm-input :value="login.passwd" @update:value="login.passwd=$event" type="password" placeholder="密码" />
        </div>
        <div class="login_input">
          <wm-button @click="loginSub()" :disabled="login.dis">{{login.subText}}</wm-button>
        </div>
      </div>
      <div class="login_copy nowrap">&copy; {{store.system.copy}}&nbsp;&nbsp;版本：{{env.version}}</div>
    </div>
  </div>
  <!-- 登录 End -->
  <!-- 主要框架 -->
  <div class="app_body flex" v-show="store.isLogin===true" :style="{paddingTop:store.statusBarHeight}">
    <!-- 菜单 -->
    <scroll-view :upperLoad="false" :lowerLoad="false" class="app_left">
      <!-- 用户信息 -->
      <div class="app_user">
        <div class="img">
          <div v-if="store.uInfo.img" :style="{backgroundImage:'url('+store.uInfo.img+')'}"></div>
          <div v-else class="bgImg tu"></div>
        </div>
        <div class="info nowrap">
          {{store.uInfo.nickname || '昵称'}}({{store.uInfo.name || '姓名'}})
        </div>
      </div>
      <!-- 菜单 -->
      <wm-menu ref="Menus" :data="menus" :defaultActive="menusActive" @select="menuClick"></wm-menu>
      <!-- 登录状态 -->
      <div class="app_login nowrap">
        <span class="config">{{store.uInfo.uname}}</span>&gt;
        <span class="logout" @click="logout()">退出</span>
      </div>
    </scroll-view>
    <!-- 中间内容 -->
    <div class="app_right">
      <scroll-view  class="app_top" :upperLoad="false" :lowerLoad="false" :scroll-x="true">
        <wm-action :url="store.action.url" :menus="store.action.menus"></wm-action>
      </scroll-view>
      <div class="app_main">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
      <div class="app_copy">
        所属：{{store.system.title}}&nbsp;&nbsp;&copy; {{store.system.copy}}&nbsp;&nbsp;版本：{{env.version}}
      </div>
    </div>
    <!-- 中间内容 End -->
  </div>
  <!-- 主要框架 End -->

</div>
</template>

<style>
/* 表单缩放问题 */
@media only screen and (min-device-width : 320px) and (max-device-width : 1024px) {

  select:focus,
  textarea:focus,
  input:focus {
    font-size: 16px !important;
  }
}

/* 字体图标 */
@import url('./assets/style/icon.css');
/* UI */
@import url('./assets/style/ui.css');
/* Main */
@import url('./assets/style/main.css');
</style>
<style scoped>
/* APP */
@import url('./assets/style/app.css');
</style>

<script src="./App.js"></script>
