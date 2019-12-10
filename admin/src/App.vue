<template>
  <div id="app">

    <!-- 声音 -->
    <audio id="msg" style="display: none"></audio>
    
    <!-- 更新APP -->
    <div v-if="update.show" class="update_body" :style="{backgroundColor: upDateColor.bg || $config.themeColor}">
      <div class="update_ct">
        <div class="logo" :style="{backgroundColor: upDateColor.logoBg}"><div></div></div>
        <div class="loading" :style="{backgroundImage: 'linear-gradient(to right, '+upDateColor.loading+', '+upDateColor.loading+' '+update.loading+', '+upDateColor.loaded+' '+update.loading+', '+upDateColor.loaded+' 100%)'}"></div>
        <div class="load_msg" v-html="update.msg">正在加载应用</div>
        <div class="load_button">
          <el-button round v-if="update.down" @click="updateDown()" size="small" :style="{color: $config.themeColor}">下载并安装</el-button>
        </div>
      </div>
      <div class="update_logo" :style="{color:upDateColor.copy}"><h1>{{$config.title}}</h1><h2>{{$config.copy}}</h2></div>
    </div>
    <!-- 更新APP End -->

    <!-- 登录 -->
    <el-container v-show="!isLogin" class="login_body bgimg bgcover" v-if="system.login_bg" :style="{backgroundImage:'url('+$config.baseUrl+system.login_bg+')'}">
      <div class="login_ct">
        <div class="logo flex_center">
          <div class="bgimg radius" v-if="!system.logo"></div>
          <div class="bgimg radius bgcover" v-else :style="{backgroundImage:'url('+$config.baseUrl+system.logo+')'}"></div>
          <h1 class="nowrap">{{system.title}}</h1>
        </div>
        <h2>用户登录</h2>
        <div class="item">
          <el-input v-model="login.uname" placeholder="用户名/手机/邮箱">
            <template slot="prepend"><label class="ico_input"><i class="ico_mask ico_user"></i></label></template>
          </el-input>
        </div>
        <div class="item">
          <el-input v-model="login.passwd" type="password" placeholder="请输入密码">
            <template slot="prepend"><label class="ico_input"><i class="ico_mask ico_passwd"></i></label></template>
          </el-input>
        </div>
        <div class="item">
          <el-button @click="loginSub()" type="primary" style="width:100%" :disabled="login.dis">{{login.subText}}</el-button>
        </div>
        <div class="copy nowrap">&copy; {{system.copy}} license&nbsp;&nbsp;版本：{{$config.version}}</div>
      </div>
    </el-container>
    <!-- 登录 End -->

    <!-- 主要框架 -->
    <el-container  v-show="isLogin" class="app_body">
      <!-- 导航菜单 -->
      <el-aside class="app_menus" :style="{width: isCollapse?'64px':'200px'}">
        <!-- 头像 -->
        <div class="app_img" @click="openUrl('ico_mask ico_userinfo','UserInfo','11','基本资料',true)">
          <div class="bgimg bgcover" v-if="uinfo.img" :style="{backgroundImage:'url('+$config.baseUrl+uinfo.img+')'}"></div>
          <div class="bgimg" v-else></div>
          <p class="nowrap">{{uinfo.nickname || '昵称'}}({{uinfo.name || '姓名'}})</p>
        </div>
        <!-- 菜单 -->
        <el-menu :default-active="defaultMenu" :collapse="isCollapse" unique-opened>
          <el-submenu v-for="(val1,key1) in menus" :key="key1" :index="''+val1.id">
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
      <el-container>
        <!-- 头部信息 -->
        <el-header class="app_top flex">
          <el-tooltip class="logo" effect="dark" content="点击”收缩/展开“左侧菜单" placement="bottom-start">
            <a @click="hideMenus()"><i class="el-icon-menu"></i> {{ $storage.getItem('MenuName') || system.title}}</a>
          </el-tooltip>
          <div class="flex">
            <!-- 功能图标 -->
            <div class="menu_ico flex_center">
              <el-badge :value="msgNew">
                <i class="c_main el-icon-chat-line-round" @click="openUrl('ico_mask ico_msg','WebMsg','4','我的消息',true)"></i>
              </el-badge>
            </div>
            <!-- 登录信息 -->
            <div class="uinfo">{{uinfo.position}}({{uinfo.uname || '系统用户'}})&nbsp;&nbsp;|&nbsp;&nbsp;<span @click="logout()">退出</span></div>
          </div>
        </el-header>
        <!-- 中间部分 -->
        <el-main class="app_main">
          <router-view/>
          <div class="app_copy">所属：{{system.title}}&nbsp;&nbsp;&copy; {{system.copy}}&nbsp;&nbsp;版本：{{$config.version}}</div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 主要框架 End -->

  </div>
