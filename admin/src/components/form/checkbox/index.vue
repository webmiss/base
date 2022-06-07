<template>
  <ul class="wm-checkbox">
    <li class="disabled" v-if="disabled">
      <span class="checked" :class="show?'active':''">
        <input type="checkbox" class="checkbox" :value="value">
      </span>
      <span class="label">{{ label }}</span>
    </li>
    <li class="enabled" v-else @click="$emit('update:checked',this.show=!this.show)">
      <span class="checked" :class="show?'active':''">
        <input type="checkbox" class="checkbox" :value="value">
      </span>
      <span class="label">{{ label }}</span>
    </li>
  </ul>
</template>

<style lang="less" scoped>
.wm-checkbox{display: inline-block; height: 26px; line-height: 26px;}
.wm-checkbox li{float: left; cursor: pointer; padding: 5px; margin: 0 4px;}
.wm-checkbox span{float: left;}
.wm-checkbox .checkbox{display: none;}
.wm-checkbox .checked{position: relative; display: inline-block; width: 15px; height: 15px; border: @BorderColor 1px solid; border-radius: 2px; background-color: #FFF; transition: @Transition;}
.wm-checkbox .label{display: inline-block; height: 15px; line-height: 15px; padding-left: 6px;}
.wm-checkbox .enabled:hover .checked{border-color: @Primary;}
.wm-checkbox .enabled:hover .label{color: @Primary;}
.wm-checkbox .active{position: relative; border-color: @Primary; background-color: @Primary;}
.wm-checkbox .active::after{content: ""; position: absolute; width: 4px; height: 8px; border: 2px solid #fff; border-left: 0; border-top: 0; left: 5px; top: 2px; transform: rotate(45deg);}
.wm-checkbox .disabled{cursor: not-allowed;}
.wm-checkbox .disabled .checked{background-color: #F2F2F2;}
.wm-checkbox .disabled .label{color: @Disabled;}
.wm-checkbox .disabled .active{border-color: @BorderColor;}
.wm-checkbox .disabled .active::after{border-color: @Disabled;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Checkbox',
  props: {
    value: {default: ''},                       //checkbox[value]
    label: {type: String, default: ''},         //名称
    checked: {type: Boolean, default: false},   //是否选中
    disabled: {type: Boolean, default: false},  //禁用Click
  },
  watch:{
    checked(val: boolean){
      this.show = val;
    }
  },
  data(){
    const show: Boolean = false;
    return {show};
  },
  mounted(){
    this.show = this.checked;
  },
  methods:{
  }
});
</script>