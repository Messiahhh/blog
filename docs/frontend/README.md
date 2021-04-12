---
sidebarDepth: 4
---
## HTML
##### 渲染流程

浏览器收到响应后将其内容解码成HTML，下一步要做的就是把HTML解析成DOM。

我们知道在JavaScript中可以操作DOM，因此为了避免冲突**JavaScript代码的执行会阻塞后续HTML的解析**。

``` html
<script>
	// do something...
</script>
<div>
    <!-- html解析被阻塞 -->
</div>
```

因此，JavaScript代码的加载也会阻塞后续HTML的解析。

``` html
<script src="./index.js"></script>
<div>
    <!-- 先加载脚本，再执行脚本，再进行HTML的解析 -->
</div>
```

但是我们可以观察到多个外链脚本的加载是并行的，这是因为现代浏览器会对**资源进行预加载**

``` html
<!-- a.js 的加载并不会阻塞b.js的加载 -->
<script src="a.js"></script>
<script src="b.js"></script> 
<script src="c.js"></script>
<script src="d.js"></script>
<div>
    <!-- 我的解析仍然要先等所有脚本加载和执行完成 -->
</div>
```

又因为JavaScript是单线程的，在该例中如果`a.js`的加载耗时很长，即使`b.js`已经加载完成了，`b.js`也需要等待`a.js`的代码执行完成后才能执行。



###### async和defer

通过给`script`加上这两个属性，**脚本的加载就不会阻塞后续HTML的解析**了。

``` html
<script async></script>
<script defer></script>
```

而二者的不同点在于：

- `async`的脚本在加载完成时，会立刻开始脚本的执行，并停止HTML的解析
- `defer`的脚本会在整个文档都被加载完（即`DOMContentLoaded`）之后才开始执行。

![defer and async](https://image-static.segmentfault.com/215/179/2151798436-59da4801c6772_articlex)



###### DOMContentLoaded和Load

- `DOMContentLoaded`: 当HTML文档被解析完成。
- `Load`：当所有的资源都加载完成，即包括文档、图片、样式、脚本等资源。

在`chrome`的`network`一栏中，蓝色的竖线表示`DOMContentLoaded`的时间点，红色的竖线表示`Load`的时间点，`Load`耗时总是大于等于前者的。



###### preload

``` html
<link rel="preload" as="script" href="/main.js" >
<link rel="preload" as="style" href="/common.css">
```

`<link>`标签中可以使用`preload`来实现资源的预加载，但此时加载的资源并不会应用到页面中，比如预加载的`css`并不会被解析。



###### link和@import的区别

1. link是XHTML提供的标签，不仅可以加载CSS。@import是CSS提供的语法规则，只能加载CSS
2. 加载页面时，`link`标签引入的 CSS 被同时加载；`@import`引入的 CSS 将在页面加载完毕后被加载。

###### doctype

Doctype声明位于文档中的最前面，处于html标签之前。告知浏览器的解析器，用什么文档类型规范来解析这个文档

##### 重定向

`meta`标签的`http-equiv="refresh"`属性用来告诉浏览器进行页面的跳转，`content`属性告知在多少秒后进行跳转，以及跳转的地址。此处为2s后重定向。

``` html
<meta http-equiv="refresh" content='2;https://messiahhh.github.io/blog'>
```

或者

``` javascript
// js
location.href = 'https://messiahhh.github.io/blog'
```

或者响应状态码为301/302的重定向

``` js
res.statusCode = 301 // or 302
res.setHeader('Location', 'https://messiahhh.github.io/blog')
```

##### HTML5

> 介绍一些HTML5的用法

###### 元素拖拽

``` html
<div class="contain"></div>
<div class="el" draggable="true"></div> <!-- 使元素能够被拖拽 -->
<script>
    const contain = document.querySelector('.contain')
	const el = document.querySelector('div')
    el.addEventListener('dragstart', (e) => { // 当元素被拖拽时触发
        console.log(e.target); // 被拖拽元素
        e.dataTransfer.setData('message', 'hello')
    })
    
    
    contain.addEventListener('dragover', (e) => {
        e.preventDefault()
    })

    contain.addEventListener('drop', (e) => {
        e.preventDefault()
        console.log(e.dataTransfer.getData('message'));
    })
</script>
<!-- 事件触发了两次，两次的e.target不同，使用e.dataTransfer来传输数据 -->
```

###### 地理位置

``` js
navigator.geolocation.getCurrentPosition((position) => {
    const {
        latitude, // 纬度 
        longitude // 经度
    } = position.coords
});
```





##### 解析markdown

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





