---
sidebarDepth: 2
---
# 前端博客

[toc]

> 你的:star:就是对我的支持和鼓励，非常感激！
>
> 右上角跳转本项目的仓库



## HTML5

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



## CSS3

### CSS基础

##### 选择器

1. 标签选择器
2. ID选择器
3. class选择器
4. *选择器
5. 子代选择器（如div > p，父子关系）
6. 后代选择器 （如div p， 可以是爷爷和孙子的关系）
7. 相邻兄弟选择器（如div + p， 选择紧邻着div后面的p）
8. 属性选择器(如`[type=input]`)
9. 伪类选择器(`:hover`等)



`:first-child`和`:first-of-type` 不要混淆了

`p:first-child`: 只有当一个p元素是其父元素的第一个子元素时，才应用对应的样式。

``` html
<style>
	p:first-child {
    	color: pink;
    }
</style>
<div>
    <p>111</p> <!-- 匹配 -->
    <span>111</span>
</div>
<div>
    <span>111</span>
    <p>111</p> <!-- 不匹配 -->
</div>
```

`p:first-of-type`: 选择父元素的第一个p元素，应用对应的样式

``` html
<style>
	p:first-of-type {
    	color: pink;
    }
</style>
<div>
    <span>111</span>
    <p>111</p> <!-- 匹配 -->
    <span>111</span>
</div>
```



##### 继承属性

常见的继承属性：

1. `font`系列，如`font-weight`， `font-style`， `color`等
2. `visibility`
3. `line-height`



注意：background 和 opacity不是继承属性噢。



##### 属性的权重

!important > 内联样式 > ID选择器 > class选择器 > 标签选择器 > 通配符（*） > 浏览器默认样式 > 继承样式

##### 盒模型

现代浏览器默认的`box-sizing: content-box`

意味着当我们设置`width`的时候，实际上在设置盒模型的`content`的长度。此时盒子的实际长度等于`content(width) + padding + border `



我们可以通过设置`box-sizing: border-box`

此时我们的`width`等于`content + padding + border`



##### border-radius

圆角，可用于画圆形

``` css
.app {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
```



##### transition

``` css
.app {
    transition-property: width;
    transition-duration: 3s;
    transition-timing-function: ease-in;
    transition-delay: 1s;
}
```



##### animation

``` css
@keyframes anime {
    from {
        background: pink;
    }

    to {
        background: yellow;
    }
}

.app {
    <!-- 动画名 -->
    animation-name: anime;
    <!-- 动画持续时间 -->
    animation-duration: 3s;
    <!-- 动画曲线--> 
    animation-timing-function: ease-in-out;
    <!-- 延迟 --> 
    animation-delay: 1s;
    <!-- 动画播放次数--> 
    animation-iteration-count: 2;
    <!-- 动画是否在下一周期逆向地播放--> 
    animation-direction: alternate;
    <!-- 动画是在运行还是暂停--> 
    animation-play-state: paused;
    <!-- 动画的结束状态--> 
    animation-fill-mode: forwards;
}

```



##### 画三角形

``` css
.container::after {
    content: '';
    position: absolute;
    border: 10px solid transparent;
    border-bottom-color: pink;
}
```

### 布局

**块级元素（block）**：div, h1~h6, p 等

独占一行；可以设置宽和高

**行内元素（inline）**：a, span, img, input 等

不独占一行；不能设置宽和高

**inline-block** ：selection

不独占一行；可以设置宽和高。



inline和inline-block可以设置padding和margin，但无法通过像block一样使用`margin: 0 auto`做到水平居中。

##### 水平垂直居中

一：absolute + margin-top

``` css
.outer {
    position: relative
}

.inner {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -100px;
}
```

二：absolute + calc

``` css
.outer {
    position: relative
}

.inner {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 100px);
    left: calc(50% - 100px);
}
```

以上两种方法通常用于绝对定位元素的宽高为固定值时，若宽高不确定，则不可使用。

三：absolute + transform

``` css
.outer {
    position: relative
}

.inner {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

四：flex + margin: auto

``` css
.outer {
    display: flex;
}
.inner {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: auto;
}
```

五：flex

``` css
.outer {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

##### 两栏布局

一：`float + margin-left` 或者 `float + overflow: auto`

``` html
<style>
	.aside {
        width: 30vw;
        height: 100vh;
        float: left;
        background: blue;
    }

    .main {
        margin-left: 30vw;
        // 或者换成 overflow: auto，使其成为BFC
    }
</style>
<body>
    <div class="aside">

    </div>
    <div class="main">
        <div class="content">

        </div>
    </div>
</body>
```

二：flex

``` html
<style>
    body {
        display: flex;
    }

    .aside {
        flex: 0 0 25vw;
        <!-- or width: 25vw; -->
    }

    .main {
        flex: 1; // 等于flex-grow: 1;
    }
</style>
<body>
    <div class="aside">

    </div>
    <div class="main">

    </div>
</body>
```

##### 三栏布局

一：圣杯布局

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>实现三栏水平布局之圣杯布局</title>
    <style type="text/css">
      /*基本样式*/
      .left, .right, .main {
        min-height: 300px;
      }
      .left {
        width: 200px;
        background-color:thistle;
      }
      .main {
        background-color: #999;
      }
      .right {
        width: 300px;
        background-color: violet;
      }
      /* 圣杯布局关键代码 */
      .left, .main, .right {
        float: left;
        position: relative;
      }
      .main {
        width: 100%;
      }
      .container {
        padding-left: 200px;
        padding-right: 300px;
      }
      .left {
        margin-left: -100%;
        left: -200px;
      }
      .right {
        margin-left: -300px;
        right: -300px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="main">main</div>
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
  </body>
</html>

```

二：双飞翼布局

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>双飞翼布局</title>
    <style>
      .left,
      .right,
      .main {
        min-height: 200px;
      }
      .left {
        width: 200px;
        background-color: thistle;
      }
      .main {
        background: #999;
      }
      .right {
        width: 300px;
        background-color: violet;
      }
      /* 双飞翼布局重点 */
      .left,
      .main,
      .right {
        float: left;
      }
      .main {
        width: 100%;
      }
      .main-inner {
        margin-left: 200px;
        margin-right: 300px;
      }
      .left {
        margin-left: -100%;
      }
      .right {
        margin-left: -300px;
      }
    </style>
  </head>
  <body>
    <div class="main"><div class="main-inner">中心区</div></div>
    <div class="left">left</div>
    <div class="right">right</div>
  </body>
</html>

```

三：flex布局

``` html
<style>
	.left {
        width: 30vw;
    }

    .main {
        flex: 1;
    }

    .right {
        width: 20vw;
    }
</style>
<body>
    <div class="left">

    </div>
    <div class="main">

    </div>
    <div class="right">

    </div>
</body>
```

##### 移动端布局

``` html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

**em和rem**

2em等于两倍**父元素**的字体大小

2rem等于两倍**根元素**的字体大小。移动端的时候根据媒体查询动态改变根元素的字体大小即可。



1vw 等于 1 / 100 视口（viewport）宽

1vh 等于 1 / 100 视口高

### Flex



##### 容器属性

``` css
.flex-container {
    display: flex;
    flex-direction: row;
    /* 主轴的方向，默认row，从左往右 */
    flex-wrap: nowrap;
    /* 是否换行，默认不换行*/
    justify-content: center;
    /* 主轴上的布局，默认flex-start */
    align-items: center;
    /* 交叉轴上的布局，默认值flex-start */
    align-content: center;
    /* 多条轴线的布局 */
}
```

##### 项目属性

``` css
.flex-items {
    order: 2;
    /* 项目的order， 越大的越后面*/
    flex-grow: 1;
    /* 扩张比例，默认0，不占剩余空间 */
    flex-shrink: 0;
    /* 缩小比例，默认1，自动缩小*/
    flex-basis: 200px;
    /* 主轴上的宽度 */
    flex: 1 0 200px;
    /* 上面三条的缩写 */
    align-self: flex-end;
    /* 修改项目的交叉轴布局*/
}
```

##### Flex 搭配 margin

给Flex容器内的项目设置margin为auto，则margin会自动占据剩下的所有未分配空间。

``` html
<!-- 实现一个导航栏 -->
<ul class="g-nav">
    <li>导航A</li>
    <li>导航B</li>
    <li>导航C</li>
    <li>导航D</li>
    <li class="g-login">登陆</li>
    <li>注册</li>
</ul>
<style>
    .g-nav {
        display: flex;
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .g-nav li {
        padding: 0 20px;
    }

    .g-login {
        margin-left: auto;
    }
</style>
```





### BFC

BFC，也就是Block Formatting Contexts （块级格式化上下文)

明确地，它是一个独立的盒子，并且这个独立的盒子内部布局不受外界影响。

**何时会触发BFC**：

- 根元素`<html>`
- `float`的值不为`none`。
- `position`的值不为`relative`和`static`。
- `overflow`的值为`auto`,`scroll`或`hidden`。
- `display`的值为`table-cell`, `table-caption`, `inline-block`中的任何一个。

**作用**

一：清除浮动（阻止高度塌陷）

``` html
<style>
    .outer {
        <!-- 使用overflow: auto;使outer元素成为BFC（触发outer元素的BFC）-->
        overflow: auto;
    }
    .inner {
        width: 200px;
        height: 200px;
        float: left;
    }
</style>
<body>
    <div class='outer'>
        <div class='inner'>
            
        </div>
    </div>
</body>
```

二：外边距合并：同属一个BFC的相邻元素会发生外边距（margin）重叠。

```html
<style>
    .upper {
        margin: 20px;
    }
    .lower {
        margin: 20px;
    }
    .bfc {
        overflow: auto;
    }
</style>
<div class="upper"></div>
<div class="bfc">
    <div class="lower">

    </div>
</div>
```

三：阻止元素被浮动元素覆盖，可用来实现**两列布局**

``` html
<style>
    .float {
        float: left;
    }

    .content {
        overflow: auto;
    }
</style>
<div class="float"></div>
<div class="content"></div>
```

### 清除浮动

一：上述的BFC清除浮动

二：添加额外标签，应用clear: both

``` html
<style>
    .float {
        float: left;
    }
    .clear {
        clear: both;
    }
</style>
<div>
    <div class="float">

    </div>
    <div class="clear">

    </div>
</div>
```

三：使用伪元素，应用clear: both

``` html
<style>
    .float {
        float: left;
    }
    .clearfix:after {
        content: "";
        display: block;
        clear: both;
    }
</style>
<div class="clearfix">
    <div class="float">

    </div>
</div>
```

### 常见问题

#### inline-block的间隙问题

两个display：inline-block元素放到一起会产生一段空白。

原因：此时两个元素间的回车/换行会被转换为空白符

``` html
<body>
    <div class="a">
        1
    </div>
    <div class="a">
        2
    </div>
</body>
```

解决方案:

1. 将子元素标签的结束符和下一个标签的开始符写在同一行或把所有子标签写在同一行

   ``` html
   <body>
       <div class="a">
           1
       </div><div class="a">
           2
       </div>
   </body>
   ```

2. 父元素设置font-size: 0; 子元素重新设置正确的font-size

#### display: none，visibility: hidden, opacity: 0 的区别

三个样式的作用都是使目标元素不可见，不过三个元素之间也是有区别的

- 结构上

  `display: none` 会让目标元素不会被渲染进渲染树， 因此**不占空间，而且不能点击。**

  `visibility: hidden`目标元素会被渲染进渲染树，因此**占空间，但是不能点击。**

  `opacity: 0`目标元素会被渲染进渲染树，因此**占空间，而且能点击。**

- 继承上

  `display: none` 作用于父元素后，子元素也不会被渲染（即使给子元素加了`display: block`）

  `visibility: hidden`作用于父元素后，子元素继承这个属性，也不可见；不过可以给子元素设置`visibility: visible`使其可见。

  `opacity: 0`作用于父元素后，虽然子元素不会继承这个属性，但是子元素的透明度也会被影响，所以也不可见；而且不能通过给子元素设置`opacity: 1`使其变成不透明。

- 性能上

  `display: none`会造成回流/重绘，性能影响大

  `visibility: hidden`会造成元素内部的重绘，性能影响相对小

  `opacity: 0` 由于`opacity`属性启用了GPU加速，性能最好



`opacity`属性的补充

`opacity`是不继承属性，父元素设置opacity，子元素并不会继承。但是因为该属性的特殊性（类似`background`），父元素有了透明度，子元素的样式也会被影响。如果父元素设置`opacity: 0.5`，子元素设置`opacity: 0.5`，那么实际上子元素的透明度是0.5 * 0.5 = 0.25。



如果希望子元素不被父元素的透明度影响，我们可以使用`background: rgba`代替`opacity: 0`

#### 文本溢出

##### 单行文本

``` css
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

##### 多行文本





## ECMAScript

##### typeof

``` js
typeof undefined === 'undefined'
typeof null === 'object'
typeof 123 === 'number'
typeof '123' === 'string'
typeof true === 'boolean'
typeof Symbol() === 'symbol'
typeof 123n === 'bigint' 
// 一共七种基本类型，最后一种bigint为新增基本类型
typeof {} === 'object'
typeof function() {} === 'function'
```

##### 基本包装类型

当我们使用`'1'.toString()`的时候，实际上发生了以下过程。

``` js
var s = new String('1');
s.toString();
s = null;
```

##### 判断相等

1. `==` 会进行类型转换
2. `===` 不会进行类型转换，但是`NaN`不等于自身，以及`+0`等于`-0 `
3. `Object.is()` 完全相等



### 数组



##### 判断数组

``` javascript
var arr = []

arr instanceof Array

Array.prototype.isPrototypeOf(arr)

arr.constructor === Array

Object.prototype.toString.call(arr) === "[object Array]"

Array.isArray(arr)
```



##### 转化为数组

``` javascript
var set = new Set([1, 2])

// 类数组对象以及部署了遍历器接口的对象
Array.from(set)

[...set]

// 只能转化类数组对象 (arguments和Nodelist)
Array.prototype.slice.call(arguments)
```



##### 数组去重

``` javascript
var arr = [1, 2, 2, 4, 9, 6, 7, 5, 2, 3, 5, 6, 5]


// Set
Array.from(new Set(arr))


//缺点： indexOf或者includes都是遍历数组，时间复杂度高
function unique(arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (!newArr.includes(item)) {
            newArr.push(item)
        }
    }
    return newArr
}

// 把数组的值放在对象的键值里， 对于 数组中的 1 和 “1” ， 要再一次对比
// 空间复杂度高， 所谓的空间换时间
function unique(arr) {
    let newArr = []
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        let type = typeof item
        if (!obj[item]) {
            newArr.push(item)
            obj[item] = [type]
        } else if (!obj[item].includes(type)){
            newArr.push(item)
            obj[item].push(type)
        }
    }
    return newArr
}

// 排序法，先用sort排序再比较
// 相比前两种，时间和空间用的都没那么多
// 缺点：排序了
function unique(arr) {
    arr.sort()
    let newArr = [arr[0]]
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (newArr[newArr.length - 1] !== item) {
            newArr.push(item)
        }
    }
    return newArr
}
```



##### 数组扁平化

**flat(Infinity)**

``` javascript
var arr = [1, 2, [3, [4, 5]]]

arr.flat(Infinity)
```

**JSON.stringify + 正则 + JSON.parse**

``` javascript
var arr = [1, 2, [3, [4, 5]]]

function flat(arr) {
    let str = JSON.stringify(arr).replace(/[\[|\]]/g, '')
    str = `[${str}]`
    return JSON.parse(str)
}
```

**递归**

``` javascript
function flatter(arr) {
	let newArr = []
	arr.forEach(item => {
		if (Array.isArray(item)) {
			// newArr.push(...flatter(item))
			newArr = newArr.concat(flatter(item))
		}
		else {
			newArr.push(item)
		}
	})
	return newArr
}
```

**Reduce + 递归**

``` js
var arr = [1, 2, [3, [4, 5]]]
function flatter(arr) {
	return arr.reduce((prev, next) => {
		return prev.concat(Array.isArray(next) ? flatter(next) : next)
	}, [])
}
```

**[].concat(...arr)**

``` js
var arr = [1, [2, [3, 4]]];
console.log([].concat(...arr)); // [1, 2, [3, 4]]
// 该操作可以拍平一层

var arr = [1, [2, [3, 4]]];

function flatten(arr) {

    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }

    return arr;
}

console.log(flatten(arr))
```



##### reduce 实现 map

```javascript
Array.prototype.map = function (fn) {
    let result = []
    this.reduce((total, current, index) => {
        result.push(fn(current))
    }, [])
    return result
}
```

##### 数组乱序

``` javascript
let arr = [1, 2, 3, 4, 5]
arr.sort(() => {
    return Math.random() - 0.5
})

// 加强版
// 遍历数组，每一项和该项之前的随机项交换位置
function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let j = ~~(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}
```



##### 常用方法

``` js
var arr = [2, 7, 0, 6, 1, 4, 8, 3]
arr.sort((a, b) => a - b) // 递增
arr.sort((a, b) => b - a) // 递减
```





### 对象



##### new操作符

1. 首先创建一个空的对象，空对象的`__proto__`属性指向构造函数的原型对象

   ``` js
   const obj = {
       __proto__: fn.prototype
   }
   ```

2. 把上面创建的空对象赋值构造函数内部的this，用构造函数内部的方法修改空对象

3. 如果构造函数返回一个非基本类型的值a，则返回这个值a，否则返回上面创建的对象obj

``` js
function A() {
    return [123]
}
new A() // [123]
```



###### 实现一个new

``` javascript
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}
```



##### instanceof

``` js
({}) instanceof Object; // true
[] instanceof Array; // true
[] instanceof Object; // true
```



###### 实现一个instanceof

``` javascript
function myInstanceof(a, b) {
    if (typeof a !== 'object' || a === null) return false
    let proto = Object.getPrototypeOf(a)
    while(true) {
        if (proto === null) return false
        if (proto === b.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}
```

##### 实现私有变量

最简单的方式是提前约定好私有变量

``` js
class Person {
    constructor(age) {
        this._age = age
    }
}
let p = new Person()
// 还是可以获取p._age
```

比较好的方法是结合闭包 + Symbol。

如题目：创建一个 Person 类，其包含公有属性 name 和私有属性 age 以及公有方法 setAge ；创建一个 Teacher 类，使其继承 Person ，并包含私有属性 studentCount 和私有方法 setStudentCount 。

``` js
// 这里写在一个立即执行函数里，分开写也是可以的
const [Person, Teacher] = (function () {
    const _age = Symbol('age')
    const _studentCount = Symbol('studentCount')
    const _setStudentCount = Symbol('setStudentCount')
    class Person {
        constructor(name, age) {
            this.name = name
            this[_age] = age
        }

        setAge(age) {
            this[_age] = age
        }
    }
    
    class Teacher extends Person {
        constructor(name, age, count) {
            super(name, age)
            this[_studentCount] = count
        }
        [_setStudentCount](count) {
            this[_studentCount] = count
        }
        set(count) {
            this[_setStudentCount](count)
        }
    }
    return [Person, Teacher]
})()
```





##### 浅拷贝

``` javascript
// Object.assign
let source = {
    name: 'akara',
    age: 20,
}
let target = Object.assign({}, source)

// 扩展运算符
let source = {
    name: 'akara',
    age: 20,
}
let target = {...source}

// slice
let source = [1, 2, 3]
let target = source.slice()

// concat
let source = [1, 2, 3]
let target = source.concat()
```

##### 深拷贝

```javascript
// 一:只能用于对象内部没有方法时
JSON.parse(JSON.stringify(obj))

// 二: 递归，简陋版本
// 属性值可以是数组或对象，此时进行递归
// 属性值也可以函数
function deepClone(source) {
    let target = null
    if (typeof source === 'object' && source !== null) {
        target = Array.isArray(source) ? [] : {}
        for (let [key, value] of Object.entries(source)) {
            target[key] = deepClone(value)
        }
    } else {
        target = source
    }
    return target
}

// 但无法解决循环引用的问题
// 例如
let obj = {}
obj.a = obj
deepClone(obj)
// 会一直递归执行deepClone，造成函数栈溢出


// 复杂版本
// 使用WeakMap解决循环引用的问题
// 使用WeakMap而不是Map是因为其使用的弱引用。该引用不会被垃圾回收器记录。
function deepClone(source, hash = new WeakMap()) {
	let target
	if (hash.has(source)) {
		return hash.get(source)
	}
	if (typeof source === 'object') {
		target = Array.isArray(source) ? [] : {}
		hash.set(source, target)
		for (let [key, value] of Object.entries(source)) {
			target[key] = deepClone(value, hash)
		}	
	}
	else {
		target = source
	}

	return target
}
var obj = {}
obj.a = obj
deepClone(obj)

```

不过以上的深克隆只克隆了对象自身的属性，丢失了原型链上的属性，为了不丢失，可以这么做

``` js
function completeDeepClone(source) {
    function deepClone(source, hash = new WeakMap()) {
        // ... 上面的代码
    }
    let ret = deepClone(source)
    Object.setPrototypeOf(ret, Object.getPrototypeOf(source))
    return ret
}

// 使用
function Animal(name) {
    this.name = name
}
Animal.prototype.master = 'akara'
completeDeepClone(new Animal())
```





##### 继承

``` javascript
function Animal(name, size) {
    this.name = name
    this.size = size
}

Animal.prototype.eat = function (food) {
    console.log(this.name + "正在吃" + food)
}
```

###### 构造继承

1. 可以多继承。
2. 只能继承父类的实例属性和方法，不能继承原型属性和方法

``` javascript
function Cat() {
    Animal.call(this)
}

var cat = new Cat()
```

###### 原型链继承

1. 不能多继承。
2. 所有新实例会共享父类的属性

``` javascript
// cat >= Cat.prototype >= Animal.prototype >= Object.prototype
function Cat() {

}

Cat.prototype = new Animal()
Cat.prototype.name = "cat"

var cat = new Cat()
```

###### 组合继承

可以继承实例属性和方法，也可以继承原型属性和方法
缺点: 调用两次父类构造函数

``` javascript
function Cat (name) {
    Animal.call(this)
    this.name = name
}

Cat.prototype = new Animal()
Cat.prototype.constructor = Cat

var cat = new Cat()
```

###### 寄生组合继承(除es6继承外最推荐的方法)

``` javascript
function Cat(name) {
    Animal.call(this)
}

Cat.prototype = Object.create(Animal.prototype)
Cat.prototype.constructor = Cat
```

###### es6的extends

``` javascript
class Cat extends Animal {
    constructor(name) {
        super(name)
    }
}
```



### 函数

##### 函数防抖

``` html
<input type="text" name="" value="">
<script type="text/javascript">
    let el = document.querySelector('input')
    el.addEventListener("input", debounce(A, 500))

    function debounce(fn, delay) {
        let timer = null
        return function () {
            timer && clearTimeout(timer)
            timer = setTimeout(() => {
                fn.call(this)
            }, delay)
        }
    }

    function A() {
        console.log(this.value)
    }
</script>
```

##### 函数节流

```javascript
function throttle (fn, time = 1000) {
    let canRun = true;
    return function () {
        if (!canRun) return false;
        canRun = false;
        setTimeout(() => {
            fn.call(this)
            canRun = true
        }, time)
    }
}

setInterval(throttle(function() {
    console.log("hello world")
}), 100)
```

##### 实现bind函数

```javascript
Function.prototype.bind = function (context, ...args) {
    return (...newArgs) => {
        this.call(context, ...args, ...newArgs)
    }
}
```

##### 实现call/apply函数

``` javascript
Function.prototype.call = function (context, ...args) {
    // context为null时，context设置为window
    context = context || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}

// apply 只需要把参数修改即可
Function.prototype.apply = function (context, args) {
    context = context || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}
```

##### 递归

递归是很常见的，有的时候递归的写法会有微妙的差别。拿多维数组的扁平化举例。

``` js
// 外部函数获取内部函数的返回值
function flatter(arr) {
	let newArr = []
	arr.forEach(item => {
		if (Array.isArray(item)) {
			// newArr.push(...flatter(item))
			newArr = newArr.concat(flatter(item))
		}
		else {
			newArr.push(item)
		}
	})
	return newArr
}

// 将值当作递归函数的参数
function flatter(arr, newArr = []) {
	arr.forEach(item => {
		if (Array.isArray(item)) {
			flatter(item, newArr)
		} else {
			newArr.push(item)
		}
	})
	return newArr
}
```

### 正则表达式

##### 常用字符

| 字符   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| .      | 匹配除换行符 \n 之外的任何单字符                             |
| +      | 匹配前面的子表达式一次或多次。                               |
| *      | 匹配前面的子表达式零次或多次。                               |
| ?      | 匹配前面的子表达式零次或一次，或指明一个非贪婪限定符。       |
| \      | 转义符。                                                     |
| ^      | 匹配输入字符串的开始位置。                                   |
| $      | 匹配输入字符串的结尾位置。                                   |
| ( )    | 子表达式。                                                   |
| []     | 子表达式。                                                   |
| \S     | 匹配任何非空白字符。                                         |
| \s     | 匹配任何空白字符，包括空格、制表符、换页符等等。             |
| \w     | 匹配数字，字母或下划线。                                     |
| \d     | 匹配数字。                                                   |
| {n}    | 匹配n次。                                                    |
| \|     | 指明两项之间的一个选择                                       |
| \b     | 匹配一个单词边界，即字与空格间的位置。                       |
| \B     | 非单词边界匹配。                                             |
| (x)    | 像下面的例子展示的那样，它会匹配 'x' 并且记住匹配项。其中括号被称为***捕获括号***。模式 `/(foo) (bar) \1 \2/` 中的 '`(foo)`' 和 '`(bar)`' 匹配并记住字符串 "foo bar foo bar" 中前两个单词。模式中的 `\1` 和 `\2` 表示第一个和第二个被捕获括号匹配的子字符串，即 `foo` 和 `bar`，匹配了原字符串中的后两个单词。注意 `\1`、`\2`、...、`\n` 是用在正则表达式的匹配环节，详情可以参阅后文的 \n 条目。而在正则表达式的替换环节，则要使用像 `$1`、`$2`、...、`$n` 这样的语法，例如，`'bar foo'.replace(/(...) (...)/, '$2 $1')`。`$&` 表示整个用于匹配的原字符串。 |
| (?:x)  | 匹配 'x' 但是不记住匹配项。这种括号叫作***非捕获括号***，使得你能够定义与正则表达式运算符一起使用的子表达式。看看这个例子 `/(?:foo){1,2}/`。如果表达式是 `/foo{1,2}/`，`{1,2}` 将只应用于 'foo' 的最后一个字符 'o'。如果使用非捕获括号，则 `{1,2}` 会应用于整个 'foo' 单词。 |
| x(?=y) | 匹配'x'仅仅当'x'后面跟着'y'.这种叫做**先行断言**。 例如，/Jack(?=Sprat)/会匹配到'Jack'仅当它后面跟着'Sprat'。 |







当使用构造函数创造正则对象时，需要常规的字符转义规则**（在前面加反斜杠 \）**。比如，以下是等价的：

``` js
var re = new RegExp("\\w+");
var re = /\w+/;
```





##### 正则题目

###### 匹配URL参数

``` js
// 正则
function getUrlParams(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)($|&)`)
    const match = location.search.substr(1).match(reg)
    if (match) {
        return match[2]
    }
} 

// split
function getUrlParams(name) {
    const arr = location.search.substr(1).split('&')
    let obj = {}
    arr.forEach(item => {
        let tempArr = item.split('=')
        obj[tempArr[0]] = tempArr[1]
    })
    return obj[name]
}
```



###### 匹配cookie参数

``` js
function getUrlParams(name) {
    const reg = new RegExp(`(\\s|^)${name}=([^;]*)($|;)`) //    \s 前面要多一个 \
    const match = document.cookie.match(reg)
    if (match) {
        return match[2]
    }
} 
```



###### 域名判断

判断当前域名是否为qq.com，或者其子域名

``` js
function isMatch(url) {
    return /^https?:\/\/(.+\.)?qq\.com/.test(url)
}
isMatch('http://a.qq.com') // true
isMatch('https://qq.com') // true
```



###### 驼峰化

将`aaa-bbb-ccc`转换为驼峰`aaaBbbCcc`

``` js
function toCamel(str) {
    return str.replace(/-\w/g, (s) => {
        return s.slice(1).toUpperCase()
    })
}
// \w 匹配数字，字母与下划线
```



###### 数字的千分位分割

``` js
// 正则，注意使用到了?=先行断言
function format(num) {
    const reg = /\d{1,3}(?=(\d{3})+$)/g
    return num.toString().replace(reg, '$&,')
}

// 也可以用toLocaleString轻松实现
function format(num) {
	return num.toLocaleString()
}

// 或者用数字来分割
function format (num) {
    let arr = []
    while (num >= 1000) {
        let value = num % 1000
        num = num / 1000
        if (value >= 100) {
            value = '' + value
        } else if (100 > value && value >= 10 ){
            value = `0${value}`
        } else {
            value = `00${value}`
        }
        
        arr.unshift(value)
    }
    num = '' + num
    arr.unshift(num)
    return arr.join(',')
}
```





### Proxy

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

##### 代理对象

``` javascript
let handleer = {
    get: function (target, propKey, receiver) {
        console.log(target, propKey, receiver)
        console.log(target[propKey])
    },
    set: function (target, propKey, newValue, receiver) {
        target[propKey] = newValue
    }
}

let proxy = new Proxy({
    name: 'akara',
}, handler)

proxy.name
// 输出
// {name: 'akara'}   "name"   Proxy {name: 'akara'}
// 'akara'
```

##### 代理函数

``` javascript
handler = {
    get: function (target, propKey, receiver) {
        return target[propKey]
    },

    apply: function (target, myThis, args) {
        console.log(target, myThis, args)
        target.apply(myThis, args)
    },

    construct(target, args) {
        return new target(...args)
    }
}

let proxy = new Proxy(function (a, b) {
    this.name = a
    this.age = b
}, handler)

proxy('akara', 20) 
// ƒ (a, b) {
//     this.name = a
//     this.age = b
//     console.log(a, b)
// } undefined (2) ["akara", 20]

proxy.call({}, 'akara', 20) 
// ƒ (a, b) {
//     this.name = a
//     this.age = b
//     console.log(a, b)
// } {} (2) ["akara", 20]
```

- **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
- **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。
- [其他的拦截操作](https://es6.ruanyifeng.com/#docs/proxy#Proxy-%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%96%B9%E6%B3%95)



### Reflect

`Reflect`对象的设计目的有这样几个。

1. 将许多`Object`上的方法，如`Object.defineProperty`放在了`Reflect`上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

2. 修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

   ``` js
   // 老写法
   try {
     Object.defineProperty(target, property, attributes);
     // success
   } catch (e) {
     // failure
   }
   
   // 新写法
   if (Reflect.defineProperty(target, property, attributes)) {
     // success
   } else {
     // failure
   }
   ```

   

3. 让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。

   ```javascript
   // 老写法
   'assign' in Object // true
   delete obj.name
   
   // 新写法
   Reflect.has(Object, 'assign') // true
   Reflect.deleteProperty(obj, 'name')
   ```

4. `Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。

   ``` js
   // 老写法
   Proxy(target, {
       set: function(target, name, value, receiver) {
           target[name] = value
       }
   })
   
   // 新写法
   Proxy(target, {
       set: function(target, name, value, receiver) {
       	Reflect.set(target, name, value, receiver)
       }
   })
   ```

   下面是另一个例子

   ```javascript
   var loggedObj = new Proxy(obj, {
     get(target, name) {
       console.log('get', target, name);
       return Reflect.get(target, name);
     },
     deleteProperty(target, name) {
       console.log('delete' + name);
       return Reflect.deleteProperty(target, name);
     },
     has(target, name) {
       console.log('has' + name);
       return Reflect.has(target, name);
     }
   });
   ```



`Reflect`对象一共有 13 个静态方法。

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)



