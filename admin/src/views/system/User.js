/* JS组件 */
import Loading from '@/library/ui/ui-loading'
import Toast from '@/library/ui/ui-toast'
import Post from '@/library/ui/request-post'
import Storage from '@/library/ui/storage'
/* UI组件 */
import wmMain from '@/components/main'
import wmRow from '@/components/main/row'
import wmTable from '@/components/table'
import wmTableTitle from '@/components/table/title'
import wmTableTr from '@/components/table/tr'
import wmImg from '../../components/img'
import wmTag from '@/components/tag'
import wmPopover from '@/components/popover'
import wmSwitch from '@/components/switch'
import wmDialog from '@/components/dialog'
import wmForm from '../../components/form'
import wmFormItem from '../../components/form/item'
import wmInput from '../../components/form/input'
import wmRadio from '../../components/form/radio'
import wmDate from '../../components/form/date'
import wmButton from '@/components/form/button'

/* 用户管理 */
export default {
  components: {wmMain,wmRow,wmTable,wmTableTitle,wmTableTr,wmImg,wmTag,wmPopover,wmSwitch,wmDialog,wmForm,wmFormItem,wmInput,wmRadio,wmDate,wmButton},
  data(){
    return {
      store: this.$store.state,
      page: {list:[], total:0, page:1, limit:15},
      // 搜索、添加、编辑、删除
      sea: {show:false,form:{uname:''}},
      add: {show:false,form:{tel:'',passwd:''}},
      edit: {show:false,id:'',form:{tel:'',passwd:''}},
      del: {show:false,ids:''},
      // 用户信息
      info: {show:false,id:'',form:{}},
      gender: [{name:'男',val:'男'},{name:'女',val:'女'}],
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
    this.store.action.url = 'SysUser';
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
      Post('Sysuser/list',{
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
      Post('Sysuser/add',{token:Storage.getItem('token'),data:data},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 编辑 */
    editData(){
      const table = this.$refs.Table;
      const row = table.getRow('uid');
      if(!row) return Toast('请选择数据!');
      this.edit.show = true;
      // 默认值
      this.edit.uid = row.uid;
      this.edit.form.tel = row.tel;
      this.edit.form.passwd = '';
    },
    subEdit(){
      this.edit.show = false;
      // 提交
      const uid = this.edit.uid;
      const data = JSON.stringify(this.edit.form);
      const load = Loading();
      Post('Sysuser/edit',{token:Storage.getItem('token'),uid:uid,data:data},(res)=>{
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
      Post('Sysuser/delete',{token:Storage.getItem('token'),data:this.del.ids},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 状态 */
    setState(val,uid){
      const state = val?'1':'0';
      const load = Loading();
      Post('Sysuser/state',{token:Storage.getItem('token'),uid:uid,state:state},(res)=>{
        load.clear();
        const d = res.data;
        return Toast(d.msg);
      });
    },

    /* 用户信息 */
    infoData(row){
      this.info.show = true;
      // 默认值
      this.info.uid = row.uid;
      this.info.form.nickname = row.nickname || '';
      this.info.form.name = row.name || '';
      this.info.form.gender = row.gender || '';
      this.info.form.birthday = row.birthday || '';
      this.info.form.position = row.position || '';
    },
    subInfo(){
      this.info.show = false;
      // 提交
      const uid = this.info.uid;
      const data = JSON.stringify(this.info.form);
      const load = Loading();
      Post('Sysuser/info',{token:Storage.getItem('token'),uid:uid,data:data},(res)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

  },
}