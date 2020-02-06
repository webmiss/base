## 安装Node
```bash
# 安装
pacman -S nodejs npm
# 修改权限
chmod -R 777 /usr/lib/node_modules/
```
## 淘宝镜像
```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## 安装Vue-cli
```bash
# v2
cnpm install -g vue-cli
# v3
cnpm install -g @vue/cli
```

## 创建项目( v2 )
```bash
vue init webpack demo
```
- ? Project name (demo) 
- ? Project description (A Vue.js project)
- ? Author (webmiss <klingsoul@163.com>) 
- ? Vue build **standalone**
- ? Install vue-router? **Yes**
- ? Use ESLint to lint your code? **No**
- ? Set up unit tests No
- ? Setup e2e tests with Nightwatch? **No**
- ? Should we run `npm install` for you after the project has been created? (recommended) **no**

##  创建项目( v3 )
```bash
vue create demo
```
- ? Please pick a preset: Manually select features
- ? Check the features needed for your project: 
- ◉ Babel
- ◯ TypeScript
- ◯ Progressive Web App (PWA) Support
- ◉ Router
- ◉ Vuex
- ◯ CSS Pre-processors
- ◉ Linter / Formatter
- ◯ Unit Testing
- ◯ E2E Testing
- ? Use history mode for router?Yes
- ? Pick a linter / formatter config: Basic
- ? Pick additional lint features: Lint on save
- ? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files

### 配置文件( vue.config.js )
```bash
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
    productionSourceMap: true,
}
```

## 运行
```bash
# 项目
cd demo
# 安装依赖
cnpm install
# 运行(cli2\cli3)
npm run dev
npm run serve
# 打包
npm run build
```

## AJAX
```bash
# 安装
cnpm install axios -S
```

## Vue-Ydui
```bash
# 插件
cnpm install vue-ydui -S
# 使用
import 'vue-ydui/dist/ydui.base.css';
import {Button, ButtonGroup} from 'vue-ydui/dist/lib.rem/button';

export default {
    components: {
      [Button.name]: Button,
    },
}
```

## Muse-UI
```bash
# 插件
cnpm install muse-ui -S
# 使用
import 'muse-ui/dist/muse-ui.css';
import MuseUI from 'muse-ui';
Vue.use(MuseUI);
# 定义主题
import theme from 'muse-ui/lib/theme'
Vue.use(MuseUI);
theme.add('teal', {
  primary: '#FF6600',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#ffeb3b',
}, 'light');
theme.use('teal');
```

## Cube-UI( cli3 )
```bash
# 安装
vue add cube-ui
# 使用
import { Button } from "cube-ui";

export default {
    components: {
      [Button.name]: Button,
    },
}
```

## Mand-Mobile( cli3 )
```bash
# 插件
cnpm install vue-cli-plugin-mand -D
# 安装
vue invoke mand
# 使用
import "normalize.css";
import 'mand-mobile/lib/mand-mobile.css'

import { Button } from "mand-mobile";

export default {
    components: {
      [Button.name]: Button,
    },
}
```

## ElementUI
```bash
# 安装
cnpm install element-ui -S
```

## 阿里G2( 图表 )
```bash
# 安装
cnpm install g2 -S
# 使用
import G2 from 'g2'
```

## 字体图标
```bash
# 安装
cnpm install font-awesome -S
```
文档：http://fontawesome.dashgame.com/

### 引入( main.js )
```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import FastClick from 'fastclick'

// 注册函数
Vue.prototype.$ajax = axios
// 配置
Vue.config.productionTip = false
// APP click点击延迟问题
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

## 自定义属性、函数
### library/inc.js
```javascript
/* 公共文件 */
exports.install = function (Vue, options) {
    // 全局变量
    Vue.prototype.inc = {
        version:'1.0.0',
        baseUrl:'http://localhost:8080/',
        test(){
            console.log('Test');
        }
    }
}
```
### main.js
```javascript
import Inc from './library/inc'

Vue.use(Inc)
```
### Index.vue
```javascript
mounted(){
        console.log('构造函数');
        console.log(this.inc);
        this.inc.test();
},
```

## 打包事项
### 编辑文件( build/utils.js )
```javascript
if (options.extract) {
	return ExtractTextPlugin.extract({
		use: loaders,
		fallback: 'vue-style-loader',
		publicPath: '../../'
	})
} else {
	return ['vue-style-loader'].concat(loaders)
}
```
### 编辑文件( config/index.js )
```javascript
build: {
	index: path.resolve(__dirname, '../dist/index.html'),
	assetsRoot: path.resolve(__dirname, '../dist'),
	assetsSubDirectory: 'static',
	assetsPublicPath: './',
}
```

## Vue项目拷贝问题
### 新建文件( postcss.config.js )
```javascript
module.exports = {
    plugins: {
        'autoprefixer': {},
    }
}
```