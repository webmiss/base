(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d539980"],{"1dbb":function(t,e,a){"use strict";a("a6f2")},2954:function(t,e,a){},"2bc4":function(t,e,a){"use strict";a("7535")},3049:function(t,e,a){},3950:function(t,e,a){"use strict";var n=a("7a23");Object(n["R"])("data-v-47839b64");var i={ref:"form"};function c(t,e,a,c,u,r){return Object(n["F"])(),Object(n["j"])("div",i,[Object(n["N"])(t.$slots,"default")],512)}Object(n["R"])(null);var u=Object(n["p"])({name:"Form",props:{labelWidth:{type:String,default:"90px"},labelHeight:{type:String,default:"40px"}},mounted:function(){this.init()},methods:{init:function(){for(var t=this.$refs.form,e=t.getElementsByTagName("label"),a=t.getElementsByClassName("wm-form_item_body"),n=0;n<e.length;n++)e[n].style.width=this.labelWidth,a[n].style.marginLeft=this.labelWidth,e[n].style.height=this.labelHeight}}});u.render=c,u.__scopeId="data-v-47839b64";e["a"]=u},"4d9f":function(t,e,a){},"61ae":function(t,e,a){"use strict";var n=a("7a23");function i(t,e,a,i,c,u){return Object(n["F"])(),Object(n["j"])("div",{class:"wm-upload",onClick:e[1]||(e[1]=function(e){return t.upImage()}),title:t.title},[Object(n["N"])(t.$slots,"default")],8,["title"])}a("a9e3");var c=a("839f"),u=a("101e"),r=a("8de7"),o=function(t,e){try{var a=plus.camera.getCamera();a.captureImage((function(e){plus.io.resolveLocalFileSystemURL(e,(function(e){e.file((function(e){t(e)}))}),(function(){return Object(u["a"])("读取拍照失败!")}))}),e)}catch(i){var n=document.createElement("input");n.setAttribute("type","file"),n.setAttribute("style","display: none"),document.body.appendChild(n),n.click(),n.onchange=function(){t(n.files[0])}}},l=function(t,e,a){var n=e.width||0,i=e.height||0,c=e.cut||!0,u=e.quality||.8,r=e.ext||"jpg",o={jpg:"image/jpeg",png:"image/png",gif:"image/gif"},l=1,d=1,b=0,f=0,s=1,m=l/d,h=document.createElement("canvas"),p=h.getContext("2d"),g=new Image;g.src=t,g.onload=function(){var t=this;m=t.width/t.height,n>0&&0==i?(l=n<t.width?n:t.width,d=n<t.width?Math.round(n/m):Math.round(t.width/m),n=l,i=d):0==n&&i>0?(l=i<t.height?Math.round(i*m):Math.round(t.height*m),d=i<t.height?i:t.height,n=l,i=d):0==n&&0==i?(l=t.width,d=t.height,n=l,i=d):(s=n/i,m>s?n<t.width?(l=c?Math.round(i*m):n,d=c?i:Math.round(n/m)):(l=c?Math.round(t.height*m):t.width,d=c?t.height:Math.round(t.width/m)):i<t.height?(l=c?n:Math.round(i*m),d=c?Math.round(n/m):i):(l=c?t.width:Math.round(t.height*m),d=c?Math.round(t.width/m):t.height)),h.width=n,h.height=i,b=Math.round(n-l)/2,f=Math.round(i-d)/2,p.drawImage(this,b,f,l,d);var e=h.toDataURL(o[r],u);a(e)}},d=function(t,e,a){try{var n=new plus.io.FileReader;n.readAsDataURL(t),n.onloadend=function(){e.ext||("image/jpeg"==t.type?e.ext="jpg":"image/png"==t.type?e.ext="png":"image/gif"==t.type&&(e.ext="gif")),l(this.result,e,a)}}catch(c){var i=new FileReader;i.readAsDataURL(t),i.onloadend=function(){e.ext||("image/jpeg"==t.type?e.ext="jpg":"image/png"==t.type?e.ext="png":"image/gif"==t.type&&(e.ext="gif")),l(this.result,e,a)}}},b=Object(n["p"])({name:"ImgUpLoad",props:{url:{type:String,default:""},width:{type:Number,default:200},height:{type:Number,default:200},param:{type:Object,default:{}},title:{type:String,default:"上传图片"}},methods:{upImage:function(){var t=this;o((function(e){d(e,{width:t.width,height:t.height},(function(e){if(!t.url)return Object(u["a"])("上传Url地址为空!");var a=Object(c["a"])();t.param.base64=e,Object(r["a"])(t.url,t.param,(function(e){a.clear();var n=e.data;return t.$emit("upload",n),Object(u["a"])(n.msg)}))}))}))}}});a("1dbb");b.render=i,b.__scopeId="data-v-3d23edae";e["a"]=b},"68b4":function(t,e,a){"use strict";a("b0c0");var n=a("7a23");Object(n["R"])("data-v-3e143268");var i={class:"name"};function c(t,e,a,c,u,r){return Object(n["F"])(),Object(n["j"])("div",null,[(Object(n["F"])(!0),Object(n["j"])(n["b"],null,Object(n["M"])(t.data,(function(e,a){return Object(n["F"])(),Object(n["j"])("div",{class:"wm-radio_item",key:a,onClick:function(a){return t.$emit("update:value",e.val)}},[Object(n["o"])("div",{class:["checked",e.checked?"active":""]},null,2),Object(n["o"])("div",i,Object(n["T"])(e.name),1)],8,["onClick"])})),128))])}Object(n["R"])(null);var u=a("b85c"),r=Object(n["p"])({name:"Radio",props:{data:{type:Array,default:[]},value:{type:String,default:""}},watch:{value:function(t){this.radioClick(t)}},mounted:function(){this.value&&this.radioClick(this.value)},methods:{radioClick:function(t){var e,a,n=Object(u["a"])(this.data);try{for(n.s();!(a=n.n()).done;)e=a.value,e.checked=!1,e.val==t&&(e.checked=!0)}catch(i){n.e(i)}finally{n.f()}}}});a("b868");r.render=c,r.__scopeId="data-v-3e143268";e["a"]=r},"727d":function(t,e,a){},7535:function(t,e,a){},8801:function(t,e,a){},"8f77":function(t,e,a){"use strict";a.r(e);a("b0c0");var n=a("7a23");Object(n["R"])("data-v-af8acb28");var i=Object(n["n"])("保存设置");function c(t,e,a,c,u,r){var o=Object(n["O"])("wm-img"),l=Object(n["O"])("wm-img-upload"),d=Object(n["O"])("wm-form-item"),b=Object(n["O"])("wm-input"),f=Object(n["O"])("wm-radio"),s=Object(n["O"])("wm-date"),m=Object(n["O"])("wm-button"),h=Object(n["O"])("wm-form"),p=Object(n["O"])("wm-main");return Object(n["F"])(),Object(n["j"])(p,null,{default:Object(n["eb"])((function(){return[Object(n["o"])(h,{class:"max_width"},{default:Object(n["eb"])((function(){return[Object(n["o"])(d,{label:"头像"},{default:Object(n["eb"])((function(){return[Object(n["o"])(l,{url:t.upload.url,param:t.upload.param,onUpload:t.upImg},{default:Object(n["eb"])((function(){return[Object(n["o"])(o,{width:"80px",height:"80px",radius:"50%",url:t.form.img},null,8,["url"])]})),_:1},8,["url","param","onUpload"])]})),_:1}),Object(n["o"])(d,{label:"昵称"},{default:Object(n["eb"])((function(){return[Object(n["o"])(b,{value:t.form.nickname,"onUpdate:value":e[1]||(e[1]=function(e){return t.form.nickname=e}),maxlength:"12",placeholder:"用户昵称"},null,8,["value"])]})),_:1}),Object(n["o"])(d,{label:"姓名"},{default:Object(n["eb"])((function(){return[Object(n["o"])(b,{value:t.form.name,"onUpdate:value":e[2]||(e[2]=function(e){return t.form.name=e}),maxlength:"8",placeholder:"填写姓名"},null,8,["value"])]})),_:1}),Object(n["o"])(d,{label:"性别"},{default:Object(n["eb"])((function(){return[Object(n["o"])(f,{data:t.gender,value:t.form.gender,"onUpdate:value":e[3]||(e[3]=function(e){return t.form.gender=e})},null,8,["data","value"])]})),_:1}),Object(n["o"])(d,{label:"生日"},{default:Object(n["eb"])((function(){return[Object(n["o"])(s,{value:t.form.birthday,"onUpdate:value":e[4]||(e[4]=function(e){return t.form.birthday=e})},null,8,["value"])]})),_:1}),Object(n["o"])(d,{label:"职务"},{default:Object(n["eb"])((function(){return[Object(n["o"])(b,{value:t.form.position,"onUpdate:value":e[5]||(e[5]=function(e){return t.form.position=e}),maxlength:"8",placeholder:"职务、职称"},null,8,["value"])]})),_:1}),Object(n["o"])(d,{type:"botton"},{default:Object(n["eb"])((function(){return[Object(n["o"])(m,{onClick:e[6]||(e[6]=function(e){return t.onSubmit()})},{default:Object(n["eb"])((function(){return[i]})),_:1})]})),_:1})]})),_:1})]})),_:1})}Object(n["R"])(null);var u=a("5502"),r=a("839f"),o=a("101e"),l=a("8de7"),d=a("a5ab"),b=a("b288"),f=a("3950"),s=a("d4fc"),m=a("edb5"),h=a("68b4"),p=a("f64e"),g=a("903b"),j=a("947a"),O=a("61ae"),v=Object(n["p"])({components:{wmMain:b["a"],wmForm:f["a"],wmFormItem:s["a"],wmInput:m["a"],wmRadio:h["a"],wmDate:p["a"],wmButton:g["a"],wmImg:j["a"],wmImgUpload:O["a"]},data:function(){var t=Object(u["b"])(),e=t.state,a={img:"",nickname:"",name:"",gender:"男",birthday:"",position:""},n=[{name:"男",val:"男"},{name:"女",val:"女"}],i={url:"userinfo/upimg",param:{token:d["a"].getItem("token")}};return{state:e,form:a,gender:n,upload:i}},mounted:function(){d["a"].getItem("token")&&this.loadData()},methods:{loadData:function(){var t=this,e=Object(r["a"])();Object(l["a"])("userinfo/list",{token:d["a"].getItem("token")},(function(a){e.clear();var n=a.data;if(0!=n.code)return Object(o["a"])(n.msg);t.form=n.list}),(function(){Object(o["a"])("网络加载失败!")}))},onSubmit:function(){var t=this,e=JSON.stringify(this.form),a=Object(r["a"])();Object(l["a"])("userinfo/edit",{token:d["a"].getItem("token"),data:e},(function(e){a.clear();var n=e.data;return 0==n.code&&(t.state.uInfo=n.uinfo),Object(o["a"])(n.msg)}))},upImg:function(t){return 0==t.code&&(this.form.img=t.img,this.state.uInfo.img=t.img),Object(o["a"])(t.msg)}}});a("a732");v.render=c,v.__scopeId="data-v-af8acb28";e["default"]=v},"947a":function(t,e,a){"use strict";var n=a("7a23");Object(n["R"])("data-v-e63bca66");var i={key:1,class:"wm-img_null"};function c(t,e,a,c,u,r){return Object(n["F"])(),Object(n["j"])("div",{ref:"img",class:"wm-img",title:t.title},[t.url?(Object(n["F"])(),Object(n["j"])("div",{key:0,style:{backgroundImage:"url("+t.url+")",backgroundSize:t.size}},null,4)):(Object(n["F"])(),Object(n["j"])("div",i,[Object(n["o"])("i",{class:"ui ui_img",style:{fontSize:t.icoSize}},null,4)]))],8,["title"])}Object(n["R"])(null);var u=Object(n["p"])({name:"Img",props:{url:{type:String,default:""},size:{type:String,default:"cover"},width:{type:String,default:"90px"},height:{type:String,default:"40px"},radius:{type:String,default:"0px"},title:{type:String,default:""},icoSize:{type:String,default:"32px"}},mounted:function(){var t=this.$refs.img;t.style.width=this.width,t.style.height=this.height,t.style.lineHeight=this.height,t.style.borderRadius=this.radius}});a("da0c");u.render=c,u.__scopeId="data-v-e63bca66";e["a"]=u},"99b6":function(t,e,a){"use strict";a("8801")},a5ed:function(t,e,a){"use strict";a("3049")},a6f2:function(t,e,a){},a732:function(t,e,a){"use strict";a("bd9c")},b288:function(t,e,a){"use strict";var n=a("7a23");function i(t,e,a,i,c,u){return Object(n["F"])(),Object(n["j"])("div",{class:"wm-main wm-main_y",style:{width:"calc(100% - "+2*t.padding+"px)",height:"calc(100% - "+2*t.padding+"px)",padding:t.padding+"px"}},[Object(n["N"])(t.$slots,"default")],4)}a("a9e3");var c=Object(n["p"])({name:"Main",props:{padding:{type:Number,default:16}}});a("99b6");c.render=i,c.__scopeId="data-v-49054b17";e["a"]=c},b868:function(t,e,a){"use strict";a("2954")},bd9c:function(t,e,a){},c1d3:function(t,e,a){"use strict";a("4d9f")},d4fc:function(t,e,a){"use strict";var n=a("7a23");Object(n["R"])("data-v-fd933aea");var i={class:"wm-form_item_label"},c={class:"wm-form_item_body"};function u(t,e,a,u,r,o){return Object(n["F"])(),Object(n["j"])("div",{class:"wm-form_item",style:{margin:t.margin}},[Object(n["o"])("label",i,Object(n["T"])(t.label),1),Object(n["o"])("div",c,[Object(n["N"])(t.$slots,"default")])],4)}Object(n["R"])(null);var r=Object(n["p"])({name:"FormItem",props:{type:{type:String,default:"label"},label:{type:String,default:""}},data:function(){var t="";return{margin:t}},mounted:function(){"label"==this.type?this.margin="8px 0":"botton"==this.type&&(this.margin="24px 0")}});a("c1d3");r.render=u,r.__scopeId="data-v-fd933aea";e["a"]=r},da0c:function(t,e,a){"use strict";a("727d")},f64e:function(t,e,a){"use strict";var n=a("7a23");Object(n["R"])("data-v-5caede3d");var i={class:"wm-date_body"},c=Object(n["o"])("div",{class:"wm-date_arrow bottom"},null,-1);function u(t,e,a,u,r,o){var l=Object(n["O"])("wm-input");return Object(n["F"])(),Object(n["j"])("div",{class:"wm-date",style:{width:t.width}},[Object(n["o"])(l,{value:t.value,"onUpdate:value":e[1]||(e[1]=function(e){return t.value=e}),placeholder:t.placeholder},null,8,["value","placeholder"]),Object(n["o"])("div",i,[c,Object(n["o"])("div",{class:"wm-date_ct",onClick:e[2]||(e[2]=function(e){return t.getDate()})},"暂不更新,点击获取今天")])],4)}Object(n["R"])(null);var r=a("edb5"),o=function(t,e){var a=e?new Date(e):new Date;a.setDate(a.getDate()+t);var n=a.getFullYear(),i=a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,c=a.getDate()<10?"0"+a.getDate():a.getDate();return n+"-"+i+"-"+c},l=Object(n["p"])({name:"Date",components:{wmInput:r["a"]},props:{value:{type:String,default:""},width:{type:String,default:"160px"},placeholder:{type:String,default:"选择日期"}},mounted:function(){},methods:{getDate:function(){var t=o(0);this.$emit("update:value",t)}}});a("a5ed"),a("2bc4");l.render=u,l.__scopeId="data-v-5caede3d";e["a"]=l}}]);