除去一些`Object`上已经部署的方法，如`Object.getPrototypeOf`对应的`Reflect.getPrototypeOf`。`Reflect`上还部署了一些有意思的方法。

##### Reflect.apply 

``` js
Reflect.apply(function (a, b) {
    console.log(this.name)
    console.log(a + b)
}, {name: 'akara'}, [1, 2])
```

##### Reflect.construct

``` js
function People(name) {
    this.name = name
}

Reflect.construct(People, ['akara'])
```

##### Reflect.ownKeys

`Reflect.ownKeys`方法用于返回对象的所有属性，基本等同于`Object.getOwnPropertyNames`与`Object.getOwnPropertySymbols`之和。

``` js
let obj = {
    [Symbol('name')]: 'akara',
    age: 21
}

Object.getOwnPropertyNames(obj)
// ["age"]

Object.getOwnPropertySymbols(obj)
// [Symbol(name)]

Reflect.ownKeys(obj)
// ["age", Symbol(name)]
```







### Set/Map

##### Set

它类似于数组，但是成员的值都是唯一的，没有重复的值。

```js
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

```js
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4] 实现了数组的去重
```

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

- `add(value)`：添加某个值，返回 Set 结构本身。
- `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `clear()`：清除所有成员，没有返回值。

##### Map

类似于对象，是键值对的集合，但普通的对象的键只能是字符串，Map的键可以不是。

```js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

比如这里， Map实例m的一个键是对象o，键值微'content'。

##### WeakSet / WeakMap

WeakSet 的成员只能是对象。其次，WeakSet 中的对象都是弱引用。

`WeakMap`只接受对象作为键名。其次，WeakMap 中的键名所指向的对象都是弱引用。



**弱引用**

指的是不被在引用计数中被计数的引用。



### Promise的实现



由于代码比较复杂，这里先给出一个最核心的实现，在此之上再加功能。

##### 核心代码

``` js
class Promise {
	constructor(executor) {
        // Promise的状态
		this.status = 'pending'
        // Promise状态对应的值
		this.value = undefined
		this.onResolvedCallback = []
		this.onRejectedCallback = []

        // 将Promise的状态转化从pending转化为fulfilled
		const resolve = (value) => {
			if (this.status === 'pending') {
                this.status = 'fulfilled'
                this.value = value
                this.onResolvedCallback.forEach(callback => callback())
			}
		}

        // 将Promise的状态转化从pending转化为rejected
		const reject = (reason) => {
			if (this.status === 'pending') {
				this.status = 'rejected'
				this.value = reason
				this.onRejectedCallback.forEach(callback => callback())
			}
		}
        
		try {
            // 执行传入的函数
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}

	then(onResolve, onReject) {
        // then函数需要返回一个新的Promise
		return new Promise((resolve, reject) => {
            // 和事件不同。事件先触发再监听则不会触发回调函数
            // 而Promise即使状态已经转化，也会触发回调
			if (this.status === 'fulfilled') {
                // 通过setTimeout实现异步。
                // 与真实的实现不同，setTimeout的回调会放进macro task队列。
                // 而真实的实现，then的回调会放进micro task队列。
				setTimeout(() => {
                    // onResolve的函数返回值会被新的Promise进行resolve
                    // var b = a.then(data => {
					//    return data * data
					//	})
                    // 此处若a的内部值为10，则b的内部值为100
					resolve(onResolve(this.value))
				})
			}
			else if (this.status === 'rejected') {
				setTimeout(() => {
                    // 注意这里也是resolve，不要误以为是 reject(onReject(this.value))
					resolve(onReject(this.value))
				})
			}
			else if (this.status === 'pending') {
				this.onResolvedCallback.push(() => {
					setTimeout(() => {
						resolve(onResolve(this.value))
					})
				})

				this.onRejectedCallback.push(() => {
					setTimeout(() => {
						resolve(onReject(this.value))
					})
				})
			}
		})
	}
}
```

好，核心功能实现了，再一点点加功能。

一：我们有的时候会`resolve`一个`Promise`，例如

``` js
var p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 2000)
})
var p2 = new Promise((resolve, reject) => {
    resolve(p1)
})

// 或者

var p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 2000)
})

var p2 = a.then(data => {
    return p1
})
```

我们希望p2的状态以及内部值和p1保持一致。那么我们稍微修改一下代码。

``` js
const resolve = (value) => {
    if (this.status === 'pending') {
        // 如果resolve的参数是Promise实例，则状态与其保持一致
        if (value instanceof Promise) {
            value.then((data) => {
                resolve(data)
            }, (reason) => {
                reject(reason)
            })
        } else {
            this.status = 'fulfilled'
            this.value = value
            this.onResolvedCallback.forEach(callback => callback())
        }
    }
}
```

二 异常的捕获

``` js
var p1 = new Promise((resolve, reject) => {
    reject(new Error())
})
var p2 = p1.then((data) => {
    
}, (reason) => {
    
})
```

当这里p1状态为rejected时，可能有人会误以为p2也是rejected，然而实际是fulfilled。

只有当`onFulfilled` 或 `onRejected`抛出了异常`e`, 则`p2`应当以`e`为`reason`转化成`rejected`。

所以我们需要对可能的异常进行捕获。

``` js
setTimeout(() => {
    try {
        resolve(onResolve(this.value))
    } catch (e) {
        reject(e)
    }
})
```

三

1. 如果 `onFulfilled` 不是一个函数且`promise1`已经fulfilled，则`promise2`必须以`promise1`的值fulfilled.

2. 如果 `OnReject` 不是一个函数且`promise1`已经rejected, 则`promise2`必须以相同的reason被reject.

``` js
if (typeof onReject !== 'function') {
    reject(this.value)
} else {
    resolve(onReject(this.value))
}
// ...
if (typeof onResolve !== 'function') {
    resolve(this.value)
} else {
    resolve(onResolve(this.value))	
}
```

代替原先的

``` js
resolve(onReject(this.value))
// ...
resolve(onResolve(this.value))	
```



那么我们现在的代码如下

##### 复杂版

``` js
class Promise {
	constructor(executor) {
		if (typeof executor !== 'function') {
			throw new TypeError("Promise resolver undefined is not a function")
		}
		this.status = 'pending'
		this.value = undefined
		this.onResolvedCallback = []
		this.onRejectedCallback = []

		const resolve = (value) => {
			if (this.status === 'pending') {
				if (value instanceof Promise) {
					value.then((data) => {
						resolve(data)
					}, (reason) => {
						reject(reason)
					})
				} else {
					this.status = 'fulfilled'
					this.value = value
					this.onResolvedCallback.forEach(callback => callback())
				}
			}
		}

		const reject = (reason) => {
			if (this.status === 'pending') {
				this.status = 'rejected'
				this.value = reason
				this.onRejectedCallback.forEach(callback => callback())
			}
		}
		try {
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}

	then(onResolve, onReject) {
		return new Promise((resolve, reject) => {
			if (this.status === 'fulfilled') {
				setTimeout(() => {
					if (typeof onResolve !== 'function') {
						resolve(this.value)
					} else {
						try {
							resolve(onResolve(this.value))
						} catch (error) {
							reject(error)
						}
							
					}
				})
			}
			else if (this.status === 'rejected') {
				setTimeout(() => {
					if (typeof onReject !== 'function') {
						reject(this.value)
					} else {
						try {
							resolve(onReject(this.value))
						} catch (error) {
							reject(error)
						}
						
					}
				})
			}
			else if (this.status === 'pending') {
				this.onResolvedCallback.push(() => {
					setTimeout(() => {
						if (typeof onResolve !== 'function') {
							resolve(this.value)
						} else {
							try {
								resolve(onResolve(this.value))
							} catch (error) {
								reject(error)
							}
						}
					})
				})

				this.onRejectedCallback.push(() => {
					setTimeout(() => {
						if (typeof onReject !== 'function') {
							reject(this.value)
						} else {
							try {
								resolve(onReject(this.value))
							} catch (error) {
								reject(error)
							}
						}
					})
				})
			}
		})
	}
}

```

##### 实现catch函数

``` js
catch(onReject) {
    return this.then(null, onReject)
}
```

##### 实现finally函数

``` js
finally(cb) {
	let P = this.constructor
	return this.then(
		value => P.resolve(cb()).then(() => value),
		reason => P.resolve(cb()).then(() => {throw reaon})
	)
}
```

##### 实现all函数

``` js
static all(promiseArr) {
    return new Promise((resolve, reject) => {
        let res = []
        let length = promiseArr.length
        let count = 0
        promiseArr.forEach((promise, index) => {
            promise.then(value => {
                res[index] = value
                count++
                if (count === length) {
                    resolve(res)
                }
            }, (reason) => {
                reject(reason)
            })
        })
    })
}
```

##### 实现race函数

``` js
static race(promiseArr) {
    return new Promise((resolve, reject) => {
        promiseArr.forEach((promise) => {
            promise.then(value => {
                resolve(value)
            }, reason => {
                reject(reason)
            })
        })
    })
}
```

用代码测试一下

``` javascript
// example

let p1 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log(1);
        resolve(1)
    }, 3000)
})
let p2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log(2);
        resolve(2)
    }, 2000)
})
let p3 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log(3);
        resolve(3)
    }, 1000)
})

