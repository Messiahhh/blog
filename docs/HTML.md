---
sidebarDepth: 4
---
# HTML
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

### async and defer

解析HTML的时候需要注意JavaScript**脚本的执行会阻塞HTML的解析**，因此当解析HTML解析到一行外链脚本的时候，我们需要等待**脚本的加载**、再等待**脚本的执行**，才能继续后续HTML的解析。



如果我们不希望**脚本的加载**阻塞HTML的解析，我们可以给`script`标签加上`async`或者`defer`，此时该外链脚本的加载将不会阻塞后续HTML的解析（也就是解析后续HTML的同时并行加载该脚本，当该脚本被成功加载后则会停止后续HTML的解析并开始执行该脚本）

- `async`：外链脚本加载完成后会立刻停止HTML的解析并开始执行该脚本
- `defer`：外链脚本会在整个HTML都被解析完成后（或者说`DOMContentLoaded`事件触发）才执行

![defer and async](https://image-static.segmentfault.com/215/179/2151798436-59da4801c6772_articlex)





### DOMContentLoaded和Load

- `DOMContentLoaded`：HTML被完全加载和解析后触发，通常此时样式、图片等资源没有完全加载好
- `Load`：当所有的资源都加载完成，即包括HTML、样式、图片、脚本等资源。

在浏览器`network`一栏中可以看到这两个事件完成所经过的时间。







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

