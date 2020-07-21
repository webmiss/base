<template>
<scroll-view class="wm-tab_body" :scroll="scroll" :scroll-x="true" :upperLoad="false" :lowerLoad="false">
  <div ref="menu" class="wm-tab_list">
    <div class="wm-tab_text" v-for="(v,k) in list" :key="k" :class="active==k?'wm-tab_active':''" @click="tabClick(k,v)">
      <span>{{v.name}}</span>
    </div>
  </div>
  <div ref="line" class="wm-tab_line"></div>
</scroll-view>
</template>

<style scoped>
.wm-tab_body{overflow: hidden; width: 100%; box-shadow: 0 1px 0 #F2F2F2; user-select: none;}
.wm-tab_list{display: flex; height: 100%;}
.wm-tab_text{display: flex; align-items: center; box-sizing: border-box; flex: 1;}
.wm-tab_text span{text-align: center; flex: 1;}
.wm-tab_line{position: absolute; z-index: 10; height: 3px; bottom: 0; border-radius: 3px; width: 50px; background-color: #6FB737;}

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
      objMenu: null,
      objLine: null,
      scroll: false,
      w: 0,
    }
  },
  mounted(){
    this.init();
  },
  methods:{

    /* 初始化 */
    init(){
      // 对象
      this.objMenu = this.$refs.menu;
      /* 数量 */
      let t = this.list.length;
      let n = t;
      if(t>this.num){
        n = this.num;
        this.scroll = true;
      }
      /* 等分宽度 */
      this.w = 100/n;
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
      this.objLine.style.transform = 'translate('+n*100+'%,0)';
    },

  }
}
</script>
