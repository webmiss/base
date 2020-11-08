import Env from '../env'
import Menus from '../Menus'
import Storage from '../library/ui/storage'
import Loading from '../library/ui/ui-loading'
import Toast from '../library/ui/ui-toast'
import Get from '../library/ui/request-get'
import Post from '../library/ui/request-post'
import Put from '../library/ui/request-put'
import Delete from '../library/ui/request-delete'
import Request from '../library/ui/request-request'
/* UI组件 */
import ScrollView from '../components/scroll-view'
import wmMenu from '../components/menu'
import wmForm from '../components/form'
import wmFormItem from '../components/form/item'
import wmInput from '../components/form/input'
import wmRadio from '../components/form/radio'
import wmButton from '../components/form/button'
import wmJsonFormat from '../components/json-format'

export default {
  components: {ScrollView,wmMenu,wmForm,wmFormItem,wmInput,wmRadio,wmButton,wmJsonFormat},
  data(){
    return {
      config: Env,
      search: {val:'',data:[]},
      // 左侧菜单
      menus: Menus(),
      menusActive: [0,0],
      // 请求数据
      request: {},
      method: [
        {name:'GET', val:'get'},
        {name:'POST', val:'post'},
        {name:'PUT', val:'put'},
        {name:'DELETE', val:'delete'},
        {name:'REQUEST', val:'request'},
      ],
      // 结果
      result: {type:'param',response:'result > '},
    }
  },
  mounted(){
    // 默认菜单
    const obj = this.$refs.Menus;
    this.menusActive = Storage.getItem('apiMenusActive')?JSON.parse(Storage.getItem('apiMenusActive')):[0,0];
    setTimeout(()=>{
      obj.titleClick(this.menusActive[0]);
      obj.menuClick(this.menusActive);
    },400);
  },
  methods:{

    /* 搜索 */
    seaVal(key){
      this.search.val = key;
      if(!key) return;
      // 正则
      const reg =new RegExp(key);
      // 数据
      let data = [];
      for(let x in this.menus){
        for(let y in this.menus[x].children){
          if(reg.test(this.menus[x].children[y].title)){
            data.push(this.menus[x].children[y]);
          }
        }
      }
      this.search.data = data;
    },

    /* 点击菜单 */
    menuClick(pos){
      // 请求数据
      const data = this.menus[pos[0]].children[pos[1]].data;
      this.request = data;
      // Url自适应宽度
      const n = this.request.url.length;
      const urlObj = document.getElementById('requestUrl').style;
      urlObj.width = n*8+'px';
      // 保存位置
      Storage.setItem('apiMenusActive',JSON.stringify(pos));
      // 重置结果
      this.result.response = 'result > ';
    },

    /* 发送请求 */
    onSub(){
      // 参数
      const url = this.request.url;
      const param = this.request.param;
      const data={};
      for(let i in param){
        data[param[i].key] = param[i].val;
      }
      // 请求
      const load = Loading();
      if(this.request.method=='get'){
        Get(url,data,res=>{
          load.clear();
          const d=res.data;
          Toast(d.msg);
          this.result.type = 'data';
          return this.result.response=d;
        },err=>this.result.response=err);
      }else if(this.request.method=='post'){
        Post(url,data,res=>{
          load.clear();
          const d=res.data;
          Toast(d.msg);
          this.result.type = 'data';
          return this.result.response=d;
        },err=>this.result.response=err);
      }else if(this.request.method=='put'){
        Put(url,data,res=>{
          load.clear();
          const d=res.data;
          Toast(d.msg);
          this.result.type = 'data';
          return this.result.response=d;
        },err=>this.result.response=err);
      }else if(this.request.method=='delete'){
        Delete(url,data,res=>{
          load.clear();
          const d=res.data;
          Toast(d.msg);
          this.result.type = 'data';
          return this.result.response=d;
        },err=>this.result.response=err);
      }else if(this.request.method=='request'){
        Request(url,data,res=>{
          load.clear();
          const d=res.data;
          Toast(d.msg);
          this.result.type = 'data';
          return this.result.response=d;
        },err=>this.result.response=err);
      }
    },

    

  }
}