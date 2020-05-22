import Inc from '@/library/Inc'
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
      const load = Inc.loading();
      Inc.post('Sysconfig/list',{token:Inc.storage.getItem('token')},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code!=0){
          Inc.toast(d.msg,'error');
        }else{
          this.form = d.list;
        }
      });
    },

    /* 提交表单 */
    onSubmit(){
      const data = JSON.stringify(this.form);
      const load = Inc.loading();
      Inc.post('Sysconfig/edit',{token:Inc.storage.getItem('token'),data:data},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code==0){
          // 刷新
          const tmp = JSON.parse(data);
          this.$store.state.system.title = tmp.title;
          this.$store.state.system.copy = tmp.copy;
          return Inc.toast(d.msg,'success');
        }else{
          return Inc.toast(d.msg,'error');
        }
      });
    },

    /* 上传图片 */
    upImage(type){
      let perm = {};
      // 类型
      if(type=='logo'){
        perm.width = 100;
        perm.height = 100;
      }else if(type=='bg'){
        perm.width = 1366;
      }
      // 压缩
      Plus.camera((fileObj)=>{
        Plus.readerCompress(fileObj,perm,(base64)=>{
          const load = Inc.loading();
          Inc.post('Sysconfig/upImage',
            {token:Inc.storage.getItem('token'),type:type,base64:base64},
          (res)=>{
            load.clear();
            const d = res.data;
            if(d.code == 0){
              Inc.toast(d.msg,'success');
              if(type=='logo'){
                this.form.logo = d.img;
                this.$store.state.system.logo = d.img;
              }else if(type=='bg'){
                this.form.login_bg = d.img;
                this.$store.state.system.login_bg = d.img;
              }
            }else{
              Inc.toast(d.msg,'error');
            }
          });
        });
      });
    },

  }
}