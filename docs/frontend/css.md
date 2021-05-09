---
sidebarDepth: 4
---
## CSS
### 基础

##### 选择器

1. 标签选择器，如`div`
2. ID选择器，如`#root`
3. class选择器，如`.container`
5. 子代选择器，父子关系，如`div > p`
6. 后代选择器 ，可以是爷爷和孙子的关系，如`div p`
7. 相邻兄弟选择器，如`div + p`， 选择紧邻着div后面的p
8. 属性选择器，如`[type=input]`
9. 伪类选择器，如`:hover`
9. 通配符选择器，`*`



`:first-child`和`:first-of-type` 不要混淆了

`p:first-child`，只有当一个p元素是其父元素的第一个子元素时，才应用对应的样式。

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



##### 选择器优先级

!important > 内联样式 > ID选择器 > class选择器 > 标签选择器 > 通配符（*） > 浏览器默认样式 > 继承样式



##### 继承样式

常见的继承属性：

1. `font`系列，如`font-weight`， `font-style`， `color`等
2. `visibility`
3. `line-height`

> 注意：`background` 和 `opacity`不是继承属性。



##### display

常用`display`属性有`block`、`inline`、`inline-block`、`flex`等

**block（块级元素）**：`div`, `h1`~`h6`, `p` 等

如`div`，`h1~h6`，`p`，`header`等

1. 可以设置`width`和`height`属性 
2. 元素独占一行，**会**自动根据父元素计算出元素的宽度

**inline（行内元素）**

如`a`，`span`，`img`等，文本也是行内元素

1. 不可以设置`width`和`height`属性 
2. 元素不会独占一行

> `img`有点特殊。在浏览器控制台可以看到其`display`为`inline`，但它实际的表现更贴近`inline-block`，
>
> 比如它实际上可以设置`width`和`height`属性

**inline-block** 

如`input`

兼具了`block`和`inline`的特性

1. 可以设置`width`和`height`属性 
2. 元素不独占一行，**不会**自动根据父元素计算出元素的宽度



由此我们可以知道，对于一个`block`元素，如果我们没有手动设置它的宽，那么它的宽将会**由父元素决定**；而对于一个`inline-block`元素，如果我们没有手动设置它的宽，那么它的宽将会由**子元素决定**。

> 补充：`inline`和`inline-block`可以设置`padding`和`margin`，但无法通过像`block`一样使用`margin: 0 auto`做到水平居中。





##### 盒模型

 讨论到盒模型，除了核心的`content -> padding -> border -> margin`，另一个要点就是元素的`box-sizing`属性。

浏览器默认的`box-sizing: content-box`，这意味着当我们设置元素的`width`，实际上是在设置`content`的长度。此时盒子的实际长度等于`content(width) + padding + border `

我们可以修改`box-sizing`为`border-box`，此时我们的`width`等于`content + padding + border`



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



##### 文本与换行

