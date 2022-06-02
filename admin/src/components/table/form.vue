<template>
  <table
    ref="wmTableForm"
    class="wm-table_form"
    :style="{margin:margin, backgroundColor:bgColor}"
  >
    <slot></slot>
  </table>
</template>

<style>
.wm-table_form{width: 100%; border-collapse: collapse; border-radius: 4px;}
.wm-table_form .title{font-size: 14px; font-weight: bold; text-indent: 4px;}
.wm-table_form .lable{color: #627488; text-align: right;}
.wm-table_form td{position: relative; padding: 4px 8px; line-height: 28px; border: #FFF 1px solid;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'TableForm',
  components: {},
  props: {
    width: {type: String, default: '80px'},      //外部间距
    margin: {type: String, default: '4px 0'},    //外部间距
    bgColor: {type: String, default: '#FFF'},    //显示标题
  },
  mounted(){
    const obj = (this.$refs.wmTableForm as any).querySelectorAll('.lable');
    for(let i=0; i<obj.length; i++){
        obj[i].style.width = this.width;
      }
  },
  methods:{
  },
});
</script>