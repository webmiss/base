<template>
  <div class="wm-select" :style="{width: width}">
    <div class="wm-select_input" :style="{height: height, lineHeight: height}" @click="checked=!checked;seaKey('')">
      <!-- Clear -->
      <div class="wm-select_clear_body" v-if="value&&clearable">
        <span class="wm-select_clear" @click.stop="$emit('update:value', '')"></span>
      </div>
      <!-- Arrow -->
      <div class="wm-select_input_ico" :style="{transform: checked?'rotate(-180deg)':'rotate(0deg)'}">
        <i class="ui ui_arrow_down"></i>
      </div>
      <!-- Value -->
      <input type="text" readonly :placeholder="placeholder" :value="text" :style="{borderColor: checked?'#6FB737':'', boxShadow: checked?'0 0 4px rgba(0,0,0,.1)':''}">
    </div>
    <div class="wm-select_body" v-if="checked">
      <span class="wm-select_arrow"></span>
      <!-- Search -->
      <div v-if="search" class="wm-select_sea">
        <wm-input :value="seaVal" @update:value="seaKey($event)" height="32px" />
      </div>
      <!-- List -->
      <ul v-if="dataList.length>0" class="wm-select_list scrollbar" :style="{maxHeight: maxHeight}">
        <template v-for="(v,k) in dataList" :key="k">
          <li v-if="v.disabled" class="nowrap wm-select_disabled" style="cursor: not-allowed;">{{v.label}}</li>
          <li v-else class="nowrap" :class="v.value==value?'wm-select_active':''" @click="selectClick(v.value)">{{v.label}}</li>
        </template>
      </ul>
      <div v-else class="null"></div>
      <!-- List End -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.wm-select{position: relative; font-size: 14px;}
.wm-select_input{position: relative; width: 100%;}
.wm-select_input input{cursor: pointer; width: 100%; height: 100%; padding: 0 30px 0 16px; display: flex; box-sizing: border-box; border-radius: 4px; border: @BorderColor 1px solid; background-color: #FFF;}
.wm-select_input input:focus{outline: none;}
.wm-select_input input:hover{border-color: @BorderHover;}
.wm-select_input_ico{cursor: pointer; position: absolute; width: 30px; height: 100%; right: 0; text-align: center; transition-duration: .3s;}
.wm-select_input_ico i{font-size: 12px; color: @IconColor;}

.wm-select_clear_body{display: none; position: absolute; z-index: 1; width: 30px; height: 80%; top: 10%; right: 1px; text-align: center; background-color: #FFF;}
.wm-select_clear{position: absolute; cursor: pointer; top: 50%; right: 6px; transform: translateY(-50%); width: 16px; height: 16px; background-color: @Danger; border-radius: 50%; opacity: .5;}
.wm-select_clear:hover{opacity: 1;}
.wm-select_clear::after,.wm-select_clear::before{content: ''; position: absolute; width: 50%; height: 0.1rem; background-color: #FFF; left: 50%; top: 50%; transform-origin: center;}
.wm-select_clear::after{transform: translate(-50%, -50%) rotate(45deg);}
.wm-select_clear::before{transform: translate(-50%, -50%) rotate(-45deg);}
.wm-select_input:hover .wm-select_clear_body{display: block;}

.wm-select_body{position: absolute; z-index: 9999; width: 100%; margin-top: 10px; padding: 8px 0; box-sizing: border-box; border: @BorderColor 1px solid; border-radius: 4px; background-color: #FFF; box-shadow: 0 0 10px rgba(0,0,0,.16);}
.wm-select_arrow{position: absolute; width: 10px; height: 10px; top: -5px; left: 50%; transform: translateX(-50%);}
.wm-select_arrow::before{content: ''; position: absolute; width: 10px; height: 10px; border: @BorderColor 1px solid; border-right-color: transparent; border-bottom-color: transparent; background-color: #FFF; transform: rotate(45deg); box-sizing: border-box;}
.wm-select_sea{padding: 4px 8px;}
.wm-select_list{overflow-y: auto;}
.wm-select_list li{cursor: pointer; line-height: 32px; padding: 0 16px;}
.wm-select_list li:hover{background-color: @Minor;}
.wm-select_active{color: @Primary; font-weight: bold;}
.wm-select_disabled{color: @Disabled;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import wmInput from '../input/index.vue'
export default defineComponent({
  name:'Select',
  components: {wmInput},
  props: {
    value: {default:''},                            //默认选择
    data: {type:Array, default:[]},                 //数据: [{label:'Option1', value:'option1', disabled: true},{label:'Option2', value:'option2'}]
    width: {type:String, default:'100%'},           //宽度
    height: {type:String, default:'40px'},          //高度
    placeholder: {type:String, default:'请选择'},   //提示信息
    maxHeight: {type:String, default:'160px'},      //最大高度
    clearable: {type: Boolean, default: false},     //一键清空
    search: {type: Boolean, default: false},        //搜索
  },
  data(){
    const checked: boolean = false;
    const text: string = '';
    const dataList: any = null;
    const seaVal: any = '';
    return {checked, text, dataList, seaVal}
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
    },

    /* 搜索 */
    seaKey(v: any){
      if(!v) return this.dataList=this.data;
      const reg =new RegExp(v.toLowerCase());
      const data: any = this.data;
      const list: any = [];
      let label: string;
      for(let i in data){
        label = data[i].label.toLowerCase();
        if(reg.test(label)) list.push(data[i]);
      }
      this.dataList = list;
    },

  },
});
</script>