[参考文章](https://www.jianshu.com/p/215654c0b03d)

对于浏览器的文本，不同语言的文本在换行时采用的规则不一样。根据换行时的行为差异，可以把文本分为两类：

1. CJK文本，即中文、日文和韩文
2. Non-CJK文本，比如我们用的最多的英文

> 在默认情况下，即`word-wrap: normal`, `word-break: normal`, `white-space: normal`时，CJK文本可以在任意2个字符间断行，而英文只能在空白符处断行。

``` html
<body>
	<div>
        <a>苹果</a>
        <a>草莓</a>
        <a>香蕉</a>    
        <a>橘子</a> <!-- 额外补充，如果设置成inline-block，也可以实现文本不分割的效果 -->
        
        <br />
        
        <a>aaa</a>
        <a>bbb</a>
        <a>ccc</a>    
        <a>ddd</a>
    </div>    
</body>
```

橘子一词可能被分割开成`橘 子`

> 苹果 草莓 香蕉 橘
>
> 子

`ddd`一词不会被分割开成`d dd`

> aaa bbb ccc 
>
> ddd

###### word-break

> 如果我们想要CJK文本表现的和非CJK文本一样或者想要非CJK文本表现和CJK文本一样要怎么办呢？`word-break`属性就是来处理这种情况。默认情况下`word-break: normal`，CJK文本和非CJK应用自己的默认换行规则。设置为`word-break: break-all`后，非CJK文本会应用CJK文本的换行规则，可以在任意位置断行。而设置`word-break: keep-all`后，CJK文本会应用非CJK文本的换行规则，只能在空白处断行。

###### word-wrap

> `word-wrap`属性用来处理这样的情景：一个不可分割的字符串过长，超过容器盒的宽时应该如何处理？在默认情况下(`word-wrap: normal`)，字符串超出了容器盒的宽，不会断行。当设为`word-wrap: break-word`时，过长的字符串会发生断行。

###### white-space

> `white-space`属性是用来设置针对空白符的处理规则。其中`white-space: nowrap`会使文本中换行无效。这一规则优先于上面提到的规则。所以在`white-space: nowrap`时，无论是设置了`word-break: break-all`还是设置了`word-wrap: break-word`，文本都不会换行。





### CSS3

> 计划今后逐渐在本节介绍一些有意思的CSS3属性，个别属性可能需要使用`-webkit-`前缀

##### `background-clip`

表示图片裁剪范围，默认值是`border-box`，有意思的是我们可以把它的值设置为`text`，即把背景裁剪到字体身上。

``` html
<style media="screen">
    .gradient-text {
        background: -webkit-linear-gradient(pink, red);
        -webkit-background-clip: text;
        color: transparent;
    }
</style>
<p class="gradient-text">Gradient text</p>
```



##### `clip-path`







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



### Grid

`Flex`是通用的一维布局方案，可以解决绝大多数布局问题。`Grid`是二维布局方案，在某些场景下使用可能有奇效。

我们通常使用`grid-template-rows`、`grid-template-columns`来划分网格轨道，从而把项目分割成一个个的网格，同时可以使用`grid-template-area`把多个不同网格用同一个符号标识。这三个属性的缩写为`grid-template`。对于这样的网格，我们称之为**显式网格**。

某些时候，比如当实际的网格数量大于预设的显式数量，又或者当某个网格项被放置在显式网格之外，这时候就会自动生成新的网格轨道，这就是**隐式网格**。对于隐式网格我们可以使用`grid-auto-row`、`grid-auto-column`来指定网格轨道的宽高，还可以使用`grid-auto-flow`控制网格的排序方式。

对于以上介绍的六个属性，我们可以使用`grid`进行简写。它的值有三种写法：①和`grid-template`一致，只用来表示显式网格。②`grid-template-rows / [auto-flow && dense?] grid-auto-column`。③`[auto-flow && dense?] grid-auto-row / grid-template-columns`。这里的`auto-flow`指的是`grid-auto-flow`的值，当`auto-flow`写在`/`号前面表示`grid-auto-flow: row`，当`auto-flow`写在`/`号后面表示`grid-auto-flow: column`。













### 常见布局方案

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

### PC与移动端

首先有个现象需要知道。在PC浏览器中，当内容的宽大于`viewport`的宽时，我们可以看到横向的滚动条；而在手机浏览器中表现是不同的，此时当内容的宽大于`viewport`的宽时，我们的手机屏幕依然能够显示这些内容（没有滚动条）。更加具体地说，我们知道IphoneX的像素宽为`375px`，无论我们的`html`有没有加`meta`头部，只要`html`内容宽度小于某个较大的数值，整个手机屏幕都可以放下内容（没有滚动条）；只有当`html`内容宽度大于那个数值，我们才能够看到滚动条。这个现象可以自行验证。



如果我们写了一个不带`meta`头部的`html`页面，并在手机浏览器打开，可能会觉得页面呈现出的效果完全不符合预期，甚至可以说得上诡异。

我们现在开发手机页面基本上必须带上`meta`头部，那为什么不带这个头部时，浏览器表现的这么奇怪呢？

``` html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

这是有历史原因的，我们知道，智能手机的诞生要远远晚于PC浏览器。而智能手机诞生后，为了能更方便的浏览当时的页面（当时页面普遍宽980px左右），手机浏览器的默认`viewport`也被设置成了980px。`viewport`980px意味着在小小的手机屏幕上放置了过量的内容，所以那个时候我们需要使用双指缩放整个页面，然后滑动手指来阅读页面。

因此，现代的移动端页面都应该带上`meta`，根据当前的移动设备来设置`viewport`，比如手机是IphoneX的话，`viewport`就会被设置为375px。





想要开发一个现代化的、用户体验良好的网站，最重要的就是满足以下设备浏览器的适配：①PC，②Ipad，③手机。

我们可以通过PC浏览器访问知名的站点，比如B站、知乎、Github、V2ex等，再不断调整浏览器`viewport`，从而观察这些网站是如何适配不同的设备的。

##### PC -> Ipad

通过观察上述的几个站点首页，能够发现他们存在一个相似点：页面都存在**留白区域**，并且基本上页面主体内容在中间，左右留白。而这些留白区域主要是依靠`margin: 0 auto`或`flex`等方法来实现的。

当我们通过调整浏览器的可视区域来缩小`viewport`，比如从最初的`1920px`缩短至`1030px`左右（后者的值接近Ipad的`viewport`，数值上下略有浮动），这些留白部分也随之变少，直到消失。

而我们的主体内容几乎没有变化，从而实现了**PC端向Ipad端的适配**。

> 像知乎，腾讯课堂。当viewport缩放到1030px左右，主体内容已经被遮挡住一些了，所以无法直接适配Ipad。当我们用Ipad访问这两个网站时，可以很清楚的发现**页面重置**了一下，大概是开发者修改了Ipad的viewport从而容纳更多的内容

##### Ipad -> Phone

当我们继续调整浏览器的可视区域，从`1030px`左右缩短至`400px`左右（大部分手机的`viewport`在这个值附近浮动），**理论上可以直接实现Ipad端向移动端的适配**。

但这有个前提是我们手机`400px`的`viewport`可以容纳原本`1030px`乃至`1920px`才放得下的内容，`1920px`可以通过减少留白区域这种取巧的方式来实现向`1030px`的适配，但`1030px`已经填满了内容，很难再继续直接适配`400px`了。

我们用Ipad打开B站，它的首页可以容纳三十张左右的图片，但我们不可能在手机上放下这么多的内容——那用户体验也太差了。

因此B站实际上分别为了PC和移动端维护了一份代码。当我们访问`bilibili.com`时，服务器根据我们的请求头来识别这个请求是来自PC浏览器还是手机浏览器。如果是手机浏览器，它就会使我们跳转到`m.bilibili.com`，从而给我们移动端的页面。

> 当我们将`viewport`从`1030px`左右逐渐缩短，页面会出现横向的滚动条，这是因为B站的PC页面设置了`min-width`。



B站无法直接实现Ipad向移动端的适配，主要原因是页面的内容太多，特别是有许多图片。

除了额外写一套代码来适配移动端，对于没有太多内容的网站来说，可以借助媒体查询和响应式来实现**Ipad端向移动端的适配**。具体的例子有Github，Vuepress、Firefox等，更多其他的媒体查询例子可以在[该网站](https://mediaqueri.es/)找到。



##### vw 和 rem

1. `1em`等于一倍父元素的字体的大小
2. `1rem`等于一倍根元素（`html`标签）的字体的大小
3. `1vw`等于`1%`的`viewport`宽
4. `1vh`等于`1%`的`viewport`高



开发移动端页面时，需要注意的是不同手机设备的`viewport`都是有差异的。所以我们通常不会给元素一个固定像素的宽高，比如`50px`这种。否则可能页面在A手机上显示正常，再B手机上又不符合预期。

所以我们需要一个相对于`viewport`的单位，也就是`vw`了。



而以前使用`rem`来写移动端主要是**历史原因**了，早年各大浏览器对`vw`的单位还远不如今天这么完美。

以前的移动端开发通常使用`rem`单位配合淘系团队的`flexible.js`使用，`flexisble.js`这个库简单来说就是根据设备的不同，为根元素设置不同的`font-size`。又因为我们使用了`rem`单位，所以元素大小就和`viewport`相关联了。

总的来说就是以后只用`vw`就行了。



### 主流站点布局

> 通过观察各大主流网站的布局，熟悉流行的布局方案
>
> 待更新...

##### B站

头部借助`flex`实现弹性伸缩：内容小于容器（即`viewport`）时，因为使用了`space-between`，可以看到很多空白内容；内容大于容器时，使用`flex-shrink: 1`使搜索框宽度变小。

主体使用了`margin: 0 auto`；除此之外还借助媒体查询，当`viewport`越来越小，首页的内容也会动态删减，并且会逐步减小内容的宽度。

``` css
@media screen and (max-width: 1438px)
.b-wrap {
    width: 999px;
}

@media screen and (max-width: 1654px)
.b-wrap {
    width: 1198px;
}

@media screen and (max-width: 1870px)
.b-wrap {
    width: 1414px;
}

.b-wrap {
    width: 1630px;
    margin: 0 auto;
}
```



页面设置了`min-width`，因此当`viewport`小于`1030px`左右时，会出现横向的滚动条。手机端使用的是另一套代码。

##### 知乎

头部使用`margin: 0 auto`，同时借助`flex`实现弹性伸缩：内容小于容器（即`viewport`）时，使用`flex-grow: 1`占据剩余空间；内容大于容器时，使用`flex-shrink: 1`使搜索框宽度变小。

主体使用定宽加上`margin: 0 auto`

##### V2ex

头部和主体都使用`margin: 0 auto`，同时主体使用`max-width`搭配`min-width`实现右边栏定宽的两列布局



### CSS模块

形如`xx.module.css`的文件通常称为css模块。

``` css
.Root {
    color: pink;
}
```

``` js
import style from './style.module.css'

function App() {
    return <div className={style.Root}></div>
}
```







### Better-Scroll

``` bash
npm i @better-scroll/core -S
```

`better-scroll`主要用于解决移动端的滚动需求。提供了让滚动元素显得有弹性、下拉加载或上拉加载等功能。

``` jsx
import BScroll from '@better-scroll/core'
function App() {
    const myRef = useRef(null)
    useEffect(() => {
        const bs = new BScroll(myRef.current, {})
        return () => {
            bs.destroy()
        }
    }, [])
    return (
        <div className="wrapper" ref={myRef} >
            <div className="content">
                <div className="item">item1</div>
                <div className="item">item3</div>
                <div className="item">item4</div>
                <div className="item">item2</div>
                <div className="item">item5</div>
            </div>
        </div>
    )
}
```

使用`better-scroll`时，两大要点：

1. `wrapper`使用`overflow: hidden`
2. `content`的高或宽要大于`wrapper`的，才会有滚动条和滚动效果

##### 事件派发

``` js
bs.on('scrollStart', () => {}) // 开始滚动时触发
bs.on('scroll', () => {}) // 滚动过程中持续触发 
bs.on('scrollEnd', () => {}) // 结束滚动时触发
```

其中`scroll`由于会持续触发，可能对性能产生影响，所以默认情况下`scroll`事件不会触发。

我们可以设置`probeType`配置项来改变该行为，比如`probeType: 3`来使任何时候都派发`scroll`事件。

``` js
new BScroll(el, {
    probeType: 3
})
```





##### 插件

BetterScroll`1.0`版本一个包涵盖了所有的功能，体积因此也比较大，所以`2.0`版本把核心功能都封装进`@better-scroll/core`，我们可以按需引入特定的插件。

引入插件后，我们需要先通过`BScroll.use(plugin)`注册插件，之后实例化BetterScroll就可以传入插件相关的配置项，并且`bs.on()`可传进去的参数也会变多，如`bs.on('pullingDown')`。

###### pulldown

`pulldown`插件提供了下拉的功能，可以实现下拉刷新。

``` bash
npm install @better-scroll/pull-down --save
```

``` jsx
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
BScroll.use(PullDown)

const sleep = async (duration) => new Promise((resolve) => setTimeout(() => resolve(), duration))

function App() {
    const myRef = useRef(null)
    const [beforePulling, setBeforePulling] = useState(true)
    const [isPulling, setIsPulling] = useState(false)

    useEffect(() => {
        const bs = new BScroll(myRef.current, {
            pullDownRefresh: {
                threshold: 70,
                stop: 56,
            },
        })
        bs.on('pullingDown', async () => {
            setBeforePulling(false)
            setIsPulling(true)
            await sleep(1000)
            setIsPulling(false)

            bs.finishPullDown()
            setTimeout(() => {
                setBeforePulling(true)
                bs.refresh()
              }, 800)

        })

        return () => {
            bs.destroy()
        }
    }, [])
    return (
        <div className="wrapper" ref={myRef} >
            <div className="content">
                <div className="pulldown">
                    {
                        beforePulling ? (
                            <span>下拉刷新页面</span>
                        ) : isPulling ? (
                            <span>刷新中</span>
                        ) : (
                            <span>页面刷新成功</span>
                        )
                    }
                </div>
                <div className="item">item1</div>
                <div className="item">item2</div>
                <div className="item">item3</div>
                <div className="item">item4</div>
                <div className="item">item5</div>
            </div>
        </div>
    )
}
```

``` css
body, ul, li {
  margin: 0;
}

.wrapper {
  width: 800px;
  height: 800px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}


.item {
  height: 400px;
  text-align: center;
  line-height: 400px;
}

.item:nth-child(2n) {
  background: skyblue;
}

.item:nth-child(2n+1) {
  background: tomato;
}

.pulldown {
  position: absolute;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  color: #999;
  transform: translateY(-100%)  translateZ(0)
}
```







### 常见问题

##### BFC

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

##### 清除浮动

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

##### display/visibility/opacity

`display: none，visibility: hidden, opacity: 0`三者的区别：

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

##### 文本溢出

**单行文本**

``` css
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

**多行文本**





##### 行内元素的间隙

两个`inline`或`inline-block`元素中会产生间隙。

``` html
<div>
    <span>item</span> 
    <span>item</span>
</div>
```

可以看作是`<span>item item</span>`

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



