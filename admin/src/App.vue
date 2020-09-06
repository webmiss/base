<template>
  <div id="app">
    
    <!-- 更新APP -->
    <div v-if="update.show" class="update_body" :style="{backgroundColor: upDateColor.bg}">
      <div class="update_ct verticalCenter">
        <div class="logo" :style="{backgroundColor: upDateColor.logoBg}"><div></div></div>
        <div class="loading" :style="{backgroundImage: 'linear-gradient(to right, '+upDateColor.loading+', '+upDateColor.loading+' '+update.loading+', '+upDateColor.loaded+' '+update.loading+', '+upDateColor.loaded+' 100%)'}"></div>
        <div class="load_msg" v-html="update.msg" :style="{color:upDateColor.msgColor}">正在加载应用</div>
        <div class="load_button">
          <button class="Button" v-if="update.down" @click="updateDown()" :style="{color:upDateColor.butColor,backgroundColor:upDateColor.butBg,}">{{upDateColor.butText}}</button>
        </div>
      </div>
      <div class="update_logo" :style="{color:upDateColor.copy}"><h1>{{$config.title}}</h1><h2>{{$config.copy}}</h2></div>
    </div>
    <!-- 更新APP End -->

    <!-- 登录 -->
    <el-container v-show="$store.state.isLogin===false" class="login_body bgImg bgcover" :style="{backgroundImage:'url('+($store.state.system.login_bg?$store.state.system.login_bg:require('./assets/bg.jpg'))+')'}">
      <div class="login_ct verticalCenter">
        <div class="logo flex_center">
          <div class="bgImg bgTu" :style="{backgroundImage:'url('+($store.state.system.logo?$store.state.system.logo:require('./assets/logo.svg'))+')'}"></div>
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
    <div class="app_body" v-show="$store.state.isLogin===true">
      <!-- 导航菜单 -->
      <scroll-view :upperLoad="false" :lowerLoad="false" class="app_menus" :style="{width: $store.state.collapseMenu?'64px':'200px',paddingTop:$store.state.statusBarHeight}">
        <!-- 头像 -->
        <div class="app_img">
          <div class="bgImg" @click="hideMenus()" v-if="$store.state.uInfo.img" :style="{backgroundImage:'url('+$store.state.uInfo.img+')'}"></div>
          <div class="bgImg tu" @click="hideMenus()" v-else></div>
          <div class="info nowrap">{{$store.state.uInfo.nickname || '昵称'}}({{$store.state.uInfo.name || '姓名'}})</div>
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
        <!-- 用户信息 -->
        <div class="app_user nowrap">
          <span class="config" @click="openConfig()">设置</span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span class="logout" @click="logout()">退出</span>
        </div>
      </scroll-view>
      <!-- 导航菜单 End -->
      <!-- 中间内容 -->
      <div class="app_ct" :style="{width:'calc(100% - '+($store.state.collapseMenu?'64px':'201px')+')',paddingTop:$store.state.statusBarHeight}">
        <!-- 头部信息 -->
        <div class="app_top">
          <scroll-view :upperLoad="false" :lowerLoad="false" class="app_top_menus" :scroll-x="true">
            <div class="app_action" :style="{minWidth:$store.state.action.width}">
              <Action v-if="$store.state.action.url" :url="$store.state.action.url" :menus="$store.state.action.menus"></Action>
              <div class="name" v-else>{{ storage.getItem('MenuName') || $store.state.system.title}} <i class="el-icon-arrow-right"></i></div>
            </div>
          </scroll-view>
        </div>
        <!-- 中间部分 -->
        <div class="app_main">
          <router-view />
          <div class="app_copy">所属：{{$store.state.system.title}}&nbsp;&nbsp;&copy; {{$store.state.system.copy}}&nbsp;&nbsp;版本：{{$config.version}}</div>
        </div>
      </div>
      <!-- 中间内容 End -->
    </div>
    <!-- 主要框架 End -->

    <!-- 系统配置 -->
    <el-dialog :title="config.title" :visible.sync="config.show" center width="360px">
      <el-form label-width="120px">
        <el-form-item label="消息朗读">
          <el-switch v-model="config.is_msg_audio" @change="subConfig('is_msg_audio')"></el-switch>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 系统配置 End -->

    <!-- 右侧菜单 -->
    <ul class="right_menu" v-if="$store.state.isLogin===true">
      <li @click="openMsg()"><i class="ui ui_msg"></i><span class="redNum">0</span></li>
    </ul>
    <!-- 消息 -->
    <popup v-model="msg.show">
      <div>消息</div>
    </popup>
    <!-- 消息 End -->
    
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
/* ElementUI */
@import url('./assets/style/elementUI.css');
</style>
<style scoped>

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

