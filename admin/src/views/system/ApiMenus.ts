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
import wmTableTitle from '@/components/table/title/index.vue'
import wmTableTr from '@/components/table/tr/index.vue'
import wmTag from '@/components/tag/index.vue'
import wmPopover from '@/components/popover/index.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmAdd from '@/components/action/add/index.vue'
import wmClose from '@/components/action/close/index.vue'
import wmForm from '@/components/form/index.vue'
import wmFormItem from '@/components/form/item/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmPage from '@/components/page/index.vue'

/* 系统菜单 */
export default defineComponent({
  components: {wmMain,wmRow,wmTable,wmTableTitle,wmTableTr,wmTag,wmPopover,wmDialog,wmAdd,wmClose,wmForm,wmFormItem,wmInput,wmButton,wmPage},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    const getters: any = store.getters;
    // 分页
    const page: any = {list:[], page:1, limit:10, total:0};
    // 搜索、添加、编辑、删除
    const sea: any = {show:false, form:{}};
    const add: any = {show:false, form:{}};
    const edit: any = {show:false, id:'', form:{}};
    const del: any = {show:false, ids:''};
    // 权限
    const perm: any = {show:false, id:'', title:'权限', list:[]};
    return {state, getters, page, sea, add, edit, del, perm};
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
      Post('api_menus/list',{
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
      Post('api_menus/add',{
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
      const row: any = table.getRow();
      if(!row) return Toast('请选择数据!');
      this.edit.show = true;
      // 默认值
      this.edit.id = row.id;
      this.edit.form.fid = row.fid;
      this.edit.form.title = row.title;
      this.edit.form.url = row.url;
      this.edit.form.ico = row.ico;
      this.edit.form.sort = row.sort;
      this.edit.form.controller = row.controller;
    },
    subEdit(){
      this.edit.show = false;
      // 提交
      const load: any = Loading();
      Post('api_menus/edit',{
        token: Storage.getItem('token'),
        id: this.edit.id,
        data: JSON.stringify(this.edit.form)
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
      const load: any = Loading();
      Post('api_menus/del',{
        token: Storage.getItem('token'),
        data: this.del.ids
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 动作权限 */
    permData(id: number, title: string, controller: string, data: string){
      this.perm.show = true;
      this.perm.id = id;
      this.perm.title = title + ': ' + controller;
      this.perm.list = data;
    },
    subPerm(){
      // 过滤
      const list = this.perm.list;
      const data = [];
      for(let i in list){
        if(list[i].action && list[i].perm) data.push(list[i]);
      }
      this.perm.list = data;
      this.perm.show = false;
      // 提交
      const load: any = Loading();
      Post('api_menus/perm',{
        token: Storage.getItem('token'),
        id: this.perm.id,
        data: JSON.stringify(data)
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },
    /* 追加 */
    permAdd(){
      const list = this.perm.list;
      const perm = list[list.length-1].perm;
      list.push({name:'', action:'', perm:perm*2});
    },
    /* 删除 */
    permRemove(key: number){
      const list = this.perm.list;
      list.splice(key, 1);
    },

  },
});