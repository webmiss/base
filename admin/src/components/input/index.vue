<template>
  <div>
    <input
      :value="value"
      @input="$emit('update:value', $event.target.value)"
      :type="type"
      :maxlength="maxlength"
      :placeholder="placeholder">
  </div>
</template>

<style scoped>
input{border: none; background: none; -webkit-appearance: none; outline: none; font: 400 14px Arial; caret-color: #595;}
input{width: 100%; box-sizing: border-box; height: 40px; line-height: 20px; padding: 10px 16px; border-radius: 4px; border: #DADCDF 1px solid; background-color: #F2F4F6;}
input:hover{border: #6FB737 1px solid;}
input:focus{outline: none;}
</style>

<script>
export default {
  name:'Input',
  props: {
    value: {type: String, default: ''},
    type: {type: String, default: 'text'},
    maxlength: {type: String, default: ''},
    placeholder: {type: String, default: ''},
  },
}
</script>