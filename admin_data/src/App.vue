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

    <!-- 登录 -->
    <el-container v-show="$store.state.isLogin===false" class="login_body bgImg bgcover" v-if="$store.state.system.login_bg" :style="{backgroundImage:'url('+$store.state.system.login_bg+')'}">
      <div class="login_ct verticalCenter">
        <div class="logo flex_center">
          <div class="bgImg bgTu" v-if="!$store.state.system.logo"></div>
          <div class="bgImg bgTu" v-else :style="{backgroundImage:'url('+$store.state.system.logo+')'}"></div>
          <h1 class="nowrap">{{$store.state.system.title}}</h1>
        </div>
        <h2>会员登录</h2>
        <div class="item">
          <el-input v-model="login.uname" maxlength="32" placeholder="用户名/手机/邮箱">
            <template slot="prepend"><i class="icons icon_tel"></i></template>
          </el-input>
        </div>
        <div class="item">
          <el-input v-model="login.passwd" type="password" maxlength="16" placeholder="请输入密码">
            <template slot="prepend"><i class="icons icon_passwd"></i></template>
          </el-input>
        </div>
        <div class="item">
          <el-button @click="loginSub()" type="primary" style="width:100%" :disabled="login.dis">{{login.subText}}</el-button>
        </div>
        <div class="copy nowrap">&copy; {{$store.state.system.copy}} license&nbsp;&nbsp;版本：{{$config.version}}</div>
      </div>
    </el-container>
    <!-- 登录 End -->

    <!-- 主要框架 -->
    <el-container  v-show="$store.state.isLogin===true" class="app_body">
      <!-- 导航菜单 -->
      <el-aside class="app_menus" :style="{width: isCollapse?'64px':'200px',paddingTop:$store.state.statusBarHeight}">
        <!-- 头像 -->
        <div class="app_img" @click="hideMenus()">
          <div class="bgImg" v-if="$store.state.uInfo.img" :style="{backgroundImage:'url('+$store.state.uInfo.img+')'}"></div>
          <div class="bgImg" v-else></div>
          <p class="nowrap">{{$store.state.uInfo.nickname || '昵称'}}({{$store.state.uInfo.name || '姓名'}})</p>
        </div>
        <!-- 菜单 -->
        <el-menu :default-active="defaultMenu" :collapse="isCollapse" unique-opened>
          <el-submenu v-for="(val1,key1) in $store.state.menus" :key="key1" :index="''+val1.id">
            <template slot="title">
              <i :class="val1.ico"></i><span>{{val1.title}}</span>
            </template>
            <div v-for="(val2,key2) in val1.menus" :key="key2">
              <el-menu-item v-if="val2.menus.length==0" :index="''+val2.id" @click="openUrl(val2.ico,val2.url,''+val2.id,val2.title)">{{val2.title}}</el-menu-item>
              <el-submenu v-else :index="''+val2.id">
                <template slot="title"><span>{{val2.title}}</span></template>
                <el-menu-item v-for="(val3,key3) in val2.menus" :key="key3" :index="''+val3.id" @click="openUrl(val3.ico,val3.url,''+val3.id,val3.title)">{{val3.title}}</el-menu-item>
              </el-submenu>
            </div>
          </el-submenu>
        </el-menu>
        <!-- 版本 -->
        <div class="app_version nowrap">版本：{{$config.version}}</div>
      </el-aside>
      <!-- 导航菜单 End -->
      <el-container :style="{paddingTop:$store.state.statusBarHeight}">
        <!-- 头部信息 -->
        <el-header class="app_top flex">
          <div class="name">{{ storage.getItem('MenuName') || $store.state.system.title}} <i class="el-icon-arrow-right"></i></div>
          <!-- 登录信息 -->
          <div class="uinfo">
            <b>{{ $store.state.uInfo.uname }}</b>&nbsp;&nbsp;
            <el-button type="text" @click="openConfig()">设置</el-button>
            <span class="split">|</span>
            <span class="logout" @click="logout()">退出</span>
          </div>
        </el-header>
        <!-- 中间部分 -->
        <el-main class="app_main">
          <router-view/>
          <div class="app_copy">所属：{{$store.state.system.title}}&nbsp;&nbsp;&copy; {{$store.state.system.copy}}&nbsp;&nbsp;版本：{{$config.version}}</div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 主要框架 End -->

    <!-- 系统配置 -->
    <el-dialog :title="config.title" :visible.sync="config.show" center width="360px">
      <el-form label-width="120px">
        <el-form-item label="消息朗读">
          <el-switch v-model="config.is_msg_audio" @change="subConfig('is_msg_audio')"></el-switch>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<style>

