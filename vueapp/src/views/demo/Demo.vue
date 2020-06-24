<template>
<v-touch v-on:swiperight="back()">
  <!-- Demo -->
  <page-view :class="mode=='dark'?'demo_dark':''" :color="mode=='dark'?'#FFF':'#333'" :bgColor="mode=='dark'?'#333':'#FFF'">
    <div slot="left"><i class="back icons icon_left" @click="back()"></i></div>
    <div slot="title">Demo</div>
    <div slot="body" class="html">
      <!-- 滑动 -->
      <div class="html" ref="index">
        <!-- 测试 -->
        <div class="test">
          <div v-for="(val,key) in lists" :key="key">{{val}}</div>
        </div>
      </div>
      <!-- 滑动 End -->
    </div>
  </page-view>
  <!-- Demo End -->
</v-touch>
</template>

<style scoped>
.test{margin: 1px 0;}
.test div{margin: 1px 0; line-height: 120px; background-color: #FFF; text-align: center;}
.demo_dark .test div{background-color: #333; color: #FFF;}
</style>

<script src="./Demo.js"></script>