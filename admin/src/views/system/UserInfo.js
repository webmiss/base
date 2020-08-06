import Toast from '../../library/ui/ui-toast'
import Loading from '../../library/ui/ui-loading'
import Post from '../../library/ui/request-post'
import Storage from '../../library/ui/storage'
/* Plus */
import Camera from '../../library/plus/camera'
import ImgReader from '../../library/plus/img-reader'

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
      const load = Loading();
      Post('Userinfo/list',{token:Storage.getItem('token')},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code!=0) return Toast(d.msg);
        else this.form = d.list;
      });
    },

    /* 提交表单 */
    onSubmit(){
      const data = JSON.stringify(this.form);
      const load = Loading();
      Post('Userinfo/edit',{token:Storage.getItem('token'),data:data},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code==0) this.$store.state.uInfo = d.uinfo;
        return Toast(d.msg);
      });
    },

    /* 上传图片 */
    upImage(){
      Camera((fileObj)=>{
        // 压缩
        ImgReader(fileObj,{width:200,height:200},(base64)=>{
          const load = Loading();
          Post('Userinfo/upImage',{token:Storage.getItem('token'),base64:base64},(res)=>{
            load.clear();
            const d = res.data;
            if(d.code==0){
              this.form.img = d.img;
              this.$store.state.uInfo.img = d.img;
            }
            return Toast(d.msg);
          });
        });
      });
    },

  }
}