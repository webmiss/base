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
      pageData:{list:[], total:0, page:1, limit:15},
      // 搜索、添加、编辑、删除、权限
      seaData:{show:false,form:{name:'',action:'',ico:''}},
      addData:{show:false,form:{name:'',action:'',perm:'',ico:''}},
      editData:{show:false,form:{name:'',action:'',perm:'',ico:''}},
      delData:{show:false,id:''},
    }
  },
  mounted(){
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
        this.seaData.form = {name:'',action:'',ico:''};
        this.pageData.page = 1;
        this.loadData();
      }else if(type=='sea'){
        this.seaData.show=true;
      }else if(type=='add'){
        this.addData.show=true;
      }else if(type=='edit'){
        this.getEdit({id:'',name:'',action:'',perm:'',ico:''});
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
      Inc.post('Sysmenusaction/list',
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
      Inc.post('Sysmenusaction/add',
        {token:Inc.storage.getItem('token'),data:JSON.stringify(this.addData.form)},
      (res)=>{
        let d = res.data;
        if(d.code!==0){
          load.clear();
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
      Inc.post('Sysmenusaction/edit',
        {token:Inc.storage.getItem('token'),id:this.editData.form.id,data:JSON.stringify(this.editData.form)},
      (res)=>{
        let d = res.data;
        if(d.code!==0){
          load.clear();
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
      Inc.post('Sysmenusaction/del',
        {token:Inc.storage.getItem('token'),data:this.delData.id},
      (res)=>{
        let d = res.data;
        if(d.code!==0){
          load.clear();
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