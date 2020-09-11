<template>
<div class="wm-tab_html">
  <scroll-view class="wm-tab_scroll" :isScroll="scroll" :scroll-x="true" :upperLoad="false">
    <div class="wm-tab_body">
      <div class="wm-tab_list" :style="{width:nw}">
        <div class="wm-tab_text" :style="{width:w+'%'}" v-for="(v,k) in list" :key="k" :class="active==k?'wm-tab_active':''" @click="tabClick(k,v)">
          <span class="text">{{v.name}}</span>
        </div>
      </div>
      <div class="wm-tab_line" :style="{width:w+'%', transform:transform}"></div>
    </div>
  </scroll-view>
</div>
</template>

<style scoped>
.wm-tab_html{overflow: hidden; user-select: none;}
.wm-tab_scroll{width: inherit; height: inherit;}
.wm-tab_body{position: relative; width: 100%; height: 100%; box-shadow: 0 1px 0 #F2F2F2;}
.wm-tab_list{display: flex; height: 100%;}
.wm-tab_text{display: flex; flex: 1; align-items: center;}
.wm-tab_text .text{flex: 1; text-align: center;}
.wm-tab_line{position: absolute; transition: transform 300ms; z-index: 10; height: 3px; bottom: 0; border-radius: 3px; width: 50px; background-color: #6FB737;}
.wm-tab_active{color: #6FB737;}
</style>

<script>
import ScrollView from '@/components/scroll-view'
export default {
  name: 'Tab',
  components: {ScrollView},
  model: {
    prop: "active",
    event: 'active',
  },
  props: {
    active: {type: Number, default: 0},
    list: {type: Array, default: []},
    num: {type: Number, default: 4},
  },
  data(){
    return {
      scroll: false,
      w: 0,
      nw: 0,
      transform: 'translate(-100%,0)',
    }
  },
  mounted(){
    this.init();
  },
  methods:{

    /* 初始化 */
    init(){
      /* 数量 */
      let t = this.list.length;
      let n = t;
      if(t>this.num){
        n = this.num;
        this.scroll = true;
      }
      /* 等分宽度 */
      this.w = 100/n;
      this.nw = t*this.w+'%'
      /* 底边 */
      this.moveLine(this.active);
      return ;
      this.objMenu.style.width = t*this.w+'%';
      for(let i=0; i<t; i++){
        this.objMenu.children[i].style.width = this.w+'%';
      }
      /* 底边 */
      this.objLine = this.$refs.line;
      this.objLine.style.width = this.w+'%';
      this.objLine.style.transition = 'transform 300ms';
      this.objLine.style.transform = 'translate(-100%,0)';
      this.moveLine(this.active);
    },

    /* 切换菜单 */
    tabClick(k,v){
      this.moveLine(k);
      this.$emit('active',k);
      this.$emit('change',[k,v]);
    },

    /* 动画 */
    moveLine(n){
      this.transform = 'translate('+n*100+'%,0)';
    },

  }
}
</script>
