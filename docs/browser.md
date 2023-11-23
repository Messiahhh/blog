---
sidebarDepth: 4
---
# 浏览器相关

## 跨域

当**协议**、**域名**、**端口**三者都相同，我们将其称为同源。

**浏览器**受到同源策略的限制，所谓**同源策略**，即指在**没有授权的情况下**，不同的源无法读写对方的资源。比如，当我们处于`A.com`时向`B.com`发送`ajax`或`fetch`请求是会失败的。当然，如同`<script src="">`或`form`表单之类的操作不受同源策略的限制，因此可以请求到对方的资源。



很多时候我们希望即使处在`A.com`也能向`B.com`发送请求，也就是脱离同源策略，我们有许多手段可以实现该目的，而这些手段我们统一称为**跨域**。

跨域的手段有很多，最常用的是`CORS`、代理服务器等，下面也会顺便介绍一些平时用不上的手段，权当开拓视野。



在讲解跨域的手段之前，先普及Cookie的一个知识点。Cookie拥有`domain`属性，比如当我们访问`A.com`拿到的Cookie，那么这个Cookie它是只能发送给`A.com`，不能发送给其他域名。



### 跨域资源共享（CORS）

可以说是最简单的一种实现跨域的手段。

只需要添加一个响应头部`Access-Control-Allow-Origin`

``` js
ctx.set('Access-Control-Allow-Origin', '*') // *代表任意源
// 或者
ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000') // 指定源
```

另外使用`CORS`的时候默认不会发送Cookie，如果想要发送对应的Cookie，需要两个条件：

1. 再添加一个响应头部`Access-Control-Allow-Credentials`

   ``` js
   ctx.set('Access-Control-Allow-Credentials', true)
   ```
   
2. 此时第一个响应头不能使用`*`，必须指定一个源。

   如果任意源都可以向我们的接口发送带Cookie的请求，那这瞬间就满足了`CSRF`攻击的条件了，所以通过指定源可以很好的规避这个风险。



那么按理来说，加上了这两个响应头后我们就可以跨域发带Cookie的请求了，比如我们可以从`localhost:3000`向`localhost:8000`发送带Cookie的请求。

但是可能当你从`A.com:3000`向`B.com:8000`发送请求时，你发现你的Cookie仍然没有被发过去。



事实上，在Chrome的80版本后，Cookie新增了一个叫做`sameSite`的属性。

`sameSite`有三个模式，`strict`，`lax`,  `none`。它的默认值是`lax`。

- `strict`是极其严格的，它表示着任何非同站（`a.qq.com`和`b.qq.com`也是同站）的请求都不能带上对应的Cookie
- `lax`是默认值，但其实它也挺严格的，它表示着只有部分请求可以带上Cookie，诸如`AJAX`发送的请求是无法带上Cookie的
- `none`没有任何限制，`A`发给`B`的请求能够代码Cookie。然而把`sameSite`设置成`none`时，Cookie必须带上`secure`属性，也就是必须使用HTTPS才行。



很明显`sameSite`是作为一种`CSRF`防御手段出现的，但它的出现同样给我们的正常开发带来了一点麻烦，非同站的情况下即使加上CORS的两个响应头，我们的Cookie也不能发过去了。

而且似乎没有很完美的解决方案，除了要求两个站是同站，把`lax`改成`none`也要求我们使用`https`，不管怎么看都十分的严格。



### 预检请求

回归正题。再介绍一下，在CORS中浏览器把请求分为**简单请求**和**非简单请求**。

简单请求需要同时满足几个条件，比如：

1. 请求方法为 `HEAD`或`GET`或`POST`

2. HTTP头部也有许多限制，比如：

   `Content-Type`只限：`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

   只能有像`Accept`、`Accept-Language`、`Content-Language`、`Last-Event-ID`这类的请求头部。

   比如一旦使用自定义头部，那么这么请求就会被视为**非简单请求**。



把请求根据类型进行划分之后，在CORS中针对**非简单请求**的通信，会在实际通信之前增加一次HTTP通信，也就是所谓的**预检请求**，这个请求的请求方法为`OPTIONS`。

假设我们发送了一个请求方法是`PUT`，有一个自定义请求头部`x-my-header`，很明显这是一个非简单请求。

那么此时会在实际请求前自动发出一个预检请求，请求方法为`OPTIONS`，含有以下两个请求头：

``` http
Access-Origin-Request-Method: PUT 
Access-Origin-Request-Headers: x-my-header 
```

当后端收到该预检请求时，返回的响应里要**手动添加**两个响应头部：

``` http
Access-Control-Allow-Method: PUT
Access-Control-Allow-Headers: x-my-header
```

这样子，当前端受到响应后，就视为通过了预检，之后再发送实际的通信请求。





### JSONP

简单来讲，JSONP是利用了`<script>`加载资源时不受同源策略限制。以往我们在`src`里写的是资源的地址，但这里我们是在给接口发请求，同时接口返回的文本会被我们当成JS解析。

当然，正是因为如此JSONP只支持GET请求。

```html
<script>
	function doSomething(json) {
    	//do something
	}
