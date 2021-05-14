import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Loading from '@/library/ui/ui-loading'
import Toast from '../../library/ui/ui-toast'
import Storage from '../..//library/ui/storage'
import Post from '../../library/ui/request-post'
import Url from '../../library/inc/url'
/* UI组件 */
import wmMain from '@/components/main/index.vue'
import wmTinymce from '@/components/tinymce/index.vue'
import wmButton from '@/components/form/button/index.vue'

export default defineComponent({
  components: {wmMain,wmTinymce, wmButton},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    const tinymce: any = {
      // 配置
      init:{menubar: true, height: 540},
      // 上传图片
      upload: {start: true, width: 640, url: '/demo/tinymce/upImg'},
      // 内容
      content: '',
    };
    return {state, tinymce}
  },
  methods:{

    /* 提交 */
    subContent(){
      let ct = this.tinymce.content;
      const load: any = Loading();
      Post('/demo/tinymce/edit', {
        token:Storage.getItem('token'),
        content: Url.Encode(ct),
      }, (res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code==0) console.log(Url.Decode(d.content));
        return Toast(d.msg);
      });
    },

  }
});