Promise.all([p1, p2, p3])
.then(console.log)
.catch(console.error)

```







### Generator

Generator是种特殊的函数，也可以叫做遍历器生成函数，其特殊在

- 在function后面有个星号
- 函数内部使用了yield关键字

``` js
function* A() {
	yield 'a'
	yield 'b'
	return 'c'
}
var x = A()
```

> Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象：遍历器对象。

**遍历器对象**部署了next方法，调用next方法会返回对象，对象具有两个属性。

```js
x.next()
//{value: 'a'; done: false}
x.next()
//{value: 'b'; done: false}
x.next()
//{value: 'c'; done: true}
```

`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

相当于在外面改变了函数内部的行为。

``` js
function* A() {
    let a = yield 1
    console.log(a)
}
var x = A()
x.next()
x.next() // console.log(undefined)

// Compare

function* A() {
    let a = yield 1
    console.log(a)
}
var x = A()
x.next()
x.next(111) // console.log(111)
```

##### Iterator

> 本节引用于阮一峰文章

JavaScript 原有的表示“集合”的数据结构，主要是数组（`Array`）和对象（`Object`），ES6 又添加了`Map`和`Set`。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是`Map`，`Map`的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

每一次调用`next`方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束。

下面是一个模拟`next`方法返回值的例子。

```js
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };

var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }
```

上面代码定义了一个`makeIterator`函数，它是一个遍历器生成函数，作用就是返回一个遍历器对象。对数组`['a', 'b']`执行这个函数，就会返回该数组的遍历器对象（即指针对象）`it`。



ES6 规定，默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”（iterable）。`Symbol.iterator`属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名`Symbol.iterator`，它是一个表达式，返回`Symbol`对象的`iterator`属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内（参见《Symbol》一章）。

```js
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
```



ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被`for...of`循环遍历。原因在于，这些数据结构原生部署了`Symbol.iterator`属性（详见下文），另外一些数据结构没有（比如对象）。凡是部署了`Symbol.iterator`属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

原生具备 Iterator 接口的数据结构如下。

- Array

- Map

- Set

- String

- TypedArray

- 函数的 arguments 对象

- NodeList 对象  


  对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，`for...of`循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在`Symbol.iterator`属性上面部署，这样才会被`for...of`循环遍历。

  对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。

##### 调用 Iterator 接口的场合

###### 解构赋值

```js
对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。

let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];
```

###### 扩展运算符

```js
扩展运算符（...）也会调用默认的 Iterator 接口。

// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

###### Array.from

`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

下面是一个类似数组的对象，`Array.from`将它转为真正的数组。

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```

###### for...of 循环

一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。

``` js
let str = 'abcde'
for (let i of str) console.log(i)

let arr = [1, 2, 3, 4, 5]
for (let i of arr) console.log(i)

let map = new Map()
map.set('name', 'akara')
map.set('age', 20)
for (let i of map) console.log(i)

let set = new Set([1, 2, 3])
for (let i of set) console.log(i)

```







### AJAX

``` javascript
let xhr = new XMLHttpRequese()
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {

    }
}

xhr.onprogress = function (event) {
    if (event.lengthComputable) {
     	var complete = (event.loaded / event.total * 100 | 0);
      	progress.value = complete;
    }
}
xhr.open('get', '/getInfo')
// 设置请求头
xhr.setRequestHeader()
// 超时控制
xhr.timeout =
xhr.ontimeout = function () {}
// 中止请求
xhr.abort()
// 发送请求
xhr.send()
```

| readyState | 描述                            |
| ---------- | ------------------------------- |
| 0          | XHR已经创建，但未调用open()方法 |
| 1          | open()方法已经被调用            |
| 2          | send() 方法已经被调用           |
| 3          | 正在接收响应的内容              |
| 4          | 成功接收到响应                  |



##### 回调函数封装

``` javascript
const Ajax = ({
    method = 'get',
    url = '/',
    data,
    async = true
}, callback) => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = JSON.parse(xhr.responseText)
            callback(res)
        }
    }
    xhr.open(method, url, async)
    if (method === 'get') {
        xhr.send()
    }
    if (method === 'post') {
        let type = typeof data
        let header
        if (type === 'string') {
            header = 'application/x-www-form-urlencoded'
        }
        else {
            header = 'application/json'
            data = JSON.stringify(data)
```

##### Promise封装

``` javascript
const Ajax = ({
    method = 'get',
    url = '/',
    data,
    async = true
}) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)
                resolve(res)
            }
        }
        xhr.open(method, url, async)
        if (method === 'get') {
            xhr.send()
        }
        if (method === 'post') {
            let type = typeof data
            let header
            if (type === 'string') {
                header = 'application/x-www-form-urlencoded'
            }
            else {
                header = 'application/json'
                data = JSON.stringify(data)
            }
            xhr.setRequestHeader('Content-type', header)
            xhr.send(data)
        }
    })
}

Ajax.get = (url) => {
    return Ajax({
        url
    })
}



Ajax.get('http://localhost:3000/getData')
    .then((data) => {
        console.log(data)
    })
```

##### Generator封装

``` javascript
const Ajax = ({
    method = 'get',
    url = '/',
    data,
    async = true
}) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)
                resolve(res)
            }
        }
        xhr.open(method, url, async)
        if (method === 'get') {
            xhr.send()
        }
        if (method === 'post') {
            let type = typeof data
            let header
            if (type === 'string') {
                header = 'application/x-www-form-urlencoded'
            }
            else {
                header = 'application/json'
                data = JSON.stringify(data)
            }
            xhr.setRequestHeader('Content-type', header)
            xhr.send(data)
        }
    })
}

Ajax.get = (url) => {
    return Ajax({
        url
    })
}


function* use() {
    let data = yield Ajax.get('http://localhost:3000/getData')
    console.log(data)
}

let obj = use()
obj.next().value.then((res) => {
    obj.next(res)
})
```

##### Generator + Co 封装

``` javascript
const Ajax = ({
    method = 'get',
    url = '/',
    data,
    async = true
}) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)
                resolve(res)
            }
        }
        xhr.open(method, url, async)
        if (method === 'get') {
            xhr.send()
        }
        if (method === 'post') {
            let type = typeof data
            let header
            if (type === 'string') {
                header = 'application/x-www-form-urlencoded'
            }
            else {
                header = 'application/json'
                data = JSON.stringify(data)
            }
            xhr.setRequestHeader('Content-type', header)
            xhr.send(data)
        }
    })
}

Ajax.get = (url) => {
    return Ajax({
        url
    })
}



function* use() {
    let data = yield Ajax.get('http://localhost:3000/getData')
    console.log(data)
}

co(use)
```

Co模块的原理类似如下

``` javascript
function co(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}
```

##### Async封装

其实async可以看成Generator + co的集成，不同的是关键字分别用async和await代替了*和yield，更加的语义化。除此之外，async函数会返回一个Promise对象。

``` javascript
const Ajax = ({
    method = 'get',
    url = '/',
    data,
    async = true
}) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)
                resolve(res)
            }
        }
        xhr.open(method, url, async)
        if (method === 'get') {
            xhr.send()
        }
        if (method === 'post') {
            let type = typeof data
            let header
            if (type === 'string') {
                header = 'application/x-www-form-urlencoded'
            }
            else {
                header = 'application/json'
                data = JSON.stringify(data)
            }
            xhr.setRequestHeader('Content-type', header)
            xhr.send(data)
        }
    })

}

Ajax.get = (url) => {
    return Ajax({url})
}


async function use() {
    let data = await Ajax.get('http://localhost:3000/getData')
    console.log(data)
}

use()
```

### fetch

``` javascript
fetch(url, options).then(function(response) {
// handle HTTP response
	 if(response.status!==200){
            console.log("存在一个问题，状态码为："+response.status);
            return;
        }
        //检查响应文本
        response.json().then(function(data){
            console.log(data);
        });
}, function(error) {
 // handle network error
})
```

##### XHR（AJAX）和Fetch的区别

1. AJAX和Fetch发送同源请求时都默认携带Cookie，跨域请求则都默认不携带Cookie。

   当我们使用CORS来进行跨域的时候，若想使其携带Cookie。

   服务端设置

   ``` http
   Access-Control-Allow-Credentials: true
   ```

   若想要使我们的Ajax或Fetch携带Cookie，只需如此。

   ``` javascript
   // Ajax
   var xhr = new XMLHttpRequest()
   xhr.withCredentials = true
   
   // Fetch
   fetch(url, {
       credentials: "include"
   })
   ```

   Fetch的credentials属性，默认值为same-origin，想要跨域发送Cookie则设置为include

   - `omit`: 从不发送cookies.
   - `same-origin`: 只有当URL与响应脚本同源才发送 cookies、 HTTP Basic authentication 等验证信息.(浏览器默认值,在旧版本浏览器，例如safari 11依旧是omit，safari 12已更改)
   - `include`: 不论是不是跨域的请求,总是发送请求资源域在本地的 cookies、 HTTP Basic authentication 等验证信息.

2. ajax原生支持abort，fetch需要使用AbortController才能实现abort

   ``` js
   // ajax
   xhr.abort()
   
   // fetch
   let controller = new AbortController()
   let signal = controller.signal
   
   fetch(url, {
       signal
   })
   
   controller.abort()
   
   ```

3. fetch不支持超时控制timeout

   ``` js
   // ajax的超时控制
   xhr.timeout = 2000
   xhr.ontimeout = () => {}
   ```

   我们如何实现**fetch的超时控制**

   ``` javascript
   Promise.race([
       fetch(url),
       new Promise((resolve, reject) => {
           setTimeout(() => reject(new Error("request timeout")), 2000)
       })
   ])
   .then(data => {}) // 请求成功
   .catch(reason => {}) // 请求失败
   ```

4. fetch无法检测请求的进度(onprogress)

### axios

``` javascript
axios({
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
```

## Node.js

### Http模块

``` javascript
const http = require('http')
const server = http.createServer((req, res) => {
    console.log(req.url) // 请求url
    console.log(req.method) // 请求方法
    console.log(req.headers) // 请求头部

    if (req.url === '/') {
        // 设置响应的状态码和头部
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})

        // 单独设置状态码
        res.statusCode = 200
        // 单独设置响应头部
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        // Set-Cookie
        res.setHeader('Set-Cookie', 'name=akara; secure')
		
        // 设置响应实体
        res.write("hello world")
        res.write("!!!")
        // 发送响应报文
        res.end()
    }

})

server.listen(3000, () => {
    console.log("服务器跑在3000端口")
})
```

##### 静态目录

``` javascript
const http = require('http')
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // ...
    }
    else {
        let filePath = path.join(__dirname, 'static', url.pathname)
        try {
            let file = await fs.readFileAsync(filePath)
            res.statusCode = 200
            res.end(file)
        } catch (error) {
            res.statusCode = 404
            res.end("404 Not Found")
        }
    }
    // 或者
    else {
        let fileName = url.pathname
        let type
        switch(fileName.substr(fileName.lastIndexOf('.') + 1)) {
            case 'css':
                type = 'text/css; charset=utf-8'
                break
            case 'js':
                type = 'applaction/javascript; charset=utf-8'
                break
            // other situations 
            default:
                type = 'application/octet-stream'
                break
        }
        try {
            let file = await fs.readFileAsync(`./static${url.pathname}`)
            res.writeHead(200, {'Content-Type': type})
            res.end(file)
        } catch (error) {
            res.writeHead(400, {'Content-Type': 'text/plain; charset=utf-8'})
            res.end("404错误啦！")
        }
    }
}).listen(3000)


```

##### 处理Post请求（文件上传）

``` javascript
// 前端 (省略部分代码)
let type = typeof data
let header
if (type === 'string') {
    header = 'application/x-www-form-urlencoded'
}
else if (data instanceof File || data instanceof FormData) {
    header = 'multipart/form-data; boundary=---xxxxxxxxxxxx'
}
else {
    header = 'application/json'
    data = JSON.stringify(data)
}
xhr.setRequestHeader('Content-type', header)
xhr.send(data)


// 后端
const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    if (req.url === '/upload') {

        let segment = []

        req.on('data', (chunk) => {
            // chunk为Buffer对象
            // 字符串aaa=bbb对应的Buffer对象如下
            // <Buffer 61 61 61 3d 62 62 62>
            segment.push(chunk)
        })

        req.on('end', () => {
            // 文件上传代码
            segment = Buffer.concat(segment)
            // 下方代码获取buffer转成的字符串
            // segment = Buffer.concat(segment).toString()
            fs.writeFile('fileName', segment, (err) => {
                res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
                res.write("文件上传成功！")
                res.end()
            })
        })
    }
})

server.listen(3000, () => {
    console.log("服务器跑在3000端口")
})
```

### fs模块

``` javascript
const fs = require('fs')
```

##### readFile

``` javascript
fs.readFile('./image.png', (err, buffer) => {
    if (err) throw err

})
```

##### writeFile

``` javascript
// 写入文本
fs.writeFile('index.txt', 'hello world', 'utf8')
// 写入buffer
fs.writeFile('image.png', buffer)
```

##### createReadStream

##### createWriteStream

``` javascript
const reader = fs.createReadStream(data.path)
const stream = fs.createWriteStream(`./image/${Math.floor(Math.random() * 10000)}.jpg`)
reader.pipe(stream)
```

### Path模块

``` javascript
const path = require('path')
```

##### __dirname

返回当前文件所在的绝对路径

##### path.resolve

将一个路径解析成绝对路径

``` javascript
const path1 = path.resolve('static')
console.log(path1)
// 输出
C:\Users\Messiah\test\static
```

##### path.join

用平台特定的分割符号(Linux为`/`， Window为`\`)对路径进行拼接

``` javascript
const path1 = path.join(__dirname, 'a')
const path2 = path.join(__dirname, 'a/b')
const path3 = path.join('/a', 'b', 'c/d', 'e', '..')

console.log(path1)
console.log(path2)
console.log(path3)
// 输出
C:\Users\Messiah\test\a
C:\Users\Messiah\test\a\b
\a\b\c\d

const path4 = path.join(__dirname, '/static')
const path5 = path.join(path.resolve('.'), '/static')
```

### url模块

``` javascript
// 当请求url为 http://localhost:3000/index.html?name=akara#aa
const url = require('url')
let {
    search, // '?name=akara'
    query, // 'name=akara'
    pathname, // '/index.html'
    path, // '/index.html?name=akara'
} = url.parse(req.url)
```

### querystring模块

``` javascript
const qs = require('querystring')
var str = 'foo=bar&abc=xyz&abc=123';

querystring.parse(str)
// { foo: 'bar', abc: [ 'xyz', '123' ] }
```

### Event模块

> 实现原理见本文的设计模式-发布订阅章节

``` javascript
var EventEmitter = require('events').EventEmitter
var emitter = new EventEmitter()

emitter.on('ev', function () {

})

emitter.emit('ev')
```

### Bluebird库

可以将回调函数实现的异步改写成Promise的方式来写

##### Bluebird + fs

回调

``` javascript
const fs = require('fs')
fs.readFile('index.html', (err, data) => {
    response.end(data)
})
```

Promise

``` javascript
const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs'))

fs.readFileAsync('index.html')
.then(data => {
    response.end(data)
})
```

##### Bluebird + mysql

回调

``` javascript
const mysql = require('mysql')
// mysql配置文件
let config = require('./config')
conn.connect()

// 使用
conn.query(`sql code here...`, (err, data) => {

})
```

Promise

``` javascript
const bluebird = require('bluebird')
const mysql = require('mysql')
// mysql配置文件
let config = require('./config')
const conn = bluebird.promisifyAll(mysql.createConnection(config))
conn.connect()

// 使用
let data = await conn.queryAsync(`sql code here...`)
```

## Koa

##### 使用

``` javascript
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


// response
app.use(ctx => {
  ctx.status = 200
  ctx.set('Content-type', 'text/plain; charset=utf-8')
  ctx.body = 'Hello Koa'
});

app.listen(3000);

// 一些其他的方法
ctx.redirect('/home')
// 相当于
// res.status = 302
// res.setHeader('Location', '/home')
```

##### 核心实现

``` javascript
const Emitter = require('events')
// 三个对象，提前定义好原型的方法
const context = require('./context')
const request = require('./request')
const response = require('./response')
class Koa extends Emitter {
    constructor() {
        super()
        this.middleware = []
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
    }

    callback() {
        const fn = compose(this.middleware)
        return (req, res) => {
            const ctx = this.createContext(req, res)
            return this.handlerRequest(ctx, fn)
        }
    }

    use(fn) {
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
        this.middleware.push(fn)
        return this
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        return server.listen(...args)
    }

    createContext(req, res) {
        // 其实就是根据已有的req和res创建上下文context
        const context = Object.create(this.context);
        const request = Object.create(this.request);
        const response = Object.create(this.response);
        context.request = request
        context.response = response
        context.app = request.app = response.app = this;
        // 重点，挂载req和res
        context.req = request.req = response.req = req;
        context.res = request.res = response.res = res;
        // 互相引用
        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;
        return context
    }

    handlerRequest(ctx, fn) {
        const res = ctx.res
        res.statusCode = 404
        fn(ctx).catch(reason => {
            console.log(reason)
        })
    }
}
```

Koa的实例app有三个公共的API

- use

  ``` javascript
  app.use((ctx, next) => {

  })
  ```

  use方法用于将参数中间件放进app的middleware数组里

- listen

  ``` javascript
  app.use(3000)
  ```

  等价于

  ``` javascript
   const server = http.createServer(this.callback())
   server.listen(3000)
  ```

- callback

  该函数内部实现三个功能

  1. 使用koa-compose函数将middleware中间件数组转化为中间件fn

  2. 调用app.createContext函数。创建context，request，response对象；将request和response挂载在context上；把req和res挂载在三个对象上。

     例如：request的原型对象上部分代码如下

     ``` javascript
     get header() {
     	return this.req.headers;
     },
     set header(val) {
     	this.req.headers = val;
     },
     ```

     我们现在就可以根据`ctx.request.header`获取req的headers了

  3. 执行handleRequest函数，本质是把组装好的context传入中间件fn执行

Koa源码中使用到了Koa-compose， 用于将多个中间件函数组合为一个中间件函数

##### koa-compose

``` javascript
const compose = (middleware) => {
    if (!Array.isArray(middleware)) throw new TypeError("Middleware stack must be an array!")
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError("Middleware must be composed of functions!")
    }
    let length = middleware.length
    return function (ctx, next) {
        let index = -1
        return dispatch(0)
        function dispatch(i) {
            // 一个中间件内部多次调用next时，index大于等于i
            if ( index >= i) {
                return Promise.reject(new Error('next() called multiple times'))
            }
            let fn
            index = i
            if (i < length) {
                fn = middleware[i]
            }
            else if (i === length) {
                // 重点， 外部compose的next传进内部compose
                fn = next
            }
            // 最后一个中间件调用next时，什么也不做
            if (!fn) return
            // 官方源码使用Promise是为了使用async中间件，不过这里没有怎么实现这个功能，就一个样子
            return Promise.resolve(fn(ctx, dispatch.bind(null, (i + 1))))
        }
    }
}
```

### koa-router

##### 使用

``` javascript
const Router = require('koa-router')
const router = new Router()
router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', (ctx, next) => {
    // ...
  })
  .put('/users/:id', (ctx, next) => {
    // ...
  })
  .del('/users/:id', (ctx, next) => {
    // ...
  })
  .all('/users/:id', (ctx, next) => {
    // ...
  });
app.use(router.routes())
app.use(router.allowedMethods()) // 此处例子没有实现该方法
```

##### 简易实现

简易实现，只实现一个get方法，实际上要更复杂的多。

``` javascript
class Router {
    constructor() {
        this.stack = []
    }

    get(url, fn) {
        function middleware(ctx, next) {
            if (ctx.req.method.toLowerCase() === 'get' && ctx.req.url === url) {
                console.log('路由匹配成功');
                fn(ctx, next)
            }
            else {
                console.log('路由匹配失败');
                next()
            }
        }
        this.stack.push(middleware)
        return this
    }

