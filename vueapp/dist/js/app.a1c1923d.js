(function(t){function e(e){for(var a,o,i=e[0],u=e[1],c=e[2],l=0,d=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(t[a]=u[a]);p&&p(e);while(d.length)d.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],a=!0,o=1;o<n.length;o++){var i=n[o];0!==r[i]&&(a=!1)}a&&(s.splice(e--,1),t=u(u.s=n[0]))}return t}var a={},o={app:0},r={app:0},s=[];function i(t){return u.p+"js/"+({}[t]||t)+"."+{"chunk-0ba47dcd":"dd3367a8","chunk-420f1e91":"5ec9548c","chunk-df307b4a":"8aa3cc15"}[t]+".js"}function u(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(t){var e=[],n={"chunk-420f1e91":1,"chunk-df307b4a":1};o[t]?e.push(o[t]):0!==o[t]&&n[t]&&e.push(o[t]=new Promise((function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-0ba47dcd":"31d6cfe0","chunk-420f1e91":"ddb43d70","chunk-df307b4a":"c3dd8d56"}[t]+".css",r=u.p+a,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var c=s[i],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===a||l===r))return e()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){c=d[i],l=c.getAttribute("data-href");if(l===a||l===r)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var a=e&&e.target&&e.target.src||r,s=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=a,delete o[t],p.parentNode.removeChild(p),n(s)},p.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){o[t]=0})));var a=r[t];if(0!==a)if(a)e.push(a[2]);else{var s=new Promise((function(e,n){a=r[t]=[e,n]}));e.push(a[2]=s);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=i(t);var d=new Error;c=function(e){l.onerror=l.onload=null,clearTimeout(p);var n=r[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",d.name="ChunkLoadError",d.type=a,d.request=o,n[1](d)}r[t]=void 0}};var p=setTimeout((function(){c({type:"timeout",target:l})}),12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(e)},u.m=t,u.c=a,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)u.d(n,a,function(e){return t[e]}.bind(null,a));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="",u.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var p=l;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"101e":function(t,e,n){"use strict";e["a"]=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"提示",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3,n=document.createElement("div");n.setAttribute("class","wm-ui_toast"),n.innerHTML="<span>"+t+"</span>",document.body.appendChild(n),setTimeout((function(){n.style.opacity="1",n.style.top="10%"}),100),setTimeout((function(){document.body.removeChild(n)}),e)}},4397:function(t,e,n){},"5f03":function(t,e,n){"use strict";var a="https://demo-php.webmis.vip/",o="wss://demo-php.webmis.vip/wss";e["a"]={title:"WebMIS VueAPP",version:"1.0.0",copy:"Copyright © WebMIS.vip 2021",baseUrl:a,apiUrl:a+"api/",token:"",themes:{primary:"#6FB737",success:"#67C23A",warning:"#E6A23C",danger:"#F56C6C",info:"#909399",bgcolor:"#F2F4F8",text:"#303133",text1:"#606266",text2:"#909399",text3:"#C0C4CC",border:"#E2E4E8",border1:"#DCDFE6",border2:"#E4E7ED",border3:"#EBEEF5",border4:"#F2F4F8"},request:{headers:{"Content-Type":"application/x-www-form-urlencoded"},responseType:"json",timeout:1e4},statusBar:{height:48,color:"#333",bgColor:"#FFF"},update:{start:!0,bg:"#24292E",logoBg:"#FFFFFF",loading:"#6FB737",loaded:"#000000",copy:"#666666",msgColor:"#999999",butColor:"#FFFFFF",butBg:"#6FB737",butText:"下载并安装"},upIosUrl:"itms-apps://itunes.apple.com/cn/app/tao-bao-sui-shi-sui-xiang/id387682726?mt=8",login:{start:!0,api:"user/token",uinfo:"uinfo",time:1e4},amap:{start:!0,jsapi_key:"d956f0c3e15489a1b5bf291e5d133c8a"},socket:{type:"api",start:!1,server:o,time:3e3,heartbeat:1e4},msg:{content:"content",browser:!1},wx_type:0,wx_id:"gh_a6ddccd2bb08"}},"62fb":function(t,e,n){"use strict";n("6e72")},"6e72":function(t,e,n){},cd49:function(t,e,n){"use strict";n.r(e);n("b0c0"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("7a23"),o=Object(a["J"])("data-v-5422669d");Object(a["v"])("data-v-5422669d");var r={id:"app"},s={class:"update_ct verticalCenter"},i=Object(a["j"])("div",null,null,-1),u={class:"load_button"};Object(a["t"])();var c=o((function(t,e,n,c,l,d){var p=Object(a["A"])("router-view");return Object(a["s"])(),Object(a["f"])("div",r,[t.update.show?(Object(a["s"])(),Object(a["f"])("div",{key:0,class:"update_body",style:{backgroundColor:t.updateCfg.bg}},[Object(a["j"])("div",s,[Object(a["j"])("div",{class:"logo",style:{backgroundColor:t.updateCfg.logoBg}},[i],4),Object(a["j"])("div",{class:"loading",style:{backgroundImage:"linear-gradient(to right, "+t.updateCfg.loading+", "+t.updateCfg.loading+" "+t.update.loading+", "+t.updateCfg.loaded+" "+t.update.loading+", "+t.updateCfg.loaded+" 100%)"}},null,4),Object(a["j"])("div",{class:"load_msg",style:{color:t.updateCfg.msgColor}},Object(a["D"])(t.update.msg),5),Object(a["j"])("div",u,[t.update.down?(Object(a["s"])(),Object(a["f"])("button",{key:0,class:"Button",onClick:e[1]||(e[1]=function(e){return t.updateDown()}),style:{color:t.updateCfg.butColor,backgroundColor:t.updateCfg.butBg}},Object(a["D"])(t.updateCfg.butText),5)):Object(a["g"])("",!0)])]),Object(a["j"])("div",{class:"update_logo",style:{color:t.updateCfg.copy}},[Object(a["j"])("h1",null,Object(a["D"])(t.updateTitle),1),Object(a["j"])("h2",null,Object(a["D"])(t.updateCopy),1)],4)],4)):Object(a["g"])("",!0),Object(a["j"])(p,null,{default:o((function(e){var n=e.Component;return[Object(a["j"])(a["c"],{name:t.transitionName},{default:o((function(){return[(Object(a["s"])(),Object(a["f"])(a["b"],{include:t.state.keepAlive},[(Object(a["s"])(),Object(a["f"])(Object(a["B"])(n),{class:"view"}))],1032,["include"]))]})),_:2},1032,["name"])]})),_:1})])})),l=(n("b680"),n("5502")),d=n("5f03"),p=n("101e"),f={setItem:function(t,e){return window.localStorage.setItem(t,e)},getItem:function(t){return window.localStorage.getItem(t)},removeItem:function(t){return window.localStorage.removeItem(t)},clear:function(){return window.localStorage.clear()}},h=n("bc3a"),m=n.n(h),g=function(t,e,n,a,o){var r=t.substr(0,4);t="http"==r?t:d["a"].apiUrl+t;var s=new FormData;for(var i in e)s.append(i,e[i]);var u=o||{headers:d["a"].request.headers,responseType:d["a"].request.responseType,timeout:d["a"].request.timeout};m.a.post(t,s,u).then(n).catch(a)},b=n("e643"),v=function(t){document.addEventListener("plusready",t,!1)},k=function(t){try{var e=plus.webview.currentWebview();plus.key.addEventListener("backbutton",(function(){e.canBack(t)}))}catch(n){return Object(p["a"])("Android返回键")}},y=function(t,e,n){d["a"].msg.browser&&window.Notification&&"denied"!==Notification.permission&&Notification.requestPermission((function(n){new Notification(t,{body:e})}));var a="title"==d["a"].msg.content?t:e;if(Object(p["a"])(a),n=n||!1,n){var o=f.getItem("token")||"";if(!o)return Object(p["a"])("请先登录!");g("Usermain/baiduAudio",{token:o,text:a},(function(t){var e=t.data;if(0!=e.code)return Object(p["a"])(e.msg);var n=new Audio;n.src=e.url;try{if("iOS"==plus.os.name){var o=plus.ios.importClass("AVAudioSession"),r=o.sharedInstance();r.setCategoryerror("AVAudioSessionCategoryPlayback",null),r.setActiveerror("YES",null);var s=plus.ios.importClass("AVSpeechSynthesizer"),i=plus.ios.importClass("AVSpeechUtterance"),u=plus.ios.import("AVSpeechSynthesisVoice"),c=new s,l=u.voiceWithLanguage("zh-CN"),d=i.speechUtteranceWithString(a);d.setVoice(l),c.speakUtterance(d)}else n.play()}catch(f){n.play()}}))}},j={router:function(t,e){"msg"==e.type?this.msg(t,e):"notify"==e.type&&this.notify(t,e)},msg:function(t,e){var n=f.getItem("voice");y(e.data.title,e.data.content,!!n)},notify:function(t,e){console.log(t,e)}},O=null,w=0,C=0,I={state:O,socketInterval:w,heartbeatInterval:C,start:function(){var t=this;this.state=D.$store.state,clearInterval(this.socketInterval),this.socketInterval=setInterval((function(){!t.state.isLogin||t.state.socket&&1==t.state.socket.readyState||t.start()}),d["a"].socket.time);var e=f.getItem("token");if(!e)return!1;d["a"].socket.start&&this.socketOpen(e)},socketOpen:function(t){var e=this;this.state.socket=new WebSocket(d["a"].socket.server+"?type="+d["a"].socket.type+"&token="+t),this.state.socket.onopen=function(){console.log("Socket开启"),clearInterval(e.heartbeatInterval),e.heartbeatInterval=setInterval((function(){try{e.state.socket.send(JSON.stringify({type:""}))}catch(t){e._closeMsg()}}),d["a"].socket.heartbeat)},this.state.socket.onclose=function(){console.log("Socket关闭"),e._closeMsg()},this.state.socket.onmessage=function(t){var n=JSON.parse(t.data);if(0!=n.code)return Object(p["a"])(n.msg);j.router(e.state.socket,n)}},_closeMsg:function(){this.state.socket&&(this.state.socket.close(),this.state.socket=null)}},S=null,F=0,E={state:S,tokenInterval:F,init:function(){var t=this;this.state=D.$store.state,this.setApp(),d["a"].login.start&&(this.tokenState(1),clearInterval(this.tokenInterval),this.tokenInterval=setInterval((function(){t.tokenState(0)}),d["a"].login.time)),d["a"].socket.start&&I.start()},tokenState:function(t){var e=this,n=f.getItem("token");n?g(d["a"].login.api,{token:n,uinfo:t},(function(t){var n=t.data;0==n.code?(e.state.isLogin=!0,n[d["a"].login.uinfo]&&(e.state.uInfo=n[d["a"].login.uinfo])):(e.state.isLogin=!1,e.state.uInfo={},f.setItem("token",""))})):(this.state.isLogin=!1,f.removeItem("token"))},setApp:function(){var t=this;v((function(){plus.screen.lockOrientation("portrait-primary"),plus.navigator.setStatusBarStyle("dark"),plus.navigator.setStatusBarBackground("#FFFFFF"),t.state.statusHeight=plus.navigator.getStatusbarHeight(),setTimeout((function(){plus.navigator.closeSplashscreen()}),300),document.addEventListener("uistylechange",(function(){t.state.mode=plus.navigator.getUiStyle()}),!1);var e=0;k((function(n){n.canBack?(t.state.scan&&t.state.scan.close(),Object(b["a"])(1)):(e>0&&plus.runtime.quit(),Object(p["a"])("再按一次退出应用!"),e++,setTimeout((function(){e=0}),2e3))}))}))}},A=(n("ac1f"),n("1276"),function(t,e){if(t==e)return!0;var n=t.split("."),a=e.split(".");return parseInt(n[0])>parseInt(a[0])||(parseInt(n[1])>parseInt(a[1])||parseInt(n[2])>parseInt(a[2]))}),_=Object(a["k"])({name:"APP",components:{},data:function(){var t=Object(l["b"])(),e=t.state,n=this.$router,a="",o={show:!1,os:"",down:!1,loading:"0%",msg:"检测更新",file:"",total:0},r=d["a"].update,s=d["a"].title,i=d["a"].copy;return{state:e,router:n,transitionName:a,update:o,updateCfg:r,updateTitle:s,updateCopy:i}},watch:{$route:function(t,e){"/"==t.path&&"/"==e.path||(this.transitionName=this.router.isBack?"slide-right":"slide-left",this.router.isBack=!1)}},computed:{mode:function(){return this.state.mode}},mounted:function(){setTimeout((function(){E.init()}),400),d["a"].update.start&&this.isUpdate()},methods:{isUpdate:function(){var t=this;v((function(){t.update.os=plus.os.name,g("index/appUpdate",{os:t.update.os},(function(e){var n=e.data;if(0!=n.code)return!1;plus.runtime.getProperty(plus.runtime.appid,(function(e){if(A(e.version,n.version))return!1;t.update.show=!0,t.update.down=!0,t.update.msg="新版本: "+n.version+"&nbsp;&nbsp;大小: "+(n.size/1024/1024).toFixed(2)+"MB",t.update.file=d["a"].baseUrl+n.file,t.update.total=n.size}))}))}))},updateDown:function(){var t=this;if(this.update.down=!1,this.update.msg="开始下载",this.update.loading="0%","iOS"==this.update.os)this.update.msg="请在桌面查看安装进度",window.open(d["a"].upIosUrl),setTimeout((function(){plus.runtime.quit()}),5e3);else{var e=plus.downloader.createDownload(this.update.file,{filename:"_doc/download/",timeout:30},(function(e,n){200==n?plus.runtime.install(e.filename,{force:!0},(function(){plus.runtime.restart()}),(function(){Object(p["a"])("安装失败!")})):(t.update.down=!0,t.update.msg="下载失败")}));e.start(),e.addEventListener("statechanged",(function(e,n){var a=parseInt(e.downloadedSize/t.update.total*100);t.update.loading=a+"%",t.update.msg="正在下载："+t.update.loading,a>=100&&(t.update.msg="下载完成，安装并重启")}))}}}});n("62fb"),n("f67f");_.render=c,_.__scopeId="data-v-5422669d";var B=_,T=(n("d3b7"),n("6c02")),x=[{path:"/",name:"home",component:function(){return n.e("chunk-420f1e91").then(n.bind(null,"bb51"))}},{path:"/refresh",name:"Refresh",component:function(){return n.e("chunk-0ba47dcd").then(n.bind(null,"ea97"))}},{path:"/demo",name:"Demo",meta:{keepAlive:!1},component:function(){return n.e("chunk-df307b4a").then(n.bind(null,"c876"))}}],P=Object(T["a"])({history:Object(T["b"])(""),routes:x});P.goBack=function(t){this.isBack=!0,this.go(t)};var L=P,N=Object(l["a"])({state:{mode:"light",statusHeight:0,socket:null,scan:null,keepAlive:["Home"]},mutations:{},actions:{},modules:{}});document.body.ontouchstart=function(){try{"iOS"!=plus.os.name&&document.createElement("audio")}catch(t){document.createElement("audio")}};var U=Object(a["e"])(B).use(N).use(L).mount("#app"),D=e["default"]=U},e643:function(t,e,n){"use strict";var a=n("cd49");e["a"]=function(t){a["default"].$router.goBack(-t)}},f67f:function(t,e,n){"use strict";n("4397")}});