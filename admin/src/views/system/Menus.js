import Action from '@/components/Action'
export default {
  components: {Action},
  watch: {
    /* 获取选择数据 */
    getSelect(val) {
      this.$refs.tree.filter(val);
    },
  },
  data(){
    return {
      LabelWidth:'80px',
      // 勾选
      selectData:[],
      // 分页
      listData:{list:[]},
      // 搜索、添加、编辑、删除、权限
      getSelect:'',
      seaData:{show:false,form:{fid:'',title:'',url:''}},
      addData:{show:false,form:{fid:[],title:'',url:'',ico:'',perm:'',permArr:[],sort:0}},
      editData:{show:false,form:{fid:[],title:'',url:'',ico:'',perm:'',permArr:[],sort:0}},
      delData:{show:false,id:''},
      // 动作菜单
      aMenus:[],
      permAll:[],
      // 分类
      fidClass:[],
    }
  },
  mounted(){
    this.loadData();
    // 全部动作
    this.allAction();
  },
  methods:{

    /* 获取编辑数据 */
    getEdit(data){
      this.editData.show=true;
      for(let i in data) this.editData.form[i] = this.selectData[i] || '';
    },

    /* 菜单动作 */
    openAction(type){
      if(type=='list'){
        this.loadData();
      }else if(type=='add'){
        this.addData.show=true;
      }else if(type=='del'){
        let key = this.$refs.tree.getCheckedKeys();
        if(key.length>0){
          this.delData.show=true;
          this.delData.id = key;
        }else this.$message.error('请选择数据！');
      }
    },

    /* 加载数据 */
    loadData(){
      const loading = this.$loading({text: '分页数据'});
      this.$ajax.post(
        this.$config.apiUrl+'SysMenus/list',
        'token='+this.$storage.getItem('token')
      ).then((res)=>{
        loading.close();
        const d = res.data;
        if(d.code!=0){
          this.$message.error(d.msg);
        }else{
          this.listData.list = d.list;
        }
      });
      // 获取分类
      this.setClass();
    },

    /* 搜索 */
    subSea(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    /* 添加 */
    subAdd(){
      let fid = this.addData.form.fid;
      if(fid.length>0) fid = fid.slice(-1)[0];
      else fid = '';
      this.addData.form.fid = fid;
      // 计算权限
      let permArr = this.addData.form.permArr;
      let perm = 0;
      for(let k in permArr){
        perm += parseInt(this.permAll[permArr[k]]);
      }
      this.addData.form.perm = perm;
      // 提交
      this.addData.show=false;
      const loading = this.$loading({text: '正在添加'});
      this.$ajax.post(
        this.$config.apiUrl+'SysMenus/add',
        'token='+this.$storage.getItem('token')+'&data='+JSON.stringify(this.addData.form)
      ).then((res)=>{
        loading.close();
        let d = res.data;
        if(d.code!==0){
          this.$message.error(d.msg);
        }else{
          this.$message.success(d.msg);
          // 刷新数据
          this.loadData();
        }
      });
    },

    /* 编辑 */
    showEdit(row){
      this.editData.show=true;
      this.selectData = row;
      this.getEdit({id:'',fid:[],title:'',url:'',ico:'',perm:'',sort:''});
      // 默认勾选
      this.editData.form.fid = [row.fid+''];
      // 默认勾选权限
      let permArr = [];
      for(let k in this.permAll){
        if(this.editData.form.perm & parseInt(this.permAll[k])){
          permArr.push(k);
        }
      }
      this.editData.form.permArr = permArr;
    },
    subEdit(){
      let fid = this.editData.form.fid;
      if(fid.length>0) fid = fid.slice(-1)[0];
      else fid = '';
      this.editData.form.fid = fid;
      // 计算权限
      let permArr = this.editData.form.permArr;
      let perm = 0;
      for(let k in permArr){
        perm += parseInt(this.permAll[permArr[k]]);
      }
      this.editData.form.perm = perm;
      // 提交
      this.editData.show=false;
      const loading = this.$loading({text: '正在更新'});
      this.$ajax.post(
        this.$config.apiUrl+'SysMenus/edit',
        'token='+this.$storage.getItem('token')+'&id='+this.editData.form.id+'&data='+JSON.stringify(this.editData.form)
      ).then((res)=>{
        loading.close();
        let d = res.data;
        if(d.code!==0){
          this.$message.error(d.msg);
        }else{
          this.$message.success(d.msg);
          // 刷新数据
          this.loadData();
        }
      });
    },

    /* 删除 */
    subDel(){
      this.delData.show=false;
      // 提交
      const loading = this.$loading({text: '正在删除'});
      this.$ajax.post(
        this.$config.apiUrl+'SysMenus/del',
        'token='+this.$storage.getItem('token')+'&data='+JSON.stringify(this.delData.id)
      ).then((res)=>{
        loading.close();
        let d = res.data;
        if(d.code!==0){
          this.$message.error(d.msg);
        }else{
          this.$message.success(d.msg);
          // 刷新数据
          this.loadData();
        }
      });
    },

    /* 全部菜单 */
    allAction(){
      this.$ajax.post(
        this.$config.apiUrl+'UserMain/getActionAll',
        'token='+this.$storage.getItem('token')
      ).then((res)=>{
        let d = res.data;
        if(d.code!==0){
          this.$message.error(d.msg);
        }else{
          this.aMenus = d.aMenus;
          for(let k in d.aMenus){
            this.permAll[d.aMenus[k].name] = d.aMenus[k].perm;
          }
        }
      });
    },

    /* 刷新分类 */
    setClass(){
      this.getClass('fid',(res)=>{this.fidClass = res.data.list;});
    },
    /* 获取分类 */
    getClass(type,callback){
      this.$ajax.post(this.$config.apiUrl+'SysMenus/getClass/'+type,'token='+this.$storage.getItem('token')).then(callback);
    },

  }
}