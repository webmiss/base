<template>
  <div id="app">

    <!-- 声音 -->
    <audio id="msg" style="display: none"></audio>
    
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
.verticalCenter{position: absolute; z-index: 10; top: 50%; left: 0; right: 0; margin: 0 auto; transform: translate3d(0,-50%,0);}
.null{text-align: center; color: #999; line-height: 100px;}
.null::before{content: '暂无数据！';}
.bLine{text-align: center; color: #999; line-height: 50px;}
.bLine::before{content: '我是有底线的';}
.noDisplay{display: none;}
.mTop1{margin-top: 1px;}
.mTop10{margin-top: 10px;}
/* 公共-深色 */
.back_dark.icons{color: #FFF;}

/* 切换动画 */
.view{position: fixed; z-index: 0; width:100%; height: 100%; transition: all .6s cubic-bezier(0.075, 0.82, 0.165, 1); background-color: #F2F2F2;}
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

/*
* ICO-字体图标
* 图标生成: https://icomoon.io/app/#/select
* 转Base64: https://transfonter.org/
*/
@font-face {
    font-family: 'icomoon';
    src: url(data:application/font-woff2;charset=utf-8;base64,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) format('woff2'),
        url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
    font-weight: normal;
    font-style: normal;
}
.icons{font-family: 'icomoon' !important; font-size: 16px;}
.icon_img:before{content: "\e900";}
.icon_camera:before{content: "\e901";}
.icon_up:before{content: "\e902";}
.icon_down:before{content: "\e903";}
.icon_left:before{content: "\e904";}
.icon_right:before{content: "\e905";}
.icon_yes:before{content: "\e906";}
.icon_close:before{content: "\e907";}
.icon_search:before{content: "\e908"; font-size: 22px;}
.icon_scan:before{content: "\e909"; font-size: 22px;}
.icon_qrcode:before{content: "\e90a"; font-size: 22px;}
.icon_tel:before{content: "\e90b";}
.icon_passwd:before{content: "\e910";}
.icon_code:before{content: "\e911";}
.icon_service:before{content: "\e912";}
.icon_cart:before{content: "\e913";}
.icon_config:before{content: "\e914"; font-size: 22px;}
.icon_clear:before{content: "\e915";}
.icon_menu:before{content: "\e916";}
.icon_more:before{content: "\e917";}

.icon_home:before{content: "\e918"; font-size: 22px; }
.icon_msg:before{content: "\e919"; font-size: 24px; }
.icon_me:before{content: "\e920"; font-size: 22px; }

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
