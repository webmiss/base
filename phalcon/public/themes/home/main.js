import Toast from '/themes/library/ui/ui-toast.js'

const vm = new Vue({
  el: '#main',
  data:{
    navScroll: null,
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
