<template>
  <wm-popup ref="Popup" :show="show" @update:show="$emit('update:show',$event)" :bgClose="bgClose">
    <div class="wm-dialog" :style="{width:width, height:height, backgroundColor:bgColor}">
      <div class="wm-dialog_title">
        <div class="wm-dialog_close" @click="$emit('update:show', false)"></div>
        <div class="title" :style="{textAlign:titleAlign}">{{title}}</div>
      </div>
      <div ref="DialogBody"  class="wm-dialog_body">
        <div ref="DialogContent" class="wm-dialog_content">
          <slot></slot>
        </div>
      </div>
      <div v-if="isFooter" class="wm-dialog_footer" :style="{textAlign:footerAlign}">
        <slot name="footer"></slot>
      </div>
    </div>
  </wm-popup>
</template>

<style lang="less" scoped>
.wm-dialog{border-radius: 4px; padding-bottom: 4px;}
.wm-dialog_title{position: relative; height: 40px; font-size: 16px; padding: 0 8px; text-align: center;}
.wm-dialog_title .title{line-height: 40px; user-select: none;}
.wm-dialog_close{cursor: pointer; position: absolute; right: 8px; top: 4px; width: 32px; height: 32px; border-radius: 50%;}
.wm-dialog_close:hover::after,.wm-dialog_close:hover::before{background-color: @Primary;}
.wm-dialog_close::after,.wm-dialog_close::before{content: ''; position: absolute; width: 14px; height: 1.6px; background-color: #999; left: 50%; top: 50%; transform-origin: center;}
.wm-dialog_close::after{transform: rotate(45deg); margin-left: -16%;}
.wm-dialog_close::before{transform: rotate(-45deg); margin-left: -16%;}
.wm-dialog_footer{height: 40px; padding: 8px 0 16px;}
/* 滚动条 */
.wm-dialog_body{overflow: auto; width: 100%; height: calc(100% - 40px - 60px);}
.wm-dialog_body::-webkit-scrollbar{width: 8px;}
.wm-dialog_body::-webkit-scrollbar-thumb{border-radius: 4px; background: rgba(136,136,136,0.4);}
.wm-dialog_body:hover::-webkit-scrollbar-track{background: rgba(136,136,136,0.1);}
/* 内容 */
.wm-dialog_content{padding: 0px 16px 16px;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex';
import wmPopup from '../popup/index.vue'
import HtmlObserve from '../../library/html/observe'
export default defineComponent({
  name: 'Dialog',
  components: {wmPopup},
  props: {
    show: {type: Boolean, default: false},          //是否显示
    title: {type: String, default: ''},             //标题
    width: {type: String, default: '420px'},        //宽
    height: {type: String, default: 'auto'},        //高
    hMargin: {type: Number, default: 16},           //高度边距
    titleAlign: {type: String, default: 'center'},  //标题对齐方式
    footerAlign: {type: String, default: 'center'}, //底部对齐方式
    bgColor: {type: String, default: '#FFF'},       //内容背景颜色
    bgClose: {type: Boolean, default: false},       //点击背景关闭
    isFooter: {type: Boolean, default: true},       //是否底部
  },
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    return {state};
  },
  watch:{
    show(val){
      if(!val){
        (this.$refs.Popup as any).close();
      }else{
        this.autoHeight();
      }
    }
  },
  mounted(){
  },
  methods:{

    /* 监听高度 */
    autoHeight(){
      HtmlObserve(this.$refs.DialogBody, ()=>{
        this.changeHeight();
      });
    },
    changeHeight(){
      setTimeout(()=>{
        let body: any = this.$refs.DialogBody;
        let content: any = this.$refs.DialogContent;
        let val: string = getComputedStyle(content).getPropertyValue('height');
        let bh: number = this.state.height;
        let h: number = parseInt(val.replace(/(px)/g, ''))+40+60+this.hMargin*2;
        if(h>bh) body.style.height = bh-48-60-this.hMargin*2+'px';
        else body.style.height = '';
      }, 300);
    },

  },
});
</script>