/* 登录 */
.login_body{position: fixed; z-index: 99; left: 0; top: 0; width: 100%; height: 100%;}
.login_ct{width: calc(100% - 120px); max-width: 280px; padding: 10px 50px; background-color: #FFF; box-shadow: 0 0 10px rgba(0,0,0,.3); border-radius: 8px;}
.login_ct h2{line-height: 50px; text-align: center; font-size: 16px; color: #666;}
.login_ct .item{padding: 5px 0; margin: 8px 0;}
.login_ct .logo{position: absolute; width: 100%; height: 40px; line-height: 40px; padding: 10px 0; margin: -70px 0 0 -50px;}
.login_ct .logo div{width: 40px; height: 40px; background-color: #FFF; background-size: 75%;}
.login_ct .logo h1{font-size: 18px; padding-left: 10px; color: #FFF; text-shadow: 0 0 3px rgba(0,0,0,0.3);}
.login_ct .copy{position: absolute; margin: 40px 0 0 -50px; width: 100%; font-size: 12px; text-align: center;}
.login_ct .icons{font-size: 18px;}

/* 主要框架 */
.app_body{height: 100%;}
.app_main{min-width: 320px; background-color: #FFF; padding: 60px 0 0;}
.app_copy{line-height: 50px; font-size: 12px; color: #CCC; text-align: center;}

/* 头像 */
.app_menus{float: left; overflow: hidden; height: 100%; background-color: #20222A; color: #CCC;}
.app_img{padding: 20px 0; min-width: 64px; border-bottom: #000 1px solid;}
.app_img .tu{cursor: pointer; margin: 0 auto; width: 40%; padding-bottom: 40%; height: 0; text-align: center; border-radius: 50%; background-color: #F2F2F2;}
.app_img .tu{background-image: url(./assets/logo.svg); background-size: 60%;}
.app_img .info{text-align: center; padding: 10px 5px 0; color: #6FB737; font-size: 14px;}
.app_user{padding: 16px 5px; text-align: center; color: #666; border-top: #000 1px solid;}
.app_user span{cursor: pointer; font-size: 12px;}
.app_user .config:hover{color: #6FB737;}
.app_user .logout{color: #FF6600;}

/* 用户头部 */
.app_ct{float: right; overflow-y: auto; height: 100%; position: relative;}
.app_top{position: absolute; z-index: 999; overflow: hidden; width: calc(100% - 40px); padding: 5px 20px; height: 50px; line-height: 50px; border-bottom: #F2F2F2 1px solid; background-color: #FFF;}
.app_top_menus{width: 100%; height: 50px;}
.app_action{min-width: auto; overflow: hidden; height: 50px;}

/* 动作菜单 */
.action{display: inline-block; overflow: hidden;}

/* 右侧菜单 */
.right_menu{position: fixed; z-index: 999; right: 20px; bottom: 20px;}
.right_menu li{width: 48px; height: 48px; line-height: 60px; text-align: center;}
.right_menu .icons{font-size: 32px; color: #6FB737;}
.right_menu .redNum{margin: 5px 0 0 -10px;}

</style>

<script src="./App.js"></script>
