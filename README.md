# Akara的前端复习笔记

[TOC]



## ES6

##### 数组

```javascript
// 1.判断数组

var arr = []

arr instanceof Array

Array.prototype.isPrototypeOf(arr)

arr.constructor === Array

Object.prototype.toString.call(arr) === "[object Array]"

Array.isArray(arr)


//2.转化为数组 （类数组对象以及部署了遍历器接口的对象）

var set = new Set([1, 2])

Array.from(set)

[...set]

Array.prototype.slice.call(arguments) // 类数组对象



//3.数组去重
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

//数组扁平化

var arr = [1, 2, [3, [4, 5]]]

arr.flat(Infinity)

// reduce 实现 map
Array.prototype._map = function (fn) {
    let result = []
    this.reduce((total, current, index) => {
        result.push(fn(current))
    }, [])
    return result
}
```

##### 对象

```javascript
// 深拷贝
// 1.判断属性是对象还是函数
// 2.数组或是对象
// 3.判断是否为对象的isObject
// 4.WeakMap 实现 循环引用的检测

function deepClone(source, hash = new WeakMap()) {
    let target
    if (hash.has(source)) {
        return hash.get(source)
    }
    if (typeof source === 'object') {
        target = Array.isArray(source) ? [] : {}
        hash.set(source, target)
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = isObject(source[key]) ? deepClone(source[key], hash) : source[key]
            }
        }
    }
    else {
        target = source
    }
    return target
}

function isObject(obj) {
    return (typeof obj === "object" || typeof obj === "function") && obj !== null
}
var obj = {}
obj.a = obj

deepClone(obj)


//深拷贝
//只能用于对象内部没有方法时
JSON.parse(JSON.stringify(obj))
```

##### 函数防抖

