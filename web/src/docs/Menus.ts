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
      {label:'App组件', children:[
        {label: 'Chart 图表', value: 'docs/vue/app/chart'},
        {label: 'Loading 动画', value: 'docs/vue/app/loading'},
        {label: 'PageView 页面容器', value: 'docs/vue/app/page-view'},
        {label: 'ScrollView 滑动容器', value: 'docs/vue/app/scroll-view'},
        {label: 'Popup 弹出层', value: 'docs/vue/app/popup'},
        {label: 'Picker 选择器', value: 'docs/vue/app/picker'},
        {label: 'Swipe 轮播图', value: 'docs/vue/app/swipe'},
        {label: 'TabBar 导航菜单', value: 'docs/vue/app/tabbar'},
        {label: 'Touch 手势', value: 'docs/vue/app/touch'},
      ]},
      {label:'Admin组件', children:[
        {label: 'Action 动作菜单', value: 'docs/vue/admin/action'},
        {label: 'Dialog 对话框', value: 'docs/vue/admin/dialog'},
        {label: 'Form 表单', value: 'docs/vue/admin/form'},
        {label: 'Img 图片', value: 'docs/vue/admin/img'},
        {label: 'Loading 动画', value: 'docs/vue/admin/loading'},
        {label: 'Main 布局', value: 'docs/vue/admin/main'},
        {label: 'Page 分页', value: 'docs/vue/admin/page'},
        {label: 'Popup 弹出层', value: 'docs/vue/admin/popup'},
        {label: 'Popover 弹出框', value: 'docs/vue/admin/popover'},
        {label: 'ScrollView 滑动层', value: 'docs/vue/admin/scrollview'},
        {label: 'Switch 开关', value: 'docs/vue/admin/switch'},
        {label: 'Table 表格', value: 'docs/vue/admin/table'},
        {label: 'Tag 标签', value: 'docs/vue/admin/tag'},
        {label: 'TinyMCE 编辑器', value: 'docs/vue/admin/tinymce'},
        {label: 'Tree 树形控件', value: 'docs/vue/admin/tree'},
        {label: 'Uploader 上传', value: 'docs/vue/admin/uploader'},
      ]},
      {label:'Library模块', children:[
        {label: 'Ui 界面', value: 'docs/vue/library/ui'},
        {label: 'Request 请求', value: 'docs/vue/library/request'},
        {label: 'Storage 本地硬盘', value: 'docs/vue/library/storage'},
        {label: 'Array 数组', value: 'docs/vue/library/array'},
        {label: 'Base64 编码&解码', value: 'docs/vue/library/base64'},
        {label: 'Device 设备', value: 'docs/vue/library/device'},
        {label: 'Down 文件下载', value: 'docs/vue/library/down'},
        {label: 'Html 标签', value: 'docs/vue/library/html'},
        {label: 'Price 金额', value: 'docs/vue/library/price'},
        {label: 'Reg 正则验证', value: 'docs/vue/library/reg'},
        {label: 'Tel 手机号码', value: 'docs/vue/library/tel'},
        {label: 'Time 时间', value: 'docs/vue/library/time'},
        {label: 'URL 编码&解码', value: 'docs/vue/library/url'},
      ]},
      {label:'Plus模块', children:[
        {label: 'Plus 公共', value: 'docs/vue/plus/plus'},
        {label: 'Camera 相机', value: 'docs/vue/plus/camera'},
        {label: 'Img 图片', value: 'docs/vue/plus/img'},
        {label: 'Map 地图', value: 'docs/vue/plus/map'},
        {label: 'Notify 本地消息', value: 'docs/vue/plus/notify'},
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
      {label:'Service 服务', children:[
        {label: '基础 Base', value: 'docs/phalcon/service/base'},
        {label: '数据 Data', value: 'docs/phalcon/service/data'},
        {label: '日志 Logs', value: 'docs/phalcon/service/logs'},
        {label: '验证 Token', value: 'docs/phalcon/service/token'},
        {label: '通信 Socket', value: 'docs/phalcon/service/socket'},
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
        {label: '缓存 Redis', value: 'docs/phalcon/library/redis'},
        {label: '通信 WebSocket', value: 'docs/phalcon/library/socket'},
        {label: '安全验证 Safety', value: 'docs/phalcon/library/safety'},
        {label: '文件上传 Upload', value: 'docs/phalcon/library/upload'},
        {label: '二维码 Qrcode', value: 'docs/phalcon/library/qrcode'},
      ]},
      {label:'Util 工具', children:[
        {label: '常用工具', value: 'docs/phalcon/util/util'},
        {label: '编码/解码 URL', value: 'docs/phalcon/util/url'},
        {label: '编码/解码 Base64', value: 'docs/phalcon/util/base64'},
        {label: '加密算法 Hash', value: 'docs/phalcon/util/hash'},
        {label: '类型转换 Type', value: 'docs/phalcon/util/type'},
        {label: '设备信息 Os', value: 'docs/phalcon/util/os'},
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
      {label:'Service 服务', children:[
        {label: '基础 Base', value: 'docs/python/service/base'},
        {label: '数据 Data', value: 'docs/python/service/data'},
        {label: '日志 Logs', value: 'docs/python/service/logs'},
        {label: '验证 Token', value: 'docs/python/service/token'},
        {label: '通信 Socket', value: 'docs/python/service/socket'},
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
        {label: '缓存 Redis', value: 'docs/python/library/redis'},
        {label: '通信 WebSocket', value: 'docs/python/library/socket'},
        {label: '安全验证 Safety', value: 'docs/python/library/safety'},
        {label: '文件上传 Upload', value: 'docs/python/library/upload'},
        {label: '二维码 Qrcode', value: 'docs/python/library/qrcode'},
      ]},
      {label:'Util 工具', children:[
        {label: '常用工具', value: 'docs/python/util/util'},
        {label: '编码/解码 URL', value: 'docs/python/util/url'},
        {label: '编码/解码 Base64', value: 'docs/python/util/base64'},
        {label: '加密算法 Hash', value: 'docs/python/util/hash'},
        {label: '类型转换 Type', value: 'docs/python/util/type'},
        {label: '设备信息 Os', value: 'docs/python/util/os'},
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
      {label:'Service 服务', children:[
        {label: '基础 Base', value: 'docs/java/service/base'},
        {label: '数据 Data', value: 'docs/java/service/data'},
        {label: '日志 Logs', value: 'docs/java/service/logs'},
        {label: '验证 Token', value: 'docs/java/service/token'},
        {label: '通信 Socket', value: 'docs/java/service/socket'},
      ]},
      {label:'ORM 数据库', children:[
        {label: '模型 Model', value: 'docs/java/db/model'},
        {label: '查询 Select', value: 'docs/java/db/select'},
        {label: '插入 Insert', value: 'docs/java/db/insert'},
        {label: '更新 Update', value: 'docs/java/db/update'},
        {label: '删除 Delete', value: 'docs/java/db/delete'},
        {label: '连表 Join', value: 'docs/java/db/join'},
        {label: '事务 Commit', value: 'docs/java/db/commit'},
      ]},
      {label:'Library 类库', children:[
        {label: '缓存 Redis', value: 'docs/java/library/redis'},
        {label: '通信 WebSocket', value: 'docs/java/library/socket'},
        {label: '安全验证 Safety', value: 'docs/java/library/safety'},
        {label: '文件上传 Upload', value: 'docs/java/library/upload'},
        {label: '二维码 Qrcode', value: 'docs/java/library/qrcode'},
      ]},
      {label:'Util 工具', children:[
        {label: '常用工具', value: 'docs/java/util/util'},
        {label: '编码/解码 URL', value: 'docs/java/util/url'},
        {label: '编码/解码 Base64', value: 'docs/java/util/base64'},
        {label: '加密算法 Hash', value: 'docs/java/util/hash'},
        {label: '类型转换 Type', value: 'docs/java/util/type'},
        {label: '设备信息 Os', value: 'docs/java/util/os'},
        {label: '泛型 Dynamic', value: 'docs/java/util/dynamic'},
        {label: '请求响应 Http', value: 'docs/java/util/http'},
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
      {label:'Service 服务', children:[
        {label: '基础 Base', value: 'docs/gin/service/base'},
        {label: '数据 Data', value: 'docs/gin/service/data'},
        {label: '日志 Logs', value: 'docs/gin/service/logs'},
        {label: '验证 Token', value: 'docs/gin/service/token'},
        {label: '通信 Socket', value: 'docs/gin/service/socket'},
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
        {label: '缓存 Redis', value: 'docs/gin/library/redis'},
        {label: '通信 WebSocket', value: 'docs/gin/library/socket'},
        {label: '安全验证 Safety', value: 'docs/gin/library/safety'},
        {label: '文件上传 Upload', value: 'docs/gin/library/upload'},
        {label: '二维码 Qrcode', value: 'docs/gin/library/qrcode'},
        {label: '事件流 Kafka', value: 'docs/gin/library/kafka'},
      ]},
      {label:'Util 工具', children:[
        {label: '常用工具', value: 'docs/gin/util/util'},
        {label: '编码/解码 URL', value: 'docs/gin/util/url'},
        {label: '编码/解码 Base64', value: 'docs/gin/util/base64'},
        {label: '加密算法 Hash', value: 'docs/gin/util/hash'},
        {label: '类型转换 Type', value: 'docs/gin/util/type'},
        {label: '设备信息 Os', value: 'docs/gin/util/os'},
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
        {label: 'MaxScale 中间件', value: 'docs/linux/shell/maxscale'},
        {label: 'Pulsar 消息列队', value: 'docs/linux/shell/pulsar'},
        {label: 'ElasticSearch 全文搜索', value: 'docs/linux/shell/elasticsearch'},
      ]},
      {label:'Service', children:[
        {label: 'FTP 文件传输', value: 'docs/linux/service/ftp'},
      ]},
      {label:'CentOS', children:[
        {label: '基础配置', value: 'docs/linux/centos/config'},
        {label: 'LNMP环境', value: 'docs/linux/centos/lnmp'},
      ]},
      {label:'Ubuntu', children:[
        {label: '基础配置', value: 'docs/linux/ubuntu/config'},
        {label: 'LNMP环境', value: 'docs/linux/ubuntu/lnmp'},
      ]},
      {label:'ArchLinux', children:[
        {label: '安装&配置', value: 'docs/linux/archlinux/install'},
        {label: 'GNOME3桌面', value: 'docs/linux/archlinux/gnome'},
        {label: 'Nginx+PHP+MariaDB', value: 'docs/linux/archlinux/lnmp'},
      ]},
    ];
  },

}