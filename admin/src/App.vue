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
      <div class="update_logo" :style="{color:updateCfg.copy}"><h1>{{info.title}}</h1><h2>{{info.copy}}</h2></div>
    </div>
    <!-- 更新APP End -->

    <!-- Login -->
    <div v-show="state.isLogin===false" class="login_bg bgImg bgcover" :style="{backgroundImage:'url('+(state.system.login_bg?state.system.login_bg:'')+')'}">
      <div class="login_body">
        <div class="login_logo flex_center">
          <div class="bgImg" :style="{backgroundImage:'url('+(state.system.logo?state.system.logo:require('./assets/logo.svg'))+')'}"></div>
          <h2 class="nowrap">{{state.system.title}}</h2>
        </div>
        <div class="login_ct">
          <div class="login_type">
          <wm-popover type="bottom" effect="dark" width="180px">
            <template #body>
              <ul class="login_type_list">
                <template v-for="(val,index) in language">
                  <li :key="index" v-if="language[languageNum].val!=val.val" @click="platform(index)" >{{val.val}}</li>
                </template>
              </ul>
            </template>
            <template #reference>
              <div class="login_type_title">&lt; {{language[languageNum].val}} &gt;</div>
            </template>
          </wm-popover>
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
        <div class="login_copy nowrap">&copy; {{state.system.copy}}&nbsp;&nbsp;版本：{{info.version}}</div>
      </div>
    </div>
    <!-- Login End -->

    <!-- Main -->
  <div class="app_body flex" v-show="state.isLogin===true" :style="{paddingTop: state.statusHeight}">
    <!-- Left -->
    <div class="app_left">
      <wm-scroll-view style="height: 100%;" ref="menusScroll" :isUpper="false" :isLower="false">
        <!-- 用户信息 -->
        <div class="app_user">
          <div class="img">
            <div v-if="state.uInfo.img" class="bgImg" :style="{backgroundImage:'url('+state.uInfo.img+')'}"></div>
            <div v-else class="bgImg tu"></div>
          </div>
          <div class="info nowrap">
            {{state.uInfo.nickname || '昵称'}}({{state.uInfo.name || '姓名'}})
          </div>
        </div>
        <!-- 菜单 -->
        <wm-menu class="app_menus" ref="Menus" :height="36" textColor="#A2A4A8" :data="menus" :defaultIndex="menusActive" @active="menuClick"></wm-menu>
        <!-- 登录信息 -->
        <div class="app_login nowrap">
          <span class="config">{{state.uInfo.uname}}</span>&gt;
          <span class="logout" @click="logout()">退出</span>
        </div>
      </wm-scroll-view>
    </div>
    <!-- Left End -->
    <!-- Right -->
    <div class="app_right">
      <wm-scroll-view class="app_top" :scroll-x="true" :scroll-y="false" :scrollbar="null">
        <wm-action :url="state.action.url" :menus="state.action.menus"></wm-action>
      </wm-scroll-view>
      <div class="app_main">
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
      <div class="app_copy">
        所属：{{state.system.title}}&nbsp;&nbsp;&copy; {{state.system.copy}}&nbsp;&nbsp;版本：{{info.version}}
      </div>
    </div>
    <!-- Right End -->
  </div>
  <!-- Main End -->


    

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