    routes() {
        return (ctx, next) => {
            let fn = compose(this.stack)
            // 必须加上next参数
            // koa本身有一个compose， 这里也有一个，所以要把外部的next传给内部
            fn(ctx, next)
        }
    }
}
```



### koa-static

用于处理静态资源的koa中间件

``` js
const static = require('koa-static')
app.use(static('public'))
```



### koa-body

处理请求的中间件，可以轻松获得请求的内容

``` js
const body = require('koa-body')
app.use(body({multipart: true}))
app.use((ctx) => {
    console.log(ctx.request.body)
})
```





## React

### React基础

##### JSX

JSX是JavaScript的一种语法扩展，JSX可以生成React元素。

``` jsx
const element = <h1>hello, world!</h1>
```

实际上Babel会把JSX转译为`React.createElement()`函数调用，下面代码是一样的。

``` javascript
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

**这也是为什么你必须引入React库，因为使用JSX就需要React库。**

`React.createElement()`会创建这样的对象，也叫做React元素，其实就是**虚拟DOM**

``` javascript
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

##### 组件

组件名一定要大写，因为在JSX中小写的会当成html标签。

- `<todo /> ` 编译为 React.createElement('todo')
- `<Todo /> ` 编译为 React.createElement(Todo)

React的组件分为**函数组件**和**class组件**

**函数组件**没有内部的**状态**，也没有**生命周期**。

``` javascript
// 函数组件
function Hello(props) {
    return (
        <div>
        	// 函数组件使用props
            hello world {props.name}
        </div>
    )
}
```

**Class组件**则拥有**状态**，**生命周期**

``` js
class Count extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
            	// class组件使用props
                {this.props.count}
            </div>
        )
    }
}


class App extends React.Component {
    constructor(props) {
        super(props)
        // 根组件的状态
        this.state = {
            count: 0,
            name: 'akara'
        }
    }

    render() {
        return (
            <div>
                {this.state.count}
                <button onClick={this.handlerClick}>click me</button>
				// 根组件传值给子组件的props
                <Hello name={this.state.name}/>
                <Count count={this.state.count}/>
            </div>
        )
    }

    // 根组件的方法，已绑定this
    handlerClick = () => {
        this.setState({
            count: this.state.count + 1
        })
    }


}
```

##### 事件处理

传统的HTML使用的纯小写`onclick`，React使用的驼峰式`onClick`

``` html
// html
<button onclick='func'></button>
```

``` jsx
// react
<button onClick={activateLasers}>
	Activate Lasers
</button>
```

传统的HTML可以通过`return false`来阻止默认行为，React不行，必须使用`event.preventDefault`

``` html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

``` javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

React中的e为**合成事件**，因此无需担心浏览器的兼容性问题。

当我们使用`onClick={this.handleClick}`时，我们需要给handleClick绑定this。

1. ``` javascript
   constructor() {
       this.handlerClick = this.handlerClick.bind(this)
   }
   ```

2. 使用箭头函数

   ``` jsx
    <button onClick={(e) => this.handleClick(e)}>
       Click me
     </button>
   ```

3. ``` javascript
   // 实验性语法
   // Create-React-App 默认支持
   class Btn extends React.component {
       handlerClick = (e) => {
           console.log(this)
       }

       render() {
           return (
           	 <button onClick={this.handlerClick}>
                   Click me
                </button>
           )
       }
   }
   ```

##### [组件生命周期](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

###### 挂载

- **constructor()**
- static getDerivedStateFromProps()
- **render()**
- **componetDidMount()**

###### 更新

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- **render()**
- getSnapshotBeforeUpdate()
- **componetDidUpdate()**

###### 卸载

- **componentWillUnmount()**

##### setState

**不要直接修改State**

``` javascript
// Wrong
// 此代码不会重新渲染组件
this.state.comment = 'Hello';
```

而是应该使用`setState()`

``` javascript
// Correct
this.setState({comment: 'hello'})
```

**State的更新可能/通常是异步的**

``` javascript
class App ..{
    ..() {
        this.state = {
            count: 0
        }
    }

    ..() {
        this.setState({
        	count: 1
    	})
        console.log(this.state.count) // 输出0
    }
}
```

想要获取修改后的值，我们可以传一个回调函数给setState

``` javascript
this.setState({
    count: 1
}, () => {
    console.log(this.state.count) // 输出1
})
```

如果setState依赖于之前的state，如

``` javascript
this.setState({
    count: 1
}, () => {
    console.log(this.state.count);
})

this.setState({
    count: this.state.count + 1
})
```

由于setState是异步的，那么第二个setState中获取到的`this.state.count`为初始的0

为了解决这个问题，setState的参数可以设置为函数

``` javascript
this.setState({
    count: 1
}, () => {
    console.log(this.state.count);
})

this.setState((state, props) => {
    return {
        count: state.count + 1
    }
})
```



**setState何时是异步的**

一句话描述，在**合成事件**和**组件的生命周期**中`setState`是异步的；在**原生事件**和**定时器**中`setState`是同步的。

React内部维护了一个标识`isBatchingUpdates`，当这个值为`true`表示把setState缓存进队列，最后进行批量更新；当这个值为`false`表示直接进行更新。

**合成事件**和**组件的生命周期**中，会把`isBatchingUpdates`设置为true

**原生事件**和**定时器**中，会把`isBatchingUpdates`设置为false



当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state。



##### 条件渲染

&&运算符

``` jsx
function App(props) {
    return (
    	<div>
        	{ props.count > 0 &&
            	<span>hello world</span>
            }
        </div>
    )
}
```

三目运算符

``` javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

阻止组件渲染

``` javascript
function App(props) {
    if(props.flag) return null
    ...
}
```

##### 列表渲染

``` javascript
{
    props.todos.map((todo) => {
        return <Todo todo={todo} key={todo.id}/>
    })
}
```

##### 表单

``` javascript
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return (
            <div>
                {this.state.value}
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
            </div>
        )
    }
}
```

**受控组件**

通常表单内部拥有自己的状态，状态会被用户的输入改变。而React中，用户的输入会被劫持（个人理解），实际上的数据源完全由React提供。

React的state成为组件/表单的唯一数据源，渲染表单的组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。当然，与之对应的成为“非受控组件”。

我们可以把用户输入的小写字符转化为大写

``` javascript
class MyInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    }
    handlerChange = (e) => {
        this.setState({
            value: e.target.value.toUpperCase()
        })
    }

    render() {
        return (
            <input value={this.state.value} onChange={handlerChange} />
        )
    }
}
```

##### Refs

何时使用 Refs

- 管理焦点，文本选择或媒体交换
- 继承第三方DOM库
- 触发强制动画

使用refs

``` javascript
class App extends React.Component {
    constructor(props) {
        super(props)
        // 创建
        this.myRef = React.createRef()
    }

    handleClick = () => {
        this.myRef.current.focus()
    }

    render() {
        return (
            <div>
            	// 绑定
                <input type="text" ref={this.myRef} />
                <button onClick={this.handleClick}>点我</button>
            </div>
        )
    }
}
```



##### 组件通信

###### 父子组件通信

父组件通过props传递数据给子组件。

父组件通过props把自己的函数传递给子组件，子组件内部可直接调用，实现子组件向父组件通信。

###### 非父子组件通信

可以通过`events`实现发布-订阅。也可以借助于Context。



复杂的情况可以考虑使用Redux。



##### Context

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

> 借用官方代码说明，偷个懒。
>

``` javascript
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

##### Fragment

``` js
function App () {
    return (
        <table>
            <tr>
                <Todos />
            </tr>
        </table>
    )
}

function Todos() {
    return (
        <React.Fragment>
            <td>111</td>
            <td>222</td>
            <td>333</td>
        </React.Fragment>
    )
}
```

###### 短语法

``` js
function Todos() {
    return (
        <>
            <td>111</td>
            <td>222</td>
            <td>333</td>
        </>
    )
}
```





### Diff策略

[参考](https://zhuanlan.zhihu.com/p/20346379)

1. Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
3. 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。



针对第一点策略，React只对新老树进行同层的比较（Vue也是如此）。

> **tree diff**
>
> 基于策略一，React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较。
>
> 既然 DOM 节点跨层级的移动操作少到可以忽略不计，针对这一现象，React 通过 updateDepth 对 Virtual DOM 树进行层级控制，只会对相同颜色方框内的 DOM 节点进行比较，即同一个父节点下的所有子节点。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。



针对第二点策略，当React遇到不同类的两个组件，它会将旧组件删除，并增加新的组件。



### Hook

Hook 是一个特殊的函数，它可以让你“钩入” React 的特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 class组件的特性。

##### useState

``` javascript
import React, { useState } from 'react'
function example(props) {
    let [count, setCount] = useState(0) // 初始值0
    return (
    	<div>
        	{ count }
            <button onClick={() => setCount(count + 1)}>
            	Click me
          	</button>
        </div>
    )
}
```

##### useEffect

*Effect Hook* 可以让你在函数组件中执行副作用操作

``` javascript
import React, {
    useState,
    useEffect,
} from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

`useEffect` 会在每次渲染后都执行，包括初次渲染和每次数据更新之后。

`useEffect`可以返回一个函数来清除副作用

``` javascript
useEffect(() => {
    // 运行副作用
    ChatAPI.subscribe()
    // 清除副作用
    return () => {
        ChatAPI.unsubscribe()
    }
})
```

组件挂载时，运行副作用（effect）。

组件更新时，先清除上一个effect，再运行下一个effect

组件卸载时，清除最后一个effect

``` javascript
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

``` javascript
// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // 运行第一个 effect

// Update with { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // 清除上一个 effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // 运行下一个 effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // 清除上一个 effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // 运行下一个 effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // 清除最后一个 effect
```

##### useRef

``` javascript
import React, { useRef } from 'react'

function App(props) {
    let refs = useRef(null)
    return (
    	<input ref={refs}>
    )
}
```

##### useReducer

简化版本如下

```js
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

我们可以这样使用

``` js
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}

function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        text: action.text,
        completed: false
      }];
    // ... other actions ...
    default:
      return state;
  }
}
```



##### 其他Hook

如react-redux提供的`useSelector`，`useDispatch`等

如react-router提供的`useParams`等





### 状态逻辑复用

通常有三种方式

1. 高阶组件（HOC）
2. Render props
3. Hook



##### 高阶组件

``` js
function App () {
    const MouseWithCat = withMouse(Cat)
    return (
        <MouseWithCat />
    )
}

function Cat (props) {
    let {x, y} = props.mouse
    x += 20
    y += 20
    return (
        <img src='https://messiahhh.github.io/blog/logo.png' style={{position: 'absolute', left: x , top: y, width: '40px', height: '40px'}}/>
    )
}

function withMouse(WrappedComponent) {
    return function () {
        let [point, setPoint] = useState({
            x: 0,
            y: 0,
        })

        const move = (e) => {
            setPoint({
                x: e.clientX,
                y: e.clientY
            })
        }

        return (
            <div style={{height: '100vh'}} onMouseMove={move}>
                鼠标的位置：{ point.x } , { point.y }
                <WrappedComponent mouse={point} />
            </div>
        )
    }
}
```

##### Render Props

``` js
function App () {
    return (
        <Mouse render={point =>
            <Cat mouse={point} />
        }/>
    )
}

function Cat (props) {
    let {x, y} = props.mouse
    x += 20
    y += 20
    return (
        <img src='https://messiahhh.github.io/blog/logo.png' style={{position: 'absolute', left: x , top: y, width: '40px', height: '40px'}}/>
    )
}


function Mouse(props) {
    let [point, setPoint] = useState({
        x: 0,
        y: 0,
    })

    const move = (e) => {
        setPoint({
            x: e.clientX,
            y: e.clientY
        })
    }

    return (
        <div style={{height: '100vh'}} onMouseMove={move}>
            鼠标的位置：{ point.x } , { point.y }
            {props.render(point)}
        </div>
    )
}
```

##### Hook

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```





### Redux

##### 基本原理

``` javascript
import { createStore } from 'redux'
// reducer 是个函数，参数为state（设置初始值）和action，返回值为新的state
const reducer = (state = 0, action) => {
    switch(action.type) {
    	case 'add':
        	return state + action.payload
    	case 'delete':
        	return 	state - action.payload
      	default:
        	return state
    }
}
// 生成store
let store = createStore(reducer)

// 获取状态
store.getState()
// action是个对象，通常有type属性
const action1 = {
	type: 'add',
	payload: 2,
}
// 我们也可以用一个action生成函数
const createAction = (val) => ({
	type: 'add',
	payload: val
})

// 使用store.dispatch(action)来分发action
store.dispatch(action1)
store.dispatch(createAction(111))


// store还可以订阅监听器
// 当我们dispatch了action后，会触发函数
store.subscribe(() => {
	console.log('change state')
})
```

##### createStore的简单实现

``` javascript
const createStore = (reducer) => {
    let state
    let listeners = []
    const getState = () => {
        return state
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    dispatch()

    return {
        getState,
        dispatch,
        subscribe,
    }
}
```



##### 实战代码

```javascript
// action.js
export const CHANGE_CHANNEL = 'CHANGE_CHANNEL'
// action 生成函数
export const changeChannel = (channel) => ({
    type: CHANGE_CHANNEL,
    channel
})


```

``` javascript
// reducers.js
import {
	CHANGE_CHANNEL
} from './action.js'
// combineReducers用来分隔reducer
import { combineReducers } from 'redux'

const channel = (state = "nintendo", action) => {
    switch(action.type) {
        case CHANGE_CHANNEL:
            return action.channel
        default:
            return state
    }
}

const name = (state = "test", action) => {
	return state
}

const rootReducer = combineReducers({
	channel,
  	name,
})


export default rootReducer
```

``` javascript
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers.js'
import App from './app.js'
let store = createStore(reducer)

ReactDOM.render(
  	// 把store注入进组件
	<Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)

```



``` javascript
// app.js
import { connect } from 'react-redux'
import {
	changeChannel
} from './action.js'
const App = ({
	channel,
  	handlerClick,
}) => {
	return (
    	<div>
      		<span>{channel}</span>
      		<button onClick={handlerClick}>Click me</button>
      	</div>
    )
}

// 本质是运用的高阶组件，根据输入的UI组件APP生成容器组件
// mapStateToProps 把状态树中的状态映射进组件的props
const mapStateToProps = (state) => {
    return {
      	// 组件的props 和 状态树中的state.channel对应
        channel: state.channel
    }
}

// mapDispatchToProps 把Dispatch方法映射为组件中props的方法
const mapDispatchToProps = (dispatch) => {
    return {
        handlerClick: (value) => {
            dispatch(changeChannel(value))
        }
    }
}
// mapDispatchToProps 也可以是个对象
const mapDispatchToProps = {
  	// 这里的函数是个action creator
	handlerClick: () => {
		type: 'add'
    }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App)

// connect本质是高阶组件，我们可以使用react-redux自带的hook代替connect
import { useSelector, useDispatch } from 'react-redux' // 应该放开头，这里为了方便把import放在这里
// 使用起来很简单
const App = () => {
	const channel = useSelector(state => state.channel)
    const postsByChannel = useSelector(state => state.postsByChannel)

    return (
    	<div>
    		<div>...</div>
      	</div>
    )
}
```



### UI组件和容器组件

React-Redux中的Connect所返回的函数就是一个高阶组件，它会接收我们输入的UI组件，生成新的容器组件。

``` js
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App)
```

那么，UI组件和容器组件有什么不同呢？

##### UI组件

- 只负责UI的呈现，没有任何业务逻辑
- 没有State，参数由Props提供

##### 容器组件

- 不负责UI的呈现，负责处理业务逻辑
- 带有内部状态



回过头看上面的`mapStateToProps`和`mapDispatchToProps`，都是用来处理业务逻辑的。



### React-Router

安装

``` javascript
import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from 'react-router-dom' // web端用react-router-dom

function App () {
    return (
    	<Router>
        	<Link to='/'>首页</Link>
        	<Link to='/blog'>博客</Link>
            <Link to='/about'>关于我</Link>

        	<Switch>
        		<Route path='/about'>
        			<About />
        		</Route>
        		<Route path='/blog'>
        			<Blog />
        		</Route>
        		<Route path='/'>
        			<Home />
        		</Route>
        	</Switch>
        </Router>
    )
}


```

##### 动态路由匹配

``` javascript
import {
    ...
    useParams,
} from 'react-router-dom'

<Switch>
    <Route path='/user/:id'>
    	<User />    
    </Route>
</Switch>


function User() {
    let { id } = useParams()

    return (
    	<div>
        	user: { id }
        </div>
    )
}
```



## Vue

### Vue基础

``` vue
<div class='app'>
	{{ count }}
    <button @click='increment'>
        点我加一
    </button>
</div>
<script>
	const vm = new Vue({
        el: '.app',
        data: {
            count: 0
        },
        methods: {
            increment: function () {
                this.count++
            }
        }
    })
</script>
```

##### 指令

- `v-bind` 缩写为`:`
- `v-on` 缩写为`@`
- `v-show`
- `v-if`
- `v-else-if`
- `v-else`
- `v-for`
- `v-model`
- `v-text` ：等价于`{{}}`
- `v-html`
- `v-once`



##### v-if vs v-show

> `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
>
> `v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
>
> 相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
>
> 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。





##### options

- `el`
- `data`
- `computed`
- `methods`
- `template`
- `store`
- `router`

##### 生命周期

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestory
- destoryed

##### 组件间通信

###### 父子组件通信

父组件通过props传递数据给子组件。

父组件对子组件的自定义事件使用`v-on:eventName=doSomething`进行监听，当子组件内部触发了该自定义事件时（使用`$emit('eventName')`），父组件执行doSomething，从而实现子组件向父组件的通信。



###### 非父子组件通信

在简单的场景下，可以使用一个空的 Vue 实例作为事件总线。

``` javascript
var bus = new Vue()
// 触发组件 A 中的事件
bus.$emit('id-selected', 1)

// 在组件 B 创建的钩子中监听事件
bus.$on('id-selected', function (id) {
  // ...
})
```

复杂的情况下，我们可以使用Vuex。



### Vuex

``` javascript
const store = new Vuex.Store({
    state: {
        count: 0
    },

    getters: {
        countPlus: state => {
            return state.count + 1
        }
    },

    mutations: {
        increment: (state, payload) => {
            state.count += payload
        }
    }
})
new Vue({
    el: '.app',
    store,
    computed: {
        count: function() {
            return this.$store.state.count
        }
    },
    methods: {
        increment: function() {
            this.$store.commit('increment', 10)
        }
    },
    template: `
        <div>
            {{ count }}
            <button @click='increment'>点我</button>
        </div>
    `
})
```

##### mutation 和 action

action类似于mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作，Mutation只能包括同步操作。

### Vue Router

``` html
<div class="app">
    <router-link :to="/login"></router-link>
    <router-link :to="/logout"></router-link>
    <router-view></router-view>
</div>
```

``` javascript
const routes = [
    {
        path: '/login',
        component: { template: '<login></login>' }
    },
    {
        path: '/logout',
        component: { template: '<logout></logout>' }
    },
]

const router = new VueRouter({
    routes
})

const vm = new Vue({
    el: '.app',
    router
})
```

##### 动态路由匹配

如同/user/:id，/user/akara和/user/messiah都可以匹配到这个路由

``` javascript
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

##### 嵌套路由

简单来说就是router-view里面还有router-view

``` html
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

``` javascript
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

##### 路由导航

`router-link`提供了声明式导航，我们也可以使用`this.$router.push`进行函数式导航

``` javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

##### Hash模式和History模式

Hash模式的Url结构类似：`https://example.com/#user/akara`

History模式的Url结构类似：`https://example.com/user/akara`

无论哪种模式，本质都是使用的`history.pushState`，每次pushState后，会在浏览器的浏览记录中添加一个新的记录，但是并**不会触发页面刷新**，也**不会请求新的数据**。

```js
// 使用history模式
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

不过使用History模式需要后端进行配置，如果不配置，当用户访问 `https://example.com/user/akara`的时候会返回404。所以我们需要设置当URL匹配不到任何资源的时候，同返回同一个`index.html`。

##### 导航卫士



### Vue双向绑定的原理

Vue是通过数据劫持结合发布-订阅模式的方式，实现的双向绑定。通过Object.defineProperty()来劫持属性的，使用属性的时候触发getter函数，收集依赖；修改属性的时候触发setter函数，触发相应的回调。

