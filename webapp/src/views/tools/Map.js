import Vue from 'vue'
import PageView from '@/components/page-view'
import Plus from '@/library/Plus'
import VueAMap from 'vue-amap';

// 初始化地图
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: Vue.prototype.$config.amapKey,
  // plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
  plugin: ['AMap.Geolocation'],
  v: '1.4.15',
});

export default {
  components: {PageView},
  data(){
    return {
      mapData:{
        center:[102.703883,25.048876],
        zoom: 14,
      },
    }
  },
  mounted(){
  },
  activated(){
    this.getMap();
  },
  methods:{

    /* 定位 */
    getMap(){
      Plus.geoLocation((res)=>{
        this.mapData.center = [res.longitude,res.latitude];
      });
    },

  }
}
