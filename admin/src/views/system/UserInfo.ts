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
import wmRadio from '@/components/form/radio/index.vue'
import wmDate from '@/components/form/date/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmImg from '@/components/img/index.vue'
import wmImgUpload from '@/components/img/upload/index.vue'

export default defineComponent({
  components: {wmMain,wmForm,wmFormItem,wmInput,wmRadio,wmDate,wmButton,wmImg,wmImgUpload},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    // 表单
    const form: any = {img:'',nickname:'',name:'',gender:'男',birthday:'',position:''};
    const gender: any = [{label:'男',value:'男'},{label:'女',value:'女'}];
    // 上传
    const upload: any = {
      url:'userinfo/upimg',
      param:{token:Storage.getItem('token')}
    };
    return {state,form,gender,upload}
  },
  mounted(){
    // 加载数据
    if(Storage.getItem('token')) this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      const load = Loading();
      Post('userinfo/list',{token:Storage.getItem('token')},(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code!=0) return Toast(d.msg);
        else this.form = d.list;
      },()=>{ Toast('网络加载失败!'); });
    },

    /* 提交表单 */
    onSubmit(){
      const data = JSON.stringify(this.form);
      const load = Loading();
      Post('userinfo/edit',{token:Storage.getItem('token'),data:data},(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code==0) this.state.uInfo = d.uinfo;
        return Toast(d.msg);
      });
    },

    /* 上传头像 */
    upImg(res: any){
      if(res.code==0){
        this.form.img = res.img;
        this.state.uInfo.img = res.img;
      }
      return Toast(res.msg);
    }

  },
});