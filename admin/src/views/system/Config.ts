import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Loading from '@/library/ui/loading'
import Toast from '@/library/ui/toast'
import Post from '@/library/request/post'
import Storage from '@/library/Storage'
/* UI组件 */
import wmMain from '@/components/main/index.vue'
import wmForm from '@/components/form/index.vue'
import wmFormItem from '@/components/form/item/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmImg from '@/components/img/index.vue'
import wmImgUpload from '@/components/img/upload/index.vue'
import wmSelect from '@/components/form/select/index.vue'
import wmRadio from '@/components/form/radio/index.vue'
import wmCheckbox from '@/components/form/checkbox/index.vue'
import wmSwitch from '@/components/switch/index.vue'
import wmTinymce from '@/components/tinymce/index.vue'

/* 系统配置 */
export default defineComponent({
  components: {wmMain,wmForm,wmFormItem,wmInput,wmButton,wmImg,wmImgUpload,wmSelect,wmRadio,wmCheckbox,wmSwitch,wmTinymce},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    // 上传
    const upload: any = {
      url: 'sys_config/upimg',
      param: {name:'logo', token:Storage.getItem('token')},
    };
    // 表单
    const form: any = {logo:'', input:'', select1:'option2', select2:'option1', radio:'女', switch:true, tinymce:'<b>测试</b>'};
    const checkbox: any = [{label:'游戏', value: 1, checked: false}, {label:'购物', value: 2, checked: true}];
    // 编辑器: UrlEncode('编码')、UrlDecode('解码')
    const tinymce: any = {
      // 上传图片
      upload: {url: '/demo/tinymce/upImg', width: 640},
    };
    
    return {state, upload, form, checkbox, tinymce}
  },
  mounted(){
    // 加载数据
    if(Storage.getItem('token')) this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      const load: any = Loading();
      Post('sys_config/list',{
        token: Storage.getItem('token')
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code!=0) return Toast(d.msg);
        setTimeout(()=>{
          this.form.tinymce = '<b>测试1</b>';
          this.form.select2 = 'option2';
          setTimeout(()=>{
            this.form.tinymce = '<b>测试2</b>';
            setTimeout(()=>{
              this.form.tinymce = '<b>测试3</b>';
            }, 1000);
          }, 1000);
        }, 3000);
        // else this.form = d.list;
      });
    },

    /* 提交表单 */
    onSubmit(){
      const data: string = JSON.stringify(this.form);
      console.log(JSON.stringify(this.form));
      console.log(JSON.stringify(this.checkbox));
      return Toast('请查看Console日志记录！');
      const load: any = Loading();
      Post('sys_config/edit',{
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
      if(res.code==0) this.form.logo = res.img;
      return Toast(res.msg);
    }

  },
});