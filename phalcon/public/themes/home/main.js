import Inc from '../library/Inc.js'

const vm = new Vue({
  el: '#main',
  data:{
    navScroll: null,
  },
  mounted(){
    /* 当前项目 */
    Inc.self = this;
    /* 导航菜单-滑动 */
    let nav = this.$refs.TopNav;
    if(nav){
      this.navScroll = new BScroll(nav,{click:true,scrollX:true});
    }
  },
  methods:{

    /* 暂不开放 */
    showMsg($msg){
      Inc.toast($msg);
    },

  },
});
