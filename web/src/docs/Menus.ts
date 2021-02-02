/* 文档菜单 */
export default {

  /* Vue */
  vue(){
    return [
      {label:'Vue项目', children:[
        {label: '开发环境', value: 'docs/vue/install/install'},
        {label: '安装&运行', value: 'docs/vue/install/index'},
        {label: '打包&发布', value: 'docs/vue/install/build'},
      ]},
      {label:'组件 Component', children:[
        // {label: '开发环境', value: 'docs/vue/install/install'},
      ]},
    ];
  },

  /* Flutter */
  flutter(){
    return [
      {label:'Flutter项目', children:[
        {label: '开发环境', value: 'docs/flutter/install/install'},
        {label: '安装&运行', value: 'docs/flutter/install/index'},
        {label: '打包&发布', value: 'docs/flutter/install/build'},
      ]},
    ];
  },

  /* Phalcon */
  phalcon(){
    return [
      {label:'Phalcon项目', children:[
        {label: '开发环境', value: 'docs/phalcon/install/install'},
        {label: '安装&运行', value: 'docs/phalcon/install/index'},
        {label: '打包&发布', value: 'docs/phalcon/install/build'},
      ]},
    ];
  },

  /* Python */
  python(){
    return [
      {label:'Python项目', children:[
        {label: '开发环境', value: 'docs/python/install/install'},
        {label: '安装&运行', value: 'docs/python/install/index'},
        {label: '打包&发布', value: 'docs/python/install/build'},
      ]},
    ];
  },

  /* Java */
  java(){
    return [
      {label:'Java项目', children:[
        {label: '开发环境', value: 'docs/java/install/install'},
        {label: '安装&运行', value: 'docs/java/install/index'},
        {label: '打包&发布', value: 'docs/java/install/build'},
      ]},
    ];
  },

  /* Linux */
  linux(){
    return [
      {label:'Linux文档', children:[
        {label: 'Shell基础', value: 'docs/linux/shell/index'},
        {label: 'SSL免费证书', value: 'docs/linux/shell/ssl'},
      ]},
      {label:'CentOS', children:[
        {label: '基础配置', value: 'docs/linux/centos/config'},
        {label: 'LNMP环境', value: 'docs/linux/centos/lnmp'},
      ]},
    ];
  },

}