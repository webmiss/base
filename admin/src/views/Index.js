import G2 from '@antv/g2'

export default {
  data(){
    return {
      menus: {},  // 快捷方式
      system: {}, // 系统信息
      msg:[],     // 我的消息
      total: {},  // 数据统计
      ratio: {s1:{},s2:{},s3:{}},  // 效益报告
      // 统计图
      BarChart: null,
      GenderChart: null,
      RoomChart: null,
    }
  },
  mounted(){
    this.getMenus();  // 快捷方式
    this.getConfig(); // 系统信息
    this.loadData();  // 加载数据
    this.getChart();  // 图表统计
  },
  methods:{

    /* 加载数据 */
    loadData(){
      this.$ajax.post(this.$config.apiUrl+'Desktop/index','token='+this.$storage.getItem('token')).then((res)=>{
        let d = res.data;
        if(d.code==0){
          // 消息
          this.msg = d.msg;
          // 统计
          this.total = d.total;
          // 图表统计
          this.getBar(d.day);
          this.getGenderChart(d.gender);
          this.getRoomChart(d.room);
          // 比例
          this.ratio = d.ratio;
        }
      });
    },

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
      this.getBar([]);
      this.getGenderChart([]);
      this.getRoomChart([]);
    },
    // 新入患者统计
    getBar(data){
      if(!this.BarChart){
        this.BarChart = new G2.Chart({container: 'chart',forceFit: true,height: 320,padding: [30,50,80,50]});
        this.BarChart.interval().position('x*y').color('x');
      }
      this.BarChart.source(data).tooltip({showTitle: false});
      this.BarChart.render();
    },
    // 性别
    getGenderChart(data){
      if(!this.GenderChart){
        this.GenderChart = new G2.Chart({container: 'chart1',forceFit: true,height: 240,padding: [50,20,50,20]});
        this.GenderChart.coord('theta');
        this.GenderChart.tooltip({showTitle: false});
        this.GenderChart.intervalStack().position('y').color('x').label('y').tooltip('x*num', function(name,num) {
          return {name: name,value: num+'人'};
        }).style({lineWidth: 1,stroke: '#FFF'});
      }
      this.GenderChart.source(data);
      this.GenderChart.render();
    },
    // 治疗室
    getRoomChart(data){
      if(!this.RoomChart){
        this.RoomChart = new G2.Chart({container: 'chart2',forceFit: true,height: 240,padding: [-20,-20,-40,-20]});
        this.RoomChart.coord('polar',{radius: 0.6});
        this.RoomChart.axis('num', {label: null,tickLine: null,line: {stroke: '#E9E9E9',lineDash: [3,3]}});
        this.RoomChart.interval().position('name*num').color('name').label('num', {
          offset: -15,
          textStyle: {textAlign: 'center',fontSize: 11,shadowBlur: 2,shadowColor: 'rgba(0, 0, 0, .45)'}
        }).style({lineWidth: 1,stroke: '#fff'});
      }
      this.RoomChart.source(data).tooltip({showTitle: false});
      this.RoomChart.render();
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