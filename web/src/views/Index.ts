import { defineComponent } from 'vue';
import Env from '@/env'
import NavigateTo from '@/library/ui/ui-navigate-to'
import HtmlDownImg from '@/library/inc/html-down-img'
/* 组件 */
import wmPopup from '@/components/popup/index.vue'

export default defineComponent({
  components: {wmPopup},
  data(){
    const apiUrl: string = Env.apiUrl;
    const code: any = {show: false,img: ''};
    return {apiUrl, code,}
  },
  mounted(){
  },
  methods:{

    /* 打开URL */
    openUrl(url: string){
      NavigateTo(url);
    },

    /* 二维码 */
    showCode(img: string){
      this.code.show = true;
      this.code.img = this.apiUrl+img;
    },
    /* 二维码-下载 */
    downCode(){
      HtmlDownImg(this.code.img);
    },

  }
});
