<template>
  <div ref="form">
    <slot></slot>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name:'Form',
  props: {
    labelWidth: {type: String, default: '90px'},
    labelHeight: {type: String, default: '40px'},
  },
  mounted(){
    // 设置宽度
    const form = this.$refs.form;
    const label = form.getElementsByTagName('label');
    const body = form.getElementsByClassName('wm-form_item_body');
    for(let i=0; i<label.length; i++){
      label[i].style.width = this.labelWidth;
      body[i].style.marginLeft = this.labelWidth;
      label[i].style.height = this.labelHeight;
    }
  },
}
</script>