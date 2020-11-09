<template>
  <div class="wm-page" :style="{padding: padding}">
    <div class="wm-page_info">共 {{total}} 条, {{max}} 页</div>
    <ul class="wm-page_list">
      <li class="arrow arrow_dis" v-if="page<=1"><i class="arrow_left"></i></li>
      <li class="arrow" v-else @click="toPage(page-1)"><i class="arrow_left"></i></li>
      <li v-for="(val,key) in lists" :key="key" :class="val==page?'active':''" @click="toPage(val)">
        {{val}}
      </li>
      <li class="arrow arrow_dis" v-if="page>=max"><i class="arrow_right"></i></li>
      <li class="arrow" v-else @click="toPage(page+1)"><i class="arrow_right"></i></li>
    </ul>
    <div class="wm-page_info flex">
      <wm-input :value="input" @update:value="subInput" placeholder="页码" width="60px" height="28px" align="center" padding="4px 2px" />
    </div>
  </div>
</template>

<style scoped>
.wm-page{overflow: hidden; white-space: nowrap; text-align: center;}
.wm-page_info{display: inline-block; vertical-align: middle; white-space: nowrap; line-height: 28px; padding: 0 16px; font-size: 12px; color: #999;}
.wm-page_list{display: inline-block; vertical-align: middle; user-select: none; white-space: nowrap;}
.wm-page_list li{position: relative; float: left; cursor: pointer; height: 28px; line-height: 28px; min-width: 28px; padding: 0 4px; margin: 0 auto; margin: 0 4px; font-size: 13px; font-weight: bold; color: #24292E; background-color: #F4F6F8; border-radius: 4px; box-sizing: border-box;}
.wm-page_list li:hover{color: #595;}
.wm-page_list .arrow{width: 28px; padding: 0;}
.wm-page_list .arrow i{position: absolute;}
.wm-page_list .arrow i::after{content: ''; position: absolute; top: 9px; width: 6px; height: 6px; border: #666 2px solid; border-left: 0; border-top: 0; transform-origin: center;}
.wm-page_list .arrow_left::after{transform: rotate(135deg) scaleY(1); left: -4px;}
.wm-page_list .arrow_right::after{transform: rotate(-45deg) scaleY(1); left: -6px;}
.wm-page_list .arrow_dis{cursor: not-allowed;}
.wm-page_list .arrow_dis i::after{border-color: #999;}
.wm-page_list .active{background-color: #6FB737; color: #FFF;}
.wm-page_list .active:hover{background-color: #595; color: #FFF;}
</style>

<script>
import wmInput from '../form/input'
export default {
  name: 'Page',
  components: {wmInput},
  props: {
    page: {type: Number, default: 1}, //当前页码: 1
    limit: {type: Number, default: 10}, //每页条数: 10
    total: {type: Number, default: 0}, //总条目数: 0
    padding: {type: String, default: '32px 0'}, //边距: '32px 0'
  },
  data(){
    return {
      max: 0,
      lists: [],
      input: '',
    }
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
      this.toPage(this.page,false);
    },

    /* 翻页 */
    toPage(n,isPage){
      // 是否数据
      if(this.total==0) return this.lists = [];
      // 边界
      let page = n;
      if(n<1) page = 1;
      else if(n>this.max) page = this.max;
      // 中间
      let list = [];
      const start = n-2>=1?n-2:1;
      if(this.max>5){
        for(let i=0; i<5; i++){
          if(n+2<=this.max) list.push(start+i);
          else list.push(start+i-(n+2-this.max));
        }
      }else{
        for(let i=0; i<this.max; i++) list.push(i+1);
      }
      this.lists = list;
      // 更新页码
      isPage = isPage==false?false:true;
      if(isPage) this.$emit('update:page',page);
    },

    /* 跳转 */
    subInput(n){
      n = parseInt(n);
      let page = n || 1;
      if(n<1) page = 1;
      else if(n>this.max) page = this.max;
      this.input = '';
      clearTimeout(this.timeTmp);
      this.timeTmp = setTimeout(()=>{
        this.input = page>=1?page:'';
        this.toPage(page);
      },2000);
    },

  },
}
</script>