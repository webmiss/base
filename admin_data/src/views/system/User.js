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
      seaData:{show:false,form:{uname:''}},
      addData:{show:false,form:{tel:'',passwd:''}},
      editData:{show:false,form:{tel:'',passwd:''}},
      delData:{show:false,id:''},
      infoData:{show:false,uid:'',form:{}},
    }
  },
  computed:{
    /* 动作菜单-点击 */
    actionType(){
      let type = this.$store.state.action.type;
      if(type=='list'){
        this.seaData.form = {role:''};
        this.pageData.page = 1;
        this.loadData();
      }else if(type=='sea'){
        this.seaData.show=true;
      }else if(type=='add'){
        this.addData.show=true;
      }else if(type=='edit'){
        if(this.selectData.length>0){
          this.getEdit({uid:'',tel:'',passwd:''});
        }else return Toast('请选择数据!');
      }else if(type=='del'){
        if(this.selectData.length>0){
          this.delData.show=true;
          // 获取ID
          let data = this.selectData;
          let id = '';
          for(let i=0; i<data.length; i++) id += data[i].uid+',';
          this.delData.id = id;
        }else return Toast('请选择数据!');
      }
      return type;
    },
  },
  mounted(){
    // 动作菜单-配置
    this.$store.state.action.url = 'SysUser';
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
      Post('Sysuser/list',
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
      // 数据
      let data = JSON.stringify(this.addData.form);
      // 提交
      const load = Loading();
      Post('Sysuser/add',
        {token:Storage.getItem('token'),data:data},
      (res)=>{
        load.clear();
        const d = res.data;
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
      // 数据
      let uid = this.editData.form.uid;
      let data = JSON.stringify(this.editData.form);
      // 提交
      const load = Loading();
      Post('Sysuser/edit',
        {token:Storage.getItem('token'),uid:uid,data:data},
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
      Post('Sysuser/del',{token:Storage.getItem('token'),data:this.delData.id},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 状态 */
    setState(type,row){
      const state = row['state']?1:0;
      // 提交
      const load = Loading();
      Post('Sysuser/state/'+type,{token:Storage.getItem('token'),uid:row.uid,state:state},(res)=>{
        load.clear();
        const d = res.data;
        return Toast(d.msg);
      });
    },

    /* 用户信息 */
    eidtInfo(row){
      this.infoData.show = true;
      this.infoData.uid = row.uid;
      this.infoData.form = {
        nickname:row.nickname,
        name:row.name,
        gender:row.gender,
        birthday:row.birthday,
        position:row.position,
      };
    },
    subInfo(){
      this.infoData.show = false;
      const uid = this.infoData.uid;
      const data = JSON.stringify(this.infoData.form);
      // 提交
      const load = Loading();
      Post('Sysuser/uinfo',
        {token:Storage.getItem('token'),uid:uid,data:data},
      (res)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    }

  }
}