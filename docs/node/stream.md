---
sidebarDepth: 4
---

# 流与二进制

## Buffer

Buffer只存在于Node环境中，用来表示字节序列，通常当我们使用`fs`模块读取文件时就可以拿到文件所对应的字节序列（或者说是在内存中的值）。当响应的内容为Buffer时，响应头`Content-Type`的值为`application/octet-stream`。

### `Buffer.alloc()` 

可以用来生成指定长度的Buffer，也可以同时指定Buffer字节序列的值。

``` js
const buffer = Buffer.alloc(10) // <Buffer 00 00 00 00 00 00 00 00 00 00>
const buffer = Buffer.alloc(10, 0xfc) // <Buffer fc fc fc fc fc fc fc fc fc fc>
```

### `Buffer.from()`

可以用来获取字符串对应的字节序列（默认UTF8编码）

``` js
const buffer = Buffer.from('aka') // <Buffer 61 6b 61>  
const buffer = Buffer.from('你好') // <Buffer e4 bd a0 e5 a5 bd>
```

### `buffer.toString()`

`buffer.from()`的逆操作，获取字节序列对应的字符串（默认UTF8编码）

``` js
const buffer = Buffer.from('aka') 
const str = buffer.toString() // aka
```







## Blob

`Blob`只存在于浏览器环境中，可以大致把它视为一个类文件对象（`File`为`Blob`的子类）。通常当我们使用`fetch`发送请求，后端返回`Buffer`，我们可以使用`res.blob()`拿到`blob`：

``` js
fetch()
.then(res => res.blob())
.then(blob => {
    console.log(blob)
})
```

### `blob.arrayBuffer()`

可以用来将`blob`转化为`arrayBuffer`，从而可以看到对应的字节序列。

### `blob.text()`

可以用来获取`blob`内部字节序列所对应的文本。

``` js
blob.text().then(text => console.log(text))
```

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

### `blob.slice()`

将文件或`blob`分割成多个`blob`，常用于大型图片的上传。

## File

`File`是`Blob`的子类，通常我们会在`<input type="file">`中获取到`file`对象。

``` js
const el = document.querySelector('input')
console.log(el.files) // FileList
el.files[0] // File
```



## FileReader

`blob`自带了一些方法来获取二进制、文本、URL。而我们也可以使用`FileReader`来实现类似的功能。

``` js
const reader = new FileReader()
reader.onload = function() {
    console.log(reader.result)
}
reader.readAsXXX(blob)
```

### `readAsArrayBuffer(blob)`

类似`blob.arrayBuffer()`

### `readAsText(blob)`

类似`blob.text()`

### `readAsDataURL(blob)`

用法类似`URL.createObjectURL`，但实际上两者还是有点不一样。

这个方式是将文件内容的字节序列使用Base64编码得到字符串，即以`data:application/octet-stream;base64,`开头的URL；而`URL.createObjectURL()`拿到的是一个以`blob:http://xxx.com/xxx`开头的URL。

## ArrayBuffer

简单来说`ArrayBuffer`是一块内存，但是我们不能直接去操作这块内存，必须通过`Typed Array`来操作这块内存，`Typed Array`有`Int8Array`、`Unt8Array`、`Int16Array`等等。



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





