## SASS

> Leader叫我看，立刻拥抱sass

### 层次嵌套

``` scss
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
```

### 父选择器 `&`

``` scss
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
  body.firefox & { font-weight: normal; }
}
```

### 嵌套属性

``` scss
nav {
  border: {
  style: solid;
  width: 1px;
  color: #ccc;
  }
}
```



### 变量 `$`

``` scss
$width: 5em;

#main {
  width: $width;
}
```



### 混合器

如果你的整个网站中有几处小小的样式类似（例如一致的颜色和字体），那么使用变量来统一处理这种情况是非常不错的选择。但是当你的样式变得越来越复杂，你需要大段大段的重用样式的代码，独立的变量就没办法应付这种情况了。你可以通过`sass`的混合器实现大段样式的重用。



``` scss
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}
```



### 给混合器传参

混合器类似一个纯函数，默认情况无参数，因此总是返回同样的结果。

我们可以通过传递参数来生成不同的样式结果。



``` scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}

a {
  @include link-colors(blue, red, green);
}
```





### 默认参数值

``` scss
@mixin link-colors(
    $normal,
    $hover: $normal,
    $visited: $normal
  )
{
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

如果像这样调用：`@include link-colors(red)` `$hover`和`$visited`也会被自动赋值为`red`



### 继承



