(self["webpackChunkwebmis_vue"]=self["webpackChunkwebmis_vue"]||[]).push([[834],{9341:function(t,e,n){"use strict";var r=n(7293);t.exports=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){return 1},1)}))}},4362:function(t,e,n){var r=n(1589),a=Math.floor,i=function(t,e){var n=t.length,o=a(n/2);return n<8?l(t,e):u(t,i(r(t,0,o),e),i(r(t,o),e),e)},l=function(t,e){var n,r,a=t.length,i=1;while(i<a){r=i,n=t[i];while(r&&e(t[r-1],n)>0)t[r]=t[--r];r!==i++&&(t[r]=n)}return t},u=function(t,e,n,r){var a=e.length,i=n.length,l=0,u=0;while(l<a||u<i)t[l+u]=l<a&&u<i?r(e[l],n[u])<=0?e[l++]:n[u++]:l<a?e[l++]:n[u++];return t};t.exports=i},8886:function(t,e,n){var r=n(8113),a=r.match(/firefox\/(\d+)/i);t.exports=!!a&&+a[1]},256:function(t,e,n){var r=n(8113);t.exports=/MSIE|Trident/.test(r)},8008:function(t,e,n){var r=n(8113),a=r.match(/AppleWebKit\/(\d+)\./);t.exports=!!a&&+a[1]},2707:function(t,e,n){"use strict";var r=n(2109),a=n(1702),i=n(9662),l=n(7908),u=n(6244),o=n(1340),d=n(7293),c=n(4362),s=n(9341),f=n(8886),m=n(256),p=n(7392),h=n(8008),w=[],v=a(w.sort),g=a(w.push),_=d((function(){w.sort(void 0)})),k=d((function(){w.sort(null)})),x=s("sort"),W=!d((function(){if(p)return p<70;if(!(f&&f>3)){if(m)return!0;if(h)return h<603;var t,e,n,r,a="";for(t=65;t<76;t++){switch(e=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:n=3;break;case 68:case 71:n=4;break;default:n=2}for(r=0;r<47;r++)w.push({k:e+r,v:n})}for(w.sort((function(t,e){return e.v-t.v})),r=0;r<w.length;r++)e=w[r].k.charAt(0),a.charAt(a.length-1)!==e&&(a+=e);return"DGBEFHACIJK"!==a}})),b=_||!k||!x||!W,Z=function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:o(e)>o(n)?1:-1}};r({target:"Array",proto:!0,forced:b},{sort:function(t){void 0!==t&&i(t);var e=l(this);if(W)return void 0===t?v(e):v(e,t);var n,r,a=[],o=u(e);for(r=0;r<o;r++)r in e&&g(a,e[r]);c(a,Z(t)),n=a.length,r=0;while(r<n)e[r]=a[r++];while(r<o)delete e[r++];return e}})},561:function(t,e,n){"use strict";var r=n(2109),a=n(7854),i=n(1400),l=n(9303),u=n(6244),o=n(7908),d=n(5417),c=n(6135),s=n(1194),f=s("splice"),m=a.TypeError,p=Math.max,h=Math.min,w=9007199254740991,v="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!f},{splice:function(t,e){var n,r,a,s,f,g,_=o(this),k=u(_),x=i(t,k),W=arguments.length;if(0===W?n=r=0:1===W?(n=0,r=k-x):(n=W-2,r=h(p(l(e),0),k-x)),k+n-r>w)throw m(v);for(a=d(_,r),s=0;s<r;s++)f=x+s,f in _&&c(a,s,_[f]);if(a.length=r,n<r){for(s=x;s<k-r;s++)f=s+r,g=s+n,f in _?_[g]=_[f]:delete _[g];for(s=k;s>k-r+n;s--)delete _[s-1]}else if(n>r)for(s=k-r;s>x;s--)f=s+r-1,g=s+n-1,f in _?_[g]=_[f]:delete _[g];for(s=0;s<n;s++)_[s+x]=arguments[s+2];return _.length=k-r+n,a}})},8306:function(t,e,n){"use strict";n.d(e,{Z:function(){return c}});var r=n(6252),a=n(3577);function i(t,e,n,i,l,u){return(0,r.wg)(),(0,r.iD)("span",{class:"wm-action_add",style:(0,a.j5)({padding:t.size,backgroundColor:t.bgColor})},null,4)}var l=n(7830),u=(0,r.aZ)({name:"ActionAdd",props:{size:{type:String,default:"11px"},bgColor:{type:String,default:l.Z.themes.primary.plain[0]}}}),o=n(3744);const d=(0,o.Z)(u,[["render",i],["__scopeId","data-v-48dabb4f"]]);var c=d},1651:function(t,e,n){"use strict";n.d(e,{Z:function(){return c}});var r=n(6252),a=n(3577);function i(t,e,n,i,l,u){return(0,r.wg)(),(0,r.iD)("span",{class:"wm-action_close",style:(0,a.j5)({padding:t.size,backgroundColor:t.bgColor})},null,4)}var l=n(7830),u=(0,r.aZ)({name:"ActionClose",props:{size:{type:String,default:"11px"},bgColor:{type:String,default:l.Z.themes.danger.plain[0]}}}),o=n(3744);const d=(0,o.Z)(u,[["render",i],["__scopeId","data-v-88899c5c"]]);var c=d},7798:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return _t}});n(2707),n(8309);var r=n(6252),a=n(9963),i=n(3577),l=function(t){return(0,r.dD)("data-v-409af982"),t=t(),(0,r.Cn)(),t},u={class:"flex"},o={class:"app_ct_left"},d={class:"app_sea_title flex"},c=l((function(){return(0,r._)("h2",null,"搜索",-1)})),s=l((function(){return(0,r._)("i",{class:"ui ui_left"},null,-1)})),f=[s],m={class:"app_sea_form"},p={class:"input"},h={class:"app_sea_sub"},w=(0,r.Uk)("搜 索"),v={class:"app_action_body flex_left"},g=l((function(){return(0,r._)("i",{class:"ui ui_search"},null,-1)})),_=[g],k={class:"app_action_list flex_left"},x={class:"app_ct_body"},W=l((function(){return(0,r._)("td",{width:"40"},"ID",-1)})),b=l((function(){return(0,r._)("td",{width:"40"},"FID",-1)})),Z=l((function(){return(0,r._)("td",{width:"120"},"名称",-1)})),y=l((function(){return(0,r._)("td",{width:"100"},"权限",-1)})),U=l((function(){return(0,r._)("td",{width:"40"},"图标",-1)})),D=l((function(){return(0,r._)("td",{width:"60",style:{"text-align":"center"}},"排序",-1)})),C=l((function(){return(0,r._)("td",{width:"120"},"URL",-1)})),S=l((function(){return(0,r._)("td",null,"API",-1)})),I={width:"30",class:"checkbox wm-table_checkbox"},A={style:{"text-align":"center"}},z=(0,r.Uk)("设置"),R=(0,r.Uk)("动作"),F={key:2},P={style:{"text-align":"center"}},T={key:0,class:"menus_icon"},J={key:1},M={style:{"text-align":"center"}},j=(0,r.Uk)("添 加"),E=(0,r.Uk)("保 存"),L=(0,r.Uk)("是否删除已选择数据？"),N=(0,r.Uk)("彻底删除"),O=l((function(){return(0,r._)("td",null,"名称",-1)})),K=l((function(){return(0,r._)("td",null,"动作",-1)})),q=l((function(){return(0,r._)("td",{width:"100"},"权限",-1)})),H={width:"30"},B={class:"perm_an"},Y={class:"perm_an"},$=(0,r.Uk)("更 新");function G(t,e,n,l,s,g){var G=(0,r.up)("wm-input"),V=(0,r.up)("wm-button"),Q=(0,r.up)("wm-checkbox"),X=(0,r.up)("wm-tag"),tt=(0,r.up)("wm-popover"),et=(0,r.up)("wm-table"),nt=(0,r.up)("wm-page"),rt=(0,r.up)("wm-main"),at=(0,r.up)("wm-form-item"),it=(0,r.up)("wm-form"),lt=(0,r.up)("wm-dialog"),ut=(0,r.up)("wm-row"),ot=(0,r.up)("wm-add"),dt=(0,r.up)("wm-close");return(0,r.wg)(),(0,r.iD)("div",u,[(0,r.wy)((0,r._)("div",o,[(0,r._)("div",d,[c,(0,r._)("span",{onClick:e[0]||(e[0]=function(e){return t.state.menuSea=!1})},f)]),(0,r._)("ul",m,[(0,r._)("li",null,[(0,r.Wm)(G,{value:t.sea.form.fid,"onUpdate:value":e[1]||(e[1]=function(e){return t.sea.form.fid=e}),placeholder:"FID"},null,8,["value"])]),(0,r._)("li",null,[(0,r.Wm)(G,{value:t.sea.form.title,"onUpdate:value":e[2]||(e[2]=function(e){return t.sea.form.title=e}),placeholder:"菜单名称"},null,8,["value"])]),(0,r._)("li",null,[(0,r._)("div",p,[(0,r.Wm)(G,{value:t.sea.form.url,"onUpdate:value":e[3]||(e[3]=function(e){return t.sea.form.url=e}),placeholder:"API关键字"},null,8,["value"])])])]),(0,r._)("div",h,[(0,r.Wm)(V,{onClick:e[4]||(e[4]=function(e){return t.subSea()}),height:"32px"},{default:(0,r.w5)((function(){return[w]})),_:1})])],512),[[a.F8,t.state.menuSea]]),(0,r._)("div",{class:"app_ct_right",style:(0,i.j5)({width:t.state.menuSea?"calc(100% - 240px)":"100%"})},[(0,r._)("div",v,[(0,r.wy)((0,r._)("div",{class:"app_action_sea",onClick:e[5]||(e[5]=function(e){return t.state.menuSea=!0})},_,512),[[a.F8,!t.state.menuSea]]),(0,r._)("ul",k,[t.getters.actionShow("add")?((0,r.wg)(),(0,r.iD)("li",{key:0,onClick:e[6]||(e[6]=function(e){return t.add.show=!0})},"添加")):(0,r.kq)("",!0),t.getters.actionShow("edit")?((0,r.wg)(),(0,r.iD)("li",{key:1,onClick:e[7]||(e[7]=function(e){return t.editData()})},"编辑")):(0,r.kq)("",!0),t.getters.actionShow("del")?((0,r.wg)(),(0,r.iD)("li",{key:2,onClick:e[8]||(e[8]=function(e){return t.delData()})},"删除")):(0,r.kq)("",!0)])]),(0,r._)("div",x,[(0,r.Wm)(rt,null,{default:(0,r.w5)((function(){return[(0,r.Wm)(et,{ref:"Table",data:t.page.list},{title:(0,r.w5)((function(){return[W,b,Z,y,U,D,C,S]})),default:(0,r.w5)((function(){return[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.page.list,(function(e,n){return(0,r.wg)(),(0,r.iD)("tr",{key:n},[(0,r._)("td",I,[(0,r.Wm)(Q,{value:e.id},null,8,["value"])]),(0,r._)("td",null,(0,i.zw)(e.id),1),(0,r._)("td",null,(0,i.zw)(e.fid),1),(0,r._)("td",null,[(0,r.Wm)(tt,{type:"bottom",effect:"dark",width:"180px"},{body:(0,r.w5)((function(){return[(0,r._)("p",null,"创建: "+(0,i.zw)(e.ctime||"无"),1),(0,r._)("p",null,"更新: "+(0,i.zw)(e.utime||"无"),1)]})),reference:(0,r.w5)((function(){return[(0,r.Wm)(X,{size:"medium"},{default:(0,r.w5)((function(){return[(0,r.Uk)((0,i.zw)(e.title),1)]})),_:2},1024)]})),_:2},1024)]),(0,r._)("td",A,[t.getters.actionShow("perm")&&e.controller&&!e.action?((0,r.wg)(),(0,r.j4)(V,{key:0,type:"danger",height:"32px",onClick:function(n){return t.permData(e.id,e.title,e.controller,e.action)}},{default:(0,r.w5)((function(){return[z]})),_:2},1032,["onClick"])):t.getters.actionShow("perm")&&e.controller&&e.action?((0,r.wg)(),(0,r.j4)(V,{key:1,height:"32px",onClick:function(n){return t.permData(e.id,e.title,e.controller,e.action)}},{default:(0,r.w5)((function(){return[R]})),_:2},1032,["onClick"])):((0,r.wg)(),(0,r.iD)("span",F,"-"))]),(0,r._)("td",P,[e.ico?((0,r.wg)(),(0,r.iD)("div",T,[(0,r._)("i",{class:(0,i.C_)(e.ico)},null,2)])):((0,r.wg)(),(0,r.iD)("span",J,"-"))]),(0,r._)("td",M,(0,i.zw)(e.sort),1),(0,r._)("td",null,(0,i.zw)(e.url),1),(0,r._)("td",null,(0,i.zw)(e.controller),1)])})),128))]})),_:1},8,["data"]),(0,r.Wm)(nt,{page:t.page.page,limit:t.page.limit,total:t.page.total,"onUpdate:page":t.subPage},null,8,["page","limit","total","onUpdate:page"])]})),_:1})])],4),(0,r.Wm)(lt,{title:"添加",width:"540px",show:t.add.show,"onUpdate:close":e[16]||(e[16]=function(e){return t.add.show=e})},{footer:(0,r.w5)((function(){return[(0,r.Wm)(V,{onClick:e[15]||(e[15]=function(e){return t.subAdd()})},{default:(0,r.w5)((function(){return[j]})),_:1})]})),default:(0,r.w5)((function(){return[(0,r.Wm)(it,{class:"form"},{default:(0,r.w5)((function(){return[(0,r.Wm)(at,{label:"所属"},{default:(0,r.w5)((function(){return[(0,r.Wm)(G,{value:t.add.form.fid,"onUpdate:value":e[9]||(e[9]=function(e){return t.add.form.fid=e}),maxlength:"3",maxWidth:"80px",placeholder:"FID"},null,8,["value"])]})),_:1}),(0,r.Wm)(at,{label:"名称"},{default:(0,r.w5)((function(){return[(0,r.Wm)(G,{value:t.add.form.title,"onUpdate:value":e[10]||(e[10]=function(e){return t.add.form.title=e}),maxlength:"8",maxWidth:"320px",placeholder:"菜单名称"},null,8,["value"])]})),_:1}),(0,r.Wm)(at,{label:"控制器"},{default:(0,r.w5)((function(){return[(0,r.Wm)(G,{value:t.add.form.controller,"onUpdate:value":e[11]||(e[11]=function(e){return t.add.form.controller=e}),maxlength:"64",placeholder:"例如: /admin/sys_menus"},null,8,["value"])]})),_:1}),(0,r.Wm)(at,{label:"URL"},{default:(0,r.w5)((function(){return[(0,r.Wm)(G,{value:t.add.form.url,"onUpdate:value":e[12]||(e[12]=function(e){return t.add.form.url=e}),maxlength:"24",maxWidth:"320px",placeholder:"URL"},null,8,["value"])]})),_:1}),(0,r.Wm)(at,{label:"图标样式"},{default:(0,r.w5)((function(){return[(0,r.Wm)(G,{value:t.add.form.ico,"onUpdate:value":e[13]||(e[13]=function(e){return t.add.form.ico=e}),maxlength:"32",maxWidth:"240px",placeholder:"图标样式"},null,8,["value"])]})),_:1}),(0,r.Wm)(at,{label:"排序"},{default:(0,r.w5)((function(){return[(0,r.Wm)(G,{value:t.add.form.sort,"onUpdate:value":e[14]||(e[14]=function(e){return t.add.form.sort=e}),maxlength:"2",maxWidth:"240px",placeholder:"例如: 1、2、3"},null,8,["value"])]})),_:1})]})),_:1})]})),_:1},8,["show"]),(0,r.Wm)(lt,{title:"编辑",width:"540px",show:t.edit.show,"onUpdate:close":e[24]||(e[24]=function(e){return t.edit.show=e})},{footer:(0,r.w5)((function(){return[(0,r.Wm)(V,{onClick:e[23]||(e[23]=function(e){return t.subEdit()})},{default:(0,r.w5)((function(){return[E]})),_:1})]})),default:(0,r.w5)((function(){return[(0,r.Wm)(it,{class:"form"},{default:(0,r.w5)((function(){return[(0,r.Wm)(at,{label:"所属"},{default:(0,r.w5)((function(){return[(0,r.Wm)(G,{value:t.edit.form.fid,"onUpdate:value":e[17]||(e[17]=function(e){return t.edit.form.fid=e}),maxlength:"3",maxWidth:"80px",placeholder:"FID"},null,8,["value"])]})),_:1}),(0,r.Wm)(at,{label:"名称"},{default:(0,r.w5)((function(){return[(0,r.Wm)(G,{value:t.edit.form.title,"onUpdate:value":e[18]||(e[18]=function(e){return t.edit.form.title=e}),maxlength:"8",maxWidth:"320px",placeholder:"菜单名称"},null,8,["value"])]})),_:1}),(0,r.Wm)(at,{label:"控制器"},{default:(0,r.w5)((function(){return[(0,r.Wm)(G,{value:t.edit.form.controller,"onUpdate:value":e[19]||(e[19]=function(e){return t.edit.form.controller=e}),maxlength:"64",placeholder:"例如: /admin/sys_menus"},null,8,["value"])]})),_:1}),(0,r.Wm)(at,{label:"URL"},{default:(0,r.w5)((function(){return[(0,r.Wm)(G,{value:t.edit.form.url,"onUpdate:value":e[20]||(e[20]=function(e){return t.edit.form.url=e}),maxlength:"24",maxWidth:"320px",placeholder:"URL"},null,8,["value"])]})),_:1}),(0,r.Wm)(at,{label:"图标样式"},{default:(0,r.w5)((function(){return[(0,r.Wm)(G,{value:t.edit.form.ico,"onUpdate:value":e[21]||(e[21]=function(e){return t.edit.form.ico=e}),maxlength:"32",maxWidth:"240px",placeholder:"图标样式"},null,8,["value"])]})),_:1}),(0,r.Wm)(at,{label:"排序"},{default:(0,r.w5)((function(){return[(0,r.Wm)(G,{value:t.edit.form.sort,"onUpdate:value":e[22]||(e[22]=function(e){return t.edit.form.sort=e}),maxlength:"2",maxWidth:"240px",placeholder:"例如: 1、2、3"},null,8,["value"])]})),_:1})]})),_:1})]})),_:1},8,["show"]),(0,r.Wm)(lt,{title:"删除",width:"320px",show:t.del.show,"onUpdate:close":e[26]||(e[26]=function(e){return t.del.show=e})},{footer:(0,r.w5)((function(){return[(0,r.Wm)(V,{onClick:e[25]||(e[25]=function(e){return t.subDel()})},{default:(0,r.w5)((function(){return[N]})),_:1})]})),default:(0,r.w5)((function(){return[(0,r.Wm)(ut,null,{default:(0,r.w5)((function(){return[L]})),_:1})]})),_:1},8,["show"]),(0,r.Wm)(lt,{width:"640px",title:t.perm.title,show:t.perm.show,"onUpdate:close":e[29]||(e[29]=function(e){return t.perm.show=e})},{footer:(0,r.w5)((function(){return[(0,r.Wm)(V,{onClick:e[28]||(e[28]=function(e){return t.subPerm()})},{default:(0,r.w5)((function(){return[$]})),_:1})]})),default:(0,r.w5)((function(){return[(0,r.Wm)(et,{isCheckbox:!1},{title:(0,r.w5)((function(){return[O,K,q,(0,r._)("td",H,[(0,r._)("div",B,[(0,r.Wm)(ot,{onClick:e[27]||(e[27]=function(e){return t.permAdd()})})])])]})),default:(0,r.w5)((function(){return[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(t.perm.list,(function(e,n){return(0,r.wg)(),(0,r.iD)("tr",{key:n},[(0,r._)("td",null,[(0,r.Wm)(G,{value:e.name,"onUpdate:value":function(t){return e.name=t}},null,8,["value","onUpdate:value"])]),(0,r._)("td",null,[(0,r.Wm)(G,{value:e.action,"onUpdate:value":function(t){return e.action=t}},null,8,["value","onUpdate:value"])]),(0,r._)("td",null,[(0,r.Wm)(G,{value:e.perm,"onUpdate:value":function(t){return e.perm=t}},null,8,["value","onUpdate:value"])]),(0,r._)("td",null,[(0,r._)("div",Y,[(0,r.Wm)(dt,{onClick:function(e){return t.permRemove(n)}},null,8,["onClick"])])])])})),128))]})),_:1})]})),_:1},8,["title","show"])])}n(8862),n(561);var V=n(3907),Q=n(8907),X=n(6492),tt=n(5783),et=n(2367),nt=n(5219),rt=n(1566),at=n(5706),it=n(4834),lt=n(8484),ut=n(5342),ot=n(7491),dt=n(8306),ct=n(1651),st=n(6675),ft=n(7685),mt=n(6173),pt=n(8650),ht=n(8896),wt=(0,r.aZ)({components:{wmMain:nt.Z,wmRow:rt.Z,wmTable:at.Z,wmCheckbox:it.Z,wmTag:lt.Z,wmPopover:ut.Z,wmDialog:ot.Z,wmAdd:dt.Z,wmClose:ct.Z,wmForm:st.Z,wmFormItem:ft.Z,wmInput:mt.Z,wmButton:pt.Z,wmPage:ht.Z},data:function(){var t=(0,V.oR)(),e=t.state,n=t.getters,r={list:[],page:1,limit:20,total:0},a={show:!1,form:{}},i={show:!1,form:{}},l={show:!1,id:"",form:{}},u={show:!1,ids:""},o={show:!1,id:"",title:"权限",list:[]};return{state:e,getters:n,page:r,sea:a,add:i,edit:l,del:u,perm:o}},mounted:function(){et.Z.getItem("token")&&this.loadData()},methods:{loadData:function(){var t=this;this.page.list=[],this.page.total=0;var e=(0,Q.Z)();(0,tt.Z)("sys_menus/list",{token:et.Z.getItem("token"),page:this.page.page,limit:this.page.limit,data:JSON.stringify(this.sea.form)},(function(n){e.clear();var r=n.data;if(0!=r.code)return(0,X.Z)(r.msg);t.page.list=r.list,t.page.total=r.total}))},subPage:function(t){this.page.page=t,this.loadData()},subSea:function(){this.page.page=1,this.loadData()},subAdd:function(){var t=this;this.add.show=!1;var e=JSON.stringify(this.add.form),n=(0,Q.Z)();(0,tt.Z)("sys_menus/add",{token:et.Z.getItem("token"),data:e},(function(e){n.clear();var r=e.data;return 0===r.code&&t.loadData(),(0,X.Z)(r.msg)}))},editData:function(){var t=this.$refs.Table,e=t.getRow();if(!e)return(0,X.Z)("请选择数据!");this.edit.show=!0,this.edit.id=e.id,this.edit.form.fid=e.fid,this.edit.form.title=e.title,this.edit.form.url=e.url,this.edit.form.ico=e.ico,this.edit.form.sort=e.sort,this.edit.form.controller=e.controller},subEdit:function(){var t=this;this.edit.show=!1;var e=this.edit.id,n=JSON.stringify(this.edit.form),r=(0,Q.Z)();(0,tt.Z)("sys_menus/edit",{token:et.Z.getItem("token"),id:e,data:n},(function(e){r.clear();var n=e.data;return 0===n.code&&t.loadData(),(0,X.Z)(n.msg)}))},delData:function(){var t=this.$refs.Table,e=t.getVals();if(!e)return(0,X.Z)("请选择数据!");this.del.show=!0,this.del.ids=JSON.stringify(e)},subDel:function(){var t=this;this.del.show=!1;var e=(0,Q.Z)();(0,tt.Z)("sys_menus/del",{token:et.Z.getItem("token"),data:this.del.ids},(function(n){e.clear();var r=n.data;return 0===r.code&&t.loadData(),(0,X.Z)(r.msg)}))},permData:function(t,e,n,r){this.perm.show=!0,this.perm.id=t,this.perm.title=e+": "+n,this.perm.list=r},subPerm:function(){var t=this,e=this.perm.list,n=[];for(var r in e)e[r].action&&e[r].perm&&n.push(e[r]);this.perm.list=n,this.perm.show=!1;var a=(0,Q.Z)();(0,tt.Z)("sys_menus/perm",{token:et.Z.getItem("token"),id:this.perm.id,data:JSON.stringify(n)},(function(e){a.clear();var n=e.data;return 0===n.code&&t.loadData(),(0,X.Z)(n.msg)}))},permAdd:function(){var t=this.perm.list;t.length>0?t.push({name:"",action:"",perm:2*t[t.length-1].perm}):this.perm.list=[{name:"",action:"",perm:1}]},permRemove:function(t){var e=this.perm.list;e.splice(t,1)}}}),vt=n(3744);const gt=(0,vt.Z)(wt,[["render",G],["__scopeId","data-v-409af982"]]);var _t=gt}}]);