import Toast from '/themes/library/ui/ui-toast.js'
import WmScrollView from '/themes/components/scroll-view/index.js'

const vm = new Vue({
  components: {WmScrollView},
  el: '#main',
  data:{
  },
  mounted(){
  },
  methods:{

    /* 暂不开放 */
    showMsg($msg){
      Toast($msg);
    },

  },
});
