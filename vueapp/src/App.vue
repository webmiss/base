<template>
  <div id="app">
    
    <!-- 更新APP -->
    <div v-if="update.show" class="update_body" :style="{backgroundColor: upDateColor.bg}">
      <div class="update_ct verticalCenter">
        <div class="logo" :style="{backgroundColor: upDateColor.logoBg}"><div></div></div>
        <div class="loading" :style="{backgroundImage: 'linear-gradient(to right, '+upDateColor.loading+', '+upDateColor.loading+' '+update.loading+', '+upDateColor.loaded+' '+update.loading+', '+upDateColor.loaded+' 100%)'}"></div>
        <div class="load_msg" v-html="update.msg">正在加载应用</div>
        <div class="load_button">
          <button class="Button" v-if="update.down" @click="updateDown()" :style="{color:upDateColor.butColor,backgroundColor:upDateColor.butBg,}">{{upDateColor.butText}}</button>
        </div>
      </div>
      <div class="update_logo" :style="{color:upDateColor.copy}"><h1>{{$config.title}}</h1><h2>{{$config.copy}}</h2></div>
    </div>
    <!-- 更新APP End -->

    <!-- 页面 -->
    <transition :name="transitionName">
      <keep-alive :max="keepAlive">
        <router-view class="view" :class="mode=='dark'?'view_dark':''" v-if="$route.meta.keepAlive"></router-view>
        <router-view class="view" :class="mode=='dark'?'view_dark':''" v-if="!$route.meta.keepAlive" :key="'time'+new Date().getTime()"></router-view>
      </keep-alive>
    </transition>
    <!-- 页面 End -->

  </div>
</template>

<style>
/* 字体图标 */
@import url('./assets/icon.css');
/* UI */
@import url('./assets/ui.css');

/* 表单缩放问题 */
@media only screen and (min-device-width : 320px) and (max-device-width : 1024px) { select:focus, textarea:focus, input:focus { font-size: 16px !important; } }

