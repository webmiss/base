(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0c5a6377"],{"10e1":function(e,t,c){"use strict";c.r(t);c("b0c0");var n=c("7a23"),i=function(e){return Object(n["y"])("data-v-20e521ae"),e=e(),Object(n["w"])(),e},a={class:"app_action flex_left"},r={class:"app_action_list flex_left"},o={key:0,class:"arrow_up"},s=i((function(){return Object(n["i"])("i",{class:"icons icon_search"},null,-1)})),l={key:0,class:"action_sea flex_left"},d={class:"flex_left"},b=i((function(){return Object(n["i"])("div",{class:"title"},"名称",-1)})),u={class:"input"},h={class:"an"},j=Object(n["j"])("搜 索"),O=i((function(){return Object(n["i"])("td",{width:"60"},"ID",-1)})),f=i((function(){return Object(n["i"])("td",{width:"120"},"名称",-1)})),m=i((function(){return Object(n["i"])("td",null,"操作",-1)})),k=Object(n["j"])("设置权限"),w=Object(n["j"])("修改权限"),p={key:2},v=Object(n["j"])("添 加"),_=Object(n["j"])("保 存"),g=Object(n["j"])("是否删除已选择数据？"),y=Object(n["j"])("彻底删除"),C=Object(n["j"])("更 新");function D(e,t,c,i,D,L){var x=Object(n["D"])("wm-input"),G=Object(n["D"])("wm-button"),I=Object(n["D"])("wm-table-title"),S=Object(n["D"])("wm-tag"),J=Object(n["D"])("wm-popover"),P=Object(n["D"])("wm-table-tr"),T=Object(n["D"])("wm-table"),U=Object(n["D"])("wm-page"),B=Object(n["D"])("wm-form-item"),M=Object(n["D"])("wm-form"),N=Object(n["D"])("wm-dialog"),$=Object(n["D"])("wm-row"),q=Object(n["D"])("wm-tree"),A=Object(n["D"])("wm-main");return Object(n["v"])(),Object(n["f"])(A,null,{default:Object(n["L"])((function(){return[Object(n["i"])("div",a,[Object(n["i"])("ul",r,[e.getters.actionShow("add")?(Object(n["v"])(),Object(n["h"])("li",{key:0,onClick:t[0]||(t[0]=function(t){return e.add.show=!0})},"添加")):Object(n["g"])("",!0),e.getters.actionShow("edit")?(Object(n["v"])(),Object(n["h"])("li",{key:1,onClick:t[1]||(t[1]=function(t){return e.editData()})},"编辑")):Object(n["g"])("",!0),e.getters.actionShow("del")?(Object(n["v"])(),Object(n["h"])("li",{key:2,onClick:t[2]||(t[2]=function(t){return e.delData()})},"删除")):Object(n["g"])("",!0)]),Object(n["i"])("div",{class:"app_action_sea",onClick:t[3]||(t[3]=function(t){return e.sea.show=!e.sea.show})},[e.sea.show?(Object(n["v"])(),Object(n["h"])("div",o)):Object(n["g"])("",!0),s])]),e.sea.show?(Object(n["v"])(),Object(n["h"])("ul",l,[Object(n["i"])("li",d,[b,Object(n["i"])("div",u,[Object(n["k"])(x,{value:e.sea.form.name,"onUpdate:value":t[4]||(t[4]=function(t){return e.sea.form.name=t}),maxlength:"16",placeholder:"角色名称"},null,8,["value"])])]),Object(n["i"])("li",h,[Object(n["k"])(G,{onClick:t[5]||(t[5]=function(t){return e.subSea()})},{default:Object(n["L"])((function(){return[j]})),_:1})])])):Object(n["g"])("",!0),Object(n["k"])(T,{class:"table",ref:"Table",data:e.page.list},{default:Object(n["L"])((function(){return[Object(n["k"])(I,null,{default:Object(n["L"])((function(){return[O,f,m]})),_:1}),(Object(n["v"])(!0),Object(n["h"])(n["a"],null,Object(n["B"])(e.page.list,(function(t,c){return Object(n["v"])(),Object(n["f"])(P,{key:c,value:t.id+""},{default:Object(n["L"])((function(){return[Object(n["i"])("td",null,Object(n["G"])(t.id),1),Object(n["i"])("td",null,[Object(n["k"])(J,{type:"bottom",effect:"dark",width:"180px"},{body:Object(n["L"])((function(){return[Object(n["i"])("p",null,"创建: "+Object(n["G"])(t.ctime||"无"),1),Object(n["i"])("p",null,"更新: "+Object(n["G"])(t.utime||"无"),1)]})),reference:Object(n["L"])((function(){return[Object(n["k"])(S,{size:"medium"},{default:Object(n["L"])((function(){return[Object(n["j"])(Object(n["G"])(t.name),1)]})),_:2},1024)]})),_:2},1024)]),Object(n["i"])("td",null,[e.getters.actionShow("perm")&&!t.perm?(Object(n["v"])(),Object(n["f"])(G,{key:0,type:"danger",height:"32px",onClick:function(c){return e.permData(t.id,t.perm)}},{default:Object(n["L"])((function(){return[k]})),_:2},1032,["onClick"])):e.getters.actionShow("perm")?(Object(n["v"])(),Object(n["f"])(G,{key:1,height:"32px",onClick:function(c){return e.permData(t.id,t.perm)}},{default:Object(n["L"])((function(){return[w]})),_:2},1032,["onClick"])):(Object(n["v"])(),Object(n["h"])("span",p,"-"))])]})),_:2},1032,["value"])})),128))]})),_:1},8,["data"]),Object(n["k"])(U,{page:e.page.page,limit:e.page.limit,total:e.page.total,"onUpdate:page":e.subPage},null,8,["page","limit","total","onUpdate:page"]),Object(n["k"])(N,{title:"添加",width:"420px",show:e.add.show,"onUpdate:close":t[8]||(t[8]=function(t){return e.add.show=t})},{footer:Object(n["L"])((function(){return[Object(n["k"])(G,{onClick:t[7]||(t[7]=function(t){return e.subAdd()})},{default:Object(n["L"])((function(){return[v]})),_:1})]})),default:Object(n["L"])((function(){return[Object(n["k"])(M,{class:"form"},{default:Object(n["L"])((function(){return[Object(n["k"])(B,{label:"名称"},{default:Object(n["L"])((function(){return[Object(n["k"])(x,{value:e.add.form.name,"onUpdate:value":t[6]||(t[6]=function(t){return e.add.form.name=t}),maxlength:"16",placeholder:"角色名称"},null,8,["value"])]})),_:1})]})),_:1})]})),_:1},8,["show"]),Object(n["k"])(N,{title:"编辑",width:"420px",show:e.edit.show,"onUpdate:close":t[11]||(t[11]=function(t){return e.edit.show=t})},{footer:Object(n["L"])((function(){return[Object(n["k"])(G,{onClick:t[10]||(t[10]=function(t){return e.subEdit()})},{default:Object(n["L"])((function(){return[_]})),_:1})]})),default:Object(n["L"])((function(){return[Object(n["k"])(M,{class:"form"},{default:Object(n["L"])((function(){return[Object(n["k"])(B,{label:"名称"},{default:Object(n["L"])((function(){return[Object(n["k"])(x,{value:e.edit.form.name,"onUpdate:value":t[9]||(t[9]=function(t){return e.edit.form.name=t}),maxlength:"16",placeholder:"角色名称"},null,8,["value"])]})),_:1})]})),_:1})]})),_:1},8,["show"]),Object(n["k"])(N,{title:"删除",width:"320px",show:e.del.show,"onUpdate:close":t[13]||(t[13]=function(t){return e.del.show=t})},{footer:Object(n["L"])((function(){return[Object(n["k"])(G,{onClick:t[12]||(t[12]=function(t){return e.subDel()})},{default:Object(n["L"])((function(){return[y]})),_:1})]})),default:Object(n["L"])((function(){return[Object(n["k"])($,null,{default:Object(n["L"])((function(){return[g]})),_:1})]})),_:1},8,["show"]),Object(n["k"])(N,{title:"权限",width:"540px",show:e.perm.show,"onUpdate:close":t[15]||(t[15]=function(t){return e.perm.show=t})},{footer:Object(n["L"])((function(){return[Object(n["k"])(G,{onClick:t[14]||(t[14]=function(t){return e.subPerm()})},{default:Object(n["L"])((function(){return[C]})),_:1})]})),default:Object(n["L"])((function(){return[Object(n["k"])(q,{ref:"perm",data:e.perm.permList},null,8,["data"])]})),_:1},8,["show"])]})),_:1})}var L=c("5502"),x=c("bc28"),G=c("7ab7"),I=c("c2b4"),S=c("bb82"),J=c("b288"),P=c("b72b"),T=c("0dd2"),U=c("1125"),B=c("36e0"),M=c("753d"),N=c("d4cf"),$=c("bf46"),q=c("3950"),A=c("d4fc"),E=c("edb5"),F=c("903b"),R=c("3e51"),z=c("a57f"),V=Object(n["l"])({components:{wmMain:J["a"],wmRow:P["a"],wmTable:T["a"],wmTableTitle:U["a"],wmTableTr:B["a"],wmTag:M["a"],wmPopover:N["a"],wmDialog:$["a"],wmForm:q["a"],wmFormItem:A["a"],wmInput:E["a"],wmButton:F["a"],wmPage:R["a"],wmTree:z["a"]},data:function(){var e=Object(L["b"])(),t=e.state,c=e.getters,n={list:[],page:1,limit:10,total:0},i={show:!1,form:{}},a={show:!1,form:{}},r={show:!1,id:"",form:{}},o={show:!1,ids:""},s={show:!1,id:"",perm:"",permList:[]};return{state:t,getters:c,page:n,sea:i,add:a,edit:r,del:o,perm:s}},mounted:function(){S["a"].getItem("token")&&this.loadData()},methods:{loadData:function(){var e=this;this.page.list=[],this.page.total=0;var t=Object(x["a"])();Object(I["a"])("sys_role/list",{token:S["a"].getItem("token"),page:this.page.page,limit:this.page.limit,data:JSON.stringify(this.sea.form)},(function(c){t.clear();var n=c.data;if(0!=n.code)return Object(G["a"])(n.msg);e.page.list=n.list,e.page.total=n.total}))},subPage:function(e){this.page.page=e,this.loadData()},subSea:function(){this.page.page=1,this.loadData()},subAdd:function(){var e=this;this.add.show=!1;var t=JSON.stringify(this.add.form),c=Object(x["a"])();Object(I["a"])("sys_role/add",{token:S["a"].getItem("token"),data:t},(function(t){c.clear();var n=t.data;return 0===n.code&&e.loadData(),Object(G["a"])(n.msg)}))},editData:function(){var e=this.$refs.Table,t=e.getRow();if(!t)return Object(G["a"])("请选择数据!");this.edit.show=!0,this.edit.id=t.id,this.edit.form.name=t.name},subEdit:function(){var e=this;this.edit.show=!1;var t=this.edit.id,c=JSON.stringify(this.edit.form),n=Object(x["a"])();Object(I["a"])("sys_role/edit",{token:S["a"].getItem("token"),id:t,data:c},(function(t){n.clear();var c=t.data;return 0===c.code&&e.loadData(),Object(G["a"])(c.msg)}))},delData:function(){var e=this.$refs.Table,t=e.getVals();if(!t)return Object(G["a"])("请选择数据!");this.del.show=!0,this.del.ids=JSON.stringify(t)},subDel:function(){var e=this;this.del.show=!1;var t=Object(x["a"])();Object(I["a"])("sys_role/del",{token:S["a"].getItem("token"),data:this.del.ids},(function(c){t.clear();var n=c.data;return 0===n.code&&e.loadData(),Object(G["a"])(n.msg)}))},permData:function(e,t){var c=this;this.perm.show=!0,this.perm.id=e;var n=Object(x["a"])();Object(I["a"])("sys_role/permList",{token:S["a"].getItem("token"),perm:t},(function(e){n.clear();var t=e.data;0===t.code?c.perm.permList=t.list:Object(G["a"])(t.msg)}))},subPerm:function(){var e=this;this.perm.show=!1;var t=this.$refs.perm,c=Object(x["a"])();Object(I["a"])("sys_role/perm",{token:S["a"].getItem("token"),id:this.perm.id,perm:t.getPerms()},(function(t){c.clear();var n=t.data;return 0===n.code&&e.loadData(),Object(G["a"])(n.msg)}))}}});c("7aa4");V.render=D,V.__scopeId="data-v-20e521ae";t["default"]=V},"257e":function(e,t,c){},"472a":function(e,t,c){"use strict";c("a66b")},"498a":function(e,t,c){"use strict";var n=c("23e7"),i=c("58a8").trim,a=c("c8d2");n({target:"String",proto:!0,forced:a("trim")},{trim:function(){return i(this)}})},"7aa4":function(e,t,c){"use strict";c("257e")},a57f:function(e,t,c){"use strict";var n=c("7a23"),i=["onClick"],a={class:"wm-tree_arrow"},r=["id"],o={class:"wm-tree_label"},s=["onClick"],l={key:0,class:"wm-tree_arrow"},d={key:1,class:"wm-tree_arrow_none"},b=["id"],u={class:"wm-tree_label"},h=["onClick"],j={key:0,class:"wm-tree_arrow"},O={key:1,class:"wm-tree_arrow_none"},f=["id"],m={class:"wm-tree_label"},k=["onClick"],w={key:0,class:"wm-tree_arrow"},p={key:1,class:"wm-tree_arrow_none"},v=["id"],_={class:"wm-tree_label"},g=["onClick"],y={key:0,class:"wm-tree_arrow"},C={key:1,class:"wm-tree_arrow_none"},D=["id"],L={class:"wm-tree_label"},x=["onClick"],G={key:0,class:"wm-tree_arrow"},I={key:1,class:"wm-tree_arrow_none"},S=["id"],J={class:"wm-tree_label"};function P(e,t,c,P,T,U){var B=Object(n["D"])("wm-checkbox");return Object(n["v"])(),Object(n["h"])("div",null,[(Object(n["v"])(!0),Object(n["h"])(n["a"],null,Object(n["B"])(e.menus,(function(t,c){return Object(n["v"])(),Object(n["h"])("div",{key:c},[Object(n["i"])("div",{class:"wm-tree_content",style:{"padding-left":"0px"},onClick:function(e){return t.show=!t.show}},[Object(n["i"])("span",a,Object(n["G"])(t.show?"-":"+"),1),Object(n["i"])("span",{class:"wm-tree_checkbox",id:"wm-tree_node_"+t.id},[Object(n["k"])(B,{checked:t.checked,onClick:function(c){return e.click(t.id,t.checked=!t.checked,t.children)},disclick:!0},null,8,["checked","onClick"])],8,r),Object(n["i"])("span",o,Object(n["G"])(t.label),1)],8,i),(Object(n["v"])(!0),Object(n["h"])(n["a"],null,Object(n["B"])(t.children,(function(c,i){return Object(n["M"])((Object(n["v"])(),Object(n["h"])("div",{class:"wm-tree_node",key:i},[Object(n["i"])("div",{class:"wm-tree_content",style:{"padding-left":"16px"},onClick:function(e){return c.show=!c.show}},[c.children&&c.children.length>0?(Object(n["v"])(),Object(n["h"])("span",l,Object(n["G"])(c.show?"-":"+"),1)):(Object(n["v"])(),Object(n["h"])("span",d)),Object(n["i"])("span",{class:"wm-tree_checkbox",id:"wm-tree_node_"+c.id},[Object(n["k"])(B,{checked:c.checked,onClick:function(t){return e.click(c.id,c.checked=!c.checked,c.children)},disclick:!0},null,8,["checked","onClick"])],8,b),Object(n["i"])("span",u,Object(n["G"])(c.label),1)],8,s),(Object(n["v"])(!0),Object(n["h"])(n["a"],null,Object(n["B"])(c.children,(function(t,i){return Object(n["M"])((Object(n["v"])(),Object(n["h"])("div",{class:"wm-tree_node",key:i},[Object(n["i"])("div",{class:"wm-tree_content",style:{"padding-left":"32px"},onClick:function(e){return t.show=!t.show}},[t.children&&t.children.length>0?(Object(n["v"])(),Object(n["h"])("span",j,Object(n["G"])(t.show?"-":"+"),1)):(Object(n["v"])(),Object(n["h"])("span",O)),Object(n["i"])("span",{class:"wm-tree_checkbox",id:"wm-tree_node_"+t.id},[Object(n["k"])(B,{checked:t.checked,onClick:function(c){return e.click(t.id,t.checked=!t.checked,t.children)},disclick:!0},null,8,["checked","onClick"])],8,f),Object(n["i"])("span",m,Object(n["G"])(t.label),1)],8,h),(Object(n["v"])(!0),Object(n["h"])(n["a"],null,Object(n["B"])(t.children,(function(c,i){return Object(n["M"])((Object(n["v"])(),Object(n["h"])("div",{class:"wm-tree_node",key:i},[Object(n["i"])("div",{class:"wm-tree_content",style:{"padding-left":"48px"},onClick:function(e){return c.show=!c.show}},[c.children&&c.children.length>0?(Object(n["v"])(),Object(n["h"])("span",w,Object(n["G"])(c.show?"-":"+"),1)):(Object(n["v"])(),Object(n["h"])("span",p)),Object(n["i"])("span",{class:"wm-tree_checkbox",id:"wm-tree_node_"+c.id},[Object(n["k"])(B,{checked:c.checked,onClick:function(t){return e.click(c.id,c.checked=!c.checked,c.children)},disclick:!0},null,8,["checked","onClick"])],8,v),Object(n["i"])("span",_,Object(n["G"])(c.label),1)],8,k),(Object(n["v"])(!0),Object(n["h"])(n["a"],null,Object(n["B"])(c.children,(function(t,i){return Object(n["M"])((Object(n["v"])(),Object(n["h"])("div",{class:"wm-tree_node",key:i},[Object(n["i"])("div",{class:"wm-tree_content",style:{"padding-left":"64px"},onClick:function(e){return t.show=!t.show}},[t.children&&t.children.length>0?(Object(n["v"])(),Object(n["h"])("span",y,Object(n["G"])(t.show?"-":"+"),1)):(Object(n["v"])(),Object(n["h"])("span",C)),Object(n["i"])("span",{class:"wm-tree_checkbox",id:"wm-tree_node_"+t.id},[Object(n["k"])(B,{checked:t.checked,onClick:function(c){return e.click(t.id,t.checked=!t.checked,t.children)},disclick:!0},null,8,["checked","onClick"])],8,D),Object(n["i"])("span",L,Object(n["G"])(t.label),1)],8,g),(Object(n["v"])(!0),Object(n["h"])(n["a"],null,Object(n["B"])(t.children,(function(c,i){return Object(n["M"])((Object(n["v"])(),Object(n["h"])("div",{class:"wm-tree_node",key:i},[Object(n["i"])("div",{class:"wm-tree_content",style:{"padding-left":"80px"},onClick:function(e){return c.show=!c.show}},[c.children&&c.children.length>0?(Object(n["v"])(),Object(n["h"])("span",G,Object(n["G"])(c.show?"-":"+"),1)):(Object(n["v"])(),Object(n["h"])("span",I)),Object(n["i"])("span",{class:"wm-tree_checkbox",id:"wm-tree_node_"+c.id},[Object(n["k"])(B,{checked:c.checked,onClick:function(t){return e.click(c.id,c.checked=!c.checked,c.children)},disclick:!0},null,8,["checked","onClick"])],8,S),Object(n["i"])("span",J,Object(n["G"])(c.label),1)],8,x),Object(n["i"])("div",{class:Object(n["q"])("wm-tree_node_"+c.id)},null,2)],512)),[[n["J"],t.show]])})),128))],512)),[[n["J"],c.show]])})),128))],512)),[[n["J"],t.show]])})),128))],512)),[[n["J"],c.show]])})),128))],512)),[[n["J"],t.show]])})),128))])})),128))])}c("498a");var T=c("f274"),U=Object(n["l"])({name:"Tree",components:{wmCheckbox:T["a"]},props:{data:{default:[]}},data:function(){var e=[],t=[],c="";return{menus:e,perms:c,arrs:t}},watch:{data:function(e){this.menus=e}},methods:{click:function(e,t,c){this.setCheckbox(e,t),c&&this.setChecked(t,c)},setChecked:function(e,t){for(var c in t)t[c].checked=e,this.setCheckbox(t[c].id,t[c].checked),t[c].children&&this.setChecked(e,t[c].children)},setCheckbox:function(e,t){var c=document.querySelector("#wm-tree_node_"+e+" div.checked");c&&(t?c.classList.add("active"):c.classList.remove("active"))},getIds:function(){return this.arrs=[],this.setIds(this.menus),this.arrs},setIds:function(e){for(var t in e)e[t].children&&this.setIds(e[t].children),e[t].checked&&this.arrs.push(e[t].id)},getPerms:function(){return this.perms="",this.setPerms(this.menus),this.perms.trim()},setPerms:function(e){for(var t in e){var c=0;if(e[t].action)for(var n in e[t].children)e[t].children[n].checked&&(c+=e[t].children[n].perm);else e[t].children&&this.setPerms(e[t].children);e[t].checked&&(this.perms+=e[t].id+":"+c+" ")}}}});c("472a");U.render=P,U.__scopeId="data-v-5684fac0";t["a"]=U},a66b:function(e,t,c){},c8d2:function(e,t,c){var n=c("d039"),i=c("5899"),a="​᠎";e.exports=function(e){return n((function(){return!!i[e]()||a[e]()!=a||i[e].name!==e}))}}}]);