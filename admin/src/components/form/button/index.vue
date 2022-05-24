<template>
  <button ref="Button" class="wm-button" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<style scoped>
.wm-button:focus,button:active:focus,button.active:focus,button.focus,button:active.focus,button.active.focus{outline: none; border-color: transparent; box-shadow:none;}
.wm-button{user-select: none; margin: 0 4px; border: transparent 1px solid; background: none; cursor: pointer; font-size: 14px; text-align: center; border-radius: 4px; box-sizing: border-box;}
.wm-button:hover{opacity: 0.8;}
.wm-button:disabled{background-color: #999;}
</style>

<script lang="ts">
import Env from '../../../env'
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Botton',
  props: {
    type: {type: String, default: 'primary'},         //类型: primary、success、warning、danger、info、text
    effect: {type: String, default: 'dark'},          //样式: plain、dark
    height: {type: String, default: '40px'},          //高度
    padding: {type: String, default: '0 24px'},       //间距
    fontSize: {type: String, default: '14px'},        //字体大小
    disabled: {type: Boolean, default: false},        //是否禁用
    textPadding: {type: String, default: '4px 4px'},  //文本按钮-间距
    textColor: {type: String, default: 'primary'},    //文本按钮-颜色
  },
  data(){
    const color: object = {
        primary: Env.themes.primary,
        success: Env.themes.success,
        warning: Env.themes.warning,
        danger: Env.themes.danger,
        info: Env.themes.info,
      };
    return {color};
  },
  mounted(){
    const obj: any = this.$refs.Button;
    let color: any;
    if(this.type != 'text'){
      color = (this.color as any)[this.type][this.effect];
      // 颜色
      obj.style.color = color[0];
      obj.style.borderColor = color[1];
      obj.style.backgroundColor = color[2];
      // 大小
      obj.style.height = this.height;
      obj.style.lineHeight = this.height;
      obj.style.fontSize = this.fontSize;
      obj.style.padding = this.padding;
    }else{
      obj.style.color = (Env.themes as any)[this.textColor].plain[0];
      obj.style.padding = this.textPadding;
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