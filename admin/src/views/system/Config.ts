import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Loading from '@/library/ui/ui-loading'
import Toast from '@/library/ui/ui-toast'
import Post from '@/library/ui/request-post'
import Storage from '@/library/ui/storage'
/* UI组件 */
import wmMain from '@/components/main/index.vue'
import wmForm from '@/components/form/index.vue'
import wmFormItem from '@/components/form/item/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmImg from '@/components/img/index.vue'
import wmImgUpload from '@/components/img/upload/index.vue'

/* 系统配置 */
export default defineComponent({
  components: {wmMain,wmForm,wmFormItem,wmInput,wmButton,wmImg,wmImgUpload},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    // 表单
    const form: any = {logo:'',title:'',http:'',copy:'',login_bg:''};
    // 上传
    const upload: any = {
      url: 'sysconfig/upimg',
      param_logo: {name:'logo', token:Storage.getItem('token')},
      param_login_bg: {name:'login_bg', token:Storage.getItem('token')},
    };
    return {state, form, upload}
  },
  mounted(){
    // 加载数据
    if(Storage.getItem('token')) this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      const load: any = Loading();
      Post('sysconfig/list',{
        token: Storage.getItem('token')
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code!=0) return Toast(d.msg);
        else this.form = d.list;
      });
    },

    /* 提交表单 */
    onSubmit(){
      const data: string = JSON.stringify(this.form);
      const load: any = Loading();
      Post('sysconfig/edit',{
        token: Storage.getItem('token'),
        data: data
      },(res: any)=>{
        load.clear();
        const d = res.data;
        return Toast(d.msg);
      });
    },

    /* 上传头像 */
    upImg(res: any, type: string){
      if(res.code==0){
        this.form[type] = res.img;
      }
      return Toast(res.msg);
    }

  },
});