</script>

<script src="http://api.example.com/data?callback=doSomething&parma=a"></script>
```

``` js
ctx.body = `doSomething(${myJson})` // 传参
```



### 代理服务器

由于同源策略是浏览器的策略。

`A.com:80`不能向`B.com:3000`发送请求。那我们可以在`A.com:8080`设置一个代理服务器来代理请求，之后发请求就是`A.com:80 -> A.com:8080 -> B.com:3000`，此时请求可以成功发过去。

通常我们本地开发项目是使用`webpack-dev-server`，而它自带了代理服务器的功能（只需要我们在配置文件中加上`proxy`），所以可以轻松解决跨域问题。除此之外我们也可以使用`nginx`来进行反向代理。



###  postMessage 

跨文档通信。比起`window.name`和`location.hash`，该方法更加方便。

``` js
window.postMessage('message', url) 

window.on('message', function (e) {
    console.log(e.data)
})
```





## HTTP缓存

HTTP缓存分为**强制缓存**和**协商缓存**。

当浏览器向服务器请求资源时：

1. 首先查看浏览器是否有资源的缓存，若不存在缓存则直接向服务器请求资源

2. 若存在缓存，根据**资源对应的响应头部**`Cache-Control: max-age`或 `Expires` 判断资源是否过期。

   其中`Cache-Control: max-age`使用的相对的时间，而`Expires`指的是某一个具体的时刻，为了避免不同机器中时间误差来带的问题，使用前者更好。

   1. 若缓存没过期，则浏览器不会向服务器发请求，而是直接读取缓存中的资源，这叫做**强制缓存**。 此时在`Network`一栏中看到资源对应的状态码为200（虽然实际上并不存在HTTP请求）。如果我们是直接刷新页面，资源会从内存缓存中读取：`200(from memory cache)`；如果我们是打开了新的页面，资源会从硬盘缓存中读取: `200(from disk cache)`
   2. 若缓存已过期，我们需要向服务器查看服务器中的该资源是否有被修改，如果服务器中的资源没有被修改，我们会直接读取本地的缓存资源，这叫做**协商缓存**，状态码为`304(Not Modify)`；如果服务器中的资源被改动了，那么服务器需要把改动后的资源作为响应体发给浏览器，状态码为`200(OK)`。
      1. 如果资源对应的响应头部有`Etag`，那么我们发送的请求需要带上`If-None-Match`
      2. 如果资源对应的响应头部有`Last-Modified`，那么我们发送的请求需要带上`If-Modified-Since`
      3. 服务器收到我们的请求后，根据这两个请求头部来判断资源是否修改过，进而决定是响应304还是200。



另外，通常我们不能用HTTP缓存来缓存一个非常大的资源。这种情况或许可以考虑使用`IndexedDB`来实现本地的存储。




### 强制缓存

``` js
const Koa = require("koa")
const app = new Koa()
const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs'))
app.use(async ctx => {
    if (ctx.url === '/') {
        console.log(111);
        const file = await fs.readFileAsync('./dist/index.html')
        ctx.type = 'text/html'
        ctx.body = file
    }
    if (ctx.url === '/image.png') {
        console.log(222);
        const file = await fs.readFileAsync('./dist/image.png')
        ctx.set('Cache-Control', 'max-age=10')
        ctx.type = 'image/png'
        ctx.body = file
    }
})
app.listen(3000)
```



### 协商缓存

``` js
const getEtag = require('etag')
app.use(async ctx => {
    if (ctx.url === '/') {
        const file = await fs.readFileAsync('./dist/index.html')
        ctx.type = 'text/html'
        ctx.body = file
    }
    if (ctx.url === '/image.png') {
        const file = await fs.readFileAsync('./dist/image.png')
        const hash = getEtag(file)
        const etag = ctx.get('If-None-Match')
        if (etag && etag == hash) {
            ctx.status = 304
            ctx.body = ''
        } else {
            if (!etag) ctx.set('ETag', hash)
            ctx.type = 'image/png'
            ctx.body = file
        }
    }
})
```





## 浏览器客户端存储

### LocalStorage

持久化的本地存储，除非主动删除否则数据将一直存在。一般最大的存储量为5Mb。

``` js
localStorage.setItem('my_key', 'my_value')
localStorage.getItem('my_key')
localStorage.removeItem('my_key')
localStorage.clear()
```

### SessionStorage

会话级的本地存储，一旦页面被关闭，数据就会被清除。一般最大的存储量为5Mb。





### Cookie

通常服务器使用`Set-Cookie`头部从而在浏览器种下Cookie，Cookie存放的数据不能大于4Kb。

一些常见的Cookie属性：

1. `expires`：Cookie的过期时间
2. `domain`：只能访问该域名时才会带上Cookie
3. `path`：表明只有访问该路径时才会带上Cookie
4. `httpOnly`：为`true`时，浏览器不能通过代码读取Cookie
5. `secure`: 为`true`时，只有发送HTTPS请求时才会带上Cookie
6. `SameSite`：默认为`lax`，详细解释见本章第一节

**简易封装Cookie**

``` js
const cookieUtil = {
    setItem(name, value, days) {
        let date = new Date()
        date.setDate(date.getDate() + days)
        document.cookie = `${name}=${value};expires=${date}`
    },

    getItem(name) {
        let arr = document.cookie.split(';')
        let ret 
        arr.forEach(item => {
            let tempArr = item.split('=')
            if (tempArr[0] === name) {
                ret = tempArr[1]
            }
        })
        return ret
    },

    removeItem(name) {
        this.setItem(name, null, -1)
    }
}

