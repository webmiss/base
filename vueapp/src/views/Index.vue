<template>
  <div>

    <!-- 支付方式 -->
    <van-action-sheet v-model="payData.show" :actions="payData.actions" @select="getPay" cancel-text="取消" />

    <!-- 首页 -->
    <page-view v-show="tabBar.active==0" :immersed="true" :bgColor="'rgba(111,183,55,'+navColor+')'" color="#FFF">
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
            <van-grid class="tools">
              <van-grid-item icon="location-o" text="定位" @click="getCity()" />
              <van-grid-item icon="shop-collect-o" text="附近地址" @click="getAddress()" />
              <van-grid-item icon="cluster-o" text="网络" @click="getPost()" />
              <van-grid-item icon="points" text="本地存储" @click="getStorage()" />
              <van-grid-item icon="photo-o" text="图片裁切" @click="compressImage()" />
              <van-grid-item icon="qr" text="二维码" @click="getQRcode()" />
              <van-grid-item icon="balance-pay" text="支付" @click="payData.show=true" />
              <van-grid-item icon="fire-o" text="地图" @click="$router.push('/map')" />
            </van-grid>
            <!-- 测试 -->
            <div class="test">
              <div><span class="icons icon_logo" style="font-size: 32px;"></span></div>
              <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div>
            </div>
          </div>
        </div>
      </div>
    </page-view>
    <!-- 首页 End -->

    <!-- 消息 -->
    <page-view v-show="tabBar.active==1">
      <div slot="title">消息</div>
      <div slot="body" class="nav_body">
        <!-- 滑动 -->
        <div class="html" ref="shop">
          <!-- 测试 -->
          <div class="test">
            <div>内容</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div>
          </div>
        </div>
        <!-- 滑动 End -->
      </div>
    </page-view>
    <!-- 消息 End -->

    <!-- 我的 -->
    <page-view v-show="tabBar.active==2">
      <div slot="title">我的</div>
      <div slot="body" class="nav_body">
        <!-- 滑动 -->
        <div class="html" ref="me">
          <!-- 测试 -->
          <div class="test">
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