<template>
  <div class="wm-page" :style="{padding: padding}">
    <div class="wm-page_info">共 {{total}} 条, {{max}} 页, 每页 {{limit}} 条 </div>
    <ul class="wm-page_list">
      <li class="arrow arrow_dis" v-if="page<=1"><i class="wm-page_arrow_left"></i></li>
      <li class="arrow" v-else @click="toPage(page-1)"><i class="wm-page_arrow_left"></i></li>
      <li v-for="(val,key) in lists" :key="key" :class="val==page?'active':''" @click="toPage(val)">
        {{val}}
      </li>
      <li class="arrow arrow_dis" v-if="page>=max"><i class="wm-page_arrow_right"></i></li>
      <li class="arrow" v-else @click="toPage(page+1)"><i class="wm-page_arrow_right"></i></li>
    </ul>
    <div class="wm-page_info flex">
      <wm-input :value="input" @update:value="subInput" placeholder="页码" width="60px" height="28px" align="center" padding="4px 2px" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.wm-page{overflow: hidden; white-space: nowrap; text-align: center; margin: 8px 0;}
.wm-page_info{display: inline-block; vertical-align: middle; white-space: nowrap; line-height: 28px; padding: 0 16px; font-size: 12px; color: #999;}
.wm-page_list{display: inline-block; vertical-align: middle; user-select: none; white-space: nowrap;}
.wm-page_list li{position: relative; float: left; cursor: pointer; height: 28px; line-height: 28px; min-width: 28px; padding: 0 4px; margin: 0 auto; margin: 0 4px; font-size: 13px; font-weight: bold; color: #24292E; background-color: #F4F6F8; border-radius: 4px; box-sizing: border-box;}
.wm-page_list li:hover{color: @Primary;}
.wm-page_list .arrow{width: 28px; padding: 0;}
.wm-page_list .arrow i{position: absolute;}
.wm-page_list .arrow i::after{content: ''; position: absolute; top: 9px; width: 6px; height: 6px; border: #666 2px solid; border-left: 0; border-top: 0; transform-origin: center;}
.wm-page_arrow_left::after{transform: rotate(135deg) scaleY(1); left: -4px;}
.wm-page_arrow_right::after{transform: rotate(-45deg) scaleY(1); left: -6px;}
.wm-page_list .arrow_dis{cursor: not-allowed;}
.wm-page_list .arrow_dis i::after{border-color: #999;}
.wm-page_list .active{background-color: @Primary; color: #FFF;}
.wm-page_list .active:hover{background-color: @Primary; color: #FFF;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import wmInput from '../form/input/index.vue'
import PriceToFixed from '@/library/price/to-fixed'
export default defineComponent({
  name: 'Page',
  components: {wmInput},
  props: {
    page: {type: Number, default: 1},           //当前页码: 1
    limit: {type: Number, default: 10},         //每页条数: 10
    total: {type: Number, default: 0},          //总条目数: 0
    maxPage: {type: Number, default: 11},       //显示页数: 11
    padding: {type: String, default: '16px 0'}, //边距: '32px 0'
  },
  data(){
    const max: number = 0;
    const lists: number[] = [];
    const input: string = '';
    const timeTmp: any = null;
    return {max, lists, input, timeTmp}
  },
  watch:{
    total(val){
      this.init();
    }
  },
  methods:{

    /* 初始化 */
    init(){
      this.max = Math.ceil(this.total/this.limit);
      this.toPage(this.page, false);
    },

    /* 翻页 */
    toPage(n: number, isPage: boolean=true){
      // 是否数据
      if(this.total==0) return this.lists = [];
      // 边界
      let page = n;
      if(n<1) page = 1;
      else if(n>this.max) page = this.max;
      // 中间
      let list = [];
      const nx = PriceToFixed(this.maxPage/2, 0);
      const start = n-nx>=1?n-nx:1;
      if(this.max>this.maxPage){
        for(let i=0; i<this.maxPage; i++){
          if(n+nx<=this.max) list.push(start+i);
          else list.push(start+i-(n+nx-this.max));
        }
      }else{
        for(let i=0; i<this.max; i++) list.push(i+1);
      }
      this.lists = list;
      // 更新页码
      if(isPage) this.$emit('update:page',page);
    },

    /* 跳转 */
    subInput(n: any){
      let page: number = parseInt(n) || 1;
      if(n<1) page = 1;
      else if(n>this.max) page = this.max;
      this.input = '';
      clearTimeout(this.timeTmp);
      this.timeTmp = setTimeout(()=>{
        this.input = page>=1?page.toString():'';
        this.toPage(page,true);
      },2000);
    },

  },
});
</script>