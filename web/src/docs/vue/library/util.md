## 引入
```javascript
import {Explode, Implode} from '@/library/util/index'
import {Trim, LTrim, RTrim} from '@/library/util/trim'
```

## 常用工具
```javascript
// 字符串 to 数组
Explode('-', 'php-python-java')
// 数组 to 字符串
Implode(' ', ['php', 'python', 'java']);
```

## Trim 去首尾字符
```javascript
Trim(str: string, glue: string='\\s');
LTrim(str: string, glue: string='\\s');
RTrim(str: string, glue: string='\\s');
```