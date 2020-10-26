/* JS组件 */
import Loading from '@/library/ui/ui-loading'
import Toast from '@/library/ui/ui-toast'
import Post from '@/library/ui/request-post'
import Storage from '@/library/ui/storage'
/* UI组件 */
import wmMain from '@/components/main'
import wmTable from '@/components/table'
import wmTableTitle from '@/components/table/title'
import wmTableTr from '@/components/table/tr'
import wmTag from '@/components/tag'
import wmPopover from '@/components/popover'
export default {
  components: {wmMain,wmTable,wmTableTitle,wmTableTr,wmTag,wmPopover},
  data(){
    return {
      store: this.$store.state,
      page: {list:[], total:0, page:1, limit:15},
      search:{show:false,form:{uname:''}},
    }
  },
  computed: {
    // 动作菜单-监听
    actionType(){ return this.$store.state.action.type; }
  },
  watch:{
    // 动作菜单-点击
    actionType(val){
      if(!val) return false;
      console.log(val);
      if(val=='list'){
        this.loadData();
      }else if(val=='edit'){
        this.editData();
      }else if(val=='del'){
        this.delData();
      }
    }
  },
  activated(){
    // 动作菜单-获取
    this.store.action.url = 'SysUser';
    this.store.action.menus = '';
    // 加载数据
    this.loadData();
  },
  mounted(){
  },
  methods:{

    /* 加载数据 */
    loadData(){
      const load = Loading();
      Post('Sysuser/list',{
        token: Storage.getItem('token'),
        page: this.page.page,
        limit: this.page.limit,
        data: JSON.stringify(this.search.form)
      },(res)=>{
        load.clear();
        const d = res.data;
        console.log(d);
        if(d.code==0){
          this.page.list = d.list;
          this.page.total = d.total;
        }else return Toast(d.msg);
      });
    },

    /* 编辑 */
    editData(){
      const table = this.$refs.Table;
      const row = table.getRow('uid');
      console.log(row);
    },

    /* 删除 */
    delData(){
      const table = this.$refs.Table;
      const vals = table.getVals();
      console.log(vals);
    },

  },
}