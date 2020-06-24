import Vue from 'vue'
/* 组件 */
import PageView from '@/components/page-view'

/* Scroll */
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup);

/* 监听左滑 */
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'});

export default {
  components: {PageView},
  data(){
    return {
      indexData:{scroll:null,},
    }
  },
  computed:{
    mode(){ return this.$store.state.mode; },
  },
  mounted(){
  },
  activated(){
    this.indexScroll();
  },
  methods:{

    /* 返回 */
    back(){
      this.$router.goBack(-1);
    },

    /* 滑块 */
    indexScroll(){
      setTimeout(()=>{
        if(this.indexData.scroll) return this.indexData.scroll.refresh();
        this.indexData.scroll = new BScroll(this.$refs.index,{click:true,pullUpLoad:true});
      },300);
    },

  }
}