1. Observer 对数据的属性进行递归遍历，使用Object.defineProperty进行数据劫持。
2. Compiler 用于将模板编译为渲染函数，并渲染视图页面
   1. parse使用正则等方式解析template中的指令，class，style等数据，生成AST（抽象语法树）
   2. optimize进行优化，标记静态节点，该节点会跳过diff
   3. generate，把AST转化为渲染函数，渲染函数用于生成虚拟DOM
3. Watcher 是Observer和Compiler之间通信的桥梁
   1. 自身实例化的时候，调用getter函数，向deps添加watch
   2. 当数据修改时，调用setter函数，调用deps.notify，执行watch的update函数
   3. 执行watch的update函数，重新生成虚拟DOM，并进行Diff对页面进行修改

##### 流水线的解释

当我们使用`new Vue()  `生成Vue实例的时候，先会调用Vue._init 进行初始化。

1. 初始化生命周期，事件（以及initRender）

2. 调用BeforeCreate生命周期函数

3. 初始化数据（以及initInjections）

   1. 使用Object.defineProperty对data的属性进行数据劫持
   2. 当数据被渲染进页面时，调用get函数，把属性的Watcher放进dep内部的数组内
   3. 当数据被修改时，调用set函数，调用dep的notify方法，从而调用dep内部数组内所有Watcher的update方法

4. 调用Created生命周期函数

5. 查看有没有el参数，没有的话当vm.$mount()调用时进入下一步

6. 查看有没有template参数，有的话则把template转化成渲染函数，没有的话把el的outerHTML转化为渲染函数，渲染函数生成虚拟DOM

   1. parse用正则等方式解析template中的指令，class，style等数据，生成AST（抽象语法树）
   2. optimize用来标记静态节点，之后diff算法中就会跳过静态节点的对比
   3. generate把AST转化为渲染函数

7. 调用beforeMount生命周期函数

8. 利用虚拟DOM生成真实DOM并挂载在el元素上

9. 调用Mounted生命周期函数

   数据改变时

   1. 调用beforeUpdate生命周期函数

   2. 数据改变时，调用所有监听对应属性的Watcher的update函数，这个函数会把Watcher放进一个队列中，等到下一个tick时才取出。从而实现异步更新DOM。

   3. 重新生成虚拟DOM，并对新老VDom进行patch（patch的核心是diff算法）处理

      1. 如果oldVnode不存在，不存在则直接根据newVnode新建节点

      2. 调用sameVnode对oldVnode和newVnode进行比较，只有当key， tag， isComment都相同，同时定义或同时未定义data， 或者两个都是input且type相同时才是sameVnode。那么就对两个VNode进行patchVnode操作。如果不是sameVode，则直接进行替换。

         1. 如果新老VNode都是静态的，且key值相同，并且新的VNode标记了v-once或是clone，则只需替换elm和componentsinstance
         2. 新老VNode都有children，则使用updateChildren对子节点进行diff

            1. 对于oldVnode的children，用oldCh表示。对于newVnode的children，用newCh表示


            2. 首先定义 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 分别是新老两个 children 的两边的索引，同时 oldStartVnode、newStartVnode、oldEndVnode 以及 newEndVnode 分别指向这几个索引对应的VNode 节点。
            3. while循环，循环中oldStartIdx和oldEndIdx不断靠拢，newStartIdx和newEndIdx也不断靠拢。
            4. 比较，oldStartVnode和newStartVnode，oldEndVnode和newEndVnode   ，  oldStartVnode和newEndVnode  ， oldEndVnode和newStartVnode。如果两个是sameVnode则进行patchVnode, 不是就进行下一个的比较
            5. 如果以上四次比较都不是sameVnode，那么找oldCh有没有和newStartVnode是sameVnode的节点
               1.  如果设置了key，直接通过newStartVnode的key查看有没有key相同的Vnode
               2. 如果没有key，则通过循环，一个个的调用sameVnode函数比较。（体现了**key能够提高diff算法的效率**）
               3. 如果找不到相同的Vnode，则新建一个Vnode
            6. 循环结束。处理多余的或者不够的真实节点。oldStartIdx > oldEndIdx 新增节点 或者 newStartIdx > newEndIdx 删除节点。
    
         3. 如果oldVnode没有children，newVnode有，则先清空老节点的文本内容，再为DOM加入子节点
    
         4. 如果oldVnode有children，newVnode没有，则删除该节点所有子节点
    
         5. 如果新老节点都没有子节点，替换DOM的文本

10. 调用updated生命周期函数
11. 调用vm.$destroy()
12. 调用beforeDestroy生命周期函数
13. 删除组件（包括watchers和事件监听器等）
14. 调用destroyed生命周期函数



##### Vue的坑

准确来说是`Object.defineProperty`的坑。

也是为什么Vue3.0要用`proxy`改写。

###### Vue 不能检测对象属性的添加或删除

```js
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 `Vue.set(object, key, value)` 方法向嵌套对象添加响应式属性。例如，对于：

```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```

你可以添加一个新的 `age` 属性到嵌套的 `userProfile` 对象：

```js
Vue.set(vm.userProfile, 'age', 27)
```

你还可以使用 `vm.$set` 实例方法，它只是全局 `Vue.set` 的别名：

```js
vm.$set(vm.userProfile, 'age', 27)
```

###### 使用数组的方法

虽然数组也是对象，`Object.defineProperty`却不支持数组。

为了解决这种情况，Vue重写了数组的很多方法，如`push`，`pop`，`shift`，`unshift`，`splice`，`sort`，`reverse`。所以这些方法也将会触发视图更新。



尽管如此，由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

1. 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将触发状态更新

```js
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)

// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)
```

为了解决第二类问题，你可以使用 `splice`：

```
example1.items.splice(newLength)
```





## Vue和React的对比

> 本节待完善

共同点：

1. 都使用了Virtual DOM
2. 都提供了响应式和组件化的视图组件
3. 将注意力集中保持在核心库，其他功能如路由和全局状态管理交给相关的库

不同：

1. 优化：

   1. React应用中，某个组件的状态发生改变时，它会以组件为根，重新渲染整个组件子树。

      如果要避免不必要的子组件的渲染，需要使用PureComponent或者shouldComponentUpdate方法进行优化

   2. 在Vue应用中，组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。

2. React中，一切都是JavaScript，html用jsx表示，css也可以纳入js中处理。



### 虚拟DOM

虚拟DOM是Vue和React都使用到的概念，因此将其放在本节中进行解释，我们需要了解的是，虚拟DOM只是一个单纯的JavaScript元素。



##### 虚拟DOM的优劣

使用虚拟DOM：当我们修改我们的数据，重新生成新的虚拟DOM，新老虚拟DOM进行DIFF操作之后，框架底层内部会对我们的真实DOM进行操作。

使用真实DOM：直接手动操作DOM。



**优点**

1. 保证性能的下限。

   当我们使用虚拟DOM的时候，框架会帮我们完成DOM的操作，相当于是一个自动化的过程。

   想一想，一个前端菜鸟随便对真实DOM进行操作，一不小心就会写出低性能的代码。而当我们使用虚拟DOM，类似把我们的需求告诉我们的框架底层，让其进行真实DOM的操作。

2. 跨平台。

   虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。

**缺点**

1. 虚拟DOM的使用可以保证性能的下限，但也正是因为如此，它也无法做到极致的优化。毕竟，我们操作虚拟DOM的最终目的是操作真实DOM，那论性能的上限自然是无法与直接操作真实DOM相比。



### 单页/多页应用

> 不要吐槽为什么这一节放在vue/react区别下面...

##### 单页应用

优点：

1. 前后端分离
2. 页面的切换流畅。

缺点：

1. 首屏加载慢，容易出现首屏白屏的情况
2. 对SEO不友好



##### 多页应用

好处

1. 首屏加载快
2. 对SEO友好

坏处

1. 页面的切换不流畅。



##### 服务端渲染/SSR

> 笔者对SSR并没怎么接触，建议读者跳过该节的内容，目标只是稍微做一个笔记，并不代表严谨和正确。

单页应用的两大缺点，首屏加载和SEO不友好。对于前者，我们通常有类似**路由懒加载**，或者是**骨架屏**之类的解决方案；对于后者，谷歌的**puppeteer**似乎也是可以一定程度上解决的（只听闻过，未曾了解），puppeteer对我们SPA应用进行爬取，然后渲染出html，后端对请求进行判断，如果是爬虫请求，就将我们就走puppeteer渲染的服务器，如果是用户就直接走单页就好了。



**服务端渲染**也是用来解决单页应用的缺点的，当然，虽然可以一定程度上解决，开发的成本也会相应的提高。

目前我对服务端渲染了解的还不深，只能说大概的目标是通过在服务端渲染出HTML发送给浏览器，取代原本的：浏览器中执行JS代码生成完整的HTML。这样，爬虫就可以爬到完整的网页；不过服务端渲染也会提高服务器的开销。



通常的单页应用采取的是客户端渲染的方式。用户访问网站时通常只获取一个`<div id='app'></div>`，之后在浏览器中执行JS代码，生成完整的网页。而搜索引擎爬虫爬到网页后并不会执行JS代码，因此无法爬到网页的文本。

服务端渲染大概的目标是在服务端渲染网页再发送给前端，不过在解决前端SEO的问题的同时，也会给服务器带来额外的开销。

同构：指的是同一份代码，既可以跑在前端，也可以跑在后端。







## 前端模块化

##### 立即执行函数（IIFE）

``` javascript
// 定义模块
(function (window) {
    function A() {
        return 'aaa'
    }

    function B() {
        return 'bbb'
    }

    window.myModule = {A, B}
})(window)

// 使用模块
myModule.A()
```



##### AMD

需要安装require.js库

使用define定义模块，使用require加载模块



##### CommonJS

使用方法

``` javascript
// 定义模块
// a.js
function getName() {
    return 'Akara'
}

module.exports = getName

// 使用模块
// b.js
const getName = require('./a')
getName() // 'Akara'
```

require和module

require相当于包装了一层立即执行函数

``` javascript
const getName = require('./a')
// 等价于
const getName = (function () {
    function getName() {
        return 'Akara'
    }

    module.exports = getName

    // 返回module.exports
    return module.exports
})()
```

JS文件有两个全局变量，module和exports，module对象的结构如下

``` javascript
module: {
    id: '.',
    exports: {}
}
```

module.exports 和 全局变量exports指向同一个对象

``` javascript
module.exports === exports // true
```

所以我们可以

``` javascript
module.exports.a = 111
// 等价于
exports.a = 111
```

但是我们不可以

``` javascript
exports = {
    a: 111
}
console.log(module.exports === exports) // false
```

**在Node中引入模块，会发生什么？**

在Node中，模块分为两类：一类是node提供的**核心模块**，一类是用户编写的**文件模块**

- 路径分析

  如果发现引入的是核心模块，则不用进行接下来的两步了，因为核心模块早已编译为二进制，当node进程启动时，部分核心代码已经直接加载进内存中。

- 文件定位

- 编译执行

**缓存**

模块在被用require引入后会缓存。



##### UMD 

**UMD = IIFE + AMD + CommonJS** 用来兼容多套模块系统





##### ES6模块

通常想使用ES6模块的`import`和`export`，需要将文件名的后缀改为`.mjs`

并且使用`--experimental-modules`开启此特性

``` javascript
node --experimental-modules file.mjs
```

而使用如`create-react-app`或`vue-cli`之类的工具所构建的项目中，我们可以直接使用ES6模块语法，十分便利。



**使用方法**

``` js
// a.js
const name = 'akara'
const getName = () => console.log(111)

export { name, getName }

// b.js
import { name, getName } from './a.js'
getName() 
console.log(name)
```



**export default**

``` js
// c.js
const name = 'akara'

export default name
// 等价于 export { name as default }


// d.js
import name from './c.js'
// 等价于 import { default as name} from './c.js'
console.log(name)
```

我们可以看到，`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

``` js
// as 的用法
// m.js
const name = 'akara'

export {name as aaa}

// n.js
import {aaa as bbb} from './m.js'
console.log(bbb)
```





commonjs中的require是运行时加载模块。

ES6模块中的import是编译时加载模块。

不过在ES6模块里，我们也可以使用`import()`来实现运行时加载模块，因此我们可以用来实现懒加载等功能。



CommonJS我们即使只想使用库中的一个函数，也会加载全部的代码；ES6模块只会加载我们需要的那个函数。



## Webpack



```bash
npm init

// 安装webpack
npm install webpack webpack-cli webpack-dev-server webpack-merge -D

//安装Vue
npm install vue vue-router vuex -S

// 安装loader
npm install vue-loader vue-template-compiler -D // 处理Vue单文件组件
npm install style-loader css-loader -D // 处理css
npm install postcss-loader autoprefixed -D // postcss， 用js来处理css，如自动增加前缀（autoprefixed）等功能
npm install sass-loader node-sass -D // sass/scss，css预处理器
npm install babel-loader @babel/core @babel/preset-env // babel 编译JS代码
cnpm i eslint eslint-loader -D // eslint 代码检查
// 安装插件
npm install html-webpack-plugin clean-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin -D
```



```javascript
//webpack.config.js

const webpack = require("webpack")
const path = require("path")

//使用Vue单文件组件时，需要vue-loader，同时需要vue-loader/lib/plugin里的插件
const VueLoaderPlugin = require("vue-loader/lib/plugin")
// 根据模板html，在dist目录下生成html
const HtmlWebpackPlugin = require("html-webpack-plugin")
//打包前先删除dist下文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
//压缩CSS和混淆JS
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        // `path` is the folder where Webpack will place your bundles
        path: path.resolve(__dirname, './dist'),
        // `publicPath` is where Webpack will load your bundles from (optional)
    	publicPath: 'dist/',
        // `filename` provides a template for naming your bundles (remember to use `[name]`)
        filename: "bundle.js",
        // `chunkFilename` provides a template for naming code-split bundles (optional)
      	chunkFilename: "[name].bundle.js"
    },
    devServer: {
        contentBase: './dist',
      	// 热更新
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader",
            },
            {
                test: /\.m?js$/,
                use: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: [
                    "vue-style-loader",
                    { loader: "css-loader", options: { importLoaders: 1}},
                    "postcss-loader",
                    "sass-loader"
                ],
            },
          	{
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 5000,
                            name: "imgs/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()，

        // 根据模板html，在dist目录下生成html
      	new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./index.html")
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "./dist/*")]
        }),
        new OptimizeCSSAssetsPlugin(),
        new UglifyJsPlugin(),
        //HRM 热更新
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}

```



##### Loader和Plugin的区别

> loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。
>
> plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务



因为 webpack 本身只能处理 JavaScript，如果要处理其他类型的文件，就需要使用 loader 进行转换。





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

我们可以使用**event.stopPropagation**来组织事件的传播。

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







## 计算机网络相关

### 状态码

**301 moved permanently：永久性重定向**

``` javascript
if (req.url === '/login') {
    console.log(111)
    res.writeHead(301, {'Location': 'localhost:3000/redirect'})
	res.end()
}
else if (req.url === '/redirect') {
    console.log(222)
    res.end('hello world')
}
```

当我们多次访问`/login`,会输出

``` js
111
222
222
222
...
```

第一次

``` http
Request URL: http://localhost:3000/login
Request Method: GET
Status Code: 301 Moved Permanently
```

第二次

``` http
Request URL: http://localhost:3000/login
Request Method: GET
Status Code: 301 Moved Permanently (from disk cache)
```





**302 found：临时性重定向**

``` javascript
if (req.url === '/login') {
    console.log(111)
    res.writeHead(302, {'Location': 'localhost:3000/redirect'})
	res.end()
}
else if (req.url === '/redirect') {
    console.log(222)
    res.end('hello world')
}
```

当我们多次访问`/login`,会输出

``` js
111
222
111
222
...
```

多次访问的HTTP报文如下。

``` http
Request URL: http://localhost:3000/ddd
Request Method: GET
Status Code: 302 Found
```





**304 Not Modidied：用于浏览器缓存。**

### HTTP请求方法

| 方法   | 描述                                                         |
| :----- | ------------------------------------------------------------ |
| Get    | 通常用于请求资源                                             |
| Post   | 通常用于向服务端发送资源                                     |
| Delete | 通常用于删除资源                                             |
| Put    | 通常用于资源的更新，若资源不存在则新建一个                   |
| Option | 通常用于CORS的请求预检                                       |
| Head   | 只请求资源的头部，该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载, 以此可以节约带宽资源 |



##### Get/Post的区别

- Get请求的参数放在URL里，Post请求的参数放在实体里。
- Get请求比起Post请求更加不安全，因为参数放在URL中，不能用来传递敏感信息。
- Get请求的参数放在URL中，所以有长度限制；而Post请求没有限制。

