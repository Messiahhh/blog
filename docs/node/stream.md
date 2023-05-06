---
sidebarDepth: 4
---
# 二进制与编码

## 进制转换

``` js
const num = 255;
num.toString(2) // '11111111'
num.toString(16) // 'ff'

parseInt(0b1111) // 15
parseInt(0xff) // 255
```


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

## Buffer

`Buffer`用于表示固定长度的字节序列，**`Buffer`仅存在于`Node.js`环境中**，**在浏览器环境中使用`ArrayBuffer`作为替代**，二者的原理基本一致但API层面存在些许差异。

通过`fs`模块不指定编码方式`encoding`读取文件时，我们能够获取到表示二进制数据的`Buffer`对象。



### `Buffer.alloc()` 

可以用来生成指定长度的Buffer，也可以同时指定Buffer字节序列的值。

``` js
const buffer = Buffer.alloc(10) // <Buffer 00 00 00 00 00 00 00 00 00 00>
const buffer = Buffer.alloc(10, 0xfc) // <Buffer fc fc fc fc fc fc fc fc fc fc>
```

### `Buffer.from(string[, encoding])`

将字符串编码成`Buffer`表示的字节序列，默认为`utf-8`编码

``` js
const buffer = Buffer.from('aka') // <Buffer 61 6b 61>  
const buffer = Buffer.from('你好') // <Buffer e4 bd a0 e5 a5 bd>
```

### `buffer.toString([encoding])`

将`Buffer`解码成字符串，默认为`utf-8`编码

``` js
const buffer = Buffer.from('aka') 
const str = buffer.toString() // aka
```





## ArrayBuffer

浏览器中的`ArrayBuffer`对应`Node.js`环境中的`Buffer`，都表示内存中的一块字节序列，但在浏览器中我们不能直接操作这块内存，而是必须通过`Typed Array`来操作，常见的`Typed Array`有`Int8Array`、`Uint8Array`、`Int16Array`等等。



### 类型化数组（Typed Array）

``` js
new Uint8Array([100, 200, 300])
```



### DataView

> TODO



## String and Encoding

### 字符集与编码方式
无论是`Buffer`还是`ArrayBuffer`，本质上都表示着内存中的二进制数据（或者叫字节序列），通过某种编码方式我们就能获取其对应的字符串。常见的编码方式有`ascii`、`gbk`、`utf-8`、`utf-16`等。

需要注意的是我们平常所说的Unicode指的是一种字符集，表示字符和码点（CodePoint）的一对一映射关系，根据采用的编码方式的不同（`utf-8`、`utf-16`、`utf-32`），同一个码点可以对应不同的二进制表示。
``` js
'A'.charCodeAt(0) // 获取字符解码后的二进制数据
'A'.codePointAt(0) // 获取字符对应码点，特别是可以获取到非基本平面的字符的码点（即大于0xFFFF）
```

:::info 注意
在JavaScript中字符串是通过**`UTF-16`**进行编码的，对于无法正常编码成字符的二进制会使用`\u0003`、`\x03`这样的形式表示。
``` js
'\x03'.length // 1
'\x03'.charCodeAt(0) // 3
```
:::


### TextEncoder
如我们在`Buffer`一节中所介绍的，在`Node.js`环境中可以通过`Buffer.from()`和`buffer.toString()`实现`Buffer`和字符串的转化（即二进制数据和字符串的编码和解码）。而在浏览器中并不存在`Buffer`变量，为了实现`ArrayBuffer`和字符串的转化，我们需要借助`TextEncoder`和`TextDecoder`来实现。

`TextEncoder`和`TextDecoder`可以用来实现`TypedArray`和字符串的转化（通过UTF-8编码），而`TypedArray`可以通过`.buffer`属性访问对应的`ArrayBuffer`对象，所以间接地实现了我们的需求。
``` js
const arr = new TextEncoder().encode('akara') // Uint8Array(5) [97, 107, 97, 114, 97, buffer: ArrayBuffer(5)]
const buffer = arr.buffer // ArrayBuffer(5)
```



### TextDecoder

``` js
const arr = new Uint8Array([97, 107, 97, 114, 97])
new TextDecoder().decode(arr) // akara
```



### encodeURI

HTTP请求报文头部的编码格式是ASCII，这意味着我们无法在请求路径或参数上传入汉字等字符，为了实现等价的功能，我们可以使用`encodeURI`来对汉字进行编码，它会将汉字编码为`UTF-8`编码后的字符表示。

``` js
encodeURI('你好') // '%E4%BD%A0%E5%A5%BD'

[...new TextEncoder().encode("你好")].map(item => item.toString(16)) // ['e4', 'bd', 'a0', 'e5', 'a5', 'bd']

// NodeJS
const buffer = Buffer.from('你好') // <Buffer e4 bd a0 e5 a5 bd>
```

