(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69978b15"],{"01c9":function(t,e,n){},"1e50":function(t,e,n){},"240c":function(t,e,n){"use strict";n("c442")},"59f9":function(t,e,n){"use strict";var c=n("7a23");function a(t,e,n,a,i,l){return Object(c["v"])(),Object(c["h"])("span",{class:"wm-action_close",style:Object(c["r"])({padding:t.size,backgroundColor:t.bgColor})},null,4)}var i=Object(c["l"])({name:"ActionClose",props:{size:{type:String,default:"11px"},bgColor:{type:String,default:"#F56C6C"}}});n("c516");i.render=a,i.__scopeId="data-v-bfb8b588";e["a"]=i},"8c89":function(t,e,n){"use strict";var c=n("7a23");function a(t,e,n,a,i,l){return Object(c["v"])(),Object(c["h"])("span",{class:"wm-action_add",style:Object(c["r"])({padding:t.size,backgroundColor:t.bgColor})},null,4)}var i=Object(c["l"])({name:"ActionAdd",props:{size:{type:String,default:"11px"},bgColor:{type:String,default:"#6FB737"}}});n("240c");i.render=a,i.__scopeId="data-v-ededea1c";e["a"]=i},a434:function(t,e,n){"use strict";var c=n("23e7"),a=n("23cb"),i=n("a691"),l=n("50c4"),r=n("7b0b"),o=n("65f0"),u=n("8418"),d=n("1dde"),b=d("splice"),s=Math.max,f=Math.min,j=9007199254740991,O="Maximum allowed length exceeded";c({target:"Array",proto:!0,forced:!b},{splice:function(t,e){var n,c,d,b,m,h,p=r(this),v=l(p.length),g=a(t,v),k=arguments.length;if(0===k?n=c=0:1===k?(n=0,c=v-g):(n=k-2,c=f(s(i(e),0),v-g)),v+n-c>j)throw TypeError(O);for(d=o(p,c),b=0;b<c;b++)m=g+b,m in p&&u(d,b,p[m]);if(d.length=c,n<c){for(b=g;b<v-c;b++)m=b+c,h=b+n,m in p?p[h]=p[m]:delete p[h];for(b=v;b>v-c+n;b--)delete p[b-1]}else if(n>c)for(b=v-c;b>g;b--)m=b+c-1,h=b+n-1,m in p?p[h]=p[m]:delete p[h];for(b=0;b<n;b++)p[b+g]=arguments[b+2];return p.length=v-c+n,d}})},a6e8:function(t,e,n){"use strict";n.r(e);n("b0c0");var c=n("7a23"),a=function(t){return Object(c["y"])("data-v-5f32c15f"),t=t(),Object(c["w"])(),t},i={class:"app_action flex_left"},l={class:"app_action_list flex_left"},r={key:0,class:"arrow_up"},o=a((function(){return Object(c["i"])("i",{class:"icons icon_search"},null,-1)})),u={key:0,class:"action_sea flex_left"},d={class:"flex_left"},b=a((function(){return Object(c["i"])("div",{class:"title"},"FID",-1)})),s={class:"input"},f={class:"flex_left"},j=a((function(){return Object(c["i"])("div",{class:"title"},"名称",-1)})),O={class:"input"},m={class:"flex_left"},h=a((function(){return Object(c["i"])("div",{class:"title"},"API",-1)})),p={class:"input"},v={class:"an"},g=Object(c["j"])("搜 索"),k=a((function(){return Object(c["i"])("td",{width:"40"},"ID",-1)})),w=a((function(){return Object(c["i"])("td",{width:"40"},"FID",-1)})),_=a((function(){return Object(c["i"])("td",{width:"120"},"名称",-1)})),x=a((function(){return Object(c["i"])("td",{width:"80"},"权限",-1)})),L=a((function(){return Object(c["i"])("td",{width:"40"},"图标",-1)})),y=a((function(){return Object(c["i"])("td",{width:"60",style:{"text-align":"center"}},"排序",-1)})),D=a((function(){return Object(c["i"])("td",{width:"120"},"URL",-1)})),U=a((function(){return Object(c["i"])("td",null,"API",-1)})),C={style:{"text-align":"center"}},I=Object(c["j"])("设置"),S=Object(c["j"])("动作"),A={key:2},T={style:{"text-align":"center"}},W={key:0,class:"menus_icon"},P={key:1},R={style:{"text-align":"center"}},F=Object(c["j"])("添 加"),G=Object(c["j"])("保 存"),J=Object(c["j"])("是否删除已选择数据？"),z=Object(c["j"])("彻底删除"),N=a((function(){return Object(c["i"])("td",null,"名称",-1)})),B=a((function(){return Object(c["i"])("td",null,"动作",-1)})),M=a((function(){return Object(c["i"])("td",{width:"100"},"权限",-1)})),E={width:"30"},$={class:"perm_an"},q={class:"perm_an"},V=Object(c["j"])("更 新");function H(t,e,n,a,H,K){var Q=Object(c["D"])("wm-input"),X=Object(c["D"])("wm-button"),Y=Object(c["D"])("wm-table-title"),Z=Object(c["D"])("wm-tag"),tt=Object(c["D"])("wm-popover"),et=Object(c["D"])("wm-table-tr"),nt=Object(c["D"])("wm-table"),ct=Object(c["D"])("wm-page"),at=Object(c["D"])("wm-form-item"),it=Object(c["D"])("wm-form"),lt=Object(c["D"])("wm-dialog"),rt=Object(c["D"])("wm-row"),ot=Object(c["D"])("wm-add"),ut=Object(c["D"])("wm-close"),dt=Object(c["D"])("wm-main");return Object(c["v"])(),Object(c["f"])(dt,null,{default:Object(c["L"])((function(){return[Object(c["i"])("div",i,[Object(c["i"])("ul",l,[t.getters.actionShow("add")?(Object(c["v"])(),Object(c["h"])("li",{key:0,onClick:e[0]||(e[0]=function(e){return t.add.show=!0})},"添加")):Object(c["g"])("",!0),t.getters.actionShow("edit")?(Object(c["v"])(),Object(c["h"])("li",{key:1,onClick:e[1]||(e[1]=function(e){return t.editData()})},"编辑")):Object(c["g"])("",!0),t.getters.actionShow("del")?(Object(c["v"])(),Object(c["h"])("li",{key:2,onClick:e[2]||(e[2]=function(e){return t.delData()})},"删除")):Object(c["g"])("",!0)]),Object(c["i"])("div",{class:"app_action_sea",onClick:e[3]||(e[3]=function(e){return t.sea.show=!t.sea.show})},[t.sea.show?(Object(c["v"])(),Object(c["h"])("div",r)):Object(c["g"])("",!0),o])]),t.sea.show?(Object(c["v"])(),Object(c["h"])("ul",u,[Object(c["i"])("li",d,[b,Object(c["i"])("div",s,[Object(c["k"])(Q,{value:t.sea.form.fid,"onUpdate:value":e[4]||(e[4]=function(e){return t.sea.form.fid=e}),placeholder:"请输入"},null,8,["value"])])]),Object(c["i"])("li",f,[j,Object(c["i"])("div",O,[Object(c["k"])(Q,{value:t.sea.form.title,"onUpdate:value":e[5]||(e[5]=function(e){return t.sea.form.title=e}),placeholder:"菜单名称"},null,8,["value"])])]),Object(c["i"])("li",m,[h,Object(c["i"])("div",p,[Object(c["k"])(Q,{value:t.sea.form.url,"onUpdate:value":e[6]||(e[6]=function(e){return t.sea.form.url=e}),placeholder:"API关键字"},null,8,["value"])])]),Object(c["i"])("li",v,[Object(c["k"])(X,{onClick:e[7]||(e[7]=function(e){return t.subSea()})},{default:Object(c["L"])((function(){return[g]})),_:1})])])):Object(c["g"])("",!0),Object(c["k"])(nt,{class:"table",ref:"Table",data:t.page.list},{default:Object(c["L"])((function(){return[Object(c["k"])(Y,null,{default:Object(c["L"])((function(){return[k,w,_,x,L,y,D,U]})),_:1}),(Object(c["v"])(!0),Object(c["h"])(c["a"],null,Object(c["B"])(t.page.list,(function(e,n){return Object(c["v"])(),Object(c["f"])(et,{key:n,value:e.id+""},{default:Object(c["L"])((function(){return[Object(c["i"])("td",null,Object(c["G"])(e.id),1),Object(c["i"])("td",null,Object(c["G"])(e.fid),1),Object(c["i"])("td",null,[Object(c["k"])(tt,{type:"bottom",effect:"dark",width:"180px"},{body:Object(c["L"])((function(){return[Object(c["i"])("p",null,"创建: "+Object(c["G"])(e.ctime||"无"),1),Object(c["i"])("p",null,"更新: "+Object(c["G"])(e.utime||"无"),1)]})),reference:Object(c["L"])((function(){return[Object(c["k"])(Z,{size:"medium"},{default:Object(c["L"])((function(){return[Object(c["j"])(Object(c["G"])(e.title),1)]})),_:2},1024)]})),_:2},1024)]),Object(c["i"])("td",C,[t.getters.actionShow("perm")&&e.controller&&!e.action?(Object(c["v"])(),Object(c["f"])(X,{key:0,type:"danger",height:"32px",onClick:function(n){return t.permData(e.id,e.title,e.controller,e.action)}},{default:Object(c["L"])((function(){return[I]})),_:2},1032,["onClick"])):t.getters.actionShow("perm")&&e.controller&&e.action?(Object(c["v"])(),Object(c["f"])(X,{key:1,height:"32px",onClick:function(n){return t.permData(e.id,e.title,e.controller,e.action)}},{default:Object(c["L"])((function(){return[S]})),_:2},1032,["onClick"])):(Object(c["v"])(),Object(c["h"])("span",A,"-"))]),Object(c["i"])("td",T,[e.ico?(Object(c["v"])(),Object(c["h"])("div",W,[Object(c["i"])("i",{class:Object(c["q"])(e.ico)},null,2)])):(Object(c["v"])(),Object(c["h"])("span",P,"-"))]),Object(c["i"])("td",R,Object(c["G"])(e.sort),1),Object(c["i"])("td",null,Object(c["G"])(e.url),1),Object(c["i"])("td",null,Object(c["G"])(e.controller),1)]})),_:2},1032,["value"])})),128))]})),_:1},8,["data"]),Object(c["k"])(ct,{page:t.page.page,limit:t.page.limit,total:t.page.total,"onUpdate:page":t.subPage},null,8,["page","limit","total","onUpdate:page"]),Object(c["k"])(lt,{title:"添加",width:"540px",show:t.add.show,"onUpdate:close":e[15]||(e[15]=function(e){return t.add.show=e})},{footer:Object(c["L"])((function(){return[Object(c["k"])(X,{onClick:e[14]||(e[14]=function(e){return t.subAdd()})},{default:Object(c["L"])((function(){return[F]})),_:1})]})),default:Object(c["L"])((function(){return[Object(c["k"])(it,{class:"form"},{default:Object(c["L"])((function(){return[Object(c["k"])(at,{label:"所属"},{default:Object(c["L"])((function(){return[Object(c["k"])(Q,{value:t.add.form.fid,"onUpdate:value":e[8]||(e[8]=function(e){return t.add.form.fid=e}),maxlength:"3",maxWidth:"80px",placeholder:"FID"},null,8,["value"])]})),_:1}),Object(c["k"])(at,{label:"名称"},{default:Object(c["L"])((function(){return[Object(c["k"])(Q,{value:t.add.form.title,"onUpdate:value":e[9]||(e[9]=function(e){return t.add.form.title=e}),maxlength:"8",maxWidth:"320px",placeholder:"菜单名称"},null,8,["value"])]})),_:1}),Object(c["k"])(at,{label:"控制器"},{default:Object(c["L"])((function(){return[Object(c["k"])(Q,{value:t.add.form.controller,"onUpdate:value":e[10]||(e[10]=function(e){return t.add.form.controller=e}),maxlength:"20",placeholder:"例如: /admin/sys_menus"},null,8,["value"])]})),_:1}),Object(c["k"])(at,{label:"URL"},{default:Object(c["L"])((function(){return[Object(c["k"])(Q,{value:t.add.form.url,"onUpdate:value":e[11]||(e[11]=function(e){return t.add.form.url=e}),maxlength:"24",maxWidth:"320px",placeholder:"URL"},null,8,["value"])]})),_:1}),Object(c["k"])(at,{label:"图标样式"},{default:Object(c["L"])((function(){return[Object(c["k"])(Q,{value:t.add.form.ico,"onUpdate:value":e[12]||(e[12]=function(e){return t.add.form.ico=e}),maxlength:"32",maxWidth:"240px",placeholder:"图标样式"},null,8,["value"])]})),_:1}),Object(c["k"])(at,{label:"排序"},{default:Object(c["L"])((function(){return[Object(c["k"])(Q,{value:t.add.form.sort,"onUpdate:value":e[13]||(e[13]=function(e){return t.add.form.sort=e}),maxlength:"2",maxWidth:"240px",placeholder:"例如: 1、2、3"},null,8,["value"])]})),_:1})]})),_:1})]})),_:1},8,["show"]),Object(c["k"])(lt,{title:"编辑",width:"540px",show:t.edit.show,"onUpdate:close":e[23]||(e[23]=function(e){return t.edit.show=e})},{footer:Object(c["L"])((function(){return[Object(c["k"])(X,{onClick:e[22]||(e[22]=function(e){return t.subEdit()})},{default:Object(c["L"])((function(){return[G]})),_:1})]})),default:Object(c["L"])((function(){return[Object(c["k"])(it,{class:"form"},{default:Object(c["L"])((function(){return[Object(c["k"])(at,{label:"所属"},{default:Object(c["L"])((function(){return[Object(c["k"])(Q,{value:t.edit.form.fid,"onUpdate:value":e[16]||(e[16]=function(e){return t.edit.form.fid=e}),maxlength:"3",maxWidth:"80px",placeholder:"FID"},null,8,["value"])]})),_:1}),Object(c["k"])(at,{label:"名称"},{default:Object(c["L"])((function(){return[Object(c["k"])(Q,{value:t.edit.form.title,"onUpdate:value":e[17]||(e[17]=function(e){return t.edit.form.title=e}),maxlength:"8",maxWidth:"320px",placeholder:"菜单名称"},null,8,["value"])]})),_:1}),Object(c["k"])(at,{label:"控制器"},{default:Object(c["L"])((function(){return[Object(c["k"])(Q,{value:t.edit.form.controller,"onUpdate:value":e[18]||(e[18]=function(e){return t.edit.form.controller=e}),maxlength:"20",placeholder:"例如: /admin/sys_menus"},null,8,["value"])]})),_:1}),Object(c["k"])(at,{label:"URL"},{default:Object(c["L"])((function(){return[Object(c["k"])(Q,{value:t.edit.form.url,"onUpdate:value":e[19]||(e[19]=function(e){return t.edit.form.url=e}),maxlength:"24",maxWidth:"320px",placeholder:"URL"},null,8,["value"])]})),_:1}),Object(c["k"])(at,{label:"图标样式"},{default:Object(c["L"])((function(){return[Object(c["k"])(Q,{value:t.edit.form.ico,"onUpdate:value":e[20]||(e[20]=function(e){return t.edit.form.ico=e}),maxlength:"32",maxWidth:"240px",placeholder:"图标样式"},null,8,["value"])]})),_:1}),Object(c["k"])(at,{label:"排序"},{default:Object(c["L"])((function(){return[Object(c["k"])(Q,{value:t.edit.form.sort,"onUpdate:value":e[21]||(e[21]=function(e){return t.edit.form.sort=e}),maxlength:"2",maxWidth:"240px",placeholder:"例如: 1、2、3"},null,8,["value"])]})),_:1})]})),_:1})]})),_:1},8,["show"]),Object(c["k"])(lt,{title:"删除",width:"320px",show:t.del.show,"onUpdate:close":e[25]||(e[25]=function(e){return t.del.show=e})},{footer:Object(c["L"])((function(){return[Object(c["k"])(X,{onClick:e[24]||(e[24]=function(e){return t.subDel()})},{default:Object(c["L"])((function(){return[z]})),_:1})]})),default:Object(c["L"])((function(){return[Object(c["k"])(rt,null,{default:Object(c["L"])((function(){return[J]})),_:1})]})),_:1},8,["show"]),Object(c["k"])(lt,{width:"640px",title:t.perm.title,show:t.perm.show,"onUpdate:close":e[28]||(e[28]=function(e){return t.perm.show=e})},{footer:Object(c["L"])((function(){return[Object(c["k"])(X,{onClick:e[27]||(e[27]=function(e){return t.subPerm()})},{default:Object(c["L"])((function(){return[V]})),_:1})]})),default:Object(c["L"])((function(){return[Object(c["k"])(nt,null,{default:Object(c["L"])((function(){return[Object(c["k"])(Y,{checkbox:!1},{default:Object(c["L"])((function(){return[N,B,M,Object(c["i"])("td",E,[Object(c["i"])("div",$,[Object(c["k"])(ot,{onClick:e[26]||(e[26]=function(e){return t.permAdd()})})])])]})),_:1}),(Object(c["v"])(!0),Object(c["h"])(c["a"],null,Object(c["B"])(t.perm.list,(function(e,n){return Object(c["v"])(),Object(c["f"])(et,{checkbox:!1,key:n},{default:Object(c["L"])((function(){return[Object(c["i"])("td",null,[Object(c["k"])(Q,{value:e.name,"onUpdate:value":function(t){return e.name=t}},null,8,["value","onUpdate:value"])]),Object(c["i"])("td",null,[Object(c["k"])(Q,{value:e.action,"onUpdate:value":function(t){return e.action=t}},null,8,["value","onUpdate:value"])]),Object(c["i"])("td",null,[Object(c["k"])(Q,{value:e.perm,"onUpdate:value":function(t){return e.perm=t}},null,8,["value","onUpdate:value"])]),Object(c["i"])("td",null,[Object(c["i"])("div",q,[Object(c["k"])(ut,{onClick:function(e){return t.permRemove(n)}},null,8,["onClick"])])])]})),_:2},1024)})),128))]})),_:1})]})),_:1},8,["title","show"])]})),_:1})}n("a434");var K=n("5502"),Q=n("bc28"),X=n("7ab7"),Y=n("c2b4"),Z=n("bb82"),tt=n("b288"),et=n("b72b"),nt=n("0dd2"),ct=n("1125"),at=n("36e0"),it=n("753d"),lt=n("d4cf"),rt=n("bf46"),ot=n("8c89"),ut=n("59f9"),dt=n("3950"),bt=n("d4fc"),st=n("edb5"),ft=n("903b"),jt=n("3e51"),Ot=Object(c["l"])({components:{wmMain:tt["a"],wmRow:et["a"],wmTable:nt["a"],wmTableTitle:ct["a"],wmTableTr:at["a"],wmTag:it["a"],wmPopover:lt["a"],wmDialog:rt["a"],wmAdd:ot["a"],wmClose:ut["a"],wmForm:dt["a"],wmFormItem:bt["a"],wmInput:st["a"],wmButton:ft["a"],wmPage:jt["a"]},data:function(){var t=Object(K["b"])(),e=t.state,n=t.getters,c={list:[],page:1,limit:10,total:0},a={show:!1,form:{}},i={show:!1,form:{}},l={show:!1,id:"",form:{}},r={show:!1,ids:""},o={show:!1,id:"",title:"权限",list:[]};return{state:e,getters:n,page:c,sea:a,add:i,edit:l,del:r,perm:o}},mounted:function(){Z["a"].getItem("token")&&this.loadData()},methods:{loadData:function(){var t=this;this.page.list=[],this.page.total=0;var e=Object(Q["a"])();Object(Y["a"])("sys_menus/list",{token:Z["a"].getItem("token"),page:this.page.page,limit:this.page.limit,data:JSON.stringify(this.sea.form)},(function(n){e.clear();var c=n.data;if(0!=c.code)return Object(X["a"])(c.msg);t.page.list=c.list,t.page.total=c.total}))},subPage:function(t){this.page.page=t,this.loadData()},subSea:function(){this.page.page=1,this.loadData()},subAdd:function(){var t=this;this.add.show=!1;var e=JSON.stringify(this.add.form),n=Object(Q["a"])();Object(Y["a"])("sys_menus/add",{token:Z["a"].getItem("token"),data:e},(function(e){n.clear();var c=e.data;return 0===c.code&&t.loadData(),Object(X["a"])(c.msg)}))},editData:function(){var t=this.$refs.Table,e=t.getRow();if(!e)return Object(X["a"])("请选择数据!");this.edit.show=!0,this.edit.id=e.id,this.edit.form.fid=e.fid,this.edit.form.title=e.title,this.edit.form.url=e.url,this.edit.form.ico=e.ico,this.edit.form.sort=e.sort,this.edit.form.controller=e.controller},subEdit:function(){var t=this;this.edit.show=!1;var e=this.edit.id,n=JSON.stringify(this.edit.form),c=Object(Q["a"])();Object(Y["a"])("sys_menus/edit",{token:Z["a"].getItem("token"),id:e,data:n},(function(e){c.clear();var n=e.data;return 0===n.code&&t.loadData(),Object(X["a"])(n.msg)}))},delData:function(){var t=this.$refs.Table,e=t.getVals();if(!e)return Object(X["a"])("请选择数据!");this.del.show=!0,this.del.ids=JSON.stringify(e)},subDel:function(){var t=this;this.del.show=!1;var e=Object(Q["a"])();Object(Y["a"])("sys_menus/del",{token:Z["a"].getItem("token"),data:this.del.ids},(function(n){e.clear();var c=n.data;return 0===c.code&&t.loadData(),Object(X["a"])(c.msg)}))},permData:function(t,e,n,c){this.perm.show=!0,this.perm.id=t,this.perm.title=e+": "+n,this.perm.list=c},subPerm:function(){var t=this,e=this.perm.list,n=[];for(var c in e)e[c].action&&e[c].perm&&n.push(e[c]);this.perm.list=n,this.perm.show=!1;var a=Object(Q["a"])();Object(Y["a"])("sys_menus/perm",{token:Z["a"].getItem("token"),id:this.perm.id,data:JSON.stringify(n)},(function(e){a.clear();var n=e.data;return 0===n.code&&t.loadData(),Object(X["a"])(n.msg)}))},permAdd:function(){var t=this.perm.list,e=t[t.length-1].perm;t.push({name:"",action:"",perm:2*e})},permRemove:function(t){var e=this.perm.list;e.splice(t,1)}}});n("ba48");Ot.render=H,Ot.__scopeId="data-v-5f32c15f";e["default"]=Ot},ba48:function(t,e,n){"use strict";n("01c9")},c442:function(t,e,n){},c516:function(t,e,n){"use strict";n("1e50")}}]);