```html
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

##### JS实现bind函数

```javascript
Function.prototype._bind = function (context, ...args) {
    return (...newArgs) => {
        this.call(context, ...args, ...newArgs)
    }
}
```



## 浏览器渲染机制

1. 浏览器解析HTML，生成DOM树。解析CSS，生成样式树。
2. 浏览器将DOM树和样式树结合，生成渲染树。
3. 布局：浏览器获取每个渲染对象的位置和尺寸。
4. 绘制：将计算好的像素点绘制到屏幕。

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



## 客户端存储

##### LocalStorage

​	**持久化的本地存储，除非主动删除，否则数据不会过期。**

##### SessionStorage

​	**会话结束（关闭页面）后，数据清除。**

##### Cookie 

​	浏览器发送HTTP请求时，先检查是否有相应的Cookie，如果有则将Cookie放在请求头中的Cookie字段中发送。

1. expires: 设置Cookie的过期时间
2. secure: 当secure为true时只能使用https
3. httpOnly: 设置浏览器能否读取Cookie
4. domain和path: 限制Cookie能被哪些URL访问



##### Session

1. Cookie设置在浏览器，Session设置在服务端。




##### JWT （JSON Web Token）

用来做鉴权，Session中数据保存在服务端，在使用服务器集群的时候很麻烦；而JWT保存在客户端。


## 前端安全（XSS和CSRF）

##### XSS（csoss-site scripting 跨站脚本攻击）

类型：

1. 反射型XSS

   将用户的输入反射给浏览器。

2. 存储型XSS

   将用户的输入存储在服务器。

3. 基于DOM的XSS

   类似于反射性XSS，但是与服务端并不交互。

   ​

##### XSS的防御，在数据输出时进行检测

XSS的本质是一种“HTML注入”，用户的输入数据被当成HTML代码的一部分来执行。

1. 在HTML标签或属性中输出数据，使用HTMLEncode，将字符转化为html实体字符。通常转化& < > " ' / 这几个字符。
2. 在Script标签或事件中输出数据，使用JavaScriptEncode，使用转义符 \ 对特殊字符转义。除了数字和字母，对小于127的字符编码使用\xHH表示，对大于127的字符用Unicode表示。



其他：Cookie设置为HttpOnly也可以防止XSS劫持Cookie



##### CSRF（Cross-site request forgery 跨站请求伪造）

要完成一次CSRF攻击，受害者必须依次完成两个步骤：

　　1.登录受信任网站A，并在本地生成Cookie。

　　2.受害者访问危险网站B， 网站B中发送请求给网站A，请求会自动带上Cookie。

##### CSRF的防御

1. 验证码（因为CSRF的攻击往往在受害者不知情的时候成功）

2. 检查Referer（通常网站的页面与页面之间有一定的逻辑联系）缺陷：某些情况下浏览器不会放松Referer

3. Token

   CSRF的本质在于**请求的参数可以被攻击者猜到**

   Token是一个随机数，同时存放在表单和用户的Cookie中，发送请求后服务器对请求实体的token和cookie中的token进行对比。



## 事件循环

##### 宏任务（macroTask）和 微任务（microTask）

macroTask: setTimeout， setInterval，setImmediate(Node专有)， I/O 操作，定时器

microTask: promise.then等

process.nextTick的任务放在NextTick队列里，类似于微队列，但在微队列前执行。



浏览器通过主线程和工作线程实现事件循环。

Node通过libuv来实现事件循环。



##### 浏览器事件循环

执行宏队列中的第一个宏任务 => 执行微队列中的所有微任务 => 执行宏队列中的下一个宏任务 => 执行微队列中的所有微任务 ...

##### Node中的事件循环

Node事件循环一共有六个阶段，每个阶段中都有一个宏队列，必须执行完一个阶段中宏队列内的全部宏任务，才回去执行所有微任务。

六个阶段：

1. Timer: SetTimeoute和SetInterval的任务放进这个阶段的宏队列执行。
2. pending callback: 执行一些系统操作的回调，例如TCP的错误。
3. idle, prepare: 内部调用。
4. poll: 大部分回调在这里调用。
5. check: SetImmediate的任务放进这个阶段的宏队列执行。
6. close callback: 一些结束时的回调，例如Socket.on("close")



注：高版本的Node和浏览器的行为更加统一。







## 跨域

同源：协议，域名，端口号相同

同源策略：不同源的脚本在没有授权的情况下，不能读写对方的资源



##### 跨域解决方案

1. 通过jsonp跨域

   ```
   <script>
   	function doSomething(json) {
       	//do something
   	}
   </script>

   <script src="http://api.example.com/data?callback=doSomething"></script>
   ```

   缺点：仅支持GET请求，安全性低

2. document.domain

   只适用于一级域名相同，二级域名不同的情况。

   如a.example.com和b.example.com。此时两个网站都设置 `document.domain =  "example.com"`

3. window.name

   只要在同一个窗口，前一个网页设置了window.name，后一个网页就能获取值。

   使用时，先设置iframe的src为目标网页，目标网页中设置window.name，再修改iframe的src为一个与本页面同源的网页，从而获取到window.name。

4. location.hash

   和window.name 类似，这个在iframe内部的页面修改location.hash，在父页面监听hash的改变。

5. CORS

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

   ​

6. postMessage 跨文档通信

   postMessage 和 onmessage

7. nginx反向代理

8. Node中间件代理



## HTTP缓存

##### HTTP缓存分为强制缓存和协商缓存。

浏览器请求资源时

1. 先判断有没有缓存，没缓存则向服务器发送请求。

2. 若有缓存，根据Cache-Control: max-age 或是 Expires 判断资源是否过期。

   1. 如果没过期，则直接从缓存读取（强制缓存）

   2. 如果过期了

      1. 上次资源的响应是否有Etag头部， 有的话发送请求，请求头为If-None-Match

      2. 没有Etag的话，看上次资源的响应是否有Last-Modified，有的话发送请求，请求头为If-Modified-Since。

      3. 如果两个头部都没有，则向服务器发送请求。

         如果1或2中了，服务器会根据请求头If-None-Match或If-Modified-Since来判断资源是否有改动。

         如果资源有改动，则发送新资源，响应的状态码为200

         如果资源没有改动，则浏览器从缓存中读取资源，响应的状态码为304






## 设计模式

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





## 数据结构

### 二叉树

##### 二叉树的建立

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
        if (node.right) {
            stack.push(node.right)
        }
        if (node.left) {
            stack.push(node.left)
        }
    }
    return res.reverse()
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

## 算法题

##### 两数之和

(给定无序、不重复的数组 data，取出 n 个数，使其相加和为 sum)

```javascript
// 使用Map而不是两个循环，空间换时间
function twoSum(arr, target) {
    const map = new Map()
    for (let i = 0; i < arr.length; i++) {
        let value = arr[i]
        let diff = target - value
        if (map.has(diff)) {
            return [diff, value]
        } else {
            map.set(value, i)
        }
    }
}

twoSum([1, 2, 3, 4], 7)
```

##### 累加器

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









## 面试题

0.1 + 0.2 == 0.3 为何为false

答案：

十进制的0.1转化为二进制的0.1时，得到一个无限循环小数。所以当使用有限的位数保存数字的时候，会产生精度的确实，最终的数只是0.1的近似数。

所以0.1和0.2的两个近似数相加，只能得到0.3的近似数。





腾讯 微信事业群笔试题

```javascript
实现一个 HardMan:
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

解答：

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



## 前端模块化

1. 立即执行函数（IIFE）

2. AMD（使用require.js库），define定义模块，require加载模块。

