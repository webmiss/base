import Env from '../../env'

const app = getApp();

Component({
  options: {
    multipleSlots: true
  },
  properties: {
    hidden: {type: Boolean, value: false},
    immersed: {type: Boolean, value: false},
    color: {type: String, value: Env.statusBar.color},
    bgColor: {type: String, value: Env.statusBar.bgColor},
  },
  data: {
    statusBar: 0,
    height: 0,
  },
  /* 初始化 */
  attached(){
    this.setData({
      statusBar: app.globalData.statusBarHeight,
      height: app.globalData.titleBarHeight,
    });
  },
  methods:{}
});