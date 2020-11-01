/* JS组件 */
import Loading from '../../library/ui/ui-loading'
import Toast from '../../library/ui/ui-toast'
import Post from '../../library/ui/request-post'
import Storage from '../../library/ui/storage'
/* UI组件 */
import wmForm from '../../components/form'
import wmFormItem from '../../components/form/item'
import wmInput from '../../components/form/input'
import wmButton from '../../components/form/button'

export default {
  components: {wmForm,wmFormItem,wmInput,wmButton},
  data(){
    return {
      store: this.$store.state,
      // 信息
      info: {url:'', path:'/', loaded:'0%'},
      // 列表、新建、打包、重命名、删除
      lists: {url:'', folder:[], files:[], dirNum:0, fileNum:0, size:'0KB'},
      folder: {show:false, form:{name:''}},
      zipData: {show:false, form:{name:'', files:[]}},
      renameData: {show:false, form:{rename:'', name:''}},
      delData: {show:false, data:[]},
      // 图片预览
      imgView:{show: false, imgs:[], index: 0},
    }
  },
  computed: {
    // 动作菜单-监听
    actionType(){ return this.$store.state.action.type; }
  },
  watch:{
    // 动作菜单-点击
    actionType(val){
      if(!val) return false;
      console.log(val);
      if(val=='list'){
        this.loadData();
      }
    }
  },
  activated(){
    // 动作菜单-获取
    this.store.action.url = 'SysFileManage';
    this.store.action.menus = [
      {name:'新建文件夹', action:'mkdir', ico:''},
      {name:'上传', action:'upload', ico:''},
      {name:'打包', action:'zip', ico:''},
      {name:'重命名', action:'rename', ico:''},
      {name:'删除', action:'remove', ico:''},
    ];
    // 加载数据
    if(Storage.getItem('token')) this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      const load = Loading();
      Post('Sysfilemanage/list',{token:Storage.getItem('token'),path:this.info.path},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code==0){
          this.url = d.url;
          this.lists = d.data;
        }
      });
    },

    /* 全选/不选 */
    selectAll(){
      // 文件夹
      const folder = this.lists.folder;
      for(let i in folder) folder[i].check=!folder[i].check;
      // 文件
      const files = this.lists.files;
      for(let i in files) files[i].check=!files[i].check;
    },

    /* 返回 */
    backDir(){
      const data = this.info.path.split("/").filter(d=>d);
      if(data.length<=1){
        this.info.path = '/';
      }else{
        this.info.path = '/';
        for(let i=0; i<data.length-1; i++){
          this.info.path += data[i]+'/';
        }
      }
      // 加载数据
      this.loadData();
    },

    /* 打开文件夹 */
    openFolder(name){
      this.info.path += name+'/';
      // 加载数据
      this.loadData();
    },

    /* 打开文件 */
    openFile(file){
      const ext = this.getType(file);
      // 是否图片
      if(this.isImg(ext)){
        // 全部图片
        const all = this.lists.files;
        let imgs = [];
        let index = 0;
        for(let i in all){
          if(this.isImg(all[i].ext)){
            if(file==all[i].name) index=imgs.length;
            imgs.push({
              src: this.url+this.lists.path+all[i].name,
              name: all[i].name,
              size: all[i].size,
            });
          }
        }
        // 图片预览
        this.imgView.show = true;
        this.$refs.imgShow.open(imgs,index);
      }else{
        this.$confirm('文件名: '+file,'文件下载',{
          confirmButtonText: '立即下载',
          cancelButtonText: '取消',
          center: true
        }).then(()=>{
          Toast('开始下载');
          this.downFile(file);
        }).catch(()=>{
          Toast('已取消');
        });
      }
    },

    /* 是否图片 */
    isImg(ext){
      const arr = ['png','jpg','jpeg','gif','svg'];
      const index = arr.indexOf(ext);
      return index>=0?true:false;
    },

  },
}