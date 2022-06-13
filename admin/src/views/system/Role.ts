import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Loading from '@/library/ui/loading'
import Toast from '@/library/ui/toast'
import Post from '@/library/request/post'
import Storage from '@/library/Storage'
/* UI组件 */
import wmMain from '@/components/main/index.vue'
import wmRow from '@/components/main/row/index.vue'
import wmTable from '@/components/table/index.vue'
import wmCheckbox from '@/components/form/checkbox/index.vue'
import wmTag from '@/components/tag/index.vue'
import wmPopover from '@/components/popover/index.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmForm from '@/components/form/index.vue'
import wmFormItem from '@/components/form/item/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmPage from '@/components/page/index.vue'
import wmTree from '@/components/tree/index.vue'

/* 系统角色 */
export default defineComponent({
  components: {
    wmMain,wmRow,wmTable,wmCheckbox,wmTag,wmPopover,wmDialog,wmForm,wmFormItem,wmInput,wmButton,wmPage,wmTree
  },
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    const getters: any = store.getters;
    // 分页
    const page: any = {list:[], page:1, limit:20, total:0};
    // 搜索、添加、编辑、删除
    const sea: any = {show:false, form:{}};
    const add: any = {show:false, form:{}};
    const edit: any = {show:false, id:'', form:{}};
    const del: any = {show:false, ids:''};
    // 权限
    const perm: any = {show:false, id:'', perm:'', permList:[]};
    return {state, getters, page, sea, add, edit, del, perm}
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
      Post('sys_role/list',{
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
      this.page.page = 1;
      this.loadData();
    },

    /* 添加 */
    subAdd(){
      this.add.show = false;
      // 提交
      const data: string = JSON.stringify(this.add.form);
      const load: any = Loading();
      Post('sys_role/add',{
        token: Storage.getItem('token'),
        data:data
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
      const row: any = table.getRow();
      if(!row) return Toast('请选择数据!');
      this.edit.show = true;
      // 默认值
      this.edit.id = row.id;
      this.edit.form.name = row.name;
    },
    subEdit(){
      this.edit.show = false;
      // 提交
      const id: number = this.edit.id;
      const data: string = JSON.stringify(this.edit.form);
      const load: any = Loading();
      Post('sys_role/edit',{
        token: Storage.getItem('token'),
        id: id,
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
      Post('sys_role/del',{
        token: Storage.getItem('token'),
        data: this.del.ids
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 权限 */
    permData(id: number, perm: string){
      this.perm.show = true;
      this.perm.id = id;
      // 权限列表
      const load = Loading();
      Post('sys_role/permList',{
        token: Storage.getItem('token'),
        perm: perm || '',
      },(res: any)=>{
        load.clear();
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
      Post('sys_role/perm',{
        token: Storage.getItem('token'),
        id: this.perm.id,
        perm: obj.getPerms()
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

  },
});