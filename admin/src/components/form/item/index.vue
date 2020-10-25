<template>
  <div class="wm-form_item" :style="{margin:margin}">
    <label class="wm-form_item_label">{{label}}</label>
    <div class="wm-form_item_body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.wm-form_item{line-height: 40px;}
.wm-form_item_label{float: left; text-align: right; padding-right: 16px; color: #666; font-size: 14px; box-sizing: border-box;}
.wm-form_item_body{margin-left: 80px;}
</style>

<script>
export default {
  name: 'FormItem',
  props: {
    type: {type: String, default: 'label'},
    label: {type: String, default: ''},
  },
  data(){
    return {
      margin: '',
    }
  },
  mounted(){
    if(this.type=='label') this.margin = '8px 0';
    else if(this.type=='botton') this.margin = '24px 0';
  },
}
</script>