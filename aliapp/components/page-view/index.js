import Env from '../../env'
import HtmlInfo from '../../libray/inc/html-info'

const app = getApp();

Component({
  mixins: [],
  props: {
    hidden: false,
    immersed: false,
    color: Env.statusBar.color,
    bgColor: Env.statusBar.bgColor,
  },
  data: {
    statusBar: 0,
    height: 0,
    screenHeight: 0,
  },
  /* 初始化 */
  didMount(){
    setTimeout(()=>{
      this.setData({
        statusBar: app.globalData.statusBarHeight,
        height: app.globalData.titleBarHeight,
      });
    },300);
    HtmlInfo(this,'#html',(res)=>{
      this.setData({ screenHeight:res[0].height });
    });
  },
  methods: {},
});
