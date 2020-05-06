<template>
<v-touch v-on:swiperight="back()">
  <page-view :bgColor="mode=='dark'?'#323436':'#FFF'" :color="mode=='dark'?'#FFF':'#333'">
    <div slot="left"><i class="back icons icon_left" :class="mode=='dark'?'back_dark':''" @click="back()"></i></div>
    <div slot="title">登录</div>
    <div slot="body" class="html" :class="mode=='dark'?'html_dark':''">
      <!-- 登录 -->
      <div class="login verticalCenter" :class="mode=='dark'?'login_dark':''">
        <!-- Logo -->
        <div class="logo">
          <img src="../../assets/icon/logo.svg" />
        </div>
        <div class="logo_text">webmis.vip</div>
        <!-- 表单 -->
        <div class="login_list" :class="mode=='dark'?'login_list_dark':''">
          <div class="item">
            <span class="icons icon_tel"></span>
            <input type="tel" class="Input" :class="mode=='dark'?'Input_dark':''" placeholder="请输入手机号码" />
          </div>
          <div class="item">
            <span class="icons icon_passwd"></span>
            <input type="password" class="Input" :class="mode=='dark'?'Input_dark':''" placeholder="密码" />
          </div>
        </div>
        <!-- 按钮 -->
        <div class="login_an">
          <button class="Button">登 录</button>
        </div>
        <!-- 其他 -->
        <div class="login_link flex" :class="mode=='dark'?'login_link_dark':''">
          <span class="span">忘记密码?</span>
          <span class="span">注册</span>
        </div>
      </div>
      <!-- 登录 End -->
    </div>
  </page-view>
</v-touch>
</template>

<style scoped>
.html{background-color: #FFF;}
.login{max-width: 280px;}
.login .logo{width: 100px; margin: 0 auto;}
.login .logo img{width: 100%; height: 62px;}
.login .logo_text{line-height: 24px; font-size: 18px; text-align: center;}
.login_list{padding: 20px 0;}
.login_list .item{position: relative; border-bottom: #EAECEF 1px solid;}
.login_list .icons{position: absolute; width: 40px; text-align: center; color: #6FB737; top: 50%; transform: translate3d(0,-50%,0);}
.login_list .icon_tel{font-size: 24px;}
.login_list .icon_passwd{font-size: 22px;}
.login_list .Input{padding-left: 40px; width: calc(100% - 50px);}
.login_an{padding: 16px 0; text-align: center;}
.login_an .Button{width: 90%;}
.login_link{line-height: 30px;}
.login_link .span{padding: 0 16px;}
/* 深色 */
.html_dark{background-color: #323436;}
.login_dark .logo_text{color: #999;}
.login_list_dark .item{border-bottom: #242628 1px solid;}
.login_link_dark{color: #FFF;}
</style>

<script src="./Login.js"></script>