---
sidebarDepth: 4
---
## 浏览器相关

### 跨域

同源：协议，域名，端口号三者都相同，我们称之为同源。

同源策略：只有浏览器才受到同源策略的限制。即不同源的脚本在没有授权的情况下，不能读写对方的资源。比如我们打开了`A.com`，之后又在没有许可的情况下向`B.com`发送请求，通常这个请求是失败的。想要摆脱同源策略的限制，就得使用下面介绍的跨域手段了。



下面介绍了许多种跨域手段，最常用的是`CORS`和反向代理。

##### JSONP

客户端

```html
<script>
	function doSomething(json) {
    	//do something
	}
</script>

<script src="http://api.example.com/data?callback=doSomething&parma=a"></script>
```

服务端

``` js
ctx.body = `doSomething(${myJson})` // 传参
```

缺点：**仅支持GET请求**，安全性低



##### document.domain

Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。但是，两个网页一级域名相同，只是二级域名不同，浏览器允许通过设置`document.domain`共享 Cookie。

如a.example.com和b.example.com。

此时两个网站都设置 `document.domain =  "example.com"`， 那么两个网页就可以共享Cookie了。

``` js
// a.example.com
document.cookie = 'aaa'

// b.example.com 
console.log(document.cookie) // 'aaa'
```





##### window.name

这个方法主要用于**父窗口和iframe窗口的通信**。

如果父窗口和iframe窗口是不同源的，则通常无法进行通信。

``` html
<html>
    <body>
        <!-- 我是父窗口 -->
        <iframe src='xxx.com'>
            <!-- 我是子窗口 -->
        </iframe>
    </body>
</html>
```



`window.name`特点：无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页可以读取它。

例如，我们在a.com页面下设置

``` js
window.name = '123'
location.href = 'b.com'
```

然后在b.com也能获取到`window.name`的值。



实现跨域：

使用时，先设置`iframe`的`src`为我们想要通信的目标页面。当目标页面的`window.name`修改时，将我们的`iframe`的`src`修改为一个和父窗口同源的页面。



本质：

iframe内的目标页面 <=> iframe内的一个和父窗口同源的页面 <=> 父窗口



##### location.hash

这个方法也是主要用于**父窗口和iframe窗口的通信**。



特点：如果只是改变片段标识符(fragment/hash)，页面不会重新刷新。



实现跨域：

父窗口修改`iframe`窗口的`src`

``` js
// 父窗口
let src = `${originUrl}#${data}`
document.querySelector('iframe').src = src
```

`iframe`窗口的页面不会刷新，但是能知道`hash`的变化

``` js
// iframe窗口
window.onhashchange = function () {}
```

同理，`iframe`窗口也可以改变父窗口的`hash`来实现通信。



##### CORS

CORS（Cross-Origin ResourceSharing）跨域资源共享

只需要后端在响应头设置`Access-Control-Allow-Origin: *`， * 为任意Origin，也可以指定Origin

使用CORS时默认不发送Cookie，想要发送Cookie需要:

1. 设置`Access-Control-Allow-Credentials: true`
2. 此时`Access-Control-Allow-Origin`不能设置为 * ，必须指定Origin

浏览器把请求分为简单请求与非简单请求

简单请求必须满足以下两大条件

1. 请求方法为 HEAD / GET / POST
2. HTTP头部不超过以下几种
   1. Accept
   2. Accept-Language
   3. Content-Language
   4. Last-Event-ID
   5. Content-Type：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

不满足的就为非简单请求。

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求。

这个请求的请求方法为`OPTIONS` ，预检请求的头部还会包括以下几个字段

`Origin` 

`Access-Control-Request-Method` 用来表示非简单请求的请求方法

`Access-Control-Request-Headers`  用来表示非简单请求的额外头部，例如自定义头部





#####  postMessage 

跨文档通信。比起`window.name`和`location.hash`，该方法更加方便。

``` js
window.postMessage('message', url) 

