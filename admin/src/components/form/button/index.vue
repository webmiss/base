<template>
  <button class="wm-button" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<style scoped>
.wm-button:focus,button:active:focus,button.active:focus,button.focus,button:active.focus,button.active.focus{outline: none; border-color: transparent; box-shadow:none;}
.wm-button{border: none; background: none;}
.wm-button{line-height: 40px; padding: 0 24px; font-size: 14px; text-align: center; background-color: #595; color: #FFF; border-radius: 4px;}
.wm-button:hover{background-color: #6FB737;}
.wm-button:disabled{background-color: #999;}
</style>

<script>
export default {
  name: 'Botton',
  props: {
    disabled: {type: Boolean, default: false},
  },
}
</script>