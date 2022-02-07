<template>
  <table class="wm-table">
    <slot :data="data"></slot>
  </table>
</template>

<style>
.wm-table{width: 100%; border-collapse:collapse; box-sizing: border-box; border-radius: 4px; margin: 8px 0;}
.wm-table tr:nth-child(odd){background-color: #F8F8F8;}
.wm-table tr:nth-child(even){background-color: #FFF;}
.wm-table tr:hover{background-color: #F2F4F6;}
.wm-table td{position: relative; padding: 4px 8px; line-height: 40px;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'Table',
  props: {
    data: {type:Array, default:[]}, //数据: [{id:val},{id:val}]
  },
  methods:{

    /* 获取选中值 */
    getVals(){
      let vals: any = [];
      const obj: any = document.querySelectorAll('.wm-table_checkbox div.active');
      if(obj.length==0) return '';
      for(let i=0; i<obj.length; i++){
        vals.push(obj[i].querySelector('input').value);
      }
      return vals;
    },

    /* 获取单条 */
    getRow(name: string){
      name = name || 'id';
      let row = {};
      // 是否选择
      const obj: any = document.querySelector('.wm-table_checkbox div.active');
      if(!obj) return '';
      // 获取数据
      const val: any = obj.querySelector('input').value;
      const data: any = this.data;
      for(let v of data){
        if(v[name] && v[name]==val){
          row = v;
          break;
        }
      }
      return row;
    },

    /* 获取多条 */
    getData(name: string){
      name = name || 'id';
      let row = [];
      // 是否选择
      const obj: any = document.querySelectorAll('.wm-table_checkbox div.active');
      if(!obj) return '';
      // 获取数据
      for(let x=0; x<obj.length; x++){
        let val: any = obj[x].querySelector('input').value;
        let data: any = this.data;
        for(let v of data){
          if(v[name] && v[name]==val) row.push(v);
        }
      }
      return row;
    },

  },
});
</script>