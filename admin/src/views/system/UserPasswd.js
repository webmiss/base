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
      let reg_passwd = this.$reg('passwd',passwd);
      let reg_passwd1 = this.$reg('passwd',passwd1);
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
      const loading = this.$loading({text: '提交数据'});
      this.$ajax.post(
        this.$config.apiUrl+'UserPasswd/edit',
        'token='+this.$storage.getItem('token')+'&passwd='+passwd+'&passwd1='+passwd1
      ).then((res)=>{
        loading.close();
        const d = res.data;
        if(d.code==0){
          this.$message.success(d.msg);
          this.$storage.setItem('token','');
          this.$storage.setItem('uinfo','');
          // 刷新
          window.location.reload();
        }else{
          return this.$message.error(d.msg);
        }
      });
    },

  }
}