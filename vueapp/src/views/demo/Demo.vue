<template>
  <wm-touch @swipe="back">
    <wm-page-view :immersed="false" :bgColor="'#ffffff'">
      <template #left><i class="back ui ui_left" @click="back('left')"></i></template>
      <template #title>Demo</template>
      <!-- 滑动 -->
      <template #body>
        <wm-scroll-view class="demo" ref="DemoScroll" @down="reFresh" @up="upLoad" @scroll="scroll">
          <!-- Swiper -->
          <wm-swipe class="swipe">
            <wm-swipe-item class="swipe_item">Page1</wm-swipe-item>
            <wm-swipe-item class="swipe_item">Page2</wm-swipe-item>
            <wm-swipe-item class="swipe_item">Page3</wm-swipe-item>
          </wm-swipe>
          <!-- 内容 -->
          <div class="item" v-for="(val,key) in lists" :key="key">{{val.name}}</div>
          <!-- 内容 -->
        </wm-scroll-view>
      </template>
      <!-- 滑动 End -->
    </wm-page-view>
  </wm-touch>
</template>

<style scoped>
.demo{height: 100%;}
.item{padding: 0 15px; line-height: 60px; border: #F2F4F8 1px solid; box-sizing: border-box;}
.swipe{width: 100%; height: 40vmin; background-color: #F2F4F8;}
.swipe_item{height: 100%; line-height: 40vmin; text-align: center;}
</style>

<script src="./Demo.js"></script>