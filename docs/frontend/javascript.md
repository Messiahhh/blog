---
sidebarDepth: 4
---
## JavaScript

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

##### nullish

`||` 用来判断`falsey`值，但有的时候我们的变量可能是0或者false。可以使用`??`来判断`nullish`值（`undefined`或`null`）



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
	if (typeof source === 'object' && source !== null) {
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

### Class

``` js
// 实例属性的新写法
class People {
    name
    age
    
    getName() {
        return this.name
    }
}

new People() // {name: undefined, age: undefined}

// 类似于

People.call({
    name: undefined,
	age: undefined,
    __proto__: People.prototype
})
```

在以往构造函数的写法中，实例的属性都是执行构造函数时添加的；而通过这种新写法，在执行构造函数之前，实例已经拥有该属性了（以上代码属性的值为`undefined`，我们也可以最开始的时候就赋值，如：

``` js
class People {
    name = 'akara'
    age = 996
}
new People() // {name: "akara", age: 996}
```

这也是为什么，在`TypeScript`中我们应该这样写

``` tsx
class People {
  name: string
  id: number

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
  }
}

// 而不是

class People {
  constructor(name: string, id: number) {
    this.name = name // Property 'name' does not exist on type 'People'
    this.id = id // Property 'id' does not exist on type 'People'
  }
}
```



##### class中的箭头函数

``` js
class People {
    name = 'akara'

	getNameA = () => {
        console.log(this)
    }
    
    getNameB() {
        console.log(this)
    }
}

const p = new People()  // {name: "a", getNameA: ƒ}

p.name
p.getNameA() // 实例p
p.getNameB() // 实例p
```

这里有几个注意的点

一：

`getNameA`是实例的方法，而`getNameB`是原型对象上的方法

``` js
getNameA: () => { console.log(this) }
name: "akara"
__proto__:
	constructor: class People
	getNameB: ƒ getNameB()
	__proto__: Object
```

二：

`p.getNameA`输出的是实例p，这可能并不符合我们的预期。

我们都知道，如果是下面这样的对象，输出结果应该会符合预期。因为箭头函数本身没有`this`值，那么需要输出`this`的时候就沿着作用域链寻找，也就找到了`window`

``` js
const obj = {
    name: 'akara',
    getNameA: () => {
    	console.log(this)  
    },
	getNameB: function() {
        console.log(this)
    }    
}
obj.getNameA() // window
obj.getNameB() // obj
```

既然如此，为什么通过class创建的实例的箭头函数，输出的`this`却是实例本身。简单来说，这是一个**特性**，或者说**JS引擎的机制**。

我们可以通过`babel`把代码编译成`es5`的代码，来破解其背后的玄机。

``` js
// es6
class People {
  name = 'akara'
  getName = () => {
    console.log(this.name)
  }
  
  getMyName() {
    console.log(this.name)
  }
}

// 通过babel编译后 (stage-1, stage-3)

class People {
  constructor() {
    _defineProperty(this, "name", 'akara');

    _defineProperty(this, "getName", () => {
      console.log(this.name);
    });
  }

  getMyName() {
    console.log(this.name);
  }
}
```











### 正则表达式

正则表达式中分组可以分为捕获分组和非捕获分组。

捕获分组很简单，用`()`来表示。

非捕获分组，则基本可以分为五种：

- `(?:)` 最基础也是最常见的非捕获分组。

  我们可以使用`(?:)`来进行非捕获的分组，因为很多时候我们需要使用分组，比如`(\d{3})+`，但我们又并不想捕获这个分组，这时候就可以使用`(?:)`了。

- `(?=)`零宽正向先行断言（zero-width positive lookahead assertion）。

- `(?!)`零宽负向先行断言。

- `(?<=)`零宽正向后行断言。

- `(?<!)`零宽负向后行断言。



零宽（zero-width）表示着它匹配的是一个位置，就像`^`或`$`又或者是`\b`一样，而不是匹配字符。

这里的**先行**，表示着位置的右边；**后行**表示着位置的左边。而**正向**和**负向**，则就是有与无的关系了。



另外默认情况下`.+`是会进行贪婪匹配，而量词后加上?会进行惰性匹配，比如`.+?`。

 


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



字符串的`match`可以获取所有匹配正则的结果，但获取不到对应的捕获值。通常想捕获都是用正则表达式的`exec`方法，但要捕获全部的话需要进行循环`exec`。

`es2020`新增了一个字符串方法`matchAll`，相当于循环执行了`exec`。

``` js
const reg = /[a-c]/g
const str = 'abc'
for (let i of str.matchAll(reg)) console.log(i)
```



##### 正则题目

###### 匹配URL参数

``` js
// 正则
function getUrlParams(name) {
    const reg = new RegExp(`(?:^|&)${name}=([^&]*)(?:$|&)`)
    const match = location.search.substr(1).match(reg)
    if (match) {
        return match[1]
    }
} 

function getUrl(key) {
    let map = {}
    let ret 
    const reg = /(?:^|&)(.*?)=(.*?)(?=&|$)/g
    const search = 'name=akara&age=21&type=normal&sex=male'
    while (ret !== null) {
        ret = reg.exec(search)
        if (ret) {
            map[ret[1]] = ret[2]
        }
    }
    return map[key]
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



###### 电话号码判断

``` js
const isPhone = (str) => {
    const reg = /^1[34578]\d{9}$/g
    return reg.test(str)
}
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
// 正则，注意使用到了?=先行断言，?:为非捕获，可加可不加
function format(num) {
    return num.toString().replace(/(?=(?<!^)(?:\d{3})+$)/g, ',')
}

// function format(num) {
//     const reg = /\d{1,3}(?=(?:\d{3})+$)/g
//     return num.toString().replace(reg, '$&,')
// }

// const format = (number) => {
//     const str = number + ''
//     return str.replace(/(?=(?!^)(\d{3})+$)/g, ',')
//     // return str.replace(/\d{1,3}(?=(\d{3})+$)/, '$&,')
// }

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



###### 替换元素

把非P元素替换成P元素 `<div></div> => <p></p>`

``` js
const replaceP = (str) => {
    return str.replace(/<(\/)?.*?>/g, '<$1p>')
}
```



###### 文章出现最多的单词

``` js
const wordOfArticle = (str) => {
    const reg = /(?=\b)(.+?)(?=\b)/g
    console.log(str.match(reg))
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

比如这里， Map实例m的一个键是对象o，键值为'content'。

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
        }
        xhr.setRequestHeader('Content-type', header)
        xhr.send(data)
    }
}

Ajax.get = (url, callback) => {
    return Ajax({
        url
    }, callback)
}


Ajax.post = function (url, data, callback) {
    return Ajax({
        method: 'post',
        url,
        data,
    }, callback)
}

Ajax.get('http://localhost:3000/getData', (res) => {
    console.log(res)
})
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

通常我们可以使用`Content-Disposition: attachment`响应头部来下载资源。

不过似乎我们只能靠`a`标签/`form`表单/`window.open`来下载资源，如果使用`ajax`/`fetch`请求资源，并不会默认下载资源。

不过想要使用`fetch`来下载资源依然是有办法的。

``` js
fetch()
.then(res => res.blob())
.then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'example.xlsx';
    a.href = url;
    document.body.appendChild(a);
    a.click();
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

### Decorator

``` js
// 1. 用于class
// target表示类本身
function setClassProperty(target) {
   target.n = 'akara'
}

@setClassProperty
class People {
   
}

console.log(People.n) // akara

// 2. 用于类方法
function log(target, key, descriptor) {
   const fn = descriptor.value
   descriptor.value = function (...args) {
       console.log(`calling ${key} with args: ${args}`)
       return fn.apply(this, args)
  }
   return descriptor
}

class People {
   constructor(name, age) {
       this.name = name
       this.age = age
  }

   @log
   getName() {
       return this.name
  }
}

const p = new People('akara', 20)
console.log(p.getName())

// 3. 用于实例属性
// 装饰实例属性的时候，descriptor有个属性为initializer
// 通过修改这个函数的返回值，实例化时的属性值也不同
function test(target, key, descriptor) {
   const fn = descriptor.initializer
   descriptor.initializer = function () {
       const v = fn.apply(this)
       const randomNumber = ~~(Math.random() * 1000)
       return `${v}-${randomNumber}`
  }
}

class People {
   @test
   name = 'akara'
}

const p = new People()
console.log(p.name)
```



``` js
// 执行顺序 1 3 4 2
function f() {
  console.log(1);
  return function (
    target,
    key,
    descriptor,
  ) {
    console.log(2);
  };
}

function g() {
  console.log(3);
  return function (
    target,
    key,
    descriptor,
  ) {
    console.log(4);
  };
}

class C {
  @f()
  @g()
  method() {}
}

// @f @g test 相当于数学中的 f(g(test))
```

