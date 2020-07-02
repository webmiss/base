import Inc from '@/library/Inc'
import Action from '@/components/action'
export default {
  components: {Action},
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
  watch: {
    getSelect(val) {
      this.$refs.tree.filter(val);
    },
  },
  computed:{
    /* 动作菜单 */
    actionType(){
      let type = this.$store.state.action.type;
      if(type=='list'){
        this.loadData();
      }else if(type=='add'){
        this.addData.show=true;
      }else if(type=='del'){
        let key = this.$refs.tree.getCheckedKeys();
        if(key.length>0){
          this.delData.show=true;
          this.delData.id = key;
        }else Inc.toast('请选择数据!');
      }
    },
  },
  mounted(){
    // 动作菜单-配置
    this.$store.state.action.url = 'SysMenus';
    this.$store.state.action.menus = '';
    //加载数据
    this.loadData();
    //全部动作
    this.allAction();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      const load = Inc.loading();
      Inc.post('Sysmenus/list',{token:Inc.storage.getItem('token')},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code!=0){
          return Inc.toast(d.msg);
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
      const load = Inc.loading();
      Inc.post('Sysmenus/add',
        {token:Inc.storage.getItem('token'),data:JSON.stringify(this.addData.form)},
      (res)=>{
        let d = res.data;
        if(d.code!==0) load.clear();
        else this.loadData();
        return Inc.toast(d.msg);
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
    /* 编辑-获取数据 */
    getEdit(data){
      this.editData.show=true;
      for(let i in data) this.editData.form[i] = this.selectData[i] || '';
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
      const load = Inc.loading();
      Inc.post('Sysmenus/edit',
        {token:Inc.storage.getItem('token'),id:this.editData.form.id,data:JSON.stringify(this.editData.form)},
      (res)=>{
        let d = res.data;
        if(d.code!==0) load.clear();
        else this.loadData();
        return Inc.toast(d.msg);
      });
    },

    /* 删除 */
    subDel(){
      this.delData.show=false;
      // 提交
      const load = Inc.loading();
      Inc.post('Sysmenus/del',
        {token:Inc.storage.getItem('token'),data:JSON.stringify(this.delData.id)},
      (res)=>{
        let d = res.data;
        if(d.code!==0) load.clear();
        else this.loadData();
        return Inc.toast(d.msg);
      });
    },

    /* 全部菜单 */
    allAction(){
      Inc.post('Usermain/getActionAll',{token:Inc.storage.getItem('token')},(res)=>{
        let d = res.data;
        if(d.code!==0){
          Inc.toast(d.msg,'error');
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
      Inc.post('Sysmenus/getClass/'+type,{token:Inc.storage.getItem('token')},callback);
    },

  }
}