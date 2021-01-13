---
sidebarDepth: 4
---
## HTML
JavaScript脚本的**执行**会阻塞HTML的解析

``` html
<script>
	// do something...
</script>
<div>
    <!-- html解析被阻塞 -->
</div>
```

因此，外链脚本的**加载**也会阻塞HTML的解析

``` html
<script src="./index.js"></script>
<div>
    <!-- 先加载脚本，再执行脚本，才进行html的解析 -->
</div>
```

不过，多个外链script的**加载是并行的**。

``` html
<script src="1.js"></script>
<script src="2.js"></script>
<script src="3.js"></script>
<script src="3.js"></script>
```

按理来说，因为加载会阻塞接下来HTML的解析，所以加载第一个脚本的时候还未解析到下一句HTML代码，因此加载按理来说是串行的。

但实际上现代浏览器会对资源进行**预解析**，提前把html中要引用到的资源放进请求队列中。

### async和defer的区别

``` html
<script async></script>
<script defer></script>
```

**共同点**

加上`async`或`defer`属性的脚本的**加载过程 **都不会阻塞HTML的解析。

**不同点**

- async属性。脚本加载完后会立刻开始脚本的执行，并停止对HTML的解析，待脚本执行完再继续HTML的解析。
- defer属性。等整个HTML文档都解析完（DOMContentLoaded事件发生），脚本才开始执行。
- 具体过程可见下图

![defer and async](https://image-static.segmentfault.com/215/179/2151798436-59da4801c6772_articlex)







### DOMContentLoaded和Load的区别

##### DOMContentLoaded

当初始的 **HTML** 文档被完全加载和解析完成之后，**`DOMContentLoaded`** 事件被触发，而无需等待样式表、图像和子框架的完成加载。



##### Load

当一个资源及其依赖资源已完成加载时，将触发load事件。



当 HTML 文档解析完成就会触发 DOMContentLoaded，而所有资源加载完成之后，load 事件才会被触发。

在chrome的network一栏中，蓝色的竖线指示着`DOMContentLoaded`的时间点，红色的竖线指示着`Load`的时间点。




### href和src的区别

**href**

用于在当前文档和指定资源间确定联系

``` html
<a href="http://www.baidu.com"></a>
<link type="text/css" rel="stylesheet" href="common.css">
```

**src**

下载资源并替换当前内容

``` html
<img src="img/girl.jpg">
<iframe src="top.html">
<script src="show.js">
```

### link和@import的区别

1. link是XHTML提供的标签，不仅可以加载CSS。@import是CSS提供的语法规则，只能加载CSS
2. 加载页面时，`link`标签引入的 CSS 被同时加载；`@import`引入的 CSS 将在页面加载完毕后被加载。

### doctype

Doctype声明位于文档中的最前面，处于html标签之前。告知浏览器的解析器，用什么文档类型规范来解析这个文档

### 重定向

mata标签的`http-equiv="refresh"`属性用来告诉浏览器进行页面的跳转，`content`属性告知在多少秒后进行跳转，以及跳转的地址。此处为2s后重定向。

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

### HTML5

> 介绍一些HTML5的用法

##### 元素拖拽

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

##### 地理位置

``` js
navigator.geolocation.getCurrentPosition((position) => {
    const {
        latitude, // 纬度 
        longitude // 经度
    } = position.coords
});
```











