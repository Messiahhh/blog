---
sidebarDepth: 4
---
# HTML
## 浏览器解析流程

浏览器收到HTML -> 解码 -> 资源预加载 -> 解析HTML（HTML -> Token -> DOM）-> DOM和CSS Tree生成渲染树 -> 布局 -> 绘制 -> 渲染层合成。

### 解码

根据编码方式进行解码。

### 资源预加载

在解析HTML前先获取到HTML内部的外链地址并放入请求队列当中，因此不必等到HTML解析到某行代码的时候再去加载资源。

##### preload

预加载资源时进入请求队列的先后顺序是根据资源在代码中出现的顺序决定的，我们也可以使用`preload`来手动调整资源的预加载顺序。

``` html
<body>
    <script src="a.js"></script>
    <script src="b.js"></script>
    <script src="c.js"></script>
</body>
```

对于以上文档的脚本资源的加载顺序是`a、b、c`，如果想要在不改变脚本执行顺序的同时让`c.js`优先于`a.js`进入请求队列，我们可以这样改。此时脚本资源的加载顺序是`c、a、b`

``` html
<body>
    <link rel="preload" as="script" href="c.js">
    <script src="a.js"></script>
    <script src="b.js"></script>
    <script src="c.js"></script>
</body>
```

### 解析HTML

解析HTML的时候需要注意JavaScript**脚本的执行会阻塞HTML的解析**，因此当解析HTML解析到一行外链脚本的时候，我们需要等待**脚本的加载**、再等待**脚本的执行**，才能继续后续HTML的解析。



##### async and defer

如果我们不希望**脚本的加载**阻塞HTML的解析，我们可以给`script`标签加上`async`或者`defer`，此时该外链脚本的加载将不会阻塞后续HTML的解析（也就是解析后续HTML的同时并行加载该脚本，当该脚本被成功加载后则会停止后续HTML的解析并开始执行该脚本）

- `async`：外链脚本加载完成后会立刻停止HTML的解析并开始执行该脚本
- `defer`：外链脚本会在整个HTML都被解析完成后（或者说`DOMContentLoaded`事件触发）才执行

![defer and async](https://image-static.segmentfault.com/215/179/2151798436-59da4801c6772_articlex)



##### crossorigin

浏览器默认是开启跨域资源共享（CORS）的，这意味着对于一个普通的`fetch`请求，如果请求的资源是同域的，那么请求头不会自动带上`Origin`；如果请求的资源是跨域的，则请求头会自动带上`Origin: 当前域`。浏览器会根据响应头的`Access-Control-Allow-Origin`来控制资源能否访问。

对于`script`、`link`、`img`等标签请求的外链资源，默认情况下不会指定`crossorigin`属性（可视为没有开启CORS），此时我们发送的跨域请求不会带上`Origin`头部，这意味着浏览器不会根据请求头`Origin`和响应头`Access-Control-Allow-Origin`来控制资源能否访问（也就是我们俗称的`script`标签不受同源策略的影响）

除了默认的不指定`crossorigin`属性（随意请求跨域资源），我们也可以手动给这个属性值，分别是`anonymous`和`user-credentials`，只要给定了`crossorigin`就相当于开启了CORS，此时如果请求的脚本是跨域的那么请求头也会带上`Origin`





##### DOMContentLoaded和Load

- `DOMContentLoaded`：HTML被完全加载和解析后触发，通常此时样式、图片等资源没有完全加载好
- `Load`：当所有的资源都加载完成，即包括HTML、样式、图片、脚本等资源。

在浏览器`network`一栏中可以看到这两个事件完成所经过的时间。



### 布局

定义：浏览器根据渲染树，获取每个渲染对象在屏幕上的位置和尺寸

##### 重排（回流）

定义：重新布局。当渲染对象的位置，尺寸，或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程。

可能引起重排的操作包括：

1. 元素位置或尺寸发生变化。
2. 浏览器窗口大小发生变化。
3. 添加或删除可见的DOM元素。
4. 查询某些属性或调用某些方法，如`clientWidth`、`clientHeight`、`scrollIntoView()`、`getComputedStyle()`、`getBoundingClientRect()`、`scrollTo()`




### 绘制

将计算好的像素点绘制到屏幕

定义：重新绘制/样式的改变不改变渲染对象在文档流中的位置时（如：color, background-color的改变）浏览器重新绘制

**回流一定引发重绘，重绘不一定引发回流。回流比重绘的代价要更高**。

**优化手段**

1. 浏览器会维护一定队列，所有引起回流或重绘的操作会放进这个队列，一定时间后会对这些操作进行批处理。

   但当访问clientWidth, clientHeight之类的属性时，会刷新这个队列，所以要尽量减少这些属性的访问

2. 浏览器使用的流式布局模型，避免使用table。

3. 对DOM元素进行修改时，可以先使用`display: none`使其脱离文档流，再进行DOM操作，执行完再放回文档流。

4. 对于复杂的动画效果，可以用`position: absolute`使其脱离文档流

5. 使用CSS3中的`transform, opacity, filters`属性，启动GPU加速，这些属性的改变不会引发回流或重绘。



### 渲染层合成

多个绘制后的渲染层按照恰当的重叠顺序进行合并，而后生成位图，最终通过显卡展示到屏幕上。









## 其他

### 重定向

- ``` html
  <meta http-equiv="refresh" content='2;https://messiahhh.github.io/blog'>
  ```

- ``` js
  location.href = 'https://messiahhh.github.io/blog'
  ```

- ``` js
  res.statusCode = 301 // or 302
  res.setHeader('Location', 'https://messiahhh.github.io/blog')
  ```

### markdown to html

我们的常见需求是把`markdown`文件解析成页面，有很多种工具可以实现这一目的，比如可以使用`gray-matter`、`remark`、`remark-html`、`remark-prism`来实现。

其中`gray-matter`可以用来获取`markdown`的内容和`yaml`元数据。

``` js
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'

const markdown = fs.readFileSync(path, 'utf8')
const matterResult = matter(markdown)
const processedContent = await remark()
	.use(html)
	.use(prism)
	.process(matterResult.content)
const contentHtml = processedContent.toString()
```



### link和@import的区别

1. link是XHTML提供的标签，不仅可以加载CSS。@import是CSS提供的语法规则，只能加载CSS
2. 加载页面时，`link`标签引入的 CSS 被同时加载；`@import`引入的 CSS 将在页面加载完毕后被加载。

