# 第三方库
## bluebird

可以将回调函数实现的异步改写成Promise的方式来写的第三方库。

### bluebird + fs

回调

```javascript
const fs = require('fs')
fs.readFile('index.html', (err, data) => {
    response.end(data)
})
```

Promise

```javascript
const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs'))

fs.readFileAsync('index.html')
.then(data => {
    response.end(data)
})
```

### bluebird + mysql

回调

```javascript
const mysql = require('mysql')
// mysql配置文件
let config = require('./config')
conn.connect()

// 使用
conn.query(`sql code here...`, (err, data) => {

})
```

Promise

```javascript
const bluebird = require('bluebird')
const mysql = require('mysql')
// mysql配置文件
let config = require('./config')
const conn = bluebird.promisifyAll(mysql.createConnection(config))
conn.connect()

// 使用
let data = await conn.queryAsync(`sql code here...`)
```

## PM2

除了常见的 `pm2 start index.js`，我们也可以使用配置文件。

```js
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

```shell
pm2 start ecosystem.config.js --env development
// or
pm2 start ecosystem.config.js --env production
```

### 常用命令

```js
pm2 start app.js
pm2 list
pm2 delete [app-id]
pm2 logs
pm2 logs [app-name]
pm2 monit
// ...
```

## 命令行工具

介绍常用的命令行工具

### chalk

给日志输出加上颜色。

```js
import chalk from 'chalk'
console.log(chalk.blue('akara'))  // 蓝色字体
console.log(chalk.blue.bgRed('akara')) // 蓝色字体，红色背景
```

### yargs

提供了对命令行参数的解析功能，并且默认提供了 `--help`、`--version`选项。

```js
#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const http = require("http");

yargs(hideBin(process.argv)) // hideBin(process.argv) 相当于 process.argv.slice(2)
    .command( 
        "serve [port]", // [port]为可选参数
        "启动服务器",
        { // 设置命令参数的别名、默认值等信息
            port: {
                alias: "p",
                default: 3000,
            },
        },
        (argv) => {
            http.createServer((req, res) => {}).listen(argv.port, () => {
                console.log(`服务器运行在${argv.port}端口`);
            });
        }
    )
    .command("curl <url>", "发送请求", {}, (argv) => { // <url>为必须参数
        if (argv.verbose) console.log('已经开启verbose')
        console.log(argv.url);
    })
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Run with verbose logging'
    })
    .argv;
```

```bash
cli --help
cli --version
cli serve 8000 # cli serve -p 8000 | cli serve --port=8000
cli curl 'google.com' -v
```

### commander

和 `yargs`作用差不多，可以选择其中一个来开发自己的命令行工具。

```js
#!/usr/bin/env node
const { program } = require('commander')

program
    .version('1.0.0')
    .description('cli tool')
    .option('--verbose', 'use verbose') // 布尔值
    .option('-u, --url <url>', 'url参数') // 必须参数
    .option('-p, --port [port]', 'port参数', 3000) // 可选参数，可设置默认值
    .parse(process.argv)

console.log(program.opts());
```

### inquirer

非常有用的命令行工具，常见于各种脚手架中。

```js
#!/usr/bin/env node
const inquirer = require('inquirer')
const questions = [
    {
        type: 'confirm',
        name: 'isPeople',
        message: '你是人吗?',
        default: false
    },
    {
        type: 'input',
        name: 'name',
        message: '请输入你的名字',
    },
    {
        type: 'input',
        name: 'phone',
        message: '请输入你的电话号码',
        validate(value) {
            const pass = value.match(/^1[34578]\d{9}$/g)
            if (pass) return true
            return '请输入正确的电话号码'
        }
    },
    {
        type: 'list',
        name: 'sex',
        message: '请选择你的性别',
        choices: ['Male', 'Female', 'None'],
        filter(val) {
            return val.toLowerCase();
        },

    }
]
inquirer
    .prompt(questions)
    .then(answers => {
        console.log(JSON.stringify(answers, null, ' '));
    })
```

### readline

```js
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

```js
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

## puppeteer

使用 `puppeteer.connect`来复用已启动的浏览器进程。

1. 启动Chrome的时候加上 `--remote-debugging-port=9222 `，重启浏览器
2. 访问 `http://127.0.0.1:9222/json/version`拿到 `webSocketDebuggerUrl`字段
3. ```js
   const url = 'ws://127.0.0.1:9222/devtools/browser/81daad69-fb53-49ea-9f97-3683b73afea0'
   const browser = await puppeteer.connect({
       browserWSEndpoint: url,
   });
   ```

