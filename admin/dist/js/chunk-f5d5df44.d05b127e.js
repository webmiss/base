(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f5d5df44"],{"25b9":function(t,e,i){"use strict";var s=i("f2a4"),a=i.n(s);a.a},"52e8":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-input",{staticClass:"hide",model:{value:t.actionType,callback:function(e){t.actionType=e},expression:"actionType"}}),i("el-row",{staticClass:"body"},[i("el-row",{staticClass:"file_path"},[i("span",{staticClass:"path"},[i("span",{on:{click:function(e){return t.selectAll()}}},[i("a",[t._v("全选")])]),i("span",{staticClass:"split"},[t._v("|")]),"/"==t.path?i("span",[t._v("根目录")]):i("span",{on:{click:function(e){return t.backDir()}}},[i("a",[t._v("上级")])]),i("span",{staticClass:"split"},[t._v("|")]),i("span",[t._v(t._s(t.path))])]),i("span",{staticClass:"info"},[t._v("文件夹( "+t._s(t.lists.dirNum)+" ) 文件( "+t._s(t.lists.fileNum)+" ) 大小( "+t._s(t.lists.size)+" )")])]),i("el-row",{staticClass:"file_load",style:{backgroundImage:"linear-gradient(to right, #6FB737, #6FB737 "+t.loaded+", #F2F4F6 "+t.loaded+", #F2F4F6 100%)"}},[i("span",{staticClass:"text",style:{width:t.loaded}},[t._v(t._s(t.loaded))])]),0!=t.lists.folder.length||0!=t.lists.files.length?i("ul",{staticClass:"file_body"},[t._l(t.lists.folder,(function(e,s){return i("li",{key:"dir"+s,class:e.check?"file_active":"file_state"},[i("div",{staticClass:"file_click",on:{click:function(t){e.check=!e.check}}},[i("i",{staticClass:"el-icon-success"})]),i("div",{staticClass:"file",on:{click:function(i){return t.openFolder(e.name)}}},[i("div",{staticClass:"file_ct"},[i("i",{staticClass:"icons icon_folder"})]),i("div",{staticClass:"name nowrap",attrs:{title:e.name}},[t._v(t._s(e.name))])])])})),t._l(t.lists.files,(function(e,s){return i("li",{key:"file"+s,class:e.check?"file_active":"file_state"},[i("div",{staticClass:"file_click",on:{click:function(t){e.check=!e.check}}},[i("i",{staticClass:"el-icon-success"})]),i("div",{staticClass:"file",on:{click:function(i){return t.openFile(e.name)}}},[i("div",{staticClass:"file_ct"},[t.isImg(e.ext)?i("div",{staticClass:"file_img bgImg",style:{backgroundImage:"url("+t.url+t.lists.path+e.name+")"}}):i("i",{staticClass:"icons icon_file_text"})]),i("div",{staticClass:"name nowrap",attrs:{title:e.name}},[t._v(t._s(e.name))])])])}))],2):i("div",{staticClass:"null"})],1),i("el-dialog",{attrs:{title:"新建文件夹",visible:t.folder.show,center:"",width:"480px","close-on-click-modal":!1},on:{"update:visible":function(e){return t.$set(t.folder,"show",e)}}},[i("el-form",{attrs:{model:t.folder.form,"label-width":t.LabelWidth}},[i("el-form-item",{attrs:{label:"名称"}},[i("el-input",{attrs:{placeholder:"文件夹名称"},model:{value:t.folder.form.name,callback:function(e){t.$set(t.folder.form,"name",e)},expression:"folder.form.name"}})],1)],1),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.subDir()}}},[t._v("新 建")])],1)],1),i("el-dialog",{attrs:{title:"打包",visible:t.zipData.show,center:"",width:"480px","close-on-click-modal":!1},on:{"update:visible":function(e){return t.$set(t.zipData,"show",e)}}},[i("el-form",{attrs:{model:t.zipData.form,"label-width":t.LabelWidth}},[i("el-form-item",{attrs:{label:"名称"}},[i("el-input",{attrs:{placeholder:"压缩名称"},model:{value:t.zipData.form.name,callback:function(e){t.$set(t.zipData.form,"name",e)},expression:"zipData.form.name"}},[i("template",{slot:"append"},[t._v(".zip")])],2)],1)],1),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.subZip()}}},[t._v("在线打包")])],1)],1),i("el-dialog",{attrs:{title:"重命名",visible:t.renameData.show,center:"",width:"480px","close-on-click-modal":!1},on:{"update:visible":function(e){return t.$set(t.renameData,"show",e)}}},[i("el-form",{attrs:{model:t.renameData.form,"label-width":t.LabelWidth}},[i("el-form-item",{attrs:{label:"名称"}},[i("el-input",{attrs:{placeholder:"文件夹、文件的名称"},model:{value:t.renameData.form.name,callback:function(e){t.$set(t.renameData.form,"name",e)},expression:"renameData.form.name"}})],1)],1),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.subRename()}}},[t._v("确 定")])],1)],1),i("el-dialog",{attrs:{title:"删除",visible:t.delData.show,center:"",width:"320px"},on:{"update:visible":function(e){return t.$set(t.delData,"show",e)}}},[i("div",[t._v("是否删除已选择文件？")]),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.subDel()}}},[t._v("彻底删除")])],1)]),i("img-view",{ref:"imgShow",model:{value:t.imgView.show,callback:function(e){t.$set(t.imgView,"show",e)},expression:"imgView.show"}})],1)},a=[],n=(i("7f7f"),i("28a5"),i("7c2f")),o=i("58fd"),l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.show?i("div",{ref:"ImgBG",staticClass:"imgview_bg",style:{backgroundColor:"rgba(0,0,0,"+t.opacity+")"}},[t.loading?i("div",{staticClass:"imgview_load"},[i("i",{staticClass:"icons icon_loading"})]):t._e(),i("div",{staticClass:"imgview_img"},[i("img",{attrs:{id:"img",src:t.info.src}})]),i("div",{staticClass:"imgview_left",on:{click:function(e){return t.page(-1)}}},[0!=t.index?i("i",{staticClass:"icons icon_left"}):t._e()]),i("div",{staticClass:"imgview_right",on:{click:function(e){return t.page(1)}}},[t.index+1!=t.imgs.length?i("i",{staticClass:"icons icon_right"}):t._e()]),i("div",{staticClass:"imgview_info"},[i("span",{staticClass:"nowrap"},[i("span",[t._v("名称: "+t._s(t.info.name))]),t.info.size?i("span",[t._v("大小: "+t._s(t.info.size))]):t._e(),i("span",[t._v("页码: "+t._s(t.index+1)+"/"+t._s(t.imgs.length))])])]),i("div",{staticClass:"imgview_close",on:{click:function(e){return t.close()}}},[i("i",{staticClass:"icons icon_close"})]),i("div",{staticClass:"imgview_full",on:{click:function(e){return t.Fullscreen()}}},[i("i",{staticClass:"icons icon_full"})])]):t._e()},r=[],c=(i("c5f6"),{name:"ImageView",model:{prop:"show",event:"show"},props:{show:{type:Boolean,default:!1},opacity:{type:Number,default:.8}},data:function(){return{loading:!0,index:0,imgs:[],info:{src:"",name:"",size:""}}},mounted:function(){var t=this;document.onkeydown=function(e){var i=e||window.event||arguments.callee.caller.arguments[0];i&&27==i.keyCode&&t.close()}},methods:{open:function(t,e){var i=this;this.imgs=t||[],this.setImg(e),setTimeout((function(){var t=i.$refs.ImgBG;t&&(t.style.opacity=1)}),300)},page:function(t){if(t=this.index+t,t<0||t>=this.imgs.length)return!1;this.setImg(t)},close:function(){var t=this;setTimeout((function(){t.$emit("show",!1)}),300);var e=this.$refs.ImgBG;e&&(e.style.opacity=0)},setImg:function(t){var e=this;this.index=t||0,this.info.src=this.imgs[this.index].src,this.info.name=this.imgs[this.index].name,this.info.size=this.imgs[this.index].size||"";var i=document.getElementById("img");i&&(i.style.opacity=0,i.style.width="0",i.style.height="0"),this.loading=!0;var s=new Image;s.src=this.info.src,s.onload=function(){var t=document.body.clientWidth-20,s=document.body.clientHeight-20,a=this.width/this.height,n=t/s,o="auto",l="auto";(this.width>t||this.height>s)&&(a>n?o=t+"px":l=s+"px"),setTimeout((function(){e.loading=!1,i=document.getElementById("img"),i.style.opacity=1,i.style.width=o,i.style.height=l}),300)}},Fullscreen:function(){var t=this.$refs.ImgBG;t.webkitRequestFullScreen?document.webkitIsFullScreen?document.webkitCancelFullScreen():t.webkitRequestFullScreen():t.mozRequestFullScreen?document.mozFullScreen?document.mozCancelFullScreen():t.mozRequestFullScreen():t.msRequestFullscreen?document.msFullscreenElement?document.msExitFullscreen():t.msRequestFullscreen():t.requestFullscreen&&(document.exitFullscreen?document.exitFullscreen():t.requestFullscreen())}}}),m=c,u=i("2877"),h=Object(u["a"])(m,l,r,!1,null,null,null),f=h.exports,d={components:{Action:o["a"],ImgView:f},data:function(){return{LabelWidth:"80px",url:"",path:"/",loaded:"0%",lists:{url:"",folder:[],files:[]},folder:{show:!1,form:{name:""}},zipData:{show:!1,form:{name:"",files:[]}},renameData:{show:!1,form:{rename:"",name:""}},delData:{show:!1,data:[]},imgView:{show:!1,imgs:[],index:0}}},computed:{actionType:function(){var t=this.$store.state.action.type;return"list"==t?this.loadData():"mkdir"==t?this.mkDir():"upload"==t?this.selectFile():"zip"==t?this.zipFile():"rename"==t?this.reName():"remove"==t&&this.rmFile(),t}},mounted:function(){this.$store.state.action.url="SysFileManage",this.$store.state.action.menus=[{name:"新建文件夹",action:"mkdir",ico:"el-icon-folder-add"},{name:"上传",action:"upload",ico:"el-icon-document-add"},{name:"打包",action:"zip",ico:"el-icon-bottom"},{name:"重命名",action:"rename",ico:"el-icon-edit-outline"},{name:"删除",action:"remove",ico:"el-icon-delete"}],this.loadData()},methods:{loadData:function(){var t=this,e=n["a"].loading();n["a"].post("Sysfilemanage/list",{token:n["a"].storage.getItem("token"),path:this.path},(function(i){e.clear();var s=i.data;0==s.code&&(t.url=s.url,t.lists=s.data)}))},selectAll:function(){var t=this.lists.folder;for(var e in t)t[e].check=!t[e].check;var i=this.lists.files;for(var s in i)i[s].check=!i[s].check},isImg:function(t){var e=["png","jpg","jpeg","gif","svg"],i=e.indexOf(t);return i>=0},openFolder:function(t){this.path+=t+"/",this.loadData()},backDir:function(){var t=this.path.split("/").filter((function(t){return t}));if(t.length<=1)this.path="/";else{this.path="/";for(var e=0;e<t.length-1;e++)this.path+=t[e]+"/"}this.loadData()},mkDir:function(){this.folder.show=!0},subDir:function(){var t=this.folder.form.name;this.isExist(t)||(this.folder.show=!1,this.subAjax("mkDir",{path:this.path,name:t}))},zipFile:function(){var t=this.getCheckName();t&&(this.zipData.show=!0,this.zipData.form.files=t)},subZip:function(){var t=this.zipData.form.name,e=JSON.stringify(this.zipData.form.files);t&&!this.isExist(t+".zip")&&(this.zipData.show=!1,this.subAjax("zipFile",{path:this.path,name:t,files:e}))},reName:function(){var t=this.getCheckName();t&&(this.renameData.show=!0,this.renameData.form.rename=t[0],this.renameData.form.name=t[0])},subRename:function(){var t=this.renameData.form.rename,e=this.renameData.form.name;if(!e)return n["a"].toast("名称不能为空");this.isExist(e)||(this.renameData.show=!1,this.subAjax("reName",{path:this.path,rename:t,name:e}))},openFile:function(t){var e=this,i=this.getType(t);if(this.isImg(i)){var s=this.lists.files,a=[],o=0;for(var l in s)this.isImg(s[l].ext)&&(t==s[l].name&&(o=a.length),a.push({src:this.url+this.lists.path+s[l].name,name:s[l].name,size:s[l].size}));this.imgView.show=!0,this.$refs.imgShow.open(a,o)}else n["a"].confirm({title:"文件下载",content:"文件名: "+t,confirmText:"立即下载"},(function(){n["a"].toast("开始下载"),e.downFile(t)}),(function(){n["a"].toast("已取消")}))},selectFile:function(){var t=this,e=document.createElement("input");e.setAttribute("type","file"),e.setAttribute("style","display: none"),e.setAttribute("multiple","multiple"),document.body.appendChild(e),e.click(),e.onchange=function(){for(var i=0;i<e.files.length;i++)t.upFile({token:n["a"].storage.getItem("token"),path:t.path,up:e.files[i]})}},upFile:function(t){var e=this;this.loaded="10%",this.subAjax("upFile",t,(function(t){var i=t;0!==i.code?i.msg&&n["a"].toast(i.msg,"error"):(i.msg&&n["a"].toast(i.msg,"success"),e.loadData())}),{onUploadProgress:function(t){var i=t.loaded/t.total*100|0;e.loaded=i<100?i+"%":"0%"}})},downFile:function(t){this.subAjax("downFile",{path:this.path,file:t},(function(e){var i=new Blob([e]),s=document.createElement("a"),a=window.URL.createObjectURL(i);s.href=a,s.download=t,document.body.appendChild(s),s.click(),document.body.removeChild(s),window.URL.revokeObjectURL(a)}),{responseType:"blob"})},rmFile:function(){var t=this.getCheckName();t&&(this.delData.show=!0,this.delData.data=t)},subDel:function(){var t=JSON.stringify(this.delData.data);this.delData.show=!1,this.subAjax("rmFile",{path:this.path,data:t})},subAjax:function(t,e,i,s){var a=this;e.token=n["a"].storage.getItem("token");var o=n["a"].loading();n["a"].post("Sysfilemanage/"+t,e,(function(t){var e=t.data;i&&i(e),0!==e.code?(o.clear(),e.msg&&n["a"].toast(e.msg,"error")):(e.msg&&n["a"].toast(e.msg,"success"),a.loadData())}),(function(t){}),s)},getCheckName:function(){var t=this.lists.folder,e=this.lists.files,i=[];for(var s in t)t[s].check&&i.push(t[s].name);for(var a in e)e[a].check&&i.push(e[a].name);return i.length<1?n["a"].toast("请选择内容"):i},isExist:function(t){var e=this.lists.folder,i=this.lists.files;if(!t)return n["a"].toast("请填写名称");for(var s in e)if(e[s].name==t)return n["a"].toast("已存在文件夹");for(var a in i)if(i[a].name==t)return n["a"].toast("已存在文件");return!1},getType:function(t){var e=t.lastIndexOf(".")+1,i=t.length;return t.substring(e,i)}}},p=d,v=(i("25b9"),Object(u["a"])(p,s,a,!1,null,"2efe6bf7",null));e["default"]=v.exports},f2a4:function(t,e,i){}}]);