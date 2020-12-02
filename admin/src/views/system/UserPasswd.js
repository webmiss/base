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
import wmRadio from '../../components/form/radio'
import wmDate from '../../components/form/date'
import wmButton from '../../components/form/button'
import wmImg from '../../components/img'
import wmImgUpload from '../../components/img/upload'

export default {
  components: {wmMain,wmForm,wmFormItem,wmInput,wmRadio,wmDate,wmButton,wmImg,wmImgUpload},
  data(){
    return {
      store: this.$store.state,
      form: {img:'',nickname:'',name:'',gender:'男',birthday:'',position:''},
      gender: [{name:'男',val:'男'},{name:'女',val:'女'}],
      upload: {
        url:'Userinfo/upImg',
        param:{token:Storage.getItem('token')}
      },
    }
  },
  activated(){
    // 动作菜单-获取
    this.store.action.name = 'UserInfo';
    this.store.action.url = '';
    this.store.action.menus = '';
    // 加载数据
    if(Storage.getItem('token')) this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      const load = Loading();
      Post('Userinfo/list',{token:Storage.getItem('token')},(res)=>{
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
      Post('Userinfo/edit',{token:Storage.getItem('token'),data:data},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code==0) this.store.uInfo = d.uinfo;
        return Toast(d.msg);
      });
    },

    /* 上传头像 */
    upImg(res){
      if(res.code==0){
        this.form.img = res.img;
        this.store.uInfo.img = res.img;
      }
      return Toast(res.msg);
    }

  },
}