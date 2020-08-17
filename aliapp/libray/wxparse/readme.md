## 支付宝小程序 富文本解析组件

项目地址：[https://github.com/yaoshanliang/wxParse](https://github.com/yaoshanliang/wxParse)

基于 [wxParse-微信小程序富文本解析自定义组件](https://github.com/icindy/wxParse)


### 使用方式

* 1.下载项目文件，复制进自己的项目

```
- wxParse/
  -wxParse.js(必须存在)
  -html2json.js(必须存在)
  -htmlparser.js(必须存在)
  -showdown.js(必须存在)
  -wxDiscode.js(必须存在)
  -wxParse.axml(必须存在)
  -wxParse.axss(必须存在)
  -emojis(可选)
```

* 2.引入必要文件

```
//在使用的View中引入WxParse模块
var wxParse = require('/wxParse/wxParse.js');
```

```
//在使用的axss中引入axParse.css,可以在app.axss
@import "/wxParse/wxParse.axss";
```

* 3.数据绑定
```
var article = '<div>我是HTML代码</div>';
/**
* wxParse.wxParse(bindName , type, data, target,imagePadding)
* 1.bindName绑定的数据名(必填)
* 2.type可以为html或者md(必填)
* 3.data为传入的具体数据(必填)
* 4.target为Page对象,一般为this(必填)
* 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
*/
var that = this;
wxParse.wxParse('article', 'html', article, that, 5);
```

* 4.模版引用
```
// 引入模板
<import src="/wxParse/wxParse.wxml"/>
//这里data中article为bindName
<template is="wxParse" data="{{wxParseData:article.nodes}}"/>
```