/* 初始化 */
*{margin: 0; padding: 0;}
html,body,#app{height: 100%;}
body{
  font-family:Microsoft YaHei,SimHei,helvetica,arial,verdana,tahoma,sans-serif;
  font-size: 14px;
  color: #333;
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
img{vertical-align: top;}
i{font-style: normal;}

/* 公共 */
.html{height: 100%;}
.Link{color: #6FB737;}
.back{display: inline-block; width: 32px; text-align: center;}
.back.icons{color: rgba(88,88,88,1);}
.loading{line-height: 100px; color: #999; background-color: #F2F2F2; text-align: center;}
.redNum{position: absolute; padding: 0 5px; margin-top: -5px; line-height: 16px; color: #FFF; font-size: 12px; font-weight: normal; border-radius: 10px; background-color: #FF0000;}
.bgImg{background-size: cover; background-position: center; background-repeat: no-repeat;}
.bgTu{width: 100%; height: 100%; border-radius: 50%;}
.divCenter{position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto;}
.ctCenter{position: absolute; margin: 0 auto; left: 0; right: 0;}
.verticalCenter{position: absolute; z-index: 10; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0);}
.null{text-align: center; color: #999; line-height: 100px;}
.null::before{content: '暂无数据！';}
.bLine{text-align: center; color: #999; line-height: 50px;}
.bLine::before{content: '我是有底线的';}
.hide{display: none;}
.mTop1{margin-top: 1px;}
.mTop10{margin-top: 10px;}
/* 公共-深色 */
.back_dark.icons{color: #FFF;}

/* 切换动画 */
.view{position: fixed; z-index: 0; width:100%; height: 100%; transition: all .6s cubic-bezier(0.075, 0.82, 0.165, 1); background-color: #FFF;}
.view_dark{background-color: #242628;}
.slide-left-enter,.slide-right-leave-active{z-index: 1; transform: translate(100%,0);}
.slide-right-enter,.slide-left-leave-active{z-index: -1; transform: translate(-30%,0);}

/* 更新 */
.update_body{position: absolute; z-index: 999; width: 100%; height: 100%}
.update_logo{position: fixed; width: 100%; left: 0; bottom: 15px; line-height: 20px; text-align: center; padding: 10px 0;}
.update_logo h1{font-size: 16px;}
.update_logo h2{font-size: 10px; font-weight: normal;}
.update_ct{width: 220px;}
.update_ct .logo{width: 120px; height: 120px; margin: 0px auto 20px; border-radius: 50%;}
.update_ct .logo div{height: 100%; background: url('./assets/logo.svg') no-repeat center; background-size: 65%;}
.update_ct .loading{height: 5px; border-radius: 5px;}
.update_ct .load_msg{color: #FFF; text-align: center; padding: 8px 0; font-size: 14px;}
.update_ct .load_button{text-align: center; padding-top: 16px;}
.update_ct .load_button button{width: auto; height: 36px; line-height: 36px; padding: 0 20px; font-size: 14px;}

/* 布局 */
.flex{display: flex; justify-content: space-between; flex-wrap: wrap;}
.flex.center{align-items: center;}
.flex_left{display: flex; justify-content: flex-start; flex-wrap: wrap;}
.flex_right{display: flex; justify-content: flex-end; flex-wrap: wrap;}
.flex_center{display: flex; align-items: center; justify-content: center; height: 100%;}
.flex_nowrap{display: flex; justify-content: space-around; flex-direction: row; white-space:nowrap;}
.flex_in{display: flex; justify-content: center; align-items:center;}
.nowrap{overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.nowrap_text{overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
.nowrap_three{overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;}

/* 箭头 */
.arrow_left{width: 0px; height: 0px; border: 10px solid; border-color:transparent #FFF transparent transparent;}
.arrow_right{width: 0px; height: 0px; border: 10px solid; border-color:transparent transparent transparent #FFF;}
.arrow_up{width: 0px; height: 0px; border: 10px solid; border-color:transparent transparent #FFF transparent;}
.arrow_down{width: 0px; height: 0px; border: 10px solid; border-color:#FFF transparent transparent transparent;}

/* 表单 */
.Input,.Button{border: none; background: none; font-size: 16px;}
.Input{width: calc(100% - 20px); padding: 10px; height: 32px; line-height: 32px; color: #333;}
.Button{width: 100%; height: 48px; line-height: 48px; text-align: center; margin: 0 auto; border-radius: 24px; color: #FFF; background-color: #6FB737;}
.Input_dark{color: #FFF;}

/* 底部导航 */
.nav_body{height: calc(100% - 50px);}

/* Html */
.htmlBody{margin: 1px 0; padding: 15px; background-color: #FFF;}
.htmlOther{padding: 10px 0; font-size: 14p; color: #999;}
.htmlCt{overflow: hidden; font-size: 16px; line-height: 28px;}
.htmlCt img{width: 100%; height: auto; padding: 10px 0;}

/* 菜单 */
.Menu{overflow: hidden; padding: 0 15px; height: 50px; line-height: 50px; background-color: #FFF;}
.Menu .h2{float: left; font-size: 16px; font-weight: normal;}
.Menu .info{font-size: 14px; padding: 0 15px;}
.Menu .info .redNum{margin-top: 8px;}
.Menu .more{overflow: hidden; float: right; height: 50px; font-size: 14px; color: #999; max-width: 70%;}
.Menu .more .icons{font-size: 16px; color: #999;}
.Menu_dark{color: #FFF; background-color: #323436;}

/* 搜索 */
.Search{margin: 0 auto;}
.Search .input{height: 40px; line-height: 40px; font-size: 14px; padding: 0 10px; border-radius: 20px; background-color: #F2F2F2; color: #999;}
.Search .input span{padding-left: 10px;}

/* UI */
body .van-grid-item__content::after,body .van-hairline--top::after{border-color: #FFF;}
.van-overlay{z-index: 1000;}
.van-popup{overflow-y: initial;}
.van-popup--bottom.van-popup--round{border-radius: 10px 10px 0 0; max-height: calc(100% - 80px);}
body .van-tab--active{color: #6FB737;}
body .van-tabs__line{background-color: #6FB737;}
body .van-dialog__header{font-size: 18px;}
</style>

<script src="./App.js"></script>