:::caution 注意
可以注意到以上编码方式的结果和下面的结果不同，这是由于在JS字符串中使用的是UTF-16编码
``` js
'你好'.charCodeAt(0).toString(16) // '4f60'
```
:::


### decodeURI

``` js
decodeURI('%E4%BD%A0%E5%A5%BD') // 你好
```

:::info 知识点
`encodeURIComponent`可以对更多的URL字符进行编码
``` js
encodeURI('http://baidu.com') // 'http://baidu.com'

encodeURIComponent('http://baidu.com') // 'http%3A%2F%2Fbaidu.com'
```
:::


### Base64

`Base64`是一种常见的编码方式，主要作用是实现二进制字节序列和字符的编码。

:::info 编码原理

给定任意的字节序列，我们将其每三个字节共24位比特作为一组，然后把这24位比特又划分为4个6比特的小组，在每个小组的最高位添加`00`的两个比特。此时，原本三个字节的数据变成了四个字节，每个新的字节有效位数为6位，我们可以把每个字节都根据`ASCII`的规则映射为64种（即`2^6`）不同的字符，因此这种编码方式被称为`Base64`。

:::



如上文所介绍，`Base64`是一种二进制的编码方式，但在实际生活中我们会经常见到使用`Base64`来编码字符串来进行混淆（伪加密），比如使用`window.btoa`可以将字符串转化为`Base64`形式的字符。这是因为内部会先通过`latin1`（相较于`ASCII`把最高位利用上了）将字符串编码成二进制，再应用`Base64`的规则将二进制进行转换，并映射位新的字符。

`Base64`的一个常用途径是对小型图片进行编码，如通过`<img src="data:img/gif;base64,xxxxx" />`形式进行图片的加载来减少不必要的网络请求，但因为`Base64`会使得编码后的数据比原先大三分之一，因此通常不会对大图进行编码。

``` js
fetch('data:image/png;base64,xxxxx').then(res => res.arrayBuffer())
```



### `window.btoa()`

如上小节所介绍，通过浏览器提供的`window.btoa`可以实现`base64`的编码。

``` js
window.btoa('hello akara') // aGVsbG8gYWthcmE=
```

并且由于中文字符无法通过`ASCII`解码成二进制，所以不能直接对中文字符进行操作，但可以借助`encodeURIComponent()`来实现对应的效果

``` js
window.btoa(encodeURIComponent('你好')) // JUU0JUJEJUEwJUU1JUE1JUJE
```

### `window.atob()`

``` js
window.atob('aGVsbG8gYWthcmE=') // hello akara

decodeURIComponent(window.atob('JUU0JUJEJUEwJUU1JUE1JUJE')) // 你好
```





## Blob

**`Blob`只存在于浏览器环境中**，可以大致把它视为一个类文件对象，是后续将介绍的`File`对象的父类。

``` js
fetch()
.then(res => res.blob())
.then(blob => {
    console.log(blob)
})
```



### `new Blob()`

可用于根据`ArrayBuffer`或字符串生成`Blob`。

``` js
new Blob([JSON.stringify({
    name: 'akara'
})], { type: 'application/json' })
```

``` js
new Blob([new Uint8Array([10, 20]).buffer]) // 需要注意第一个参数是数组包了一层
```





### `blob.arrayBuffer()`

将`Blob`转化为`ArrayBuffer`，需要注意函数的返回值为`Promise`



### `blob.text()`

将`Blob`转化为字符串，编码为`utf-8`，需要注意函数的返回值为`Promise`

``` js
blob.text().then(text => console.log(text))
```

### `blob.slice()`

将文件或`blob`分割成多个`blob`，常用于大型图片的上传。



### `URL.createObjectURL(blob)`

当后端将读取的文件作为响应体发送给前端时，我们常见的需求有：①下载文件到本地。②在本地显示图片。

这种需求的关键在于根据给定的文件或`blob`生成一个URL路径，将其放入`a`或`img`标签的属性中。

``` js
const url = URL.createObjectURL(blob)
a.href = url // 结构类似于 blob:http://localhost:3000/486ef892-d4fc-485f-b4ab-fae272d35e55
a.download = '下载文件.txt' // 文件名

const url2 = URL.createObjectURL(blob)
img.src = url2
```



## File

`File`是`Blob`的子类，相较于`Blob`多了`name`、`lastModified`和`lastModifiedDate`属性。通常可以从`input`元素中获取到。



``` js
const el = document.querySelector('input')
console.log(el.files) // FileList
el.files[0] // File
```



## FormData

通常当我们需要给后端发送文件时，要么直接把单个文件内容作为请求体，要么通过`formData`来进行数据传输。

