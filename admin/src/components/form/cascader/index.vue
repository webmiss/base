<template>
  <div class="wm-cascader" :style="{width: width}">
    <div class="wm-cascader_input" :style="{height: height, lineHeight: height}" @click="checked=!checked">
      <!-- Clear -->
      <div class="wm-cascader_clear_body" v-if="value&&clearable">
        <span class="wm-cascader_clear" @click.stop="$emit('update:value', '')"></span>
      </div>
      <!-- Arrow -->
      <div class="wm-cascader_input_ico" :style="{transform: checked?'rotate(-180deg)':'rotate(0deg)'}">
        <i class="ui ui_arrow_down"></i>
      </div>
      <!-- Value -->
      <input type="text" readonly :placeholder="placeholder" :value="text" :style="{borderColor: checked?'#6FB737':'', boxShadow: checked?'0 0 4px rgba(0,0,0,.1)':''}">
    </div>
    <div class="wm-cascader_body flex" v-if="checked">
      <!-- Arrow -->
      <span class="wm-cascader_arrow"></span>
      <!-- 一级菜单 -->
      <ul class="wm-cascader_list scrollbar" :style="{width: maxWidth, maxHeight: maxHeight}">
        <template v-for="(v,k) in dataList" :key="k">
          <li v-if="v.disabled" class="wm-cascader_disabled" style="cursor: not-allowed;">
            <span>{{v.label}}</span>
            <i class="ui ui_arrow_right" v-if="v.children"></i>
          </li>
          <li v-else :class="v.value==value?'wm-cascader_active':''" @click.stop="selectClick(k, -1, -1)">
            <span>{{v.label}}</span>
            <i class="ui ui_arrow_right" v-if="v.children"></i>
          </li>
        </template>
      </ul>
      <!-- 二级菜单 -->
      <ul v-if="k1>=0 && dataList[k1].children" class="wm-cascader_list scrollbar" :style="{width: maxWidth, maxHeight: maxHeight}">
        <template v-for="(v,k) in dataList[k1].children" :key="k">
          <li v-if="v.disabled" class="wm-cascader_disabled" style="cursor: not-allowed;">
            <span>{{v.label}}</span>
            <i class="ui ui_arrow_right" v-if="v.children"></i>
          </li>
          <li v-else :class="v.value==value?'wm-cascader_active':''" @click="selectClick(k1, k, -1)">
            <span>{{v.label}}</span>
            <i class="ui ui_arrow_right" v-if="v.children"></i>
          </li>
        </template>
      </ul>
      <!-- 三级菜单 -->
      <ul v-if="k2>=0 && dataList[k1].children[k2].children" class="wm-cascader_list scrollbar" :style="{width: maxWidth, maxHeight: maxHeight}">
        <template v-for="(v,k) in dataList[k1].children[k2].children" :key="k">
          <li v-if="v.disabled" class="wm-cascader_disabled" style="cursor: not-allowed;">
            <span>{{v.label}}</span>
            <i class="ui ui_arrow_right" v-if="v.children"></i>
          </li>
          <li v-else :class="v.value==value?'wm-cascader_active':''" @click="selectClick(k1, k2, k)">
            <span>{{v.label}}</span>
            <i class="ui ui_arrow_right" v-if="v.children"></i>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wm-cascader{font-size: 14px;}
.wm-cascader_input{position: relative; width: 100%;}
.wm-cascader_input input{cursor: pointer; width: 100%; height: 100%; padding: 0 30px 0 16px; display: flex; box-sizing: border-box; border-radius: 4px; border: @BorderColor 1px solid; background-color: #FFF;}
.wm-cascader_input input:focus{outline: none;}
.wm-cascader_input input:hover{border-color: @BorderHover;}
.wm-cascader_input_ico{cursor: pointer; position: absolute; width: 30px; height: 100%; right: 0; text-align: center; transition-duration: .3s;}
.wm-cascader_input_ico i{font-size: 12px; color: @IconColor;}

.wm-cascader_clear_body{display: none; position: absolute; z-index: 1; width: 30px; height: 80%; top: 10%; right: 1px; text-align: center; background-color: #FFF;}
.wm-cascader_clear{position: absolute; cursor: pointer; top: 50%; right: 6px; transform: translateY(-50%); width: 16px; height: 16px; background-color: @Danger; border-radius: 50%; opacity: .5;}
.wm-cascader_clear:hover{opacity: 1;}
.wm-cascader_clear::after,.wm-cascader_clear::before{content: ''; position: absolute; width: 50%; height: 0.1rem; background-color: #FFF; left: 50%; top: 50%; transform-origin: center;}
.wm-cascader_clear::after{transform: translate(-50%, -50%) rotate(45deg);}
.wm-cascader_clear::before{transform: translate(-50%, -50%) rotate(-45deg);}
.wm-cascader_input:hover .wm-cascader_clear_body{display: block;}

.wm-cascader_body{position: absolute; z-index: 9999; margin-top: 10px; box-sizing: border-box; border: @BorderColor 1px solid; border-radius: 4px; background-color: #FFF; box-shadow: 0 0 10px rgba(0,0,0,.16);}
.wm-cascader_body ul:nth-last-child(1){border-right: none;}

.wm-cascader_arrow{position: absolute; width: 10px; height: 10px; top: -5px; left: 40px;}
.wm-cascader_arrow::before{content: ''; position: absolute; width: 10px; height: 10px; border: @BorderColor 1px solid; border-right-color: transparent; border-bottom-color: transparent; background-color: #FFF; transform: rotate(45deg); box-sizing: border-box;}

.wm-cascader_list{padding: 8px 0; overflow-y: auto; border-right: @BorderColor 1px solid; box-sizing: border-box;}
.wm-cascader_list li{position: relative; cursor: pointer; line-height: 32px; padding: 0 16px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.wm-cascader_list li:hover{background-color: @Minor;}
.wm-cascader_list li i{position: absolute; right: 8px; font-size: 12px;}
.wm-cascader_active{color: @Primary; font-weight: bold;}
.wm-cascader_disabled{color: @Disabled;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'Cascader',
  props: {
    value: {type:String, default:''},               //默认选择
    data: {type:Array, default:[]},                 //数据: [{label:'Option1', value:'option1', disabled: true},{label:'Option2', value:'option2'}]
    width: {type:String, default:'100%'},           //宽度
    height: {type:String, default:'40px'},          //高度
    placeholder: {type:String, default:'请选择'},   //提示信息
    maxWidth: {type:String, default:'180px'},      //最大宽度
    maxHeight: {type:String, default:'160px'},      //最大高度
    clearable: {type: Boolean, default: false},     //一键清空
  },
  data(){
    const checked: boolean = false;
    const text: string = '';
    const dataList: any = null;
    let k1: number=-1, k2: number=-1, k3: number=-1;
    return {checked, text, dataList, k1, k2, k3}
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
    const obj: any = document.getElementsByClassName('wm-cascader');
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
    selectClick(k1: number, k2: number, k3: number){
      this.k1= k1;
      this.k2= k2;
      this.k3= k3;
      console.log(k1, k2, k3);
      console.log(this.dataList[this.k1].children);
      // this.selectDisplay(val);
      // this.$emit('update:value', val);
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