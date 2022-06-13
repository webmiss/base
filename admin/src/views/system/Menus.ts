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
import wmAdd from '@/components/action/add/index.vue'
import wmClose from '@/components/action/close/index.vue'
import wmForm from '@/components/form/index.vue'
import wmFormItem from '@/components/form/item/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmCascader from '@/components/form/cascader/index.vue'
import wmPage from '@/components/page/index.vue'

/* 系统菜单 */
export default defineComponent({
  components: {wmMain,wmRow,wmTable,wmCheckbox,wmTag,wmPopover,wmDialog,wmAdd,wmClose,wmForm,wmFormItem,wmInput,wmButton,wmCascader,wmPage},
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
    const perm: any = {show:false, id:'', title:'权限', list:[]};
    // 联动菜单
    let keys: any = [];
    const menus: any = {value:[], data:[]};
    return {state, getters, page, sea, add, edit, del, perm, keys, menus};
  },
  mounted(){
    // 加载数据
    if(Storage.getItem('token')){
      this.loadData();
      this.getMenus();
    }
  },
  methods:{

    /* 加载数据 */
    loadData(){
      this.page.list = [];
      this.page.total = 0;
      const load: any = Loading();
      Post('sys_menus/list',{
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

    /* 验证 */
    verify(d: any){
      if(!d.title || d.title.length<2) return '名称大于2个字符';
      return '';
    },

    /* 添加 */
    subAdd(){
      // 验证
      const d: any = this.add.form;
      d.fid = this.getFid();
      let msg: string = this.verify(d);
      if(msg) return Toast(msg);
      // 提交
      this.add.show = false;
      const load: any = Loading();
      Post('sys_menus/add',{
        token: Storage.getItem('token'),
        data: JSON.stringify(d),
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
      // 联动菜单
      this.editKeys();
    },
    editKeys(){
      const fid = this.edit.form.fid;
      const d: any = this.menus.data;
      let keys: any = [];
      if(fid!=0){
        // 一级
        for(let k1 in d){
          if(fid==d[k1].value){
            keys=[k1]; break;
          }
          // 二级
          if(!d[k1].children) continue;
          for(let k2 in d[k1].children){
            if(fid==d[k1].children[k2].value){
              keys=[k1, k2]; break;
            }
            // 三级
            if(!d[k1].children[k2].children) continue;
            for(let k3 in d[k1].children[k2].children){
              if(fid==d[k1].children[k2].children[k3].value){
                keys=[k1, k2, k3]; break;
              }
              // 四级
              if(!d[k1].children[k2].children[k3].children) continue;
              for(let k4 in d[k1].children[k2].children[k3].children){
                if(fid==d[k1].children[k2].children[k3].children[k4].value){
                  keys=[k1, k2, k3, k4]; break;
                }
              }
            }
          }
        }
      }
      this.menus.value = keys;
    },
    subEdit(){
      // 验证
      const d: any = this.edit.form;
      d.fid = this.getFid();
      let msg: string = this.verify(d);
      if(msg) return Toast(msg);
      // 提交
      this.edit.show = false;
      const load: any = Loading();
      Post('sys_menus/edit',{
        token: Storage.getItem('token'),
        id: this.edit.id,
        data: JSON.stringify(d),
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
      Post('sys_menus/del',{
        token: Storage.getItem('token'),
        data: this.del.ids
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 全部菜单 */
    getMenus(){
      Post('sys_menus/getMenusAll',{
        token: Storage.getItem('token'),
        data: this.del.ids
      },(res: any)=>{
        const d = res.data;
        if(d.code===0) this.menus.data = d.menus;
      });
    },
    getFid(){
      let fid: number = 0;
      const pos: any = this.menus.value;
      const n: number = pos.length;
      const data: any = this.menus.data;
      if(n==1) fid = data[pos[0]].value;
      if(n==2) fid = data[pos[0]].children[pos[1]].value;
      if(n==3) fid = data[pos[0]].children[pos[1]].children[pos[2]].value;
      if(n==4) fid = data[pos[0]].children[pos[1]].children[pos[2]].children[pos[3]].value;
      return fid;
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
      Post('sys_menus/perm',{
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
      if(list.length>0) list.push({name:'', action:'', perm:list[list.length-1].perm*2});
      else this.perm.list = [{name:'', action:'', perm:1}];
    },
    /* 删除 */
    permRemove(key: number){
      const list = this.perm.list;
      list.splice(key, 1);
    },

  },
});