[更多区别](https://zhuanlan.zhihu.com/p/25028045)



##### RESTful API

应该尽量将API部署在专用域名之下。

``` js
https://api.example.com
```

如果确定API很简单，不会有进一步扩展，可以考虑放在主域名下。

``` js
https://example.org/api/
```

在RESTful架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词。

对于资源的具体操作类型，由HTTP动词表示。

如Get, Post, Put, Delete等



### HTTP头部

一些常用的请求/响应/通用头部

##### 请求头部

``` http
cookie: ''
host: ''
If-None-Match: ''
If-Modified-Since: ''
```



###### host 与 虚拟主机

host字段是HTTP1.1新增的头部，主要用来实现虚拟主机

一台物理主机上当然可以在不同端口上部署多个服务端。一台主机也可以给多个不同的域名以供访问。

那么可以通过nginx来实现虚拟主机，配置类似如下。

``` nginx
server
{
    listen 80
    server_name www.aaa.com;
    # 可以在这进行代理
    location / {
        proxy_pass localhost:3000
    }    
}
server
{
    listen 80
    server_name www.bbb.com;
    location / {
        proxy_pass localhost:8080
    }
}
```

无论是`www.aaa.com`还是`www.bbb.com`，都能访问我们的服务器。

根据域名/host的不同，代理向不同的服务端。



##### 响应头部

``` http
Set-Cookie: ''
Location: '/'
ETag: ''
Last-Modified: ''
Cache-Control: 'max-age='
expires: ''
access-control-allow-origin: '*'
access-control-allow-credentials: true
```



##### 通用头部

``` http
accept: ''
accept-language: ''
content-Type: ''
content-length: ''
```





### HTTP协议1.0，1.1和2.0的区别

##### HTTP1.1比起1.0

1. HTTP1.0默认不开启长连接，HTTP1.1默认开启（Connection：Keep-Alive），并且支持管线化（Pipeline）。
2. HTTP1.0不支持Host头部，HTTP1.1支持，可以实现虚拟主机。
3. HTTP1.1比1.0新加了E-tag，If-Node-Match，Cache-control等用于缓存控制的头部。
4. HTTP1.1新增24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突。
5. HTTP1.1对带宽进行优化。

##### HTTP2.0比起1.1

1. HTTP2.0采用的二进制格式传输，取代了HTTP1.x的文本格式的传输。
2. 多路复用。在HTTP2.0中有两个概念，分别是帧（frame）和流（stream），帧表示最小的单位，每个帧都会标识出该帧属于哪个流。多路复用指的是一个TCP连接中可以存在多个流，也就是说，同一时间可以发送多个请求。
3. 头部压缩。对报文的头部进行压缩，在客户端和服务端都维护着一份字典记录着头部对应的索引。
4. 服务端推送（Server Push）。服务端可以预测客户端需要的资源，并主动推送给客户端。

### HTTPS的原理

HTTP = HTTP + TLS/SSL

发送HTTPS请求时

1. 生成HTTP报文，交给TLS处理，进行TLS握手；交换互相的随机数，支持的加密算法，压缩算法，协议版本号。
2. 服务端发送证书给客户端，证书包括服务端的公钥和CA的私钥对服务端公钥的签名。客户端用CA的公钥对签名进行验证。
3. 验证成功后，客户端生成预备主密码，用服务端公钥加密后发送给服务端。服务端接收到预备主密码后，结合两个随机数生成主密码。
4. 主密码用来生成会话使用的密钥，消息认证码使用的密钥，CBC模式要用到的初始向量。
5. 报文分割后，压缩，加上MAC后进行加密传输。



##### 中间人攻击

客户端 <=> 中间人 <=> 服务端

1. 服务端向客户端发送公钥，被中间人获取，中间人把自己的公钥给客户端。
2. 客户端用中间人的公钥加密数据发送对称密钥，中间人用自己的私钥解密，再用服务端的公钥加密发送，服务端用自己的私钥解密。
3. 接下来客户端和服务端用对称密钥通信，然而这个密钥中间人也知道，因此能知道密文对应的明文。

中间人攻击是因为服务端发送过来的公钥无法验证是不是真实的公钥，还是伪造的公钥。因此用CA签名的证书（公钥+签名）即可。





### TCP三次握手和四次挥手

##### 三次握手

1. Client给Server发送报文，Server知道自己能接收到Client发送的报文

   该报文的SYN = 1， seq = x

2. Server给Client发送报文，Client知道自己能接收Server发送的报文，知道自己发送的报文能被Server接收

   该报文的SYN = 1, ACK = 1，确认号 = x + 1， seq = y

3. Client给Server发送报文，Server知道自己发送的报文能被Client接收。

   该报文的ACK = 1，确认号 = y + 1

经过三次握手，客户端（Client）和服务端（Server）都知道自己发送的报文能被对方接收，也知道自己能接收到对方的报文。

注：SYN / ACK / FIN 为TCP报文头部的一个标识。seq为报文的序列号（Sequence number），ack为报文的确认序号（并不是之前那个标识，而是Acknowledgement Number）。

SYN = 1，seq = x 对应的是 ACK = 1，ack = x + 1

###### 为什么不两次握手

> 主要是为了防止已经失效的连接请求报文突然又传送到了服务器，从而产生错误。

假设有这样一种场景, 客户端发送的第一个请求连接并且没有丢失，但是被滞留的时间太长。由于TCP的客户端迟迟没有收到确认报文，以为服务器没有收到，此时重新向服务器发送报文。 而现在第一个请求到达服务端，这个请求已经报废了，但是又会建立连接。

如果采用的是三次握手，就算是那一次失效的报文传送过来了，服务端接受到了那条失效报文并且回复了确认报文，但是客户端不会再次发出确认。由于服务器收不到确认，就知道客户端并没有请求连接。

###### 为什么不四次握手

既然三次就可以了，多一次就是浪费资源了。



##### 四次挥手

TCP 是全双工的，在断开连接时两端都需要发送 FIN 和 ACK。

- 第一次挥手
  - 若客户端 A 认为数据发送完成，则它需要向服务端 B 发送连接释放请求。
- 第二次挥手
  - B 收到连接释放请求后，会告诉应用层要释放 TCP 链接。然后会发送 ACK 包，并进入 **CLOSE_WAIT** 状态，表示 A 到 B 的连接已经释放，不接收 A 发的数据了。但是因为 **TCP 连接时双向的**，所以 B 仍旧可以发送数据给 A。
- 第三次挥手
  - B 如果此时还有没发完的数据会继续发送，完毕后会向 A 发送连接释放请求，然后 B 便进入**LAST-ACK**状态。
  - PS：通过延迟确认的技术（通常有时间限制，否则对方会误认为需要重传），可以将第二次和第三次握手合并，延迟 ACK 包的发送。
- 第四次挥手
  - A 收到释放请求后，向 B 发送确认应答，此时 A 进入 **TIME-WAIT** 状态。该状态会持续 2MSL（最大段生存期，指报文段在网络中生存的时间，超时会被抛弃） 时间，若该时间段内没有 B 的重发请求的话，就进入 **CLOSED** 状态。当 B 收到确认应答后，也便进入 CLOSED 状态。

个人理解：由于在客户端要关闭TCP连接的时候，服务端可能还在发送数据；所以服务端先进行第二次挥手，这个报文的作用是服务端不再接收数据；当服务端的数据全部发送过去后，再一次挥手，这样服务端就不再发送数据了；至此，TCP连接就关闭了。



##### TIME-WAIT

在握手和挥手的不同阶段，客户端和服务端都处于不同的状态。

在第四次挥手后，客户端会进入 **TIME-WAIT**状态。该状态会持续 2MSL（最大段生存期，指报文段在网络中生存的时间，超时会被抛弃） 时间，若该时间段内没有 B 的重发请求的话，就进入 **CLOSED** 状态

如果没有**TIME-WAIT**状态，若报文因为网络问题没有送达，则服务端不会正常关闭。



##### UDP

TCP是面向连接的传输层协议，而UDP是面向无连接的传输层协议。

TCP通过三次握手/四次挥手来保障传输，不过因此速度比UDP慢。

UDP通常用于DNS，或者是一些直播流的传输。



### HTTP缓存

##### HTTP缓存分为强制缓存和协商缓存。

浏览器请求资源时

1. 先判断浏览器有没有缓存，若没缓存则向服务器请求资源

2. 若有缓存，根据Cache-Control: max-age 或是 Expires 判断资源是否过期。

   1. 如果资源没过期，则直接从缓存读取（强制缓存），此时在Network一栏可以看到资源对应的状态码为**200（from disk cache）或者是 200 （from memory cache）**

      比如，资源没过期的时候我们打开新的页面，资源会从硬盘缓存中读取（from disk cache）；如果我们此时又刷新页面，资源会从内存缓存中读取（from memory cache）

   2. 如果资源过期了

      1. 查看上次资源的响应是否有Etag头部， 有的话发送请求，请求头为If-None-Match

      2. 没有Etag的话，看上次资源的响应是否有Last-Modified，有的话发送请求，请求头为If-Modified-Since。

      3. 如果命中了缓存，或者说资源没有发生改变，服务器会发送状态码为**304（Not Modify）**的响应，告诉浏览器读取缓存中的资源。

         如果未命中缓存，或者说资源发生了改变，服务器会发送状态码为**200（OK）**的响应，并把资源作为响应的内容发送给浏览器。




###### 实现强制缓存

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



###### 实现协商缓存

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





### 输入URL之后会发生什么

1. 浏览器解析URL获取协议，域名，端口，路径

2. 查看浏览器是否有资源的缓存

   1. 有。判断是否过期
      1. 没过期。直接读取缓存
      2. 过期。
         1. Etag和If-None-Match
         2. Last-Modify和lf-Modified-Since
         3. 文件修改了则把新资源发给浏览器（状态码200），没修改则告诉浏览器读取缓存（状态码304）
   2. 没有则进行下一步

3. 首先进行DNS解析

   1. 寻找浏览器是否存在缓存，若没有
   2. 寻找操作系统是否存在缓存，若没有
   3. 寻找hosts文件中是否有域名和ip的对应关系，若没有
   4. 查找路由器中是否有缓存
   5. 寻找DNS服务器是否没缓存，若没有
   6. 向根域名服务器发送请求

4. 生成HTTP请求

5. 建立TCP连接，三次握手

   1. 客户端发送一个SYN=1,Seq=X的TCP包
   2. 服务端发回一个SYN=1,ACK=X+1，Seq=Y的TCP包
   3. 客户端发送ACK=Y+1，Seq=Y + 1的TCP包

6. 如果是HTTP请求

   对HTTP报文进行报文分割并标记序号和端口号

7. 如果是HTTPS请求

   1. 将HTTP报文交给TLS处理，TLS和服务端进行TLS握手，交换版本信息，加密算法，压缩算法，随机数（浏览器一个，客户端一个）。
   2. 服务端发送证书，浏览器用CA的公钥对其进行验证。
   3. 浏览器用服务端的公钥加密生成的预备主密码发送给服务端，两个随机数和预备主密码生成主密码
   4. 使用主密码生成对称加密的密钥对，消息认证码的密钥对，对称加密的CBC分组（分组模式）需要的初始化向量密钥对。
   5. 握手之后进行加密，对HTTP报文分组，分组后压缩，压缩后的数据和MAC一起加密。
   6. 对称加密保障私密性，消息认证码保障完整性，数字证书保障认证，防止中间人攻击。

8. 对TCP报文打包，加入源IP地址和目标IP地址。

9. 根据目标IP地址和路由表，查询下一跳路由。使用ARP查询下一跳路由的MAC地址。

10. 对IP报文打包并附上MAC地址。

11. 发送数据，服务端接收到请求并返回响应。

12. 浏览器接收到HTTP响应，关闭TCP连接或保持复用，四次挥手。

13. （如果返回了HTML）根据响应头的字符集进行解码

14. 如果响应头没有字符集，则浏览器会默认用一套解码规则，当解析html解析到meta标签中的编码规则时，则替换成新的解码方式重新解码。

15. 资源预解析，会将一些请求资源提前加入请求队列中

16. 解析HTML为DOM树

    1. 标记化（tokenizing）: 将HTML解析成标记
    2. 构建树（tree construction）: 根据标记生成DOM树

17. 解析CSS为CSSOM

18. 根据DOM树和CSSOM生成DOM渲染树

    从DOM的根节点遍历所有可见节点，对其应用对应的CSSOM规则。不可见节点包括（script, meta标签， 被css隐藏的节点）

19. 布局：浏览器获取每个渲染对象的位置和尺寸

20. 绘制：将计算好的像素绘制到屏幕

21. 渲染层/合成层合并





### DNS

[相关链接](http://www.sunhao.win/articles/netwrok-dns.html)

DNS查询过程

1. 浏览器是否有缓存
2. 操作系统是否有缓存
3. 本地Hosts文件是否有缓存
4. 本地DNS服务器是否有缓存
5. 向根域名服务器查询，若知道对应IP则返回IP，不知道则告诉本地DNS服务器要去哪个顶级域名服务器查询
6. 迭代，直到找到对应的ip



**递归**

本地 <=> 本地DNS服务器 <=> 权威DNS服务器

**迭代**

本地DNS服务器  <=> 根域名服务器，若查不到则进行下一步

​                             <=> 顶级域名服务器，若查不到则进行下一步

​                             <=> 二级域名服务器...

**解析记录**

1. A记录，解析域名到IP
2. CNAME记录，解析域名到域名
3. 其他各种记录



### CDN

CDN（Content Delivery Network，内容分发网络）是构建在现有互联网基础之上的一层智能虚拟网络，通过在网络各处部署节点服务器，实现将源站内容分发至所有CDN节点，使用户可以就近获得所需的内容。CDN服务缩短了用户查看内容的访问延迟，提高了用户访问网站的响应速度与网站的可用性，解决了网络带宽小、用户访问量大、网点分布不均等问题。

[加速原理](https://fecommunity.github.io/front-end-interview/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/8.CDN.html)

> 当用户访问使用CDN服务的网站时，本地DNS服务器通过CNAME方式将最终域名请求重定向到CDN服务。CDN通过一组预先定义好的策略(如内容类型、地理区域、网络负载状况等)，将当时能够最快响应用户的CDN节点IP地址提供给用户，使用户可以以最快的速度获得网站内容

![CDN流程图](https://fecommunity.github.io/front-end-interview/img/cdncache.png)



## 前端安全（XSS和CSRF）

##### XSS

XSS，也叫做跨站脚本攻击（Csoss-site Scripting）

类型：

1. 反射型XSS

   将用户的输入反射给浏览器。

2. 存储型XSS

   将用户的输入存储在服务器。

3. 基于DOM的XSS

   类似于反射性XSS，但是与服务端并不交互。

###### XSS的防御

在数据输出时进行检测

XSS的本质是一种“HTML注入”，用户的输入数据被当成HTML代码的一部分来执行。

1. 在HTML标签或属性中输出数据，使用HTMLEncode，将字符转化为html实体字符。通常转化& < > " ' / 这几个字符。
2. 在Script标签或事件中输出数据，使用JavaScriptEncode，使用转义符 \ 对特殊字符转义。除了数字和字母，对小于127的字符编码使用\xHH表示，对大于127的字符用Unicode表示。



其他：

1. Cookie设置为HttpOnly也可以防止XSS劫持Cookie
2. CSP 内容安全策略，本质建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。
   - 设置HTTP Header的Content-security-Policy

   - 或者设置meta标签的<meta http-equv="Content-Security-Policy">

   - 以设置 HTTP Header 来举例

     - 只允许加载本站资源

       ```http
       Content-Security-Policy: default-src ‘self’
       ```

     - 图片只允许加载 HTTPS 协议

       ```http
       Content-Security-Policy: img-src https://*
       ```

     - 允许加载任何来源框架

       ```http
       Content-Security-Policy: child-src 'none'
       ```



##### CSRF

CSRF，也叫做跨站请求伪造（Cross-site request forgery ）

要完成一次CSRF攻击，受害者必须依次完成两个步骤：

　　1.登录受信任网站A，并在本地生成Cookie。

　　2.受害者访问危险网站B， 网站B中发送请求给网站A，请求会自动带上Cookie。

###### CSRF的防御

1. 验证码（因为CSRF的攻击往往在受害者不知情的时候成功）

2. 检查请求的Referer头部

   通常网站的页面与页面之间有一定的逻辑联系，例如想要发送登录的请求example.com/api/login时，通常用户在登录的页面example.com/login下。那么我们只需要验证请求的Referer是否为example.com/login即可。

   缺陷：某些情况下浏览器不会发送Referer

3. Cookie的SameSite属性。

   SameSite可以设置为三个值：Strict，Lax，None。

   Strict模式：浏览器禁止第三方请求携带Cookie，比如example.com以外的网站在向example.com/api/login发送请求时不会发送Cookie。

   Lax模式：相对宽松，只能在 `get 方法提交表单`况或者`a 标签发送 get 请求`的情况下可以携带 Cookie，其他情况均不能。

   None模式：默认模式，请求自动带上Cookie。（chrome 80后可能默认模式会改为Lax）

4. CSRF Token

   CSRF的本质在于**请求的参数可以被攻击者猜到**

   Token是一个随机数，同时存放在表单和用户的Cookie中，发送请求后服务器对请求实体的token和cookie中的token进行对比。



## 密码学相关

在我看来，密码学最重要的三个点

1. **机密性**

即保证通信的内容不会被第三者知晓。

2. **完整性**

即使能保证机密性，也要保证通信的内容没有被篡改过或丢失。

3. **认证**

即确认通信的对象并不是伪造的第三方。



### 加密算法

想要保证消息的机密性，就要使用合理的加密算法。

而加密算法根据使用的密钥的类型可以分为以下三种

1. **对称加密算法**
2. **非对称加密算法（公钥加密算法）**
3. **混合加密算法**



##### 对称加密算法

正如其名，通信双方使用的密钥是完全相同的，密钥既可以把明文加密成密文，也可以把密文解密成明文。

不过对称加密算法的一大问题就是难以做到把密钥安全的送达给对方。对称加密算法使用到的密钥，需要使用对称加密算法，这样一看就变成死循环了，很明显不行。

常见对称加密算法：DES, 3DES, AES

对称加密有不同的分组模式，比如CBC模式就被用在TLS协议中。使用此模式的时候必须要准备好初始向量（对称密钥）

##### 非对称加密算法

非对称加密算法使用的密钥对是一个公钥一个私钥。

公钥可以把明文加密成密文，而私钥则是把密文解密成明文。私钥是不能被其他人知道的，而公钥即使第三方拿到了也没有问题。因为最终完成解密的私钥只在你手上，别人只能加密而无法查看密文的内容。

因此，对称加密算法中运送密钥的难题在这里就不会发生了。但是，非对称加密算法在性能上比对称加密算法还是差了许多的，这也是为什么有混合加密算法。

常见非对称加密算法: RSA

**混合加密算法**

使用随机生成函数来生成一对密钥，利用公钥对密钥进行加密，这样就能解决密钥的配送难题了。



### 中间人攻击

混合加密基本上保证了数据的机密性，只要你能确定你所使用的公钥确实是对方发出的。

通常用户A和B进行加密通信的时候，A会向B发送自己的公钥，然后B利用公钥把对称加密所使用的密钥进行加密发送给A，A再用自己的私钥对密钥进行解密。这样双方接下来就能用密钥进行加密通信了。

但假设这样的场景：

A向B发送自己的公钥途中，公钥被黑客截取。然后黑客把自己的公钥发送给B，B误以为是A的公钥，结果用了黑客的公钥对自己的消息加密发送。黑客获取到了加密后的消息，可以用自己的私钥解密，就获取到了B发送消息的明文了。

又因为黑客截取了A发送的公钥，因此可以用A的公钥把自己想发送的消息加密发送给A。

这样一来，A会误以为黑客是B，B会误以为黑客是A，这就是所谓的中间人攻击。



导致中间人攻击的原因在于：无法确认公钥到底是谁发出的。

这也正是**认证**所解决的，下文会解释如何解决中间人攻击。



### 完整性

##### 单向哈希函数

单向哈希函数接受一个任意长度的输入，生成一串固定长度哈希值。一旦输入的值发送一丁点变化，输出的哈希值也会产生巨大的改变。因此可以用来验证数据的完整性。

通信时使用的时候，可以同时把消息和消息经过哈希后的散列值发送给对方。对方只需要在接收到消息后，进行哈希获取散列值进行比对，就能知道消息是否完整。

可以把用户密码的**摘要**存在数据库，防止存密码可能导致被脱库的风险。这种“加密”是无法逆向得到密码原文的。

常见哈希函数：MD5，SHA

##### 加盐

**盐**（Salt），在[密码学](https://zh.wikipedia.org/wiki/密码学)中，是指在[散列](https://zh.wikipedia.org/wiki/散列)之前将散列内容（例如：密码）的任意固定位置插入特定的字符串。这个在散列中加入字符串的方式称为“加盐”。

通常情况下，当字段经过散列处理（如[MD5](https://zh.wikipedia.org/wiki/MD5)），会生成一段散列值，而散列后的值一般是无法通过特定算法得到原始字段的。但是某些情况，比如一个大型的[彩虹表](https://zh.wikipedia.org/wiki/彩虹表)，通过在表中搜索该MD5值，很有可能在极短的时间内找到该散列值对应的真实字段内容。

加盐后的散列值，可以极大的降低由于用户数据被盗而带来的密码泄漏风险（短密码容易被彩虹表破解），即使通过彩虹表寻找到了散列后的数值所对应的原始内容，但是由于经过了加盐，插入的字符串扰乱了真正的密码，使得获得真实密码的概率大大降低。



### 验证

##### 消息认证码（MAC）

消息认证码的生成很像上面介绍的单向哈希函数，不同的是消息认证码的输入是消息和一个对称密钥，生成的值就叫消息认证码（MAC）。

与单向哈希函数对比后，就能知道消息认证码可以看作是与密钥相关联的单项哈希函数。正是因为与密钥相关联，消息认证码不仅仅能做到保证消息的完整性，还能起到认证的作用。（注：消息认证码中使用的密钥并没有起到加密的作用，仅仅是一个输入数而已。而数字签名中使用的到的私钥起到的签名的作用。二者之间是不同的）



##### 数字签名

使用私钥对消息进行加密（签名），使用公钥对消息进行解密（验证）。



单向哈希函数，消息认证码和数字签名的区别在哪？

1. 很明显，单向哈希函数只能验证消息的完整性。

   问题简化成消息认证码和数字签名的区别。

2. 二者都能做到验证消息的完整性和认证。

   消息认证码是通过比对 消息和对称密钥的运算生成的MAC。

   而数字签名是通过比对 私钥对消息的加密生成的签名。

   （要注意的是消息认证码中对称密钥的作用并不是加密，而仅仅是一个输入的数）

   二者的差别就在于一个用的是对称密钥，一个是非对称密钥。



所以使用消息认证码的时候，B可以伪造出一个信息说是A发送的，对于第三方来说，由于A和B的密钥相同，所以无法证伪。

而如果使用数字签名，A和B使用的密钥不同，就不会发生这种事了。



##### 证书

之前说过了，导致中间人的原因是无法确认公钥到底是谁的，我们所需要解决的问题就是公钥的**认证**问题。

我们之前也说过数字签名可以进行消息的认证，而证书实际上使用的就是数字签名来认证。

先解释一下证书的构成：

证书 = 网站的公钥 + CA（Certifi*ca*te Authority，证书颁发机构）的私钥对网站公钥的签名



当用户访问网站时，并不是直接把公钥发给用户，而是把证书发给用户。二者的最大差别就是证书上除了公钥，还有签名。因此当用户收到证书后，用CA的公钥对签名进行验证，就能知道这个公钥到底是不是网站的公钥了。







## 错误监控

### 前端错误的类型

##### 即时运行错误

也就是代码错误

##### 资源加载错误

比如图片加载失败，JS加载失败，CSS加载失败。

### 前端错误的捕捉方式

##### 即时运行错误的捕捉方式

1. try...catch

   ``` javascript
   try {
       var a = 1;
       var b = a + c;
   } catch (e) {
       // 捕获处理
       console.log(e); // ReferenceError: c is not defined
   }
   ```

   不过对于异步代码，使用try...catch是无法捕捉其内部发生的错误，比如：

   ``` js
   try {
       setTimeout(() => {
           throw new Error('222')
       })
   } catch (e) {
       console.log(2)
   }
   // 未能捕捉到异常，不输出2
   ```

   我们可以通过async/await和promise来解决此问题。

   当await后面的promise状态为reject时，会抛出错误。所以我们可以搭配async/await和promise来进行异步的错误捕捉。

   ``` js
   async function A() {
       try {
           await new Promise((resolve, reject) => {
               setTimeout(() => {
                   reject(new Error('222'))
               })
           })
       } catch (e) {
           console.log(e)
       }
   }
   ```

2. window.onerror

  ``` javascript
  window.onerror = function(errorMessage, scriptURI, lineNo, columnNo, error) {
      console.log('errorMessage: ' + errorMessage); // 异常信息
      console.log('scriptURI: ' + scriptURI); // 异常文件路径
      console.log('lineNo: ' + lineNo); // 异常行号
      console.log('columnNo: ' + columnNo); // 异常列号
      console.log('error: ' + error); // 异常堆栈信息
  }
  ```


##### 资源加载错误的捕捉方式

1. object.onerror

   img标签、script标签都可以添加onerror事件，用来捕获资源加载错误

2. performance.getEntries

   可以获取所有已加载资源的加载时间，通过这种方式，可以间接的拿到没有加载的资源错误。



### 浏览器白屏怎么办

1. 看一下是不是断网了
2. URL参数是否输入正确
3. 看F12控制台
4. 看后端是否报错



### 内存泄漏

内存泄漏（memory leak），指的是不再使用的内存，却没有被即时的释放。

一个广为流传的**错误观点**：闭包会造成内存泄漏。

实际上这是十分错误的，之所以这种观点会流传至今，是因为早年的IE浏览器存在垃圾回收的BUG。内存泄漏指的是不再使用的变量没有被回收，可是闭包中的变量是我们需要用到的呀。每一个传播“闭包会造成内存泄漏”这种错误观念的同学都应该被打一顿...只要程序写错了才会造成内存泄漏。

##### 常见内存泄漏

1. 意外的全局变量

   ``` js
   // 意外的声明了全局的变量，在页面关闭前a变量都不会被回收
   (function A() {
       a = '123'
   })()
   ```

2. 循环引用

3. 删除DOM时，还存在DOM的引用

   比如，我们给DOM绑定点击事件，之后删除DOM节点。因为还存在引用，所以内存没有被释放。

   



## 事件循环

##### 宏/微任务，队列

宏任务`macroTask`， 包括:  `setTimeout/setInterval`，`setImmediate`(Node专有)， I/O操作（包括读写文件/发送请求等）。宏任务放在宏队列中。

微任务`microTask`， 包括:  `promise.then`等。微任务放在微队列中。



除此之外，`process.nextTick`的回调函数是放进`nextTick`队列的。该队列类似微队列，但其执行总在微队列之前。

``` js
Promise.resolve('promise').then(v => console.log(v))
process.nextTick(() => {
    console.log('nextTick');
})
// nextTick
// promise
```



浏览器通过主线程和工作线程实现事件循环。

Node通过libuv来实现事件循环。



##### 浏览器事件循环

浏览器内维持着**一个宏任务队列，一个微任务队列**。

执行宏队列中的第一个宏任务 => 执行微队列中的所有微任务 => 执行宏队列中的下一个宏任务 => 执行微队列中的所有微任务...如此往复。我们最初的同步脚本可以看作最初的宏任务。

##### Node中的事件循环

Node事件循环一共有**六个阶段**，**每个阶段中都有一个宏队列**，**总共只有一个微队列**

在高版本Node（v11以后），Node的行为与浏览器表现一致，即执行完一个宏任务就执行所有的微任务。

在旧版本Node（v11以前）：必须执行完一个阶段中宏队列内的全部宏任务，才回去执行所有微任务。

Node事件循环的六个阶段：

1. Timer: `SetTimeoute`和`SetInterval`的回调放进该阶段的队列。
2. pending callback: 执行一些系统操作的回调，例如TCP的错误。
3. idle, prepare: 处理一些内部调用。
4. poll: **大部分回调在这里调用。**
5. check: `SetImmediate`的任务放进这个阶段的宏队列执行。
6. close callback: 一些结束时的回调，例如`Socket.on("close")`



##### 高低版本Node的差异

高低版本的Node有着显著的差异，如以下代码，在高低版本的Node下的结果就会不同。

``` js
setImmediate(function(){
    console.log(1);
    process.nextTick(function(){
        console.log(4)
    }) 
})
process.nextTick(function(){
    console.log(2)
    setImmediate(function(){
        console.log(3);
    })
})
```

1. 当我们遇到`setImmediate`后，将其回调函数放进`check`阶段的宏队列中。
2. 当我们遇到`process.nextTick`后，将其回调函数放进`nextTick`队列中。因为此时同步代码（或者说最初的宏任务）执行完毕，那么执行`nextTick`队列中的任务。
3. **输出2**， 遇到`setImmediate`后，将其回调函数放进`check`阶段的宏队列中。
4. 开始执行`check`队列中的宏任务。
5. 执行`check`第一个宏任务，**输出1**，将`nextTick`的回调放进队列里。

以上五步，无论版本如何都是一致的，接下来就是高低版本Node的不同。

**低版本Node**

因为低版本Node是执**行完一个阶段中的全部宏任务后，再执行微队列的全部任务**。所以**先输出3，再输出4。**

**高版本Node**

因为高版本Node是**执行完一个宏任务，就执行微队列的全部任务**。所以**先输出4，再输出3。**







## 跨域解决方案

同源：协议，域名，端口号相同

同源策略：不同源的脚本在没有授权的情况下，不能读写对方的资源





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



##### nginx反向代理

同源策略是浏览器的策略。

向同源的nginx服务器发送请求，nginx再将请求转发给不同源的服务端。








## 设计模式

##### 单例模式

一个类只有一个实例



##### 发布-订阅模式

```javascript
// Node中的EventEmitter 就是用的发布订阅模式
class EventEmitter {
      constructor() {
          this.list = {}
      }

      on(name, fn, type = 1) {
          if (!this.list[name]) {
              this.list[name] = []
          }
          this.list[name].push([fn, type])

      }

      once(name, fn, type = 0) {
          this.on(name, fn, type)
      }

      emit(name, ...args) {
          let fns = this.list[name]
          if (!fns || fns.length === 0) return
          fns.forEach((fn, index) => {
              fn[0].apply(this, args)
              if (fn[1] === 0) {
                  fns.splice(index, 1)
              }
          })
      }

      remove(name, func) {
          let fns = this.list[name]
          if (!fns) {
              this.list[name] = []
          }
          fns.forEach((fn, index) => {
              if (fn[0] === func) {
                  fns.splice(index, 1)
              }
          })
      }
  }

let bus = new EventEmitter()

bus.on("click", (value) => {
	console.log(value)
})

bus.emit("click", 111)
```

##### 观察者模式

```javascript
class Publisher {
      constructor() {
          this.list = []
      }

      addListener(listener) {
          this.list.push(listener)
      }

      removeListener(listener) {
          this.list.forEach((item, index) => {
              if (listener === item) {
                  this.list.splice(index, 1)
              }
          })
      }

      notify(obj) {
          this.list.forEach((item) => {
              item.process(obj)
          })
      }
  }

class Subscriber {
    process(obj) {
        console.log(obj.name)
    }
}
```

##### MVC

MVC (Model-View-Controller) 分为三部分

- Model（数据模型）：数据
- View（视图）：用户界面
- Controller（控制器）：业务逻辑

通信过程如下，所有通信都是单向的。

1. View 传送指令到 Controller
2. Controller 完成业务逻辑后，要求 Model 改变状态
3. Model 将新的数据发送到 View，用户得到反馈

![过程](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015020105.png)

##### MVVM

MVVM（Model-View-ViewModel）也分为三部分，数据模型，视图，视图模型。

与MVC的区别之一在于View和Model之间要借助ViewModel进行通信。

![通信过程](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015020110.png)



## 数据结构

### 二叉树

#### 二叉树的创建

```javascript
class Node {
    constructor(data, left, right) {
        Object.assign(this, {
            data,
            left,
            right
        })
    }
}

class BST {
    constructor() {
        this.root = null
    }

    insert(data) {
        let node = new Node(data)
        if (!this.root) {
            this.root = node
        }
        else {
            let current = this.root
            while (true) {
                if (data < current.data) {
                    if (current.left) {
                        current = current.left
                    }
                    else {
                        current.left = node
                        break
                    }
                }
                else {
                    if (current.right) {
                        current = current.right
                    }
                    else {
                        current.right = node
                        break
                    }
                }
            }
        }
    }
}


// 使用
let tree = new BST()
tree.insert(10)
tree.insert(20)
tree.insert(15)
tree.insert(12)
tree.insert(5)
```

#### 树的遍历

##### 二叉树的递归遍历

``` javascript
// 递归的先序遍历
function preOrder (node, cb) {
    if (node) {
        cb(node.data)
        preOrder(node.left, cb)
        preOrder(node.right, cb)
    }
}

// 递归的中序遍历
function inOrder (node, cb) {
    if (node) {
        inOrder(node.left, cb)
        cb(node.data)
        inOrder(node.right, cb)
    }
}

// 递归的后序遍历
function postOrder (node, cb) {
    if (node) {
        postOrder(node.left, cb)
        postOrder(node.right, cb)
        cb(node.data)
    }
}

```

##### 二叉树的非递归遍历

``` javascript
// 非递归的先序遍历
function preOrder(node) {
    let stack = [], res = []
    stack.push(node)
    while (stack.length > 0) {
        let node = stack.pop()
        res.push(node.data)
        if (node.right) {
            stack.push(node.right)
        }
        if (node.left) {
            stack.push(node.left)
        }
    }
    return res
}

// 非递归的中序遍历
function inOrder(node) {
    let stack = [], res = []
    while (stack.length > 0 || node) {
        if (node) {
            stack.push(node)
            node = node.left
        } else {
            node = stack.pop()
            res.push(node.data)
            node = node.right
        }
    }
    return res
}

// 非递归的后序遍历 方法1
function postOrder(node, cb) {
    let stack = []
    let res = []
    while (stack.length > 0 || node) {
        res.unshift(node.data)
        if (node.right) {
            stack.push(node.right)
        }
        if (node.left) {
            stack.push(node.left)
        }
        node = stack.pop()
    }
    return res
}

// 方法2，其实就是在先序遍历的基础上把返回数组进行reverse处理
function postOrder(node) {
    let stack = [], res = []
    stack.push(node)
    while (stack.length > 0) {
        let node = stack.pop()
        res.push(node.data)
        if (node.left) {
            stack.push(node.left)
        }
        if (node.right) {
            stack.push(node.right)
        }
    }
    return res.reverse()
}
```

##### 深度优先遍历

###### 递归的深度优先遍历

``` javascript
function DFS(node, nodeList = []) {
    if (node !== null) {
        nodeList.push(node)
        let children = node.children
        for (let i = 0; i < children.length; i++) {
            DFS(children[i], nodeList)
        }
    }
    return nodeList
}
```

###### 非递归的深度优先遍历

``` javascript
function DFS(node) {
    let nodes = []
    let stack = []
    stack.push(node)

    while(stack.length) {
        let item = stack.pop()
        let children = item.children
        nodes.push(item)
        // node = [] stack = [parent]
        // node = [parent] stack = [child3,child2,child1]
        // node = [parent, child1] stack = [child3,child2,child1-2,child1-1]
        // node = [parent, child1, child1-1] stack = [child3,child2,child1-2]
        for (let i = children.length - 1; i >= 0; i--) {
            stack.push(children[i])
        }
    }
    return nodes
}
```

##### 广度优先遍历

``` javascript
function BFS(node) {
    let nodes = []
    let stack = []
    stack.push(node)
    while(stack.length) {
        let item = stack.shift()
        let children = item.children
        nodes.push(item)
        // 队列，先进先出
        // nodes = [] stack = [parent]
        // nodes = [parent] stack = [child1,child2,child3]
        // nodes = [parent, child1] stack = [child2,child3,child1-1,child1-2]
        // nodes = [parent,child1,child2] stack = [child3, ...]
        for (let i = 0; i < children.length; i++) {
            stack.push(children[i])
        }
    }

    return nodes
}
```



### 链表

##### 链表的建立

``` javascript
class Node {
    constructor(data) {
        this.next = null
        this.data = data
    }
}

class List {
    constructor() {
        this.head = null
        this.length = 0
    }

    append(data) {
        let node = new Node(data)
        if (this.head) {
            let current = this.head
            while(current.next !== null) {
                current = current.next
            }
            current.next = node
        }
        else {
            this.head = node
        }
        this.length++
    }

    insert(data, position) {
        let node = new Node(data)
        if (position >= 0 && position <= this.length) {
            let currentNode = this.head
            let previousNode = null
            let index = 0
            if ( position === 0 ) {
                node.next = this.head
                this.head = node
            }
            else {
                while( index++ < position ) {
                    previousNode = currentNode
                    currentNode = currentNode.next
                }
                previousNode.next = node
                node.next = currentNode
            }
            this.length++
        }
    }

    size() {
        return this.length
    }

    isEmpty() {
        return this.length === 0
    }
}

let list = new List()
```

##### 反转单向链表

``` javascript
function reverseList(list) {
    let head = list.head
    let currentNode = head
    let pre
    while (currentNode) {
        let nextNode = currentNode.next
        currentNode.next = pre
         pre = currentNode
         currentNode = nextNode
    }
    return pre
}
```







## 排序

```javascript
let arr = [9, 8, 7, 6, 2, 3, 4, 5, 1, 10]

// 快速排序
// 先找一个中间数，把比它小的放a数组，大的放b数组。递归。
function quickSort(arr) {
    if (arr.length <= 1) return arr
    let pivotIndex = Math.floor(arr.length / 2)
    let pivot = arr.splice(pivotIndex, 1)[0]
    let [left, right] = [[], []]
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (item <= pivot) {
            left.push(item)
        }
        else {
            right.push(item)
        }
    }

    return quickSort(left).concat([pivot], quickSort(right))
}

//冒泡排序
function bubbleSort (arr) {
    let len = arr.length
    for (let j = 0; j < len - 1; j++) {
        for (let i = 0; i < len - 1 - j; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
            }
        }
    }

    return arr
}

//选择排序
function selectSort(arr) {
    let len = arr.length
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr
}
//插入排序
function insertSort(arr) {
    let len = arr.length
    for (let i = 1; i < len; i++) {
        let current = arr[i]
        let preIndex = i - 1
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex]
            preIndex--
        }
        arr[preIndex + 1] = current
    }

    return arr
}

```

## 编程题

##### 两数之和

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的**数组下标**。（leetcode.1 easy）

```javascript
// 使用Map而不是两个循环，空间换时间
function twoSum(arr, target) {
    const map = new Map()
    for (let i = 0; i < arr.length; i++) {
        let value = arr[i]
        let diff = target - value
        if (map.has(diff)) {
            return [map.get(diff), i]
        } else {
            map.set(value, i)
        }
    }
}

twoSum([1, 2, 3, 4], 7)
```



##### 三数之和

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出**所有满足条件且不重复的三元组**。(leetcode.15 medium)

**注意** 答案中不可以包含重复的三元组。

``` js
function threeSum(arr, sum = 0) {
    let res = []
    let n = arr.length
    arr.sort((a, b) => a - b) // 先排序
    for (let i = 0; i < n - 2; i++) {
        if (arr[i] === arr[i - 1]) continue // 去重
        // 两个指针不断向中间靠拢
        let l = i + 1
        let r = n - 1 
        while(l < r) {
            let m = arr[i] + arr[l] + arr[r]
            if (m === sum) {
                res.push([arr[i], arr[l], arr[r]])
                while(l < r && arr[l] === arr[l + 1]) l++ // 去重
                while(l < r && arr[r] === arr[r - 1]) r-- // 去重
                l++
                r--
            }
            if (m > sum) {
                r--
            }
            if (m < sum) {
                l++
            }
        }
    }
    return res
}
```



##### 四数之和

给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出**所有满足条件且不重复的四元组**。(leetcode.18 medium)

类似三数之和，外面多套一层循环即可，另外要注意重复的情况。

``` js
function fourSum(arr, sum) {
    let res = []
    let n = arr.length
    arr.sort((a, b) => a - b) // 先排序
    for (let j = 0; j < n - 3; j++) {
        if (arr[j] === arr[j - 1]) continue // 去重
        for (let i = j + 1; i < n - 2; i++) {
            if (i > j + 1 && arr[i] === arr[i - 1]) continue // 去重，注意 i > j + 1
            // 两个指针不断向中间靠拢
            let l = i + 1
            let r = n - 1 
            while(l < r) {
                let m = arr[j] + arr[i] + arr[l] + arr[r]
                if (m === sum) {
                    res.push([arr[j], arr[i], arr[l], arr[r]])
                    while(l < r && arr[l] === arr[l + 1]) l++ // 去重
                    while(l < r && arr[r] === arr[r - 1]) r-- // 去重
                    l++
                    r--
                }
                if (m > sum) {
                    r--
                }
                if (m < sum) {
                    l++
                }
            }
        }       
    }

    return res
}
```





##### n数之和

给定数组，取出 n 个数，使其相加和为 sum

``` js
function getArr(arr, n, m, temp = []) {
    if (temp.length === n) {
        let sum = temp.reduce((a, b) => a + b)
        if (sum === m) {
            return temp
        } else {
            return
        }
    }
    
    for (let i = 0; i < arr.length; i++) {
        temp.push(arr.shift())
        let ret = getArr(arr, n, m, temp)
        if (ret) {
            return ret
        } else {
            arr.push(temp.pop())
        }
    }
}


let myArr = [1, 2, 3, 4]
getArr(myArr, 2, 7, [])
```



##### 两数相加

给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。(leetcode.2 medium)

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

``` js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let carry = 0
    let res = new ListNode(-1)
    let cur = res
    while (l1 !== null || l2 !== null) {
        let v1 = l1 ? l1.val : 0
        let v2 = l2 ? l2.val : 0
        let sum = v1 + v2 + carry
        carry = sum >= 10 ? 1 : 0
        cur.next = new ListNode(sum % 10)
        
        cur = cur.next
        l1 = l1 ? l1.next : l1
        l2 = l2 ? l2.next : l2
    }
    if (carry === 1) {
        cur.next = new ListNode(1)
    }
    return res.next
};

// test
class ListNode {
    constructor(val) {
        this.val = val
        this.next = null
    }
}
const l1 = new ListNode(2)
l1.next = new ListNode(4)
l1.next.next = new ListNode(3)

const l2 = new ListNode(5)
l2.next = new ListNode(6)
l2.next.next = new ListNode(4)

addTwoNumbers(l1, l2) // 7 => 0 => 8
```



##### 无重复字符的最长子串

给定一个字符串，找出其中不含有重复字符的 **最长子串** 的长度。(leetcode.3 medium)

1 暴力破解（效率很低）

``` js
function getLength(str) {
    let length = 0
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
            if (isUnique(str, i, j)) {
                length = Math.max(length, j - i)
            }
        }
    }
    return length
}

function isUnique(str, i, j) {
    let set = new Set()
    while (i < j) {
        let char = str.charAt(i)
        if (set.has(char)) {
            return false
        } else {
            set.add(char)
        }
        i++
    }
    
    return true
}
getLength('aaabcdd')
```

2 **滑动窗口**

``` js
function getLength(str) {
    let n = str.length
    let set = new Set()
    let [len, i, j] = [0, 0, 0]

    while (i < n && j < n) {
        if (set.has(str.charAt(j))) {
            set.delete(str.charAt(i++))
        } else {
            set.add(str.charAt(j++))
            len = Math.max(len, j - i)
        }
    }
    return len
}
```



##### 判断回文数

回文，即正序和逆序相等的数，如12321，1221等。(leetcode.9 easy)

简单粗暴法，翻转字符串看是否相等

``` js
function isHuiWen(num) {
    return num == num.toString().split('').reverse().join('')
}
```

高级版

``` js
function isHuiWen(num) {
    // 数小于0，如-121则不为回文数。
    // 1000这种末尾为0的也不会是回文数
    if (num < 0 || (num % 10 === 0 && num !==0 )) return false 
    let revertNum = 0
    while (num > revertNum) {
        revertNum = num % 10 + revertNum * 10
        num = Math.floor(num / 10)
    }
    
    return num === revertNum || num === Math.floor(revertNum / 10)
}

isHuiWen(12321)
// 1232 1
// 123 12
// 12 123
// 12 === ~~(123 / 10)
```





##### 实现累加器(柯里化)

描述

```js
// 实现一个add方法，使计算结果能够满足如下预期：
add(1)(2)(3) = 6;
add(1, 2, 3)(4) = 10;
add(1)(2)(3)(4)(5) = 15;
```

实现

``` javascript
function sum (...args) {
    function fn(...newArgs) {
        return sum(...args, ...newArgs)
    }

  	// 重点是这个toString
  	// 当最后返回函数的时候，自动调用toString函数进行累加
    fn.toString = () => {
        return args.reduce((a, b) => {
            return a + b
        })
    }

    return fn
}
```

##### 实现repeat

描述

```javascript
function repeat(func, times, wait) {
  // TODO
}
const repeatFunc = repeat(alert, 4, 3000);
repeatFunc("hellworld");
//会alert4次 helloworld，每次间隔3秒
```

实现

一：使用setInterval

``` javascript
function repeat(fn, times, wait) {
    let timer
    let count = 0
    return function (...args) {
        if (times > 0) {
            fn(...args)
        }
        timer = setInterval(() => {
            if (count < times - 1) {
                fn(...args)
                count++
            }
            else {
                clearInterval(timer)
            }
        }, wait)
    }
}
```

二：使用async/await + setTimeout

``` javascript
function repeat(fn, times, wait) {
    async function func(...args) {
        for (let i = 0; i < times; i++) {
            fn(...args)
            await new Promise((resolve, reject) => {
                setTimeout(resolve, wait)
            })
        }
    }
    return func
}
```

##### 实现sleep函数

``` js
const sleep = (wait) => new Promise((resolve, reject) => {
    setTimeout(resolve, wait)
}) 

// 使用
async function test () {
	await sleep(1000)
	console.log('awake')
}
```



##### 实现LazyMan

注：微信事业群笔试题

描述

``` javascript
HardMan(“jack”) 输出:
I am jack

HardMan(“jack”).rest(10).learn(“computer”) 输出
I am jack
//等待10秒
Start learning after 10 seconds
Learning computer

HardMan(“jack”).restFirst(5).learn(“chinese”) 输出
//等待5秒
Start learning after 5 seconds
I am jack
Learning chinese
```

实现

``` javascript
class _HardMan {
    constructor(name) {
        this.tasks = []

        setTimeout(async () => {
            for (let task of this.tasks) {
                await task()
            }
        })

        this.tasks.push(() =>
            new Promise(resolve => {
                console.log(`I am ${name}`)
                resolve()
            })
        )
    }

    wait(sec) {
        return new Promise(resolve => {
            console.log(`//等待${sec}秒..`)
            setTimeout(() => {
                console.log(`Start learning after ${sec} seconds`)
                resolve()
            }, sec * 1000);
        })
    }


    rest(sec) {
        this.tasks.push(() => this.wait(sec))
        return this
    }

    restFirst(sec) {
        this.tasks.unshift(() => this.wait(sec))
        return this
    }

    learn(params) {
        this.tasks.push(() =>
            new Promise(resolve => {
                console.log(`Learning ${params}`)
                resolve()
            })
        )
        return this
    }
}

function HardMan(name) {
    return new _HarnMan(name)
}

// 解答分析：
// 1. 链式调用，每一个方法都返回this
// 2. 并不直接执行代码，而是使用SetTimeout，这样就先把想要执行的任务先放进队列再执行
// 3. sleep/wait 的使用，使用setTimeout，如果不用Promise把setTimeout包住，就无法堵塞后面代码的执行
// 4. 除了用Promise，也可以在每个任务中指定的调用下一个任务，如：
	next() {
        let task = this.tasks.shift()
        task && task()
    }

    wait(sec) {
      setTimeout(() => {
        //do something
        this.next()
      }, sec)
    }

```





## 面试题

##### 0.1 + 0.2 == 0.3为何为false

十进制的0.1转化为二进制的0.1时，得到一个无限循环小数。所以当使用有限的位数保存数字的时候，会产生精度的确实，最终的数只是0.1的近似数。

所以0.1和0.2的两个近似数相加，只能得到0.3的近似数。

##### 5升瓶子和6升瓶子装3升水

5L装满 -> 6L瓶子

5L再装满 -> 6L瓶子， 6L倒掉，5L瓶子的水 -> 6L瓶子

5L再装满 -> 6L瓶子

5L瓶子剩下3L水

##### 计算时针和分针的夹角

``` javascript
function getDegree(m, n) {
    let mDegree = m * 30 + n * 0.5
    let nDegree = n * 6
    let degree = Math.abs(mDegree - nDegree)
    if (degree > 180) {
        degree = 360 - degree
    }
    return degree
}
```



##### 概率题

100人教室60人喜欢足球，70人喜欢篮球，问同时喜欢足球和篮球的人数。

答：30到60人。最小值：60 + 70 - 100 = 30；最大值：交集，60。

100人班级60%喜欢足球，70%喜欢篮球，80%喜欢排球，问即三种球都喜欢占比有多少？

答：10到60人。最小值可以根据上一问的最小值来，已知同时喜欢足球和篮球的人数最少为30人，那么最小值：30 + 80 - 100 = 10人；而最大值还是三者的最大可能交集，60人。









## 网站优化

- 减少HTTP请求
  - 合并资源文件（CSS, JS, 雪碧图）
  - 压缩资源文件
  - 图片懒加载（借助IntersectionObserver）
  - 合理设置HTTP缓存， CDN缓存
- 首屏渲染优化
  - 代码分割，路由懒加载
  - 骨架屏
- 代码优化
  - 不用table （流式布局）
  - 不用with, eval
- CSS优化
  - CSS3（transform, opacity）硬件加速
  - 频繁操作DOM时，可以先用`display: none`使其脱离文档流再进行DOM操作
  - 对于复杂的动画效果，可以使用`position: absolute`使其脱离文档流
- JS优化
  - 函数防抖，函数节流



##### 图片懒加载

常规方法（使用offsetTop - scrollTop  或者 getBoundingClientRect()）

``` html
<body>
    <div class="blank">
		// 很长的元素，使图片开始不在视口里
    </div>
    <div class="image" data-url="C:/Users/Messiah/Pictures/image.png">
		// 想要懒加载的图片
    </div>
    <script type="text/javascript">
        let image = document.querySelector('.image')

        window.onscroll = throttle(() => {
            // 方法一，使用offsetTop - scrollTop
            if (image.offsetTop - document.documentElement.scrollTop <    document.documentElement.clientHeight)
            {
                let url = image.dataset.url
                image.style.backgroundImage = `url(${url})`
            }

            // 方法二，使用getBoundingClientRect
            if (image.getBoundingClientRect().top <       document.documentElement.clientHeight) {
                    let url = image.dataset.url
                    image.style.backgroundImage = `url(${url})`
                }
        }, 200)

		// 节流函数
        function throttle (fn, time) {
            let canRun = true
            return function () {
                if (!canRun) return false
                canRun = false
                setTimeout(() => {
                    fn()
                    canRun = true
                }, time)
            }
        }

    </script>
</body>

```

![https://zhuanlan.zhihu.com/p/55311726](https://pic1.zhimg.com/80/v2-af1ab0c5f34e468e8647135c1f9f51e4_hd.jpg)

offsetParent定义: 一个元素的已定位（position不为static）的父元素, 类似于绝对定位中已经定位的父元素，如果一个元素没有已经定位的父元素，则该元素的offsetParent为body。

此例子中image.offsetTop，image没有已经定位的父元素，则image的offsetParent为body。

如果我们的代码结构如下，

``` html
    <body>
        <div class="outer">
            <div class="blank">

            </div>
            <div class="image">

            </div>
        </div>

    </body>
```

滚动条在outer上，我们应该给outer加一个样式

``` css
.outer {
    position: relative;
}
```

那么，image.offsetParent就是outer，我们就可以继续使用以下代码来判断图片是否进入视口

``` javascript
image.offsetTop - outer.scrollTop < outer.clientHeight
```



**IntersectionObserver**

``` javascript
// 使用IntersectionObserver，十分方便
let io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        else {
            let el = entry.target
            el.style.backgroundImage = `url(${el.dataset.url})`
            io.unobserve(el)
        }

    })
})
io.observe(document.querySelector(".image"))
// <div class="image" data-url="https://xxx.com/1.jpg" ></div>
```

这个API同样能用来实现无限滚动（Infinity Scroll）



##### Base64

Base64就是用64个可见字符（26个大写字母，26个小写字母，10个数字，一个+号，一个/号共64个字符）来表示二进制的方法。

Base会将三个字节转化成四个字节，可以编码后的文本会比之前多三分之一左右。

例如 3 * 8 => 4 * 6 (前面加两个0变成8)



##### 雪碧图

合并HTTP请求，使用background-position来选择使用的图片。



##### setTimeout/setInterval和requestAnimationFrame

###### setTimeout/setInterval

`setTimeout(fn, n)`会在指定的时间n毫秒后，将指定的回调函数fn放进任务队列中，因此并不是n秒后就会执行回调函数。

`setTimeout(fn, 0)` 即使传参为0ms，最短其实为4 ms。

缺点: 一般显示器刷新频率为60HZ，即16.6ms刷新一次屏幕。setTimeout可能会掉帧。

###### requestAnimationFrame

``` javascript
function myAnimation() {
    // do something
    requestAnimationFrame(myAnimation)
}

