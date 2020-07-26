---
sidebarDepth: 4
---
## 浏览器相关

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


