<template>
  <div id="app">
    
    <!-- 更新APP -->
    <div v-if="update.show" class="update_body" :style="{backgroundColor: upDateColor.bg || $config.themeColor}">
      <div class="update_ct">
        <div class="logo" :style="{backgroundColor: upDateColor.logoBg}"><div></div></div>
        <div class="loading" :style="{backgroundImage: 'linear-gradient(to right, '+upDateColor.loading+', '+upDateColor.loading+' '+update.loading+', '+upDateColor.loaded+' '+update.loading+', '+upDateColor.loaded+' 100%)'}"></div>
        <div class="load_msg" v-html="update.msg">正在加载应用</div>
        <div class="load_button">
          <el-button round v-if="update.down" @click="updateDown()" size="small" :style="{color: $config.themeColor}">立即更新</el-button>
        </div>
      </div>
      <div class="update_logo" :style="{color:upDateColor.copy}"><h1>{{$config.title}}</h1><h2>{{$config.copy}}</h2></div>
    </div>
    <!-- 更新APP End -->

    <!-- 登录 -->
    <el-container v-show="!isLogin" class="login_body bgimg bgcover" v-if="$store.state.system.login_bg" :style="{backgroundImage:'url('+$config.baseUrl+$store.state.system.login_bg+')'}">
      <div class="login_ct">
        <div class="logo flex_center">
          <div class="bgimg radius" v-if="!$store.state.system.logo"></div>
          <div class="bgimg radius bgcover" v-else :style="{backgroundImage:'url('+$config.baseUrl+$store.state.system.logo+')'}"></div>
          <h1 class="nowrap">{{$store.state.system.title}}</h1>
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
        <div class="copy nowrap">&copy; {{$store.state.system.copy}} license&nbsp;&nbsp;版本：{{$config.version}}</div>
      </div>
    </el-container>
    <!-- 登录 End -->

    <!-- 主要框架 -->
    <el-container  v-show="isLogin" class="app_body">
      <!-- 导航菜单 -->
      <el-aside class="app_menus" :style="{width: isCollapse?'64px':'200px',paddingTop:$store.state.statusBar.height}">
        <!-- 头像 -->
        <div class="app_img" @click="openUrl('ico_mask ico_userinfo','UserInfo','11','基本资料',true)">
          <div class="bgimg bgcover" v-if="$store.state.uinfo.img" :style="{backgroundImage:'url('+$store.state.uinfo.img+')'}"></div>
          <div class="bgimg" v-else></div>
          <p class="nowrap">{{$store.state.uinfo.nickname || '昵称'}}({{$store.state.uinfo.name || '姓名'}})</p>
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
      <el-container :style="{paddingTop:$store.state.statusBar.height}">
        <!-- 头部信息 -->
        <el-header class="app_top flex">
          <el-tooltip class="logo" effect="dark" content="点击”收缩/展开“左侧菜单" placement="bottom-start">
            <a @click="hideMenus()"><i class="el-icon-menu"></i> {{ $storage.getItem('MenuName') || $store.state.system.title}}</a>
          </el-tooltip>
          <!-- 登录信息 -->
          <div class="uinfo">
            <b>{{$storage.getItem('uname') || '空'}}</b>&nbsp;&nbsp;>
            <el-button type="text" @click="openConfig()">设置</el-button>&nbsp;&nbsp;|&nbsp;&nbsp;
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
    <ul v-show="isLogin" class="right_menus">
      <li @click="openMsg()" title="消息" :style="{backgroundColor: $config.themeColor}">
        <el-badge v-if="$store.state.msgNum>0" :value="$store.state.msgNum"></el-badge>
        <i class="ico_mask ico_wechat"></i>
      </li>
    </ul>

    <!-- 会诊/转诊 -->
    <el-dialog class="msg_body" :visible.sync="msgData.show" center width="640px">
      <div slot="title" class="msg_title flex">
        <div>
          <el-popover v-if="msgData.gid!=1 && msgData.gid!=''" trigger="hover" placement="bottom-start">
            <ul class="msg_title_tool">
              <li class="flex"><span>群设置</span><i class="el-icon-setting"></i></li>
              <li class="flex"><span>退出该群</span><i class="el-icon-delete"></i></li>
            </ul>
            <div slot="reference">
              <span>{{msgData.title}}<i class="el-icon-caret-bottom"></i></span>
            </div>
          </el-popover>
          <span v-else>{{msgData.title}}</span>
        </div>
      </div>
      <!-- 搜索 -->
      <div class="msg_sea">
        <el-input class="sea" placeholder="搜索" size="small">
          <el-button slot="append" icon="el-icon-plus" size="small" title="创建组" @click="addGroup()"></el-button>
        </el-input>
      </div>
      <el-container>
        <!-- 用户组 -->
        <el-aside width="210px" class="msg_left">
          <ul class="msg_group">
            <li class="flex" v-for="(val,key) in msgData.group" :key="key" @click="getMsg(key,val)">
              <div class="img" v-if="key==1" :style="{backgroundImage: 'url('+($config.baseUrl+$store.state.system.logo)+')'}">
                <el-badge v-if="val.num>0" :value="val.num"></el-badge>
              </div>
              <div class="img" v-else :style="{backgroundImage: 'url('+(val.data.length>0?val.data[val.data.length-1].img:'')+')'}">
                <el-badge v-if="val.num>0" :value="val.num"></el-badge>
              </div>
              <div class="ct">
                <div class="title flex">
                  <h2 class="nowrap">{{val.name}}</h2>
                  <span>{{val.data.length>0?val.data[val.data.length-1].ctime.substr(11,5):''}}</span>
                </div>
                <div class="text nowrap" v-if="val.data.length>0">[{{getMsgType(val.data[val.data.length-1].type)}}]{{val.data[val.data.length-1].content}}</div>
                <div class="text nowrap" v-else>暂无消息</div>
              </div>
            </li>
          </ul>
        </el-aside>
        <div class="msg_right">
          <!-- 消息内容 -->
          <div class="msg_html" ref="msgMain">
            <div class="msg_ct" ref="msgContent">
              <template v-if="msgData.data.length>0">
                <div v-for="(v,k) in msgData.data" :key="k">
                  <div class="msg_ct_time">{{v.ctime}}</div>
                  <div class="flex_left" v-if="v.fid!=$store.state.uinfo.uid">
                    <!-- 头像 -->
                    <div class="head flex">
                      <i :style="{backgroundImage: 'url('+(v.gid==1?$config.baseUrl+$store.state.system.logo:v.img)+')'}"></i>
                      <div class="arrow_left"></div>
                    </div>
                    <!-- 消息内容 -->
                    <div class="msgCt" v-html="v.content"></div>
                  </div>
                  <div class="flex_right" v-else>
                    <!-- 消息内容 -->
                    <div class="msgCt mebg" v-html="v.content"></div>
                    <!-- 头像 -->
                    <div class="head flex">
                      <div class="arrow_right"></div>
                      <i :style="{backgroundImage: 'url('+v.img+')'}"></i>
                    </div>
                  </div>
                </div>
              </template>
              <div class="null" v-else></div>
            </div>
          </div>
          <!-- 消息内容 End -->
          <div class="msg_send">
            <div class="msg_tool flex">
              <ul class="msg_tool_ico flex">
                <li class="ico_mask ico_patient" title="患者"></li>
              </ul>
              <el-button size="small" @click="sendMsg()">发送</el-button>
            </div>
            <div class="msg_seng_ct">
              <el-input type="textarea" placeholder="请输入内容" v-model="msgData.content" ref="msgSend"></el-input>
            </div>
          </div>
        </div>
      </el-container>
    </el-dialog>
    <!-- 创建组 -->
    <el-dialog :visible.sync="msgGroup.show" center width="420px">
      <el-form :model="msgGroup.add" label-width="80px">
        <el-form-item label="组名称">
          <el-input v-model="msgGroup.add.title" maxlength="16" placeholder="聊天组名称"></el-input>
        </el-form-item>
        <el-form-item label="选择成员">
          <!-- <el-cascader v-model="msgGroup.add.uid" :options="msgGroup.class" :props="{multiple: true}" change-on-select filterable clearable expand-trigger="hover" style="width: 100%;max-width: 360px;"></el-cascader> -->
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subGroup()">创建</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>
/* 初始化 */
*{margin: 0; padding: 0;}
html,body,#app{height: 100%; font-size: 14px; color: #333;}
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

