import { defineComponent } from 'vue';
/* 菜单 */
import Menus from '@/docs/Menus'
/* JS组件 */
import NavigateTo from '@/library/ui/ui-navigate-to'
import LoadHtml from '@/library/inc/html-load'
/* UI组件 */
import WmScrollView from '@/components/scroll-view/index.vue'
import wmMenu from '@/components/menu/index.vue'

/* Markdown */
import Marked from 'marked'
import printJS from 'print-js'

export default defineComponent({
  components: {WmScrollView,wmMenu},
  data(){
    const menuIndex: number[] = [0,1];
    const menuData: object[] = [];
    const position: string[] = ['WebMIS > '];
    const Nav: string = '';
    const docHtml: string = '';
    return {menuIndex, menuData, position, Nav, docHtml,}
  },
  watch:{
    $route(to,from){
      if(this.$route.params.m1!=this.Nav){
        // 重置
        this.init(true);
      };
    }
  },
  mounted(){
    this.init();
  },
  methods:{

    /* 初始化 */
    init(reset?: boolean){
      this.Nav = <string>this.$route.params.m1;
      if(this.Nav=='vue'){
        this.position[1] = 'Vue > ';
        this.menuData = Menus.vue();
        if(reset) this.menuIndex = [0,1];
      }else if(this.Nav=='flutter'){
        this.position[1] = 'Flutter > ';
        this.menuData = Menus.flutter();
        if(reset) this.menuIndex = [0,1];
      }else if(this.Nav=='phalcon'){
        this.position[1] = 'Phalcon > ';
        this.menuData = Menus.phalcon();
        if(reset) this.menuIndex = [0,1];
      }else if(this.Nav=='python'){
        this.position[1] = 'Python > ';
        this.menuData = Menus.python();
        if(reset) this.menuIndex = [0,1];
      }else if(this.Nav=='java'){
        this.position[1] = 'Java > ';
        this.menuData = Menus.java();
        if(reset) this.menuIndex = [0,1];
      }else if(this.Nav=='gin'){
        this.position[1] = 'Gin > ';
        this.menuData = Menus.gin();
        if(reset) this.menuIndex = [0,1];
      }else if(this.Nav=='linux'){
        this.position[1] = 'Linux > ';
        this.menuData = Menus.linux();
        if(reset) this.menuIndex = [0,0];
      }else{
        this.position[1] = '';
        this.menuData = [];
        this.menuIndex = [];
      }
    },

    /* 选择菜单 */
    activeMenus(index: number[], vaule: string, label: string){
      this.position[2] = label;
      NavigateTo(this,'/'+vaule);
      // 打开文件
      try {
        this.docHtml = '';
        this.docHtml = Marked(require(`@/${vaule}.md`));
      } catch (e) {
        this.docHtml = '没有文件!';
      }
      // 恢复位置
      const scroll: any = this.$refs.docScroll;
      scroll.scrollTo(0,0,400);
      // 隐藏菜单
      let lm: any = this.$refs.leftMenus;
      if(lm.style.display=='block') this.showMenus();
      // 刷新样式
      LoadHtml(['/docs/prism.css','/docs/prism.js'],true);
    },

    /* 显示菜单 */
    showMenus(){
      const menus: any = this.$refs.leftMenus;
      const bg: any = this.$refs.leftMenusBG;
      menus.style.display = menus.style.display=='block'?'':'block';
      bg.style.display = bg.style.display=='block'?'':'block';
    },

    /* 打印 */
    clickPrint(){
      printJS({printable:'Print',type:'html',scanStyles:false,css:'/docs/print.css'});
    },

  }
});