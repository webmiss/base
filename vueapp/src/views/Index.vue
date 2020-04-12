<template>
  <div>

    <!-- 支付方式 -->
    <van-action-sheet v-model="payData.show" :actions="payData.actions" @select="getPay" cancel-text="取消" />

    <!-- 首页 -->
    <page-view v-show="tabBar.active==0" :immersed="true" :bgColor="'rgba('+(mode=='dark'?'40,40,40':'111,183,55')+','+navColor+')'" color="#FFF">
      <!-- Header -->
      <div slot="left">{{ $store.state.geolocation.district || $storage.getItem('city') }}</div>
      <div slot="right">
        <span class="icons icon_scan" style="color: #FFF;" @click="$router.push('/scan')"></span>
      </div>
      <!-- Content -->
      <div slot="body" class="nav_body">
        <div class="html" ref="index">
          <div>
            <!-- 轮播 -->
            <van-swipe class="swiper_image" :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(val,key) in imgUrls" :key="key" :style="{backgroundImage:'url('+val+')'}"></van-swipe-item>
            </van-swipe>
            <!-- 功能 -->
            <ul class="flex_left tools" :class="mode=='dark'?'tools_dark':''">
              <li @click="getCity()">
                <van-icon name="location-o" /><div>定位</div>
              </li>
              <li @click="getAddress()">
                <van-icon name="shop-collect-o" /><div>附近地址</div>
              </li>
              <li @click="getPost()">
                <van-icon name="cluster-o" /><div>网络</div>
              </li>
              <li @click="getStorage()">
                <van-icon name="points" /><div>本地存储</div>
              </li>
              <li @click="compressImage()">
                <van-icon name="photo-o" /><div>图片裁切</div>
              </li>
              <li @click="getQRcode()">
                <van-icon name="qr" /><div>二维码</div>
              </li>
              <li @click="payData.show=true">
                <van-icon name="balance-pay" /><div>支付</div>
              </li>
              <li @click="$router.push('/map')">
                <van-icon name="fire-o" /><div>地图</div>
              </li>
            </ul>
            <!-- 测试 -->
            <div class="test" :class="mode=='dark'?'test_dark':''">
              <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div>
            </div>
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
    <page-view v-show="tabBar.active==2" :bgColor="mode=='dark'?'#282828':'#FFF'" :color="mode=='dark'?'#FFF':'#282828'">
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