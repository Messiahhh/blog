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





## mousedown | mousemove | mouseup | mouseleave

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



## dragstart | dragover | dragend | dragleave

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













