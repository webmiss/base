<template>
  <div class="body">
    <!-- 内容 -->
    <el-container>
      <!-- 菜单 -->
      <el-aside class="doc_menus" width="210px">
        <h2 class="app_title">{{$config.name}}</h2>
        <el-menu :default-active="defaultMenu" unique-opened>
          <el-submenu v-for="(val1,key1) in $menus" :key="key1" :index="''+key1">
            <template slot="title"><span>{{val1.title}}</span></template>
            <div v-for="(val2,key2) in val1.menus" :key="key2">
              <el-menu-item v-if="val2.menus.length==0" :index="key1+'-'+key2" @click="openUrl(val2,key1+'-'+key2)">{{val2.title}}</el-menu-item>
              <el-submenu v-else :index="key1+'-'+key2">
                <template slot="title"><span>{{val2.title}}</span></template>
                <el-menu-item v-for="(val3,key3) in val2.menus" :key="key3" :index="key1+'-'+key2+'-'+key3" @click="openUrl(val3,key1+'-'+key2+'-'+key3)">{{val3.title}}</el-menu-item>
              </el-submenu>
            </div>
          </el-submenu>
        </el-menu>
        <el-row class="doc_copy">
          系统版本：{{$config.version}}
        </el-row>
      </el-aside>
      <!-- 页面 -->
      <el-main class="doc_html" v-html="MarkDown()"></el-main>
    </el-container>
    <!-- 内容 End -->
  </div>
</template>

<style scoped>

</style>

<script>
import Inc from '@/library/Inc'
import marked from 'marked'
export default {
  data(){
    return {
      defaultMenu: '',
      docHtml: '',
      file:'./index.md',
    }
  },
  mounted(){
  },
  // methods:{
  //   /* 跳转地址 */
  //   openUrl(data,index){
  //     console.log(data);
  //   }
  // },
  methods: {
    /* 跳转地址 */
    openUrl(data,index){
      console.log(data);
      console.log(data.url);
      // this.docHtml = require(this.file);
      // let path = require('./');
      // this.docHtml = require('./index.md').require;
    },
    /* 文档 */
    MarkDown(){
      return marked(this.docHtml, { sanitize: true });
    }
  },
}
</script>