<template>
  <div>

    <!-- 首页 -->
    <page-view class="in_html" :class="mode=='dark'?'in_html_dark':''" v-show="tabBar.active==0" :immersed="true" :bgColor="'rgba('+(mode=='dark'?'40,40,40':'111,183,55')+','+navColor+')'" :color="mode=='dark'?'#FFF':'#333'">
      <!-- Header -->
      <div slot="left">{{ $store.state.geolocation.district || $storage.getItem('city') }}</div>
      <div slot="right">
        <span class="icons icon_scan" @click="$router.push('/scan')"></span>
      </div>
      <!-- Content -->
      <div slot="body" class="nav_body">
        <div class="in_body" :class="mode=='dark'?'in_body_dark':''">
          <div class="verticalCenter in_ct">
            <div class="bgImg logo"></div>
            <div class="logo_text">webmis.vip</div>
            <div class="bgImg logo_bg"></div>
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
    <page-view v-show="tabBar.active==1" :bgColor="mode=='dark'?'#282828':'#FFF'" :color="mode=='dark'?'#FFF':'#282828'">
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
    <page-view v-show="tabBar.active==2" :bgColor="mode=='dark'?'#343434':'#FFF'" :color="mode=='dark'?'#FFF':'#282828'">
      <div slot="title">我的</div>
      <div slot="body" class="nav_body">
        <!-- 滑动 -->
        <div class="html" ref="me">
          <!-- 测试 -->
          <div class="test" :class="mode=='dark'?'test_dark':''">
            <div>内容</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div>
          </div>
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