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
      // 搜索、添加、编辑、删除
      seaData:{show:false,form:{}},
      addData:{show:false,active:'one',form:{}},
      editData:{show:false,active:'one',form:{}},
      delData:{show:false,id:''},
    }
  },
  computed:{
    /* 动作菜单-点击 */
    actionType(){
      let type = this.$store.state.action.type;
      if(type=='list'){
        this.seaData.form = {};
        this.pageData.page = 1;
        this.loadData();
      }else if(type=='sea'){
        this.seaData.show=true;
      }else if(type=='add'){
        this.addData.show=true;
      }else if(type=='edit'){
        this.getEdit({id:''});
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
      return type;
    },
  },
  mounted(){
    // 动作菜单-配置
    this.$store.state.action.url = '';
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
    },

  }
}