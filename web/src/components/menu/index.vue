<template>
  <div class="wm-menu">
    <!-- 一级菜单 -->
    <div v-for="(v1,k1) in menuData" :key="k1">
      <!-- 标题 -->
      <div @click="_titleClick([k1])" class="wm-menu_title" :class="!v1.children&&active==k1?'active':''" :style="{height: height+'px', lineHeight: height+'px'}">
        <i v-if="v1.icon" :class="v1.icon" :style="{color: v1.children?textColor:''}"></i>
        <h2 :style="{color: v1.children?textColor:''}">{{v1.label}}</h2>
        <span v-if="v1.children">
          <div :id="'arrow_'+k1" class="arrow" :style="{borderColor: textColor}"></div>
        </span>
      </div>
      <!-- 二级菜单 -->
      <template v-if="v1.children">
        <div :id="'list_'+k1" class="wm-menu_list">
          <div v-for="(v2,k2) in v1.children" :key="k2">
            <!-- 标题 -->
            <div @click="_titleClick([k1,k2])" class="wm-menu_title left24" :class="!v2.children&&active==k1+'_'+k2?'active':''" :style="{height: height+'px', lineHeight: height+'px'}">
              <i v-if="v2.icon" :class="v2.icon" :style="{color: v2.children?textColor:''}"></i>
              <h2 :style="{color: v2.children?textColor:''}">{{v2.label}}</h2>
              <span v-if="v2.children">
                <div :id="'arrow_'+k1+'_'+k2" class="arrow" :style="{borderColor: textColor}"></div>
              </span>
            </div>
            <!-- 三级菜单 -->
            <template v-if="v2.children">
              <div :id="'list_'+k1+'_'+k2" class="wm-menu_list">
                <div v-for="(v3,k3) in v2.children" :key="k3">
                  <!-- 标题 -->
                  <div @click="_titleClick([k1,k2,k3])" class="wm-menu_title left32" :class="!v3.children&&active==k1+'_'+k2+'_'+k3?'active':''" :style="{height: height+'px', lineHeight: height+'px'}">
                    <i v-if="v3.icon" :class="v3.icon" :style="{color: v3.children?textColor:''}"></i>
                    <h2 :style="{color: v3.children?textColor:''}">{{v3.label}}</h2>
                    <span v-if="v3.children">
                      <div :id="'arrow_'+k1+'_'+k2+'_'+k3" class="arrow" :style="{borderColor: textColor}"></div>
                    </span>
                  </div>
                </div>
              </div>
            </template>
            <!-- 三级菜单 End -->
          </div>
        </div>
      </template>
      <!-- 二级菜单 End -->
    </div>
    <!-- 一级菜单 End -->
  </div>
</template>

