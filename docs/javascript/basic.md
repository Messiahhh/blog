# 基础知识

## typeof
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

## 基本包装类型

当我们使用`'1'.toString()`的时候，实际上发生了以下过程。

``` js
var s = new String('1');
s.toString();
s = null;
```

## 判断相等

1. `==` 会进行类型转换
2. `===` 不会进行类型转换，但是`NaN`不等于自身，以及`+0`等于`-0 `
3. `Object.is()` 完全相等

## nullish

`||` 用来判断`falsey`值，但有的时候我们的变量可能是0或者false。可以使用`??`来判断`nullish`值（`undefined`或`null`）





## 闭包

JavaScript采用的是词法作用域（或者叫静态作用域），也就是说**函数作用域的位置在声明函数的时候已经决定了**（注意只是决定了位置，函数只有调用的时候才会实际生成作用域）。

与之对应的是动态作用域（比如Bash脚本），此时**函数作用域的位置取决于调用该函数时的环境**。

另外，通常当一个函数调用完成后会销毁作用域以及作用域内部的变量，但是如果函数调用完成时内部的变量依然被外部引用了，那么该函数的作用域就不会被销毁。



从以上两点出发，就能理解何为闭包了。





## 位运算 

虽然日常编码中不一定会用到位运算，但在某些特定情况下位运算可能意外的好用。假设存在这样的场景，平台下不同用户可能具备不同功能的白名单，因此我们需要使用一个字段`features`来记录用户所具备的功能，在使用时根据这个字段来判断用户具备哪些功能。

首先，我们通过一个`Feature`对象定义了一组功能，并使用二进制来表示每个功能的值。

``` js
const Feature = {
	One: 0b01,
  Two: 0b10,
  Three: 0b100,
  Four: 0b1000,
}
```

那么假设用户具备了所有的功能，那么他的`features`字段的值应该是`0b1111`。



### 左移

上述的代码中`Feature`的定义有些繁琐，我们可以使用更简洁的写法：

``` js
let shift = 0
const Feature = {
	One: 1 << shift++,
  Two: 1 << shift++,
  Three: 1 << shift++,
  Four: 1 << shift++,
}
```

在这个例子中的`<<`被称作**左移运算符**，它表示把二进制的每一位都向左移动指定的位数。如对于`1 << 3`表达式，返回的是`0b1`左移3位后的结果即`0b1000`，也就是十进制的8。



### 右移

与左移运算符对应的，通过**右移运算符**`>>`可以返回二进制的每一位都右移指定位数的结果。如对于`8 >> 3`表达式，返回的是`0b1000`右移3位的结果即`0b1`，即十进制的1。



### 按位或

`0b0101`表示用户同时具备`Feature.One`和`Feature.Two`这两个功能，实际上这是这两个变量**按位或|**的结果。

``` js
const features = Feature.One | Feature.Three
```



### 按位与

为了了解用户是否具备`Feature.One`的功能，我们的目的是确认`features`的最后一位的值是否为1，通常可以使用**按位与&**来进行区分

``` js
const hasFeature = (feature & Features.One) > 0
```
