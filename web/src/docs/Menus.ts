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
      {label:'ORM 数据库', children:[
        {label: '模型 Model', value: 'docs/phalcon/db/model'},
        {label: '查询 Select', value: 'docs/phalcon/db/select'},
        {label: '插入 Insert', value: 'docs/phalcon/db/insert'},
        {label: '更新 Update', value: 'docs/phalcon/db/update'},
        {label: '删除 Delete', value: 'docs/phalcon/db/delete'},
        {label: '连表 Join', value: 'docs/phalcon/db/join'},
        {label: '事务 Commit', value: 'docs/phalcon/db/commit'},
      ]},
      {label:'Library 类库', children:[
        {label: '通信 WebSocket', value: 'docs/phalcon/library/socket'},
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
      {label:'ORM 数据库', children:[
        {label: '模型 Model', value: 'docs/python/db/model'},
        {label: '查询 Select', value: 'docs/python/db/select'},
        {label: '插入 Insert', value: 'docs/python/db/insert'},
        {label: '更新 Update', value: 'docs/python/db/update'},
        {label: '删除 Delete', value: 'docs/python/db/delete'},
        {label: '连表 Join', value: 'docs/python/db/join'},
        {label: '事务 Commit', value: 'docs/python/db/commit'},
      ]},
      {label:'Library 类库', children:[
        {label: '通信 WebSocket', value: 'docs/python/library/socket'},
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

  /* Gin */
  gin(){
    return [
      {label:'Gin项目', children:[
        {label: '开发环境', value: 'docs/gin/install/install'},
        {label: '安装&运行', value: 'docs/gin/install/index'},
        {label: '打包&发布', value: 'docs/gin/install/build'},
      ]},
      {label:'ORM 数据库', children:[
        {label: '模型 Model', value: 'docs/gin/db/model'},
        {label: '查询 Select', value: 'docs/gin/db/select'},
        {label: '插入 Insert', value: 'docs/gin/db/insert'},
        {label: '更新 Update', value: 'docs/gin/db/update'},
        {label: '删除 Delete', value: 'docs/gin/db/delete'},
        {label: '连表 Join', value: 'docs/gin/db/join'},
        {label: '事务 Commit', value: 'docs/gin/db/commit'},
      ]},
      {label:'Library 类库', children:[
        {label: '事件流 Kafka', value: 'docs/gin/library/kafka'},
        {label: '通信 WebSocket', value: 'docs/gin/library/socket'},
      ]},
    ];
  },

  /* Linux */
  linux(){
    return [
      {label:'Linux文档', children:[
        {label: 'Shell基础', value: 'docs/linux/shell/index'},
        {label: 'SSL免费证书', value: 'docs/linux/shell/ssl'},
        {label: 'VBox安装MacOS', value: 'docs/linux/shell/macos'},
        {label: 'Docker 容器', value: 'docs/linux/shell/docker'},
        {label: 'MariaDB 数据库', value: 'docs/linux/shell/mariadb'},
      ]},
      {label:'CentOS', children:[
        {label: '基础配置', value: 'docs/linux/centos/config'},
        {label: 'LNMP环境', value: 'docs/linux/centos/lnmp'},
      ]},
      {label:'ArchLinux', children:[
        {label: '安装&配置', value: 'docs/linux/archlinux/install'},
        {label: 'GNOME3桌面', value: 'docs/linux/archlinux/gnome'},
        {label: 'Nginx+PHP+MariaDB', value: 'docs/linux/archlinux/lnmp'},
      ]},
    ];
  },

}