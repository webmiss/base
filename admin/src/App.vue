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
            <template slot="prepend"><i class="icons icon_user"></i></template>
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
      <el-aside class="app_menus" :style="{width: $store.state.collapseMenu?'64px':'200px',paddingTop:$store.state.statusBarHeight}">
        <!-- 头像 -->
        <div class="app_img" @click="hideMenus()">
          <div class="bgImg" v-if="$store.state.uInfo.img" :style="{backgroundImage:'url('+$store.state.uInfo.img+')'}"></div>
          <div class="bgImg" v-else></div>
          <p class="nowrap">{{$store.state.uInfo.nickname || '昵称'}}({{$store.state.uInfo.name || '姓名'}})</p>
        </div>
        <!-- 菜单 -->
        <el-menu :default-active="$store.state.defaultMenu" :collapse="$store.state.collapseMenu" unique-opened>
          <el-submenu v-for="(val1,key1) in $store.state.menus" :key="key1" :index="''+val1.id">
            <template slot="title">
              <i class="icons" :class="val1.ico"></i><span>{{val1.title}}</span>
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

    <!-- 右侧菜单 -->
    <ul class="right_menu">
      <li @click="openMsg()"><i class="icons icon_msg"></i><span class="redNum">0</span></li>
    </ul>

    <!-- 消息 -->
    <popup v-model="msg.show">
      <div>12323</div>
    </popup>
    <!-- 消息 End -->

  </div>
</template>

<style>

/* 表单缩放问题 */
@media only screen and (min-device-width : 320px) and (max-device-width : 1024px) { select:focus, textarea:focus, input:focus { font-size: 16px !important; } }

/* 初始化 */
*{margin: 0; padding: 0;}
html,body,#app{height: 100%; overflow: hidden;}
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
.verticalCenter{position: absolute; z-index: 10; left: 50%; top: 50%; transform: translate3d(-50%,-50%,0);}
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
.login_ct .icons{font-size: 24px;}

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
.app_menus .el-submenu__title .icons{width: 24px; height: 24px; line-height: 24px; font-size: 20px; display: inline-block; margin-right: 5px; text-align: center;}
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

/* 右侧菜单 */
.right_menu{position: absolute; z-index: 999; right: 20px; bottom: 20px;}
.right_menu li{width: 48px; height: 48px; line-height: 60px; text-align: center;}
.right_menu .icons{font-size: 32px; color: #6FB737;}
.right_menu .redNum{margin: 5px 0 0 -10px;}

/* 内容 */
.body{padding: 15px; background-color: #FFF;}
.page{padding: 0 20px 20px; text-align: center; background-color: #FFF;}

/* 表单 */
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

.icon_user:before{content: "\e900";}
.icon_passwd:before{content: "\e901";}
.icon_img:before{content: "\e902";}
.icon_camera:before{content: "\e903";}
.icon_more:before{content: "\e904";}
.icon_msg:before{content: "\e905";}

.icon_folder:before{content: "\e906";}
.icon_file_zip:before{content: "\e907";}
.icon_file_text:before{content: "\e908";}
.icon_file_more:before{content: "\e909";}
.icon_file_img:before{content: "\e90a";}
.icon_file_music:before{content: "\e90b";}
.icon_file_video:before{content: "\e90c";}
.icon_file_pdf:before{content: "\e90d";}
.icon_file_word:before{content: "\e90e";}
.icon_file_excel:before{content: "\e90f";}
.icon_home:before{content: "\e910";}
.icon_dasktop:before{content: "\e911";}
.icon_user_info:before{content: "\e912";}
.icon_user_passwd:before{content: "\e913";}
.icon_system:before{content: "\e914";}
.icon_sys_folder:before{content: "\e915";}
.icon_sys_perm:before{content: "\e916";}
.icon_sys_role:before{content: "\e917";}
.icon_sys_config:before{content: "\e918";}
.icon_sys_menu:before{content: "\e919";}
.icon_sys_action:before{content: "\e91a";}
.icon_sys_user:before{content: "\e91b";}
.icon_menu:before{content: "\e91c";}
.icon_app:before{content: "\e91d";}

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
</style>

<script src="./App.js"></script>
