/* JS组件 */
import Loading from '../../library/ui/ui-loading'
import Toast from '../../library/ui/ui-toast'
import Post from '../../library/ui/request-post'
import Storage from '../../library/ui/storage'
/* UI组件 */
import wmMain from '../../components/main'
import wmForm from '../../components/form'
import wmFormItem from '../../components/form/item'
import wmInput from '../../components/form/input'
import wmButton from '../../components/form/button'
import wmImg from '../../components/img'
import wmImgUpload from '../../components/img/upload'

export default {
  components: {wmMain,wmForm,wmFormItem,wmInput,wmButton,wmImg,wmImgUpload},
  data(){
    return {
      store: this.$store.state,
      form:{logo:'',title:'',http:'',copy:'',login_bg:''},
      upload: {
        url:'Sysconfig/upImg',
        param_logo:{type:'logo',token:Storage.getItem('token')},
        param_login_bg:{type:'login_bg',token:Storage.getItem('token')},
      },
    }
  },
  activated(){
    // 动作菜单-获取
    this.store.action.url = '';
    this.store.action.menus = '';
    // 加载数据
    if(Storage.getItem('token')) this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      const load = Loading();
      Post('Sysconfig/list',{token:Storage.getItem('token')},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code!=0) return Toast(d.msg);
        else this.form = d.list;
      });
    },

    /* 提交表单 */
    onSubmit(){
      const data = JSON.stringify(this.form);
      const load = Loading();
      Post('Sysconfig/edit',{token:Storage.getItem('token'),data:data},(res)=>{
        load.clear();
        const d = res.data;
        return Toast(d.msg);
      });
    },

    /* 上传头像 */
    upImg(res,type){
      if(res.code==0){
        this.form[type] = res.img;
      }
      return Toast(res.msg);
    }

  },
}