
### ES6基础
> 本文为初学前端时所写，未进行勘误便移植了过来，若有错误请见谅。

#### 一、JavaScript是单线程的，而浏览器是多线程的(解析JavaScript的主线程和其他的工作线程)

前半句应该很好理解，那后半句又是什么意思呢？

那么我们先来想象一下，**如果浏览器只有一条主线程**（用来解析JS）会怎么样。

```javascript
console.log("1")
Ajax("...", function (res) {
    console.log("2")
})
console.log("3")
```

如果只有主线程，那么会先输出１，**一定时间**后接收到响应，再依次输出２、３。而这里的一段时间，就造成了浏览器的阻塞。而事实我们也是清楚的，浏览器会先依次输出１、３，等接收到响应后再输出２，现实情况是并不会发生所谓的阻塞，这就是浏览器的工作线程的功劳。

这里先简单解释一下，当我们的主线程执行到AJAX的时候，I/O操作其实是交给了一个工作线程来处理的，这条工作线程专门用来处理AJAX，而主线程继续执行AJAX下方的代码，当工作线程中得知响应被接收了，就会通知主线程执行回调函数。（注：准确说是先放进任务队列中，晚点说）

因此回调函数的定义也就明确了，由工作线程通知主线程，在某个时间点会调用的函数，虽然大部分情况回调函数都是作为函数参数的存在，但也存在例外，比如

```
xhr.onreadystatechange = function () {

}
```

所以严谨来说不能说回调函数就是作为函数参数的函数。



我们再来考虑如何用callback封装一个AJAX。

```
function AJAX(callback) {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = JSON.parse(xhr.responseText)
            callback(res)
        }
    }
    xhr.open('', '', true)
    xhr.send()
}

Ajax(function (res) {
    console.log(res)
})
```

我们设外部函数自身是执行Ａ操作，内部函数是在执行Ｂ操作，那么从逻辑上看，　我们先进行了Ａ操作，在未来的某个时刻，通过回调的方式进行了Ｂ操作，因此从逻辑上是一种先后的关系。但我们实际的代码中，Ａ和Ｂ操作却是内外的包含关系，不符合直觉，特别是多层嵌套后代码难以审查维护，也就是俗称的回调地狱。所以我们需要一种优雅的方式来写异步。



用Promise改写AJAX。

```javascript
function Ajax() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)
                resolve(res)
            }
        }
        xhr.open('', '', true)
        xhr.send()
    })
}

Ajax().then((data) => {
    console.log(data)
})
```

通过Promise的方式，Ａ和Ｂ就形成了一前一后的关系，仿佛是同步的方式来写异步。

不过人们觉得全都是then，语义上比较模糊。刚好此时又出现了Generator，虽然Generator的初衷并非异步，但人们却爱上用它来处理异步。



### Generator

#### 语法

Generator是种特殊的函数，让我们直接上手看下哪里特殊吧。

##### **函数声明**

```javascript
function* A() {
    yield 'a'
    yield 'b'
    return 'c'
}
```

- 在function后面有个星号
- 函数内部使用了yield关键字

##### **函数调用**

```
var x = A()
console.log(x)
```

> Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，遍历器对象。

遍历器对象部署了next方法，调用next方法会返回对象，对象具有两个属性

```
x.next()
//{value: 'a'; done: false}
x.next()
//{value: 'b'; done: false}
x.next()
//{value: 'c'; done: true}
```

从现在来看，就是可以一个函数，可以调用，暂停，调用。



##### **给next传递参数**

`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

相当于在外面改变了函数内部的行为。

而这，也让Generator具有了代替回调地狱的功能。



#### 用Generator实现异步

```javascript
function Ajax() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)
                resolve(res)
            }
        }
        xhr.open('', '', true)
        xhr.send()
    })
}

function* use() {
    let data = yield Ajax('')
    console.log(data)
}

let obj = use()
obj.next().value.then((res) => {
    obj.next(res)
})
```



当然，唯一不好的地方就是我们需要自己手动的调用next方法，而如果引入co模块就能完美的解决这个问题。

引入co模块前后对比

```javascript
let obj = use()
obj.next().value.then((res) => {
    obj.next(res)
})
//引入前
=====
//引入后
co(use)
```

没错，co模块就是这么简单粗暴。

co模块的代码原理类似如下

```javascript
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

co(gen);
```





### Async

#### 语法

```javascript
async A() {
    let data1 = await Ajax('')
    let data2 = await Ajax('')
    return data2
}

A().then((data) => {
    console.log(data)
})
```

其实async可以看成Generator + co的集成，不同的是关键字分别用async和await代替了*和yield，　更加的语义化。除此之外，async函数会返回一个Promise对象。

##### 用Async实现Ajax封装

```javascript
function Ajax() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)
                resolve(res)
            }
        }
        xhr.open('', '', true)
        xhr.send()
    })
}

async use() {
    let data = await Ajax('')
    console.log(data)
}

use()
```







### demo，　来判断输出的顺序

```
//demo1

setTimeout(function(){
	console.log(1)
}, 0);
new Promise(function(resolve){
    console.log(2)
    resolve()
    console.log(3)
}).then(function(){
    console.log(4)
});
console.log(5);




//demo2

console.log(1);

setTimeout(function() {
  console.log(2);
}, 10);

new Promise(resolve => {
    console.log(3);
    resolve();
    setTimeout(() => console.log(4), 10);
}).then(function() {
    console.log(5)
})

console.log(6);


//demo3

