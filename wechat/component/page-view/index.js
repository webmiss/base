import Config from '../../config'

const app = getApp();

Component({
  options: {
    multipleSlots: true
  },
  properties: {
    header: {type: Boolean, value: true},
    hidden: {type: Boolean, value: false},
    immersed: {type: Boolean, value: false},
    color: {type: String, value: Config.statusBar.color},
    bgColor: {type: String, value: Config.statusBar.bgColor},
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