"use strict";(self["webpackChunkwebmis_vue"]=self["webpackChunkwebmis_vue"]||[]).push([[560],{1308:function(e,t,i){i.r(t),i.d(t,{default:function(){return ge}});var s=i(6252),l=i(3577);const o=e=>((0,s.dD)("data-v-5263f43e"),e=e(),(0,s.Cn)(),e),n={class:"ui_action flex_left"},a={class:"ui_action_list flex_left"},m={class:"file_path"},r={class:"path"},d={key:0},c=o((()=>(0,s._)("a",null,"返回上级",-1))),h=[c],u=o((()=>(0,s._)("span",{class:"split"},"|",-1))),f=o((()=>(0,s._)("a",null,"全选",-1))),w=[f],p=o((()=>(0,s._)("span",{class:"split"},"|",-1))),g={class:"info"},_={class:"file_body"},k={key:0},y=["onClick"],v=o((()=>(0,s._)("i",{class:"check"},null,-1))),b=[v],C=["onClick"],D=o((()=>(0,s._)("div",{class:"file_ct"},[(0,s._)("i",{class:"icons icon_folder_solid"})],-1))),Z=["title"],x=["onClick"],I=o((()=>(0,s._)("i",{class:"check"},null,-1))),F=[I],z=["onClick"],S={class:"file_ct"},U={key:1,class:"icons icon_file_solid"},W=["title"],q={key:1,class:"folder_null"},R=(0,s.Uk)("新 建"),j=(0,s.Uk)("重命名"),B=(0,s.Uk)("确定"),A=(0,s.Uk)("是否删除已选择文件夹或文件？"),E=(0,s.Uk)("彻底删除");function L(e,t,i,o,c,f){const v=(0,s.up)("wm-input"),I=(0,s.up)("wm-form-item"),L=(0,s.up)("wm-form"),N=(0,s.up)("wm-button"),$=(0,s.up)("wm-dialog"),T=(0,s.up)("wm-uploader"),O=(0,s.up)("wm-row"),V=(0,s.up)("wm-img-view"),P=(0,s.up)("wm-main");return(0,s.wg)(),(0,s.j4)(P,null,{default:(0,s.w5)((()=>[(0,s._)("div",n,[(0,s._)("ul",a,[e.getters.actionShow("upload")?((0,s.wg)(),(0,s.iD)("li",{key:0,onClick:t[0]||(t[0]=t=>e.uploadData())},"上传")):(0,s.kq)("",!0),e.getters.actionShow("mkdir")?((0,s.wg)(),(0,s.iD)("li",{key:1,onClick:t[1]||(t[1]=t=>e.folder.show=!0)},"新建文件夹")):(0,s.kq)("",!0),e.getters.actionShow("rename")?((0,s.wg)(),(0,s.iD)("li",{key:2,onClick:t[2]||(t[2]=t=>e.renameData())},"重命名")):(0,s.kq)("",!0),e.getters.actionShow("remove")?((0,s.wg)(),(0,s.iD)("li",{key:3,onClick:t[3]||(t[3]=t=>e.delData())},"删除")):(0,s.kq)("",!0)])]),(0,s._)("div",m,[(0,s._)("span",r,["/"==e.info.path?((0,s.wg)(),(0,s.iD)("span",d,"根目录")):((0,s.wg)(),(0,s.iD)("span",{key:1,onClick:t[4]||(t[4]=t=>e.backDir())},h)),u,(0,s._)("span",{onClick:t[5]||(t[5]=t=>e.selectAll())},w),p,(0,s._)("span",null,(0,l.zw)(e.info.path),1)]),(0,s._)("span",g,"文件夹( "+(0,l.zw)(e.lists.dirNum)+" ) 文件( "+(0,l.zw)(e.lists.fileNum)+" ) 大小( "+(0,l.zw)(e.lists.size)+" )",1)]),(0,s._)("div",{class:"file_load",style:(0,l.j5)({backgroundImage:"linear-gradient(to right, "+e.theme.primary+", "+e.theme.primary+" "+e.info.loaded+", "+e.theme.minor+" "+e.info.loaded+", "+e.theme.minor+" 100%)"})},[(0,s._)("span",{class:"text",style:(0,l.j5)({width:e.info.loaded})},(0,l.zw)("0%"!=e.info.loaded&&"100%"!=e.info.loaded?e.info.loaded:""),5)],4),(0,s._)("div",_,[0!=e.lists.folder.length||0!=e.lists.files.length?((0,s.wg)(),(0,s.iD)("ul",k,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.lists.folder,((t,i)=>((0,s.wg)(),(0,s.iD)("li",{key:"dir"+i,class:(0,l.C_)(t.check?"file_active":"file_state")},[(0,s._)("div",{class:"file_click",onClick:e=>t.check=!t.check},b,8,y),(0,s._)("div",{class:"file",onClick:i=>e.openFolder(t.name)},[D,(0,s._)("div",{class:"name nowrap",title:t.name},(0,l.zw)(t.name),9,Z)],8,C)],2)))),128)),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.lists.files,((t,i)=>((0,s.wg)(),(0,s.iD)("li",{key:"file"+i,class:(0,l.C_)(t.check?"file_active":"file_state")},[(0,s._)("div",{class:"file_click",onClick:e=>t.check=!t.check},F,8,x),(0,s._)("div",{class:"file",onClick:i=>e.openFile(t.name)},[(0,s._)("div",S,[e.isImg(t.ext)?((0,s.wg)(),(0,s.iD)("div",{key:0,class:"file_img bgImg",style:(0,l.j5)({backgroundImage:"url("+e.info.url+e.lists.path+t.name+")"})},null,4)):((0,s.wg)(),(0,s.iD)("i",U))]),(0,s._)("div",{class:"name nowrap",title:t.name},(0,l.zw)(t.name),9,W)],8,z)],2)))),128))])):((0,s.wg)(),(0,s.iD)("div",q,"文件夹为空"))]),(0,s.Wm)($,{title:"新建文件夹",width:"480px",show:e.folder.show,"onUpdate:close":t[8]||(t[8]=t=>e.folder.show=t)},{footer:(0,s.w5)((()=>[(0,s.Wm)(N,{onClick:t[7]||(t[7]=t=>e.subDir())},{default:(0,s.w5)((()=>[R])),_:1})])),default:(0,s.w5)((()=>[(0,s.Wm)(L,{class:"form"},{default:(0,s.w5)((()=>[(0,s.Wm)(I,{label:"名称"},{default:(0,s.w5)((()=>[(0,s.Wm)(v,{value:e.folder.form.name,"onUpdate:value":t[6]||(t[6]=t=>e.folder.form.name=t),width:"90%",placeholder:"文件夹名称"},null,8,["value"])])),_:1})])),_:1})])),_:1},8,["show"]),(0,s.Wm)($,{title:"重命名",width:"480px",show:e.rename.show,"onUpdate:close":t[11]||(t[11]=t=>e.rename.show=t)},{footer:(0,s.w5)((()=>[(0,s.Wm)(N,{onClick:t[10]||(t[10]=t=>e.subRename())},{default:(0,s.w5)((()=>[j])),_:1})])),default:(0,s.w5)((()=>[(0,s.Wm)(L,{class:"form"},{default:(0,s.w5)((()=>[(0,s.Wm)(I,{label:"名称"},{default:(0,s.w5)((()=>[(0,s.Wm)(v,{value:e.rename.form.name,"onUpdate:value":t[9]||(t[9]=t=>e.rename.form.name=t),width:"90%",placeholder:"重命名的名称"},null,8,["value"])])),_:1})])),_:1})])),_:1},8,["show"]),(0,s.Wm)(T,{class:"hide",ref:"Uploader",url:e.upload.url,name:e.upload.name,param:e.upload.param,onProgress:e.upProgress},null,8,["url","name","param","onProgress"]),(0,s.Wm)($,{title:"下载文件",width:"480px",show:e.down.show,"onUpdate:close":t[13]||(t[13]=t=>e.down.show=t)},{footer:(0,s.w5)((()=>[(0,s.Wm)(N,{onClick:t[12]||(t[12]=t=>e.downFile())},{default:(0,s.w5)((()=>[B])),_:1})])),default:(0,s.w5)((()=>[(0,s.Wm)(O,null,{default:(0,s.w5)((()=>[(0,s.Uk)((0,l.zw)(e.down.filename),1)])),_:1})])),_:1},8,["show"]),(0,s.Wm)($,{title:"删除",width:"400px",show:e.del.show,"onUpdate:close":t[15]||(t[15]=t=>e.del.show=t)},{footer:(0,s.w5)((()=>[(0,s.Wm)(N,{onClick:t[14]||(t[14]=t=>e.subDel())},{default:(0,s.w5)((()=>[E])),_:1})])),default:(0,s.w5)((()=>[(0,s.Wm)(O,null,{default:(0,s.w5)((()=>[A])),_:1})])),_:1},8,["show"]),(0,s.Wm)(V,{ref:"imgShow",show:e.imgView.show,"onUpdate:close":t[16]||(t[16]=t=>e.imgView.show=t)},null,8,["show"])])),_:1})}var N=i(3907),$=i(7830),T=i(8907),O=i(6492),V=i(5783),P=i(2367),G=(e,t)=>{(0,V.Z)(e,t,(e=>{const i=new Blob([e.data]),s=document.createElement("a"),l=window.URL.createObjectURL(i);s.href=l,s.download=t.filename,document.body.appendChild(s),s.click(),document.body.removeChild(s),window.URL.revokeObjectURL(l)}),(()=>{(0,O.Z)("网络加载错误!")}),{responseType:"blob"})},H=i(5262),K=i(1566),Y=i(7491),J=i(6675),M=i(7685),Q=i(6173),X=i(3331);function ee(e,t,i,l,o,n){return(0,s.wg)(),(0,s.iD)("div",{class:"wm-uploader",onClick:t[0]||(t[0]=t=>e.upload())},[(0,s.WI)(e.$slots,"default")])}var te=(0,s.aZ)({name:"UpLoader",props:{url:{type:String,default:""},name:{type:String,default:"up"},param:{type:Object,default:{}}},methods:{upload(){const e=document.createElement("input");e.setAttribute("type","file"),e.setAttribute("style","display: none"),e.setAttribute("multiple","multiple"),document.body.appendChild(e),e.click(),e.onchange=()=>{for(let t=0;t<e.files.length;t++){this.param[this.name]=e.files[t];let i=new FormData;for(let e in this.param)i.append(e,this.param[e]);(0,V.Z)(this.url,i,(e=>{const t=e.data;this.$emit("upload",t)}),(()=>{(0,O.Z)("网络加载错误!")}),{onUploadProgress:e=>{this.$emit("progress",e)}})}}}}}),ie=i(3744);const se=(0,ie.Z)(te,[["render",ee]]);var le=se;const oe={key:0,class:"imgview_load"},ne={class:"imgview_img"},ae=["src"],me={class:"imgview_info"},re={class:"nowrap"},de={key:0};function ce(e,t,i,o,n,a){return e.show?((0,s.wg)(),(0,s.iD)("div",{key:0,ref:"ImgBG",class:"imgview_bg",style:(0,l.j5)({backgroundColor:"rgba(0,0,0,"+e.opacity+")"})},[e.loading?((0,s.wg)(),(0,s.iD)("div",oe,[(0,s._)("i",{class:(0,l.C_)(e.iconLoading),style:(0,l.j5)({color:e.loadColor})},null,6)])):(0,s.kq)("",!0),(0,s._)("div",ne,[(0,s._)("img",{id:"img",src:e.info.src},null,8,ae)]),(0,s._)("div",{class:"imgview_left",onClick:t[0]||(t[0]=t=>e.page(-1))},[0!=e.index?((0,s.wg)(),(0,s.iD)("i",{key:0,class:(0,l.C_)(e.iconLeft)},null,2)):(0,s.kq)("",!0)]),(0,s._)("div",{class:"imgview_right",onClick:t[1]||(t[1]=t=>e.page(1))},[e.index+1!=e.imgs.length?((0,s.wg)(),(0,s.iD)("i",{key:0,class:(0,l.C_)(e.iconRight)},null,2)):(0,s.kq)("",!0)]),(0,s._)("div",me,[(0,s._)("span",re,[(0,s._)("span",null,"名称: "+(0,l.zw)(e.info.name),1),e.info.size?((0,s.wg)(),(0,s.iD)("span",de,"大小: "+(0,l.zw)(e.info.size),1)):(0,s.kq)("",!0),(0,s._)("span",null,"页码: "+(0,l.zw)(e.index+1)+"/"+(0,l.zw)(e.imgs.length),1)])]),(0,s._)("div",{class:"imgview_close",onClick:t[2]||(t[2]=t=>e.close())},[(0,s._)("i",{class:(0,l.C_)(e.iconClose)},null,2)]),(0,s._)("div",{class:"imgview_full",onClick:t[3]||(t[3]=t=>e.Fullscreen())},[(0,s._)("i",{class:(0,l.C_)(e.iconFull)},null,2)])],4)):(0,s.kq)("",!0)}var he=(0,s.aZ)({name:"ImgView",props:{show:{type:Boolean,default:!1},opacity:{type:Number,default:.8},loadColor:{type:String,default:"#6FB737"},iconLoading:{type:String,default:"ui ui_loading"},iconLeft:{type:String,default:"ui ui_left"},iconRight:{type:String,default:"ui ui_right"},iconFull:{type:String,default:"ui ui_full"},iconClose:{type:String,default:"ui ui_close"}},data(){const e=!0,t=0,i=[],s={src:"",name:"",size:""};return{loading:e,index:t,imgs:i,info:s}},mounted(){},methods:{open(e,t){this.imgs=e||[],this.setImg(t),setTimeout((()=>{let e=this.$refs.ImgBG;e&&(e.style.opacity=1)}),300);const i=this;document.onkeydown=function(e){let t=e||window.event||arguments.callee.caller.arguments[0];t&&27==t.keyCode&&i.close()}},page(e){if(e=this.index+e,e<0||e>=this.imgs.length)return!1;this.setImg(e)},close(){setTimeout((()=>{this.$emit("update:close",!1)}),300);let e=this.$refs.ImgBG;e&&(e.style.opacity=0)},setImg(e){const t=this;this.index=e||0,this.info.src=this.imgs[this.index].src,this.info.name=this.imgs[this.index].name,this.info.size=this.imgs[this.index].size||"";let i=document.getElementById("img");i&&(i.style.opacity="0",i.style.width="0",i.style.height="0"),this.loading=!0;let s=new Image;s.src=this.info.src,s.onload=function(){let e=document.body.clientWidth-20,s=document.body.clientHeight-20,l=this.width/this.height,o=e/s,n="auto",a="auto";(this.width>e||this.height>s)&&(l>o?n=e+"px":a=s+"px"),setTimeout((()=>{t.loading=!1,i=document.getElementById("img"),i.style.opacity="1",i.style.width=n,i.style.height=a}),300)}},Fullscreen(){let e=this.$refs.ImgBG;e.webkitRequestFullScreen?document.webkitIsFullScreen?document.webkitCancelFullScreen():e.webkitRequestFullScreen():e.mozRequestFullScreen?document.mozFullScreen?document.mozCancelFullScreen():e.mozRequestFullScreen():e.msRequestFullscreen?document.msFullscreenElement?document.msExitFullscreen():e.msRequestFullscreen():e.requestFullscreen&&(document.exitFullscreen?document.exitFullscreen():e.requestFullscreen())}}});const ue=(0,ie.Z)(he,[["render",ce],["__scopeId","data-v-4eb1de59"]]);var fe=ue,we=(0,s.aZ)({components:{wmMain:H.Z,wmRow:K.Z,wmDialog:Y.Z,wmForm:J.Z,wmFormItem:M.Z,wmInput:Q.Z,wmButton:X.Z,wmUploader:le,wmImgView:fe},data(){const e=(0,N.oR)(),t=e.state,i=e.getters,s={primary:$.Z.themes.primary.plain[0],minor:$.Z.themes.primary.plain[2]},l={url:"",path:"/",loaded:"0%"},o={url:"",folder:[],files:[],dirNum:0,fileNum:0,size:"0KB"},n={show:!1,form:{name:""}},a={show:!1,form:{rename:"",name:""}},m={url:"sys_file/upload",name:"up",param:{}},r={show:!1,filename:""},d={show:!1,form:{name:"",files:[]}},c={show:!1,data:[]},h={show:!1,imgs:[],index:0};return{state:t,getters:i,theme:s,info:l,lists:o,folder:n,rename:a,upload:m,down:r,zip:d,del:c,imgView:h}},mounted(){P.Z.getItem("token")&&this.loadData()},methods:{loadData(){const e=(0,T.Z)();(0,V.Z)("sys_file/list",{token:P.Z.getItem("token"),path:this.info.path},(t=>{e.clear();const i=t.data;0==i.code&&(this.info.url=i.url,this.lists=i.data)}))},selectAll(){const e=this.lists.folder;for(let i in e)e[i].check=!e[i].check;const t=this.lists.files;for(let i in t)t[i].check=!t[i].check},backDir(){const e=this.info.path.split("/").filter((e=>e));if(e.length<=1)this.info.path="/";else{this.info.path="/";for(let t=0;t<e.length-1;t++)this.info.path+=e[t]+"/"}this.loadData()},subDir(){const e=this.folder.form.name;if(!this.isExist(e))return!1;this.folder.show=!1,this.subAjax("mkdir",{path:this.info.path,name:e})},renameData(){const e=this.getCheckName();e&&(this.rename.show=!0,this.rename.form.rename=e[0],this.rename.form.name=e[0])},subRename(){const e=this.rename.form.rename,t=this.rename.form.name;return t?!!this.isExist(t)&&(this.rename.show=!1,void this.subAjax("rename",{path:this.info.path,rename:e,name:t})):(0,O.Z)("名称不能为空")},uploadData(){this.upload.param={token:P.Z.getItem("token"),path:this.info.path};const e=this.$refs.Uploader;e.upload()},upProgress(e){let t=e.loaded/e.total*100|0;t<100?this.info.loaded=t+"%":(this.info.loaded="0%",setTimeout((()=>{this.loadData()}),1e3))},downFile(){this.down.show=!1,G("sys_file/down",{token:P.Z.getItem("token"),path:this.info.path,filename:this.down.filename})},delData(){const e=this.getCheckName();e&&(this.del.show=!0,this.del.data=e)},subDel(){const e=JSON.stringify(this.del.data);this.del.show=!1,this.subAjax("remove",{path:this.info.path,data:e})},openFolder(e){this.info.path+=e+"/",this.loadData()},openFile(e){const t=this.getType(e);if(this.isImg(t)){const t=this.lists.files;let i=[],s=0;for(let l in t)this.isImg(t[l].ext)&&(e==t[l].name&&(s=i.length),i.push({src:this.info.url+this.lists.path+t[l].name,name:t[l].name,size:t[l].size}));this.imgView.show=!0,this.$refs.imgShow.open(i,s)}else this.down.show=!0,this.down.filename=e},isImg(e){const t=["png","jpg","jpeg","gif","svg"],i=t.indexOf(e);return i>=0},isExist(e){if(!e)return(0,O.Z)("请填写名称"),!1;let t=!0;const i=this.lists.folder,s=this.lists.files;for(let l in i)i[l].name==e&&((0,O.Z)("已存在文件夹"),t=!1);for(let l in s)s[l].name==e&&((0,O.Z)("已存在文件"),t=!1);return t},getCheckName(){const e=this.lists.folder,t=this.lists.files;let i=[];for(let s in e)e[s].check&&i.push(e[s].name);for(let s in t)t[s].check&&i.push(t[s].name);return i.length<1?((0,O.Z)("请选择内容"),!1):i},getType(e){const t=e.lastIndexOf(".")+1,i=e.length;return e.substring(t,i)},subAjax(e,t,i,s){t.token=P.Z.getItem("token");const l=(0,T.Z)();(0,V.Z)("sys_file/"+e,t,(e=>{l.clear();const t=e.data;i&&i(t),t.msg&&(0,O.Z)(t.msg),0===t.code&&this.loadData()}),(()=>{}),s)}}});const pe=(0,ie.Z)(we,[["render",L],["__scopeId","data-v-5263f43e"]]);var ge=pe}}]);