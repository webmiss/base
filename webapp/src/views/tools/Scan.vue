<template>
  <page-view bgColor="#000" color="#FFF">
    <!-- Header -->
    <div slot="left"><span class="icons icon_left" style="color: #FFF;" @click="goBack()"></span></div>
    <div slot="title">扫描二维码</div>
    <!-- Content -->
    <div slot="body" class="html loading scan_bg">
      <div id="code">{{info}}</div>
    </div>
    <!-- Content End -->
  </page-view>
</template>

<style scoped>
.scan_bg{background-color: #000; color: #FFF;}
.scan_bg div{height: 100%;}
</style>

<script src="./Scan.js"></script>