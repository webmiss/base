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
import wmCascader from '@/components/form/cascader/index.vue'
import wmRadio from '@/components/form/radio/index.vue'
import wmCheckboxGroup from '@/components/form/checkbox/group.vue'
import wmSwitch from '@/components/switch/index.vue'
import wmTinymce from '@/components/tinymce/index.vue'

/* 系统配置 */
export default defineComponent({
  components: {wmMain,wmForm,wmFormItem,wmInput,wmButton,wmImg,wmImgUpload,wmSelect,wmCascader,wmRadio,wmCheckboxGroup,wmSwitch,wmTinymce},
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
    const form: any = {logo:'', input:'', select:'option1', cascader:[], radio:'无', checkbox:[], switch:true, tinymce:'<b>测试</b>'};
    const select: any = [{label:'Option1', value:'option1', disabled: true},{label:'Option2', value:'option2'}];
    const cascader: any = [{label:'菜单A', value:'1', children: [{label:'子菜单1', value:'3'},{label:'子菜单2', value:'4'}]},{label:'菜单B', value:'2', disabled: true}];
    const radio: any = [{label:'男',value:'男'},{label:'女',value:'女'},{label:'无',value:'无',disabled: true}];
    const checkbox: any = [{label:'游戏', value: 1},{label:'购物', value: 2},{label:'其他', value: 3, checked: true, disabled: true}];
    // 编辑器: UrlEncode('编码')、UrlDecode('解码')
    const tinymce: any = {
      // 上传图片
      upload: {url: '/demo/tinymce/upImg', width: 640},
    };
    
    return {state, upload, form, select, cascader, radio, checkbox, tinymce}
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
          this.form.select = 'option2';
          this.form.cascader = [0,1];
          setTimeout(()=>{
            this.form.tinymce = '<b>测试2</b>';
            setTimeout(()=>{
              this.form.tinymce = '<b>测试3</b>';
            }, 1000);
          }, 1000);
        }, 3000);
      });
    },

    /* 提交表单 */
    onSubmit(){
      const data: string = JSON.stringify(this.form);
      console.log(data);
      return Toast('请查看Console日志记录！');
    },

    /* 上传头像 */
    upImg(res: any, type: string){
      if(res.code==0) this.form.logo = res.img;
      return Toast(res.msg);
    }

  },
});