<template>
  <div class="wm-search" :style="{width: width}">
    <div class="wm-search_input" @click="checked=!checked">
      <div class="wm-search_input_ico">
        <i class="ui ui_search"></i>
      </div>
      <input type="text" :placeholder="placeholder" v-model="value" @input="seaChange()">
    </div>
    <div class="wm-search_body" v-if="checked">
      <div class="wm-search_arrow"></div>
      <ul class="wm-search_list scrollbar">
        <template v-if="dataList.length>0">
          <li
            v-for="(v,k) in dataList"
            :key="k"
            @click="selectClick(v.value)"
          >{{v.label}}</li>
        </template>
        <div class="wm-search_none" v-else>{{noneText}}</div>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wm-search{position: relative; font-size: 14px;}
.wm-search_input{position: relative; width: 100%; height: 34px; line-height: 34px;}
.wm-search_input input{width: 100%; height: 100%; padding: 0 16px 0 40px; display: flex; box-sizing: border-box; border-radius: 20px; border: #DCDFE6 1px solid; background-color: #F2F4F6;}
.wm-search_input input:hover{border-color: #C0C4CC;}
.wm-search_input input:focus{outline: none; border-color: @Primary;}
.wm-search_input_ico{cursor: pointer; position: absolute; width: 40px; height: 100%; text-align: center;}
.wm-search_input_ico i{font-size: 20px; color: #999;}
.wm-search_body{position: absolute; z-index: 9999; width: 100%; margin-top: 10px; box-sizing: border-box; border: #E2E4E6 1px solid; border-radius: 4px; background-color: #FFF; box-shadow: 0 0 12px rgba(0,0,0,.12);}
.wm-search_arrow{position: absolute; top: -16px; left: 50%; transform: translate(-50%, 0); width: 0px; height: 0px; border: 8px solid; border-color: transparent; border-bottom-color: #FFF;}
.wm-search_list{padding: 8px 0; overflow-y: auto; max-height: 240px;}
.wm-search_list li{cursor: pointer; line-height: 40px; padding: 0 16px;}
.wm-search_list li:hover{background-color: @Minor; color: @Primary;}
.wm-search_none{line-height: 160px; font-size: 12px; text-align: center; color: #999;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'Search',
  props: {
    data: {type:Array, default:[]},                 //数据: [{label:'Search1', value:'search1'},{label:'Search2', value:'search2'}]
    width: {type:String, default:'100%'},           //宽度: 100%
    placeholder: {type:String, default:'请输入'},   //提示信息
    noneText: {type:String, default:'暂无结果'},    //暂无提示
  },
  watch:{
    data(val: any){
      this.dataList = val;
    }
  },
  data(){
    const checked: boolean = false;
    const value: string = '';
    const dataList: any = null;
    return {checked, value, dataList}
  },
  mounted(){
    // 阻止穿透
    const obj: any = document.getElementsByClassName('wm-search');
    for(let i=0; i<obj.length; i++){
      obj[i].addEventListener('click',(event: any)=>{
        event.stopPropagation();
      });
    }
    // 监听外部
    document.addEventListener('click',()=>{ this.checked = false; });
  },
  methods:{

    /* 选择 */
    selectClick(val: string){
      this.checked = false;
      this.$emit('update:active', val);
    },

    /* 搜索 */
    seaChange(){
      if(this.value=='') return this.dataList=this.data;
      // 正则
      const reg =new RegExp(this.value);
      // 数据
      let data = [];
      for(let i in this.data){
        let arr: any = this.data[i];
        if(reg.test(arr.label)){
          data.push(arr)
        }
      }
      this.dataList=data;
    },

  },
});
</script>