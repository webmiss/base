<template>
  <wm-main>
    <div class="index_line">
      <wm-chart-line :data="chartData.line" :width="900" :height="320" unit="元"></wm-chart-line>
    </div>
    <div class="index_chart flex">
      <wm-chart-interval :data="chartData.interval" :width="440" unit="元"></wm-chart-interval>
      <wm-chart-pie :data="chartData.pie" :width="440" unit="元"></wm-chart-pie>
    </div>
  </wm-main>
</template>

<style scoped>
.index_line{width: 100%; padding: 20px 0;}
.index_chart{width: 900px; padding: 20px 0;}
.index_test{position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);}
</style>

<script lang="ts" src="./Home.ts"></script>
