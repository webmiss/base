import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Loading from '@/library/ui/loading'
import Toast from '@/library/ui/toast'
import Post from '@/library/request/post'
import Storage from '@/library/Storage'
/* UI组件 */
import wmSearch from '@/components/search/index.vue'
import wmMain from '@/components/main/index.vue'
import wmRow from '@/components/main/row/index.vue'
import wmTable from '@/components/table/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmTableOrder from '@/components/table/order.vue'
import wmCheckbox from '@/components/form/checkbox/index.vue'
import wmImg from '@/components/img/index.vue'
import wmTag from '@/components/tag/index.vue'
import wmPopover from '@/components/popover/index.vue'
import wmSwitch from '@/components/switch/index.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmRadio from '@/components/form/radio/index.vue'
import wmDate from '@/components/form/date/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmPage from '@/components/page/index.vue'
import wmTree from '@/components/tree/index.vue'
import wmTabs from '@/components/tabs/index.vue'

/* 用户管理 */
export default defineComponent({
  components: {
    wmSearch,wmMain,wmRow,wmTable,wmTableForm,wmTableOrder,wmCheckbox,wmImg,wmTag,wmPopover,
    wmSwitch,wmDialog,wmInput,wmRadio,wmDate,wmButton,wmPage,wmTree,
    wmTabs,
  },
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    const getters: any = store.getters;
    // 分页
    const page: any = {list:[], page:1, limit:20, total:0};
    // 搜索、排序、添加、编辑、删除
    const sea: any = {show:false, form:{}};
    const oby: any = {name:'', list:{'a.id':'', 'a.tel':'', 'a.ltime':'', 'b.nickname':'', 'b.name':'', 'b.gender':'', 'b.birthday':'', 'b.department':'', 'b.position':''}};
    const add: any = {show:false, form:{}};
    const edit: any = {show:false, id:'', form:{}};
    const del: any = {show:false, ids:''};
    // 权限
    const perm: any = {show:false, active:'role', m:'', uid:'', role: 0, roleList:[], perm:'', permList:[]};
    // 用户信息
    const info: any = {show:false, id:'', form:{}};
    const gender: any = [{label:'男',value:'男'},{label:'女',value:'女'}];
    return {state, getters, page, sea, oby, add, edit, del, perm, info, gender};
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
      Post('sys_user/list',{
        token: Storage.getItem('token'),
        page: this.page.page,
        limit: this.page.limit,
        data: JSON.stringify(this.sea.form),
        order: this.oby.name,
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
      this.page.page = 1;
      this.loadData();
    },

    /* 排序 */
    OrderBy(name: string, val: string){
      for(let i in this.oby.list) this.oby.list[i] = i==name?val:'';
      this.oby.name = val?name+' '+ val:'';
      this.loadData();
    },

    /* 添加 */
    subAdd(){
      this.add.show = false;
      // 提交
      const data: string = JSON.stringify(this.add.form);
      const load: any = Loading();
      Post('sys_user/add',{
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
      Post('sys_user/edit',{
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
      Post('sys_user/del',{
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
      Post('sys_user/state',{
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
    permData(m: string, uid: string, role: number, perm: string){
      this.perm.show = true;
      this.perm.m = m;
      this.perm.uid = uid;
      this.perm.role = 0;
      // 模块
      let roleUrl: string = '';
      let permUrl: string = '';
      if(m=='admin'){
        roleUrl = 'sys_role/roleList';
        permUrl = 'sys_role/permList';
      }else if(m=='api'){
        roleUrl = 'api_role/roleList';
        permUrl = 'api_role/permList';
      }
      // 角色列表
      Post(roleUrl, {
        token: Storage.getItem('token'),
      },(res: any)=>{
        const d = res.data;
        if(d.code===0){
          this.perm.roleList = d.list;
          this.perm.role = role;
        }else Toast(d.msg);
      });
      // 权限列表
      Post(permUrl,{
        token: Storage.getItem('token'),
        perm: perm,
      },(res: any)=>{
        const d = res.data;
        if(d.code===0) this.perm.permList = d.list;
        else Toast(d.msg);
      });
    },
    subPerm(){
      this.perm.show = false;
      // 提交
      const obj: any = this.$refs.perm;
      const load = Loading();
      Post('sys_user/perm',{
        token: Storage.getItem('token'),
        type: this.perm.m,
        uid: this.perm.uid,
        role: this.perm.role,
        perm: obj.getPerms()
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
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
      this.info.form.department = row.department || '';
      this.info.form.position = row.position || '';
    },
    subInfo(){
      this.info.show = false;
      // 提交
      const uid = this.info.uid;
      const data = JSON.stringify(this.info.form);
      const load = Loading();
      Post('sys_user/info',{
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