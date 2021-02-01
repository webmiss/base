/**
 * 图片预加载组件
 */
Component({
  properties: {
    url: String,
    radius: { type: String, value: "0%" },
    width: { type: String, value: "100%" },
    height: { type: String, value: "" },
    bgColor: { type: String, value: "#f8fafc" },
    logoImg: { type: String, value: "../../assets/svg/baseMap.svg" },
    logoSize: { type: String, value: "40%" },
    loadSize: { type: String, value: "24px" },
    shadow: { type: String, value: "" },
    border: { type: String, value: "" },
  },
  
  data: {
    finishLoadFlag: false,
    errorFlag: false,
  },
  
  attached(){
    // console.log(this.properties.url);
  },

  methods: {
    // 图片加载成功
    finishLoad(e) { this.setData({ finishLoadFlag: true, errorFlag: false });},
    // 图片加载失败
    errorLoad() { this.setData({ finishLoadFlag: false, errorFlag: true });}
  }
})