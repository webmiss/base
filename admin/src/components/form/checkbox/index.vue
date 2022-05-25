<template>
  <div class="wm-checkbox" @click.stop="click()">
    <div class="checked" :class="show?'active':''">
      <input type="checkbox" class="checkbox" :value="value">
    </div>
    <div v-if="label" class="name">{{label}}</div>
  </div>
</template>

<style lang="less" scoped>
.wm-checkbox{position: relative; cursor: pointer; display: inline-block; white-space: nowrap; line-height: 32px; padding: 0 8px;}
.wm-checkbox div{display: inline-block;}
.wm-checkbox .checked{position: absolute; top: 50%; margin-top: -8px; width: 14px; height: 14px; border: #C2C4C8 1px solid; background-color: #FFF; border-radius: 2px;}
.wm-checkbox .name{padding-left: 24px; font-size: 14px;}
.wm-checkbox:hover{border-radius: 4px;}
.wm-checkbox:hover .checked{border-color: @Primary;}
.wm-checkbox:hover .name{color: @Primary;}
.wm-checkbox .active{border-color: @Primary; background-color: @Primary;}
.wm-checkbox .active:after{content: ""; position: absolute; width: 4px; height: 8px; border: 2px solid #fff; border-left: 0; border-top: 0; left: 4px; top: 1px; transform-origin: center; transform: rotate(45deg) scaleY(1);}
.wm-checkbox .checkbox{display: none;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Checkbox',
  props: {
    value: {default: ''},                       //checkbox[value]
    label: {type: String, default: ''},         //名称
    checked: {type: Boolean, default: false},   //是否选中
    disclick: {type: Boolean, default: false},  //禁用Click
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

    /* 选择 */
    click(){
      if(this.disclick) return;
      this.$emit('update:checked',this.show=!this.show);
    }

  }
});
</script>