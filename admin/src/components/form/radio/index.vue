<template>
  <div>
    <div class="wm-radio_item" v-for="(v,k) in data" :key="k" @click="$emit('update:value',v.value)">
      <div class="checked" :class="v.value==value?'active':''"></div>
      <div class="name">{{v.label}}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wm-radio_item{position: relative; cursor: pointer; display: inline-block; white-space: nowrap; line-height: 32px; padding: 0 16px 0 8px;}
.wm-radio_item div{display: inline-block;}
.wm-radio_item .checked{position: absolute; top: 50%; margin-top: -8px; width: 16px; height: 16px; border: #DCDFE6 1px solid; background-color: #F2F4F6; border-radius: 50%;}
.wm-radio_item .name{padding-left: 24px; font-size: 14px;}
.wm-radio_item:hover{border-radius: 4px;}
.wm-radio_item:hover .checked{border-color: @Primary;}
.wm-radio_item:hover .name{color: @Primary;}
.wm-radio_item .active{border-color: @Primary; background-color: @Primary;}
.wm-radio_item .active::after{content: ""; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 5px; height: 5px; background-color: #FFF; border-radius: 50%;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Radio',
  props: {
    value: {type:String, default:''},  //默认选择
    data: {type: Array, default: []},   //数据: [{label:'男',value:'男'},{label:'女',value:'女'}]
  },
  methods:{
  },
});
</script>