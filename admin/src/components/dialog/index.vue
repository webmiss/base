<template>
  <wm-popup ref="Popup" :show="show" @update:show="updateShow" :bgClose="bgClose">
    <div class="wm-dialog" :style="{width:width,height:height,maxWidth:maxWidth,maxHeight:maxHeight,backgroundColor:bgColor}">
      <div class="wm-dialog_title">
        <div class="wm-dialog_close" @click="$refs.Popup.close()"></div>
        <div class="title" :style="{textAlign:titleAlign}">{{title}}</div>
      </div>
      <div class="wm-dialog_body">
        <div :style="{padding:bodyPadding}">
          <slot></slot>
        </div>
      </div>
      <div class="wm-dialog_footer" :style="{textAlign:footerAlign}">
        <slot name="footer"></slot>
      </div>
    </div>
  </wm-popup>
</template>

<style scoped>
.wm-dialog{border-radius: 4px;}
.wm-dialog_title{position: relative; height: 48px; font-size: 16px; padding: 0 16px; text-align: center;}
.wm-dialog_title .title{line-height: 48px; user-select: none;}
.wm-dialog_close{cursor: pointer; position: absolute; right: 8px; top: 8px; width: 32px; height: 32px;}
.wm-dialog_close:hover::after,.wm-dialog_close:hover::before{background-color: #6FB737;}
.wm-dialog_close::after,.wm-dialog_close::before{content: ''; position: absolute; width: 16px; height: 2px; background-color: #999; left: 50%; top: 50%; transform-origin: center;}
.wm-dialog_close::after{transform: rotate(45deg); margin-left: -25%;}
.wm-dialog_close::before{transform: rotate(-45deg); margin-left: -25%;}
.wm-dialog_body{overflow: auto; width: 100%; height: calc(100% - 48px - 70px);}
.wm-dialog_footer{height: 40px; padding: 10px 0 20px;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import wmPopup from '../popup/index.vue'
export default defineComponent({
  name: 'Dialog',
  components: {wmPopup},
  props: {
    show: {type: Boolean, default: false}, //是否显示
    title: {type: String, default: ''},  //标题
    width: {type: String, default: '420px'},  //宽
    height: {type: String, default: 'auto'},  //高
    maxWidth: {type: String, default: '900px'},  //最大宽
    maxHeight: {type: String, default: '90%'},  //最大高
    titleAlign: {type: String, default: 'center'},  //标题对齐方式
    footerAlign: {type: String, default: 'center'},  //底部对齐方式
    bodyPadding: {type: String, default: '8px 16px'},  //内容间隙
    bgColor: {type: String, default: '#FFF'},  //内容背景颜色
    bgClose: {type: Boolean, default: false},  //点击背景关闭
    
  },
  watch:{
    show(val){
      if(!val) (this.$refs.Popup as any).close();
    }
  },
  methods:{

    /* 更新状态 */
    updateShow(val: boolean){
      this.$emit('update:show',val);
    },

  },
});
</script>