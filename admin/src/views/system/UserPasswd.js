import Inc from '@/library/Inc'

export default {
  data(){
    return {
      LabelWidth:'100px',
      form:{passwd:'',passwd1:'',passwd2:''},
    }
  },
  mounted(){
  },
  methods:{

    /* 提交表单 */
    onSubmit(){
      let passwd = this.form.passwd;
      let passwd1 = this.form.passwd1;
      let passwd2 = this.form.passwd2;
      // 验证
      let reg_passwd = Inc.reg('passwd',passwd);
      let reg_passwd1 = Inc.reg('passwd',passwd1);
      if(reg_passwd!=true){
        return this.$message.error('原'+reg_passwd);
      }else if(reg_passwd1!=true){
        return this.$message.error('新'+reg_passwd1);
      }else if(passwd1!=passwd2){
        return this.$message.error('两次密码不一致！');
      }else if(passwd==passwd1){
        return this.$message.error('不能与原密码相同！');
      }
      // 提交
      const load = Inc.loading();
      Inc.post('Userpasswd/edit',{
        token:Inc.storage.getItem('token'),passwd:passwd,passwd1:passwd1},
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
          Inc.storage.setItem('token','');
          return Inc.toast(d.msg,'success');
        }else{
          return Inc.toast(d.msg,'error');
        }
      });
    },

  }
}