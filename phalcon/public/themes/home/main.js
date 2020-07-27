import {Toast} from '../library/ui/index.js'

const vm = new Vue({
  el: '#main',
  data:{
    navScroll: null,
  },
  mounted(){
    /* 导航菜单-滑动 */
    let nav = this.$refs.TopNav;
    if(nav) this.navScroll = new BScroll(nav,{click:true,scrollX:true});
  },
  methods:{

    /* 暂不开放 */
    showMsg($msg){
      Toast($msg);
    },

  },
});
