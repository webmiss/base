import Toast from '../../library/ui/ui-toast'
import Loading from '../../library/ui/ui-loading'
import Post from '../../library/ui/request-post'
import Storage from '../../library/ui/storage'
/* 组件 */
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
        }else Toast('请选择数据!');
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
      const load = Loading();
      Post('Sysmenus/list',{token:Storage.getItem('token')},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code!=0){
          return Toast(d.msg);
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
      const load = Loading();
      Post('Sysmenus/add',
        {token:Storage.getItem('token'),data:JSON.stringify(this.addData.form)},
      (res)=>{
        load.clear();
        let d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
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
      const load = Loading();
      Post('Sysmenus/edit',
        {token:Storage.getItem('token'),id:this.editData.form.id,data:JSON.stringify(this.editData.form)},
      (res)=>{
        load.clear();
        let d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 删除 */
    subDel(){
      this.delData.show=false;
      // 提交
      const load = Loading();
      Post('Sysmenus/del',
        {token:Storage.getItem('token'),data:JSON.stringify(this.delData.id)},
      (res)=>{
        load.clear();
        let d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 全部菜单 */
    allAction(){
      Post('Usermain/getActionAll',{token:Storage.getItem('token')},(res)=>{
        let d = res.data;
        if(d.code!==0){
          Toast(d.msg,'error');
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
      Post('Sysmenus/getClass/'+type,{token:Storage.getItem('token')},callback);
    },

  }
}