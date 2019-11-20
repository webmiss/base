<template>
  <div class="body content_body">
    <!-- 内容 -->
    <el-container>
      <!-- 菜单 -->
      <el-aside class="doc_menus" width="240px">
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
      <el-main>
        <div class="doc_print"><a @click="print()">打印</a></div>
        <div id="print" class="doc_body">
          <h2 class="doc_title" v-html="docTitle"></h2>
          <div class="doc_html" v-html="MarkDown()"></div>
        </div>
      </el-main>
    </el-container>
    <!-- 内容 End -->
  </div>
</template>

<style scoped>
.el-menu{padding: 10px 0;}
.el-container{background-color: #FFF; border-radius: 5px;}
</style>

<script>
import Inc from '@/library/Inc'
import marked from 'marked'
import printDOM from "print-dom"
export default {
  data(){
    return {
      defaultMenu: '0-0',
      docTitle: '使用说明',
      docHtml: require('@/docs/index.md'),
    }
  },
  mounted(){
    document.title = this.docTitle;
    // Code刷新
    Inc.load(['/prism/prism.css','/prism/prism.js'],true);
  },
  methods: {

    /* 跳转地址 */
    openUrl(data,index){
      // 数据
      document.title = data.title;
      this.docTitle = data.title;
      this.docHtml = data.content;
      // Code刷新
      Inc.load(['/prism/prism.css','/prism/prism.js'],true);
    },

    /* 文档 */
    MarkDown(){
      return marked(this.docHtml, { sanitize: true });
    },

    /* 打印 */
    print(){
      printDOM(document.querySelector("#print")); 
    },

  },
}
</script>