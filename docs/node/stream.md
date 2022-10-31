---
sidebarDepth: 4
---

# 二进制与编码

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

无论是`Buffer`还是`ArrayBuffer`，本质上都表示着内存中的二进制数据（或者叫字节序列），通过某种编码方式我们就能获取其对应的字符串。

常见的编码方式有`ascii`、`latin1`、`utf-8`、`utf-16`、`gbk`等等，需要注意平常所说的Unicode指的是一种字符集（字符与码点的映射），`utf-8`、`utf-16`、`utf-32`才是具体的编码方式。

:::tip 

`ascii`编码的有效位数为7位，无法表示某些西欧字符，`latin-1`使用了`ascii`中没有直接用到的最高位来兼容`ascii`的同时表达更多的字符。

:::



如我们在`Buffer`一节中所介绍的，在`Node.js`环境中可以通过`Buffer.from()`和`buffer.toString()`实现`Buffer`和字符串的转化（即二进制数据和字符串的编码和解码）。而在浏览器中并不存在`Buffer`变量，为了实现`ArrayBuffer`和字符串的转化，我们需要借助`TextEncoder`和`TextDecoder`来实现。

`TextEncoder`和`TextDecoder`可以用来实现`TypedArray`和字符串的转化，而`TypedArray`可以通过`.buffer`属性访问对应的`ArrayBuffer`对象，所以间接地实现了我们的需求。



### TextEncoder

``` js
const arr = new TextEncoder().encode('akara') // Uint8Array(5) [97, 107, 97, 114, 97, buffer: ArrayBuffer(5)]
const buffer = arr.buffer // ArrayBuffer(5)
```



### TextDecoder

``` js
const arr = new Uint8Array([97, 107, 97, 114, 97])
new TextDecoder().decode(arr) // akara
```



:::caution

需要注意的是，为了遵循规范`TextEncoder`和`TextDecoder`只支持`utf-8`编码。

:::



### encodeURI

``` js
encodeURI('你') // '%E4%BD%A0'

const buffer = Buffer.from('你')
console.log(buffer) // <Buffer e4 bd a0>
```



### decodeURI

``` js
decodeURI('%E4%BD%A0') // 你
```



### Base64

`Base64`也是一种编码方式，可以实现二进制字节序列和字符串的转化。

给定一个字节序列，每三个字节作为一大组共有24个比特，将这24个比特分为四个小组，则每个小组包含6个比特，在每个小组前面加上2个比特`00`。那么原本3个字节的数据就变成了4个字节的数据，现在每个字节的有效位数为6位，此时每个字节可以映射为64种不同的字符，因此这种编码方式被叫做`Base64`。

但在实际生活中，我们会经常看到`Base64`来用来对字符串混淆（伪加密），明明这是一种针对二进制数据的编码方式？比如`window.btoa`，这是因为内部会先通过`latin-1`将字符串编码成二进制，再进行`Base64`编码，编码后的数据比原本增大了三分之一。

`Base64`的一个常用途径是用来将小型图片进行编码，通过`<img src="data:img/gif;base64,base64,xxx" />`形式进行图片的加载，从而减少不必要的网络请求。



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
new Blob([new Uint8Array([10, 20]).buffer], {})
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

`File`是`Blob`的子类，通常进行文件上传时可以拿到`File`对象。

``` js
const el = document.querySelector('input')
console.log(el.files) // FileList
el.files[0] // File
```



## 闭环转换

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

感觉是通过类似`latin-1`来进行逐字节的字符串编码。









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