requestAnimationFrame(myAnimation)
```

**它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次**



## Git

##### 常用命令

``` shell
git init # 初始化git仓库
git add # 将改动添加到缓存区（index）
git commit # 提交commit
git push # 推送给远程仓库
git pull # 拉远程仓库代码并合并(fetch + merge)
git clone # 拉仓库
git branch # 创建分支
git checkout <file> # 切换分支
git checkout -b <file> # 创建分支并切换过去
git checkout -d <file> # 删除分支
git merge # 分支合并
git rebase # 分支合并
git log # 查看 commit 记录
git status # 查看当前状态

# 其他命令
git rm --cached <file> # 若我们git add 一个文件，通过该命令可以取消该文件的追踪

git checkout -- <file>
# a文件若缓存区有缓存。当我们工作目录中修改a的内容，可以使用该命令删除我们的更改

git reset --hard HEAD^ # 撤销一个commit，HEAD^^为撤销两个
```



##### git object

``` shell
# 显示所有object
ls .git/objects/
10/ ea/ 1c/ ... /info /pack

# 查看object类型/值，常见类型：blob(git add 后创建), tree和commit(git commit 后创建)
git cat-file -t 58c9 
git cat-file -p 58c9 # 58c9为想找的object的值
```

[参考](https://zhuanlan.zhihu.com/p/96631135)



##### git merge VS git rebase 

这两种方法通常都是用于分支的合并，不过其原理是不同的。

![待合并项目](https://upload-images.jianshu.io/upload_images/305877-5dece524b7130343.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

比如该图，在Feature分支上改动，想要合并进Master分支。我们通常有两种方法:`git merge`和`git rebase`。

``` shell
git merge feature
# 或者
git rebase feature
```





![git merge](https://upload-images.jianshu.io/upload_images/305877-c4ddfcf679821e2f.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)



![git rebase](https://upload-images.jianshu.io/upload_images/305877-467ba180733adca1.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

git merge 保存了完成的历史记录，而git rebase 则尽量简化了历史记录（重写了历史记录）。





## WebSocket

基本用法

``` js
let ws = new WebSocket('ws://url.com:port')
ws.onopen = () => {}
ws.onclose = () => {}
ws.onerror = () => {}
ws.onmessage = (e) => {}