window.on('message', function (e) {
    console.log(e.data)
})
```



##### 反向代理

由于同源策略是浏览器的策略。

`A.com:80`不能向`B.com:3000`发送请求。那我们可以在`A.com:8080`设置一个代理服务器来代理请求，之后发请求就是`A.com:80 -> A.com:8080 -> B.com:3000`，此时请求可以成功发过去。

通常我们本地开发项目是使用`webpack-dev-server`，而它自带了代理服务器的功能（只需要我们在配置文件中加上`proxy`），所以可以轻松解决跨域问题。除此之外我们也可以使用`nginx`来进行反向代理。



### 浏览器渲染机制

1. 浏览器先对得到的HTML进行解码，之后进行网络资源的预处理，将以后要发送的请求提前加进请求队列中。
2. 浏览器将HTML转化为一个个的标记（标记化Tokenization），之后通过标记来构建DOM树；CSS同理，先进行标记化，再进行CSS样式树的构建。
3. 浏览器将DOM树和CSS样式树结合，生成渲染树。
4. 布局：浏览器根据渲染树，获取每个渲染对象在屏幕上的位置和尺寸。
5. 绘制：将计算好的像素点绘制到屏幕。
6. 渲染层合成：多个绘制后的渲染层按照恰当的重叠顺序进行合并，而后生成位图，最终通过显卡展示到屏幕上。

##### 回流/重排

​	**当渲染对象的位置，尺寸，或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程。**

导致回流的操作：

1. 页面首次渲染

2. 元素位置或尺寸发生变化。

3. 添加或删除可见的DOM元素。

4. 浏览器窗口大小发生变化。

5. 查询某些属性或调用某些方法

   `clientWidth`、`clientHeight`、`clientTop`、`clientLeft`

   `offsetWidth`、`offsetHeight`、`offsetTop`、`offsetLeft`

   `scrollWidth`、`scrollHeight`、`scrollTop`、`scrollLeft`

   `scrollIntoView()`、`scrollIntoViewIfNeeded()`

   `getComputedStyle()`

   `getBoundingClientRect()`

   `scrollTo()`

##### 重绘

​	**样式的改变不改变渲染对象在文档流中的位置时（如：color, background-color的改变）浏览器重新绘制。**



**回流一定引发重绘，重绘不一定引发回流。回流比重绘的代价要更高**。



##### 优化

1. 浏览器会维护一定队列，所有引起回流或重绘的操作会放进这个队列，一定时间后会对这些操作进行批处理。

   但当访问clientWidth, clientHeight之类的属性时，会刷新这个队列，所以要尽量减少这些属性的访问

2. 浏览器使用的流式布局模型，避免使用table。

3. 对DOM元素进行修改时，可以先使用`display: none`使其脱离文档流，再进行DOM操作，执行完再放回文档流。

4. 对于复杂的动画效果，可以用`display: position`使其脱离文档流

5. 使用CSS3中的`transform, opacity, filters`属性，启动GPU加速，这些属性的改变不会引发回流或重绘。



### 浏览器事件模型

##### 事件传播

```html
<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
</body>
```

当我们点击inner元素的时候。

步骤①：点击事件传播途径：body -> outer -> inner 。这个过程从外往里，所以叫做事件捕获。

步骤②：点击事件传播途径：inner -> outer -> body 。这个过程从里往外，所以叫做事件冒泡。

总结而言，点击一个元素后，点击事件从外层元素开始向内传播（称为事件捕获），直到我们的被点击元素（event.target），之后从被点击元素开始向外传播（称为事件冒泡）

##### 阻止事件传播

当我们点击inner元素时，点击事件的传播路径如下

①outer触发点击事件(捕获标志) -> ②inner触发点击事件(捕获标志) -> ③inner触发点击事件(冒泡标志) -> ④outer触发点击事件(冒泡标志)

我们可以使用**event.stopPropagation**来阻止事件的传播。

``` javascript
let inner = document.querySelector('.inner')
let outer = document.querySelector('.outer')

inner.addEventListener('click', function (e) {
    e.stopPropagation()
}, true)

outer.addEventListener('click', function (e) {
    inner.style.display = 'none'
})
```

##### 事件代理/事件委托

事件代理是由**event.target**实现的

``` javascript
let ul = document.querySelector("ul")

ul.addEventListener("click", (e) => {
    console.log(e.target.innerHTML);
}, false)
```

**事件代理的好处**：

1. 减少内存的使用，只用给一个元素监听事件
2. 当动态增加或删除节点的时候，不用手动重新监听事件



### 浏览器客户端存储

##### LocalStorage

​	**持久化的本地存储，除非主动删除，否则数据不会过期。**

##### SessionStorage

​	**会话结束（关闭页面）后，数据清除。**

##### Cookie

浏览器发送HTTP请求时，先检查是否有相应的Cookie，如果有则将Cookie放在请求头中的Cookie字段中发送。

1. expires: 设置Cookie的过期时间
2. secure: 当secure为true时只能使用https
3. httpOnly: 设置浏览器能否读取Cookie
4. domain和path: 限制Cookie能被哪些URL访问
5. SameSite

**封装Cookie**

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



Cookie和Storage的对比

Cookie存放数据小，4KB左右；而Storage可以存放5MB左右。

Cookie可以设置过期时间，SessionStorage会在会话关闭时清除，LocalStorage必须要手动清除。

Cookie参与和服务器的通信，Storage则一般不用于。



##### Session

通常使用Cookie时，会话数据都存在Cookie中。使用Session时，Cookie中只存放一个Session_id，会话数据放在服务端的内存或数据库中。



![Session鉴权原理](https://pic3.zhimg.com/v2-b4c952a1f71313670b94898b2bea4f6a_r.jpg)



##### JWT （JSON Web Token）

同样是用来做鉴权。Session的一个缺点就是由于会话数据保存在服务端，所以在使用服务器集群的时候处理起来很麻烦。而使用JWT的话，会话数据都保存在客户端，就没有这种问题了。

JWT是个很长的字符串，中间用两个`.`分割为三个部分，三个部分依次如下：Header（头部）， Payload（负载），Signature（签名）

###### Header

头部是个JSON对象，结构通常如下

``` json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

