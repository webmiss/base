(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-99db91c6"],{"26bf":function(t,e,n){"use strict";n("f038")},"59f9":function(t,e,n){"use strict";var o=n("7a23"),a=Object(o["hb"])("data-v-21db1201"),l=a((function(t,e,n,a,l,r){return Object(o["F"])(),Object(o["j"])("span",{class:"wm-action_close",style:{padding:t.size,backgroundColor:t.bgColor}},null,4)})),r=Object(o["p"])({name:"ActionClose",props:{size:{type:String,default:"11px"},bgColor:{type:String,default:"#F56C6C"}}});n("8dcc");r.render=l,r.__scopeId="data-v-21db1201";e["a"]=r},8141:function(t,e,n){},"8c89":function(t,e,n){"use strict";var o=n("7a23"),a=Object(o["hb"])("data-v-379632ca"),l=a((function(t,e,n,a,l,r){return Object(o["F"])(),Object(o["j"])("span",{class:"wm-action_add",style:{padding:t.size,backgroundColor:t.bgColor}},null,4)})),r=Object(o["p"])({name:"ActionAdd",props:{size:{type:String,default:"11px"},bgColor:{type:String,default:"#6FB737"}}});n("26bf");r.render=l,r.__scopeId="data-v-379632ca";e["a"]=r},"8dcc":function(t,e,n){"use strict";n("8141")},a434:function(t,e,n){"use strict";var o=n("23e7"),a=n("23cb"),l=n("a691"),r=n("50c4"),c=n("7b0b"),u=n("65f0"),i=n("8418"),d=n("1dde"),f=d("splice"),b=Math.max,s=Math.min,m=9007199254740991,O="Maximum allowed length exceeded";o({target:"Array",proto:!0,forced:!f},{splice:function(t,e){var n,o,d,f,j,h,p=c(this),v=r(p.length),w=a(t,v),g=arguments.length;if(0===g?n=o=0:1===g?(n=0,o=v-w):(n=g-2,o=s(b(l(e),0),v-w)),v+n-o>m)throw TypeError(O);for(d=u(p,o),f=0;f<o;f++)j=w+f,j in p&&i(d,f,p[j]);if(d.length=o,n<o){for(f=w;f<v-o;f++)j=f+o,h=f+n,j in p?p[h]=p[j]:delete p[h];for(f=v;f>v-o+n;f--)delete p[f-1]}else if(n>o)for(f=v-o;f>w;f--)j=f+o-1,h=f+n-1,j in p?p[h]=p[j]:delete p[h];for(f=0;f<n;f++)p[f+w]=arguments[f+2];return p.length=v-o+n,d}})},a6e8:function(t,e,n){"use strict";n.r(e);n("b0c0");var o=n("7a23"),a=Object(o["hb"])("data-v-5374c93c");Object(o["I"])("data-v-5374c93c");var l=Object(o["o"])("td",{width:"30"},"ID",-1),r=Object(o["o"])("td",{width:"30"},"FID",-1),c=Object(o["o"])("td",{width:"120"},"名称",-1),u=Object(o["o"])("td",{width:"80"},"权限",-1),i=Object(o["o"])("td",{width:"60",style:{"text-align":"center"}},"排序",-1),d=Object(o["o"])("td",null,"URL",-1),f=Object(o["o"])("td",null,"图标",-1),b=Object(o["n"])("设置"),s=Object(o["n"])("动作"),m={style:{"text-align":"center"}},O=Object(o["n"])("搜 索"),j=Object(o["n"])("添 加"),h=Object(o["n"])("保 存"),p=Object(o["n"])("是否删除已选择数据？"),v=Object(o["n"])("彻底删除"),w=Object(o["o"])("td",{width:"60"},"类型",-1),g=Object(o["o"])("td",null,"名称",-1),_=Object(o["o"])("td",null,"动作",-1),x=Object(o["o"])("td",{width:"100"},"权限",-1),k={width:"30"},U={class:"perm_an"},y={class:"perm_an"},D=Object(o["n"])("更 新");Object(o["G"])();var C=a((function(t,e,n,C,S,F){var I=Object(o["O"])("wm-table-title"),T=Object(o["O"])("wm-tag"),W=Object(o["O"])("wm-popover"),A=Object(o["O"])("wm-button"),R=Object(o["O"])("wm-table-tr"),J=Object(o["O"])("wm-table"),M=Object(o["O"])("wm-page"),P=Object(o["O"])("wm-input"),z=Object(o["O"])("wm-form-item"),L=Object(o["O"])("wm-form"),N=Object(o["O"])("wm-dialog"),E=Object(o["O"])("wm-row"),B=Object(o["O"])("wm-add"),$=Object(o["O"])("wm-close"),G=Object(o["O"])("wm-main");return Object(o["F"])(),Object(o["j"])(G,null,{default:a((function(){return[Object(o["o"])(J,{class:"table",ref:"Table",data:t.page.list},{default:a((function(){return[Object(o["o"])(I,null,{default:a((function(){return[l,r,c,u,i,d,f]})),_:1}),(Object(o["F"])(!0),Object(o["j"])(o["b"],null,Object(o["M"])(t.page.list,(function(e,n){return Object(o["F"])(),Object(o["j"])(R,{key:n,value:e.id+""},{default:a((function(){return[Object(o["o"])("td",null,Object(o["S"])(e.id),1),Object(o["o"])("td",null,Object(o["S"])(e.fid),1),Object(o["o"])("td",null,[Object(o["o"])(W,{type:"bottom",effect:"dark",width:"180px"},{body:a((function(){return[Object(o["o"])("p",null,"创建: "+Object(o["S"])(e.ctime||"无"),1),Object(o["o"])("p",null,"更新: "+Object(o["S"])(e.utime||"无"),1)]})),reference:a((function(){return[Object(o["o"])(T,{size:"medium"},{default:a((function(){return[Object(o["n"])(Object(o["S"])(e.title),1)]})),_:2},1024)]})),_:2},1024)]),Object(o["o"])("td",null,[e.controller&&!e.action?(Object(o["F"])(),Object(o["j"])(A,{key:0,type:"danger",height:"32px",onClick:function(n){return t.permData(e.id,e.title,e.controller,e.action)}},{default:a((function(){return[b]})),_:2},1032,["onClick"])):e.controller&&e.action?(Object(o["F"])(),Object(o["j"])(A,{key:1,height:"32px",onClick:function(n){return t.permData(e.id,e.title,e.controller,e.action)}},{default:a((function(){return[s]})),_:2},1032,["onClick"])):Object(o["k"])("",!0)]),Object(o["o"])("td",m,Object(o["S"])(e.sort),1),Object(o["o"])("td",null,Object(o["S"])(e.url),1),Object(o["o"])("td",null,Object(o["S"])(e.ico),1)]})),_:2},1032,["value"])})),128))]})),_:1},8,["data"]),Object(o["o"])(M,{page:t.page.page,limit:t.page.limit,total:t.page.total,"onUpdate:page":t.subPage},null,8,["page","limit","total","onUpdate:page"]),Object(o["o"])(N,{title:"搜索",width:"420px",show:t.sea.show,"onUpdate:show":e[5]||(e[5]=function(e){return t.sea.show=e})},{footer:a((function(){return[Object(o["o"])(A,{onClick:e[4]||(e[4]=function(e){return t.subSea()})},{default:a((function(){return[O]})),_:1})]})),default:a((function(){return[Object(o["o"])(L,{class:"form"},{default:a((function(){return[Object(o["o"])(z,{label:"FID"},{default:a((function(){return[Object(o["o"])(P,{value:t.sea.form.fid,"onUpdate:value":e[1]||(e[1]=function(e){return t.sea.form.fid=e}),placeholder:"FID"},null,8,["value"])]})),_:1}),Object(o["o"])(z,{label:"名称"},{default:a((function(){return[Object(o["o"])(P,{value:t.sea.form.title,"onUpdate:value":e[2]||(e[2]=function(e){return t.sea.form.title=e}),placeholder:"菜单名称"},null,8,["value"])]})),_:1}),Object(o["o"])(z,{label:"控制器"},{default:a((function(){return[Object(o["o"])(P,{value:t.sea.form.url,"onUpdate:value":e[3]||(e[3]=function(e){return t.sea.form.url=e}),placeholder:"菜单名称"},null,8,["value"])]})),_:1})]})),_:1})]})),_:1},8,["show"]),Object(o["o"])(N,{title:"添加",width:"540px",show:t.add.show,"onUpdate:show":e[13]||(e[13]=function(e){return t.add.show=e})},{footer:a((function(){return[Object(o["o"])(A,{onClick:e[12]||(e[12]=function(e){return t.subAdd()})},{default:a((function(){return[j]})),_:1})]})),default:a((function(){return[Object(o["o"])(L,{class:"form"},{default:a((function(){return[Object(o["o"])(z,{label:"所属"},{default:a((function(){return[Object(o["o"])(P,{value:t.add.form.fid,"onUpdate:value":e[6]||(e[6]=function(e){return t.add.form.fid=e}),maxlength:"3",maxWidth:"80px",placeholder:"FID"},null,8,["value"])]})),_:1}),Object(o["o"])(z,{label:"名称"},{default:a((function(){return[Object(o["o"])(P,{value:t.add.form.title,"onUpdate:value":e[7]||(e[7]=function(e){return t.add.form.title=e}),maxlength:"8",maxWidth:"320px",placeholder:"菜单名称"},null,8,["value"])]})),_:1}),Object(o["o"])(z,{label:"控制器"},{default:a((function(){return[Object(o["o"])(P,{value:t.add.form.controller,"onUpdate:value":e[8]||(e[8]=function(e){return t.add.form.controller=e}),maxlength:"2",placeholder:"例如: /admin/sysmenus"},null,8,["value"])]})),_:1}),Object(o["o"])(z,{label:"URL"},{default:a((function(){return[Object(o["o"])(P,{value:t.add.form.url,"onUpdate:value":e[9]||(e[9]=function(e){return t.add.form.url=e}),maxlength:"24",maxWidth:"320px",placeholder:"URL"},null,8,["value"])]})),_:1}),Object(o["o"])(z,{label:"图标样式"},{default:a((function(){return[Object(o["o"])(P,{value:t.add.form.ico,"onUpdate:value":e[10]||(e[10]=function(e){return t.add.form.ico=e}),maxlength:"32",maxWidth:"240px",placeholder:"图标样式"},null,8,["value"])]})),_:1}),Object(o["o"])(z,{label:"排序"},{default:a((function(){return[Object(o["o"])(P,{value:t.add.form.sort,"onUpdate:value":e[11]||(e[11]=function(e){return t.add.form.sort=e}),maxlength:"2",maxWidth:"240px",placeholder:"例如: 1、2、3"},null,8,["value"])]})),_:1})]})),_:1})]})),_:1},8,["show"]),Object(o["o"])(N,{title:"编辑",width:"540px",show:t.edit.show,"onUpdate:show":e[21]||(e[21]=function(e){return t.edit.show=e})},{footer:a((function(){return[Object(o["o"])(A,{onClick:e[20]||(e[20]=function(e){return t.subEdit()})},{default:a((function(){return[h]})),_:1})]})),default:a((function(){return[Object(o["o"])(L,{class:"form"},{default:a((function(){return[Object(o["o"])(z,{label:"所属"},{default:a((function(){return[Object(o["o"])(P,{value:t.edit.form.fid,"onUpdate:value":e[14]||(e[14]=function(e){return t.edit.form.fid=e}),maxlength:"3",maxWidth:"80px",placeholder:"FID"},null,8,["value"])]})),_:1}),Object(o["o"])(z,{label:"名称"},{default:a((function(){return[Object(o["o"])(P,{value:t.edit.form.title,"onUpdate:value":e[15]||(e[15]=function(e){return t.edit.form.title=e}),maxlength:"8",maxWidth:"320px",placeholder:"菜单名称"},null,8,["value"])]})),_:1}),Object(o["o"])(z,{label:"控制器"},{default:a((function(){return[Object(o["o"])(P,{value:t.edit.form.controller,"onUpdate:value":e[16]||(e[16]=function(e){return t.edit.form.controller=e}),maxlength:"2",placeholder:"例如: /admin/sysmenus"},null,8,["value"])]})),_:1}),Object(o["o"])(z,{label:"URL"},{default:a((function(){return[Object(o["o"])(P,{value:t.edit.form.url,"onUpdate:value":e[17]||(e[17]=function(e){return t.edit.form.url=e}),maxlength:"24",maxWidth:"320px",placeholder:"URL"},null,8,["value"])]})),_:1}),Object(o["o"])(z,{label:"图标样式"},{default:a((function(){return[Object(o["o"])(P,{value:t.edit.form.ico,"onUpdate:value":e[18]||(e[18]=function(e){return t.edit.form.ico=e}),maxlength:"32",maxWidth:"240px",placeholder:"图标样式"},null,8,["value"])]})),_:1}),Object(o["o"])(z,{label:"排序"},{default:a((function(){return[Object(o["o"])(P,{value:t.edit.form.sort,"onUpdate:value":e[19]||(e[19]=function(e){return t.edit.form.sort=e}),maxlength:"2",maxWidth:"240px",placeholder:"例如: 1、2、3"},null,8,["value"])]})),_:1})]})),_:1})]})),_:1},8,["show"]),Object(o["o"])(N,{title:"删除",width:"320px",show:t.del.show,"onUpdate:show":e[23]||(e[23]=function(e){return t.del.show=e})},{footer:a((function(){return[Object(o["o"])(A,{onClick:e[22]||(e[22]=function(e){return t.subDel()})},{default:a((function(){return[v]})),_:1})]})),default:a((function(){return[Object(o["o"])(E,null,{default:a((function(){return[p]})),_:1})]})),_:1},8,["show"]),Object(o["o"])(N,{width:"640px",title:t.perm.title,show:t.perm.show,"onUpdate:show":e[26]||(e[26]=function(e){return t.perm.show=e})},{footer:a((function(){return[Object(o["o"])(A,{onClick:e[25]||(e[25]=function(e){return t.subPerm()})},{default:a((function(){return[D]})),_:1})]})),default:a((function(){return[Object(o["o"])(J,null,{default:a((function(){return[Object(o["o"])(I,{checkbox:!1},{default:a((function(){return[w,g,_,x,Object(o["o"])("td",k,[Object(o["o"])("div",U,[Object(o["o"])(B,{onClick:e[24]||(e[24]=function(e){return t.permAdd()})})])])]})),_:1}),(Object(o["F"])(!0),Object(o["j"])(o["b"],null,Object(o["M"])(t.perm.list,(function(e,n){return Object(o["F"])(),Object(o["j"])(R,{checkbox:!1,key:n},{default:a((function(){return[Object(o["o"])("td",null,[Object(o["o"])(P,{value:e.type,"onUpdate:value":function(t){return e.type=t}},null,8,["value","onUpdate:value"])]),Object(o["o"])("td",null,[Object(o["o"])(P,{value:e.name,"onUpdate:value":function(t){return e.name=t}},null,8,["value","onUpdate:value"])]),Object(o["o"])("td",null,[Object(o["o"])(P,{value:e.action,"onUpdate:value":function(t){return e.action=t}},null,8,["value","onUpdate:value"])]),Object(o["o"])("td",null,[Object(o["o"])(P,{value:e.perm,"onUpdate:value":function(t){return e.perm=t}},null,8,["value","onUpdate:value"])]),Object(o["o"])("td",null,[Object(o["o"])("div",y,[Object(o["o"])($,{onClick:function(e){return t.permRemove(n)}},null,8,["onClick"])])])]})),_:2},1024)})),128))]})),_:1})]})),_:1},8,["title","show"])]})),_:1})})),S=(n("a434"),n("5502")),F=n("bc28"),I=n("7ab7"),T=n("c2b4"),W=n("bb82"),A=n("b288"),R=n("b72b"),J=n("0dd2"),M=n("1125"),P=n("36e0"),z=n("753d"),L=n("d4cf"),N=n("bf46"),E=n("8c89"),B=n("59f9"),$=n("3950"),G=n("d4fc"),V=n("edb5"),q=n("903b"),H=n("3e51"),K=Object(o["p"])({components:{wmMain:A["a"],wmRow:R["a"],wmTable:J["a"],wmTableTitle:M["a"],wmTableTr:P["a"],wmTag:z["a"],wmPopover:L["a"],wmDialog:N["a"],wmAdd:E["a"],wmClose:B["a"],wmForm:$["a"],wmFormItem:G["a"],wmInput:V["a"],wmButton:q["a"],wmPage:H["a"]},data:function(){var t=Object(S["b"])(),e=t.state,n={list:[],page:1,limit:10,total:0},o={show:!1,form:{}},a={show:!1,form:{}},l={show:!1,id:"",form:{}},r={show:!1,ids:""},c={show:!1,id:"",title:"权限",list:[]};return{state:e,page:n,sea:o,add:a,edit:l,del:r,perm:c}},computed:{actionType:function(){var t=this.state.action.active;return t}},watch:{actionType:function(t){if(!t)return!1;"list"==t?this.loadData():"sea"==t?this.sea.show=!0:"add"==t?this.add.show=!0:"edit"==t?this.editData():"del"==t&&this.delData()}},mounted:function(){W["a"].getItem("token")&&this.loadData()},methods:{loadData:function(){var t=this;this.page.list=[],this.page.total=0;var e=Object(F["a"])();Object(T["a"])("sysmenus/list",{token:W["a"].getItem("token"),page:this.page.page,limit:this.page.limit,data:JSON.stringify(this.sea.form)},(function(n){e.clear();var o=n.data;if(0!=o.code)return Object(I["a"])(o.msg);t.page.list=o.list,t.page.total=o.total}))},subPage:function(t){this.page.page=t,this.loadData()},subSea:function(){this.sea.show=!1,this.page.page=1,this.loadData()},subAdd:function(){var t=this;this.add.show=!1;var e=JSON.stringify(this.add.form),n=Object(F["a"])();Object(T["a"])("sysmenus/add",{token:W["a"].getItem("token"),data:e},(function(e){n.clear();var o=e.data;return 0===o.code&&t.loadData(),Object(I["a"])(o.msg)}))},editData:function(){var t=this.$refs.Table,e=t.getRow();if(!e)return Object(I["a"])("请选择数据!");this.edit.show=!0,this.edit.id=e.id,this.edit.form.fid=e.fid,this.edit.form.title=e.title,this.edit.form.url=e.url,this.edit.form.ico=e.ico,this.edit.form.sort=e.sort,this.edit.form.controller=e.controller},subEdit:function(){var t=this;this.edit.show=!1;var e=this.edit.id,n=JSON.stringify(this.edit.form),o=Object(F["a"])();Object(T["a"])("sysmenus/edit",{token:W["a"].getItem("token"),id:e,data:n},(function(e){o.clear();var n=e.data;return 0===n.code&&t.loadData(),Object(I["a"])(n.msg)}))},delData:function(){var t=this.$refs.Table,e=t.getVals();if(!e)return Object(I["a"])("请选择数据!");this.del.show=!0,this.del.ids=JSON.stringify(e)},subDel:function(){var t=this;this.del.show=!1;var e=Object(F["a"])();Object(T["a"])("sysmenus/del",{token:W["a"].getItem("token"),data:this.del.ids},(function(n){e.clear();var o=n.data;return 0===o.code&&t.loadData(),Object(I["a"])(o.msg)}))},permData:function(t,e,n,o){this.perm.show=!0,this.perm.id=t,this.perm.title=e+": "+n,this.perm.list=o},subPerm:function(){var t=this,e=this.perm.list,n=[];for(var o in e)e[o].action&&e[o].perm&&n.push(e[o]);this.perm.list=n,this.perm.show=!1;var a=Object(F["a"])();Object(T["a"])("sysmenus/perm",{token:W["a"].getItem("token"),id:this.perm.id,data:JSON.stringify(n)},(function(e){a.clear();var n=e.data;return 0===n.code&&t.loadData(),Object(I["a"])(n.msg)}))},permAdd:function(){var t=this.perm.list,e=t[t.length-1].perm;t.push({type:"1",name:"",action:"",perm:2*e})},permRemove:function(t){var e=this.perm.list;e.splice(t,1)}}});n("e3eb");K.render=C,K.__scopeId="data-v-5374c93c";e["default"]=K},e3eb:function(t,e,n){"use strict";n("e540")},e540:function(t,e,n){},f038:function(t,e,n){}}]);