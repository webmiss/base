import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Loading from '@/library/ui/ui-loading'
import Toast from '@/library/ui/ui-toast'
import Post from '@/library/ui/request-post'
import Storage from '@/library/ui/storage'
/* UI组件 */
import wmMain from '@/components/main/index.vue'
import wmRow from '@/components/main/row/index.vue'
import wmTable from '@/components/table/index.vue'
import wmTableTitle from '@/components/table/title/index.vue'
import wmTableTr from '@/components/table/tr/index.vue'
import wmImg from '@/components/img/index.vue'
import wmTag from '@/components/tag/index.vue'
import wmPopover from '@/components/popover/index.vue'
import wmSwitch from '@/components/switch/index.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmForm from '@/components/form/index.vue'
import wmFormItem from '@/components/form/item/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmRadio from '@/components/form/radio/index.vue'
import wmDate from '@/components/form/date/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmPage from '@/components/page/index.vue'

/* 用户管理 */
export default defineComponent({
  components: {wmMain,wmRow,wmTable,wmTableTitle,wmTableTr,wmImg,wmTag,wmPopover,wmSwitch,wmDialog,wmForm,wmFormItem,wmInput,wmRadio,wmDate,wmButton,wmPage},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    // 分页
    const page: any = {list:[], page:1, limit:10, total:0};
    // 搜索、添加、编辑、删除
    const sea: any = {show:false, form:{}};
    const add: any = {show:false, form:{}};
    const edit: any = {show:false, id:'', form:{}};
    const del: any = {show:false, ids:''};
    // 权限
    const perm: any = {show:false, id:'', perm:''};
    // 用户信息
    const info: any = {show:false, id:'', form:{}};
    const gender: any = [{name:'男', val:'男'},{name:'女', val:'女'}];
    return {state, page, sea, add, edit, del, perm, info, gender};
  },
  computed: {
    // 动作菜单-监听
    actionType(){
      const active: any = this.state.action.active;
      return active;
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
  mounted(){
    // 加载数据
    if(Storage.getItem('token')) this.loadData();
  },
  methods:{

    /* 加载数据 */
    loadData(){
      this.page.list = [];
      this.page.total = 0;
      const load: any = Loading();
      Post('sysuser/list',{
        token: Storage.getItem('token'),
        page: this.page.page,
        limit: this.page.limit,
        data: JSON.stringify(this.sea.form)
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code==0){
          this.page.list = d.list;
          this.page.total = d.total;
        }else return Toast(d.msg);
      });
    },

    /* 分页 */
    subPage(page: number){
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
      const data: string = JSON.stringify(this.add.form);
      const load: any = Loading();
      Post('sysuser/add',{
        token: Storage.getItem('token'),
        data: data
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 编辑 */
    editData(){
      const table: any = this.$refs.Table;
      const row: any = table.getRow('uid');
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
      const uid: number = this.edit.uid;
      const data: string = JSON.stringify(this.edit.form);
      const load: any = Loading();
      Post('sysuser/edit',{
        token: Storage.getItem('token'),
        uid: uid,
        data: data
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 删除 */
    delData(){
      const table: any = this.$refs.Table;
      const vals: any = table.getVals();
      if(!vals) return Toast('请选择数据!');
      this.del.show = true;
      this.del.ids = JSON.stringify(vals);
    },
    subDel(){
      this.del.show = false;
      // 提交
      const load = Loading();
      Post('sysuser/del',{
        token: Storage.getItem('token'),
        data: this.del.ids
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 状态 */
    setState(val: boolean, uid: string){
      const state = val?'1':'0';
      const load = Loading();
      Post('sysuser/state',{
        token: Storage.getItem('token'),
        uid: uid,
        state: state
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code!==0) val=val
        return Toast(d.msg);
      });
    },

    /* 权限 */
    permData(uid: string, perm: string){
      this.perm.show = true;
      console.log(uid,perm);
    },
    subPerm(){

    },

    /* 用户信息 */
    infoData(row: any){
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
      Post('sysuser/info',{
        token: Storage.getItem('token'),
        uid: uid,
        data: data
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

  },
});