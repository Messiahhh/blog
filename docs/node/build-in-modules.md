
# 内置模块
## http模块

```javascript
const http = require('http')
const server = http.createServer((req, res) => {
    console.log(req.url) // 请求url
    console.log(req.method) // 请求方法
    console.log(req.headers) // 请求头部

    if (req.url === '/') {
        // 设置响应的状态码和头部
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})

        // 单独设置状态码
        res.statusCode = 200
        // 单独设置响应头部
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        // Set-Cookie
        res.setHeader('Set-Cookie', 'name=akara; secure')

        // 设置响应实体
        res.write("hello world")
        res.write("!!!")
        // 发送响应报文
        res.end()
    }

})

server.listen(3000, () => {
    console.log("服务器跑在3000端口")
})
```

### 静态目录

```javascript
const http = require('http')
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // ...
    }
    else {
        let filePath = path.join(__dirname, 'static', url.pathname)
        try {
            let file = await fs.readFileAsync(filePath)
            res.statusCode = 200
            res.end(file)
        } catch (error) {
            res.statusCode = 404
            res.end("404 Not Found")
        }
    }
    // 或者
    else {
        let fileName = url.pathname
        let type
        switch(fileName.substr(fileName.lastIndexOf('.') + 1)) {
            case 'css':
                type = 'text/css; charset=utf-8'
                break
            case 'js':
                type = 'applaction/javascript; charset=utf-8'
                break
            // other situations 
            default:
                type = 'application/octet-stream'
                break
        }
        try {
            let file = await fs.readFileAsync(`./static${url.pathname}`)
            res.writeHead(200, {'Content-Type': type})
            res.end(file)
        } catch (error) {
            res.writeHead(400, {'Content-Type': 'text/plain; charset=utf-8'})
            res.end("404错误啦！")
        }
    }
}).listen(3000)


```

### 处理Post请求

```javascript
// 前端 (省略部分代码)
let type = typeof data
let header
if (type === 'string') {
    header = 'application/x-www-form-urlencoded'
}
else if (data instanceof File || data instanceof FormData) {
    header = 'multipart/form-data; boundary=---xxxxxxxxxxxx'
}
else {
    header = 'application/json'
    data = JSON.stringify(data)
}
xhr.setRequestHeader('Content-type', header)
xhr.send(data)


// 后端
const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    if (req.url === '/upload') {

        let segment = []

        req.on('data', (chunk) => {
            // chunk为Buffer对象
            // 字符串aaa=bbb对应的Buffer对象如下
            // <Buffer 61 61 61 3d 62 62 62>
            segment.push(chunk)
        })

        req.on('end', () => {
            // 文件上传代码
            segment = Buffer.concat(segment)
            // 下方代码获取buffer转成的字符串
            // segment = Buffer.concat(segment).toString()
            fs.writeFile('fileName', segment, (err) => {
                res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
                res.write("文件上传成功！")
                res.end()
            })
        })
    }
})

server.listen(3000, () => {
    console.log("服务器跑在3000端口")
})
```

## fs模块

```javascript
const fs = require('fs')
```

### `readFile`

```javascript
fs.readFile('./image.png', (err, buffer) => {
    if (err) throw err
})
```

### `writeFile`

```javascript
// 写入文本
fs.writeFile('index.txt', 'hello world', 'utf8')
// 写入buffer
fs.writeFile('image.png', buffer)
```

### `createReadStream`

### `createWriteStream`

```javascript
const reader = fs.createReadStream(data.path)
const stream = fs.createWriteStream(`./image/${Math.floor(Math.random() * 10000)}.jpg`)
reader.pipe(stream)
```

## path模块

```javascript
const path = require('path')
```

### `__dirname`

返回当前文件所在的**绝对路径**

### `path.resolve`

```js
const url = path.resolve('./static')
// 等价于
const url = path.join(process.cwd(), './static')
```

根据当前所在目录，即`process.cwd()`和传入的路径参数，解析出完整的**绝对路径**



### `require.resolve`

> 作为拓展阅读

``` js
const url = require.resolve('webpack') // /path/to/project/node_modules/webpack/lib/index.js
```





### `path.join`

用来拼接传入的参数得到一个**相对路径**，它的好处是可以抹平不同平台的分割符号的差异（如Linux环境下分隔符为 `/`，而Windows环境下分隔符为 `\`）

```javascript
const path1 = path.join('a', 'b') // 'a/b'
const path2 = path.join('a', 'b', '../c') // 'a/c'
const path3 = path.join(__dirname, '..', 'b') 
```



## process模块

### `process.cwd()`

获得执行脚本时所处的绝对路径。当我们使用 `fs.readFile`等函数并传入 `./index.html`形式的相对路径时，相对路径实际上是相对于执行脚本时所在的目录路径，也就是相对于 `process.cwd()`。

因此根据执行脚本时所处路径的不同，结果也可能有很大的差异，所以很多时候我们会传入绝对路径，如

```js
fs.readFile(`${__dirname}/../index.html`)
fs.readFile(path.join(__dirname, '../index.html'))
```

### `process.argv`

获取执行脚本时命令行输入的参数

```js
$node index.js abc
[
    'node',
    'index.js',
    'abc'
] // process.argv
```



### `process.env`

在 `Node`中可以通过 `process.env`拿到环境变量，从而根据不同的环境执行不同的代码。

#### cross-env

通常不同系统设置环境变量的方式不同，为此可以使用第三方库 `cross-env`来设置环境变量。

```json
// package.json
{
    "script": {
        "start": "cross-env NODE_ENV=development node app.js"
    }
}
```

#### dotenv

除了在命令行中设置环境变量，我们也可以使用单独的文件 `.env`来保存环境变量，并搭配 `dotenv`库来读取 `.env`文件中的环境变量。

```.env
NODE_ENV=development
name=aka
```

```js
// app.js
const dotenv = require('dotenv')
dotenv.config() // 读取.env文件中的信息

