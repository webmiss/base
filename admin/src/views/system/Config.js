import Toast from '../../library/ui/ui-toast'
import Loading from '../../library/ui/ui-loading'
import Post from '../../library/ui/request-post'
import Storage from '../../library/ui/storage'
/* 组件 */
import {Camera,ImgReader} from '@/library/plus'

export default {
  data(){
    return {
      LabelWidth:'100px',
      form:{logo:'',title:'',http:'',copy:'',login_bg:''},
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
      Post('Sysconfig/list',{token:Storage.getItem('token')},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code!=0){
          return Toast(d.msg);
        }else{
          this.form = d.list;
        }
      });
    },

    /* 提交表单 */
    onSubmit(){
      const data = JSON.stringify(this.form);
      const load = Loading();
      Post('Sysconfig/edit',{token:Storage.getItem('token'),data:data},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code==0){
          // 刷新
          const tmp = JSON.parse(data);
          this.$store.state.system.title = tmp.title;
          this.$store.state.system.copy = tmp.copy;
        }
        return Toast(d.msg);
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
      Camera((fileObj)=>{
        ImgReader(fileObj,perm,(base64)=>{
          const load = Loading();
          Post('Sysconfig/upImage',
            {token:Storage.getItem('token'),type:type,base64:base64},
          (res)=>{
            load.clear();
            const d = res.data;
            if(d.code == 0){
              if(type=='logo'){
                this.form.logo = d.img;
                this.$store.state.system.logo = d.img;
              }else if(type=='bg'){
                this.form.login_bg = d.img;
                this.$store.state.system.login_bg = d.img;
              }
            }
            return Toast(d.msg);
          });
        });
      });
    },

  }
}