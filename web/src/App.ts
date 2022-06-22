import { defineComponent } from 'vue';
import Env from './env'
/* 组件 */
import Menus from '@/docs/Menus'
import HtmlLoad from '@/library/html/load'
import { marked } from "marked";
import printJS from 'print-js'

export default defineComponent({
  name: 'APP',
  components: {},
  data(){
    const apiUrl: string = Env.apiUrl;
    const copy: string = Env.copy;
    // 菜单
    const isShow: boolean = true;
    const nav: any = Menus;
    const sea: any = {key:'', list:[]};
    const menus: any = [];
    const pos: any = ['vue', 'install', 'index'];
    // 内容
    const addr: string = '';
    const docHtml: string = '';
    return {apiUrl,copy,isShow,nav,sea,menus,pos,addr,docHtml}
  },
  watch:{
    $route(to,from){
      // 百度统计
      if(to.path){
        // @ts-ignore
        if(window._hmt) window._hmt.push(['_trackPageview',to.fullPath]);
      }
    },
  },
  mounted(){
    setTimeout(() => {
      // 路由
      const params = this.$route.params;
      this.pos = (params.m1 && params.m2 && params.m3)?[params.m1, params.m2, params.m3]:this.pos;
      this.menusClick(this.pos);
    }, 400);
  },
  methods:{

    /* 搜索 */
    seaInput(){
      if(!this.sea.key) return this.sea.list = [];
      // 数据
      let data = [];
      const reg =new RegExp(this.sea.key);
      for(let x in this.menus){
        for(let y in this.menus[x].children){
          if(reg.test(this.menus[x].children[y].key)){
            this.menus[x].children[y].url = this.menus[x].value;
            data.push(this.menus[x].children[y])
          }
        }
      }
      this.sea.list = data;
    },

    /* 菜单数据 */
    menusClick(pos: any){
      this.pos = pos;
      // 数据
      for(let i in Menus){
        if(Menus[i].value==pos[0]){
          this.menus = Menus[i].children;
          break;
        }
      }
      // 选中
      for(let x in this.menus){
        this.menus[x].checked = this.menus[x].value==pos[1]?true:false;
      }
      // 路由
      const url: string = '/'+pos[0]+'/'+pos[1]+'/'+pos[2];
      this.$router.push(url);
      this.openDocs(url);
    },

    /* 打开文档 */
    openDocs(url: string){
      // 地址栏
      this.addr = '';
      let m1: any = [];
      let m2: any = [];
      for(let i in Menus){
        if(Menus[i].value==this.pos[0]){
          this.addr += Menus[i].label+' > ';
          m1 = Menus[i].children;
          break;
        }
      }
      for(let i in m1){
        if(m1[i].value==this.pos[1]){
          this.addr += m1[i].label+' > ';
          m2 = m1[i].children;
          break;
        }
      }
      for(let i in m2){
        if(m2[i].value==this.pos[2]){
          this.addr += m2[i].label;
          document.title = m2[i].label + '-WebMIS';
          break;
        }
      }
      // Marked文档
      this.docHtml = '';
      try {
        console.log(url);
        const html = require(`@/docs${url}.md`);
        setTimeout(()=>{
          this.docHtml = marked.parse(html);
          // 刷新样式
          HtmlLoad(['/docs/prism.css','/docs/prism.js'],true);
        },400);
      } catch (e) {
        this.docHtml = '没有文件!';
      }
      
    },

    /* 打印 */
    clickPrint(){
      printJS({printable:'Print',type:'html',scanStyles:false,css:'/docs/print.css'});
    },

    /* 跳转 */
    openUrl(url: string){
      window.location.href = url;
    },

  }
});