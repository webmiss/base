<template>
  <page-view :class="mode=='dark'?'demo_dark':''" :color="mode=='dark'?'#FFF':'#333'" :bgColor="mode=='dark'?'#333':'#FFF'">
    <div slot="left"><i class="back ui ui_left" @click="back('left')"></i></div>
    <div slot="title">Demo</div>
    <scroll-view slot="body" class="html" @swipe="back">
      <!-- 滑动 -->
      <div class="test">
        <div v-for="(val,key) in lists" :key="key">{{val}}</div>
      </div>
      <!-- 滑动 End -->
    </scroll-view>
  </page-view>
</template>

<style scoped>
.test{margin: 1px 0;}
.test div{margin: 1px 0; line-height: 120px; background-color: #FFF; text-align: center;}
.demo_dark .test div{background-color: #333; color: #FFF;}
</style>

<script src="./Demo.js"></script>