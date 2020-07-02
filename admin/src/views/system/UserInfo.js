import Inc from '@/library/Inc'
import Plus from '@/library/Plus'

export default {
  data(){
    return {
      LabelWidth:'100px',
      form:{img:'',nickname:'',name:'',gender:'',birthday:'',position:''},
    }
  },
  mounted(){
    // 动作菜单-配置
    this.$store.state.action.url = '';
    this.$store.state.action.menus = '';
    // 加载数据
    this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      const load = Inc.loading();
      Inc.post('Userinfo/list',{token:Inc.storage.getItem('token')},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code!=0) return Inc.toast(d.msg);
        else this.form = d.list;
      });
    },

    /* 提交表单 */
    onSubmit(){
      const data = JSON.stringify(this.form);
      const load = Inc.loading();
      Inc.post('Userinfo/edit',{token:Inc.storage.getItem('token'),data:data},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code==0) this.$store.state.uInfo = d.uinfo;
        return Inc.toast(d.msg);
      });
    },

    /* 上传图片 */
    upImage(){
      Plus.camera((fileObj)=>{
        // 压缩
        Plus.readerCompress(fileObj,{width:200,height:200},(base64)=>{
          const load = Inc.loading();
          Inc.post('Userinfo/upImage',{token:Inc.storage.getItem('token'),base64:base64},(res)=>{
            load.clear();
            const d = res.data;
            if(d.code==0){
              this.form.img = d.img;
              this.$store.state.uInfo.img = d.img;
            }
            return Inc.toast(d.msg);
          });
        });
      });
    },

  }
}