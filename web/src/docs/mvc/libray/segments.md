## 一、实现视频播放
### Html
``` html
<div style="text-align: center;">
	<video id="video" preload="metadata" controls autoplay style="width: 80%;"></video>
</div>
```
### JavaScript
``` javascript
/* AJAX */
var xhr = new XMLHttpRequest();
xhr.open('POST', '/home/docs/play', true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
	if (this.status == 200) {
		// Blob 二进制视频
		var blob = this.response;
		document.getElementById('video').src =  URL.createObjectURL(blob);
	}
}
xhr.send();
```

### PHP
``` php
/* 视频流 */
function playAction(){
	header('Access-Control-Allow-Origin: *');
	header('Content-type: video/mp4');
	echo file_get_contents('upload/vod/test.mp4');
}
```


## 二、流媒体播放器
### Html
``` html
<div id="wmPlayer" class="wm_vod">
	<video width="100%" conrtols="true" preload="metadata" poster=""></video>
	<div class="wm_vod_play"><em class="play"></em></div>
	<div class="wm_vod_title"><h1>视频标题</h1><span>剧集：<b>30</b></span></div>
	<div class="wm_vod_controls">
		<div class="wm_load">
			<div class="wm_load_played"></div>
			<div class="wm_load_buffered"></div>
		</div>
		<div class="control_play"><em class="play"></em></div>
		<div class="control_time">
			<span class="control_time_current">--:--</span>
			<span class="control_time_split"> / </span>
			<span class="control_time_duration">--:--</span>
		</div>
		<div class="control_right">
			<div class="control_right_fullscreen"><em class="request"></em></div>
		</div>
	</div>
</div>
```

### CSS
``` css
.wm_vod{position: relative; z-index: 10; width: 100%; background-color: #000; overflow: hidden;}
.wm_vod video{width: 100%; height: 100%;}
.wm_vod_play{position: absolute; z-index: 88; left: 0; top: 0; width: 100%; height: 100%; cursor: pointer; user-select: none; background-position: center center; background-size: 100%; background-repeat: no-repeat; background-image: url(); background-color: rgba(0,0,0,0.5);}
.wm_vod_play em{position: absolute; width: 60px; height: 60px; line-height: 60px; border-radius: 30px; top: calc(50% - 30px); margin-left: calc(50% - 30px);}
.wm_vod_play .play{background: url(images/play.svg) no-repeat center center,rgba(0,0,0,0.5);}
.wm_vod_play .pause{background: url(images/pause.svg) no-repeat center center,rgba(0,0,0,0.5);}
.wm_vod_play .replay{background: url(images/replay.svg) no-repeat center center,rgba(0,0,0,0.5);}
.wm_vod_controls{position: absolute; z-index: 88; bottom: 0; width: 100%; height: 45px; line-height: 45px; background-color: rgba(24,24,24,0.7);}
.wm_load{cursor: pointer; position: absolute; width: 100%; height: 2px; margin-top: -2px; background-color: rgba(100,100,100,0.5);}
.wm_load_played{position: absolute; z-index: 2; width: 0%; height: 100%; background-color: #6FB737;}
.wm_load_buffered{position: absolute; z-index: 1; width: 0%; height: 100%; background-color: rgba(200,200,200,0.5);}
.control_play{float: left; cursor: pointer; display: inline-block; width: 24px; height: 24px; line-height: 24px; text-align: center; border-radius: 20px; border: rgba(255,255,255,0.3) 5px solid; margin: 5px 0 0 10px;}
.control_play em{display: inline-block; overflow: hidden; width: 100%; height: 100%;}
.control_play .play{background: url(images/play.svg) no-repeat center center; background-size:  auto 70%;}
.control_play .pause{background: url(images/pause.svg) no-repeat center center; background-size:  auto 70%;}
.control_time{display: inline-block; margin-left: 10px;}
.control_time_current{color: #DEDEDE;}
.control_time_split{color: rgba(255,255,255,0.5);}
.control_time_duration{color: rgba(255,255,255,0.5);}
.control_right{float: right; margin-right: 10px;}
.control_right_fullscreen{float: left; cursor: pointer; display: inline-block; width: 24px; height: 24px; line-height: 24px; text-align: center; margin-top: 10px;}
.control_right_fullscreen em{display: inline-block; overflow: hidden; width: 100%; height: 100%;}
.control_right_fullscreen .request{background: url(images/max.svg) no-repeat center center; background-size:  auto 70%;}
.control_right_fullscreen .exit{background: url(images/min.svg) no-repeat center center; background-size:  auto 70%;}
```

### 切成流媒体
``` bash
# HLS Segments
ffmpeg -i foo.mp4 -g 25 -hls_time 1 -hls_list_size 0 index.m3u8
```

### HLS插件
``` html
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
```

