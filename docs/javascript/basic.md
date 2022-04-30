# 基础

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

