alg属性表示签名的算法，默认为HMAC SHA256(写成HS256)。

typ属性表示这个token的类型，通常为“JWT”

最后使用Base64URL把这个JSON对象转化为字符串

###### Payload

负载也是个JSON对象，存放需要传输的数据。除去官方字段，可以在这里定义私有字段。

###### Signature

Signature 部分是对前两部分的签名，防止数据篡改

``` javascript
HMACSHA256(
Base64URL(header) + "." + Base64URL(payload),
secret
)
```

其中secret为服务端指定的密钥。

![JWT鉴权原理](https://pic3.zhimg.com/v2-f1556c71042566d4a6f69ee20c2870ae_r.jpg)



### CORS与CSRF与sameSite

> 一点小的思考

案例：

a.com（下文简称a域）用于提供网站静态资源，b.com（下文简称b域）用于提供API接口。

访问b域的某个接口后，浏览器被种下值为`name=akara`的Cookie，此Cookie的Domain属性为b.com，表示该Cookie只能被发给b域。



**CORS**

因为浏览器的同源策略的限制，a域无法直接向b域发送请求。为解决跨域问题，最方便的方式是CORS（跨域资源共享）。

通过设置`Access-Control-Allow-Origin`的响应头部，简单的请求就会被允许从a域送达b域，不过此时请求不会自动带上b域的Cookie。

通过设置`Access-Control-Allow-Credentials`响应头部，Cookie才能被一起发过去。

而对于复杂请求，在正式发送请求时需要发送一次请求方式为OPTION的报文，称之为预检（preflight）。

预检请求会带上一下两个请求头部，头部的值为正式请求的方法和头部。

``` http
Access-Control-Request-Headers: content-type
Access-Control-Request-Method: POST
```

而预检响应会带上四个响应头部

``` http
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://a.com
Access-Control-Allow-Headers: content-type
Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS
```

多出来的两个响应头也是需要后端进行设置的。

在预检请求通过之后，正式请求才能被发给后端。



**CSRF**

现在假设a域是一个恶意的网站，b域是一个正常的网站。

当我们访问过b域，可以得到b域的Cookie；此时当我们访问a域，在a域给b域发送请求，这个请求会带上b域的Cookie，因此b域收到请求后会执行某些危险操作。



先停一下。

因为我上文讲了CORS，那当读者看到这一段的时候，有可能误以为b域名也使用了CORS，然后就以为CORS会带来CSRF的安全问题。

CSRF攻击成功的一大关键就是a域发送给b域的请求必须携带b域的Cookie，而CORS的`access-control-allow-credentials`确实可以让我们带上Cookie，但是注意到一个使用CORS的规定，我们无法同时设置以下两个头部

``` 
access-control-allow-origin: *
access-control-allow-credentials: true
```

有权携带Cookie的域必须是特定的域，因此通过这个规定，CORS并不会带来CSRF的危险。



回到我们的例子，实际上这里所说的请求并不是跨域AJAX请求，比如它可以是通过表单发送的请求，而通过表单发送的请求是不受同源策略所限制的，因此即使b域没有设置任何东西，a域也可以把带有b域的请求发送给b域，从而达到攻击的目的。



**sameSite**

我们以前有一些防御CSRF的手段，而chrome80版本之后也给cookie新增了一个属性，`sameSite`。

`sameSite`有三个属性，`strict`，`lax`,  `none`。

- `strict`表示非同站的请求不能带上Cookie，比如a域发给b域的任何请求都无法带上Cookie。
- `none`则没有任何限制，a域发给b域的请求都可以带上Cookie，不过使用这个值的时候Cookie也必须带上secure属性，表示b域使用的HTTPS协议。
- `lax`只允许部分第三方请求带上Cookie，比如AJAX和表单提交的POST请求都无法发给b域。



现代浏览器设置的Cookie的samesite属性默认为`lax`，主要目的是帮我们抵御CSRF攻击。

但是问题也随之而来，当我们使用CORS实现跨域发送带Cookie的请求，在以前应该是没有问题的，而现在因为`samesite`这个属性，跨域的请求无法带上Cookie。

那我们应该如何处理这个问题呢？第一反应是设置Cookie的时候，将SameSite属性设置为None。但是很多公司内部的站点都是用的HTTP协议，特意去弄一个证书感觉有点麻烦。

一种比较方便的方式是让两个站点是同站，比如a.qq.com与b.qq.com，因为是samesite，请求就可以带上Cookie了。



**总结**

- CORS可以让我们轻松处理跨域问题。
- CSRF是普遍存在的问题。
- 借助sameSite的防御CSRF。
- CORS + Samesite 可能使得请求无法带上Cookie，我们可以让站点同站，比如a.qq.com和b.qq.com。

