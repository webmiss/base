import Plus from '@/library/Plus'

export default {
  data(){
    return {
      LabelWidth:'100px',
      form:{img:'',nickname:'',name:'',gender:'',birthday:'',position:''},
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
        this.$config.apiUrl+'UserInfo/list',
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
        this.$config.apiUrl+'UserInfo/edit',
        'token='+this.$storage.getItem('token')+'&data='+data
      ).then((res)=>{
        loading.close();
        const d = res.data;
        if(d.code==0){
          // 刷新
          this.$store.state.uinfo = JSON.parse(data);
          return this.$message.success(d.msg);
        }else{
          return this.$message.error(d.msg);
        }
      });
    },

    /* 上传图片 */
    upImage(event){
      const el = event.currentTarget;
      const fileObj = el.files[0];
      let perm = {width:200,height:200};
      // 压缩
      Plus.readerCompress(fileObj,perm,(base64)=>{
        const loading = this.$loading({text: '提交数据'});
        this.$ajax.post(
          this.$config.apiUrl+'UserInfo/upImage',
          'token='+this.$storage.getItem('token')+'&base64='+base64
        ).then((res)=>{
          loading.close();
          const d = res.data;
          if(d.code == 0){
            this.$message.success(d.msg);
            this.form.img = d.img;
            this.$store.state.uinfo.img = d.img;
          }else{
            this.$message.error(d.msg);
          }
        });
      });
    },

  }
}