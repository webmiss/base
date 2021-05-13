<template>
  <wm-main>
    <wm-tinymce ref="TinyMCE" :init="tinymce.init" :content="tinymce.content"></wm-tinymce>
    <wm-button @click="getContent()">获取内容</wm-button>
  </wm-main>
</template>

<style scoped>
</style>

<script lang="ts" src="./TinyMCE.ts"></script>