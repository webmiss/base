<template>
  <div id="app">

    <el-container class="app_body">
      <!-- 内容 -->
      <el-container class="app_ct">
        <!-- 菜单 -->
        <el-aside class="app_menus" width="210px">
          <h2 class="app_title">{{config.title}}</h2>
          <el-menu :default-active="defaultMenu" unique-opened>
            <el-submenu v-for="(val1,key1) in menus" :key="key1" :index="''+key1">
              <template slot="title"><span>{{val1.title}}</span></template>
              <div v-for="(val2,key2) in val1.menus" :key="key2">
                <el-menu-item v-if="val2.menus.length==0" :index="key1+'-'+key2" @click="openUrl(val2.url,key1+'-'+key2,val2.name,val2.data)">{{val2.title}}</el-menu-item>
                <el-submenu v-else :index="key1+'-'+key2">
                  <template slot="title"><span>{{val2.title}}</span></template>
                  <el-menu-item v-for="(val3,key3) in val2.menus" :key="key3" :index="key1+'-'+key2+'-'+key3" @click="openUrl(val3.url,key1+'-'+key2+'-'+key3,val3.name,val3.data)">{{val3.title}}</el-menu-item>
                </el-submenu>
              </div>
            </el-submenu>
          </el-menu>
          <el-row class="app_copy">{{config.copy}}</el-row>
        </el-aside>
        <!-- 页面 -->
        <el-main class="app_main"><router-view /></el-main>
      </el-container>
      <!-- 内容 End -->
    </el-container>

  </div>
</template>

<style>
/* 初始化 */
*{margin: 0; padding: 0;}
html,body,#app{height: 100%; font-size: 14px; color: #333;}
a{cursor: pointer; color: #6FB737; text-decoration: none;}
a:hover{color: #FF6600;}
ul{list-style: none;}

/* 公共 */
.mtop{margin-top: 15px;}
.hide{display: none;}
.c_main{color: #6FB737;}
.null{text-align: center; color: #999;}
.null::before{content: '暂无数据！';}
.font12{font-size: 12px;}
.font16{font-size: 16px;}

.flex{display: flex; justify-content: space-between; flex-wrap: wrap;}
.flex_left{display: flex; justify-content: flex-start; flex-wrap: wrap;}
.flex_right{display: flex; justify-content: flex-end; flex-wrap: wrap;}
.flex_center{display: flex; justify-content: center;}
.nowrap{overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.nowrap_text{overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}

/* UI框架 */
.el-table{color: #333;}
.el-form-item{margin: 10px 0;}

/* Content */
.app_title{line-height: 50px; border-bottom: #000 1px solid; font-size: 16px; text-align: center;}
.app_body{height: 100%;}
.app_ct{height: 100%;}
.app_menus{background-color: #20222A; color: #CCC;}
.app_right{overflow: hidden; width: calc(100% - 201px);}
.app_copy{line-height: 36px; border-top: #000 1px solid; font-size: 12px; color: #666; text-align: center;}

.res_title{line-height: 50px; font-size: 14px; color: #666;}
.res_ct{padding: 0 10px; max-width: 800px; line-height: 24px; border-radius: 5px; background-color: #F2F2F2; border: #DADCDF 1px solid;}

/* 菜单 */
.app_menus .el-menu{border: none;}
.app_menus .el-submenu__title{height: 46px; line-height: 46px; color: #CCC;}
.app_menus .el-submenu__title:hover{background-color: #30333A;}
.app_menus .el-submenu__title .fa{font-size: 21px; margin-right: 5px;}
.app_menus .el-submenu .el-menu-item{height: 36px; line-height: 36px; color: #FFF;}
.app_menus ul{background-color: #20222A;}
.app_menus .el-menu-item:hover{background-color: #30333A; color: #6FB737;}
.app_menus .el-menu-item:hover i{color: #FFF;}
.app_menus .el-menu-item.is-active{background-color: #6FB737; color: #FFF;}
</style>

<script>
import Env from '@/env'
import Menus from '@/Menus'
import {Storage} from '@/library/ui'
export default {
  data(){
    return {
      defaultMenu: '',  // 默认菜单
      config: Env,
      menus: Menus,
    }
  },
  mounted(){
    // 默认菜单
    this.defaultMenu = Storage.getItem('defaultMenu')?Storage.getItem('defaultMenu'):'0-0';
  },
  methods:{

    /* 跳转地址 */
    openUrl(url,index,name,data){
      // 保存-当前位置
      Storage.setItem('defaultMenu',index);
      // 保存-参数
      Storage.setItem('Request',JSON.stringify(data));
      this.$store.state.request = data;
      // 跳转
      this.$router.push(url?url:'/Request/'+name);
    },

  }
}
</script>
