<template>
  <wm-touch @swipe="back">
    <wm-page-view :immersed="false" :bgColor="'#ffffff'">
      <template #left><i class="back ui ui_left" @click="back('left')"></i></template>
      <template #title>Demo</template>
      <template #body>
        <!-- Picker -->
        <wm-picker :show="city.show" @update:show="city.show=$event" :data="city.data" :defaultIndex="[0,1,2]" @confirm="cityConfirm"></wm-picker>
        <wm-picker-date :show="date.show" @update:show="date.show=$event" :default="[2020,10,5]" @confirm="dateConfirm"></wm-picker-date>
        <!-- 滑动 -->
        <wm-scroll-view class="demo" ref="DemoScroll" @down="reFresh" @up="upLoad" @scroll="scroll">
          <!-- Swiper -->
          <wm-swipe class="swipe">
            <wm-swipe-item class="swipe_item">
              <wm-chart-line :data="chartData.line"></wm-chart-line>
            </wm-swipe-item>
            <wm-swipe-item class="swipe_item">
              <wm-chart-line :data="chartData.line"></wm-chart-line>
            </wm-swipe-item>
            <wm-swipe-item class="swipe_item">
              <wm-chart-line :data="chartData.line"></wm-chart-line>
            </wm-swipe-item>
          </wm-swipe>
          <!-- Picker -->
          <div>
            <button @click="city.show=true">选择区域</button>
            <button @click="date.show=true">选择日期</button>
          </div>
          <!-- Chart -->
          
          <!-- Lists -->
          <div class="item" v-for="(val,key) in lists" :key="key">{{val.name}}</div>
        </wm-scroll-view>
        <!-- 滑动 End -->
      </template>
    </wm-page-view>
  </wm-touch>
</template>

<style scoped>
.demo{height: 100%;}
.item{padding: 0 15px; line-height: 60px; border: #F2F4F8 1px solid; box-sizing: border-box;}
.swipe{width: 100%; height: 48vmin; background-color: #F2F4F8;}
.swipe_item{height: 100%; height: 48vmin; line-height: 48vmin; text-align: center;}
</style>

<script src="./Demo.js"></script>