<template>
  <div>
    <button class="button" :disabled="disabled">
      <slot></slot>
    </button>
  </div>
</template>

<style scoped>
button:focus,button:active:focus,button.active:focus,button.focus,button:active.focus,button.active.focus{outline: none; border-color: transparent; box-shadow:none;}
button{border: none; background: none;}
.button{line-height: 40px; padding: 0 24px; text-align: center; background-color: #595; color: #FFF; border-radius: 4px;}
.button:hover{background-color: #6FB737;}
.button:disabled{background-color: #999;}
</style>

<script>
export default {
  name:'Botton',
  props: {
    disabled: {type: Boolean, default: false},
  },
}
</script>