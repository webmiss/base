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
import wmImg from '../../components/img'
import wmTag from '../../components/tag'
import wmPopover from '../../components/popover'
import wmSwitch from '../../components/switch'
import wmDialog from '../../components/dialog'
import wmForm from '../../components/form'
import wmFormItem from '../../components/form/item'
import wmInput from '../../components/form/input'
import wmRadio from '../../components/form/radio'
import wmDate from '../../components/form/date'
import wmButton from '../../components/form/button'
import wmPage from '../../components/page'

/* 用户管理 */
export default {
  components: {wmMain,wmRow,wmTable,wmTableTitle,wmTableTr,wmImg,wmTag,wmPopover,wmSwitch,wmDialog,wmForm,wmFormItem,wmInput,wmRadio,wmDate,wmButton,wmPage},
  data(){
    return {
      store: this.$store.state,
      page: {list:[], page:1, limit:10, total:0,},
      // 搜索、添加、编辑、删除
      sea: {show:false,form:{uname:''}},
      add: {show:false,form:{tel:'',passwd:''}},
      edit: {show:false,id:'',form:{tel:'',passwd:''}},
      del: {show:false,ids:''},
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
    this.store.action.url = 'SysPerm';
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
      Post('Sysperm/list',{
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

  },
}