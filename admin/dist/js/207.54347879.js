"use strict";(self["webpackChunkwebmis_vue"]=self["webpackChunkwebmis_vue"]||[]).push([[207],{5863:function(t,e,a){a.r(e),a.d(e,{default:function(){return ft}});var l=a(6252),o=a(9963),i=a(3577);const d=t=>((0,l.dD)("data-v-116013a4"),t=t(),(0,l.Cn)(),t),n={class:"flex"},s={class:"app_ct_left"},u={class:"app_sea_title flex"},m=d((()=>(0,l._)("h2",null,"搜索",-1))),r=d((()=>(0,l._)("i",{class:"ui ui_arrow_left"},null,-1))),c=[r],h={class:"app_sea_form"},w={class:"app_sea_sub"},p=(0,l.Uk)("搜 索"),f={class:"app_action_body flex_left"},g=d((()=>(0,l._)("i",{class:"ui ui_search"},null,-1))),_=[g],k={class:"app_action_list flex_left"},v={class:"app_ct_body"},Z=d((()=>(0,l._)("td",{width:"40"},"ID",-1))),W=d((()=>(0,l._)("td",{width:"40"},"封面",-1))),b=d((()=>(0,l._)("td",{width:"220"},"标题",-1))),x=d((()=>(0,l._)("td",{width:"80"},"所属",-1))),y=d((()=>(0,l._)("td",{width:"120"},"日期",-1))),U=d((()=>(0,l._)("td",{width:"60"},"状态",-1))),C=d((()=>(0,l._)("td",null,"操作",-1))),S={width:"30",class:"checkbox wm-table_checkbox"},D=["onClick"],I={key:1},z=(0,l.Uk)("内容"),N={key:1},T=(0,l.Uk)("添 加"),F=(0,l.Uk)("保 存"),J=(0,l.Uk)("是否删除已选择数据？"),O=(0,l.Uk)("彻底删除"),P={class:"news_body"},j={class:"title"},q={class:"info"},H=["innerHTML"],M=(0,l.Uk)("保 存");function R(t,e,a,d,r,g){const R=(0,l.up)("wm-input"),A=(0,l.up)("wm-button"),E=(0,l.up)("wm-checkbox"),L=(0,l.up)("wm-img"),$=(0,l.up)("wm-tag"),B=(0,l.up)("wm-popover"),K=(0,l.up)("wm-switch"),V=(0,l.up)("wm-table"),Y=(0,l.up)("wm-page"),G=(0,l.up)("wm-main"),Q=(0,l.up)("wm-form-item"),X=(0,l.up)("wm-select"),tt=(0,l.up)("wm-form"),et=(0,l.up)("wm-dialog"),at=(0,l.up)("wm-row"),lt=(0,l.up)("wm-tinymce");return(0,l.wg)(),(0,l.iD)("div",n,[(0,l.wy)((0,l._)("div",s,[(0,l._)("div",u,[m,(0,l._)("span",{onClick:e[0]||(e[0]=e=>t.state.menuSea=!1)},c)]),(0,l._)("ul",h,[(0,l._)("li",null,[(0,l.Wm)(R,{value:t.sea.form.title,"onUpdate:value":e[1]||(e[1]=e=>t.sea.form.title=e),placeholder:"新闻标题"},null,8,["value"])])]),(0,l._)("div",w,[(0,l.Wm)(A,{onClick:e[2]||(e[2]=e=>t.subSea()),height:"32px"},{default:(0,l.w5)((()=>[p])),_:1})])],512),[[o.F8,t.state.menuSea]]),(0,l._)("div",{class:"app_ct_right",style:(0,i.j5)({width:t.state.menuSea?"calc(100% - 240px)":"100%"})},[(0,l._)("div",f,[(0,l.wy)((0,l._)("div",{class:"app_action_sea",onClick:e[3]||(e[3]=e=>t.state.menuSea=!0)},_,512),[[o.F8,!t.state.menuSea]]),(0,l._)("ul",k,[t.getters.actionShow("add")?((0,l.wg)(),(0,l.iD)("li",{key:0,onClick:e[4]||(e[4]=e=>t.add.show=!0)},"添加")):(0,l.kq)("",!0),t.getters.actionShow("edit")?((0,l.wg)(),(0,l.iD)("li",{key:1,onClick:e[5]||(e[5]=e=>t.editData())},"编辑")):(0,l.kq)("",!0),t.getters.actionShow("del")?((0,l.wg)(),(0,l.iD)("li",{key:2,onClick:e[6]||(e[6]=e=>t.delData())},"删除")):(0,l.kq)("",!0)])]),(0,l._)("div",v,[(0,l.Wm)(G,null,{default:(0,l.w5)((()=>[(0,l.Wm)(V,{ref:"Table",data:t.page.list,class:"table"},{title:(0,l.w5)((()=>[Z,W,b,x,y,U,C])),default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(t.page.list,((e,a)=>((0,l.wg)(),(0,l.iD)("tr",{key:a},[(0,l._)("td",S,[(0,l.Wm)(E,{value:e.id},null,8,["value"])]),(0,l._)("td",null,(0,i.zw)(e.id),1),(0,l._)("td",null,[(0,l.Wm)(L,{width:"40px",height:"40px",radius:"4px",icoSize:"24px",url:e.img,title:e.title,onClick:a=>t.openShow(e)},null,8,["url","title","onClick"])]),(0,l._)("td",null,[(0,l._)("div",{class:"news_title",onClick:a=>t.openShow(e)},(0,i.zw)(e.title),9,D)]),(0,l._)("td",null,(0,i.zw)(t.menusName[e.cid]),1),(0,l._)("td",null,[(0,l.Wm)(B,{type:"bottom",effect:"dark",width:"180px"},{body:(0,l.w5)((()=>[(0,l._)("p",null,"来源: "+(0,i.zw)(e.source||"无"),1),(0,l._)("p",null,"作者: "+(0,i.zw)(e.author||"无"),1),(0,l._)("p",null,"创建: "+(0,i.zw)(e.ctime||"无"),1),(0,l._)("p",null,"更新: "+(0,i.zw)(e.utime||"无"),1)])),reference:(0,l.w5)((()=>[(0,l.Wm)($,{size:"medium"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,i.zw)(e.utime.substr(0,10)),1)])),_:2},1024)])),_:2},1024)]),(0,l._)("td",null,[t.getters.actionShow("state")?((0,l.wg)(),(0,l.j4)(K,{key:0,value:e.state,"onUpdate:value":a=>t.setState(a,e.id)},null,8,["value","onUpdate:value"])):((0,l.wg)(),(0,l.iD)("span",I,"-"))]),(0,l._)("td",null,[t.getters.actionShow("edit")?((0,l.wg)(),(0,l.j4)(A,{key:0,height:"32px",fontSize:"13px",onClick:a=>t.setContent(e.id)},{default:(0,l.w5)((()=>[z])),_:2},1032,["onClick"])):((0,l.wg)(),(0,l.iD)("span",N,"-"))])])))),128))])),_:1},8,["data"]),(0,l.Wm)(Y,{page:t.page.page,limit:t.page.limit,total:t.page.total,"onUpdate:page":t.subPage},null,8,["page","limit","total","onUpdate:page"])])),_:1})])],4),(0,l.Wm)(et,{title:"添加",width:"720px",show:t.add.show,"onUpdate:close":e[14]||(e[14]=e=>t.add.show=e)},{footer:(0,l.w5)((()=>[(0,l.Wm)(A,{onClick:e[13]||(e[13]=e=>t.subAdd())},{default:(0,l.w5)((()=>[T])),_:1})])),default:(0,l.w5)((()=>[(0,l.Wm)(tt,{class:"form"},{default:(0,l.w5)((()=>[(0,l.Wm)(Q,{label:"封面图",height:"auto"},{default:(0,l.w5)((()=>[(0,l.Wm)(L,{width:"120px",height:"120px",radius:"4px",url:t.add.form.img,onClick:e[7]||(e[7]=e=>t.upImg("add"))},null,8,["url"])])),_:1}),(0,l.Wm)(Q,{label:"所属"},{default:(0,l.w5)((()=>[(0,l.Wm)(X,{value:t.add.form.cid,"onUpdate:value":e[8]||(e[8]=e=>t.add.form.cid=e),placeholder:"选择分类",data:t.menus.data},null,8,["value","data"])])),_:1}),(0,l.Wm)(Q,{label:"标题"},{default:(0,l.w5)((()=>[(0,l.Wm)(R,{value:t.add.form.title,"onUpdate:value":e[9]||(e[9]=e=>t.add.form.title=e),maxlength:"30",maxWidth:"80%",placeholder:"新闻标题"},null,8,["value"])])),_:1}),(0,l.Wm)(Q,{label:"来源"},{default:(0,l.w5)((()=>[(0,l.Wm)(R,{value:t.add.form.source,"onUpdate:value":e[10]||(e[10]=e=>t.add.form.source=e),maxlength:"16",maxWidth:"240px"},null,8,["value"])])),_:1}),(0,l.Wm)(Q,{label:"作者"},{default:(0,l.w5)((()=>[(0,l.Wm)(R,{value:t.add.form.author,"onUpdate:value":e[11]||(e[11]=e=>t.add.form.author=e),maxlength:"16",maxWidth:"240px"},null,8,["value"])])),_:1}),(0,l.Wm)(Q,{label:"摘要"},{default:(0,l.w5)((()=>[(0,l.Wm)(R,{value:t.add.form.summary,"onUpdate:value":e[12]||(e[12]=e=>t.add.form.summary=e),maxlength:"300",maxWidth:"90%",placeholder:"新闻简介"},null,8,["value"])])),_:1})])),_:1})])),_:1},8,["show"]),(0,l.Wm)(et,{title:"编辑",width:"720px",show:t.edit.show,"onUpdate:close":e[22]||(e[22]=e=>t.edit.show=e)},{footer:(0,l.w5)((()=>[(0,l.Wm)(A,{onClick:e[21]||(e[21]=e=>t.subEdit())},{default:(0,l.w5)((()=>[F])),_:1})])),default:(0,l.w5)((()=>[(0,l.Wm)(tt,{class:"form"},{default:(0,l.w5)((()=>[(0,l.Wm)(Q,{label:"封面图",height:"auto"},{default:(0,l.w5)((()=>[(0,l.Wm)(L,{width:"120px",height:"120px",radius:"4px",url:t.edit.form.img,onClick:e[15]||(e[15]=e=>t.upImg("edit"))},null,8,["url"])])),_:1}),(0,l.Wm)(Q,{label:"所属"},{default:(0,l.w5)((()=>[(0,l.Wm)(X,{value:t.edit.form.cid,"onUpdate:value":e[16]||(e[16]=e=>t.edit.form.cid=e),placeholder:"选择分类",data:t.menus.data},null,8,["value","data"])])),_:1}),(0,l.Wm)(Q,{label:"标题"},{default:(0,l.w5)((()=>[(0,l.Wm)(R,{value:t.edit.form.title,"onUpdate:value":e[17]||(e[17]=e=>t.edit.form.title=e),maxlength:"30",maxWidth:"80%",placeholder:"新闻标题"},null,8,["value"])])),_:1}),(0,l.Wm)(Q,{label:"来源"},{default:(0,l.w5)((()=>[(0,l.Wm)(R,{value:t.edit.form.source,"onUpdate:value":e[18]||(e[18]=e=>t.edit.form.source=e),maxlength:"16",maxWidth:"240px"},null,8,["value"])])),_:1}),(0,l.Wm)(Q,{label:"作者"},{default:(0,l.w5)((()=>[(0,l.Wm)(R,{value:t.edit.form.author,"onUpdate:value":e[19]||(e[19]=e=>t.edit.form.author=e),maxlength:"16",maxWidth:"240px"},null,8,["value"])])),_:1}),(0,l.Wm)(Q,{label:"摘要"},{default:(0,l.w5)((()=>[(0,l.Wm)(R,{value:t.edit.form.summary,"onUpdate:value":e[20]||(e[20]=e=>t.edit.form.summary=e),maxlength:"300",maxWidth:"90%",placeholder:"新闻简介"},null,8,["value"])])),_:1})])),_:1})])),_:1},8,["show"]),(0,l.Wm)(et,{title:"删除",width:"320px",show:t.del.show,"onUpdate:close":e[24]||(e[24]=e=>t.del.show=e)},{footer:(0,l.w5)((()=>[(0,l.Wm)(A,{onClick:e[23]||(e[23]=e=>t.subDel())},{default:(0,l.w5)((()=>[O])),_:1})])),default:(0,l.w5)((()=>[(0,l.Wm)(at,null,{default:(0,l.w5)((()=>[J])),_:1})])),_:1},8,["show"]),(0,l.Wm)(et,{title:"预览",width:"720px",show:t.content.show,"onUpdate:close":e[25]||(e[25]=e=>t.content.show=e),isFooter:!1},{default:(0,l.w5)((()=>[(0,l._)("div",P,[(0,l._)("h1",j,(0,i.zw)(t.content.form.title),1),(0,l._)("div",q,(0,i.zw)(t.content.form.utime)+" | 作者: "+(0,i.zw)(t.content.form.author)+" | 来源："+(0,i.zw)(t.content.form.source),1),(0,l._)("div",{class:"news_html",innerHTML:t.content.form.content},null,8,H)])])),_:1},8,["show"]),(0,l.Wm)(et,{title:"新闻内容",width:"760px",show:t.content.edit,"onUpdate:close":e[28]||(e[28]=e=>t.content.edit=e)},{footer:(0,l.w5)((()=>[(0,l.Wm)(A,{onClick:e[27]||(e[27]=e=>t.subContent())},{default:(0,l.w5)((()=>[M])),_:1})])),default:(0,l.w5)((()=>[(0,l.Wm)(lt,{class:"form",value:t.content.form.content,"onUpdate:value":e[26]||(e[26]=e=>t.content.form.content=e),menubar:!0,height:500,upload:t.content.upload,placeholder:"新闻内容"},null,8,["value","upload"])])),_:1},8,["show"])])}var A=a(3907),E=a(8907),L=a(6492),$=a(5783),B=a(2367),K=a(6260),V=a(336),Y=a(5219),G=a(1566),Q=a(8615),X=a(2458),tt=a(8484),et=a(5342),at=a(3351),lt=a(6675),ot=a(7685),it=a(9324),dt=a(8650),nt=a(1326),st=a(5249),ut=a(2021),mt=a(5451),rt=a(7800),ct=a(8288),ht=(0,l.aZ)({components:{wmMain:Y.Z,wmRow:G.Z,wmTable:Q.Z,wmCheckbox:X.Z,wmTag:tt.Z,wmPopover:et.Z,wmDialog:at.Z,wmForm:lt.Z,wmFormItem:ot.Z,wmInput:it.Z,wmButton:dt.Z,wmPage:nt.Z,wmSwitch:st.Z,wmImg:ut.Z,wmImgUpload:mt.Z,wmSelect:rt.Z,wmTinymce:ct.Z},data(){const t=(0,A.oR)(),e=t.state,a=t.getters,l={list:[],page:1,limit:20,total:0},o={show:!1,form:{}},i={show:!1,form:{img:""}},d={show:!1,id:"",form:{}},n={show:!1,ids:""},s={data:[],value:{}},u={},m={show:!1,edit:!1,form:{},upload:{url:"news/up_img",width:740,param:{id:""}}};return{state:e,getters:a,page:l,sea:o,add:i,edit:d,del:n,menus:s,menusName:u,content:m}},mounted(){B.Z.getItem("token")&&(this.getClass(),this.loadData())},methods:{getClass(){(0,$.Z)("news/get_class",{token:B.Z.getItem("token")},(t=>{const e=t.data;if(0!=e.code)return(0,L.Z)(e.msg);{const t=e.data;this.menus.data=t;for(let e in t)this.menusName[t[e]["value"]]=t[e]["label"]}}))},loadData(){this.page.list=[],this.page.total=0;const t=(0,E.Z)();(0,$.Z)("news/list",{token:B.Z.getItem("token"),page:this.page.page,limit:this.page.limit,data:JSON.stringify(this.sea.form)},(e=>{t.clear();const a=e.data;if(0!=a.code)return(0,L.Z)(a.msg);this.page.list=a.list,this.page.total=a.total}))},subPage(t){this.page.page=t,this.loadData()},subSea(){this.page.page=1,this.loadData()},subAdd(){const t=this.add.form;if(""==t.img)return(0,L.Z)("请上传封面图!");if(!t.cid)return(0,L.Z)("请选择分类!");if(!t.title||t.title.length<2)return(0,L.Z)("新闻标题2～30字符!");this.add.show=!1;const e=JSON.stringify(t),a=(0,E.Z)();(0,$.Z)("news/add",{token:B.Z.getItem("token"),data:e},(e=>{a.clear();const l=e.data;return 0===l.code&&(this.loadData(),t.img="",t.cid="",t.title="",t.source="",t.author="",t.summary=""),(0,L.Z)(l.msg)}))},editData(){const t=this.$refs.Table,e=t.getRow();if(!e)return(0,L.Z)("请选择数据!");this.edit.show=!0,this.edit.id=e.id,this.edit.form.img=e.img,this.edit.form.cid=e.cid,this.edit.form.title=e.title,this.edit.form.source=e.source,this.edit.form.author=e.author,this.edit.form.sort=e.sort,this.edit.form.summary=e.summary},subEdit(){const t=this.edit.form;if(""==t.img)return(0,L.Z)("请上传封面图!");if(!t.cid)return(0,L.Z)("请选择分类!");if(!t.title||t.title.length<2)return(0,L.Z)("新闻标题2～30字符!");this.edit.show=!1;const e=this.edit.id,a=JSON.stringify(t),l=(0,E.Z)();(0,$.Z)("news/edit",{token:B.Z.getItem("token"),id:e,data:a},(t=>{l.clear();const e=t.data;return 0===e.code&&this.loadData(),(0,L.Z)(e.msg)}))},delData(){const t=this.$refs.Table,e=t.getVals();if(!e)return(0,L.Z)("请选择数据!");this.del.show=!0,this.del.ids=JSON.stringify(e)},subDel(){this.del.show=!1;const t=(0,E.Z)();(0,$.Z)("news/del",{token:B.Z.getItem("token"),data:this.del.ids},(e=>{t.clear();const a=e.data;return 0===a.code&&this.loadData(),(0,L.Z)(a.msg)}))},upImg(t){(0,K.Z)((e=>{(0,V.Z)(e,{width:400,height:400},(e=>{"add"==t?this.add.form.img=e:"edit"==t&&(this.edit.form.img=e)}))}))},setState(t,e){(0,$.Z)("news/state",{token:B.Z.getItem("token"),id:e,state:t},(t=>{const e=t.data;return(0,L.Z)(e.msg)}))},openShow(t){this.content.show=!0;const e=this.content.form;e.title=t.title,e.utime=t.utime,e.source=t.source,e.author=t.author,e.content="",(0,$.Z)("news/get_content",{token:B.Z.getItem("token"),id:t.id},(t=>{const a=t.data;if(0!=a.code)return(0,L.Z)(a.msg);e.content=a.content}))},setContent(t){this.content.edit=!0;const e=this.content.form;e.id=t,e.content="",this.content.upload.param.id=t,(0,$.Z)("news/get_content",{token:B.Z.getItem("token"),id:t},(t=>{const a=t.data;if(0!=a.code)return(0,L.Z)(a.msg);e.content=a.content}))},subContent(){this.content.edit=!1;const t={id:this.content.form.id,content:this.content.form.content},e=(0,E.Z)();(0,$.Z)("news/content",{token:B.Z.getItem("token"),data:JSON.stringify(t)},(t=>{e.clear();const a=t.data;return(0,L.Z)(a.msg)}))}}}),wt=a(3744);const pt=(0,wt.Z)(ht,[["render",R],["__scopeId","data-v-116013a4"]]);var ft=pt}}]);