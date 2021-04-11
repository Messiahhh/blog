---
sidebarDepth: 4
---
## Node

### NPM

##### 脚本执行

我们安装的模块被放置在`node_modules`目录下，有多种方式去直接调用该包。

1. ``` shell
   ./node_modules/.bin/pm2 list
   ```

2. ``` json
   // package.json
   {
       "script": {
           // npm run start
           "start": "pm2 list"
       }
   }
   
// shell
   npm run start
   ```
   
3. ``` shell
   npx pm2 list
   ```



##### package.json

在`package.json`中我们经常能看见这种形式的版本号`"react": "^17.0.2"`、`"xx": "~0.10.0"`。这种类型的版本号表示法我们称之为`semver`表示法。

- `^`: 只会执行不更改最左边非零数字的更新。 如果写入的是 `^0.13.0`，则当运行 `npm update` 时，可以更新到 `0.13.1`、`0.13.2` 等，但不能更新到 `0.14.0` 或更高版本。 如果写入的是 `^1.13.0`，则当运行 `npm update` 时，可以更新到 `1.13.1`、`1.14.0` 等，但不能更新到 `2.0.0` 或更高版本。
- `~`: 如果写入的是 `〜0.13.0`，则当运行 `npm update` 时，会更新到补丁版本：即 `0.13.1` 可以，但 `0.14.0` 不可以。

因此，哪怕对于同一个项目，在不同时机使用`npm install`来安装模块时，模板的版本也可能有些许差异。



##### package-lock.json

如上述所言，假设当我们依赖的某个模块偷偷地更新了一个小版本号，那么我们最初`npm install`时就会安装最新的该模块。一旦这个模块引入了巨大的缺陷，对于我们的项目将造成极大的影响。

而`package-lock.json`就是用来固定下指定的版本号，此时我们使用`npm install`时，只会安装固定版本号的模块。