</template>

<style>
/* 初始化 */
*{margin: 0; padding: 0;}
html,body,#app{height: 100%; font-size: 14px; color: #666;}
a{cursor: pointer; color: #6FB737; text-decoration: none;}
a:hover{color: #FF6600;}
ul{list-style: none;}
img{border: none; vertical-align: top;}
@media only screen and (min-device-width : 320px) and (max-device-width : 1024px) { select:focus, textarea:focus, input:focus { font-size: 16px !important; } }

/* 公共 */
.mtop{margin-top: 15px;}
.hide{display: none;}
.c_main{color: #6FB737;}
.null{text-align: center; color: #999; line-height: 100px;}
.null::before{content: '暂无数据！';}
.font12{font-size: 12px;}
.font16{font-size: 16px;}

.imgbody{cursor: pointer; display: block; margin: 5px 0; width: 60px; height: 30px; line-height: 30px; text-align: center; background-color: #6FB737; color: #FFF; box-shadow: 0 0 3px rgba(0,0,0,.5);}
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

.select_left{float: left;}
.select_right{float: right; color: #8492a6; font-size: 12px}

.flex{display: flex; justify-content: space-between; flex-wrap: wrap;}
.flex_left{display: flex; justify-content: flex-start; flex-wrap: wrap;}
.flex_right{display: flex; justify-content: flex-end; flex-wrap: wrap;}
.flex_center{display: flex; justify-content: center;}
.nowrap{overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.nowrap_text{overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}

/* 编辑器 */
body .tox-silver-sink{z-index: 3000;}

/* UI框架 */
.el-table{color: #333; margin: 5px 0;}
.el-form-item{margin: 20px 0;}
.el-checkbox{margin-right: 15px;}
.el-checkbox__label{padding-left: 5px;}
.el-card__header{padding: 10px 15px;}
.el-card__body{padding: 8px 15px;}
.el-form-item__error{z-index: 10;}
.el-form-item__content{color: #333;}
.el-timeline{padding: 0 10px;}
.el-timeline-item{padding: 10px 0;}
/* 加载动画 */
.el-loading-mask{background-color: rgba(0,0,0,0.3);}
/* 弹出层-居中 */
.el-dialog{position: absolute; border-radius: 5px; top: 50%; left: 50%; margin: 0 !important; transform: translate(-50%, -50%); max-height: calc(100% - 30px); max-width: calc(100% - 30px); display: flex; flex-direction: column;}
.el-dialog .el-dialog__body{overflow: auto; color: #666666;}
.el-dialog--center .el-dialog__body{padding: 10px 15px;}
.el-dialog--center .el-dialog__footer{padding: 10px 20px 30px;}
/* 单选 */
.el-radio{margin-right: 20px;}
.el-radio__inner{border: #999 1px solid;}
/* Tree */
.el-tree-node__content{height: 32px;}
.tree_node{flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;}
.tree_node_title{padding: 8px 10px; font-weight: bold;}
.tree_node_title dd{padding: 0 10px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.tree_node_width dd{padding: 0 10px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}

/* 主要框架 */
.app_body{height: 100%;}
.app_main{background-color: #F2F2F2; padding: 0;}
.app_copy{line-height: 50px; font-size: 12px; color: #999; text-align: center;}

/* 动作菜单 */
.action{padding: 10px 15px;}

/* 内容 */
.body{padding: 20px; background-color: #FFF;}
.page{padding: 0 20px 20px; text-align: center; background-color: #FFF;}

.form_title{overflow: hidden; width: 100%; padding: 8px 0; font-size: 15px;}
.form_title b{line-height: 27px;}
.form .el-form-item{float: left; width: 50%; margin: 10px 0;}
.form .el-row{line-height: 24px;}

/* 头像 */
.app_menus{background-color: #20222A; color: #CCC;}
.app_img{cursor: pointer; padding: 20px 0; min-width: 64px;}
.app_img div{margin: 0 auto; width: 40%; padding-bottom: 40%; height: 0; border-radius: 50%; background-color: #F2F2F2;}
.app_img p{text-align: center; padding: 10px 5px 0; color: #6FB737; font-size: 14px;}
.app_img:hover p{color: #ff6600;}

/* 菜单 */
.app_menus{padding-top: env(safe-area-inset-top);}
.app_menus .el-menu{border: none;}
.app_menus .el-submenu__title{height: 46px; line-height: 46px; color: #CCC;}
.app_menus .el-submenu__title:hover{background-color: #30333A;}
.app_menus .el-submenu__title .fa{font-size: 21px; margin-right: 10px; color: #666;}
.app_menus .el-submenu__title .ico_mask{width: 24px; height: 24px; display: inline-block; margin-right: 8px;}
.app_menus .el-submenu .el-menu-item{height: 36px; line-height: 36px; color: #FFF;}
.app_menus ul{background-color: #20222A;}
.app_menus .el-menu-item:hover{background-color: #30333A; color: #6FB737;}
.app_menus .el-menu-item:hover i{color: #FFF;}
.app_menus .el-menu-item.is-active{background-color: #6FB737; color: #FFF;}
.app_version{min-width: 54px; padding: 0 5px; line-height: 30px; margin-top: 20px; text-align: center; color: #555; font-size: 12px; border-top: #000 1px solid;}

/* 用户头部 */
.app_top{padding: 10px 20px; line-height: 40px; background-color: #FFF;
  padding-top: calc(env(safe-area-inset-top) + 10px);
}
.app_top .menu_ico{margin-right: 20px; height: 32px; margin-top: 5px;}
.app_top .menu_ico i{cursor: pointer; font-size: 28px;}
.app_top .uinfo{color: #666; font-size: 12px;}
.app_top .uinfo span{cursor: pointer; color: #FF6600;}

/* 登录 */
.login_body{position: fixed; z-index: 99; left: 0; top: 0; width: 100%; height: 100%;}
.login_ct{position: absolute; width: calc(100% - 120px); max-width: 280px; height: 240px; padding: 10px 50px; background-color: #FFF; box-shadow: 0 0 10px rgba(0,0,0,.3); border-radius: 5px; margin: auto; left: 0; right: 0; top: 0; bottom: 0;}
.login_ct h2{line-height: 50px; text-align: center; font-size: 16px; color: #666;}
.login_ct .item{padding: 5px 0; margin: 8px 0;}
.login_ct .logo{position: absolute; width: 100%; height: 40px; line-height: 40px; padding: 10px 0; margin: -70px 0 0 -50px;}
.login_ct .logo div{width: 40px; height: 40px;}
.login_ct .logo h1{font-size: 18px; padding-left: 10px; color: #FFF; text-shadow: 0 0 3px rgba(0,0,0,0.3);}
.login_ct .copy{position: absolute; margin: 40px 0 0 -50px; width: 100%; font-size: 12px; text-align: center;}

/* 更新 */
.update_body{position: absolute; z-index: 999; width: 100%; height: 100%}
.update_logo{position: fixed; width: 100%; left: 0; bottom: 15px; line-height: 20px; text-align: center; padding: 10px 0;}
.update_logo h1{font-size: 16px;}
.update_logo h2{font-size: 10px; font-weight: normal;}
.update_ct{position: absolute; width: 220px; height: 220px; margin: auto; left: 0; right: 0; top: 0; bottom: 0;}
.update_ct .logo{width: 120px; height: 120px; margin: 0px auto 20px; border-radius: 50%;}
.update_ct .logo div{height: 100%; background: url('./assets/logo.svg') no-repeat center; background-size: 65%;}
.update_ct .loading{height: 5px; border-radius: 5px;}
.update_ct .load_msg{color: #FFF; text-align: center; padding: 8px 0; font-size: 14px;}
.update_ct .load_button{text-align: center;}

/* ICO */
.ico_mask{mask-position: center; mask-repeat: no-repeat; background-color: #666;}
.ico_input{position: absolute; width: 24px; height: 24px; margin: -12px 0 0 -12px;}
.ico_input i{display: inline-block; width: 100%; height: 100%; background-color: #999;}

.ico_other{mask-image: url('assets/ico/other.svg'); mask-size: auto 90%;}
.ico_camera{mask-image: url('assets/ico/camera.svg'); mask-size: auto 90%;}

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

.ico_platform{mask-image: url('assets/ico/platform.svg'); mask-size: auto 70%;}

</style>

<script src="./App.js"></script>
