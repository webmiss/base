(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c8672"],{5573:function(s,t,e){"use strict";e.r(t);var a=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",[e("el-row",{staticClass:"body mtop"},[e("el-form",{attrs:{model:s.form,"label-width":s.LabelWidth}},[e("el-form-item",{attrs:{label:"当前密码"}},[e("el-input",{staticStyle:{"max-width":"320px"},attrs:{type:"password","show-password":"",placeholder:"登录密码",maxlength:"32"},model:{value:s.form.passwd,callback:function(t){s.$set(s.form,"passwd",t)},expression:"form.passwd"}})],1),e("el-form-item",{attrs:{label:"新密码"}},[e("el-input",{staticStyle:{"max-width":"320px"},attrs:{type:"password","show-password":"",placeholder:"请输入新密码",maxlength:"32"},model:{value:s.form.passwd1,callback:function(t){s.$set(s.form,"passwd1",t)},expression:"form.passwd1"}})],1),e("el-form-item",{attrs:{label:"确认新密码"}},[e("el-input",{staticStyle:{"max-width":"320px"},attrs:{type:"password","show-password":"",placeholder:"确认密码",maxlength:"32"},model:{value:s.form.passwd2,callback:function(t){s.$set(s.form,"passwd2",t)},expression:"form.passwd2"}})],1),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:function(t){return s.onSubmit()}}},[s._v("修改并重新登录")])],1)],1)],1)],1)},r=[],o={data:function(){return{LabelWidth:"100px",form:{passwd:"",passwd1:"",passwd2:""}}},mounted:function(){},methods:{onSubmit:function(){var s=this,t=this.form.passwd,e=this.form.passwd1,a=this.form.passwd2,r=this.$reg("passwd",t),o=this.$reg("passwd",e);if(1!=r)return this.$message.error("原"+r);if(1!=o)return this.$message.error("新"+o);if(e!=a)return this.$message.error("两次密码不一致！");if(t==e)return this.$message.error("不能与原密码相同！");var i=this.$loading({text:"提交数据"});this.$ajax.post(this.$config.apiUrl+"Userpasswd/edit","token="+this.$storage.getItem("token")+"&passwd="+t+"&passwd1="+e).then((function(t){i.close();var e=t.data;if(0!=e.code)return s.$message.error(e.msg);s.$message.success(e.msg),s.$storage.setItem("token",""),s.$storage.setItem("uinfo",""),window.location.reload()}))}}},i=o,l=e("2877"),n=Object(l["a"])(i,a,r,!1,null,"5dff7036",null);t["default"]=n.exports}}]);
//# sourceMappingURL=chunk-2d0c8672.044bbd57.js.map