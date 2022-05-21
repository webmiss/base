<template>
  <div id="app">

    <!-- Login -->
    <div v-show="state.isLogin===false" class="login_bg bgImg bgcover" :style="{backgroundImage:'url('+require('./assets/bg.jpg')+')'}">
      <div class="language">
        <div class="language_text">语言: {{language.list[language.num].val}}</div>
        <div class="language_box">
          <div class="arrow"></div>
          <ul class="language_list">
            <template v-for="(v,k) in language.list" :key="k">
              <li v-if="language.list[language.num].val!=v.val" @click="Language(k)">{{v.val}}</li>
            </template>
          </ul>
        </div>
      </div>
      <div class="login_body">
        <div class="login_logo ctCenter bgImg" :style="{backgroundImage:'url('+require('./assets/logo.svg')+')'}"></div>
        <div class="login_ct">
          <h2 class="login_title">{{info.title}}</h2>
          <div class="login_input">
            <wm-input :value="login.uname" @update:value="login.uname=$event" placeholder="请输入手机号码" />
          </div>
          <div class="login_input">
            <wm-input :value="login.passwd" @update:value="login.passwd=$event" type="password" placeholder="密码" />
          </div>
          <div class="login_input">
            <wm-button @click="loginSub()" :disabled="login.dis">{{login.subText}}</wm-button>
          </div>
        </div>
        <div class="login_copy nowrap">{{info.copy}}&nbsp;&nbsp;版本：{{info.version}}</div>
      </div>
    </div>
    <!-- Login End -->

    <!-- Main -->
    <div class="app_body flex" v-show="state.isLogin===true">
      <!-- Left -->
      <div class="app_left scrollbar">
        <div class="app_logo bgImg" :style="{backgroundImage:'url('+require('./assets/logo.svg')+')'}"></div>
        <div class="app_title nowrap">{{info.title}}</div>
        <ul class="app_menus">
          <li v-for="(m1,k1) in state.menus" :key="k1" class="m1" :class="menusPos[0]==k1?'active':''">
            <div class="m1_click" @click="menusClick([k1,0,0])">
              <div class="arrow arrow_left" v-if="m1.children"></div>
              <div class="m1_div"><i class="m1_i" :class="m1.icon"></i></div>
              <p class="m1_p">{{m1.label}}</p>
            </div>
            <ul class="app_menus_list" v-if="m1.children">
              <template v-for="(m2,k2) in m1.children" :key="k2">
                <li class="title flex" @click="m2.checked=!m2.checked">
                  <h2>{{ m2.label }}</h2>
                  <span :style="{transform: m2.checked?'rotate(-0deg)':'rotate(-180deg)'}">
                    <i class="icons icon_arrow_down_bold center"></i>
                  </span>
                </li>
                <template v-if="!m2.checked">
                  <li class="label" v-for="(m3,k3) in m2.children" :key="k3" :class="menusPos[0]==k1 && menusPos[1]==k2 && menusPos[2]==k3?'active':''" @click="menusClick([k1,k2,k3])">{{ m3.label }}</li>
                </template>
              </template>
            </ul>
          </li>
        </ul>
        <div class="app_copy">&copy; {{ info.version }}</div>
      </div>
      <!-- Left End -->
      <!-- Right -->
      <div class="app_right">
        <!-- Top -->
        <div class="app_right_top flex">
          <!-- Search -->
          <div class="app_search">
            <wm-search :data="menusSeaList" @update:active="menusClick(JSON.parse($event))" placeholder="菜单功能" />
          </div>
          <!-- 标题 -->
          <div class="app_top_title">{{ state.menuTitle }}</div>
          <!-- User -->
          <div class="app_user">
            <div class="flex_left">
              <span class="tu bgImg" :style="{backgroundImage:'url('+state.uInfo.img+')'}">
                <i class="icons icon_image" v-if="state.uInfo.img==''"></i>
              </span>
              <span class="name">{{state.uInfo.nickname || '会员昵称'}}</span>
              <span class="ico"><i class="arrow icon_arrow_down_bold"></i></span>
            </div>
            <div class="box">
              <div class="user_info flex_left">
                <div class="ico bgImg" :style="{backgroundImage:'url('+state.uInfo.img+')'}">
                  <i class="icons icon_image" v-if="state.uInfo.img==''"></i>
                </div>
                <div class="info"><h2>{{state.uInfo.uname}}</h2><p>ID:{{state.uInfo.uid}}</p></div>
              </div>
              <ul class="user_list">
                <li @click="menusClick([0],'/UserInfo')">基本信息</li>
                <li @click="menusClick([0],'/UserPasswd')">修改密码</li>
              </ul>
              <div class="user_logout" @click="logout()">退出登录</div>
            </div>
          </div>
        </div>
        <!-- Top End -->
        <div class="app_ct">
          <router-view v-slot="{ Component }">
            <transition :name="transitionName">
              <keep-alive :include="state.keepAlive">
                <component :is="Component" class="view" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
      <!-- Right End -->
    </div>
    <!-- Main End -->
  </div>
</template>

<style lang="less">
/* 表单缩放问题 */
@media only screen and (min-device-width : 320px) and (max-device-width : 1024px) {
  select:focus, textarea:focus, input:focus { font-size: 16px !important; }
}
/* 样式 */
@import url('./assets/style/icon.less');
@import url('./assets/style/ui.less');
@import url('./assets/style/app.less');
</style>
<style lang="less" scoped>
.language{position: absolute; padding: 10px 0; top: 16px; right: 16px;}
.language_text{cursor: pointer; width: 200px; line-height: 40px; text-align: center; border-radius: 20px; color: #CCC; border-radius: 20px; background-color: rgba(0,0,0,.7);}
.language_text:hover{color: @Primary;}
.language_box{display: none; position: absolute; z-index: 1; width: 200px; left: 50%; transform: translate(-50%, 0); margin-left: -4px;}
.language_box .arrow{position: absolute; top: -6px; left: 50%; transform: translate(-50%, 0); width: 0px; height: 0px; border: 8px solid; border-color: transparent; border-bottom-color: rgba(0,0,0,.7);}
.language_list{position: absolute; padding: 4px; width: 100%; top: 9px; border-radius: 4px; color: #FFF; background-color: rgba(0,0,0,.7);}
.language_list li{cursor: pointer; line-height: 40px; padding: 0 16px; border-radius: 4px;}
.language_list li:hover{background-color: @Primary;}
.language_list .active{background-color: @Primary;}
.language:hover .language_box{display: block;}
</style>

<script lang="ts" src="./App.ts"></script>
