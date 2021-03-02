<template>
  <div
    ref="Switch"
    class="wm-switch"
    @click="$emit('update:value',!value);switchClick();"
  >
    <div ref="SwitchCursor" class="wm-switch_cursor"></div>
  </div>
</template>

<style scoped>
.wm-switch{position: relative; cursor: pointer; width: 40px; height: 20px; border-radius: 10px;}
.wm-switch_cursor{position: absolute; width: 16px; height: 16px; background-color: #FFF; border-radius: 50%; top: 50%; transform: translate(0,-50%);}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Switch',
  props: {
    value: {type: Boolean, default: false}, //值
    activeColor: {type: String, default: '#6FB737'}, //打开时的背景色
    inactiveColor: {type: String, default: '#DCDFE6'}, //打开时的背景色
  },
  mounted(){
    // 初始化
    this.switchClick();
  },
  methods:{

    /* 点击开关 */
    switchClick(){
      // 对象
      const box: any = this.$refs.Switch;
      const cursor: any = this.$refs.SwitchCursor;
      // 动画
      box.style.transitionDuration = `400ms`;
      cursor.style.transitionDuration = `400ms`;
      // 位置
      if(this.value){
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