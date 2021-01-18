<template>
  <div>
    <page-view :immersed="false" :bgColor="'#ffffff'">
      <template #left><i class="back ui ui_left" @click="back('left')"></i></template>
      <template #title>Demo</template>
      <!-- 滑动 -->
      <template #body>
        <wm-scroll-view class="demo" ref="DemoScroll" @swipe="back" @down="reFresh" @up="upLoad" @scroll="scroll">
          <!-- 内容 -->
          <div class="item" v-for="(val,key) in lists" :key="key">{{val.name}}</div>
          <!-- 内容 -->
        </wm-scroll-view>
      </template>
      <!-- 滑动 End -->
    </page-view>
  </div>
</template>

<style scoped>
.demo{height: 100%;}
.item{padding: 0 15px; line-height: 60px; border: #F2F4F8 1px solid; box-sizing: border-box;}
</style>

<script src="./Demo.js"></script>