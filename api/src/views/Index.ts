import { defineComponent } from 'vue';
import Env from '@/env'
import Menus from '@/Menus'
/* JS组件 */
import Loading from '@/library/ui/loading'
import Toast from '@/library/ui/toast'
import Get from '@/library/request/get'
import Post from '@/library/request/post'
import Put from '@/library/request/put'
import Delete from '@/library/request/delete'
import Patch from '@/library/request/patch'
/* UI组件 */
import ScrollView from '@/components/scroll-view/index.vue'
import wmMenu from '@/components/menu/index.vue'
import wmForm from '@/components/form/index.vue'
import wmFormItem from '@/components/form/item/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmRadio from '@/components/form/radio/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmJsonFormat from '@/components/json-format/index.vue'

export default defineComponent({
  components: {ScrollView,wmMenu,wmForm,wmFormItem,wmInput,wmRadio,wmButton,wmJsonFormat},
  data(){
    const config: Object = Env;
    const search: any = {val:'',data:[]};
    // 左侧菜单
    const menus: Array<any> = [];
    // 请求数据
    const request: any = {};
    const method: Array<Object> = [
      {name:'GET', val:'get'},
      {name:'POST', val:'post'},
      {name:'PUT', val:'put'},
      {name:'DELETE', val:'delete'},
      {name:'PATCH', val:'patch'},
    ];
    // 结果
    const result: any = {type:'param',response:'result > '};
    return {config, search, menus, request, method, result};
  },
  mounted(){
    this.menus = Menus();
  },
  methods:{

    /* 搜索 */
    seaVal(key: string){
      this.search.val = key;
      if(!key) return;
      // 正则
      const reg =new RegExp(key);
      // 数据
      let data = [];
      for(let x in this.menus){
        // 一级
        if(!this.menus[x].children){
          if(reg.test(this.menus[x].label)){
            data.push({label: this.menus[x].label, value: this.menus[x].value});
          }
          continue;
        }
        // 二级
        for(let y in this.menus[x].children){
          if(!this.menus[x].children[y].children){
            if(reg.test(this.menus[x].children[y].label)){
              data.push({label: this.menus[x].children[y].label, value: this.menus[x].children[y].value});
            }
            continue;
          }
          // 三级
          for(let z in this.menus[x].children[y].children){
            if(!this.menus[x].children[y].children[z].children){
              if(reg.test(this.menus[x].children[y].children[z].label)){
                data.push({label: this.menus[x].children[y].children[z].label, value: this.menus[x].children[y].children[z].value});
              }
              continue;
            }
          }
        }
      }
      this.search.data = data;
      let mObj: any = this.$refs.menusScroll;
      mObj.refresh();
    },

    /* 点击菜单 */
    menuClick(pos: number[], value: any){
      this.request = value;
      // Url自适应宽度
      const n = this.request.url.length;
      const urlObj: any = document.getElementById('requestUrl');
      urlObj.style.width = n*8+'px';
      // 重置结果
      this.result.response = 'result > ';
    },

    /* 发送请求 */
    onSub(){
      // 参数
      const url = this.request.url;
      const param = this.request.param;
      const data: any = {};
      for(let i in param){
        data[param[i].key] = param[i].val;
      }
      if(!url) return Toast('请求地址为空!');
      // 请求
      const load = Loading();
      if(this.request.method=='get'){
        Get(url,data,(res: any)=>{
          load.clear();
          this.setResult(res);
        },(err: any)=>this.result.response=err);
      }else if(this.request.method=='post'){
        Post(url,data,(res: any)=>{
          load.clear();
          this.setResult(res);
        },(err: any)=>this.result.response=err);
      }else if(this.request.method=='put'){
        Put(url,data,(res: any)=>{
          load.clear();
          this.setResult(res);
        },(err: any)=>this.result.response=err);
      }else if(this.request.method=='delete'){
        Delete(url,data,(res: any)=>{
          load.clear();
          this.setResult(res);
        },(err: any)=>this.result.response=err);
      }else if(this.request.method=='patch'){
        Patch(url,data,(res: any)=>{
          load.clear();
          this.setResult(res);
        },(err: any)=>this.result.response=err);
      }
    },

    /* 请求结果 */
    setResult(res: any){
      const d: any = res.data;
      Toast(d.msg);
      this.result.type = 'data';
      this.result.response = d;
      (this.$refs.resultScroll as any).refresh();
    },

  }
});
