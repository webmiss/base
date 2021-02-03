<template>
  <button ref="Button" class="wm-button" :disabled="disabled" @mouseover="opacity(0.8)" @mouseout="opacity(1)">
    <slot></slot>
  </button>
</template>

<style scoped>
.wm-button:focus,button:active:focus,button.active:focus,button.focus,button:active.focus,button.active.focus{outline: none; border-color: transparent; box-shadow:none;}
.wm-button{user-select: none; border: #DCDFE6 1px solid; background: none; cursor: pointer; line-height: 40px; font-size: 14px; text-align: center; border-radius: 4px; box-shadow: 0 2px 3px rgba(0,0,0,.1);}
.wm-button:disabled{background-color: #999;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Botton',
  props: {
    type: {type: String, default: 'primary'}, //类型: primary、info、warning、danger
    size: {type: String, default: 'default'}, //尺寸: default、medium、mini
    effect: {type: String, default: 'dark'}, //样式: plain、dark
    disabled: {type: Boolean, default: false},  //是否禁用
  },
  data(){
    const color: object = {
        primary:{
          plain:['#C2E7B0','#F0F9EB','#6FB737'],
          dark:['#595','#595','#FFF'],
        },
        info:{
          plain:['#DCDFE6','#F4F6F8','#909399'],
          dark:['#909399','#909399','#FFF'],
        },
        warning:{
          plain:['#F5DAB1','#FDF6EC','#E6A23C'],
          dark:['#E6A23C','#E6A23C','#FFF'],
        },
        danger:{
          plain:['#FBC4C4','#FEF0F0','#F56C6C'],
          dark:['#F56C6C','#F56C6C','#FFF'],
        },
      };
    return {color};
  },
  mounted(){
    const box: any = this.$refs.Button;
    const color = (this.color as any)[this.type][this.effect];
    // 颜色
    box.style.borderColor = color[0];
    box.style.backgroundColor = color[1];
    box.style.color = color[2];
    // 大小
    if(this.size=='default'){
       box.style.height = '40px';
       box.style.lineHeight = '40px';
       box.style.fontSize = '14px';
       box.style.padding = '0 24px';
    }else if(this.size=='medium'){
       box.style.height = '30px';
       box.style.lineHeight = '30px';
       box.style.fontSize = '13px';
       box.style.padding = '0 16px';
    }else if(this.size=='mini'){
       box.style.height = '24px';
       box.style.lineHeight = '24px';
       box.style.fontSize = '12px';
       box.style.padding = '0 8px';
    }
  },
  methods:{

    /* 透明度 */
    opacity(val: number){
      const box: any = this.$refs.Button;
      box.style.opacity = val;
    },

  },
});
</script>