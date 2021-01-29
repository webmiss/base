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

<script>
import Env from '@/env.js'
import Storage from '@/library/ui/storage'
export default {
  name: 'Menu',
  props: {
    data: {type: Array, default: []}, //数据: [{icon:'',label:'标题',value:'',children:[]}]
    defaultIndex: {type: Array, default: [0,0,0]},  //默认选择
    isSave: {type: Boolean, default: true},  //是否记录位置
    height: {type: Number, default: 40},  //高度
    textColor: {type: String, default: Env.themes.text1}, //颜色
  },
  data(){
    return {
      menuData: [],
      active: '',
    }
  },
  watch:{
    data(){
      this.init();
    }
  },
  methods:{

    /* 初始化 */
    init(){
      this.menuData = this.data;
      setTimeout(()=>{
        let index = [];
        const active = Storage.getItem('wmMenusActive')?JSON.parse(Storage.getItem('wmMenusActive')):this.defaultIndex;
        for(let i in active){
          index.push(active[i]);
          this._titleClick(index);
        }
      },400);
    },

    /* 展开菜单 */
    _titleClick(pos){
      // 位置
      let id = '';
      for(let i in pos) id += '_'+pos[i];
      let arrow = document.getElementById('arrow'+id);
      let list = document.getElementById('list'+id);
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
      if(!list) return false;
      if(list.style.height=='auto'){
        arrow.style.transform = 'translate(-50%,-50%) rotate(-45deg)';
        list.style.height = '0px';
      }else{
        arrow.style.transform = 'translate(-50%,-50%) rotate(135deg)';
        list.style.height = 'auto';
      }
    },
    /* 选中 */
    _checked(id,pos){
      this.active = id.substr(1,id.length);
      if(this.isSave) Storage.setItem('wmMenusActive',JSON.stringify(pos));
    },

    /* 清除 */
    clear(){
      Storage.removeItem('wmMenusActive');
    },

  }
}
</script>