``` javascript
// 错误
fetch(url, {
  data: {
    file: new File(), // 会被JSON.stringify序列化
   	name: 'akara',
  }
})

// 正确
const formData = new FormData();
formData.append('file', new File());
formData.append('name', 'akara')

fetch(url, {
  data: formData
})
```





## 总结

通过上述几节我们了解到`ArrayBuffer`、`String`、`Blob`的基本情况，并且知道它们直接是可以进行闭环任意转化的：

1. `String -> Uint8Array（TextEncoder）`
2. `Uint8Array -> String（TextDecoder）`
3. `Uint8Array -> ArrayBuffer（.buffer）`
4. `ArrayBuffer -> Uint8Array（new Uint8Array）`
5. `ArrayBuffer -> Blob（new Blob）`
6. `Blob -> ArrayBuffer（arrayBuffer）`
7. `Blob -> String（text）`
8. `String -> Blob（new Blob）`







## FileReader

`FileReader`用于读取文件中的数据，`Blob`内置了一些方法来获取对应的`ArrayBuffer`、字符串，而`FileReader`也提供了类似的功能。

``` js
const reader = new FileReader()
reader.onload = function() {
    console.log(reader.result)
}
reader.readAsXXX(blob)
```

### `readAsArrayBuffer()`

功能类似于`blob.arrayBuffer()`

### `readAsText()`

功能类似于`blob.text()`



### `readAsDataURL()`

功能类似于`URL.createObjectURL`，但稍微有些不同。

这个方式是将文件内容的字节序列通过Base64编码得到字符串，即以`data:application/octet-stream;base64,`开头的长URL；而`URL.createObjectURL()`实际上拿到的是一个以`blob:http://xxx.com/xxx`开头的短URL，这个URL将会指向内存中的对应地址。



### `readAsBinaryString()`
将二进制编码为JS字符串，因此是使用的UTF-16编码。

``` js
const blob = new Blob([new Uint8Array([0, 255, 0, 255, 100, 200])])

const reader = new FileReader();
reader.onload = function () {
    console.log(Uint8Array.from(reader.result, char => char.charCodeAt(0))) // Uint8Array([0, 255, 0, 255, 100, 200])
    // console.log(reader.result) 会显示乱码 ÿÿdÈ
}
reader.readAsBinaryString(blob)
```









## stream

流对象用来处理Node中的流式数据，`Stream`继承于`eventEmitter`，因此实例存在`on`方法，除此之外流对象的实例存在`pipe`方法来实现流式数据的传输。

流对象有四种类型：

- `Writable`，比如`fs.createWriteStream`、`process.stdout`、`res`
- `Readable`，比如`fs.createReadStream`、`process.stdin`、`req`
- `Duplex`，可以当成`Writable`和`Readable`的结合
- `Transform`



### Writable

对于`Writable`类型的流对象，实例存在`write()`和`end()`方法。



### Readable

对于`Readable`类型的流对象，实例存在`on('data')`和`on('end')`方法。



### `pipeline`

``` js
const { stdout, stdin } = require('process')
const { pipeline } = require('stream')

// 写法一
stdin.on('data', chunk => {
    stdout.write(chunk)
})

// 写法二
stdin.pipe(stdout)

// 写法三
pipeline(stdin, stdout)
```



## zlib

Node的`Zlib`模块提供了基于`Stream`的API来实现`gzip`等格式的压缩或解压缩。

``` js
const zlib = require('zlib')
const { pipeline } = require('stream')
const gzip = zlib.createGzip() // 创建一个流对象
const source = fs.createReadStream('./a.txt')
const target = fs.createWriteStream('./a.txt.gz')

pipeline(source, gzip, target, err => console.log(err)) // 生成压缩文件a.txt.gz
```



当然我们也可以使用基于回调函数的写法来直接对文件进行压缩，经过测试可以把160Kb的页面压缩至4Kb，当浏览器识别到响应头部的`Content-Encoding: gzip`，浏览器就会**自动对响应的内容进行解压缩**。

``` js
// server.js
const { promisify } = require('util')
const fs = require('fs')
const zlib = require('zlib')
const readFile = promisify(fs.readFile)
const gzip = promisify(zlib.gzip)
const http = require('http')

http.createServer(async (req, res) => {
    if (req.url === '/') {
        const page = await readFile('./index.html')
        const data = await gzip(page)
        res.setHeader('Content-Encoding', 'gzip')
        res.end(data)
    } 
    else if (req.url === '/test') {
        let obj = {}
        for (let i = 0; i < 10000; i++) {
            obj[i] = i
        }
        const data = await gzip(JSON.stringify(obj))
        res.setHeader('Content-Encoding', 'gzip')
        res.end(data)
    }
}).listen(3000)

// client.js
fetch('/test')
.then(res => res.json())
.then(data => console.log(data)) // 拿到obj
```





