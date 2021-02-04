/* JS组件 */
import Loading from '../../library/ui/ui-loading'
import Toast from '../../library/ui/ui-toast'
import Post from '../../library/ui/request-post'
import Storage from '../../library/ui/storage'
import Reg from '../../library/inc/reg'
/* UI组件 */
import wmMain from '../../components/main'
import wmForm from '../../components/form'
import wmFormItem from '../../components/form/item'
import wmInput from '../../components/form/input'
import wmButton from '../../components/form/button'

export default {
  components: {wmMain,wmForm,wmFormItem,wmInput,wmButton},
  data(){
    return {
      store: this.$store.state,
      form:{passwd:'', passwd1:'', passwd2:''},
    }
  },
  activated(){
    // 动作菜单-获取
    this.store.action.name = 'UserPasswd';
    this.store.action.url = '';
    this.store.action.menus = '';
  },
  methods:{

    /* 提交表单 */
    onSubmit(){
      const passwd = this.form.passwd;
      const passwd1 = this.form.passwd1;
      const passwd2 = this.form.passwd2;
      // 验证
      let reg_passwd = Reg('passwd',passwd);
      let reg_passwd1 = Reg('passwd',passwd1);
      if(reg_passwd!=true){
        return Toast('原'+reg_passwd);
      }else if(reg_passwd1!=true){
        return Toast('新'+reg_passwd1);
      }else if(passwd1!=passwd2){
        return Toast('两次密码不一致！');
      }else if(passwd==passwd1){
        return Toast('不能与原密码相同！');
      }
      // 提交
      const load = Loading();
      Post(
        'Userpasswd/edit',
        {token:Storage.getItem('token'), passwd:passwd, passwd1:passwd1},
      (res)=>{
        load.clear();
        const d = res.data;
        if(d.code==0){
          // 重置表单
          this.form.passwd = '';
          this.form.passwd1 = '';
          this.form.passwd2 = '';
          // 退出登录
          this.store.isLogin = false;
          this.store.uInfo = {};
          Storage.setItem('token','');
        }
        return Toast(d.msg);
      });
    }

  },
}