(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48fdad0e"],{"9b25":function(t,e,n){"use strict";n("e6a4")},a6e8:function(t,e,n){"use strict";n.r(e);n("b0c0");var a=n("7a23"),o=Object(a["hb"])("data-v-c2eff70e");Object(a["I"])("data-v-c2eff70e");var l=Object(a["o"])("td",{width:"30"},"ID",-1),u=Object(a["o"])("td",{width:"30"},"FID",-1),r=Object(a["o"])("td",{width:"120"},"名称",-1),c=Object(a["o"])("td",{width:"80"},"权限",-1),i=Object(a["o"])("td",{width:"60",style:{"text-align":"center"}},"排序",-1),d=Object(a["o"])("td",null,"URL",-1),f=Object(a["o"])("td",null,"图标",-1),b=Object(a["n"])("设置"),s=Object(a["n"])("动作"),m={style:{"text-align":"center"}},O=Object(a["n"])("搜 索"),j=Object(a["n"])("添 加"),h=Object(a["n"])("保 存"),p=Object(a["n"])("是否删除已选择数据？"),v=Object(a["n"])("彻底删除"),w=Object(a["o"])("td",{width:"60"},"类型",-1),g=Object(a["o"])("td",null,"名称",-1),x=Object(a["o"])("td",null,"动作",-1),_=Object(a["o"])("td",{width:"100"},"权限",-1),U={width:"30"},k={class:"perm_an"},y={class:"perm_an"},D=Object(a["n"])("更 新");Object(a["G"])();var I=o((function(t,e,n,I,S,F){var C=Object(a["O"])("wm-table-title"),T=Object(a["O"])("wm-tag"),W=Object(a["O"])("wm-popover"),R=Object(a["O"])("wm-button"),J=Object(a["O"])("wm-table-tr"),P=Object(a["O"])("wm-table"),A=Object(a["O"])("wm-page"),L=Object(a["O"])("wm-input"),N=Object(a["O"])("wm-form-item"),M=Object(a["O"])("wm-form"),E=Object(a["O"])("wm-dialog"),$=Object(a["O"])("wm-row"),z=Object(a["O"])("wm-add"),B=Object(a["O"])("wm-close"),G=Object(a["O"])("wm-main");return Object(a["F"])(),Object(a["j"])(G,null,{default:o((function(){return[Object(a["o"])(P,{class:"table",ref:"Table",data:t.page.list},{default:o((function(){return[Object(a["o"])(C,null,{default:o((function(){return[l,u,r,c,i,d,f]})),_:1}),(Object(a["F"])(!0),Object(a["j"])(a["b"],null,Object(a["M"])(t.page.list,(function(e,n){return Object(a["F"])(),Object(a["j"])(J,{key:n,value:e.id+""},{default:o((function(){return[Object(a["o"])("td",null,Object(a["S"])(e.id),1),Object(a["o"])("td",null,Object(a["S"])(e.fid),1),Object(a["o"])("td",null,[Object(a["o"])(W,{type:"bottom",effect:"dark",width:"180px"},{body:o((function(){return[Object(a["o"])("p",null,"创建: "+Object(a["S"])(e.ctime||"无"),1),Object(a["o"])("p",null,"更新: "+Object(a["S"])(e.utime||"无"),1)]})),reference:o((function(){return[Object(a["o"])(T,{size:"medium"},{default:o((function(){return[Object(a["n"])(Object(a["S"])(e.title),1)]})),_:2},1024)]})),_:2},1024)]),Object(a["o"])("td",null,[e.controller&&!e.action?(Object(a["F"])(),Object(a["j"])(R,{key:0,type:"danger",height:"32px",onClick:function(n){return t.permData(e.id,e.title,e.controller,e.action)}},{default:o((function(){return[b]})),_:2},1032,["onClick"])):e.controller&&e.action?(Object(a["F"])(),Object(a["j"])(R,{key:1,height:"32px",onClick:function(n){return t.permData(e.id,e.title,e.controller,e.action)}},{default:o((function(){return[s]})),_:2},1032,["onClick"])):Object(a["k"])("",!0)]),Object(a["o"])("td",m,Object(a["S"])(e.sort),1),Object(a["o"])("td",null,Object(a["S"])(e.url),1),Object(a["o"])("td",null,Object(a["S"])(e.ico),1)]})),_:2},1032,["value"])})),128))]})),_:1},8,["data"]),Object(a["o"])(A,{page:t.page.page,limit:t.page.limit,total:t.page.total,"onUpdate:page":t.subPage},null,8,["page","limit","total","onUpdate:page"]),Object(a["o"])(E,{title:"搜索",width:"420px",show:t.sea.show,"onUpdate:close":e[5]||(e[5]=function(e){return t.sea.show=e})},{footer:o((function(){return[Object(a["o"])(R,{onClick:e[4]||(e[4]=function(e){return t.subSea()})},{default:o((function(){return[O]})),_:1})]})),default:o((function(){return[Object(a["o"])(M,{class:"form"},{default:o((function(){return[Object(a["o"])(N,{label:"FID"},{default:o((function(){return[Object(a["o"])(L,{value:t.sea.form.fid,"onUpdate:value":e[1]||(e[1]=function(e){return t.sea.form.fid=e}),placeholder:"FID"},null,8,["value"])]})),_:1}),Object(a["o"])(N,{label:"名称"},{default:o((function(){return[Object(a["o"])(L,{value:t.sea.form.title,"onUpdate:value":e[2]||(e[2]=function(e){return t.sea.form.title=e}),placeholder:"菜单名称"},null,8,["value"])]})),_:1}),Object(a["o"])(N,{label:"控制器"},{default:o((function(){return[Object(a["o"])(L,{value:t.sea.form.url,"onUpdate:value":e[3]||(e[3]=function(e){return t.sea.form.url=e}),placeholder:"菜单名称"},null,8,["value"])]})),_:1})]})),_:1})]})),_:1},8,["show"]),Object(a["o"])(E,{title:"添加",width:"540px",show:t.add.show,"onUpdate:close":e[13]||(e[13]=function(e){return t.add.show=e})},{footer:o((function(){return[Object(a["o"])(R,{onClick:e[12]||(e[12]=function(e){return t.subAdd()})},{default:o((function(){return[j]})),_:1})]})),default:o((function(){return[Object(a["o"])(M,{class:"form"},{default:o((function(){return[Object(a["o"])(N,{label:"所属"},{default:o((function(){return[Object(a["o"])(L,{value:t.add.form.fid,"onUpdate:value":e[6]||(e[6]=function(e){return t.add.form.fid=e}),maxlength:"3",maxWidth:"80px",placeholder:"FID"},null,8,["value"])]})),_:1}),Object(a["o"])(N,{label:"名称"},{default:o((function(){return[Object(a["o"])(L,{value:t.add.form.title,"onUpdate:value":e[7]||(e[7]=function(e){return t.add.form.title=e}),maxlength:"8",maxWidth:"320px",placeholder:"菜单名称"},null,8,["value"])]})),_:1}),Object(a["o"])(N,{label:"控制器"},{default:o((function(){return[Object(a["o"])(L,{value:t.add.form.controller,"onUpdate:value":e[8]||(e[8]=function(e){return t.add.form.controller=e}),maxlength:"2",placeholder:"例如: /admin/sysmenus"},null,8,["value"])]})),_:1}),Object(a["o"])(N,{label:"URL"},{default:o((function(){return[Object(a["o"])(L,{value:t.add.form.url,"onUpdate:value":e[9]||(e[9]=function(e){return t.add.form.url=e}),maxlength:"24",maxWidth:"320px",placeholder:"URL"},null,8,["value"])]})),_:1}),Object(a["o"])(N,{label:"图标样式"},{default:o((function(){return[Object(a["o"])(L,{value:t.add.form.ico,"onUpdate:value":e[10]||(e[10]=function(e){return t.add.form.ico=e}),maxlength:"32",maxWidth:"240px",placeholder:"图标样式"},null,8,["value"])]})),_:1}),Object(a["o"])(N,{label:"排序"},{default:o((function(){return[Object(a["o"])(L,{value:t.add.form.sort,"onUpdate:value":e[11]||(e[11]=function(e){return t.add.form.sort=e}),maxlength:"2",maxWidth:"240px",placeholder:"例如: 1、2、3"},null,8,["value"])]})),_:1})]})),_:1})]})),_:1},8,["show"]),Object(a["o"])(E,{title:"编辑",width:"540px",show:t.edit.show,"onUpdate:close":e[21]||(e[21]=function(e){return t.edit.show=e})},{footer:o((function(){return[Object(a["o"])(R,{onClick:e[20]||(e[20]=function(e){return t.subEdit()})},{default:o((function(){return[h]})),_:1})]})),default:o((function(){return[Object(a["o"])(M,{class:"form"},{default:o((function(){return[Object(a["o"])(N,{label:"所属"},{default:o((function(){return[Object(a["o"])(L,{value:t.edit.form.fid,"onUpdate:value":e[14]||(e[14]=function(e){return t.edit.form.fid=e}),maxlength:"3",maxWidth:"80px",placeholder:"FID"},null,8,["value"])]})),_:1}),Object(a["o"])(N,{label:"名称"},{default:o((function(){return[Object(a["o"])(L,{value:t.edit.form.title,"onUpdate:value":e[15]||(e[15]=function(e){return t.edit.form.title=e}),maxlength:"8",maxWidth:"320px",placeholder:"菜单名称"},null,8,["value"])]})),_:1}),Object(a["o"])(N,{label:"控制器"},{default:o((function(){return[Object(a["o"])(L,{value:t.edit.form.controller,"onUpdate:value":e[16]||(e[16]=function(e){return t.edit.form.controller=e}),maxlength:"2",placeholder:"例如: /admin/sysmenus"},null,8,["value"])]})),_:1}),Object(a["o"])(N,{label:"URL"},{default:o((function(){return[Object(a["o"])(L,{value:t.edit.form.url,"onUpdate:value":e[17]||(e[17]=function(e){return t.edit.form.url=e}),maxlength:"24",maxWidth:"320px",placeholder:"URL"},null,8,["value"])]})),_:1}),Object(a["o"])(N,{label:"图标样式"},{default:o((function(){return[Object(a["o"])(L,{value:t.edit.form.ico,"onUpdate:value":e[18]||(e[18]=function(e){return t.edit.form.ico=e}),maxlength:"32",maxWidth:"240px",placeholder:"图标样式"},null,8,["value"])]})),_:1}),Object(a["o"])(N,{label:"排序"},{default:o((function(){return[Object(a["o"])(L,{value:t.edit.form.sort,"onUpdate:value":e[19]||(e[19]=function(e){return t.edit.form.sort=e}),maxlength:"2",maxWidth:"240px",placeholder:"例如: 1、2、3"},null,8,["value"])]})),_:1})]})),_:1})]})),_:1},8,["show"]),Object(a["o"])(E,{title:"删除",width:"320px",show:t.del.show,"onUpdate:close":e[23]||(e[23]=function(e){return t.del.show=e})},{footer:o((function(){return[Object(a["o"])(R,{onClick:e[22]||(e[22]=function(e){return t.subDel()})},{default:o((function(){return[v]})),_:1})]})),default:o((function(){return[Object(a["o"])($,null,{default:o((function(){return[p]})),_:1})]})),_:1},8,["show"]),Object(a["o"])(E,{width:"640px",title:t.perm.title,show:t.perm.show,"onUpdate:close":e[26]||(e[26]=function(e){return t.perm.show=e})},{footer:o((function(){return[Object(a["o"])(R,{onClick:e[25]||(e[25]=function(e){return t.subPerm()})},{default:o((function(){return[D]})),_:1})]})),default:o((function(){return[Object(a["o"])(P,null,{default:o((function(){return[Object(a["o"])(C,{checkbox:!1},{default:o((function(){return[w,g,x,_,Object(a["o"])("td",U,[Object(a["o"])("div",k,[Object(a["o"])(z,{onClick:e[24]||(e[24]=function(e){return t.permAdd()})})])])]})),_:1}),(Object(a["F"])(!0),Object(a["j"])(a["b"],null,Object(a["M"])(t.perm.list,(function(e,n){return Object(a["F"])(),Object(a["j"])(J,{checkbox:!1,key:n},{default:o((function(){return[Object(a["o"])("td",null,[Object(a["o"])(L,{value:e.type,"onUpdate:value":function(t){return e.type=t}},null,8,["value","onUpdate:value"])]),Object(a["o"])("td",null,[Object(a["o"])(L,{value:e.name,"onUpdate:value":function(t){return e.name=t}},null,8,["value","onUpdate:value"])]),Object(a["o"])("td",null,[Object(a["o"])(L,{value:e.action,"onUpdate:value":function(t){return e.action=t}},null,8,["value","onUpdate:value"])]),Object(a["o"])("td",null,[Object(a["o"])(L,{value:e.perm,"onUpdate:value":function(t){return e.perm=t}},null,8,["value","onUpdate:value"])]),Object(a["o"])("td",null,[Object(a["o"])("div",y,[Object(a["o"])(B,{onClick:function(e){return t.permRemove(n)}},null,8,["onClick"])])])]})),_:2},1024)})),128))]})),_:1})]})),_:1},8,["title","show"])]})),_:1})})),S=(n("a434"),n("5502")),F=n("bc28"),C=n("7ab7"),T=n("c2b4"),W=n("bb82"),R=n("b288"),J=n("b72b"),P=n("0dd2"),A=n("1125"),L=n("36e0"),N=n("753d"),M=n("d4cf"),E=n("bf46"),$=n("8c89"),z=n("59f9"),B=n("3950"),G=n("d4fc"),V=n("edb5"),q=n("903b"),H=n("3e51"),K=Object(a["p"])({components:{wmMain:R["a"],wmRow:J["a"],wmTable:P["a"],wmTableTitle:A["a"],wmTableTr:L["a"],wmTag:N["a"],wmPopover:M["a"],wmDialog:E["a"],wmAdd:$["a"],wmClose:z["a"],wmForm:B["a"],wmFormItem:G["a"],wmInput:V["a"],wmButton:q["a"],wmPage:H["a"]},data:function(){var t=Object(S["b"])(),e=t.state,n={list:[],page:1,limit:10,total:0},a={show:!1,form:{}},o={show:!1,form:{}},l={show:!1,id:"",form:{}},u={show:!1,ids:""},r={show:!1,id:"",title:"权限",list:[]};return{state:e,page:n,sea:a,add:o,edit:l,del:u,perm:r}},computed:{actionType:function(){var t=this.state.action.active;return t}},watch:{actionType:function(t){if(!t)return!1;"list"==t?this.loadData():"sea"==t?this.sea.show=!0:"add"==t?this.add.show=!0:"edit"==t?this.editData():"del"==t&&this.delData()}},mounted:function(){W["a"].getItem("token")&&this.loadData()},methods:{loadData:function(){var t=this;this.page.list=[],this.page.total=0;var e=Object(F["a"])();Object(T["a"])("sysmenus/list",{token:W["a"].getItem("token"),page:this.page.page,limit:this.page.limit,data:JSON.stringify(this.sea.form)},(function(n){e.clear();var a=n.data;if(0!=a.code)return Object(C["a"])(a.msg);t.page.list=a.list,t.page.total=a.total}))},subPage:function(t){this.page.page=t,this.loadData()},subSea:function(){this.sea.show=!1,this.page.page=1,this.loadData()},subAdd:function(){var t=this;this.add.show=!1;var e=JSON.stringify(this.add.form),n=Object(F["a"])();Object(T["a"])("sysmenus/add",{token:W["a"].getItem("token"),data:e},(function(e){n.clear();var a=e.data;return 0===a.code&&t.loadData(),Object(C["a"])(a.msg)}))},editData:function(){var t=this.$refs.Table,e=t.getRow();if(!e)return Object(C["a"])("请选择数据!");this.edit.show=!0,this.edit.id=e.id,this.edit.form.fid=e.fid,this.edit.form.title=e.title,this.edit.form.url=e.url,this.edit.form.ico=e.ico,this.edit.form.sort=e.sort,this.edit.form.controller=e.controller},subEdit:function(){var t=this;this.edit.show=!1;var e=this.edit.id,n=JSON.stringify(this.edit.form),a=Object(F["a"])();Object(T["a"])("sysmenus/edit",{token:W["a"].getItem("token"),id:e,data:n},(function(e){a.clear();var n=e.data;return 0===n.code&&t.loadData(),Object(C["a"])(n.msg)}))},delData:function(){var t=this.$refs.Table,e=t.getVals();if(!e)return Object(C["a"])("请选择数据!");this.del.show=!0,this.del.ids=JSON.stringify(e)},subDel:function(){var t=this;this.del.show=!1;var e=Object(F["a"])();Object(T["a"])("sysmenus/del",{token:W["a"].getItem("token"),data:this.del.ids},(function(n){e.clear();var a=n.data;return 0===a.code&&t.loadData(),Object(C["a"])(a.msg)}))},permData:function(t,e,n,a){this.perm.show=!0,this.perm.id=t,this.perm.title=e+": "+n,this.perm.list=a},subPerm:function(){var t=this,e=this.perm.list,n=[];for(var a in e)e[a].action&&e[a].perm&&n.push(e[a]);this.perm.list=n,this.perm.show=!1;var o=Object(F["a"])();Object(T["a"])("sysmenus/perm",{token:W["a"].getItem("token"),id:this.perm.id,data:JSON.stringify(n)},(function(e){o.clear();var n=e.data;return 0===n.code&&t.loadData(),Object(C["a"])(n.msg)}))},permAdd:function(){var t=this.perm.list,e=t[t.length-1].perm;t.push({type:"1",name:"",action:"",perm:2*e})},permRemove:function(t){var e=this.perm.list;e.splice(t,1)}}});n("9b25");K.render=I,K.__scopeId="data-v-c2eff70e";e["default"]=K},e6a4:function(t,e,n){}}]);