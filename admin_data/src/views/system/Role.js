import Inc from '@/library/Inc'
import Action from '@/components/Action'

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
      seaData:{show:false,form:{role:''}},
      addData:{show:false,form:{role:''}},
      editData:{show:false,form:{role:''}},
      delData:{show:false,id:''},
      permData:{show:false,id:'',default:[''],form:[]},
      // 全部动作菜单
      aMenus:[],
    }
  },
  mounted(){
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

    /* 获取编辑数据 */
    getEdit(data){
      if(this.selectData.length>0){
        this.editData.show=true;
        for(let i in data) this.editData.form[i] = this.selectData[0][i] || '';
      }else{
        Inc.toast('请选择数据!');
      }
    },

    /* 菜单动作 */
    openAction(type){
      if(type=='list'){
        this.seaData.form = {role:''};
        this.pageData.page = 1;
        this.loadData();
      }else if(type=='sea'){
        this.seaData.show=true;
      }else if(type=='add'){
        this.addData.show=true;
      }else if(type=='edit'){
        this.getEdit({id:'',role:''});
      }else if(type=='del'){
        if(this.selectData.length>0){
          this.delData.show=true;
          // 获取ID
          let data = this.selectData;
          let id = '';
          for(let i=0; i<data.length; i++) id += data[i].id+',';
          this.delData.id = id;
        }
        else Inc.toast('请选择数据!');
      }
    },

    /* 加载数据 */
    loadData(){
      const load = Inc.loading();
      Inc.post('Sysrole/list',
        {token:Inc.storage.getItem('token'),page:this.pageData.page,limit:this.pageData.limit,data:JSON.stringify(this.seaData.form)},
      (res)=>{
        load.clear();
        const d = res.data;
        if(d.code!=0){
          Inc.toast(d.msg,'error');
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
      const load = Inc.loading();
      Inc.post('Sysrole/add',
        {token:Inc.storage.getItem('token'),data:JSON.stringify(this.addData.form)},
      (res)=>{
        load.clear();
        const d = res.data;
        if(d.code!==0){
          Inc.toast(d.msg,'error');
        }else{
          Inc.toast(d.msg,'success');
          // 刷新数据
          this.loadData();
        }
      });
    },

    /* 编辑 */
    subEdit(){
      this.editData.show=false;
      // 提交
      const load = Inc.loading();
      Inc.post('Sysrole/edit',
        {token:Inc.storage.getItem('token'),id:this.editData.form.id,data:JSON.stringify(this.editData.form)},
      (res)=>{
        load.clear();
        let d = res.data;
        if(d.code!==0){
          Inc.toast(d.msg,'error');
        }else{
          Inc.toast(d.msg,'success');
          // 刷新数据
          this.loadData();
        }
      });
    },

    /* 删除 */
    subDel(){
      this.delData.show=false;
      // 提交
      const load = Inc.loading();
      Inc.post('Sysrole/del',{token:Inc.storage.getItem('token'),data:this.delData.id},(res)=>{
        load.clear();
        let d = res.data;
        if(d.code!==0){
          Inc.toast(d.msg,'error');
        }else{
          Inc.toast(d.msg,'success');
          // 刷新数据
          this.loadData();
        }
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
        }
      });
    },

    /* 编辑权限 */
    eidtPerm(id,perm){
      this.permData.id = id;
      const load = Inc.loading();
      Inc.post('Sysrole/allMenus',{token:Inc.storage.getItem('token')},(res)=>{
        const d = res.data;
        load.clear();
        if(d.code!==0){
          Inc.toast(d.msg,'error');
        }else{
          this.permData.show=true;
          this.permData.form = d.menus;
          if(!perm) return;
          // 拆分权限
          let permArr=[],defArr=[];
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
      const load = Inc.loading();
      Inc.post('Sysrole/perm',
        {token:Inc.storage.getItem('token'),id:this.permData.id,perm:perm},
      (res)=>{
        load.clear();
        const d = res.data;
        if(d.code!==0){
          Inc.toast(d.msg,'error');
        }else{
          Inc.toast(d.msg,'success');
          // 刷新数据
          this.loadData();
        }
      });
    },

  }
}