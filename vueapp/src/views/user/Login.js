import Vue from 'vue'
/* 组件 */
import PageView from '@/components/page-view'

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
  },
  methods:{

    /* 返回 */
    back(){
      this.$router.goBack(-1);
    },

  }
}