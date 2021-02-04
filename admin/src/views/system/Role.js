/* JS组件 */
import Loading from '../../library/ui/ui-loading'
import Toast from '../../library/ui/ui-toast'
import Post from '../../library/ui/request-post'
import Storage from '../../library/ui/storage'
/* UI组件 */
import wmMain from '../../components/main'
import wmRow from '../../components/main/row'
import wmTable from '../../components/table'
import wmTableTitle from '../../components/table/title'
import wmTableTr from '../../components/table/tr'
import wmTag from '../../components/tag'
import wmPopover from '../../components/popover'
import wmDialog from '../../components/dialog'
import wmForm from '../../components/form'
import wmFormItem from '../../components/form/item'
import wmInput from '../../components/form/input'
import wmButton from '../../components/form/button'
import wmPage from '../../components/page'

/* 用户管理 */
export default {
  components: {wmMain,wmRow,wmTable,wmTableTitle,wmTableTr,wmTag,wmPopover,wmDialog,wmForm,wmFormItem,wmInput,wmButton,wmPage},
  data(){
    return {
      store: this.$store.state,
      page: {list:[], page:1, limit:10, total:0,},
      // 搜索、添加、编辑、删除
      sea: {show:false, form:{}},
      add: {show:false, form:{}},
      edit: {show:false, id:'', form:{}},
      del: {show:false, ids:''},
      // 权限
      perm: {show:false, id:'', perm:''},
    }
  },
  computed: {
    // 动作菜单-监听
    actionType(){
      const name = this.store.action.name;
      const action = this.store.action.action;
      return name=='SysRole'&&action?action:false;
    }
  },
  watch:{
    // 动作菜单-点击
    actionType(val){
      if(!val) return false;
      if(val=='list'){
        this.loadData();
      }else if(val=='sea'){
        this.sea.show = true;
      }else if(val=='add'){
        this.add.show = true;
      }else if(val=='edit'){
        this.editData();
      }else if(val=='del'){
        this.delData();
      }
    }
  },
  activated(){
    // 动作菜单-获取
    this.store.action.name = 'SysRole';
    this.store.action.url = 'SysRole';
    this.store.action.menus = '';
    // 加载数据
    if(Storage.getItem('token')) this.loadData();
  },
  mounted(){
  },
  methods:{

    /* 加载数据 */
    loadData(){
      this.page.list = [];
      this.page.total = 0;
      const load = Loading();
      Post('Sysrole/list',{
        token: Storage.getItem('token'),
        page: this.page.page,
        limit: this.page.limit,
        data: JSON.stringify(this.sea.form)
      },(res)=>{
        load.clear();
        const d = res.data;
        if(d.code==0){
          this.page.list = d.list;
          this.page.total = d.total;
        }else return Toast(d.msg);
      });
    },

    /* 分页 */
    subPage(page){
      this.page.page = page;
      this.loadData();
    },

    /* 搜索 */
    subSea(){
      this.sea.show = false;
      this.page.page = 1;
      this.loadData();
    },

    /* 添加 */
    subAdd(){
      this.add.show = false;
      // 提交
      const data = JSON.stringify(this.add.form);
      const load = Loading();
      Post('Sysrole/add',{token:Storage.getItem('token'),data:data},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 编辑 */
    editData(){
      const table = this.$refs.Table;
      const row = table.getRow();
      if(!row) return Toast('请选择数据!');
      this.edit.show = true;
      // 默认值
      this.edit.id = row.id;
      this.edit.form.role = row.role;
    },
    subEdit(){
      this.edit.show = false;
      // 提交
      const id = this.edit.id;
      const data = JSON.stringify(this.edit.form);
      const load = Loading();
      Post('Sysrole/edit',{token:Storage.getItem('token'),id:id,data:data},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 删除 */
    delData(){
      const table = this.$refs.Table;
      const vals = table.getVals();
      if(!vals) return Toast('请选择数据!');
      this.del.show = true;
      this.del.ids = JSON.stringify(vals);
    },
    subDel(){
      this.del.show = false;
      // 提交
      const load = Loading();
      Post('Sysrole/delete',{token:Storage.getItem('token'),data:this.del.ids},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 权限 */
    permData(uid,perm){
      this.perm.show = true;
      console.log(uid,perm);
    },
    subPerm(){

    },

  },
}