<style scoped>
.wm-menu{position: relative; overflow: hidden;}
.wm-menu .left16{padding-left: 16px;}
.wm-menu .left24{padding-left: 24px;}
.wm-menu .left32{padding-left: 32px;}
.wm-menu .left56{padding-left: 56px;}
.wm-menu .arrow{position: absolute; width: 6px; height: 6px; border: #CCC 2px solid; border-top: none; border-right: none; left: 50%; top: 50%; transform: translate(-50%,-50%) rotate(-45deg); transition-duration: .4s;}
.wm-menu .active{background-color: #595; color: #FFF;}
.wm-menu .active:hover{background-color: #595; color: #FFF;}
/* 标题 */
.wm-menu_title{position: relative; cursor: pointer; padding: 0 8px; border-radius: 4px;}
.wm-menu_title:hover{background-color: rgba(200,200,200,.2);}
.wm-menu_title i{float: left;  width: 32px; text-align: center;}
.wm-menu_title h2{float: left; font-size: 14px;}
.wm-menu_title span{position: absolute; width: 24px; height: 24px; right: 8px; top: 50%; transform: translateY(-50%);}
.wm-menu_list{overflow: hidden; height: 0px; transition-duration: .4s;}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Env from '../../env'
import Storage from '../../library/ui/storage'
export default defineComponent({
  name: 'Menu',
  props: {
    data: {type: Array, default: []}, //数据: [{icon:'',label:'标题',value:'',children:[]}]
    defaultIndex: {type: Array, default: []},  //默认选择
    isSave: {type: Boolean, default: true},  //是否记录位置
    height: {type: Number, default: 40},  //高度
    textColor: {type: String, default: Env.themes.text1}, //颜色
  },
  data(){
    const menuData: Array<any> = [];
    const active: string = '';
    const arrowStyle: string[] = ['translate(-50%,-50%) rotate(-45deg)','translate(-50%,-50%) rotate(135deg)'];
    const listStyle: string[] = ['0px','auto'];
    return {menuData, active, arrowStyle, listStyle,}
  },
  watch:{
    data(){
      this.init();
      this.reset();
    },
    defaultIndex(val){
      this._titleClick(val);
      setTimeout(()=>{ this._activeMenu(val); },400);
    },
  },
  mounted(){
    // 清理
    Storage.removeItem('wmMenusActive');
  },
  methods:{

    /* 初始化 */
    init(){
      this.menuData = <Array<any>>this.data;
      // 获取保存
      if(this.isSave){
        let active: number[] = [];
        let pos = Storage.getItem('wmMenusActive');
        active = pos?JSON.parse(pos):this.defaultIndex;
        this._titleClick(active);
        setTimeout(()=>{ this._activeMenu(active); },400);
      }
    },

    /* 展开菜单 */
    _titleClick(pos: number[]){
      // 位置
      let id = '';
      for(let i in pos) id += '_'+pos[i];
      this.$emit('select',pos);
      // 选中
      let data = null;
      if(pos.length==1 && this.menuData[pos[0]] && !this.menuData[pos[0]].children){
        this._checked(id,pos);
        data = this.menuData[pos[0]];
        this.$emit('active',pos,data.value,data.label);
      }else if(pos.length==2 && this.menuData[pos[0]] && this.menuData[pos[0]].children[pos[1]] && !this.menuData[pos[0]].children[pos[1]].children){
        this._checked(id,pos);
        data = this.menuData[pos[0]].children[pos[1]];
        this.$emit('active',pos,data.value,data.label);
      }else if(pos.length==3 && this.menuData[pos[0]] && this.menuData[pos[0]].children[pos[1]] && this.menuData[pos[0]].children[pos[1]].children[pos[2]] && !this.menuData[pos[0]].children[pos[1]].children[pos[2]].children){
        this._checked(id,pos);
        data = this.menuData[pos[0]].children[pos[1]].children[pos[2]];
        this.$emit('active',pos,data.value,data.label);
      }
      // 动画
      let list = document.getElementById('list'+id);
      if(list && list.style.height=='auto'){
        this._setStyle(id,0);
      }else{
        this._setStyle(id,1);
      }
    },
    /* 选中 */
    _checked(id: string, pos: number[]){
      this.active = id.substr(1,id.length);
      if(this.isSave) Storage.setItem('wmMenusActive',JSON.stringify(pos));
    },
    /* 默认菜单 */
    _activeMenu(pos: number[]){
      let id: string = '';
      for(let val of pos){
        id += '_'+val;
        this._setStyle(id,1);
      }
    },
    /* 设置样式 */
    _setStyle(id: string, n: number){
      const arrow = document.getElementById('arrow'+id);
      const list = document.getElementById('list'+id);
      if(arrow) arrow.style.transform = this.arrowStyle[n];
      if(list) list.style.height = this.listStyle[n];
    },

    /* 重置 */
    reset(){
      const data = this.menuData;
      for(let x in data){
        this._setStyle('_'+x,0);
        for(let y in data[x].children){
          this._setStyle('_'+x+'_'+y,0);
          for(let z in data[x].children[y].children){
            this._setStyle('_'+x+'_'+y+'_'+z,0);
          }
        }
      }
    },

    /* 清除 */
    clear(){
      Storage.removeItem('wmMenusActive');
      this._titleClick(<number[]>this.defaultIndex);
      this.active = '';
    },

  }
});
</script>