/* 表单缩放问题 */
@media only screen and (min-device-width : 320px) and (max-device-width : 1024px) { select:focus, textarea:focus, input:focus { font-size: 16px !important; } }

/* 初始化 */
*{margin: 0; padding: 0;}
html,body,#app{height: 100%;}
a{cursor: pointer; color: #6FB737; text-decoration: none;}
a:hover{color: #FF6600;}
body{
  font-family:Microsoft YaHei,SimHei,helvetica,arial,verdana,tahoma,sans-serif;
  font-size: 14px;
  color: #333;
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
ul{list-style: none;}
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
.hide{display: none;}
.mTop1{margin-top: 1px;}
.mTop10{margin-top: 10px;}
.split{padding: 0 10px; color: #DADCDF;}

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

/* 登录 */
.login_body{position: fixed; z-index: 99; left: 0; top: 0; width: 100%; height: 100%;}
.login_ct{width: calc(100% - 120px); max-width: 280px; padding: 10px 50px; background-color: #FFF; box-shadow: 0 0 10px rgba(0,0,0,.3); border-radius: 8px;}
.login_ct h2{line-height: 50px; text-align: center; font-size: 16px; color: #666;}
.login_ct .item{padding: 5px 0; margin: 8px 0;}
.login_ct .logo{position: absolute; width: 100%; height: 40px; line-height: 40px; padding: 10px 0; margin: -70px 0 0 -50px;}
.login_ct .logo div{width: 40px; height: 40px;}
.login_ct .logo h1{font-size: 18px; padding-left: 10px; color: #FFF; text-shadow: 0 0 3px rgba(0,0,0,0.3);}
.login_ct .copy{position: absolute; margin: 40px 0 0 -50px; width: 100%; font-size: 12px; text-align: center;}
.login_ct .icon_tel{font-size: 24px;}
.login_ct .icon_passwd{font-size: 22px;}

/* 主要框架 */
.app_body{height: 100%;}
.app_main{background-color: #FFF; padding: 0;}
.app_copy{line-height: 50px; font-size: 12px; color: #CCC; text-align: center;}

/* 头像 */
.app_menus{background-color: #20222A; color: #CCC;}
.app_img{cursor: pointer; padding: 20px 0; min-width: 64px;}
.app_img div{margin: 0 auto; width: 40%; padding-bottom: 40%; height: 0; border-radius: 50%; background-color: #F2F2F2;}
.app_img p{text-align: center; padding: 10px 5px 0; color: #6FB737; font-size: 14px;}
.app_img:hover p{color: #ff6600;}

/* 菜单 */
.app_menus .el-menu{border: none;}
.app_menus .el-submenu__title{height: 46px; line-height: 46px; color: #CCC;}
.app_menus .el-submenu__title:hover{background-color: #30333A;}
.app_menus .el-submenu__title .fa{font-size: 21px; margin-right: 10px; color: #666;}
.app_menus .el-submenu__title .icons{width: 24px; height: 24px; line-height: 24px; display: inline-block; margin-right: 8px;}
.app_menus .el-submenu .el-menu-item{height: 36px; line-height: 36px; color: #FFF;}
.app_menus ul{background-color: #20222A;}
.app_menus .el-menu-item:hover{background-color: #30333A; color: #6FB737;}
.app_menus .el-menu-item:hover i{color: #FFF;}
.app_menus .el-menu-item.is-active{background-color: #6FB737; color: #FFF;}
.app_version{min-width: 54px; padding: 0 5px; line-height: 30px; margin-top: 20px; text-align: center; color: #555; font-size: 12px; border-top: #000 1px solid;}

/* 用户头部 */
.app_top{padding: 5px 20px; line-height: 50px; background-color: #FFF; border-bottom: #F2F2F2 1px solid;}
.app_top .name{color: #999;}
.app_top .uinfo{color: #666;}
.app_top .uinfo .logout{cursor: pointer; color: #FF6600;}

/* 动作菜单 */
.action{padding: 15px 15px 0; overflow-x: auto;}
.action .el-button-group{min-width: 640px;}

/* 内容 */
.body{padding: 15px; background-color: #FFF;}
.page{padding: 0 20px 20px; text-align: center; background-color: #FFF;}

.select_left{float: left;}
.select_right{float: right; color: #8492a6; font-size: 12px}

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
.icon_img:before{content: "\e600";}
.icon_msg:before{content: "\e601";}

.icon_folder:before{content: "\e800";}
.icon_file_zip:before{content: "\e801";}
.icon_file_text:before{content: "\e802";}
.icon_file_more:before{content: "\e803";}
.icon_file_img:before{content: "\e804";}
.icon_file_music:before{content: "\e805";}
.icon_file_video:before{content: "\e806";}
.icon_file_pdf:before{content: "\e807";}
.icon_file_word:before{content: "\e808";}
.icon_file_excel:before{content: "\e809";}
.icon_home:before{content: "\e901";}
.icon_dasktop:before{content: "\e902";}
.icon_user_info:before{content: "\e903";}
.icon_user_passwd:before{content: "\e904";}
.icon_system:before{content: "\e905";}
.icon_sys_folder:before{content: "\e906";}
.icon_sys_perm:before{content: "\e907";}
.icon_sys_role:before{content: "\e910";}
.icon_sys_config:before{content: "\e911";}
.icon_sys_menu:before{content: "\e912";}
.icon_sys_action:before{content: "\e913";}
.icon_sys_user:before{content: "\e914";}
.icon_menu:before{content: "\e915";}
.icon_app:before{content: "\e916";}

/* UI */
body .el-input-group__prepend{padding: 0 10px;}
/* 弹出层-居中 */
.el-dialog{position: absolute; border-radius: 5px; top: 50%; left: 50%; margin: 0 !important; transform: translate(-50%, -50%); max-height: calc(100% - 10px); max-width: calc(100% - 10px); display: flex; flex-direction: column;}
.el-dialog .el-dialog__body{overflow: auto; color: #666666;}
.el-dialog--center .el-dialog__body{padding: 10px 15px;}
.el-dialog--center .el-dialog__footer{padding: 10px 20px 20px;}
/* 单选 */
.el-radio{margin-right: 20px;}
.el-radio__inner{border: #999 1px solid;}
/* Tree */
.el-tree-node__content{height: 32px;}
.tree_node{flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;}
.tree_node_title{padding: 8px 10px; font-weight: bold;}
.tree_node_title dd{padding: 0 10px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.tree_node_width dd{padding: 0 10px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}

/* 编辑器 */
body .tox-silver-sink{z-index: 3000;}



















/* .imgbody{cursor: pointer; display: block; margin: 5px 0; width: 60px; height: 30px; line-height: 30px; text-align: center; background-color: #6FB737; color: #FFF; box-shadow: 0 0 3px rgba(0,0,0,.5);}
.bgimg{background-color: #F2F2F2; border-radius: 3px; background-image: url('assets/public/img.svg'); background-size: 60%; background-position: center; background-repeat: no-repeat;}
.bgcover{background-size: cover;}
.radius{border-radius: 50%;}

.imgs li{cursor: pointer; width: 33%; height: 18vmin; line-height: 18vmin; border: #FFF 8px solid; background-color: #F2F4F6; box-sizing: border-box;}
.imgs li:hover i{color: #6FB737;}
.imgs li:hover .del{color: #FF6600;}
.imgs label{display: inline-block; width: 100%; height: 100%; text-align: center;}
.imgs div{width: 100%; height: 100%;}
.imgs i{font-size: 32px;}
.imgs .del{position: absolute; font-size: 24px; color: #FF6600; margin-left: calc(33% - 43px); margin-top: -10px;}





/* UI框架 */
/* .el-table{color: #333; margin: 5px 0;}
.el-form-item{margin: 20px 0;}
.el-checkbox{margin-right: 15px;}
.el-checkbox__label{padding-left: 5px;}
.el-card__header{padding: 10px 15px;}
.el-card__body{padding: 8px 15px;}
.el-form-item__error{z-index: 10;}
.el-form-item__content{color: #333;}
.el-timeline{padding: 0 10px;}
.el-timeline-item{padding: 10px 0;} */
/* 加载动画 */
/* .el-loading-mask{background-color: rgba(0,0,0,0.3);} */



/* Tabs */
/* .form .el-tabs__header{position: fixed; z-index: 10; width: calc(100% - 30px); margin-top: -20px; background-color: #FFF;}
.form .el-tabs__content{padding-top: 30px;} */
/* .form .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{box-shadow: none;} */

/* 消息 */
/* .msg_body .el-dialog{background-color: #F2F2F2;}
.msg_body .el-dialog__header{text-align: left; padding-left: 220px;}
.msg_body .el-container{height: 400px;}
.msg_body .el-dialog__body{padding: 0; overflow: hidden;}
.msg_body .el-textarea__inner{padding: 5px 10px; border: none;}

.msg_title{font-size: 16px;}
.msg_title span{cursor: pointer;}
.msg_title i{color: #666;}
.msg_title_tool{overflow: hidden;}
.msg_title_tool li{padding: 8px 0;}

.msg_left{border-right: #DADCDF 1px solid; background-color: #FFF; border-radius: 0 0 0 5px;}
.msg_sea{position: absolute; width: 210px; height: 50px; margin-top: -50px; text-align: center; box-sizing: border-box; border-right: #DADCDF 1px solid; background-color: #FFF; border-radius: 5px 0 0 0;}
.msg_sea .sea{width: calc(100% - 30px); margin: 10px auto 0;}
.msg_sea .sea input{background-color: #F2F4F6;}
.msg_group{overflow: hidden;}
.msg_group li{cursor: pointer; padding: 10px; border-bottom: #DADCDF 1px solid;}
.msg_group li:hover{background-color: #F2F2F2;}
.msg_group .img{width: 48px; height: 48px; background-repeat: no-repeat; background-size: cover; border-radius: 5px;}
.msg_group .ct{width: calc(100% - 58px);}
.msg_group .title{line-height: 24px;}
.msg_group .title h2{font-size: 14px; width: calc(100% - 36px);}
.msg_group .title span{font-size: 12px; color: #999;}
.msg_group .text{line-height: 22px; font-size: 12px; color: #999;}
.msg_group .el-badge{position: absolute; margin: -6px 0 0 36px;}
.msg_right{width: 100%; border-top: #DADCDF 1px solid;}
.msg_html{overflow: hidden; width: 100%; height: calc(100% - 131px); color: #000;}
.msg_ct{padding: 5px 10px;}
.msg_ct .head{width: 64px; text-align: center;}
.msg_ct .head i{display: inline-block; width: 44px; height: 44px; border-radius: 5px; background: no-repeat center; background-size: cover;}
.msg_ct .msgCt{max-width: calc(100% - 170px); font-size: 14px; line-height: 22px; padding: 10px 15px; background: #FFF; border-radius: 3px;}
.msg_ct .mebg{background: #9FF048;}
.msg_ct .arrow_left,.msg_ct .arrow_right{margin-top: 12px;}
.msg_ct .flex_left,.msg_ct .flex_right,.msg_ct_time{margin: 10px 0;}
.msg_ct .flex_right .arrow_right{border-color:transparent transparent transparent #9FF048;}
.msg_ct_time{text-align: center; color: #999; font-size: 12px;}
.msg_send{width: 100%; border-top: #DADCDF 1px solid;}
.msg_tool{padding: 5px 10px;}
.msg_tool_ico{overflow: hidden;}
.msg_tool_ico li{width: 30px; margin-right: 10px;}
.msg_tool .el-button--small, .el-button--small.is-round{padding: 8px 30px;}
.msg_tool .ico_mask{cursor: pointer;}
.msg_seng_ct .el-textarea__inner{background-color: #F2F2F2; height: 90px;} */





/* 内容 */
/* .body{padding: 15px; background-color: #FFF;}
.page{padding: 0 20px 20px; text-align: center; background-color: #FFF;}

.form_print{text-align: center; padding: 10px 0;}
.form_print h1{font-size: 20px; padding: 10px 0;}
.form_print p{font-size: 14px; color: #666;}

.form_title{overflow: hidden; width: 100%; padding: 8px 0; font-size: 15px;}
.form_title b{line-height: 27px;}
.form .el-form-item{float: left; width: 50%; margin: 10px 0;}
.form .el-row{line-height: 24px;} */



/* 右侧菜单 */
/* .right_menus{position: fixed; z-index: 99; right: 25px; bottom: 15px;}
.right_menus li{cursor: pointer; width: 45px; height: 45px; margin: 10px 0; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,.3);}
.right_menus i{display: inline-block; width: 100%; height: 100%; background-color: #FFF;}
.right_menus .ico_wechat{mask-size: auto 60%;}
.right_menus .ico_qrcode{mask-size: auto 50%;}
.right_menus .el-badge{position: absolute; margin-left: 34px;} */

/* 扫码 */
/* .app_qrcode_ct{position: absolute; z-index: 1000; top: 0; width: 100%; height: 100%; background-color: #000;}
.app_qrcode_ct .title{padding: 40px 20px 20px; color: #FFF;}
.app_qrcode_ct .title h2{font-size: 18px;}
.app_qrcode_ct .title i{cursor: pointer; font-size: 24px;}
.app_qrcode_ct .qrbody{height: calc(100% - 84px);} */

/* ICO */
/* .ico_mask{mask-position: center; mask-repeat: no-repeat; background-color: #666;}
.ico_input{position: absolute; width: 24px; height: 24px; margin: -12px 0 0 -12px;}
.ico_input i{display: inline-block; width: 100%; height: 100%; background-color: #999;}

.ico_other{mask-image: url('assets/ico/other.svg'); mask-size: auto 90%;}
.ico_camera{mask-image: url('assets/ico/camera.svg'); mask-size: auto 90%;}
.ico_qrcode{mask-image: url('assets/ico/qrcode.svg'); mask-size: auto 90%;}
.ico_wechat{mask-image: url('assets/ico/wechat.svg'); mask-size: auto 90%;}

.ico_home{mask-image: url('assets/ico/home.svg'); mask-size: auto 90%;}
.ico_msg{mask-image: url('assets/ico/msg.svg'); mask-size: auto 90%;}
.ico_userinfo{mask-image: url('assets/ico/userinfo.svg'); mask-size: auto 90%;}
.ico_passwd{mask-image: url('assets/ico/passwd.svg'); mask-size: auto 90%;}

.ico_system{mask-image: url('assets/ico/system.svg'); mask-size: auto 90%;}
.ico_user{mask-image: url('assets/ico/user.svg'); mask-size: auto 90%;}
.ico_role{mask-image: url('assets/ico/role.svg'); mask-size: auto 90%;}
.ico_config{mask-image: url('assets/ico/config.svg'); mask-size: auto 90%;}
.ico_menu{mask-image: url('assets/ico/menu.svg'); mask-size: auto 90%;}
.ico_action{mask-image: url('assets/ico/action.svg'); mask-size: auto 90%;}
.ico_folder{mask-image: url('assets/ico/folder.svg'); mask-size: auto 90%;}
.ico_file{mask-image: url('assets/ico/file.svg'); mask-size: auto 90%;}

.ico_platform{mask-image: url('assets/ico/platform.svg'); mask-size: auto 70%;} */


</style>

<script src="./App.js"></script>
