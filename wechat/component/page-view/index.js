import Env from '../../env'

const app = getApp();

Component({
  options: {
    multipleSlots: true
  },
  properties: {
    header: {type: Boolean, value: true},
    hidden: {type: Boolean, value: false},
    immersed: {type: Boolean, value: false},
    color: {type: String, value: Env.statusBar.color},
    bgColor: {type: String, value: Env.statusBar.bgColor},
  },
  data: {
    statusBar: app.globalData.nav.statusBar,
    custom: app.globalData.nav.custom,
    height: app.globalData.nav.custom.height+2,
  },
  attached(){
  },
  methods: {
  }
});