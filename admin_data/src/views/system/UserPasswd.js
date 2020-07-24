import {Loading,Post,Storage,Toast,Reg} from '@/library/inc'

export default {
  data(){
    return {
      LabelWidth:'100px',
      form:{passwd:'',passwd1:'',passwd2:''},
    }
  },
  mounted(){
    // 动作菜单-配置
    this.$store.state.action.url = '';
    this.$store.state.action.menus = '';
  },
  methods:{

    /* 提交表单 */
    onSubmit(){
      let passwd = this.form.passwd;
      let passwd1 = this.form.passwd1;
      let passwd2 = this.form.passwd2;
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
      Post('Userpasswd/edit',{token:Storage.getItem('token'),passwd:passwd,passwd1:passwd1},
      (res)=>{
        load.clear();
        const d = res.data;
        if(d.code==0){
          // 重置表单
          this.form.passwd = '';
          this.form.passwd1 = '';
          this.form.passwd2 = '';
          // 退出登录
          this.$store.state.isLogin = false;
          this.$store.state.uInfo = {};
          Storage.setItem('token','');
        }
        return Toast(d.msg);
      });
    },

  }
}