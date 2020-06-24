import Inc from '@/library/Inc'
import Action from '@/components/action'
import ImgView from '@/components/img-view'

export default {
  components: {Action,ImgView},
  data(){
    return {
      LabelWidth:'80px',
      // 路径
      url: '',
      path: '/',
      loaded: '0%',
      // 列表、新建、打包、重命名、删除
      lists: {url:'',folder:[],files:[]},
      folder: {show: false, form:{name:''}},
      zipData: {show: false, form:{name:'',files:[]}},
      renameData: {show: false, form:{rename:'',name:''}},
      delData: {show: false, data:[]},
      // 图片预览
      imgView:{show: false, imgs:[], index: 0},
    }
  },
  computed:{
    /* 动作菜单-点击 */
    actionType(){
      let type = this.$store.state.action.type;
      if(type=='list') this.loadData();
      else if(type=='mkdir') this.mkDir();
      else if(type=='upload') this.selectFile();
      else if(type=='zip') this.zipFile();
      else if(type=='rename') this.reName();
      else if(type=='remove') this.rmFile();
      return type;
    },
  },
  mounted(){
    // 动作菜单-配置
    this.$store.state.action.url = 'SysFileManage';
    this.$store.state.action.menus = [
      {name:'新建文件夹',action:'mkdir',ico:'el-icon-folder-add'},
      {name:'上传',action:'upload',ico:'el-icon-document-add'},
      {name:'打包',action:'zip',ico:'el-icon-bottom'},
      {name:'重命名',action:'rename',ico:'el-icon-edit-outline'},
      {name:'删除',action:'remove',ico:'el-icon-delete'},
    ];
    // 加载数据
    this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      const load = Inc.loading();
      Inc.post('Sysfilemanage/list',
        {token:Inc.storage.getItem('token'),path:this.path},
      (res)=>{
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

    /* 是否图片 */
    isImg(ext){
      const arr = ['png','jpg','jpeg','gif','svg'];
      const index = arr.indexOf(ext);
      return index>=0?true:false;
    },

    /* 打开文件夹 */
    openFolder(name){
      this.path += name+'/';
      // 加载数据
      this.loadData();
    },

    /* 返回 */
    backDir(){
      const data = this.path.split("/").filter(d=>d);
      if(data.length<=1){
        this.path = '/';
      }else{
        this.path = '/';
        for(let i=0; i<data.length-1; i++){
          this.path += data[i]+'/';
        }
      }
      // 加载数据
      this.loadData();
    },

    /* 新建文件夹 */
    mkDir(){
      this.folder.show = true;
    },
    subDir(){
      const name = this.folder.form.name;
      // 是否存在
      if(this.isExist(name)) return;
      // 提交
      this.folder.show = false;
      this.subAjax('mkDir',{path:this.path,name:name});
    },

    /* 打包 */
    zipFile(){
      const names = this.getCheckName();
      if(!names) return;
      this.zipData.show = true;
      this.zipData.form.files = names;
    },
    subZip(){
      const name = this.zipData.form.name;
      const files = JSON.stringify(this.zipData.form.files);
      // 是否存在
      if(!name || this.isExist(name+'.zip')) return;
      // 提交
      this.zipData.show = false;
      this.subAjax('zipFile',{path:this.path,name:name,files:files});
    },

    /* 重命名 */
    reName(){
      const names = this.getCheckName();
      if(!names) return;
      this.renameData.show = true;
      this.renameData.form.rename = names[0];
      this.renameData.form.name = names[0];
    },
    subRename(){
      const rename = this.renameData.form.rename;
      const name = this.renameData.form.name;
      if(!name) return Inc.toast('名称不能为空');
      // 是否存在
      if(this.isExist(name)) return;
      // 提交
      this.renameData.show = false;
      this.subAjax('reName',{path:this.path,rename:rename,name:name});
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
        Inc.confirm({title:'文件下载',content:'文件名: '+file,confirmText:'立即下载'},()=>{
          Inc.toast('开始下载');
          this.downFile(file);
        },()=>{
          Inc.toast('已取消');
        });
      }
    },

    /* 上传 */
    selectFile(){
      const fileObj = document.createElement('input');
      fileObj.setAttribute('type','file');
      fileObj.setAttribute("style",'display: none');
      fileObj.setAttribute('multiple','multiple');
      document.body.appendChild(fileObj);
      fileObj.click();
      fileObj.onchange = ()=>{
        // 多选
        for(let i=0; i<fileObj.files.length; i++){
          // 单个上传
          this.upFile({
            token:Inc.storage.getItem('token'),
            path:this.path,
            up:fileObj.files[i],
          });
        }
      }
    },
    /* 异步上传 */
    upFile(data){
      this.loaded = '10%';
      this.subAjax('upFile',data,(res)=>{
        const d = res;
        if(d.code!==0){
          if(d.msg) Inc.toast(d.msg);
        }else{
          if(d.msg) Inc.toast(d.msg);
          // 刷新数据
          this.loadData();
        }
      },{onUploadProgress:(event)=>{
        // 上传进度
        let complete = (event.loaded/event.total*100 | 0);
        if(complete<100) this.loaded = complete+'%';
        else this.loaded = '0%';
      }});
    },

    /* 下载 */
    downFile(file){
      this.subAjax('downFile',{path:this.path,file:file},(data)=>{
        const blob = new Blob([data]);
        const a = document.createElement('a');
        const href = window.URL.createObjectURL(blob);
        a.href = href;
        a.download = file;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(href);
      },{responseType:'blob'});
    },

    /* 删除文件 */
    rmFile(){
      const names = this.getCheckName();
      if(!names) return;
      this.delData.show = true;
      this.delData.data = names;
    },
    subDel(){
      const data = JSON.stringify(this.delData.data);
      // 提交
      this.delData.show = false;
      this.subAjax('rmFile',{path:this.path,data:data});
    },

    /* 提交数据 */
    subAjax(action,parameter,callback,config){
      parameter.token = Inc.storage.getItem('token');
      const load = Inc.loading();
      Inc.post('Sysfilemanage/'+action,parameter,(res)=>{
        const d = res.data;
        // 回调
        if(callback) callback(d);
        // 结果
        if(d.code!==0){
          load.clear();
          if(d.msg) Inc.toast(d.msg);
        }else{
          if(d.msg) Inc.toast(d.msg);
          // 刷新数据
          this.loadData();
        }
      },(e)=>{},config);
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
        return Inc.toast('请选择内容');
      }else{
        return name;
      }
    },

    /* 是否存在 */
    isExist(name){
      const folder = this.lists.folder;
      const files = this.lists.files;
      // 是否为空
      if(!name) return Inc.toast('请填写名称');
      // 文件夹
      for(let i in folder){
        if(folder[i].name==name) return Inc.toast('已存在文件夹');
      }
      // 文件夹
      for(let i in files){
        if(files[i].name==name) return Inc.toast('已存在文件');
      }
      return false;
    },

    /* 获取后缀 */
    getType(filename){
      const index1 = filename.lastIndexOf('.')+1;
      const index2 = filename.length;
      return filename.substring(index1,index2);
    },

  }
}