console.log(process.env.NODE_ENV)
```

或者我们可以写一个 `config.js`

```js
// config.js
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    name: process.env.name
}
```

```js
// app.js
const { NODE_ENV, name } = require('./config.js')
console.log(NODE_ENV, name)
```



### `process.stdin`

标准输入流

```js
process.stdin.on('data', (chunk) => {
    process.stdout.write('Hello' + chunk)
    process.exit()
})
```

### `process.stdout`

标准输出流

```js
process.stdout.write('Hello world')
```

### 



## util模块

这个模块提供了诸多很有用的小工具。

### `deprecate`

```js
const util = require('util')
function A() {
    console.log('aaa');
}

module.exports = util.deprecate(A, 'A() is deprecated. Use B() instead.')
```

### `promisify`

```js
const util = require('util')
const fs = require('fs')
const readFile = util.promisify(fs.readFile)

async function A() {
    const data = await readFile('./index.html') 
}
```

## child_process模块

Node的 `child_process`模块提供了创建子进程的四种方式，分别是 `folk`、`exec`、`execFile`、`spawn`。

其中，只有 `fork`是用来创建Node程序的子进程，其他三种可以用来创建 `shell`子进程。

### `fork`

```js
// parent.js
const cp = require('child_process')
const path = require('path')
const child = cp.fork('./child.js')

child.on('message', (msg) => { // 进程通信
  	console.log(msg);
  	child.disconnect()
})
child.send('hello')

// child.js
process.on('message', (msg) => {
  	console.log(msg);
  	process.send('akara')
})
```

`exec`可以直接在Node代码中写入 `shell`命令，并且在执行一些危险的脚本（如 `rm / -rf`）是不会提示的；而 `execFile`和 `spawn`的参数都是文件的名字，并且 `execFile`在执行危险操作时会爆出异常，因此更加的安全。

### `exec`

```js
const exec = util.promisify(cp.exec)

(async function () {
  const res = await exec(cat ${file})
  console.log(res.stdout);
})()
```

### `execFile`

```js
const exec = util.promisify(cp.execFile)

(async function () {
  	const res = await exec('cat', [file])
  	console.log(res.stdout);
})()
```

### `spawn`

`spawn`的特点是基于流的，因此可以使用 `pipe`显得更加灵活

```js
const cat = cp.spawn('cat', [file])
const sort = cp.spawn('sort')

cat.stdout.pipe(sort.stdin)
sort.stdout.pipe(process.stdout)
```

## cluster模块

使用cluster来搭建集群node应用

怎么讲呢，直接看网上的代码吧。

```js
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length; // 获取CPU的个数

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
 }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
 });
} else {
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
 }).listen(8000);
}

```

以上代码，父进程根据CPU的数量创建子进程。只看代码的话，容易理解成每一个进程都创建了一个server来监听8000端口，但这是不切实际的。其实cluster做了很多事情，在实际的情况下，父进程会创建server监听端口，收到的请求会分发给不同的进程去处理。

cluster让我们不用亲自去管理进程通信的事情（process.on('message')），而且也自带负载均衡的策略。

默认情况，除了windows系统下，使用cluster时的负载均衡策略为round-robin。比如刚才的服务器，收到了8个请求，第一个请求交给第一个子进程处理，第二个请求交给第二个子进程...

在windows系统下，通过以下代码来设置负载均衡策略为round-robin

`cluster.schedulingPolicy = cluster.SCHED_RR;`

另外，pm2也自带cluster，比如可以靠以下代码创建8个子进程。

`pm2 start app.js -i 8`

## url模块

```javascript
// 当请求url为 http://localhost:3000/index.html?name=akara#aa
const url = require('url')
let {
    search, // '?name=akara'
    query, // 'name=akara'
    pathname, // '/index.html'
    path, // '/index.html?name=akara'
} = url.parse(req.url)
```

## querystring模块

```javascript
const qs = require('querystring')
var str = 'foo=bar&abc=xyz&abc=123';

querystring.parse(str)
// { foo: 'bar', abc: [ 'xyz', '123' ] }
```

## os模块

获取操作系统相关信息。

```js
const os = require('os')
const homedir = os.homedir() // 获取用户目录
```

## event模块

> 实现原理见本文的设计模式-发布订阅章节

```javascript
var EventEmitter = require('events').EventEmitter
var emitter = new EventEmitter()

emitter.on('ev', function () {

})

emitter.emit('ev')
```

---

以上是Node自带的核心库，下面介绍一些常用的第三方库。
