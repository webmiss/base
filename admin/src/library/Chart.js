import G2 from '@antv/g2'
import {DataView} from '@antv/data-set'

export default {

  /* 柱状图 */
  DodgeChart(id,data){
    // 创建
    if(!this.DodgeObj) this.DodgeObj = new G2.Chart({container: id, forceFit: true, height: 420, padding: [10,50,60,50]});
    this.DodgeObj.interval().position('type*num').color('name').adjust([{type: 'dodge',marginRatio: 1/32}]);
    // 数据
    this.DodgeObj.source(data);
    // 显示
    this.DodgeObj.render();
  },

  /* 雷达图 */
  RadarChart(id,data,max,fields){
    fields = fields || ['初期','中期','末期'];
    max = max || 100;
    // 创建
    if(!this.RadarObj) this.RadarObj = new G2.Chart({container: id, forceFit: true, height: 420, padding: [30,50,40,50]});
    this.RadarObj.coord('polar', {radius: 0.8});
    this.RadarObj.axis('item', {line: null,tickLine: null,grid: {lineStyle: {lineDash: null},hideFirstLine: false}});
    this.RadarObj.axis('score', {line: null,tickLine: null,grid: {type: 'polygon',lineStyle: {lineDash: null},alternateColor: 'rgba(0, 0, 0, 0.04)'}});
    this.RadarObj.legend('user', {marker: 'circle',offset: 30});
    this.RadarObj.line().position('item*score').color('user').size(2);
    this.RadarObj.point().position('item*score').color('user').shape('circle').size(4).style({stroke: '#fff',lineWidth: 1,fillOpacity: 1});
    // this.RadarObj.area().position('item*score').color('user');
    // 数据
    const dv = new DataView().source(data);
    dv.transform({type: 'fold', fields: fields, key: 'user', value: 'score'});
    this.RadarObj.source(dv, {score: {min: 0,max: max}});
    // 显示
    this.RadarObj.render();
  }

}