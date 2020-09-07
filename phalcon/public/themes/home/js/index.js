import Env from '../../env.js'
import HtmlDownImg from '../../library/inc/html-down-img.js'
import Popup from '../../components/popup/index.js'

const vm = new Vue({
  el: '#app',
  components: {Popup},
  data:{
    code:{show:false,img:''},
    copy: Env.copy,
  },
  mounted(){
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
      HtmlDownImg(img);
    },

  },
});
