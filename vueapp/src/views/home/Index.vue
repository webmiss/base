<template>
  <div class="in_html" :class="mode=='dark'?'in_html_dark':''">
    <div class="in_body" :class="mode=='dark'?'in_body_dark':''">
      <div class="verticalCenter in_ct">
        <div class="logo">
          <img src="@/assets/icon/logo.svg" />
        </div>
        <div class="logo_text">webmis.vip</div>
        <div class="logo_bg">
          <img src="@/assets/icon/bg.svg" />
        </div>
        <div class="demo">
          <span  @click="$router.push({path:'/demo',query:{id:123}})">[ Demo ]</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "./Index.css";
</style>

<script lang="ts" src="./Index.ts"></script>