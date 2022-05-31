<template>
  <div class="wm-select" :style="{width: width}">
    <div class="wm-select_input" :style="{height: height, lineHeight: height}" @click="checked=!checked">
      <div class="wm-select_input_ico" :style="{transform: checked?'rotate(-180deg)':'rotate(0deg)'}">
        <i class="ui ui_arrow_down"></i>
      </div>
      <input type="text" readonly :placeholder="placeholder" :value="text" :style="{borderColor: checked?'#6FB737':'', boxShadow: checked?'0 0 4px rgba(0,0,0,.1)':''}">
    </div>
    <div class="wm-select_body" v-if="checked">
      <div class="wm-select_arrow"></div>
      <ul class="wm-select_list scrollbar" :style="{maxHeight: maxHeight}">
        <li v-for="(v,k) in dataList" :key="k" :class="v.value==value?'wm-select_active':''" @click="selectClick(v.value)">{{v.label}}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wm-select{position: relative; font-size: 14px;}
.wm-select_input{position: relative; width: 100%;}
.wm-select_input input{cursor: pointer; width: 100%; height: 100%; padding: 0 32px 0 16px; display: flex; box-sizing: border-box; border-radius: 4px; border: #DCDFE6 1px solid; background-color: #FFF;}
.wm-select_input input:focus{outline: none;}
.wm-select_input input:hover{border-color: #C2C4C6;}
.wm-select_input_ico{cursor: pointer; position: absolute; width: 32px; height: 100%; right: 0; text-align: center; transition-duration: .3s;}
.wm-select_input_ico i{font-size: 12px; color: #8294A8;}
.wm-select_body{position: absolute; z-index: 9999; width: 100%; margin-top: 10px; box-sizing: border-box; border: #E2E4E6 1px solid; border-radius: 4px; background-color: #FFF; box-shadow: 0 0 12px rgba(0,0,0,.12);}
.wm-select_arrow{position: absolute; top: -16px; left: 50%; transform: translate(-50%, 0); width: 0px; height: 0px; border: 8px solid; border-color: transparent; border-bottom-color: #E2E4E6;}
.wm-select_list{padding: 8px 0; overflow-y: auto;}
.wm-select_list li{cursor: pointer; line-height: 32px; padding: 0 16px;}
.wm-select_list li:hover{background-color: @Minor; color: @Primary;}
.wm-select_active{background-color: @Minor; color: @Primary; font-weight: bold;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'Select',
  props: {
    value: {type:String, default:''},               //默认选择
    data: {type:Array, default:[]},                 //数据: [{label:'Option1', value:'option1'},{label:'Option2', value:'option2'}]
    width: {type:String, default:'100%'},           //宽度
    height: {type:String, default:'40px'},          //高度
    placeholder: {type:String, default:'请选择'},   //提示信息
    maxHeight: {type:String, default:'160px'},      //最大高度
  },
  data(){
    const checked: boolean = false;
    const text: string = '';
    const dataList: any = null;
    return {checked, text, dataList}
  },
  watch:{
    value(val: any){
      this.selectDisplay(val);
    },
    data(val: any){
      this.dataList = val;
      this.selectDisplay(this.value);
    }
  },
  mounted(){
    // 默认值
    this.dataList = this.data;
    this.selectDisplay(this.value);
    // 阻止穿透
    const obj: any = document.getElementsByClassName('wm-select');
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
      this.selectDisplay(val);
      this.$emit('update:value', val);
    },

    /* 显示值 */
    selectDisplay(val: string){
      const data: any = this.data;
      if(val=='') return this.text='';
      for(let i in data){
        if(data[i]['value']==val) return this.text=data[i]['label'];
      }
    }

  },
});
</script>