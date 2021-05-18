import { defineComponent } from 'vue';
import Env from './env'
import NavigateTo from '@/library/ui/ui-navigate-to'
/* 组件 */
import WmScrollView from '@/components/scroll-view/index.vue'

export default defineComponent({
  name: 'APP',
  components: {WmScrollView},
  data(){
    const apiUrl: string = Env.apiUrl;
    const copy: string = Env.copy;
    return {apiUrl,copy}
  },
  mounted(){
  },
  methods:{

    /* 打开URL */
    openUrl(url: string){
      NavigateTo(url);
    },

  }
});