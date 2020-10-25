<template>
  <div class="wm-menu">
    <div v-for="(v1,k1) in data" :key="k1" :style="{color: fontColor}">
      <div class="wm-menu_title flex" @click="titleClick(k1)" :style="{height:titleHeight+'px',lineHeight:titleHeight+'px'}">
        <div class="flex">
          <i v-if="v1.ico" :class="v1.ico"></i>
          <h1>{{v1.title}}</h1>
        </div>
        <div :id="'ico'+k1" class="arrow"><i class="ui ui_down"></i></div>
      </div>
      <ul :id="'t'+k1" class="wm-menu_list" v-if="v1.children">
        <li v-for="(v2,k2) in v1.children" :key="k2" @click="menuClick([k1,k2])" :class="v2.checked?'active':''" :style="{height:itemHeight+'px',lineHeight:itemHeight+'px'}">{{v2.title}}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wm-menu_title{cursor: pointer; padding: 0 8px; font-size: 14px;}
.wm-menu_title:hover{background-color: rgba(0,0,0,0.2);}
.wm-menu_title i{width: 32px; text-align: center; color: #999;}
.wm-menu_title h1{font-size: 14px; color: #999;}
.wm-menu_title .arrow{width: 24px; text-align: center; transition-duration: 400ms;}
.wm-menu_title .arrow i{font-size: 8px; color: #999;}
.wm-menu_list{overflow: hidden; height: 0; font-size: 13px; transition-duration: 400ms;}
.wm-menu_list li{cursor: pointer; padding: 0 16px 0 32px;}
.wm-menu_list li:hover{background-color: rgba(0,0,0,0.2);}
.wm-menu .active{background-color: #6FB737; color: #222;}
.wm-menu .active:hover{background-color: #6FB737; color: #222;}
</style>

<script>
export default {
  name: 'Menu',
  props: {
    data: {type: Array, default: []},
    defaultActive: {type: Array, default: [0,0]},
    fontColor: {type: String, default: '#FFF'},
    titleHeight: {type: Number, default: 40},
    itemHeight: {type: Number, default: 36},
  },
  methods:{

    /* 展开菜单 */
    titleClick(index){
      if(!this.data[index]) return false;
      let num = this.data[index].children.length || 0;
      let ico = document.getElementById('ico'+index);
      let list = document.getElementById('t'+index);
      let height = num*36+'px';
      if(list.style.height==height){
        ico.style.transform = 'rotate(0deg)';
        list.style.height = '0px';
      }else{
        ico.style.transform = 'rotate(180deg)';
        list.style.height = height
      }
    },

    /* 点击菜单 */
    menuClick(pos){
      // 重置
      for(let x in this.data){
        for(let y in this.data[x].children){
          this.data[x].children[y].checked = false;
        }
      }
      // 选中
      if(this.data[pos[0]] && this.data[pos[0]].children){
        this.data[pos[0]].children[pos[1]].checked = true;
        // 事件
        this.$emit('select',pos);
      }
      
    },

  },
}
</script>