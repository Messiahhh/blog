---
sidebarDepth: 4
---
# WebSocket

基本用法

``` js
let ws = new WebSocket('ws://url.com:port')
ws.onopen = () => {}
ws.onclose = () => {}
ws.onerror = () => {}
ws.onmessage = (e) => {}

ws.send()
```



常用的WebSocket库有`socket.io`和`ws`， 基础用法类似，不过`ws`只能用于后端，前者可以用于前后端。

### ws

``` js
// 前端使用原生Websocket Api
let ws = new WebSocket('ws://localhost:8080')
ws.onopen = () => {}
ws.onmessage = () => {}

// 后端
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
```

### socket.io

``` html
<!-- 前端也需要引用socket.io库 -->
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>
```

``` js
// 后端
var io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
```





当正常情况下，若连接中断，我们需要重新进行连接。

``` js
ws.onclose = () => {
    reconnect()
}
ws.onerror = () => {
    reconnect()
}
```



### 心跳包

正常情况下，连接中断会触发`onclose`事件，我们只需要在`onclose`事件中进行重连即可。

但如果是因为网络异常，或是信号不佳，则不会触发`onclose`事件，因此不会触发重连操作。如果我们定期向服务器发送消息，那么即使网络断开时没有触发`onclose`事件，因为我们定期的消息无法发往服务器，那么此时会触发`onclose`事件，来执行重连操作。



上文说的定期的向服务器发送消息就是心跳包，顾名思义，心跳包指像心跳一样，每隔固定的时间向服务器发送一次消息。



简陋的代码实现，只是用来展示大概的原理。

``` js
let ws = new WebSocket('ws://localhost:3001')
ws.onopen = () => {
    heartCheck.start()
}
ws.onmessage = (data) => {
    heartCheck.reset()
}
ws.onclose = () => {
    reconnect()
}
ws.onerror = () => {
    reconnect()
}

let heartCheck = {
    timeout: 60000, // 1分钟发一次
    timer: null,
    start() {
        this.timer = setTimeout(() => {
            ws.send('heart')
        }, timeout)
    },
    reset() {
        clearTimeout(this.timer)
        this.start()
    }
}
```