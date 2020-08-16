---
sidebarDepth: 4
---
## CSS
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
（注：img标签可以设置宽高，但其display属性的值为inline而不是inline-block，不过它确实兼具二者的特性
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