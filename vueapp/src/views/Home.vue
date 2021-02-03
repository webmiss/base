<template>
  <div>
    <wm-tabbar-page :show="tabBar.active==0">
      <home-code></home-code>
    </wm-tabbar-page>
    <wm-tabbar-page :show="tabBar.active==1">
      <home-index></home-index>
    </wm-tabbar-page>
    <wm-tabbar-page :show="tabBar.active==2">
      <home-me></home-me>
    </wm-tabbar-page>
    <!-- 底部导航 -->
    <wm-tabbar :data="tabBar.menus" :active="tabBar.active" @update:active="navTab"></wm-tabbar>
  </div>
</template>

<style scoped>
</style>

<script lang="ts" src="./Home.ts"></script>
