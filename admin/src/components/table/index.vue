<template>
  <table class="wm-table">
    <slot :data="data"></slot>
  </table>
</template>

<style>
.wm-table{width: 100%; border-collapse:collapse; box-sizing: border-box; border-radius: 4px;}
.wm-table tr:nth-child(odd){background-color: #FAFAFA;}
.wm-table tr:nth-child(even){background-color: #FFF;}
.wm-table tr:hover{background-color: #F2F4F6;}
.wm-table td{padding: 4px 8px; line-height: 40px; border-top: #EBEEF5 1px solid; border-bottom: #EBEEF5 1px solid;}
</style>

<script>
export default {
  name:'Table',
  props: {
    data: {type:Array, default:[]}, //数据: [{id:val},{id:val}]
  },
  methods:{

    /* 获取选中值 */
    getVals(){
      let vals = [];
      const obj = document.querySelectorAll('.wm-table_checkbox div.active');
      for(let i=0; i<obj.length; i++){
        vals.push(obj[i].querySelector('input').value);
      }
      return vals;
    },

    /* 获取单条 */
    getRow(name){
      name = name || 'id';
      let row = {};
      // 是否选择
      const obj = document.querySelector('.wm-table_checkbox div.active');
      if(!obj) return row;
      // 获取数据
      const val = obj.querySelector('input').value;
      for(let i in this.data){
        if(this.data[i][name] && this.data[i][name]==val) row = this.data[i];
      }
      return row;
    },

    /* 获取多条 */
    getData(name){
      name = name || 'id';
      let row = [];
      // 是否选择
      const obj = document.querySelectorAll('.wm-table_checkbox div.active');
      if(!obj) return row;
      // 获取数据
      for(let x=0; x<obj.length; x++){
        let val = obj[x].querySelector('input').value;
        for(let y in this.data){
          if(this.data[y][name] && this.data[y][name]==val) row.push(this.data[y]);
        }
      }
      return row;
    },

  },
}
</script>