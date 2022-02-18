<template>
  <wm-main>
    Home
    <!-- <div class="index_interval">
      <wm-chart-interval :data="chartData.interval" :width="900" :height="300"></wm-chart-interval>
    </div>
    <div class="index_chart flex">
      <wm-chart-line :data="chartData.line" :width="440" :isSmooth="false"></wm-chart-line>
      <wm-chart-pie :data="chartData.pie" :width="440" html="浏览器" :htmlPosition="['46%', '46%']"></wm-chart-pie>
    </div> -->
  </wm-main>
</template>

<style scoped>
.index_interval{width: 100%; padding: 20px 0;}
.index_chart{width: 900px; padding: 20px 0;}
.index_test{position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);}
</style>

<script lang="ts" src="./Home.ts"></script>
