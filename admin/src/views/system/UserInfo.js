/* JS组件 */
import Storage from '../../library/ui/storage'
/* UI组件 */
import wmMain from '../../components/main'
import wmForm from '../../components/form'
import wmFormItem from '../../components/form/item'
import wmInput from '../../components/input'
import wmButton from '../../components/button'
import wmImg from '../../components/img'
import wmUpload from '../../components/upload'

export default {
  components: {wmMain,wmForm,wmFormItem,wmInput,wmButton,wmImg,wmUpload},
  data(){
    return {
      store: this.$store.state,
      form: {img:'',nickname:'',name:'',gender:'',birthday:'',position:''},
      upload: {
        url:'Userinfo/upImage',
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
    },

    /* 上传头像 */
    upImg(res){
      console.log(res);
    }

  },
}