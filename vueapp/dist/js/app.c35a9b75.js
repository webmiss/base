(function(t){function e(e){for(var o,a,i=e[0],c=e[1],u=e[2],l=0,d=[];l<i.length;l++)a=i[l],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&d.push(r[a][0]),r[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);p&&p(e);while(d.length)d.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],o=!0,a=1;a<n.length;a++){var i=n[a];0!==r[i]&&(o=!1)}o&&(s.splice(e--,1),t=c(c.s=n[0]))}return t}var o={},a={app:0},r={app:0},s=[];function i(t){return c.p+"js/"+({}[t]||t)+"."+{"chunk-0ba47dcd":"e8650e90","chunk-2a2c7a73":"befb113c","chunk-7d4535bb":"c5ed36be"}[t]+".js"}function c(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={"chunk-2a2c7a73":1,"chunk-7d4535bb":1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise((function(e,n){for(var o="css/"+({}[t]||t)+"."+{"chunk-0ba47dcd":"31d6cfe0","chunk-2a2c7a73":"ee466d57","chunk-7d4535bb":"dd2b5e92"}[t]+".css",r=c.p+o,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var u=s[i],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===o||l===r))return e()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){u=d[i],l=u.getAttribute("data-href");if(l===o||l===r)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var o=e&&e.target&&e.target.src||r,s=new Error("Loading CSS chunk "+t+" failed.\n("+o+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=o,delete a[t],p.parentNode.removeChild(p),n(s)},p.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[t]=0})));var o=r[t];if(0!==o)if(o)e.push(o[2]);else{var s=new Promise((function(e,n){o=r[t]=[e,n]}));e.push(o[2]=s);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=i(t);var d=new Error;u=function(e){l.onerror=l.onload=null,clearTimeout(p);var n=r[t];if(0!==n){if(n){var o=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+o+": "+a+")",d.name="ChunkLoadError",d.type=o,d.request=a,n[1](d)}r[t]=void 0}};var p=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(e)},c.m=t,c.c=o,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)c.d(n,o,function(e){return t[e]}.bind(null,o));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var d=0;d<u.length;d++)e(u[d]);var p=l;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"0c30":function(t,e,n){},"380d":function(t,e,n){"use strict";var o=n("cd49");e["a"]=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;o["default"].$router.goBack(-t)}},"5f03":function(t,e,n){"use strict";var o="https://demo-php.webmis.vip/",a="wss://demo-php.webmis.vip/wss";e["a"]={title:"WebMIS VueAPP",version:"1.0.0",copy:"Copyright © WebMIS.vip 2021",baseUrl:o,apiUrl:o+"api/",token:"",themes:{primary:"#6FB737",success:"#67C23A",warning:"#E6A23C",danger:"#F56C6C",info:"#909399",bgcolor:"#F2F4F8",text:"#303133",text1:"#606266",text2:"#909399",text3:"#C0C4CC",border:"#E2E4E8",border1:"#DCDFE6",border2:"#E4E7ED",border3:"#EBEEF5",border4:"#F2F4F8"},request:{headers:{"Content-Type":"application/x-www-form-urlencoded"},responseType:"json",timeout:1e4},statusBar:{height:48,color:"#333",bgColor:"#FFF"},update:{start:!0,bg:"#24292E",logoBg:"#FFFFFF",loading:"#6FB737",loaded:"#000000",copy:"#666666",msgColor:"#999999",butColor:"#FFFFFF",butBg:"#6FB737",butText:"下载并安装"},upIosUrl:"itms-apps://itunes.apple.com/cn/app/tao-bao-sui-shi-sui-xiang/id387682726?mt=8",login:{start:!0,api:"user/token",uinfo:"uinfo",time:1e4},amap:{start:!0,jsapi_key:"d956f0c3e15489a1b5bf291e5d133c8a"},socket:{type:"api",start:!1,server:a,time:3e3,heartbeat:1e4},msg:{content:"content",browser:!1},wx_type:0,wx_id:"gh_a6ddccd2bb08"}},"7ab7":function(t,e,n){"use strict";e["a"]=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"提示",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3,n=document.createElement("div");n.setAttribute("class","wm-ui_toast"),n.innerHTML="<span>"+t+"</span>",document.body.appendChild(n),setTimeout((function(){n.style.opacity="1",n.style.top="10%"}),100),setTimeout((function(){document.body.removeChild(n)}),e)}},af02:function(t,e,n){"use strict";n("de27")},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("b0c0");var o=n("7a23"),a=Object(o["J"])("data-v-a4db5972");Object(o["v"])("data-v-a4db5972");var r={id:"app"},s={class:"update_ct verticalCenter"},i=Object(o["j"])("div",null,null,-1),c={class:"load_button"};Object(o["t"])();var u=a((function(t,e,n,u,l,d){var p=Object(o["A"])("router-view");return Object(o["s"])(),Object(o["f"])("div",r,[t.update.show?(Object(o["s"])(),Object(o["f"])("div",{key:0,class:"update_body",style:{backgroundColor:t.updateCfg.bg}},[Object(o["j"])("div",s,[Object(o["j"])("div",{class:"logo",style:{backgroundColor:t.updateCfg.logoBg}},[i],4),Object(o["j"])("div",{class:"loading",style:{backgroundImage:"linear-gradient(to right, "+t.updateCfg.loading+", "+t.updateCfg.loading+" "+t.update.loading+", "+t.updateCfg.loaded+" "+t.update.loading+", "+t.updateCfg.loaded+" 100%)"}},null,4),Object(o["j"])("div",{class:"load_msg",style:{color:t.updateCfg.msgColor}},Object(o["D"])(t.update.msg),5),Object(o["j"])("div",c,[t.update.down?(Object(o["s"])(),Object(o["f"])("button",{key:0,class:"Button",onClick:e[1]||(e[1]=function(e){return t.updateDown()}),style:{color:t.updateCfg.butColor,backgroundColor:t.updateCfg.butBg}},Object(o["D"])(t.updateCfg.butText),5)):Object(o["g"])("",!0)])]),Object(o["j"])("div",{class:"update_logo",style:{color:t.updateCfg.copy}},[Object(o["j"])("h1",null,Object(o["D"])(t.info.title),1),Object(o["j"])("h2",null,Object(o["D"])(t.info.copy),1)],4)],4)):Object(o["g"])("",!0),Object(o["j"])(p,null,{default:a((function(e){var n=e.Component;return[Object(o["j"])(o["c"],{name:t.transitionName},{default:a((function(){return[(Object(o["s"])(),Object(o["f"])(o["b"],{include:t.state.keepAlive},[(Object(o["s"])(),Object(o["f"])(Object(o["B"])(n),{class:"view"}))],1032,["include"]))]})),_:2},1032,["name"])]})),_:1})])})),l=(n("b680"),n("5502")),d=n("5f03"),p=n("7ab7"),f={setItem:function(t,e){return window.localStorage.setItem(t,e)},getItem:function(t){return window.localStorage.getItem(t)},removeItem:function(t){return window.localStorage.removeItem(t)},clear:function(){return window.localStorage.clear()}},h=n("bc3a"),b=n.n(h),g=function(t,e,n,o,a){t="http"==t.substr(0,4)?t:"/"==t.substr(0,1)?d["a"].baseUrl+t.substr(1):d["a"].apiUrl+t;var r=new FormData;for(var s in e)r.append(s,e[s]);var i={headers:d["a"].request.headers,responseType:d["a"].request.responseType,timeout:d["a"].request.timeout};a&&a.responseType&&(i.responseType=a.responseType),a&&a.onUploadProgress&&(i.onUploadProgress=a.onUploadProgress),b.a.post(t,r,i).then(n).catch(o)},m=n("380d"),v=function(t){document.addEventListener("plusready",t,!1)},y=function(t){try{var e=plus.webview.currentWebview();plus.key.addEventListener("backbutton",(function(){e.canBack(t)}))}catch(n){return Object(p["a"])("Android返回键")}},k=function(t,e,n){d["a"].msg.browser&&window.Notification&&"denied"!==Notification.permission&&Notification.requestPermission((function(n){new Notification(t,{body:e})}));var o="title"==d["a"].msg.content?t:e;if(Object(p["a"])(o),n=n||!1,n){var a=f.getItem("token")||"";if(!a)return Object(p["a"])("请先登录!");g("Usermain/baiduAudio",{token:a,text:o},(function(t){var e=t.data;if(0!=e.code)return Object(p["a"])(e.msg);var n=new Audio;n.src=e.url;try{if("iOS"==plus.os.name){var a=plus.ios.importClass("AVAudioSession"),r=a.sharedInstance();r.setCategoryerror("AVAudioSessionCategoryPlayback",null),r.setActiveerror("YES",null);var s=plus.ios.importClass("AVSpeechSynthesizer"),i=plus.ios.importClass("AVSpeechUtterance"),c=plus.ios.import("AVSpeechSynthesisVoice"),u=new s,l=c.voiceWithLanguage("zh-CN"),d=i.speechUtteranceWithString(o);d.setVoice(l),u.speakUtterance(d)}else n.play()}catch(f){n.play()}}))}},j={router:function(t,e){"msg"==e.type?this.msg(t,e):"notify"==e.type&&this.notify(t,e)},msg:function(t,e){var n=f.getItem("voice");k(e.data.title,e.data.content,!!n)},notify:function(t,e){console.log(t,e)}},w=null,O=null,C=null,S={state:w,socketInterval:O,heartbeatInterval:C,start:function(){var t=this;this.state=D.$store.state,clearInterval(this.socketInterval),this.socketInterval=setInterval((function(){!t.state.isLogin||t.state.socket&&1==t.state.socket.readyState||t.start()}),d["a"].socket.time);var e=f.getItem("token");if(!e)return!1;d["a"].socket.start&&this.socketOpen(e)},socketOpen:function(t){var e=this;this.state.socket=new WebSocket(d["a"].socket.server+"?type="+d["a"].socket.type+"&token="+t),this.state.socket.onopen=function(){console.log("Socket开启"),clearInterval(e.heartbeatInterval),e.heartbeatInterval=setInterval((function(){try{e.state.socket.send(JSON.stringify({type:""}))}catch(t){e._closeMsg()}}),d["a"].socket.heartbeat)},this.state.socket.onclose=function(){console.log("Socket关闭"),e._closeMsg()},this.state.socket.onmessage=function(t){var n=JSON.parse(t.data);if(0!=n.code)return Object(p["a"])(n.msg);j.router(e.state.socket,n)}},_closeMsg:function(){this.state.socket&&(this.state.socket.close(),this.state.socket=null)}},I=null,F=null,E={state:I,tokenInterval:F,init:function(){var t=this;this.state=D.$store.state,this.setSize(),window.onresize=function(){t.setSize()},this.setApp(),d["a"].login.start&&(this.tokenState(1),clearInterval(this.tokenInterval),this.tokenInterval=setInterval((function(){t.tokenState(0)}),d["a"].login.time)),d["a"].socket.start&&S.start()},setSize:function(){this.state.width=document.body.offsetWidth,this.state.height=document.body.offsetHeight},tokenState:function(t){var e=this,n=f.getItem("token");n?g(d["a"].login.api,{token:n,uinfo:t},(function(t){var n=t.data;0==n.code?(e.state.isLogin=!0,n[d["a"].login.uinfo]&&(e.state.uInfo=n[d["a"].login.uinfo])):(e.state.isLogin=!1,e.state.uInfo={},f.setItem("token",""))})):(this.state.isLogin=!1,f.removeItem("token"))},setApp:function(){var t=this;v((function(){plus.screen.lockOrientation("portrait-primary"),plus.navigator.setStatusBarStyle("dark"),plus.navigator.setStatusBarBackground("#FFFFFF"),t.state.statusHeight=plus.navigator.getStatusbarHeight(),setTimeout((function(){plus.navigator.closeSplashscreen()}),300),document.addEventListener("uistylechange",(function(){t.state.mode=plus.navigator.getUiStyle()}),!1);var e=0;y((function(n){n.canBack?(t.state.scan&&t.state.scan.close(),Object(m["a"])(1)):(e>0&&plus.runtime.quit(),Object(p["a"])("再按一次退出应用!"),e++,setTimeout((function(){e=0}),2e3))}))}))}},A=(n("ac1f"),n("1276"),function(t,e){if(t==e)return!0;var n=t.split("."),o=e.split(".");return parseInt(n[0])>parseInt(o[0])||(parseInt(n[1])>parseInt(o[1])||parseInt(n[2])>parseInt(o[2]))}),_=Object(o["k"])({name:"APP",components:{},data:function(){var t=Object(l["b"])(),e=t.state,n=this.$router,o="",a={show:!1,os:"",down:!1,loading:"0%",msg:"检测更新",file:"",total:0},r=d["a"].update,s={title:d["a"].title,version:d["a"].version,copy:d["a"].copy};return{state:e,router:n,transitionName:o,update:a,updateCfg:r,info:s}},watch:{$route:function(t,e){"/"==t.path&&"/"==e.path||(this.transitionName=this.router.isBack?"slide-right":"slide-left",this.router.isBack=!1)}},computed:{mode:function(){return this.state.mode}},mounted:function(){setTimeout((function(){E.init()}),400),d["a"].update.start&&this.isUpdate()},methods:{isUpdate:function(){var t=this;v((function(){t.update.os=plus.os.name,g("index/appUpdate",{os:t.update.os},(function(e){var n=e.data;if(0!=n.code)return!1;plus.runtime.getProperty(plus.runtime.appid,(function(e){if(A(e.version,n.version))return!1;t.update.show=!0,t.update.down=!0,t.update.msg="新版本: "+n.version+"&nbsp;&nbsp;大小: "+(n.size/1024/1024).toFixed(2)+"MB",t.update.file=d["a"].baseUrl+n.file,t.update.total=n.size}))}))}))},updateDown:function(){var t=this;if(this.update.down=!1,this.update.msg="开始下载",this.update.loading="0%","iOS"==this.update.os)this.update.msg="请在桌面查看安装进度",window.open(d["a"].upIosUrl),setTimeout((function(){plus.runtime.quit()}),5e3);else{var e=plus.downloader.createDownload(this.update.file,{filename:"_doc/download/",timeout:30},(function(e,n){200==n?plus.runtime.install(e.filename,{force:!0},(function(){plus.runtime.restart()}),(function(){Object(p["a"])("安装失败!")})):(t.update.down=!0,t.update.msg="下载失败")}));e.start(),e.addEventListener("statechanged",(function(e,n){var o=parseInt(e.downloadedSize/t.update.total*100);t.update.loading=o+"%",t.update.msg="正在下载："+t.update.loading,o>=100&&(t.update.msg="下载完成，安装并重启")}))}}}});n("af02"),n("e4ce");_.render=u,_.__scopeId="data-v-a4db5972";var B=_,T=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),x=[{path:"/",name:"home",component:function(){return n.e("chunk-2a2c7a73").then(n.bind(null,"bb51"))}},{path:"/refresh",name:"Refresh",component:function(){return n.e("chunk-0ba47dcd").then(n.bind(null,"ea97"))}},{path:"/demo",name:"Demo",meta:{keepAlive:!1},component:function(){return n.e("chunk-7d4535bb").then(n.bind(null,"c876"))}}],P=Object(T["a"])({history:Object(T["b"])(""),routes:x});P.goBack=function(t){this.isBack=!0,this.go(t)};var U=P,L=Object(l["a"])({state:{mode:"light",width:0,height:0,statusHeight:0,scan:null,isLogin:"",uInfo:{},geolocation:{},socket:null,keepAlive:["Home"]},mutations:{},actions:{},modules:{}});document.body.ontouchstart=function(){try{"iOS"!=plus.os.name&&document.createElement("audio")}catch(t){document.createElement("audio")}};var N=Object(o["e"])(B).use(L).use(U).mount("#app"),D=e["default"]=N},de27:function(t,e,n){},e4ce:function(t,e,n){"use strict";n("0c30")}});