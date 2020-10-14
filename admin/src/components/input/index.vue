<template>
  <div>
    <input :value="value" @input="$emit('update:value', $event.target.value)" :type="type" :placeholder="placeholder">
  </div>
</template>

<style scoped>
input{border: none; background: none; width: calc(100% - 32px); height: 32px; line-height: 32px; padding: 4px 16px; border-radius: 4px; border: #DADCDF 1px solid; background-color: #F2F4F6;}
input:hover{border: #6FB737 1px solid;}
input:focus{outline: none;}
</style>

<script>
export default {
  name:'Input',
  props: {
    value: {type: String, default: ''},
    type: {type: String, default: 'text'},
    placeholder: {type: String, default: ''},
  },
}
</script>