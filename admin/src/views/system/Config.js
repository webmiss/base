import Plus from '@/library/Plus'

export default {
  data(){
    return {
      LabelWidth:'100px',
      form:{logo:'',title:'',http:'',copy:'',login_bg:''},
    }
  },
  mounted(){
    this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      const loading = this.$loading({text: '分页数据'});
      this.$ajax.post(
        this.$config.apiUrl+'SysConfig/list',
        'token='+this.$storage.getItem('token')
      ).then((res)=>{
        loading.close();
        const d = res.data;
        if(d.code!=0){
          this.$message.error(d.msg);
        }else{
          this.form = d.list;
        }
      });
    },

    /* 提交表单 */
    onSubmit(){
      const loading = this.$loading({text: '提交数据'});
      const data = JSON.stringify(this.form);
      this.$ajax.post(
        this.$config.apiUrl+'SysConfig/edit',
        'token='+this.$storage.getItem('token')+'&data='+data
      ).then((res)=>{
        loading.close();
        const d = res.data;
        if(d.code==0){
          // 刷新
          const tmp = JSON.parse(data);
          this.$store.state.system.title = tmp.title;
          this.$store.state.system.copy = tmp.copy;
          return this.$message.success(d.msg);
        }else{
          return this.$message.error(d.msg);
        }
      });
    },

    /* 上传图片 */
    upImage(event,type){
      const el = event.currentTarget;
      const fileObj = el.files[0];
      let perm = {};
      // 类型
      if(type=='logo'){
        perm.width = 100;
        perm.height = 100;
      }else if(type=='bg'){
        perm.width = 1366;
      }
      // 压缩
      Plus.readerCompress(fileObj,perm,(base64)=>{
        const loading = this.$loading({text: '提交数据'});
        this.$ajax.post(
          this.$config.apiUrl+'SysConfig/upImage',
          'token='+this.$storage.getItem('token')+'&type='+type+'&base64='+base64
        ).then((res)=>{
          loading.close();
          const d = res.data;
          if(d.code == 0){
            this.$message.success(d.msg);
            if(type=='logo'){
              this.form.logo = d.img;
              this.$store.state.system.logo = d.img;
            }else if(type=='bg'){
              this.form.login_bg = d.img;
              this.$store.state.system.login_bg = d.img;
            }
          }else{
            this.$message.error(d.msg);
          }
        });
      });
    },

  }
}