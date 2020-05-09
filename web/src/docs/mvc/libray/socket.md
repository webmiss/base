## 实现聊天室
### Html
``` html
<div id="wrapper">
	<div id="message"></div>
	<div id="action">
		<textarea id="data" style="width: calc(100% - 12px);" rows="3" placeholder="请输入聊天内容！"></textarea>
		<div class="tcenter" style="padding: 10px 0;">
			<label>发送<button id="send" class="hide"></button></label>
		</div>
	</div>
</div>
```

### CSS
``` css
#message{max-height: 200px; overflow-y: auto; background-color: #F2F4F6; padding: 10px;}
#message dl{overflow: hidden; padding: 5px;}
#message dl dt{
	float: left;
	width: 36px;
	height: 36px;
	background-color: #FFF;
	border-radius: 18px;
	background-repeat: no-repeat;
	background-size: 80%;
	background-position: center center;
}
#message dl dd{margin-left: 40px;}
#message dl dd span{
	overflow: hidden;
	display: inline-block;
	background-color: #FFF;
	border-radius: 3px;
	box-shadow: 0 0 1px rgba(0,0,0,0.3);
	padding: 10px;
}
#action label{
	padding: 8px 30px;
	background-color: #6FB737;
	color: #FFF;
	border-radius: 3px;
	box-shadow: 1px 1px 3px rgba(0,0,0,0.5);
}
```

### JavaSrcipt
``` javascript
(function() {

	var socket = new WebSocket('wss://webmis.vip/wss/');
	var send = document.getElementById('send');
	var data = document.getElementById('data');
	var message = document.getElementById('message');
	var wrapper = document.getElementById('wrapper');
	var height = (wrapper.offsetHeight) -270;

	message.style.height = height+'px';
	socket.onopen = function(event) {
		message.innerHTML = '<p><span>欢迎 <b>XXX</b></span></p>';
	}

	socket.onmessage = function(event) {
		var dl = document.createElement('dl');
		var jsonData = JSON.parse(event.data);
		dl.innerHTML =  '<dt style="background-image: url('+jsonData.avatar+');"></dt><dd><span>'+jsonData.content+'</span></dd>';
		message.appendChild(dl);
		message.scrollTop = message.scrollHeight;
	}

	socket.onerror = function() {
		message.innerHTML = '<p><span>连接失败！</span></p>';
	}

	send.addEventListener('click', function() {

		var content = data.value;
		if(content.length <= 0) {
			alert('消息不能为空！');
			return false;
		}

		var avatar = Math.random();
		var message = {
			"avatar" : '/favicon.png',
			"nickname" : '测试',
			"content" : content
		}

		var json = JSON.stringify(message);
		socket.send(json);

		data.value = ''; data.focus();

	});
})();
```

### PHP
``` php
<?php
extension_loaded('sockets') or die('请加载Sockets扩展');
/*
* WebSocket类
*/
class WebSocket{
	private $socket;
	private $accept;
	private $isHand = [];

	/* 构造函数 */
	function __construct($host, $port, $max){
		// 创建Socket
		$this->socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		// 设置
		socket_set_option($this->socket, SOL_SOCKET, SO_REUSEADDR, TRUE);
		// 绑定地址和端口
		socket_bind($this->socket, $host, $port);
		// 开始监听连接
		socket_listen($this->socket, $max);
	}

	/* 启动 */
	function start(){
		while(true) {
			$cycle = $this->accept;
			$cycle[] = $this->socket;
			socket_select($cycle, $write, $except, null);
			// 全部Socket
			foreach($cycle as $sock) {
				// 首次握手
				if($sock === $this->socket) {
					// 另一个Socket通信
					$client = socket_accept($this->socket);
					$this->accept[] = $client;
					// 最后通信名
					$key = array_keys($this->accept);
					$key = end($key);
					// 是否新通信
					$this->isHand[$key] = false;
				}else{
					// Socket接受长度
					$length = socket_recv($sock, $buffer, 204800, 0);
					$key = array_search($sock, $this->accept);
					// 客户端中断
					if($length < 7) {
						$this->close($sock);
						continue;
					}
					// 是否首次握手
					if(!$this->isHand[$key]) {
						$this->dohandshake($sock, $buffer, $key);
					}else{
						// 先解码，再编码
						$data = $this->decode($buffer);
						$data = $this->encode($data);
						// 判断断开连接
						if(strlen($data) > 10) {
							foreach($this->accept as $client) {
								socket_write($client, $data, strlen($data));
							}
						}
					}
				}
			}
		}
	}

	/* 首次与客户端握手 */
	private function dohandshake($sock, $data, $key) {
		if (preg_match("/Sec-WebSocket-Key: (.*)\r\n/", $data, $match)) {
			$response = base64_encode(sha1($match[1] . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11', true));
			$upgrade  = "HTTP/1.1 101 Switching Protocol\r\n" .
			"Upgrade: websocket\r\n" .
			"Connection: Upgrade\r\n" .
			"Sec-WebSocket-Accept: " . $response . "\r\n\r\n";
			socket_write($sock, $upgrade, strlen($upgrade));
			$this->isHand[$key] = true;
		}
	}

	/* 关闭一个客户端连接 */
	private function close($sock) {
		$key = array_search($sock, $this->accept);
		socket_close($sock);
		unset($this->accept[$key]);
		unset($this->handshake[$key]);
	}

	/* 编码 */
	public function encode($buffer) {
		$length = strlen($buffer);
		if($length <= 125) {
			return "\x81".chr($length).$buffer;
		} else if($length <= 65535) {
			return "\x81".chr(126).pack("n", $length).$buffer;
		} else {
			return "\x81".char(127).pack("xxxxN", $length).$buffer;
		}
	}

	/* 解码 */
	private function decode($buffer) {
		$len = $masks = $data = $decoded = null;
		$len = ord($buffer[1]) & 127;
		if ($len === 126) {
			$masks = substr($buffer, 4, 4);
			$data = substr($buffer, 8);
		} 
		else if ($len === 127) {
			$masks = substr($buffer, 10, 4);
			$data = substr($buffer, 14);
		} 
		else {
			$masks = substr($buffer, 2, 4);
			$data = substr($buffer, 6);
		}
		for ($index = 0; $index < strlen($data); $index++) {
			$decoded .= $data[$index] ^ $masks[$index % 4];
		}
		return $decoded;
	}

}

// 调用
$webSocket = new WebSocket('127.0.0.1', 8080, 100);
$webSocket->start();
```

### Nginx
``` nginx
# WebSocket
location /wss/ {
	proxy_pass http://127.0.0.1:8080;
	proxy_http_version 1.1;
	proxy_set_header   Upgrade $http_upgrade;
	proxy_set_header   Connection "upgrade";
	proxy_set_header   Host $http_host;
}
```