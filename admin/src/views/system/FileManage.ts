import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Loading from '@/library/ui/ui-loading'
import Toast from '@/library/ui/ui-toast'
import Post from '@/library/ui/request-post'
import Storage from '@/library/ui/storage'
import DownBlob from '@/library/inc/down-blob'
/* UI组件 */
import wmRow from '@/components/main/row/index.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmForm from '@/components/form/index.vue'
import wmFormItem from '@/components/form/item/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmUploader from '@/components/uploader/index.vue'
import wmImgView from '@/components/img/view/index.vue'

/* 文件管理 */
export default defineComponent({
  components: {wmRow,wmDialog,wmForm,wmFormItem,wmInput,wmButton,wmUploader,wmImgView},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    // 信息
    const info: any = {url:'', path:'/', loaded:'0%'};
    // 列表、新建、重命名、上传、下载、打包、删除
    const lists: any = {url:'', folder:[], files:[], dirNum:0, fileNum:0, size:'0KB'};
    const folder: any = {show:false, form:{name:''}};
    const rename: any = {show:false, form:{rename:'', name:''}};
    const upload: any = {url:'Sysfilemanage/upFile', param:{}};
    const down: any = {show:false,filename:''};
    const zip: any = {show:false, form:{name:'', files:[]}};
    const del: any = {show:false, data:[]};
    // 图片预览
    const imgView: any = {show: false, imgs:[], index: 0};
    return {state, info, lists, folder, rename, upload, down, zip, del, imgView};
  },
  computed: {
    // 动作菜单-监听
    actionType(){
      const active: any = this.state.action.active;
      return active;
    }
  },
  watch:{
    // 动作菜单-点击
    actionType(val){
      if(!val) return false;
      if(val=='list'){
        this.loadData();
      }else if(val=='mkdir'){
        this.folder.show = true;
      }else if(val=='rename'){
        const names = this.getCheckName();
        if(!names) return ;
        this.rename.show = true;
        this.rename.form.rename = names[0];
        this.rename.form.name = names[0];
      }else if(val=='upload'){
        this.upload.param = {token: Storage.getItem('token'), path: this.info.path};
        const obj: any = this.$refs.Uploader;
        obj.upload();
      }else if(val=='remove'){
        const names: any = this.getCheckName();
        if(!names) return ;
        this.del.show = true;
        this.del.data = names;
      }
    }
  },
  mounted(){
    // 动作菜单-获取
    this.state.action.url = 'SysFileManage';
    this.state.action.menus = [
      {name:'新建文件夹', action:'mkdir', ico:''},
      {name:'重命名', action:'rename', ico:''},
      {name:'上传', action:'upload', ico:''},
      // {name:'打包', action:'zip', ico:''},
      {name:'删除', action:'remove', ico:''},
    ];
    // 加载数据
    if(Storage.getItem('token')) this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      const load = Loading();
      Post('Sysfilemanage/list',{
        token: Storage.getItem('token'),
        path: this.info.path
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code==0){
          this.info.url = d.url;
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
      const data: any = this.info.path.split("/").filter((d: any)=>d);
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

    /* 新建文件夹 */
    subDir(){
      const name = this.folder.form.name;
      // 是否存在
      if(!this.isExist(name)) return false;
      // 提交
      this.folder.show = false;
      this.subAjax('mkDir',{path:this.info.path, name:name});
    },

    /* 重命名 */
    subRename(){
      const rename = this.rename.form.rename;
      const name = this.rename.form.name;
      if(!name) return Toast('名称不能为空');
      // 是否存在
      if(!this.isExist(name)) return false;
      // 提交
      this.rename.show = false;
      this.subAjax('reName',{path:this.info.path, rename:rename, name:name});
    },

    /* 上传 */
    upProgress(event: any){
      let complete = (event.loaded/event.total*100 | 0);
      if(complete<100){
        this.info.loaded = complete+'%';
      }else{
        this.info.loaded = '0%';
        this.loadData();
      }
    },

    /* 下载 */
    downFile(){
      this.down.show = false;
      DownBlob('Sysfilemanage/downFile',{
        token:Storage.getItem('token'),
        path: this.info.path,
        filename: this.down.filename,
      });
    },

    /* 删除 */
    subDel(){
      const data = JSON.stringify(this.del.data);
      // 提交
      this.del.show = false;
      this.subAjax('rmFile',{path:this.info.path, data:data});
    },

    /* 打开文件夹 */
    openFolder(name: string){
      this.info.path += name+'/';
      // 加载数据
      this.loadData();
    },

    /* 打开文件 */
    openFile(filename: string){
      const ext = this.getType(filename);
      // 是否图片
      if(this.isImg(ext)){
        // 全部图片
        const all = this.lists.files;
        let imgs = [];
        let index = 0;
        for(let i in all){
          if(this.isImg(all[i].ext)){
            if(filename==all[i].name) index=imgs.length;
            imgs.push({
              src: this.info.url+this.lists.path+all[i].name,
              name: all[i].name,
              size: all[i].size,
            });
          }
        }
        // 图片预览
        this.imgView.show = true;
        (this.$refs.imgShow as any).open(imgs,index);
      }else{
        this.down.show = true;
        this.down.filename = filename;
      }
    },

    /* 是否图片 */
    isImg(ext: string){
      const arr = ['png','jpg','jpeg','gif','svg'];
      const index = arr.indexOf(ext);
      return index>=0?true:false;
    },

    /* 是否存在 */
    isExist(name: string){
      if(!name){ Toast('请填写名称'); return false; }
      // 文件夹、文件
      let res = true;
      const folder = this.lists.folder;
      const files = this.lists.files;
      for(let i in folder){
        if(folder[i].name==name){
          Toast('已存在文件夹'); res=false;
        }
      }
      for(let i in files){
        if(files[i].name==name){
          Toast('已存在文件'); res=false;
        }
      }
      return res;
    },

    /* 获取选中 */
    getCheckName(){
      const folder = this.lists.folder;
      const files = this.lists.files;
      let name = [];
      // 文件夹
      for(let i in folder) if(folder[i].check) name.push(folder[i].name);
      // 文件
      for(let i in files) if(files[i].check) name.push(files[i].name);
      if(name.length<1){
        Toast('请选择内容');
        return false;
      }else{
        return name;
      }
    },

    /* 获取后缀 */
    getType(filename: string){
      const index1 = filename.lastIndexOf('.')+1;
      const index2 = filename.length;
      return filename.substring(index1,index2);
    },

    /* 提交数据 */
    subAjax(action: string, parameter: any, callback?: any, config?: any){
      parameter.token = Storage.getItem('token');
      const load = Loading();
      Post('Sysfilemanage/'+action,parameter,(res: any)=>{
        load.clear();
        const d = res.data;
        // 回调
        if(callback) callback(d);
        // 结果
        if(d.msg) Toast(d.msg);
        if(d.code===0) this.loadData();
      },()=>{},config);
    },

  },
});