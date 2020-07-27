import {Loading,Toast,Post,Storage} from '@/library/ui'
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
      permData:{show:false,active:'one',uid:'',default:[''],form:[],role:''},
      // 全部动作菜单
      aMenus:[],
      // 分类
      userRole:[],
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
    this.$store.state.action.url = 'SysPerm';
    this.$store.state.action.menus = '';
    // 加载数据
    this.loadData();
    // 全部动作
    this.allAction();
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
      Post('Sysperm/list',
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
      // 获取分类
      this.setClass();
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
      Post('Sysperm/add',
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
      Post('Sysperm/edit',
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
      Post('Sysperm/del',{token:Storage.getItem('token'),data:this.delData.id},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 状态 */
    setState(type,row){
      const state = row['state_'+type]?1:0;
      // 提交
      const load = Loading();
      Post('Sysperm/state/'+type,{token:Storage.getItem('token'),uid:row.uid,state:state},(res)=>{
        load.clear();
        const d = res.data;
        return Toast(d.msg);
      });
    },

    /* 刷新分类 */
    setClass(){
      this.getClass('userRole',(res)=>{this.userRole = res.data.list;});
    },
    /* 获取分类 */
    getClass(type,callback){
      Post('Sysperm/getClass/'+type,{token:Storage.getItem('token')},callback);
    },

    /* 全部菜单 */
    allAction(){
      Post('Usermain/getActionAll',{token:Storage.getItem('token')},(res)=>{
        let d = res.data;
        if(d.code!==0){
          return Toast(d.msg);
        }else{
          this.aMenus = d.aMenus;
        }
      });
    },

    /* 编辑权限 */
    eidtPerm(uid,perm,role){
      // 参数
      this.permData.uid = uid;
      this.permData.role = role || '';
      // 请求
      const load = Loading();
      Post('Sysperm/allMenus',{token:Storage.getItem('token')},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code!==0){
          return Toast(d.msg);
        }else{
          this.permData.show=true;
          this.permData.form = d.menus;
          // 拆分权限
          let permArr=[],defArr=[];
          if(perm){
            let a1 = perm.split(' ');
            let a2=[];
            for(let x=0; x<a1.length; x++){
              a2 = a1[x].split(':');
              perm = parseInt(a2[1]);
              // 权限表
              for(let k in this.aMenus){
                if(perm&parseInt(this.aMenus[k].perm)) permArr.push(a2[0]+':'+this.aMenus[k].perm);
              }
            }
          }
          // 匹配
          for(let x in permArr) defArr.push(d.id[permArr[x]]);
          // 勾选默认
          setTimeout(()=>{
            this.$refs.perm.setCheckedKeys(defArr);
          },300);
        }
      });
    },
    subPerm(){
      let key = this.$refs.perm.getCheckedKeys();
      let arr=[],arr1=[],arr2=[];
      let permArr={};
      let perm='';
      for(let s in key){
        arr = key[s].split(',');
        // 父级菜单
        arr1 = arr[0].split('-');
        for(let x in arr1) permArr[arr1[x]] = 0;
        // 动作权限
        arr2 = arr[1].split(':');
        permArr[arr2[0]] = permArr[arr2[0]]?permArr[arr2[0]]+parseInt(arr2[1]):parseInt(arr2[1]);
      }
      // 组合权限
      for(let k in permArr) perm += k+':'+permArr[k]+' ';
      // 提交
      this.permData.show=false;
      const load = Loading();
      Post('Sysperm/perm',
        {token:Storage.getItem('token'),uid:this.permData.uid,perm:perm,role:this.permData.role},
      (res)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

  }
}