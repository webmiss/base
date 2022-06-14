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
import wmDialog from '@/components/dialog/index.vue'
import wmForm from '@/components/form/index.vue'
import wmFormItem from '@/components/form/item/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmPage from '@/components/page/index.vue'
import wmSwitch from '@/components/switch/index.vue'

export default defineComponent({
  components: {wmMain,wmRow,wmTable,wmCheckbox,wmDialog,wmForm,wmFormItem,wmInput,wmButton,wmPage,wmSwitch},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    const getters: any = store.getters;
    // 分页
    const page: any = {list:[], page:1, limit:20, total:0};
    // 搜索、添加、编辑、删除
    const sea: any = {show:false, form:{}};
    const add: any = {show:false, form:{name:'', state: true}};
    const edit: any = {show:false, id:'', form:{}};
    const del: any = {show:false, ids:''};
    return {state, getters, page, sea, add, edit, del};
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
      Post('news_class/list',{
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
      // 验证
      let form = this.add.form;
      if(form.name.length < 2) return Toast('名称不能小于2个字符');
      // 提交
      this.add.show = false;
      const data: string = JSON.stringify(this.add.form);
      const load: any = Loading();
      Post('news_class/add',{
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
      this.edit.form.name = row.name;
      this.edit.form.sort = row.sort;
      this.edit.form.state = row.state;
    },
    subEdit(){
      // 验证
      let form = this.edit.form;
      if(form.name.length < 2) return Toast('名称不能小于2个字符');
      // 提交
      this.edit.show = false;
      const id: number = this.edit.id;
      const data: string = JSON.stringify(this.edit.form);
      const load: any = Loading();
      Post('news_class/edit',{
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
      const load: any = Loading();
      Post('news_class/del',{
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
    setState(val: boolean, id: number){
      Post('news_class/state',{
        token: Storage.getItem('token'),
        id: id,
        state: val,
      },(res: any)=>{
        const d = res.data;
        return Toast(d.msg);
      });
    },

  }
});