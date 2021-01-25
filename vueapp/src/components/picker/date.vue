<template>
  <wm-picker
    :show="show"
    @update:show="_updateShow"
    :data="pickerData"
    :defaultIndex="defaultIndex"
    @confirm="_confirm"
    @cancel="_cancel"
    :title="title"
    :cancelText="cancelText"
    :confirmText="confirmText"
  ></wm-picker>
</template>

<style scoped>
</style>

<script>
import wmPicker from './index'

export default {
  name: 'PickerDate',
  components: {wmPicker},
  props: {
    show: {type: Boolean, default: false},  //是否显示
    title: {type: String, default: '选择年月日'},  //标题
    maxDate: {type: Object, default: null},  //最大时间, 例如: new Date(2021,10,1)
    minDate: {type: Object, default: null},  //最小时间, 例如: new Date(1970,1,1)
    default: {type: Array, default: []},  //默认值
    cancelText: {type: String, default: '取消'},  //取消文本
    confirmText: {type: String, default: '确定'},  //确定文本
  },
  data(){
    return {
      pickerData: [],
      defaultIndex: [0,0,0],
    }
  },
  watch:{
    show(val){
      if(val) this.init();
    }
  },
  methods:{

    /* 更新状态 */
    _updateShow(val){
      this.$emit('update:show',val);
    },

    /* 初始化 */
    init(){
      // 默认值
      const now = new Date();
      const t1 = this.maxDate?this.maxDate:new Date(now.getFullYear(),now.getMonth()+1,now.getDate());
      const t2 = this.minDate?this.minDate:new Date(now.getFullYear()-3,now.getMonth()+1,now.getDate());
      // 获取年份
      const year1 = t1.getFullYear()
      const year2 = t2.getFullYear()
      // 组合
      let day,m,d;
      let data = [];
      let i1,i2
      i1 = 0;
      for(let n=year1; n>=year2; n--){
        data.push({label: n+'年',value: n});
        data[i1].children = [];
        if(n==year1){
          // 月，日
          m = t1.getMonth();
          d = t1.getDate();
          i2 = 0;
          for(let x1=1; x1<=m; x1++){
            data[i1].children.push({label: x1+'月',value: this._fmtNum(x1)});
            data[i1].children[i2].children = [];
            // 天数
            day = this._getDay(n,x1);
            let t = m==x1?d:day;
            for(let y1=1; y1<=t; y1++){
              data[i1].children[i2].children.push({label: y1+'日',value: this._fmtNum(y1)});
            }
            i2++;
          }
        // 最小
        }else if(n==year2){
          // 月，日
          m = t2.getMonth();
          d = t2.getDate();
          i2 = 0;
          for(let x1=1; x1<=m; x1++){
            data[i1].children.push({label: x1+'月',value: this._fmtNum(x1)});
            data[i1].children[i2].children = [];
            // 天数
            day = this._getDay(n,x1);
            let t = m==x1?d:day;
            for(let y1=1; y1<=t; y1++){
              data[i1].children[i2].children.push({label: y1+'日',value: this._fmtNum(y1)});
            }
            i2++;
          }
        // 中间
        }else{
          i2 = 0;
          for(let x1=1; x1<=12; x1++){
            data[i1].children.push({label: x1+'月',value: this._fmtNum(x1)});
            data[i1].children[i2].children = [];
            // 天数
            day = this._getDay(n,x1);
            for(let y1=1; y1<=day; y1++){
              data[i1].children[i2].children.push({label: y1+'日',value: this._fmtNum(y1)});
            }
            i2++;
          }
        }
        i1++;
      }
      this.pickerData = data;
      // 默认值
      if(this.default.length>0){
        for(let x in data){
          if(data[x].value==this.default[0]){
            this.defaultIndex[0] = x;
            for(let y in data[x].children){
              if(data[x].children[y].value==this.default[1]){
                this.defaultIndex[1] = y;
                for(let z in data[x].children[y].children){
                  if(data[x].children[y].children[z].value==this.default[2]){
                    this.defaultIndex[2] = z;
                  }
                }
              }
            }
          }
        }
      }
    },

    /* 获取天数 */
    _getDay(y,m){
      const d = new Date(y,m,0);
      return d.getDate();
    },

    /* 补零 */
    _fmtNum(n){
      return n<10?'0'+n:n;
    },

    /* 确定 */
    _confirm(res){
      this.$emit('confirm',res);
    },

    /* 取消 */
    _cancel(res){
      this.$emit('cancel',res);
    },

  }
}
</script>