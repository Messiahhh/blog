---
sidebarDepth: 4
---
## Koa

##### 使用

``` javascript
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

##### 核心实现

``` javascript
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

  ``` javascript
  app.use((ctx, next) => {

  })
  ```

  use方法用于将参数中间件放进app的middleware数组里

- listen

  ``` javascript
  app.listen(3000)
  ```

  等价于

  ``` javascript
   const server = http.createServer(this.callback())
   server.listen(3000)
  ```

- callback

  该函数内部实现三个功能

  1. 使用koa-compose函数将middleware中间件数组转化为中间件fn

  2. 调用app.createContext函数。创建context，request，response对象；将request和response挂载在context上；把req和res挂载在三个对象上。

     例如：request的原型对象上部分代码如下

     ``` javascript
     get header() {
     	return this.req.headers;
     },
     set header(val) {
     	this.req.headers = val;
     },
     ```

     我们现在就可以根据`ctx.request.header`获取req的headers了

  3. 执行handleRequest函数，本质是把组装好的context传入中间件fn执行

Koa源码中使用到了Koa-compose， 用于将多个中间件函数组合为一个中间件函数

##### koa-compose

``` javascript
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

##### 使用

``` javascript
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

##### 简易实现

简易实现，只实现一个get方法，实际上要更复杂的多。

``` javascript
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

``` js
const static = require('koa-static')
app.use(static('public'))
```



### koa-body

处理请求的中间件，可以轻松获得请求的内容

``` js
const body = require('koa-body')
app.use(body({multipart: true}))
app.use((ctx) => {
    console.log(ctx.request.body)
})
```



### koa-logger

```  js
const logger = require('koa-logger')
app.use(logger())
```



### koa-views

通常用于搭配模板引擎进行服务端渲染，不过似乎现在不怎么用了。

另外使用的场合要额外去安装对应的模板引擎，比如想用`ejs`记得先`npm i ejs`

``` js
const views = require('koa-views')
const render = views('./views', { extension: 'ejs'})

app.use(render)
app.use(async ctx => {
    await ctx.render('template', {
        content: 'hello'
    }) 
})
```

``` ejs
<!-- template.ejs -->
<!DOCTYPE html>
<html>
<head></head>
<body>
    <div><%= content %></div>    
</body>
</html>
```

