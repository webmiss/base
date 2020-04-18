import Env from '../../env'

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
  },
  /* 初始化 */
  didMount(){
    setTimeout(()=>{
      this.setData({
        statusBar: app.globalData.statusBarHeight,
        height: app.globalData.titleBarHeight,
      });
    },300);
  },
  methods: {},
});
