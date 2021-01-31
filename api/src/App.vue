<template>
<div id="app">
  <router-view />
</div>
</template>

<style>
/* 表单缩放问题 */
@media only screen and (min-device-width : 320px) and (max-device-width : 1024px) {
  select:focus,
  textarea:focus,
  input:focus {font-size: 16px !important;}
}
/* UI */
@import url('./assets/style/ui.css');
/* Main */
@import url('./assets/style/main.css');
</style>
<style scoped>
/* APP */
@import url('./assets/style/app.css');
</style>

<script lang="ts" src="./App.ts"></script>
