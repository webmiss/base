import Inc from '../../library/Inc.js'
import Popup from '../../components/popup/index.js'

const vm = new Vue({
  el: '#app',
  components: {Popup},
  data:{
    code:{show:false,img:''},
  },
  mounted(){
    /* 当前项目 */
    Inc.self = this;
  },
  methods:{

    /* 二维码-显示 */
    showCode(img){
      this.code.show = true;
      this.code.img = img;
    },

    /* 二维码-下载 */
    downCode(){
      const img = this.code.img;
      Inc.downImg(img);
    },

  },
});
