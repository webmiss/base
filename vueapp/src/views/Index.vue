<template>
  <div>

    <!-- 首页 -->
    <page-view v-show="tabBar.active==0" class="in_html" :class="mode=='dark'?'in_html_dark':''" :immersed="true" :color="mode=='dark'?'#FFF':'#333'" :bgColor="'rgba(255,255,255,0)'">
      <!-- Header -->
      <div slot="left">{{ $store.state.geolocation.district || '获取定位' }}</div>
      <div slot="right">
        <i class="icons icon_scan"></i>
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
            <div class="demo">
              <span  @click="$router.push('/demo')">[ Demo ]</span>
            </div>
          </div>
        </div>
      </div>
    </page-view>
    <!-- 首页 End -->
    
    <!-- 底部导航 -->
    <wm-tabbar v-model="tabBar.active" @change="navTab"></wm-tabbar>

  </div>
</template>

<style scoped>
@import "./Index.css";
</style>

<script src="./Index.js"></script>