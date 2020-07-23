import {Back} from '@/library/inc'
/* 组件 */
import PageView from '@/components/page-view'
import ScrollView from '@/components/scroll-view'

export default {
  components: {PageView,ScrollView},
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
  methods:{

    /* 返回 */
    back(res){
      if(res=='left') return Back(1,this);
    },

  }
}