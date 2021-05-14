<template>
  <wm-main>
    <wm-tinymce :config="tinymce.init" :upload="tinymce.upload" :content="tinymce.content" @update:value="tinymce.content=$event"></wm-tinymce>
    <div class="demo_tinymce_but">
      <wm-button @click="subContent()">提交内容</wm-button>
    </div>
  </wm-main>
</template>

<style scoped>
.demo_tinymce_but{padding: 16px 0;}
</style>

<script lang="ts" src="./TinyMCE.ts"></script>