.arrow_left{width: 0px; height: 0px; border: 10px solid; border-color:transparent #FFF transparent transparent;}
.arrow_right{width: 0px; height: 0px; border: 10px solid; border-color:transparent transparent transparent #FFF;}
.arrow_up{width: 0px; height: 0px; border: 10px solid; border-color:transparent transparent #FFF transparent;}
.arrow_down{width: 0px; height: 0px; border: 10px solid; border-color:#FFF transparent transparent transparent;}

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
/* Tabs */
.form .el-tabs__header{position: fixed; z-index: 10; width: calc(100% - 30px); margin-top: -20px; background-color: #FFF;}
.form .el-tabs__content{padding-top: 30px;}
/* .form .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{box-shadow: none;} */

/* 消息 */
.msg_body .el-dialog{background-color: #F2F2F2;}
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
.msg_seng_ct .el-textarea__inner{background-color: #F2F2F2; height: 90px;}

/* 主要框架 */
.app_body{height: 100%;}
.app_main{background-color: #FFF; padding: 0;}
.app_copy{line-height: 50px; font-size: 12px; color: #CCC; text-align: center;}

/* 动作菜单 */
.action{padding: 15px 15px 0; overflow-x: auto;}
.action .el-button-group{min-width: 640px;}

/* 内容 */
.body{padding: 15px; background-color: #FFF;}
.page{padding: 0 20px 20px; text-align: center; background-color: #FFF;}

.form_print{text-align: center; padding: 10px 0;}
.form_print h1{font-size: 20px; padding: 10px 0;}
.form_print p{font-size: 14px; color: #666;}

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
.app_top{padding: 5px 20px; line-height: 50px; background-color: #FFF; border-bottom: #F2F2F2 1px solid;}
.app_top .uinfo{color: #666;}
.app_top .uinfo .logout{cursor: pointer; color: #FF6600;}

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
.update_ct{position: absolute; width: 210px; height: 210px; margin: auto; left: 0; right: 0; top: 0; bottom: 0;}
.update_ct .logo{width: 110px; height: 110px; margin: 0px auto 20px; border-radius: 50%;}
.update_ct .logo div{height: 100%; background: url('./assets/logo.svg') no-repeat center; background-size: 65%;}
.update_ct .loading{height: 5px; border-radius: 5px;}
.update_ct .load_msg{color: #FFF; text-align: center; padding: 8px 0; font-size: 14px;}
.update_ct .load_button{text-align: center;}

/* 右侧菜单 */
.right_menus{position: fixed; z-index: 99; right: 25px; bottom: 15px;}
.right_menus li{cursor: pointer; width: 45px; height: 45px; margin: 10px 0; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,.3);}
.right_menus i{display: inline-block; width: 100%; height: 100%; background-color: #FFF;}
.right_menus .ico_wechat{mask-size: auto 60%;}
.right_menus .ico_qrcode{mask-size: auto 50%;}
.right_menus .el-badge{position: absolute; margin-left: 34px;}

/* 扫码 */
.app_qrcode_ct{position: absolute; z-index: 1000; top: 0; width: 100%; height: 100%; background-color: #000;}
.app_qrcode_ct .title{padding: 40px 20px 20px; color: #FFF;}
.app_qrcode_ct .title h2{font-size: 18px;}
.app_qrcode_ct .title i{cursor: pointer; font-size: 24px;}
.app_qrcode_ct .qrbody{height: calc(100% - 84px);}

/* ICO */
.ico_mask{mask-position: center; mask-repeat: no-repeat; background-color: #666;}
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

.ico_platform{mask-image: url('assets/ico/platform.svg'); mask-size: auto 70%;}
</style>

<script src="./App.js"></script>
