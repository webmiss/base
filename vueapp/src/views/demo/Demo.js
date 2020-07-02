import Vue from 'vue'
/* 组件 */
import PageView from '@/components/page-view'
/* Scroll */
import BScroll from 'better-scroll'
/* 监听左滑 */
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'});

export default {
  components: {PageView},
  data(){
    return {
      indexData:{scroll:null,},
      lists:[0,1,2,3,4,5,6,7,8,9],
    }
  },
  computed:{
    mode(){ return this.$store.state.mode; },
  },
  mounted(){
  },
  activated(){
    this.indexScroll();
    // 追加
    setTimeout(()=>{
      for(let i=10;i<=15;i++) this.lists.push(i);
    },3000);
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