`yarn`默认启用了`lock`，而`npm`在`5.x`版本之后才默认启用了`lock`。不过业界对于是否启用`lock`，还存在一些[争论](https://www.zhihu.com/question/65536076)



##### node_modules

在`NPM`的早期版本，安装模块时`node_modules`的结构是嵌套结构。比如当我们安装了一个依赖于模块B的模块A，我们的`node_modules`结构会如图所示：

``` 
- A -> B
```

这样会导致一些问题，比如链路过长，而最大的问题是有可能不同层级的模块会依赖于同一个模块，这样的话这个模块会被下载多次，造成性能浪费，比如：

``` 
- A -> B
- C -> B
```



而在`NPM`的`3.x`版本后，`node_modules`的结构由嵌套结构改成了扁平结构。当我们安装了一个依赖于模块B的模块A，我们的`node_modules`结构会如图所示：

``` 
- A
- B
```

那如果有多个模块同时依赖于模块B，`node_modules`的结构又如何呢。

我们知道，对于一个模块，我们在该模块目录下的`package.json/dependencies`中指定依赖的模块，我们可以指定依赖模块的版本，也可以使用`^/~`来约束依赖模块的版本号。

1. 假设我们本地安装了模块B，版本号为`1.1.0`。然后我们安装的模块A依赖于版本`^1.0.0`的模块B，则`1.1.0`符合这个规则，我们的`node_modules`结构如下

   ```
   - A
   - B@1.1.0
   ```

2. 假设我们本地安装了模块B，版本号为`1.1.0`。然后我们安装的模块A依赖于版本`^1.2.0`的模块B，则`1.1.0`不符合这个规则，我们的`node_modules`结构如下

   ``` 
   - A -> B@1.2.0 // 假设1.2.0是最新版本
   - B@1.1.0
   ```

   

##### npx

在`npx@5.2`之后引入了`npx`这个强大的命令。

除了之前说过的`npx pm2`这样的脚本执行方式，`npx`的另一个特性是无需安装即可执行命令。



比如`npx create-react-app my-app`，我们无需提前安装`create-react-app`，借助`npx`会下载并使用该库来生成我们的项目，并在任务执行完成后删除下载好的`create-react-app`。



##### 模块发布

通过`npm`发布包很简单，其实就两步

1. `npm login`
2. `npm publish`

此时npm的镜像需要是官方镜像`npm config set registry https://registry.npmjs.org`

另外我们可以创建类似`@akara/package`这样的库，这是属于用户作用域的包，默认是私有的。而我们不能直接发布私有包，因此我们需要使用以下代码来发布

``` shell
npm publish --access public
```



当我们发布一个npm库时，通常目的是发布构建后的文件，所以我们需要控制哪些文件可以被发布，哪些文件不会被发布。

1. `.gitignore`中的文件不会被发布
2. `.npmignore`中的文件不会被发布
3. `package.json`中的`files`字段指定哪些文件会被发布









### 事件循环

##### 宏任务和微任务

宏任务`macroTask`， 包括:  `setTimeout/setInterval`，`setImmediate`(Node专有)， I/O操作（包括读写文件/发送请求等）。宏任务放在宏队列中。

微任务`microTask`， 包括:  `promise.then`等。微任务放在微队列中。



除此之外，`process.nextTick`的回调函数是放进`nextTick`队列的。该队列类似微队列，但其执行总在微队列之前。

``` js
Promise.resolve('promise').then(v => console.log(v))
process.nextTick(() => {
    console.log('nextTick');
})
// nextTick
// promise
```



浏览器通过主线程和工作线程实现事件循环。

Node通过libuv来实现事件循环。



##### 浏览器事件循环

浏览器内维持着**一个宏任务队列，一个微任务队列**。

执行宏队列中的第一个宏任务 => 执行微队列中的所有微任务 => 执行宏队列中的下一个宏任务 => 执行微队列中的所有微任务...如此往复。我们最初的同步脚本可以看作最初的宏任务。

##### Node事件循环

Node事件循环一共有**六个阶段**，**每个阶段中都有一个宏队列**，**总共只有一个微队列**

在高版本Node（v11以后），Node的行为与浏览器表现一致，即执行完一个宏任务就执行所有的微任务。

在旧版本Node（v11以前）：必须执行完一个阶段中宏队列内的全部宏任务，才回去执行所有微任务。

Node事件循环的六个阶段：

1. Timer: `SetTimeout`和`SetInterval`的回调放进该阶段的队列。
2. pending callback: 执行一些系统操作的回调，例如TCP的错误。
3. idle, prepare: 处理一些内部调用。
4. poll: **大部分回调在这里调用。**
5. check: `SetImmediate`的任务放进这个阶段的宏队列执行。
6. close callback: 一些结束时的回调，例如`Socket.on("close")`



###### 高低版本Node的差异

高低版本的Node有着显著的差异，如以下代码，在高低版本的Node下的结果就会不同。

``` js
setImmediate(function(){
    console.log(1);
    process.nextTick(function(){
        console.log(4)
    }) 
})
process.nextTick(function(){
    console.log(2)
    setImmediate(function(){
        console.log(3);
    })
})
```

1. 当我们遇到`setImmediate`后，将其回调函数放进`check`阶段的宏队列中。
2. 当我们遇到`process.nextTick`后，将其回调函数放进`nextTick`队列中。因为此时同步代码（或者说最初的宏任务）执行完毕，那么执行`nextTick`队列中的任务。
3. **输出2**， 遇到`setImmediate`后，将其回调函数放进`check`阶段的宏队列中。
4. 开始执行`check`队列中的宏任务。
5. 执行`check`第一个宏任务，**输出1**，将`nextTick`的回调放进队列里。

以上五步，无论版本如何都是一致的，接下来就是高低版本Node的不同。

**低版本Node**

因为低版本Node是执**行完一个阶段中的全部宏任务后，再执行微队列的全部任务**。所以**先输出3，再输出4。**

**高版本Node**

因为高版本Node是**执行完一个宏任务，就执行微队列的全部任务**。所以**先输出4，再输出3。**

### http模块

``` javascript
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

##### 静态目录

``` javascript
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

##### 处理Post请求

``` javascript
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

### fs模块

``` javascript
const fs = require('fs')
```

##### readFile

``` javascript
fs.readFile('./image.png', (err, buffer) => {
    if (err) throw err

})
```

##### writeFile

``` javascript
// 写入文本
fs.writeFile('index.txt', 'hello world', 'utf8')
// 写入buffer
fs.writeFile('image.png', buffer)
```

##### createReadStream

##### createWriteStream

``` javascript
const reader = fs.createReadStream(data.path)
const stream = fs.createWriteStream(`./image/${Math.floor(Math.random() * 10000)}.jpg`)
reader.pipe(stream)
```

### path模块

``` javascript
const path = require('path')
```

##### __dirname

返回当前文件所在的**绝对路径**

##### path.resolve

将一个路径解析成绝对路径

``` javascript
const path1 = path.resolve('static')
console.log(path1)
// 输出
C:\Users\Messiah\test\static
```

##### path.join

用平台特定的分割符号(Linux为`/`， Window为`\`)对路径进行拼接

``` javascript
const path1 = path.join(__dirname, 'a')
const path2 = path.join(__dirname, 'a/b')
const path3 = path.join('/a', 'b', 'c/d', 'e', '..')

console.log(path1)
console.log(path2)
console.log(path3)
// 输出
C:\Users\Messiah\test\a
C:\Users\Messiah\test\a\b
\a\b\c\d

const path4 = path.join(__dirname, '/static')
const path5 = path.join(path.resolve('.'), '/static')
```

### os模块

获取操作系统相关信息。

``` js
const os = require('os')
const homedir = os.homedir() // 获取用户目录
```



### process模块

##### process.cwd()

获取执行node脚本时所在的目录



假设有以下目录结构，把`a.js`看作我们的业务代码，把`folder`文件夹看作外部库，会发现这是个很常见的场景。

``` js
- root
    - a.js
    - folder
        - b.js
        - test.txt
```

``` js
// a.js 
const b = require('./folder/b.js')

// b.js
const fs = require('fs')
fs.readFile('./test.txt', 'utf8', (err, data) => {
    console.log(data)
})

// test.txt
12345
```



当我们在`root`目录执行`node a.js`时，输出`undefined`，并非我们想要的结果；而当我们进入`folder`目录执行`node ../a.js`输出`12345`。

也就是说，我们执行了相同的代码，却得到了不同的结果。原因是`b.js`中的相对路径可以看成是相对于`process.cwd()`，因此当我们在`root`目录运行node时，路径为`root/test.txt`；当我们在folder目录运行node时，路径为`root/folder/test.txt`。

由此可见以上代码的路径写法是有问题的，实际上大部分库都借助了`__dirname`，从而拿到绝对路径的文件资源

``` js
// 合理的写法 b.js 
const fs = require('fs')
fs.readFile(`${__dirname}/test.txt`, 'utf8', (err, data) => { 
    console.log(data)
})

// 两种写法都行
`${__dirname}/test.txt`
path.join(__dirname, 'txt.txt')
```













##### process.argv

获取执行脚本时命令行输入的参数

``` js
$node index.js abc
[
    'node',
    'index.js',
    'abc'
]
```



##### process.stdout

标准输出流

``` js
process.stdout.write('Hello world')
```



##### process.stdin

标准输入流

``` js
process.stdin.on('data', (chunk) => {
    process.stdout.write('Hello' + chunk)
    process.exit()
})
```

### child_process模块

##### fork/exec/execFile/spawn

node的child_process提供了创建子进程的方式。一共有四种，分别是spawn，execFile，exec，fork。

其中，只有fork是用来创建node程序的子进程，而前三个用来创建shell程序的子进程。

至于spawn，execFile和exec的区别。

首先，spawn是基于流的形式，而后两者是基于回调的形式。

而spawn和execFile的调用方式相同，与exec的调用方式不同。

``` js
spawn('cat', ['a.txt'])
execFile('cat', ['a.txt'])
exec('cat a.txt')
```

另外，使用exec执行一些危险的脚本（如rm -rf）是会直接执行的；而execFile碰到一些危险的操作会爆出异常。因此execFile的安全性更高。

使用方式如下（用到了util.promisify，从而使用async/await形式的exec）

``` js
const cp = require('child_process')
const path = require('path')
const util = require('util')
// text.txt 有四行
// a
// c
// b
// a
const file = path.join(__dirname, 'text.txt')


// exec
const exec = util.promisify(cp.exec)

(async function () {
  const res = await exec(cat ${file})
  console.log(res.stdout);
})()

// execFile
const exec = util.promisify(cp.execFile)

(async function () {
  const res = await exec('cat', [file])
  console.log(res.stdout);
})()

// spawn
const cat = cp.spawn('cat', [file])
const sort = cp.spawn('sort')

cat.stdout.pipe(sort.stdin)
sort.stdout.pipe(process.stdout)

// fork

// parent.js
const cp = require('child_process')
const path = require('path')

const child = cp.fork('./child.js')

// IPC
child.on('message', (msg) => {
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



### cluster模块

使用cluster来搭建集群node应用

怎么讲呢，直接看网上的代码吧。

``` js
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



### url模块

``` javascript
// 当请求url为 http://localhost:3000/index.html?name=akara#aa
const url = require('url')
let {
    search, // '?name=akara'
    query, // 'name=akara'
    pathname, // '/index.html'
    path, // '/index.html?name=akara'
} = url.parse(req.url)
```

### querystring模块

``` javascript
const qs = require('querystring')
var str = 'foo=bar&abc=xyz&abc=123';

querystring.parse(str)
// { foo: 'bar', abc: [ 'xyz', '123' ] }
```

### event模块

> 实现原理见本文的设计模式-发布订阅章节

``` javascript
var EventEmitter = require('events').EventEmitter
var emitter = new EventEmitter()

emitter.on('ev', function () {

})

emitter.emit('ev')
```



------

以上是Node自带的核心库，下面介绍一些常用的第三方库。

### bluebird库

可以将回调函数实现的异步改写成Promise的方式来写的第三方库。

##### bluebird + fs

回调

``` javascript
const fs = require('fs')
fs.readFile('index.html', (err, data) => {
    response.end(data)
})
```

Promise

``` javascript
const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs'))

fs.readFileAsync('index.html')
.then(data => {
    response.end(data)
})
```

##### bluebird + mysql

回调

``` javascript
const mysql = require('mysql')
// mysql配置文件
let config = require('./config')
conn.connect()

// 使用
conn.query(`sql code here...`, (err, data) => {

})
```

Promise

``` javascript
const bluebird = require('bluebird')
const mysql = require('mysql')
// mysql配置文件
let config = require('./config')
const conn = bluebird.promisifyAll(mysql.createConnection(config))
conn.connect()

// 使用
let data = await conn.queryAsync(`sql code here...`)
```



### PM2库

除了常见的`pm2 start index.js`，我们也可以使用配置文件。

``` js
// 比如取名为 ecosystem.config.js
module.exports = {
  apps: [{
    script: './server/app.js',
    watch: '.',
    env_development: {
      "REACT_APP_NODE_ENV": "development"
    },
    env_production: {
      "REACT_APP_NODE_ENV": "production"
    }
  }]
}
```

之后通过以下命令来启动服务

``` shell
pm2 start ecosystem.config.js --env development
// or
pm2 start ecosystem.config.js --env production
```



##### 常用命令

``` js
pm2 start app.js
pm2 list
pm2 delete [app-id]
pm2 logs
pm2 logs [app-name]
pm2 monit
// ...
```







### 命令行工具

本节介绍如何使用node写命令行工具。



平时我们通常是使用`node index.js`去执行js代码。

如果我们在文件的开头加上`#!/usr/bin/env node`则可以指定代码默认的运行环境，如下代码:

``` js
#!/usr/bin/env node
console.log('hello')
```

我们现在可以使用`./index.js`去执行该文件，默认的运行环境就是node。



再进一步，我们在`package.json`中加上几行字段，如下:

``` json
"bin": {
    "mycli": "index.js"
},
```

之后在当前目录下执行`npm link`，执行完之后我们就可以通过`mycli`命令来执行代码。



在此基础上，介绍一些常用的库。

##### commander

``` js
// index.js
const { program } = require('commander')
// 或者
// const { Commander } = require('commander')
// const program = new Commander()
program
    .version('1.0.0')
    .description('命令行工具')
    .option('-t, --test', '测试命令');
program.parse(process.argv)

if (program.test) {
    console.log('测试成功')
}

// bash
$mycli -test 
测试成功
```





##### readline

``` js
// 官网代码
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('你好', (answer) => {
    console.log('666');
    rl.close()
})
```



``` js
// 官网代码
const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('log.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // 注意：我们使用 crlfDelay 选项将 input.txt 中的所有 CR LF 实例（'\r\n'）识别为单个换行符。

  for await (const line of rl) {
    // input.txt 中的每一行在这里将会被连续地用作 `line`。
    console.log(`Line from file: ${line}`);
  }
}

processLineByLine();
```



##### puppeteer

使用`puppeteer.connect`来复用已启动的浏览器进程。

1. 启动Chrome的时候加上`--remote-debugging-port=9222 `，重启浏览器

2. 访问`http://127.0.0.1:9222/json/version`拿到`webSocketDebuggerUrl`字段

3. ``` js
   const url = 'ws://127.0.0.1:9222/devtools/browser/81daad69-fb53-49ea-9f97-3683b73afea0'
   const browser = await puppeteer.connect({
       browserWSEndpoint: url,
   });
   ```

   

参考：https://medium.com/@jaredpotter1/connecting-puppeteer-to-existing-chrome-window-8a10828149e0