(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ceeee922"],{"78c1":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Action",{attrs:{url:"Test"},on:{action:t.openAction}}),a("el-row",{staticClass:"body"},[t._v("\n    暂无数据！\n  ")])],1)},i=[],o=a("b490"),s={components:{Action:o["a"]},data:function(){return{LabelWidth:"80px",selectData:[],pageData:{list:[],total:0,page:1,limit:15},seaData:{show:!1,form:{}},addData:{show:!1,active:"one",form:{}},editData:{show:!1,active:"one",form:{}},delData:{show:!1,id:""}}},mounted:function(){this.loadData()},methods:{page:function(t){this.pageData.page=t,this.loadData()},getSelect:function(t){this.selectData=t},openAction:function(t){if("list"==t)this.seaData.form={},this.pageData.page=1,this.loadData();else if("sea"==t)this.seaData.show=!0;else if("add"==t)this.addData.show=!0;else if("edit"==t)this.getEdit({id:""});else if("del"==t)if(this.selectData.length>0){this.delData.show=!0;for(var e=this.selectData,a="",n=0;n<e.length;n++)a+=e[n].id+",";this.delData.id=a}else this.$message.error("请选择数据！")},loadData:function(){}}},c=s,l=a("2877"),r=Object(l["a"])(c,n,i,!1,null,"71c433ef",null);e["default"]=r.exports},b490:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.actions.length?a("el-row",{staticClass:"action"},[a("el-button-group",t._l(t.actions,(function(e){return a("el-button",{key:e.name,attrs:{icon:e.ico},on:{click:function(a){return t.openAction(e.action)}}},[t._v(t._s(e.name))])})),1)],1):t._e()},i=[],o={name:"Action",props:["url"],data:function(){return{actions:[]}},mounted:function(){this.getAction(this.url)},methods:{getAction:function(t){var e=this;this.$ajax.post(this.$config.apiUrl+"Usermain/getMenusAction","token="+this.$storage.getItem("token")+"&url="+t).then((function(t){var a=t.data;0==a.code&&(e.actions=a.menuAction)}))},openAction:function(t){this.$emit("action",t)}}},s=o,c=a("2877"),l=Object(c["a"])(s,n,i,!1,null,null,null);e["a"]=l.exports}}]);
//# sourceMappingURL=chunk-ceeee922.2a75e7e3.js.map