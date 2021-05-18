<template>
<wm-popup ref="Popup" position="bottom" :show="show" @update:show="_updateShow" :bgClose="false">
  <div class="wm-picker" @touchmove.prevent>
    <div class="wm-picker_title">
      <div class="wm-picker_cancel" @click="_cancel">{{cancelText}}</div>
      <div class="wm-picker_confirm" @click="_confirm" :style="{color: primary}">{{confirmText}}</div>
      <h2>{{title}}</h2>
    </div>
    <div class="wm-picker_content">
      <div class="mask-top"></div>
      <div class="mask-bottom"></div>
      <div class="wm-picker_wrapper" ref="wheelWrapper">
        <div class="wheel" v-for="(data,key) in pickerData" :key="key">
          <ul class="wheel-scroll">
            <li v-for="(v,k) in data" :key="k" class="wheel-item" :class="{'wheel-item-disabled':v.disabled}">{{v.label}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</wm-popup>
</template>

<style scoped>
.wm-picker{height: 260px; background-color: #FFF; border-radius: 16px 16px 0 0;}
.wm-picker_title{position: relative; overflow: hidden; height: 48px; line-height: 48px; text-align: center; border-bottom: #F2F2F2 1px solid;}
.wm-picker_title h2{font-size: 16px; font-weight: 500;}
.wm-picker_cancel,.wm-picker_confirm{position: absolute; display: inline-block; padding: 0 16px;}
.wm-picker_cancel{left: 0; color: #999;}
.wm-picker_confirm{right: 0;}
.wm-picker_content{position: relative; top: 20px;}
.wm-picker .mask-top, .wm-picker .mask-bottom{position: absolute; z-index: 10; width: 100%; height: 68px; pointer-events: none;}
.wm-picker .mask-top{top: 0; border-bottom: rgba(0, 0, 0, 0.06) 1px solid; background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));}
.wm-picker .mask-bottom{bottom: 0; border-top: rgba(0, 0, 0, 0.06) 1px solid; background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));}
.wm-picker_wrapper{display: flex; padding: 0 20px;}
.wm-picker_wrapper .wheel{overflow: hidden; flex: 1; width: 1%; height: 173px; font-size: 18px;}
.wm-picker_wrapper .wheel-scroll{margin-top: 68px; line-height: 36px; list-style: none;}
.wm-picker_wrapper .wheel-item{list-style: none; overflow: hidden; height: 36px; color: #333; text-align: center; white-space: nowrap;}
.wm-picker_wrapper .wheel-item-disabled{opacity: .2;}
.wm-picker_footer{height: 20px;}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import Env from '../../env'
import wmPopup from '../popup/index.vue'
import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'
BScroll.use(Wheel);

export default defineComponent({
  name: 'Picker',
  components: {wmPopup},
  props: {
    show: {type: Boolean, default: false},          //是否显示
    data: {type: Array, default: []},               //数据
    defaultIndex: {type: Array, default: [0,0,0]},  //是否显示
    title: {type: String, default: ''},             //标题
    cancelText: {type: String, default: '取消'},    //取消文本
    confirmText: {type: String, default: '确定'},   //确定文本
  },
  data(){
    const wheel: any = [];
    const primary: string = Env.themes.primary;
    const pickerData: any = [];
    const oldIndex: number[] = [];
    const setTimeout: number = 0;
    return {wheel,primary,pickerData,oldIndex,setTimeout}
  },
  watch:{
    show(val){
      if(val) this.init();
    }
  },
  mounted(){
  },
  beforeUnmount(){
    for(let i in this.wheel) this.wheel[i].destroy();
    this.wheel = [];
  },
  methods:{

    /* 更新状态 */
    _updateShow(val: boolean){
      this.$emit('update:show',val);
    },

    /* 初始化 */
    init(){
      if(this.wheel.length==0){
        // 菜单
        this._loadPickerData(this.defaultIndex);
        setTimeout(()=>{
          // 创建对象
          for(let i=0; i<this.pickerData.length; i++){
            const config: any = {
              probeType: 3,
              wheel: {
                selectedIndex: this.defaultIndex[i] || 0,
                wheelWrapperClass: 'wheel-scroll',
                wheelItemClass: 'wheel-item',
                wheelDisabledItemClass: 'wheel-item-disabled'
              },
            };
            const obj: any = this.$refs.wheelWrapper;
            this.wheel.push(new BScroll(obj.children[i], config));
            // 监听滑动结束
            this.wheel[i].on('scrollEnd', ()=>{
              const newIndex = this.wheel.map((wheel: any)=>wheel.getSelectedIndex());
              this._loadPickerData(newIndex,this.oldIndex);
            });
          }
        },400);
      }else{
        this.refresh();
      }
    },
    // 菜单数据
    _loadPickerData(newIndex: any, oldIndex?: any){
      let data: any = [];
      let menu: any = [];
      if(!oldIndex){
        // 重置
        this.pickerData = [];
        // 一级菜单
        data = this.data;
        // @ts-ignore
        menu = data.map(({label,value}) => ({label,value}));
        this.pickerData.push(menu);
        // 二级菜单
        data = data[newIndex[0]].children;
        if(data){
          // @ts-ignore
          menu = data.map(({label,value}) => ({label,value}));
          this.pickerData.push(menu);
          // 三级菜单
          data = data[newIndex[1]].children;
          if(data){
            // @ts-ignore
            menu = data.map(({label,value}) => ({label,value}));
            this.pickerData.push(menu);
          }
        }
      }else{
        // 一级菜单
        if(this.pickerData.length>1 && newIndex[0]!==oldIndex[0]){
          data = (this.data[newIndex[0]] as any).children;
          if(data){
            // @ts-ignore
            menu = data.map(({label,value}) => ({label,value}));
            this.pickerData.splice(1,1,menu);
            this.wheel[1].wheelTo(0);
            // 下级
            data = data[0].children;
            if(data){
              // @ts-ignore
              menu = data.map(({label,value}) => ({label,value}));
              this.pickerData.splice(2,1,menu);
              this.wheel[2].wheelTo(0);
            }
          }
        }else if(this.pickerData.length>2 && newIndex[0]===oldIndex[0] && newIndex[1]!==oldIndex[1]){
          // @ts-ignore 二级菜单
          data = this.data[newIndex[0]].children[newIndex[1]].children;
          if(data){
            // @ts-ignore
            menu = data.map(({label,value}) => ({label,value}));
            this.pickerData.splice(2,1,menu);
            this.wheel[2].wheelTo(0);
          }
        }
      }
      // 刷新
      this.refresh();
      // 记录位置
      clearTimeout(this.setTimeout);
      this.setTimeout = setTimeout(()=>{
        this.oldIndex = this.wheel.map((wheel: any)=>wheel.getSelectedIndex());
        this.$emit('change',this._result());
      },300);
    },

    /* 结果 */
    _result(){
      const res = {index:[],data:[]};
      res.index = this.wheel.map((wheel: any)=>wheel.getSelectedIndex());
      // @ts-ignore
      for(let i in res.index) res.data.push(this.pickerData[i][res.index[i]]);
      return res;
    },

    /* 确定 */
    _confirm(){
      (this.$refs.Popup as any).close();
      this.$emit('confirm',this._result());
    },

    /* 取消 */
    _cancel(){
      (this.$refs.Popup as any).close();
      this.$emit('cancel',this._result());
    },

    /* 刷新 */
    refresh(){
      this.$nextTick(() => {
        for(let i in this.wheel) this.wheel[i].refresh();
      })
    },

  }
});
</script>
