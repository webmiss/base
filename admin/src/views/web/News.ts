import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Loading from '@/library/ui/loading'
import Toast from '@/library/ui/toast'
import Post from '@/library/request/post'
import Storage from '@/library/Storage'
import Camera from '@/library/plus/camera'
import ImgReader from '@/library/plus/img/reader'
/* UI组件 */
import wmSearch from '@/components/search/index.vue'
import wmMain from '@/components/main/index.vue'
import wmRow from '@/components/main/row/index.vue'
import wmTable from '@/components/table/index.vue'
import wmTableForm from '@/components/table/form.vue'
import wmTableOrder from '@/components/table/order.vue'
import wmCheckbox from '@/components/form/checkbox/index.vue'
import wmTag from '@/components/tag/index.vue'
import wmPopover from '@/components/popover/index.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmPage from '@/components/page/index.vue'
import wmSwitch from '@/components/switch/index.vue'
import wmImg from '@/components/img/index.vue'
import wmImgUpload from '@/components/img/upload/index.vue'
import wmSelect from '@/components/form/select/index.vue'
import wmTinymce from '@/components/tinymce/index.vue'

export default defineComponent({
  components: {
    wmSearch,wmMain,wmRow,wmTable,wmTableForm,wmTableOrder,wmCheckbox,wmTag,wmPopover,wmDialog,wmInput,wmButton,wmPage,
    wmSwitch,wmImg,wmImgUpload,wmSelect,wmTinymce,
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
    const oby: any = {name:'', list:{id:'', title:'', utime:'', source:'', author:''}};
    const add: any = {show:false, form:{img:''}};
    const edit: any = {show:false, id:'', form:{}};
    const del: any = {show:false, ids:''};
    // 分类、内容
    const menus: any = {data:[], value:{}};
    const menusName: any = {};
    const content: any = {
      show: false,
      edit: false,
      form: {},
      upload: {url: 'news/up_img', width: 740, param:{id:''}},
    };
    return {state, getters, page, sea, oby, add, edit, del, menus, menusName, content};
  },
  mounted(){
    // 加载数据
    if(Storage.getItem('token')){
      this.getClass();
      this.loadData();
    }
  },
  methods:{

    /* 分类 */
    getClass(){
      Post('news/get_class',{
        token: Storage.getItem('token'),
      },(res: any)=>{
        const d = res.data;
        if(d.code==0){
          const menus = d.data;
          this.menus.data = menus;
          for(let i in menus){
            this.menusName[menus[i]['value']]=menus[i]['label'];
          }
        }else return Toast(d.msg);
      });
    },

    /* 加载数据 */
    loadData(){
      this.page.list = [];
      this.page.total = 0;
      const load: any = Loading();
      Post('news/list',{
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
      // 验证
      const form: any = this.add.form;
      if(form.img=='') return Toast('请上传封面图!');
      if(!form.cid) return Toast('请选择分类!');
      if(!form.title || form.title.length<2) return Toast('新闻标题2～30字符!');
      // 提交
      this.add.show = false;
      const data: string = JSON.stringify(form);
      const load: any = Loading();
      Post('news/add',{
        token: Storage.getItem('token'),
        data: data
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0){
          this.loadData();
          // 重置
          form.img = '';
          form.cid = '';
          form.title = '';
          form.source = '';
          form.author = '';
          form.summary = '';
        }
        return Toast(d.msg);
      });
    },

    /* 编辑 */
    editData(){
      const table: any = this.$refs.Table;
      const row: any = table.getRow();
      if(!row) return Toast('请选择数据!');
      // 默认值
      this.edit.show = true;
      this.edit.id = row.id;
      this.edit.form.img = row.img;
      this.edit.form.cid = row.cid;
      this.edit.form.title = row.title;
      this.edit.form.source = row.source;
      this.edit.form.author = row.author;
      this.edit.form.sort = row.sort;
      this.edit.form.summary = row.summary;
    },
    subEdit(){
      // 验证
      const form: any = this.edit.form;
      if(form.img=='') return Toast('请上传封面图!');
      if(!form.cid) return Toast('请选择分类!');
      if(!form.title || form.title.length<2) return Toast('新闻标题2～30字符!');
      // 提交
      this.edit.show = false;
      const id: number = this.edit.id;
      const data: string = JSON.stringify(form);
      const load: any = Loading();
      Post('news/edit',{
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
      Post('news/del',{
        token: Storage.getItem('token'),
        data: this.del.ids
      },(res: any)=>{
        load.clear();
        const d = res.data;
        if(d.code===0) this.loadData();
        return Toast(d.msg);
      });
    },

    /* 上传封面图 */
    upImg(type: string){
      Camera((fileObj: any)=>{
        ImgReader(fileObj,{width:400, height:400},(base64: any)=>{
          if(type=='add') this.add.form.img = base64;
          else if(type=='edit') this.edit.form.img = base64;
        });
      });
    },

    /* 状态 */
    setState(val: boolean, id: number){
      Post('news/state',{
        token: Storage.getItem('token'),
        id: id,
        state: val,
      },(res: any)=>{
        const d = res.data;
        return Toast(d.msg);
      });
    },

    /* 预览 */
    openShow(row: any){
      this.content.show = true;
      // 默认值
      const form = this.content.form;
      form.title = row.title;
      form.utime = row.utime;
      form.source = row.source;
      form.author = row.author;
      form.content = '';
      // 内容
      Post("news/get_content", {
        token:Storage.getItem('token'),
        id: row.id,
      }, (res: any)=>{
        const d = res.data;
        if(d.code!=0) return Toast(d.msg);
        form.content = d.content;
      });
    },

    /* 内容 */
    setContent(id: number){
      this.content.edit = true;
      // 默认值
      const form = this.content.form;
      form.id = id;
      form.content = '';
      this.content.upload.param.id = id;
      // 内容
      Post("news/get_content", {
        token:Storage.getItem('token'),
        id: id,
      }, (res: any)=>{
        const d = res.data;
        if(d.code!=0) return Toast(d.msg);
        form.content = d.content;
      });
    },
    subContent(){
      this.content.edit = false;
      // 数据
      const data: any = {
        id: this.content.form.id,
        content: this.content.form.content,
      }
      // 提交
      const load: any = Loading();
      Post("news/content", {
        token:Storage.getItem('token'),
        data: JSON.stringify(data),
      }, (res: any)=>{
        load.clear();
        const d = res.data;
        return Toast(d.msg);
      });
    },

  }
});