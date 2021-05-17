## 引入
```javascript
import wmAction from '@/components/action/index.vue'
```

#### 动作菜单
```html
<wm-action></wm-action>
```
- menus: [{name: "新建文件夹", action: "mkdir", perm: 2}]

#### 事件
```javascript
  computed: {
    // 动作菜单-监听
    actionType(){
      const active: any = this.state.action.active;
      return active;
    }
  },
  watch:{
    // 动作菜单-点击
    actionType(val){
      if(!val) return false;
      console.log(val);
    }
  },
```

## 图标
```javascript
import wmAdd from '@/components/action/add/index.vue'
import wmSubtract from '@/components/action/subtract/index.vue'
import wmClose from '@/components/action/close/index.vue'
```

#### Html
```html
<wm-add />
<wm-subtract />
<wm-close />
```
- size: {type: String, default: '11px'},        //大小
- bgColor: {type: String, default: '#6FB737'},  //背景颜色






