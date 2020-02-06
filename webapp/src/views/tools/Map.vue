<template>
  <page-view>
    <!-- Header -->
    <div slot="left"><span class="icons icon_left" @click="$router.goBack(-1)"></span></div>
    <div slot="title">地图</div>
    <!-- Content -->
    <div slot="body" class="html">
      <el-amap :center="mapData.center" :zoom="mapData.zoom">
        <el-amap-marker :position="mapData.center"></el-amap-marker>
      </el-amap>
    </div>
    <!-- Content End -->
  </page-view>

</template>

<style scoped>

</style>

<script src="./Map.js"></script>