## 安装
```bash
# Archlinux
yaourt -S php-swoole
# 加载扩展
vi /etc/php/conf.d/swoole.ini
```
## 一、服务器端( server.php )
```php
$server = new swoole_websocket_server("127.0.0.1", 9502);

$server->on('open', function($server, $req) {
    echo "connection open: {$req->fd}\n";
});

$server->on('message', function($server, $frame) {
    echo "received message: {$frame->data}\n";
    $server->push($frame->fd, json_encode(["hello", "world"]));
});

$server->on('close', function($server, $fd) {
    echo "connection close: {$fd}\n";
});

$server->start();
```
### 启动服务
```bash
php -S localhost:8001 server.php
```

## 二、客户端端( client.html )
```javascript
<script type="text/javascript">
	var socket = new WebSocket('ws://127.0.0.1:9502/');
	// 链接服务器
	socket.onopen = function(event) {
		console.log('链接成功！');
	}
	// 接收消息
	socket.onmessage = function(event) {
		console.log(event);
	}
	// 发送消息
	// socket.send('客户端消息!！');
</script>
```

## 三、Nginx( wss )
```nginx
upstream websocket {
    server 127.0.0.1:9502;
}
server {
    listen       443 http2 ssl;

    location /demo {
        proxy_pass http://websocket;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Connection "keep-alive";
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