参考：https://medium.com/@jaredpotter1/connecting-puppeteer-to-existing-chrome-window-8a10828149e0

## Koa

### 基础

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


// response
app.use(ctx => {
  ctx.status = 200
  ctx.set('Content-type', 'text/plain; charset=utf-8')
  ctx.body = 'Hello Koa'
});

app.listen(3000);

// 一些其他的方法
ctx.redirect('/home')
// 相当于
// res.status = 302
// res.setHeader('Location', '/home')
```

#### 核心实现

```javascript
const Emitter = require('events')
// 三个对象，提前定义好原型的方法
const context = require('./context')
const request = require('./request')
const response = require('./response')
class Koa extends Emitter {
    constructor() {
        super()
        this.middleware = []
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
    }

    callback() {
        const fn = compose(this.middleware)
        return (req, res) => {
            const ctx = this.createContext(req, res)
            return this.handlerRequest(ctx, fn)
        }
    }

    use(fn) {
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
        this.middleware.push(fn)
        return this
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        return server.listen(...args)
    }

    createContext(req, res) {
        // 其实就是根据已有的req和res创建上下文context
        const context = Object.create(this.context);
        const request = Object.create(this.request);
        const response = Object.create(this.response);
        context.request = request
        context.response = response
        context.app = request.app = response.app = this;
        // 重点，挂载req和res
        context.req = request.req = response.req = req;
        context.res = request.res = response.res = res;
        // 互相引用
        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;
        return context
    }

    handlerRequest(ctx, fn) {
        const res = ctx.res
        res.statusCode = 404
        fn(ctx).catch(reason => {
            console.log(reason)
        })
    }
}
```

Koa的实例app有三个公共的API

- use

  ```javascript
  app.use((ctx, next) => {
  
  })
  ```

  use方法用于将参数中间件放进app的middleware数组里
- listen

  ```javascript
  app.listen(3000)
  ```

  等价于

  ```javascript
   const server = http.createServer(this.callback())
   server.listen(3000)
  ```
- callback

  该函数内部实现三个功能

  1. 使用koa-compose函数将middleware中间件数组转化为中间件fn
  2. 调用app.createContext函数。创建context，request，response对象；将request和response挂载在context上；把req和res挂载在三个对象上。

     例如：request的原型对象上部分代码如下

     ```javascript
     get header() {
     	return this.req.headers;
     },
     set header(val) {
     	this.req.headers = val;
     },
     ```

     我们现在就可以根据 `ctx.request.header`获取req的headers了
  3. 执行handleRequest函数，本质是把组装好的context传入中间件fn执行

Koa源码中使用到了Koa-compose， 用于将多个中间件函数组合为一个中间件函数

#### koa-compose

```javascript
const compose = (middleware) => {
    if (!Array.isArray(middleware)) throw new TypeError("Middleware stack must be an array!")
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError("Middleware must be composed of functions!")
    }
    let length = middleware.length
    return function (ctx, next) {
        let index = -1
        return dispatch(0)
        function dispatch(i) {
            // 一个中间件内部多次调用next时，index大于等于i
            if ( index >= i) {
                return Promise.reject(new Error('next() called multiple times'))
            }
            let fn
            index = i
            if (i < length) {
                fn = middleware[i]
            }
            else if (i === length) {
                // 重点， 外部compose的next传进内部compose
                fn = next
            }
            // 最后一个中间件调用next时，什么也不做
            if (!fn) return
            // 官方源码使用Promise是为了使用async中间件，不过这里没有怎么实现这个功能，就一个样子
            return Promise.resolve(fn(ctx, dispatch.bind(null, (i + 1))))
        }
    }
}
```

### koa-router

```javascript
const Router = require('koa-router')
const router = new Router()
router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', (ctx, next) => {
    // ...
  })
  .put('/users/:id', (ctx, next) => {
    // ...
  })
  .del('/users/:id', (ctx, next) => {
    // ...
  })
  .all('/users/:id', (ctx, next) => {
    // ...
  });
app.use(router.routes())
app.use(router.allowedMethods()) // 此处例子没有实现该方法
```

#### 简易实现

简易实现，只实现一个get方法，实际上要更复杂的多。

```javascript
class Router {
    constructor() {
        this.stack = []
    }

