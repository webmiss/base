// import * as echarts from 'echarts';
export default {
  data(){
    return {
      menus: {},  // 快捷方式
      msg:[],     // 我的消息
      system: {}, // 系统信息
    }
  },
  mounted(){
    this.getMenus();  // 快捷方式
    this.getConfig(); // 系统信息
    this.getChart(); // 图表统计
  },
  methods:{

    /* 快捷方式 */
    getMenus(){
      let menus = JSON.parse(this.$storage.getItem('Menus') || '[]');
      this.menus = menus.reverse();
    },
    /* 跳转地址 */
    openUrl(ico,url,index,name,reload){
      // 保存-当前位置
      this.$storage.setItem('MenuName',name);
      this.$storage.setItem('defaultMenu',index);
      // 保存-快捷方式
      if(index!='3'){
        let menus = JSON.parse(this.$storage.getItem('Menus') || '[]');
        let data = {ico:ico,url:url,index:index,name:name};
        const n = menus.findIndex((item)=>JSON.stringify(item)==JSON.stringify(data));
        if(n>=0) menus.splice(n,1);
        menus.push({ico:ico,url:url,index:index,name:name});
        // 保存
        this.$storage.setItem('Menus',JSON.stringify(menus));
      }
      // 跳转
      this.$router.push(url);
      // 刷新
      if(reload) setTimeout(()=>{window.location.reload();},300);
    },

    /* 图表统计 */
    getChart(){
      let data=[],chart=null;
      // 柱状图
      data = [
        { genre: '1月', sold: 275 },
        { genre: '2月', sold: 115 },
        { genre: '3月', sold: 120 },
        { genre: '4月', sold: 208 },
        { genre: '5月', sold: 150 },
        { genre: '6月', sold: 78 },
        { genre: '7月', sold: 121 },
        { genre: '8月', sold: 92 },
        { genre: '9月', sold: 145 },
        { genre: '10月', sold: 196 },
        { genre: '11月', sold: 72 },
        { genre: '12月', sold: 94 },
      ];
      chart = new this.$G2.Chart({container: 'chart',forceFit: true,height: 320,padding: [30,50,80,50]});
      chart.source(data).tooltip({showTitle: false});
      chart.interval().position('genre*sold').color('genre');
      chart.render();
      // 饼图
      data = [
        {item: '男',count: 55,percent: 0.55},
        {item: '女',count: 40,percent: 0.40},
        {item: '其他',count: 5,percent: 0.05}
      ];
      chart = new G2.Chart({container: 'chart1',forceFit: true,height: 240,padding: [50,20,50,20]});
      chart.source(data, {
        percent: {
          formatter: (val)=>{
            return parseInt(val*100)+'%';
          }
        }
      });
      chart.coord('theta');
      chart.tooltip({showTitle: false});
      chart.intervalStack().position('percent').color('item').label('percent').tooltip('item*percent', function(item, percent) {
        percent = parseInt(percent*100)+'%';
        return {name: item,value: percent};
      }).style({
        lineWidth: 1,
        stroke: '#FFF'
      });
      chart.render();
      // 产品统计
      data = [
        {country:'数码',cost:96},
        {country:'服装',cost:121},
        {country:'家电',cost:100},
        {country:'美食',cost:111},
        {country:'汽车',cost:102},
      ];
      chart = new G2.Chart({container: 'chart2',forceFit: true,height: 240,padding: [-20,-20,-40,-20]});
      chart.source(data).tooltip({showTitle: false});
      chart.coord('polar',{radius: 0.6});
      chart.axis('cost', {label: null,tickLine: null,line: {stroke: '#E9E9E9',lineDash: [3,3]}});
      chart.interval().position('country*cost').color('country').label('cost', {
          offset: -15,
          textStyle: {
            textAlign: 'center',
            fontSize: 11,
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)'
          }
        }).style({
          lineWidth: 1,
          stroke: '#fff'
        });
      chart.render();
    },

    /* 系统信息 */
    getConfig(){
      this.$ajax.post(
        this.$config.apiUrl+'index/getConfig'
      ).then((res)=>{
        const d = res.data;
        if(d.code==0) this.system = d.list;
      });
    },

  }
}