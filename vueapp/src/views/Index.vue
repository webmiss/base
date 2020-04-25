<template>
  <div>

    <!-- 首页 -->
    <page-view class="in_html" :class="mode=='dark'?'in_html_dark':''" v-show="tabBar.active==0" :immersed="true" :color="mode=='dark'?'#FFF':'#333'">
      <!-- Header -->
      <div slot="left">{{ $store.state.geolocation.district || $storage.getItem('city') }}</div>
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
      <div slot="body" class="nav_body">
        <!-- 滑动 -->
        <div class="html" ref="shop">
          <!-- 测试 -->
          <div class="test" :class="mode=='dark'?'test_dark':''">
            <div>内容</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div>
          </div>
        </div>
        <!-- 滑动 End -->
      </div>
    </page-view>
    <!-- 消息 End -->

    <!-- 我的 -->
    <page-view class="in_me" v-show="tabBar.active==2" :immersed="true" :bgColor="'rgba('+(mode=='dark'?'40,40,40':'111,183,55')+','+navColor+')'" :color="mode=='dark'?'#FFF':'#282828'">
      <div slot="right">
        <span class="icons icon_config"></span>
      </div>
      <div slot="body" class="nav_body" ref="me">
        <!-- 滑动 -->
        <div>
          <!-- 头像 -->
          <div class="in_me_info" :class="mode=='dark'?'in_me_info_dark':''">
            <div class="tu">
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
    <!-- 底部导航 End -->
  </div>
</template>

<style scoped>
@import "./Index.css";
</style>

<script src="./Index.js"></script>