    get(url, fn) {
        function middleware(ctx, next) {
            if (ctx.req.method.toLowerCase() === 'get' && ctx.req.url === url) {
                console.log('路由匹配成功');
                fn(ctx, next)
            }
            else {
                console.log('路由匹配失败');
                next()
            }
        }
        this.stack.push(middleware)
        return this
    }

    routes() {
        return (ctx, next) => {
            let fn = compose(this.stack)
            // 必须加上next参数
            // koa本身有一个compose， 这里也有一个，所以要把外部的next传给内部
            fn(ctx, next)
        }
    }
}
```

### koa-static

用于处理静态资源的koa中间件

```js
const static = require('koa-static')
app.use(static('public'))
```

### koa-body

处理请求的中间件，可以轻松获得请求的内容

```js
const body = require('koa-body')
app.use(body({multipart: true}))
app.use((ctx) => {
    console.log(ctx.request.body)
})
```

### koa-logger

```js
const logger = require('koa-logger')
app.use(logger())
```

### koa-views

通常用于搭配模板引擎进行服务端渲染，不过似乎现在不怎么用了。

另外使用的场合要额外去安装对应的模板引擎，比如想用 `ejs`记得先 `npm i ejs`

```js
const views = require('koa-views')
const render = views('./views', { extension: 'ejs'})

app.use(render)
app.use(async ctx => {
    await ctx.render('template', {
        content: 'hello'
    }) 
})
```

```ejs
<!-- template.ejs -->
<!DOCTYPE html>
<html>
<head></head>
<body>
    <div><%= content %></div>  
</body>
</html>
```

## NestJS

NestJS是个使用装饰器模式（风格类似前端的Angular）的Node后端框架，同时对TypeScript支持良好。

```js
npm i -g @nestjs/cli
nest new my-project
```

```tsx
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

```js
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController, MyController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, MyController],
  providers: [AppService],
})
export class AppModule {}
```

### Controller

我们可以通过编写 `controller`来实现后端路由。

```js
// app.controller.ts
import { Controller, Get, Post, Req, Res, Body, Param, Query, Headers, Header, HttpCode } from '@nestjs/common';
import { Request } from 'express'

export class DTO { // 数据传输对象
  value: string
}

@Controller()
export class AppController {
  @Get() // 匹配/路径
  getText(): string {
    return 'hello'
  }

  @Get('admin') // 匹配/admin路径
  getAdmin(): string {
    return 'admin'
  }
}

@Controller('/api')
export class MyController {
  @Get('fetchAllInfo') // 匹配/api/fetchAllInfo
  fetchInfo(@Req() req: Request, @Query() query): string[] { // 拿到Req、Query
    console.log(req.url)
    console.log(query)
    return ['a', 'b', 'c']
  }

  @Get('/fetchOneInfo/:id')
  fetchOneInfo(@Param() params, @Headers() headers): string { // 拿到Params、响应头Headers
    console.log(params.id)
    console.log(headers)
    return 'a'
  }

  @Post('/updateOneInfo/:id')
  updateOneInfo(@Param('id') id: number, @Body() body: DTO) { // 通过@Param('id')可以直接拿到具体的Param。拿到Body
    console.log(id)
    console.log(body)
    return { // 自动序列化为JSON并设置对应Content-Type
      code: 200,
      msg: 'success'
    }
  }

  @Get('html')
  @Header('Cache-Control', 'none') // 设置响应头部
  getHtml(): string { // 自动设置Content-Type
    return `
      <html>
        <body>
          <h1>hello nest</hi>
        </body>
      </html>
    `
  }

  @HttpCode(404) // 设置响应状态码
  @Get('404')
  four0four() {
    return '404 not Found'
  }

  @Get('async')
  async testAsync(): Promise<string[]> {
    return ['aa', 'bb', 'cc']
  } 

  @Get('res')
  async testRes(@Res() res) {
    res.send('hello nest')
  }
}
```

### Service

我们使用 `Controller`来进行路由控制，具体的数据操作或逻辑操作由 `Service`（`Service`是一种 `Provider`）负责。

首先创建 `Service`类，并在 `app.module.ts`中声明该 `Service`为 `Provider`，然后 `Controller`的构造函数添加一个入参（为 `Service`类的实例）。

```ts
// app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private name: string = 'akara'

  getName(): string {
    return this.name
  }

  setName(name: string): void {
    this.name = name
  }
}
```

```ts
// app.controller.ts
import { Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get/service')
  async testGetService() {
    return this.appService.getName()
  }

  @Get('/set/service')
  async testSetService() {
    return this.appService.setName('bkb')
  }
}
```
