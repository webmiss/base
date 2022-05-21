"use strict";(self["webpackChunkwebmis_vue"]=self["webpackChunkwebmis_vue"]||[]).push([[674],{4480:function(e,t,l){l.d(t,{Z:function(){return s}});var a=l(6252),o=l(9963),n=l(3577);const i=["value"],u={key:0,class:"name"};function m(e,t,l,m,c,d){return(0,a.wg)(),(0,a.iD)("div",{class:"wm-checkbox",onClick:t[0]||(t[0]=(0,o.iM)((t=>e.click()),["stop"]))},[(0,a._)("div",{class:(0,n.C_)(["checked",e.show?"active":""])},[(0,a._)("input",{type:"checkbox",class:"checkbox",value:e.value},null,8,i)],2),e.label?((0,a.wg)(),(0,a.iD)("div",u,(0,n.zw)(e.label),1)):(0,a.kq)("",!0)])}var c=(0,a.aZ)({name:"Checkbox",props:{value:{default:""},label:{type:String,default:""},checked:{type:Boolean,default:!1},disclick:{type:Boolean,default:!1}},watch:{checked(e){this.show=e}},data(){const e=!1;return{show:e}},mounted(){this.show=this.checked},methods:{click(){this.disclick||this.$emit("update:checked",this.show=!this.show)}}}),d=l(3744);const r=(0,d.Z)(c,[["render",m],["__scopeId","data-v-5ec36272"]]);var s=r},6675:function(e,t,l){l.d(t,{Z:function(){return c}});var a=l(6252);const o={ref:"form"};function n(e,t,l,n,i,u){return(0,a.wg)(),(0,a.iD)("div",o,[(0,a.WI)(e.$slots,"default")],512)}var i=(0,a.aZ)({name:"Form",props:{labelWidth:{type:String,default:"90px"},labelHeight:{type:String,default:"40px"}},mounted(){this.init()},methods:{init(){const e=this.$refs.form,t=e.getElementsByTagName("label");e.getElementsByClassName("wm-form_item_body");for(let l=0;l<t.length;l++)t[l].style.width=this.labelWidth,t[l].style.height=this.labelHeight}}}),u=l(3744);const m=(0,u.Z)(i,[["render",n]]);var c=m},7685:function(e,t,l){l.d(t,{Z:function(){return c}});var a=l(6252),o=l(3577);function n(e,t,l,n,i,u){return(0,a.wg)(),(0,a.iD)("div",{class:"wm-form_item",style:(0,o.j5)({margin:e.margin})},["none"!=e.label?((0,a.wg)(),(0,a.iD)("label",{key:0,class:"wm-form_item_label",style:(0,o.j5)({height:e.height})},(0,o.zw)(e.label),5)):(0,a.kq)("",!0),(0,a._)("div",{class:"wm-form_item_body",style:(0,o.j5)({height:e.height})},[(0,a.WI)(e.$slots,"default",{},void 0,!0)],4)],4)}var i=(0,a.aZ)({name:"FormItem",props:{type:{type:String,default:"label"},label:{type:String,default:""},height:{type:String,default:"40px"}},data(){const e="";return{margin:e}},mounted(){"label"==this.type?this.margin="8px 0":"botton"==this.type&&(this.margin="24px 0")}}),u=l(3744);const m=(0,u.Z)(i,[["render",n],["__scopeId","data-v-20c2801c"]]);var c=m},3530:function(e,t,l){l.d(t,{Z:function(){return r}});var a=l(6252),o=l(3577);const n=["onClick"],i={class:"name"};function u(e,t,l,u,m,c){return(0,a.wg)(),(0,a.iD)("div",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.data,((t,l)=>((0,a.wg)(),(0,a.iD)("div",{class:"wm-radio_item",key:l,onClick:l=>e.$emit("update:value",t.value)},[(0,a._)("div",{class:(0,o.C_)(["checked",t.value==e.value?"active":""])},null,2),(0,a._)("div",i,(0,o.zw)(t.label),1)],8,n)))),128))])}var m=(0,a.aZ)({name:"Radio",props:{value:{type:String,default:""},data:{type:Array,default:[]}},methods:{}}),c=l(3744);const d=(0,c.Z)(m,[["render",u],["__scopeId","data-v-3940f950"]]);var r=d},5219:function(e,t,l){l.d(t,{Z:function(){return c}});var a=l(6252),o=l(3577);function n(e,t,l,n,i,u){return(0,a.wg)(),(0,a.iD)("div",{class:"wm-main scrollbar",style:(0,o.j5)({width:"calc(100% - "+2*e.padding+"px)",height:"calc(100% - "+2*e.padding+"px)",padding:e.padding+"px"})},[(0,a.WI)(e.$slots,"default",{},void 0,!0)],4)}var i=(0,a.aZ)({name:"Main",props:{padding:{type:Number,default:10}}}),u=l(3744);const m=(0,u.Z)(i,[["render",n],["__scopeId","data-v-af90e5fa"]]);var c=m},1363:function(e,t,l){l.r(t),l.d(t,{default:function(){return I}});var a=l(6252);const o=(0,a.Uk)("保存设置");function n(e,t,l,n,i,u){const m=(0,a.up)("wm-img"),c=(0,a.up)("wm-img-upload"),d=(0,a.up)("wm-form-item"),r=(0,a.up)("wm-input"),s=(0,a.up)("wm-select"),p=(0,a.up)("wm-radio"),h=(0,a.up)("wm-checkbox"),f=(0,a.up)("wm-switch"),w=(0,a.up)("wm-tinymce"),v=(0,a.up)("wm-button"),g=(0,a.up)("wm-form"),b=(0,a.up)("wm-main");return(0,a.wg)(),(0,a.j4)(b,null,{default:(0,a.w5)((()=>[(0,a.Wm)(g,null,{default:(0,a.w5)((()=>[(0,a.Wm)(d,{label:"Upload",height:"auto"},{default:(0,a.w5)((()=>[(0,a.Wm)(c,{width:200,height:200,url:e.upload.url,param:e.upload.param,onUpload:t[0]||(t[0]=t=>e.upImg(t,"logo"))},{default:(0,a.w5)((()=>[(0,a.Wm)(m,{width:"80px",height:"80px",radius:"50%",url:e.form.logo},null,8,["url"])])),_:1},8,["url","param"])])),_:1}),(0,a.Wm)(d,{label:"Input"},{default:(0,a.w5)((()=>[(0,a.Wm)(r,{value:e.form.input,"onUpdate:value":t[1]||(t[1]=t=>e.form.input=t),maxlength:"32",placeholder:"请输名称"},null,8,["value"])])),_:1}),(0,a.Wm)(d,{label:"Select"},{default:(0,a.w5)((()=>[(0,a.Wm)(s,{value:e.form.select1,"onUpdate:value":t[2]||(t[2]=t=>e.form.select1=t),placeholder:"选择所属",data:[{label:"Option1",value:"option1"},{label:"Option2",value:"option2"}]},null,8,["value"])])),_:1}),(0,a.Wm)(d,{label:"Select"},{default:(0,a.w5)((()=>[(0,a.Wm)(s,{value:e.form.select2,"onUpdate:value":t[3]||(t[3]=t=>e.form.select2=t),data:[{label:"Option1",value:"option1"},{label:"Option2",value:"option2"}]},null,8,["value"])])),_:1}),(0,a.Wm)(d,{label:"Radio"},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{value:e.form.radio,"onUpdate:value":t[4]||(t[4]=t=>e.form.radio=t),data:[{label:"男",value:"男"},{label:"女",value:"女"}]},null,8,["value"])])),_:1}),(0,a.Wm)(d,{label:"Checkbox"},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.checkbox,((e,t)=>((0,a.wg)(),(0,a.j4)(h,{key:t,label:e.label,value:e.value,checked:e.checked,"onUpdate:checked":t=>e.checked=t},null,8,["label","value","checked","onUpdate:checked"])))),128))])),_:1}),(0,a.Wm)(d,{label:"Switch"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{value:e.form.switch,"onUpdate:value":t[5]||(t[5]=t=>e.form.switch=t)},null,8,["value"])])),_:1}),(0,a.Wm)(d,{label:"none",height:"auto"},{default:(0,a.w5)((()=>[(0,a.Wm)(w,{value:e.form.tinymce,"onUpdate:value":t[6]||(t[6]=t=>e.form.tinymce=t),menubar:!0,height:280,upload:e.tinymce.upload},null,8,["value","upload"])])),_:1}),(0,a.Wm)(d,{type:"botton"},{default:(0,a.w5)((()=>[(0,a.Wm)(v,{onClick:t[7]||(t[7]=t=>e.onSubmit())},{default:(0,a.w5)((()=>[o])),_:1})])),_:1})])),_:1})])),_:1})}var i=l(3907),u=l(8907),m=l(6492),c=l(5783),d=l(2367),r=l(5219),s=l(6675),p=l(7685),h=l(6173),f=l(3331),w=l(4429),v=l(5451),g=l(2582),b=l(3530),k=l(4480),y=l(8931),_=l(3465),Z=(0,a.aZ)({components:{wmMain:r.Z,wmForm:s.Z,wmFormItem:p.Z,wmInput:h.Z,wmButton:f.Z,wmImg:w.Z,wmImgUpload:v.Z,wmSelect:g.Z,wmRadio:b.Z,wmCheckbox:k.Z,wmSwitch:y.Z,wmTinymce:_.Z},data(){const e=(0,i.oR)(),t=e.state,l={url:"sys_config/upimg",param:{name:"logo",token:d.Z.getItem("token")}},a={logo:"",input:"",select1:"option2",select2:"option1",radio:"女",switch:!0,tinymce:"<b>测试</b>"},o=[{label:"游戏",value:1,checked:!1},{label:"购物",value:2,checked:!0}],n={upload:{url:"/demo/tinymce/upImg",width:640}};return{state:t,upload:l,form:a,checkbox:o,tinymce:n}},mounted(){d.Z.getItem("token")&&this.loadData()},methods:{loadData(){const e=(0,u.Z)();(0,c.Z)("sys_config/list",{token:d.Z.getItem("token")},(t=>{e.clear();const l=t.data;if(0!=l.code)return(0,m.Z)(l.msg);setTimeout((()=>{this.form.tinymce="<b>测试1</b>",this.form.select2="option2",setTimeout((()=>{this.form.tinymce="<b>测试2</b>",setTimeout((()=>{this.form.tinymce="<b>测试3</b>"}),1e3)}),1e3)}),3e3)}))},onSubmit(){JSON.stringify(this.form);return console.log(JSON.stringify(this.form)),console.log(JSON.stringify(this.checkbox)),(0,m.Z)("请查看Console日志记录！")},upImg(e,t){return 0==e.code&&(this.form.logo=e.img),(0,m.Z)(e.msg)}}}),W=l(3744);const x=(0,W.Z)(Z,[["render",n]]);var I=x}}]);