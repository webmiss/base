(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-658b731e"],{"58fd":function(t,a,e){"use strict";var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.actions.length?e("el-row",{staticClass:"action"},[e("el-button-group",t._l(t.actions,(function(a){return e("el-button",{key:a.name,attrs:{icon:a.ico},on:{click:function(e){return t.openAction(a.action)}}},[t._v(t._s(a.name))])})),1)],1):t._e()},s=[],i=e("7c2f"),n={name:"ImageView",props:{url:{type:String,default:""}},data:function(){return{actions:[]}},mounted:function(){if(!this.url)return i["a"].toast("验证菜单不能为空!");this.getAction(this.url)},methods:{getAction:function(t){var a=this;i["a"].post("Usermain/getMenusAction",{token:i["a"].storage.getItem("token"),url:t},(function(t){var e=t.data;0==e.code&&(a.actions=e.menuAction)}))},openAction:function(t){this.$emit("action",t)}}},l=n,r=e("2877"),d=Object(r["a"])(l,o,s,!1,null,null,null);a["a"]=d.exports},"6a53":function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("Action",{attrs:{url:"SysUser"},on:{action:t.openAction}}),e("el-row",{staticClass:"body"},[e("el-table",{attrs:{data:t.pageData.list,stripe:""},on:{"selection-change":t.getSelect}},[e("el-table-column",{attrs:{type:"selection",width:"45"}}),e("el-table-column",{attrs:{prop:"uid",label:"UID",width:"170"}}),e("el-table-column",{attrs:{label:"账号",width:"120"},scopedSlots:t._u([{key:"default",fn:function(a){return[t._v("\n         "+t._s(a.row.tel||a.row.email||a.row.uname)+" \n        ")]}}])}),e("el-table-column",{attrs:{label:"登录时间",width:"160"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-popover",{attrs:{trigger:"hover",placement:"top"}},[e("p",[t._v("注册: "+t._s(a.row.rtime||"无"))]),e("p",[t._v("修改: "+t._s(a.row.utime||"无"))]),e("p",[t._v("登录: "+t._s(a.row.ltime||"无"))]),e("div",{attrs:{slot:"reference"},slot:"reference"},[e("el-tag",{attrs:{size:"medium"}},[t._v(t._s(a.row.ltime||"无"))])],1)])]}}])}),e("el-table-column",{attrs:{label:"状态",width:"70"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-switch",{attrs:{"inactive-color":"#CCC"},on:{change:function(e){return t.setState("state",a.row)}},model:{value:a.row.state,callback:function(e){t.$set(a.row,"state",e)},expression:"scope.row.state"}})]}}])}),e("el-table-column",{attrs:{label:"用户信息"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.nickname?e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.eidtInfo(a.row)}}},[t._v(t._s(a.row.nickname))]):e("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(e){return t.eidtInfo(a.row)}}},[t._v("用户信息")])]}}])})],1)],1),e("el-row",{staticClass:"page"},[e("el-pagination",{attrs:{background:"",layout:"prev, pager, next, total",total:t.pageData.total,"current-page":t.pageData.page,"page-size":t.pageData.limit},on:{"current-change":t.page}})],1),e("el-dialog",{attrs:{title:"搜索",visible:t.seaData.show,center:"",width:"420px"},on:{"update:visible":function(a){return t.$set(t.seaData,"show",a)}}},[e("el-form",{attrs:{model:t.seaData.form,"label-width":t.LabelWidth}},[e("el-form-item",{attrs:{label:"账号"}},[e("el-input",{attrs:{placeholder:"用户名/手机号码/邮箱"},model:{value:t.seaData.form.uname,callback:function(a){t.$set(t.seaData.form,"uname",a)},expression:"seaData.form.uname"}})],1)],1),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.subSea()}}},[t._v("搜 索")])],1)],1),e("el-dialog",{attrs:{title:"添加",visible:t.addData.show,center:"",width:"420px","close-on-click-modal":!1},on:{"update:visible":function(a){return t.$set(t.addData,"show",a)}}},[e("el-form",{attrs:{model:t.addData.form,"label-width":t.LabelWidth}},[e("el-form-item",{attrs:{label:"手机"}},[e("el-input",{attrs:{maxlength:"11",placeholder:"输入手机号码"},model:{value:t.addData.form.tel,callback:function(a){t.$set(t.addData.form,"tel",a)},expression:"addData.form.tel"}})],1),e("el-form-item",{attrs:{label:"密码"}},[e("el-input",{attrs:{maxlength:"16",placeholder:"默认密码"},model:{value:t.addData.form.passwd,callback:function(a){t.$set(t.addData.form,"passwd",a)},expression:"addData.form.passwd"}})],1)],1),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.subAdd()}}},[t._v("添 加")])],1)],1),e("el-dialog",{attrs:{title:"编辑",visible:t.editData.show,center:"",width:"420px","close-on-click-modal":!1},on:{"update:visible":function(a){return t.$set(t.editData,"show",a)}}},[e("el-form",{attrs:{model:t.editData.form,"label-width":t.LabelWidth}},[e("el-form-item",{attrs:{label:"手机"}},[e("el-input",{attrs:{maxlength:"11",placeholder:"输入手机号码"},model:{value:t.editData.form.tel,callback:function(a){t.$set(t.editData.form,"tel",a)},expression:"editData.form.tel"}})],1),e("el-form-item",{attrs:{label:"密码"}},[e("el-input",{attrs:{maxlength:"16",placeholder:"重置密码"},model:{value:t.editData.form.passwd,callback:function(a){t.$set(t.editData.form,"passwd",a)},expression:"editData.form.passwd"}})],1)],1),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.subEdit()}}},[t._v("保 存")])],1)],1),e("el-dialog",{attrs:{title:"删除",visible:t.delData.show,center:"",width:"320px"},on:{"update:visible":function(a){return t.$set(t.delData,"show",a)}}},[e("div",[t._v("是否删除已选择数据？")]),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.subDel()}}},[t._v("彻底删除")])],1)]),e("el-dialog",{attrs:{title:"用户信息",visible:t.infoData.show,center:"",width:"420px","close-on-click-modal":!1},on:{"update:visible":function(a){return t.$set(t.infoData,"show",a)}}},[e("el-form",{attrs:{model:t.infoData.form,"label-width":t.LabelWidth}},[e("el-form-item",{attrs:{label:"昵称"}},[e("el-input",{attrs:{placeholder:"用户昵称",maxlength:"8"},model:{value:t.infoData.form.nickname,callback:function(a){t.$set(t.infoData.form,"nickname",a)},expression:"infoData.form.nickname"}})],1),e("el-form-item",{attrs:{label:"姓名"}},[e("el-input",{attrs:{placeholder:"请输入真实姓名",maxlength:"8"},model:{value:t.infoData.form.name,callback:function(a){t.$set(t.infoData.form,"name",a)},expression:"infoData.form.name"}})],1),e("el-form-item",{attrs:{label:"性别"}},[e("el-radio-group",{model:{value:t.infoData.form.gender,callback:function(a){t.$set(t.infoData.form,"gender",a)},expression:"infoData.form.gender"}},[e("el-radio",{attrs:{label:"男"}}),e("el-radio",{attrs:{label:"女"}})],1)],1),e("el-form-item",{attrs:{label:"生日"}},[e("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:t.infoData.form.birthday,callback:function(a){t.$set(t.infoData.form,"birthday",a)},expression:"infoData.form.birthday"}})],1),e("el-form-item",{attrs:{label:"职务"}},[e("el-input",{attrs:{placeholder:"请输入职务",maxlength:"8"},model:{value:t.infoData.form.position,callback:function(a){t.$set(t.infoData.form,"position",a)},expression:"infoData.form.position"}})],1)],1),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(a){return t.subInfo()}}},[t._v("更新")])],1)],1)],1)},s=[],i=(e("7f7f"),e("7c2f")),n=e("58fd"),l={components:{Action:n["a"]},data:function(){return{LabelWidth:"80px",selectData:[],pageData:{list:[],total:0,page:1,limit:15},seaData:{show:!1,form:{uname:""}},addData:{show:!1,form:{tel:"",passwd:""}},editData:{show:!1,form:{tel:"",passwd:""}},delData:{show:!1,id:""},infoData:{show:!1,uid:"",form:{}}}},mounted:function(){this.loadData()},methods:{page:function(t){this.pageData.page=t,this.loadData()},getSelect:function(t){this.selectData=t},getEdit:function(t){if(this.selectData.length>0)for(var a in this.editData.show=!0,t)this.editData.form[a]=this.selectData[0][a]||"";else i["a"].toast("请选择数据!")},openAction:function(t){if("list"==t)this.seaData.form={role:""},this.pageData.page=1,this.loadData();else if("sea"==t)this.seaData.show=!0;else if("add"==t)this.addData.show=!0;else if("edit"==t)this.getEdit({uid:"",tel:"",passwd:""});else if("del"==t)if(this.selectData.length>0){this.delData.show=!0;for(var a=this.selectData,e="",o=0;o<a.length;o++)e+=a[o].uid+",";this.delData.id=e}else i["a"].toast("请选择数据!")},loadData:function(){var t=this,a=i["a"].loading();i["a"].post("Sysuser/list",{token:i["a"].storage.getItem("token"),page:this.pageData.page,limit:this.pageData.limit,data:JSON.stringify(this.seaData.form)},(function(e){a.clear();var o=e.data;0!=o.code?i["a"].toast(o.msg,"error"):(t.pageData.list=o.list,t.pageData.total=o.total)}))},subSea:function(){this.seaData.show=!1,this.pageData.page=1,this.loadData()},subAdd:function(){var t=this;this.addData.show=!1;var a=JSON.stringify(this.addData.form),e=i["a"].loading();i["a"].post("Sysuser/add",{token:i["a"].storage.getItem("token"),data:a},(function(a){var o=a.data;0!==o.code?(e.clear(),i["a"].toast(o.msg,"error")):(i["a"].toast(o.msg,"success"),t.loadData())}))},subEdit:function(){var t=this;this.editData.show=!1;var a=this.editData.form.uid,e=JSON.stringify(this.editData.form),o=i["a"].loading();i["a"].post("Sysuser/edit",{token:i["a"].storage.getItem("token"),uid:a,data:e},(function(a){var e=a.data;0!==e.code?(o.clear(),i["a"].toast(e.msg,"error")):(i["a"].toast(e.msg,"success"),t.loadData())}))},subDel:function(){var t=this;this.delData.show=!1;var a=i["a"].loading();i["a"].post("Sysuser/del",{token:i["a"].storage.getItem("token"),data:this.delData.id},(function(e){var o=e.data;0!==o.code?(a.clear(),i["a"].toast(o.msg,"error")):(i["a"].toast(o.msg,"success"),t.loadData())}))},setState:function(t,a){var e=a["state"]?1:0,o=i["a"].loading();i["a"].post("Sysuser/state/"+t,{token:i["a"].storage.getItem("token"),uid:a.uid,state:e},(function(t){o.clear();var a=t.data;0!==a.code?i["a"].toast(a.msg,"error"):i["a"].toast(a.msg,"success")}))},eidtInfo:function(t){this.infoData.show=!0,this.infoData.uid=t.uid,this.infoData.form={nickname:t.nickname,name:t.name,gender:t.gender,birthday:t.birthday,position:t.position}},subInfo:function(){var t=this;this.infoData.show=!1;var a=this.infoData.uid,e=JSON.stringify(this.infoData.form),o=i["a"].loading();i["a"].post("Sysuser/uinfo",{token:i["a"].storage.getItem("token"),uid:a,data:e},(function(a){var e=a.data;0!==e.code?(o.clear(),t.$message.error(e.msg)):(t.$message.success(e.msg),t.loadData())}))}}},r=l,d=e("2877"),c=Object(d["a"])(r,o,s,!1,null,"5d63fe37",null);a["default"]=c.exports}}]);