3. CommonJS

   每个文件都当成一个模块，使用module.exports 来设置模块的出口，使用require()来加载模块，本质是用一个立即执行函数把文件包起来执行，获取文件内的module.exports。

4. UMD（IIFE + AMD + CommonJS）

5. ES6模块

CommonJS是运行时加载，ES6模块是编译时加载（使用import()来实现运行时加载）





## Webpack 复习笔记



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



## Vue和React（修改中）

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


## React

### Redux(所有的状态保存在一个对象里)

**基本原理**

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

**createStore的简单实现**

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



**实战例子**

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

// 本质是运用的高阶组件，根据输入的容器组件APP生成UI组件
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









## Vue

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

      2. 调用sameVnode对oldVnode和newVnode进行比较，只有当key， tag， isComment都相同，同时定义或同时未定义data， 或者两个都是input且type相同时才是sameVnode。那么就对两个VNode进行patchVnode操作

         1. 如果新老VNode都是静态的，且key值相同，并且新的VNode标记了v-once或是clone，则只需替换ele和componentsinstance
         2. 新老VNode都有children，则使用updateChildren对子节点进行diff

            1. 对于oldVnode的children，用oldCh表示。对于newVnode的children，用newCh表示


            2. 首先定义 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 分别是新老两个 children 的两边的索引，同时 oldStartVnode、newStartVnode、oldEndVnode 以及 newEndVnode 分别指向这几个索引对应的VNode 节点。
            3. while循环，循环中oldStartIdx和oldEndIdx不断靠拢，newStartIdx和newEndIdx也不断靠拢。
            4. 比较，oldStartVnode和newStartVnode，oldEndVnode和newEndVnode   ，  oldStartVnode和newEndVnode  ， oldEndVnode和newStartVnode。如果两个是sameVnode则进行patchVnode, 不是就进行下一个的比较
            5. 如果以上四次比较都不是Vnode，那么找oldCh有没有和newStartVnode是sameVnode的节点
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




## 面经

##### 腾讯 微信事业群一面

第一次面试，很快的凉凉。总结一下自己失败的原因：一方面自己过于紧张，导致个别没那么难的问题没能答好，事后仔细想想觉得自己能答上来；另一方面，面试官确实问到了一些我不太熟悉的地方，主要还是自己的基础不够牢固，得好好反思。

不过这次面试不进流程，而且是寒假实习面试，所以就算挂掉了问题也不大（安慰自己）

1. 自我介绍。颤抖的声音介绍自己...

2. 讲一讲Vue的源码。我自信满满的从Vue实例的构建开始一步步讲起，结果还没讲一半就被叫停，说要我讲一下Vue源码的架构和结构。突然有点蒙，不知道该怎么回答比较好。

3. 浏览器的渲染原理。

   我以为问的是生成DOM渲染树，布局和绘制，以及回流和重绘的知识点。结果面试官又问我：HTML是怎么转换成DOM树的，然后我就蒙圈了...

   之后谷歌了一下，大概的步骤如下

   1. 编码
   2. 预解析
   3. 标记
   4. 构建树

   [详细的构建过程](https://segmentfault.com/a/1190000018730884)

4. 问了我Script标签对浏览器的阻塞问题。

   [参考](https://www.zcfy.cc/article/building-the-dom-faster-speculative-parsing-async-defer-and-preload-x2605-mozilla-hacks-8211-the-web-developer-blog)

   Script脚本的执行会阻塞html的解析，外链script的下载也会阻塞。

   那么多个script标签代码的执行，也必然是顺序执行，多个script外链的请求到底是串行还是并行的呢？

   比较容易混淆，所以容易会认为请求是串行的，因为

   ```
   	<script type="text/javascript" src="./test.js"></script>
       <script type="text/javascript" src="./test2.js"></script>
   ```

   可能会认为下面html的文档的解析要等到上面script执行完才会开始，因为会阻塞。

   但其实请求是并行的。

   因为html解析成dom的时候会先进行预解析。

5. md5。

6. 闭包。面试官问：闭包会造成什么？ 我脱口而出：内存泄漏。被钓鱼了，根本就不会造成内存泄漏。

7. 性能优化手段






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
  - 对于复杂的动画效果，可以使用`display: position`使其脱离文档流
- JS优化
  - 函数防抖，函数节流



### 懒加载

IntersectionObserver

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

``` javascript
<body>
  	<div></div>
	<img />
  	<script>
  		let img = document.querySelector('img')
		if (img.offsetTop - document.documentElement.scrollTop < 
           		document.documentElement.clientHeight )
		// 当以上成立时说明图片进入视口
         // 或者
          if (img.getBoundingClientRect() < document.documentElement.clientHeight)
  	</script>
<body>
  

```





