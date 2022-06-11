<template>
  <ul class="wm-radio">
    <template v-for="(v,k) in data" :key="k">
      <li class="disabled" v-if="v.disabled">
        <span class="checked" :class="v.value==value?'active':''"></span>
        <span class="label">{{v.label}}</span>
      </li>
      <li class="enabled" v-else @click.stop="$emit('update:value',v.value)">
        <span class="checked" :class="v.value==value?'active':''"></span>
        <span class="label">{{v.label}}</span>
      </li>
    </template>
  </ul>
</template>

<style lang="less" scoped>
.wm-radio{height: 26px; line-height: 26px;}
.wm-radio li{float: left; cursor: pointer; padding: 5px; margin: 0 4px;}
.wm-radio span{float: left;}
.wm-radio .checked{position: relative; display: inline-block; width: 15px; height: 15px; border: @BorderColor 1px solid; border-radius: 50%; background-color: #FFF; transition: @Transition;}
.wm-radio .label{display: inline-block; height: 15px; line-height: 15px; padding-left: 6px;}
.wm-radio .enabled:hover{background-color: #FFF;}
.wm-radio .enabled:hover .checked{border-color: @Primary;}
.wm-radio .enabled:hover .label{color: @Primary;}
.wm-radio .active{border-color: @Primary; background-color: @Primary;}
.wm-radio .active::after{content: ""; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-56%); width: 6px; height: 6px; background-color: #FFF; border-radius: 50%;}
.wm-radio .disabled{cursor: not-allowed;}
.wm-radio .disabled .checked{background-color: #F2F2F2;}
.wm-radio .disabled .label{color: @Disabled;}
.wm-radio .disabled .active{border-color: @BorderColor;}
.wm-radio .disabled .active::after{background-color: @Disabled;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Radio',
  props: {
    value: {type:String, default:''},  //默认选择
    data: {type: Array, default: []},   //数据: [{label:'男',value:'男', disabled: true},{label:'女',value:'女'}]
  },
  methods:{
  },
});
</script>