```



**Cookie和Storage的对比**

`Cookie`最大可存储4KB；而`Storage`最大可存储5MB。

`Cookie`可以设置过期时间，`SessionStorage`会在会话关闭时清除，`LocalStorage`必须要手动清除。

`Cookie`参与和服务器之间的通信，而`Storage`通常并不参与。



### Session

通常使用`Session`时需要搭配上`Cookie`。通常单独使用`Cookie`时，会话数据都储存在`Cookie`中；使用`Session`时，`Cookie`中只存放一个`Session_id`这样的键，实际的会话数据存放在服务端中，比如可能存放在服务端的`redis`数据库中。



![Session鉴权原理](https://pic3.zhimg.com/v2-b4c952a1f71313670b94898b2bea4f6a_r.jpg)



### JWT 

JSON Web Token（缩写JWT）并不是客户端存储方案，放在这一节是因为它和Cookie、Session都是一种用户身份认证的手段。

基于Cookie的认证最大的缺陷就是对于跨域场景的无力，特别是现在浏览器对Cookie加上的`sameSite`属性，这个属性加强了对于`CSRF`攻击的防范，但让我们携带Cookie进行跨域变得困难无比。

另外Session的一个缺点是由于会话数据都保存在服务端，当使用服务器集群的时候我们必须让会话共享，比如将Session写入数据库等等。而JWT由于会话数据都保存在客户端，自然不会有这样的问题。



使用JWT来进行用户身份认证时，当我们输入用户名和密码进行登录时，服务器会将用户数据使用`Base64`转化成一个`token`字符串返回给前端，通常前端将这个`token`字符串保存在`localStorage`或`Cookie`中以供以后使用，在这之后发请求时会将`token`提取出来，或是放在`Authorization: Bearer ${token}`请求头部中，又或是直接作为请求的参数字段发送给后端，以供后端解析鉴权。

实际上`token`字符串由两个`.`分割三个部分：Header、Payload、Signature（签名）。

- Header字符串是由一个JSON对象通过`Base64`编码而来，这个JSON的结构如下：

  ``` json
  {
      "alg": "HS256",
      "typ": "JWT"
  }
  ```

  在这里`alg`表示的是签名是所使用的算法，默认值为`HMAC SHA256`。`typ`表示`token`的类型，默认为`JWT`。

- Payload是由我们的**会话数据**通过`Base64`编码得到的

- Signature是对前两个部分的签名，服务端通过前两个部分的值以及密钥生成该签名。

  ``` js
  HMACSHA256(
  	Base64URL(header) + "." + Base64URL(payload),
  	secretOrPrivateKey
  )
  ```



我们也可以使用Node的`jsonwebtoken`模块来实现该功能。

``` js
const jwt = require('jsonwebtoken')
const token = jwt.sign({ name: 'akara'}, 'key')
const data = jwt.verify(token, 'key')
```





![JWT鉴权原理](https://pic3.zhimg.com/v2-f1556c71042566d4a6f69ee20c2870ae_r.jpg)



### IndexedDB

浏览器内部的数据库，可用于存储大容量的结构化（或二进制数据）数据。目前有两个比较好用的库。

#### localforage

更像容量加强版的LocalStorage，感觉读写性能并不是很高，特点是在不支持IndexedDB的浏览器中会从IndexedDB实现降级成LocalStorage实现。

``` js
const keys = await localforage.keys()
const hasLocalCache = keys.includes('my_key') // 自定义键名
if (hasLocalCache) {
    console.log('读取本地缓存');
    data = await localforage.getItem('my_key')
} else {
    console.log('读取后端数据');
    data = await fetch('./getData').then(res => res.json())
    localforage.setItem('my_key', data)
}
```

#### Dexie

更贴近IndexedDB底层操作，读写性能更高。





## WebWorker

> TODO





## Chrome 插件

- [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)
  - 相当于Chrome插件的描述文件，定位类似通常前端项目中的`package.json`，通过声明Permission可以来访问各种插件能力。
- [Content-Script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
  - 被注入在所有页面中的插件代码，和页面本身的脚本上下文互相独立，且可以访问部分插件能力。
- [Extension Service Worker](https://developer.chrome.com/docs/extensions/mv3/service_workers/)
  - 主要用来响应各种用户事件，负责管理整个插件内外的数据通信，以及处理插件内部的数据存储和读写等逻辑。可以和Content-Script进行消息通信（JSON序列化的形式）



