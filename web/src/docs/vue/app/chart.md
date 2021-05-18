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
- data: {type: Array, default: []},  //数据: [{type: '收入', label:'1月', value:50}]
- unit: {type: String, default: ''},  //单位
- isDot: {type: Boolean, default: true},  //是否显示点
- isSmooth: {type: Boolean, default: true},  //是否曲线

## 柱状图
```html
<wm-chart-interval></wm-chart-interval>
```
- type: {type: String, default: 'dodge'},  //类型: dodge、stack
- data: {type: Array, default: []},  //数据: [{type: '收入', label:'1月', value:50}]
- unit: {type: String, default: ''},  //单位

## 饼图
```html
<wm-chart-pie></wm-chart-pie>
```
- type: {type: String, default: 'stack'},  //类型: dodge、stack
- data: {type: Array, default: []},  //数据: [{type: '1', label:'手机', value:0.60}]
- size: {type: Number, default: 100},  //大小
- position: {type: String, default: 'right'},  //位置: top、bootom、left、right
- html: {type: String, default: ''},  //中部内容
- htmlPosition: {type: Array, default: ['50%', '50%']},  //数据

