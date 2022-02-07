<template>
  
</template>

<style scoped>

</style>

<script lang="ts">
import { defineComponent } from 'vue'
import Env from '../../env'
import Storage from '../../library/Storage'
export default defineComponent({
  name: 'Menu',
  props: {
    data: {type: Array, default: []},                     //数据: [{icon:'',label:'标题',value:'',children:[]}]
    defaultIndex: {type: Array, default: []},             //默认选择
    isSave: {type: Boolean, default: true},               //是否记录位置
    height: {type: Number, default: 32},                  //高度
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

  },
  mounted(){
    console.log('menus')
  },
  methods:{

  }

});
</script>