## 引入
```javascript
import wmChartLine from '@/components/chart/line.vue'
import wmChartInterval from '@/components/chart/interval.vue'
import wmChartPie from '@/components/chart/pie.vue'
```

## 折线图
```html
<wm-chart-line></wm-chart-line>
```
- data: {type: Array, default: []},         //数据: [{type:'t1',label:'1月',value:1},{type:'t2',label:'1月',value:2}]
- height: {type: Number, default: 240},     //高
- unit: {type: String, default: ''},        //单位
- lunit: {type: String, default: ''},       //单位(左)
- isDot: {type: Boolean, default: true},    //是否显示点
- isSmooth: {type: Boolean, default: true}, //是否曲线

## 柱状图
```html
<wm-chart-interval></wm-chart-interval>
```
- type: {type: String, default: 'dodge'}, //类型: dodge、stack
- data: {type: Array, default: []},       //数据
- width: {type: Number, default: 600},    //宽
- height: {type: Number, default: 240},   //高
- unit: {type: String, default: ''},      //单位

## 饼图
```html
<wm-chart-pie></wm-chart-pie>
```
- type: {type: String, default: 'stack'},       //类型: dodge、stack
- data: {type: Array, default: []},             //数据
- width: {type: Number, default: 600},          //宽
- height: {type: Number, default: 240},         //高
- position: {type: String, default: 'bottom'},  //位置: top、bootom、left、right
- html: {type: String, default: ''},            //中部内容
