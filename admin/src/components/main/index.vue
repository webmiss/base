<template>
  <div class="wm-main wm-main_y">
    <div class="wm-main_body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.wm-main{overflow: auto; height: 100%;}
.wm-main_body{padding: 16px;}
/* 滚动条 */
.wm-main_y::-webkit-scrollbar{width: 8px;}
.wm-main_y::-webkit-scrollbar-thumb{border-radius: 4px; background: transparent;}
.wm-main_y:hover::-webkit-scrollbar-thumb{background: rgba(136,136,136,0.4);}
.wm-main_y:hover::-webkit-scrollbar-track{background: rgba(136,136,136,0.1);}
</style>

<script>
export default {
  name:'Main',
}
</script>