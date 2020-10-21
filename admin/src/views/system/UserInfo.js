/* JS组件 */
import Toast from '../../library/ui/ui-toast'
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
    this.store.action.url = '';
    this.store.action.menus = '';
  },
  methods:{

    /* 提交表单 */
    onSubmit(){
      console.log('sub');
      console.log(this.form);
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