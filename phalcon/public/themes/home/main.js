import Inc from '../library/Inc.js'
const vm = new Vue({
  el: '#app',
  data:{
    docScroll: null,
  },
  mounted(){
    /* 项目 */
    Inc.self = this;
  },
  methods:{

    /* 暂不开放 */
    showMsg($msg){
      Inc.toast($msg);
    },

  },
});