ws.send()
```



常用的WebSocket库有`socket.io`和`ws`， 基础用法类似，不过`ws`只能用于后端，前者可以用于前后端。

##### ws

``` js
// 前端使用原生Websocket Api
let ws = new WebSocket('ws://localhost:8080')
ws.onopen = () => {}
ws.onmessage = () => {}

// 后端
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
```

##### socket.io

``` html
<!-- 前端也需要引用socket.io库 -->
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>
```

``` js
// 后端
var io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
```





当正常情况下，若连接中断，我们需要重新进行连接。

``` js
ws.onclose = () => {
    reconnect()
}
ws.onerror = () => {
    reconnect()
}
```



##### 心跳包

正常情况下，连接中断会触发`onclose`事件，我们只需要在`onclose`事件中进行重连即可。

但如果是因为网络异常，或是信号不佳，则不会触发`onclose`事件，因此不会触发重连操作。如果我们定期向服务器发送消息，那么即使网络断开时没有触发`onclose`事件，因为我们定期的消息无法发往服务器，那么此时会触发`onclose`事件，来执行重连操作。



上文说的定期的向服务器发送消息就是心跳包，顾名思义，心跳包指像心跳一样，每隔固定的时间向服务器发送一次消息。



简陋的代码实现，只是用来展示大概的原理。

``` js
let ws = new WebSocket('ws://localhost:3001')
ws.onopen = () => {
    heartCheck.start()
}
ws.onmessage = (data) => {
    heartCheck.reset()
}
ws.onclose = () => {
    reconnect()
}
ws.onerror = () => {
    reconnect()
}

let heartCheck = {
    timeout: 60000, // 1分钟发一次
    timer: null,
    start() {
        this.timer = setTimeout(() => {
            ws.send('heart')
        }, timeout)
    },
    reset() {
        clearTimeout(this.timer)
        this.start()
    }
}
```







## Mysql

> 有待龟速更新

增

``` sql
INSERT INTO user VALUES(null, 'akara', 'root')
```

删

``` sql
DELETE FROM user WHERE user_id = '111'
```

改

``` sql
UPDATE user SET user_name = 'admin' WHERE user_id = '111'
```

查

``` sql
SELECT user_name, user_psw FROM user WHERE user_id = '111'
```



**Node中使用Mysql**

``` js
const mysql = require('mysql')
const bluebird = require('bluebird') // 非必须
const config = {
    host: 'localhost',
    user: 'user', // 数据库用户名
    password: 'password', // 数据库密码
    database: 'node', // 选中的数据库
}
let conn = mysql.createConnection(config)
conn = bluebird.promisifyAll(conn) // 非必须

conn.connect() // 好像不加这个也能用，建议加上

async function A() {
    let data = await conn.queryAsync('SELECT * FROM user')
    // do something
}
```

**联表查询**

比如我们有两个表user和question，大概结构如下

| user_id | user_name | user_psw |
| ------- | --------- | -------- |
| 1       | akara     | 123456   |

| q_id | q_title  | q_info   | user_id |
| ---- | -------- | -------- | ------- |
| 1    | 我是问题 | 我是描述 | 1       |

通过**内联表查询**，可以获得每个问题的提问人。

``` sql
SELECT u.user_name, q.q_title, q.q_info FROM user as u, question as q WHERE u.user_id = q.user_id
```





## 其他

##### 分号的问题

平时我写JavaScript代码的时候习惯不加分号，因为这样子代码看着更加简洁，不过有的时候必须得加

``` javascript
let y = 2
let x = 1
[y, x] = [x, y]
```

以上代码就被会当成

``` javascript
let y = 2
let x = 1[y, x] = [x, y]
```

##### forEach中的async

``` javascript
function handle(x) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(x)
		}, 1000 * x)
	})
}

async function test() {
    const arr = [4, 2, 1]
    arr.forEach(async item => {
        const res = await handle(item)
        console.log(res)
    })
}
// 等价于
async function test() {
    const arr = [4, 2, 1]
    async function A(item) {
        const res = await handle(item)
        console.log(res)
    }
    A(4)
    A(2)
    A(1)
}

```

期望的结果

``` js
4 
2 
1
结束
```

实际上的输出

``` js
结束
1
2
4
```

这是由于第一个函数的执行并没有阻塞第二个函数的执行。



**解决方案**

``` js
async function test() {
	let arr = [4, 2, 1]
    for (let i of arr) {
        let res = await handle(i)
        console.log(res);
    }
	console.log('结束')
}
```





##### 移动端300ms延迟

以前的移动端网页，点击事件会有个300ms的延迟，Fastclick库就是为了解决这个问题的。

不过现代化的浏览器已经没有这问题了。

``` html
<meta name="viewport" content="width=device-width, initial-scale=1">
```



##### 二维码登录流程

[流程](https://mp.weixin.qq.com/s/xVk2hGnBRRCgtL9tYWWarw)





## 参考链接

> 本博客攥写过程中所参考过的网站/博客，或是一些个人觉得十分有价值的网站。目前就放了几个链接，以后会把更多优质的链接放在下面



[ECMAScript 6 入门教程](https://es6.ruanyifeng.com/)

[前端面试查漏补缺](https://juejin.im/post/5c73347cf265da2dd773e7dc)

[前端工程师面试宝典](https://fecommunity.github.io/front-end-interview/)

[React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)

[这才是真正的Git——Git内部原理揭秘！](https://zhuanlan.zhihu.com/p/96631135)

[浏览器将标签转成 DOM 的过程](https://segmentfault.com/a/1190000018730884)

[探秘 flex 上下文中神奇的自动 margin](https://www.cnblogs.com/coco1s/p/10910588.html)

[神三元的博客](http://47.98.159.95/my_blog/)



## 写在最后

> 本博客的攥写初衷只是为了面试做准备，加深对自己过去所学的知识的印象与理解。随着文章越写越多，曾经一度挡在面前的难题也逐个消散，知识的积累逐渐由量变演变成质变，也终于可以说过去的所学也并非全是白费功夫了。
>
> 尽管我不如他人聪慧，也没有他们那般的毅力，我只是个单纯的普通人。从很久以前开始，就走过许许多多的弯路，曾陷入人生低谷，情绪一度格外抑郁且消沉，长时间的怀疑自己，怀疑人生。但我也确确实实努力过那么一阵子，就如同人生的阵痛一般，我时而清醒，时而消沉，但是脚下的路也确实是自己走出来的。我不会去后悔，人生的路在自己的脚下，未来也在自己的手里。如今的我已经改变不少，认识到责任感的重要性之后，我仿佛突然成为了一名正常人。或许大部分人都是被责任感所推动前行的生物，而没有责任心的过去，人生惬意潇洒，不用对任何事情负责，但是也仿佛缺少了什么一般。从此以后，我能不能把这条路贯彻下去，这依旧是一个很大的问题...
>
> 话题跑远了，我们还是回到正题。本博客的知识也许并没有研究的很深层，那也是因为我的水平不足所致。希望在未来的日子里自己也能够长期的更新。其实以前自己就搭过各种博客了，不过最后也没有去打理。希望这篇文章能够帮到读者，无论是新入门前端不知道该学什么，抑或是遇到了技术难题，或是准备前端面试的同学。当然，提到面试，目前还没有人要我，实在是十分的悲催。单纯就理论知识而言，我觉得我的基础还是可以的，可是实践项目上的缺失是我最大的缺点，平时也就写点各种小demo，实在是拿不出手。希望以后能够提高自己的项目经历，不然实在是贻笑大方，令人叹息。
>
> 最近疫情格外严重，逐渐由国内扩散到全世界。不得不说早期的自己格外的乐观，回头来看可以说是十分的打脸。如今也算是见证历史，就怕开学后所面对的风险会倍增。就个人而言，如果就这样被感染而死，确实有点悲催。世上还有许许多多有意思的事情等待着我，况且我也尚未报答所有爱我的，我爱的人。不过就算这样死了，也没什么好说的，事到如今我也算看过各种风景，哪怕有遗憾，也是没有办法的事情了。
>
> 其实疫情中发生了各种各样的事情，但我一直都没有发声。一方面是自己最近格外焦虑繁忙，而且自己的发声也没有人听得到。另一方面，现今社会的信息量太大，我们所看到的并非是全部的真实，除非了解全部真相，我觉得很难去进行发声。也正是因为信息量的巨大，导致现如今浑水摸鱼的人越来越多，很多时候甚至难以分辨出对方到底是不是反串黑。也许等我稳定下来之后，我才会有精力去把自己的各种所闻所想发布出来吧。
>
> 可是我现在尚未稳定，我渴望一个机会，让自己能够真正的被认同，被承认。让自己的内心可以真正的达成宁静和谐，与自然天然合一。
>
> 2020.3.7
>
> Akara