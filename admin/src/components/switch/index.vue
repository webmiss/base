<template>
  <div ref="Switch" class="wm-switch" @click="click();">
    <div ref="SwitchCursor" class="wm-switch_cursor"></div>
  </div>
</template>

<style lang="less" scoped>
.wm-switch{position: relative; cursor: pointer; width: 40px; height: 20px; border-radius: 10px; transition: @Transition;}
.wm-switch_cursor{position: absolute; width: 16px; height: 16px; background-color: #FFF; border-radius: 50%; top: 50%; transform: translate(0,-50%); transition: @Transition;}
</style>

<script lang="ts">
import Env from '../../env'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Switch',
  props: {
    value: {type: Boolean, default: false},                               //值
    activeColor: {type: String, default: Env.themes.primary.plain[0]},    //打开颜色
    inactiveColor: {type: String, default: Env.themes.border.plain[0]},     //关闭颜色
  },
  data(){
    const show: Boolean = false;
    return {show};
  },
  watch:{
    value(val: any){
      this.show = val;
      this.switch();
    }
  },
  mounted(){
    // 初始化
    this.show = this.value;
    this.switch();
  },
  methods:{

    /* 选择 */
    click(){
      // 事件
      this.show=!this.show
      this.$emit('update:value', this.show);
      // 动画
      this.switch();
    },

    /* 动画 */
    switch(){
      // 对象
      const box: any = this.$refs.Switch;
      const cursor: any = this.$refs.SwitchCursor;
      // 动画
      // box.style.transitionDuration = `400ms`;
      // cursor.style.transitionDuration = `400ms`;
      // 位置
      if(this.show){
        box.style.backgroundColor = this.activeColor;
        cursor.style.left = '22px';
      }else{
        box.style.backgroundColor = this.inactiveColor;
        cursor.style.left = '2px';
      }
    }
    
  }
});
</script>