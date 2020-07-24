import {Loading,Toast,Post,Storage} from '@/library/inc'
import Action from '@/components/action'
export default {
  components: {Action},
  data(){
    return {
      LabelWidth:'80px',
      // 勾选
      selectData:[],
      // 分页
      pageData:{list:[], total:0, page:1, limit:15},
      // 搜索、添加、编辑、删除、权限
      seaData:{show:false,form:{name:'',action:'',ico:''}},
      addData:{show:false,form:{name:'',action:'',perm:'',ico:''}},
      editData:{show:false,form:{name:'',action:'',perm:'',ico:''}},
      delData:{show:false,id:''},
    }
  },
  computed:{
    /* 动作菜单-点击 */
    actionType(){
      let type = this.$store.state.action.type;
      if(type=='list'){
        this.seaData.form = {name:'',action:'',ico:''};
        this.pageData.page = 1;
        this.loadData();
      }else if(type=='sea'){
        this.seaData.show=true;
      }else if(type=='add'){
        this.addData.show=true;
      }else if(type=='edit'){
        if(this.selectData.length>0){
          this.getEdit({id:'',name:'',action:'',perm:'',ico:''});
        }else return Toast('请选择数据!');
      }else if(type=='del'){
        if(this.selectData.length>0){
          this.delData.show=true;
          // 获取ID
          let data = this.selectData;
          let id = '';
          for(let i=0; i<data.length; i++) id += data[i].id+',';
          this.delData.id = id;
        }else return Toast('请选择数据!');
      }
      return type;
    },
  },
  mounted(){
    // 动作菜单-配置
    this.$store.state.action.url = 'SysMenusAction';
    this.$store.state.action.menus = '';
    // 加载数据
    this.loadData();
  },
  methods:{

    /* 分页 */
    page(val){
      this.pageData.page = val;
      this.loadData();
    },

    /* 获取选择数据 */
    getSelect(val) {
      this.selectData = val;
    },

    /* 加载数据 */
    loadData(){
      const load = Loading();
      Post('Sysmenusaction/list',
        {token:Storage.getItem('token'),page:this.pageData.page,limit:this.pageData.limit,data:JSON.stringify(this.seaData.form)},
      (res)=>{
        load.clear();
        const d = res.data;
        if(d.code!=0){
          return Toast(d.msg);
        }else{
          this.pageData.list = d.list;
          this.pageData.total = d.total;
        }
      });
    },

    /* 搜索 */
    subSea(){
      this.seaData.show=false;
      this.pageData.page = 1;
      this.loadData();
    },

    /* 添加 */
    subAdd(){
      this.addData.show=false;
      // 提交
      const load = Loading();
      Post('Sysmenusaction/add',
        {token:Storage.getItem('token'),data:JSON.stringify(this.addData.form)},
      (res)=>{
        load.clear();
        let d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 编辑-获取数据 */
    getEdit(data){
      this.editData.show=true;
      for(let i in data) this.editData.form[i] = this.selectData[0][i] || '';
    },
    subEdit(){
      this.editData.show=false;
      // 提交
      const load = Loading();
      Post('Sysmenusaction/edit',
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
      Post('Sysmenusaction/del',
        {token:Storage.getItem('token'),data:this.delData.id},
      (res)=>{
        load.clear();
        let d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

  }
}