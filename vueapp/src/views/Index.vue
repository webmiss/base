<template>
  <div>

    <!-- 首页 -->
    <page-view v-show="tabBar.active==0" class="in_html" :class="mode=='dark'?'in_html_dark':''" :immersed="true" :color="mode=='dark'?'#FFF':'#333'" :bgColor="'rgba(255,255,255,0)'">
      <!-- Header -->
      <div slot="left">{{ $store.state.geolocation.district || '获取定位' }}</div>
      <div slot="right">
        <span class="icons icon_scan" @click="$router.push('/scan')"></span>
      </div>
      <!-- Content -->
      <div slot="body" class="nav_body">
        <div class="in_body" :class="mode=='dark'?'in_body_dark':''">
          <div class="verticalCenter in_ct">
            <div class="logo">
              <img src="../assets/icon/logo.svg" />
            </div>
            <div class="logo_text">webmis.vip</div>
            <div class="logo_bg">
              <img src="../assets/icon/bg.svg" />
            </div>
            <ul class="in_tools" :class="mode=='dark'?'in_tools_dark':''">
              <li @click="getCity()">
                <div class="ico"><span class="icons icon_menu"></span></div>
                <div class="name">定位</div>
              </li>
              <li @click="getAddress()">
                <div class="ico"><span class="icons icon_menu"></span></div>
                <div class="name">附近地址</div>
              </li>
              <li @click="getPost()">
                <div class="ico"><span class="icons icon_menu"></span></div>
                <div class="name">网络</div>
              </li>
              <li @click="getStorage()">
                <div class="ico"><span class="icons icon_menu"></span></div>
                <div class="name">本地存储</div>
              </li>
              <li @click="compressImage()">
                <div class="ico"><span class="icons icon_menu"></span></div>
                <div class="name">图片裁切</div>
              </li>
              <li @click="getQRcode()">
                <div class="ico"><span class="icons icon_menu"></span></div>
                <div class="name">二维码</div>
              </li>
              <li @click="payData.show=true">
                <div class="ico"><span class="icons icon_menu"></span></div>
                <div class="name">支付</div>
              </li>
              <li @click="$router.push('/map')">
                <div class="ico"><span class="icons icon_menu"></span></div>
                <div class="name">地图</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </page-view>
    <!-- 首页 End -->

    <!-- 消息 -->
    <page-view v-show="tabBar.active==1" :bgColor="mode=='dark'?'#323436':'#FFF'" :color="mode=='dark'?'#FFF':'#333'">
      <div slot="title">消息</div>
      <div slot="body" class="nav_body" ref="msg">
        <!-- 滑动 -->
        <div>
          <div v-if="Object.keys($store.state.uMsg.group).length>0">
            <van-swipe-cell class="in_msg_body" v-for="(val,key) in $store.state.uMsg.group" :key="key">
              <div class="in_msg_ct flex" @click="openMsg(val.gid,val.fid)">
                <div class="img bgImg bgTu bgLogo">
                  <span class="redNum" v-if="val.num>0">{{val.num}}</span>
                  <div class="bgImg bgTu" v-if="key!=1" :style="{backgroundImage: 'url('+val.img+')'}"></div>
                  <div class="bgImg bgTu service" v-else></div>
                </div>
                <div class="info">
                  <div class="title flex">
                    <h2>{{key!=1?val.name:'服务提醒'}}</h2>
                    <span>{{val.msg[val.msg.length-1].ctime.substr(11,5)}}</span>
                  </div>
                  <div class="msg nowrap">{{val.msg[val.msg.length-1].content}}</div>
                </div>
              </div>
              <template slot="right">
                <van-button type="primary" text="标记未读" class="an1" @click="stateMsg(val.fid)" />
                <van-button type="danger" text="删除" @click="delMsg(val.fid)" />
              </template>
            </van-swipe-cell>
          </div>
          <div class="null" v-else></div>
        </div>
        <!-- 滑动 End -->
      </div>
    </page-view>
    <!-- 消息 End -->

    <!-- 我的 -->
    <page-view class="in_me" v-show="tabBar.active==2" :immersed="true" :bgColor="'rgba('+(mode=='dark'?'40,40,40':'111,183,55')+','+navColor+')'" :color="mode=='dark'?'#FFF':'#242628'">
      <div slot="right">
        <span class="icons icon_config"></span>
      </div>
      <div slot="body" class="nav_body" ref="me">
        <!-- 滑动 -->
        <div>
          <!-- 头像 -->
          <div class="in_me_info" :class="mode=='dark'?'in_me_info_dark':''">
            <div class="tu" @click="openUrl('/user/config/index',true)">
              <div class="img"><i class="icons icon_camera"></i></div>
            </div>
            <div class="name">用户昵称</div>
          </div>
          <!-- 账户 -->
          <div class="in_me_account mTop1 flex" :class="mode=='dark'?'in_me_account_dark':''">
            <div class="ct">
              <div class="name">钱包(元)</div>
              <div class="val c1">0.00</div>
            </div>
            <div class="ct">
              <div class="name">积分(个)</div>
              <div class="val c2">0</div>
            </div>
            <div class="ct">
              <div class="name">优惠券(张)</div>
              <div class="val c3">0</div>
            </div>
          </div>
          <!-- 订单管理 -->
          <div class="Menu mTop10 flex" :class="mode=='dark'?'Menu_dark':''">
            <div class="h2">订单管理</div>
            <div class="more flex">
              <span>更多</span><i class="icons icon_right"></i>
            </div>
          </div>
          <div class="in_me_order mTop1" :class="mode=='dark'?'in_me_order_dark':''">暂无数据</div>
        </div>
        <!-- 滑动 End -->
      </div>
    </page-view>
    <!-- 我的 End -->
    
    <!-- 底部导航 -->
    <wm-tabbar v-model="tabBar.active" @change="navTab"></wm-tabbar>

  </div>
</template>

<style scoped>
@import "./Index.css";
</style>

<script src="./Index.js"></script>