new Promise(resolve => {
    resolve(1);
    Promise.resolve().then(() => console.log(2));
    console.log(3)
}).then(t => console.log(t));
console.log(4);
```

事件循环， macrotask, microtask

宏=》微=》宏=》微

整个代码块是一个宏任务，执行完再执行消息队列里的微任务，执行完全部微任务后再执行下一次宏任务

### class 语法

在es5中，想写一个类，必须要这样写。

```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
```

在es6中，引入了class关键字，不过说到底这只是一个es5的语法糖而已。

用es6语法改些上面的类

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

静态方法

```
class Foo {
  static classMethod() {
    return 'hello';
  }
}
//等价于
function Foo () {}
Foo.classMethod = function () {

}
```



#### 继承



es5

```
function People (name, age) {
	this.name = name
	this.age = age
}

People.prototype.getName = function () {
	console.log(this.name)
}

function Student (name, age, id) {
	People.call(this, name, age)
	this.id = id
}

Student.prototype.__proto__ = People.prototype
Student.prototype.getId = function () {
    console.log(this.id)
}
```

es6

```
class People {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    getName () {
        console.log(this.name)
    }
}

class Student extends People {
    constructor (name, age, id) {
        super(name, age)
        this.id = id
    }

    getId () {
    	console.log(this.id)
    }
}
```









### 模块化　

什么是模块化？为什么要模块化？举个最简单的例子，如果你写了一个库提供给其他人用，那么你所期待的是不会污染变量，只提供唯一的一个接口。比如引入jquery库的话，你就只需要接触$这个变量了， 也不用怕其他的细枝末节。

##### 立即执行函数

```
(function () {
	window.$ = xxx
})()
```

别人只需要把你的代码引入即可。

##### AMD模块化

想使用AMD模块化必须先引入require.js这个包。

使用**define**定义模块，使用**require**加载模块。

##### Commonjs规范

js文件就是模块，使用module.exports来设置对外暴露的值

```
//test.js
function A() {
	console.log('hello node')
}

module.exports = A
```

引入模块则使用require关键字（注：和AMD里的require不同）

```
//app.js (和test.js在一个目录下)

let A = require('./test.js')

A()//'hello node'
```

###### 问题1： module到底是什么，module.exports和exports有什么区别？

其实module和exports可以理解成一个js文件自带的对象，module.exports和exports这两个对象保存的地址是相等的，指向堆内存中的一部分。

我们可以实验一下，新建文件test.js

```
console.log(module);
console.log(exports);
console.log(module.exports === exports);

$node test.js
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: 'C:\\messiah\\test.js',
  loaded: false,
  children: [],
  paths: [ 'C:\\messiah\\node_modules', 'C:\\node_modules' ] }
  {}
  true
```

###### 问题2：require函数到底做了什么？

其实就是把被require的js文件中的代码放进了一个立即执行函数里，并return module.exports

比如test.js文件如下

```
var a = {
    name: 'xiaoming',
    age: 16
}

var b = '123';

```

1.js文件如下

```
var a = require('./test.js');
```

那么，1.js文件可以看成

```
var a = (function() {
    var a = {
        name: 'xiaoming',
        age: 16
    }

    var b = '123';

    return module.exports;
})()

```

这里也解释了为什么不要直接给exports赋值。因为我们知道，对象中保存的其实是指向堆内存中内存的地址。

补充：一般模块分为核心模块，第三方模块，本地模块。

核心模块比如http, fs, url等模块。第三方模块比如pm2 mysql等，第三方模块可以全局安装（npm install pm2 -g）和本地安装（npm install pm2）。本地模块就是自己写的模块。

当我们require模块的时候，加不加路径也是有区别的。

如果我们不加路径，比如require('http')，Node会依次在内置模块、全局模块和当前模块下查找模块。

加路径一般都是用来加载本地模块，比如require('./test')

##### UMD

上面提到了三种模块化的方案，那么如果能综合一下就好了，因此有了UMD模块化，结构一般如下。

```
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.jQuery);
    }
}(this, function ($) {
    //    方法
    function myFunc(){};

    //    暴露公共方法
    return myFunc;
}));
```

##### ES6模块

模块功能主要由两个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。是未来的方向，不过现在也不能直接用，需要用babel编译后才行。





#### Set, Map

##### Set

它类似于数组，但是成员的值都是唯一的，没有重复的值。

```
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

```
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

```
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

比如这里， Map实例m的一个键是对象o，键值微'content'。



#### Iterator/遍历器

JavaScript 原有的表示“集合”的数据结构，主要是数组（`Array`）和对象（`Object`），ES6 又添加了`Map`和`Set`。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是`Map`，`Map`的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

每一次调用`next`方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束。

下面是一个模拟`next`方法返回值的例子。

```
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

```
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

##### 调用 Iterator 接口的场合(不止以下的例子)

###### 解构赋值

```
对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。

let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];
```

###### 扩展运算符

```
扩展运算符（...）也会调用默认的 Iterator 接口。

// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

##### Array.from

`Array.from`方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

下面是一个类似数组的对象，`Array.from`将它转为真正的数组。

```
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

##### for...of 循环

一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。





#### 参考

[ECMAScript6入门-阮一峰](http://es6.ruanyifeng.com/)

[[JavaScript：彻底理解同步、异步和事件循环(Event Loop)](https://segmentfault.com/a/1190000004322358)](https://segmentfault.com/a/1190000004322358)

[macrotask和microtask](https://zhuanlan.zhihu.com/p/24460769)

[模块化-阮一峰](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)

[模块化-伯乐园](http://web.jobbole.com/82238/)

[Commonjs](https://zhuanlan.zhihu.com/p/26898693)