### JavaScript
``` javascript
// Html5视频
let player = document.getElementById('wmPlayer');
let video = player.children[0];
let fullscreen = document.getElementsByClassName('control_right_fullscreen')[0];
let title = document.getElementsByClassName('wm_vod_controls')[0];
let controls = document.getElementsByClassName('wm_vod_title')[0];
let play = document.getElementsByClassName('control_play')[0];
let pause = document.getElementsByClassName('wm_vod_play')[0];
let played = document.getElementsByClassName('wm_load_played')[0];
let buffered = document.getElementsByClassName('wm_load_buffered')[0];
let progress = document.getElementsByClassName('wm_load')[0];
let url = document.getElementsByClassName('wm_url')[0];
let next = document.getElementsByClassName('wm_next')[0];

/* 禁用 */
video.controls = false;
// 鼠标右键
player.oncontextmenu=function(){return false;}

/* 全屏 */
let Fullscreen = function(){
	let cls = '';
	// W3C
	if(video.requestFullscreen){
		if(document.exitFullscreen){
			document.exitFullscreen();
			cls = 'request';
		}else{
			player.requestFullscreen();
			cls = 'exit';
		}
	// Chrome
	}else if(video.webkitRequestFullScreen){
		if(document.webkitIsFullScreen){
			document.webkitCancelFullScreen();
			cls = 'request';
		}else{
			player.webkitRequestFullScreen();
			cls = 'exit';
		}
	// firefox
	}else if(video.mozRequestFullScreen){
		if(document.mozFullScreen){
			document.mozCancelFullScreen();
			cls = 'request';
		}else{
			player.mozRequestFullScreen();
			cls = 'exit';
		}
	// IE11
	}else if(video.msRequestFullscreen){
		if(document.msFullscreenElement){
			document.msExitFullscreen();
			cls = 'request';
		}else{
			player.msRequestFullscreen();
			cls = 'exit';
		}
	}
	// 改变样式
	fullscreen.innerHTML = '<em class="'+cls+'"></em>';
}
// 双击全屏
player.ondblclick =function(){
	Fullscreen();
};
// 全屏、退出
fullscreen.onclick = function(){
	Fullscreen();
}

/* 控制播放 */
let Play = function(){
	pause.style['background-image'] = '';
	pause.style['background-color'] = '';
	if(video.paused){
		video.play();
		pause.style.display = 'none';
		pause.innerHTML = '<em class="play"></em>';
		play.innerHTML = '<em class="pause"></em>';
	}else{
		video.pause();
		pause.style.display = 'block';
		pause.innerHTML = '<em class="pause"></em>';
		play.innerHTML = '<em class="play"></em>';
	}
};
// 播放
player.children[1].onclick = function(){
	Play();
}
// 暂停
player.children[0].onclick = function(){
	Play();
}
// 按钮
play.onclick = function(){
	Play();
}

/* 时间转换 */
let FormatTime = function(t){
	t = parseInt(t);
	let time = '';
	if(t>=3600){
		let h = parseInt(t/3600);
		let m = parseInt((t-h*3600)/60);
		let s = parseInt(t-h*3600-m*60);
		time = (Array(2).join(0) + h).slice(-2)+':'+(Array(2).join(0) + m).slice(-2)+':'+(Array(2).join(0) +s).slice(-2)
	}else if(t>=60 && t<3600){
		let m = parseInt(t/60);
		let s =  parseInt(t-m*60);
		time = (Array(2).join(0) + m).slice(-2)+':'+(Array(2).join(0) +s).slice(-2)
	}else{
		time = '00:'+(Array(2).join(0) + t).slice(-2);
	}
	return time;
}

/* 播放进度 */
video.ontimeupdate=function(){
	let t1=this.currentTime;
	let t2=this.duration;
	// 当前时间:视频总长
	document.getElementsByClassName('control_time_current')[0].innerHTML = FormatTime(t1);
	document.getElementsByClassName('control_time_duration')[0].innerHTML = FormatTime(t2);
	// 已加载
	buffered.style.width = parseInt(this.buffered.end(0)/t2*100)+'%';
	// 已播放
	played.style.width = parseInt(t1/t2*100)+'%';
	// 完成
	if(t1==t2){
		pause.style['background-image'] = 'url('+video.poster+')';
		pause.style['background-color'] = '#000';
		pause.innerHTML = '<em class="replay"></em>';
		pause.style.display = 'block';
		played.style.width = '0%';
		// 是否跳转
		if(next.innerText){
			window.location.href = next.innerText;
		}
	}
}

/* 点击进度条 */
progress.onmousedown = function(e){
	 let length = e.pageX-player.offsetLeft;
	 let percent = length/this.offsetWidth;
	video.currentTime = percent*video.duration;
}
progress.onmouseover = function(){
	this.style.height = '5px';
	this.style['margin-top'] = '-5px';
}
progress.onmouseout = function(){
	this.style.height = '2px';
	this.style['margin-top'] = '-2px';
}

/* 控制面板 */
let controlInter;
player.onmousemove = function(){
	// 显示
	title.style.display = 'block';
	controls.style.display = 'block';
	player.style.cursor = '';
	// 倒计时
	clearInterval(controlInter);
	controlInter = setInterval(hiddenControl, 3000);
}
let hiddenControl = function(){
	// 隐藏
	title.style.display = 'none';
	controls.style.display = 'none';
	player.style.cursor = 'none';
	clearInterval(controlInter);
}

/* 窗口改变 */
window.onresize = function(){
	// 是否全屏
	let isFull = function(){
		let isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
		if(isFull === undefined) isFull = false;
		return isFull;
	}
	// 退出全屏
	if(!isFull()){
		fullscreen.innerHTML = '<em class="request"></em>';
		return false;
	}
}

/* 键盘事项 */
document.onkeydown=function(event){
	let e = event || window.event || arguments.callee.caller.arguments[0];
	// 空格播放
	if(e && e.keyCode==32){Play(); return false;}
}

/* 播放视频流 */
if(Hls.isSupported()) {
	let hls = new Hls();
	hls.loadSource(url.innerText);
	hls.attachMedia(video);
	hls.on(Hls.Events.MANIFEST_PARSED,function() {
		Play();
	});
}else if (video.canPlayType('application/vnd.apple.mpegurl')) {
	video.src = url.innerText;
	video.addEventListener('canplay',function() {
		Play();
	});
	/* 调整视频高度 */
	let size = function(){
		let w = player.clientWidth;
		let h = 9/16*w;
		player.style.height = h+'px';
	}
	window.onresize = size; size();
}
```

