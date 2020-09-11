import Back from '../../library/ui/ui-back'
/* 组件 */
import PageView from '@/components/page-view'
import WmScrollView from '@/components/scroll-view'

export default {
  components: {PageView,WmScrollView},
  data(){
    return {
      lists:[0,1,2],
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
      if(res=='left') return Back(this,1);
    },

    /* 下拉刷新 */
    reFresh(res){
      this.lists = [0,1,2,3,4,5,6,7,8,9];
    },

    /* 上拉加载 */
    upLoad(res){
      setTimeout(()=>{
        for(let i=0; i<10; i++) this.lists.push(i);
      },1000);
    }

  }
}