# BOM
## window

### `window.scroll()`

### `window.scrollTo()`

### `window.scrollBy`

`window.scroll()`和`window.scrollTo()`作用完全一致，都是滚动到一个绝对地点，而`window.scrollBy()`则是滚动到一个相对现在位置的地点。



`window`和`document`的关系可以粗略理解成容器与内部元素的关系，并且`window`默认就是可滚动的（理解为`overflow: scroll`），因此当`document`的高度大于`window`的高度，会出现滚动条允许我们进行滚动操作。

类似的道理，`document`内部的元素也可以形成这样的容器-内部元素的关系（只是需要我们手动给容器加上`overflow: scroll`），虽然作为容器的`window`和`el-container`都具备`scrollTo`、`scroll`、`scrollBy`等方法，但`window`的`scrollX`和`scrollY`在元素上却对应着`scrollLeft`和`scrollTop`

``` html
<head>
	<style>
        .el-container {
            width: 1000px;
            height: 1000px;
            overflow: scroll
        }

				.el-child {
          height: 2000px;
        }
  </style>
</head>
<body>
    <div class="el-container">
        <div class="el-child">element</div>
    </div>
</body>
```





### `window.scrollX ｜ window.scrollY`

获取`window`内部文档水平/垂直滚动的距离。效果等价于元素的`scrollLeft`和`scrollTop`，但`window.scrollY`是只读属性，而`element.scrollTop`是可读可写属性。

``` js
window.scrollY = 200 // 不生效
el.scrollTop = 200 // 生效，等价于el.scrollTo(el.scrollLeft, 200)
```





### `window.getComputedStyle`

获取元素计算后的有效样式

``` js
window.getComputedstyle(el).left === '0px'
```



### `encodeURI()`

编码解码

``` js
encodeURI('你好') // "%E4%BD%A0%E5%A5%BD"
decodeURI('%E4%BD%A0%E5%A5%BD') // 你好
```



### `encodeURIComponent()`

``` js
encodeURI('https://www.bilibili.com/') // "https://www.bilibili.com/"
encodeURIComponent('https://www.bilibili.com/') // "https%3A%2F%2Fwww.bilibili.com%2F"
```



### URLSearchParams

用于处理查询字符串

``` js
new URLSearchParams('?name=aaa&age=20').get('age')
```




## navigator

### `navigator.sendBeacon()`

TL;DR：异步发送一个HTTP POST请求（即使页面卸载了也不会取消该请求），和`fetch`带上`keepalive`标志后的作用一样（但后者浏览器兼容性不好，特别是`firefox`浏览器目前不支持）



假设我们需要统计页面的访问时间，那么我们就需要在页面关闭时（`beforeunload`或`unload`事件）发生一个请求进行上报，然而如果我们像往常一样发一个普通的异步请求，那么就会注意到在我们刷新或关闭该页面的时候请求实际上并不会成功发出去。以前为了解决这个问题可能会使用同步的请求来实现，但这必然会影响体验，而`navigator.sendBeacon`可以完美的解决我们的痛点

``` js
let start = Date.now()
let unload = false;
window.addEventListener('load', () => {
  start = Date.now()
});
window.addEventListener('beforeunload', () => {
  unload = true; // 一个坑在于刷新页面会同时触发unload和visibilitychange事件
  logger()
});
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    start = Date.now()
  } else {
    if (!unload) {
      logger()
    }
  }
});

// 这个例子中借助blob让我们能够发一个json格式的请求
function logger() {
    const blob = new Blob([JSON.stringify({ name: 'akara' })], {
      type: 'application/json; charset=UTF-8',
    });
    navigator.sendBeacon(`/i/am/url`, blob);  
}

```







### `navigator.clipboard.writeText()`

浏览器原生的复制接口

``` js
navigator.clipboard.writeText('文本').then(
    () => {
      message.success('复制'成功);
    },
    () => {
      message.error('复制失败');
    }
);
```



### `navigator.geolocation`

可用来获取当前地理位置信息

```js
navigator.geolocation.getCurrentPosition((position) => {
    const {
        latitude, // 纬度 
        longitude // 经度
    } = position.coords
});
```



## history

### `history.scrollRestoration`

`history`保存着我们的历史记录，同时也记录着每个历史记录对应的滚动距离。



当我们从A页面进入B页面，再从B页面回退回A页面时，通常希望此时A页面的滚动距离和之前保持一致，而不是回到了顶端。

`history.scrollRestoration`默认值为`auto`，即浏览器默认支持**滚动恢复**的功能；我们可以修改成`manual`，即不会恢复到原本的位置，而是处于页面的顶端。




## 事件模型

### 事件传播

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

### 阻止事件传播

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

### 事件代理/事件委托

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





### mousedown | mousemove | mouseup | mouseleave

- `mousedown`：按下鼠标
- `mousemove`：按下鼠标时移动
- `mouseup`：松开鼠标
- `mouseleave`：鼠标离开当前节点
- `mouseenter`：鼠标进入当前节点

``` html
<div class="el"></div>
<script>
    let accX = 0;
    let accY = 0;
    const el = document.querySelector('.el');
    el.addEventListener('mousedown', handleMouseDown) 
    function handleMouseDown(evt) {
        function deactivate() {
            for (const [event, listen] of Object.entries(listeners)) {
                document.removeEventListener(event, listen)
            }
        }
        const listeners = {
            mousemove(evt) {
                accX += evt.movementX // event包括鼠标每次移动的偏移量movement
                accY += evt.movementY
                el.style.transform = `translate(${accX}px, ${accY}px)`
            },
            mouseup: deactivate,
            mouseleave: deactivate,
        }
        for (const [event, listen] of Object.entries(listeners)) {
            document.addEventListener(event, listen)
        }
      
    }
</script>
```



### dragstart | dragover | dragend | dragleave

``` html
<div class="contain"></div>
<div class="el" draggable="true"></div> <!-- draggable="true" 使元素能够被拖拽 -->
<script>
    const contain = document.querySelector('.contain')
		const el = document.querySelector('div')
    
    el.addEventListener('dragstart', (e) => { // 当元素被拖拽时触发
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
```
