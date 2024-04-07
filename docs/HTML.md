---
sidebarDepth: 4
---
# HTML
### meta标签

`meta`标签是网页的元数据，用来描述页面的信息，一个`meta`标签包括`name`和`content`的键值对。常见的`meta`标签有：

``` html
<meta charset="utf-8" /> <!-- 编码方式 -->
<meta name="title" content="页面的标题" />
<meta name="description" content="页面的描述" />
<meta name="keywords" content="页面的关键词" />
<meta http-equiv="refresh" content="3;url=messiahhh.github.io/blog/" /> <!-- 自动跳转 -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"> <!-- 适配移动端viewport -->
```

上面提到的`title`、`description`、`keywords`组合起来就是搜索引擎SEO优化中经常提到的TDK。







### 资源预加载

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

### script标签中async和defer的区别

解析HTML的时候需要注意JavaScript**脚本的执行会阻塞HTML的解析**，因此当解析HTML解析到一行外链脚本的时候，我们需要等待**脚本的加载**、再等待**脚本的执行**，才能继续后续HTML的解析。



如果我们不希望**脚本的加载**阻塞HTML的解析，我们可以给`script`标签加上`async`或者`defer`，此时该外链脚本的加载将不会阻塞后续HTML的解析（也就是解析后续HTML的同时并行加载该脚本，当该脚本被成功加载后则会停止后续HTML的解析并开始执行该脚本）

- `async`：外链脚本加载完成后会立刻停止HTML的解析并开始执行该脚本
- `defer`：外链脚本会在整个HTML都被解析完成后（或者说`DOMContentLoaded`事件触发）才执行

![defer and async](https://image-static.segmentfault.com/215/179/2151798436-59da4801c6772_articlex)





### DOMContentLoaded和Load

- `DOMContentLoaded`：HTML被完全加载和解析后触发，通常此时样式、图片等资源没有完全加载好
- `Load`：当所有的资源都加载完成，即包括HTML、样式、图片、脚本等资源。

在浏览器`network`一栏中可以看到这两个事件完成所经过的时间。



### img标签alt和title的区别

- `alt`是图片加载失败时兜底显示的内容，是必要属性
- `title`是鼠标hover到图片上时显示的内容，非必要属性



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
