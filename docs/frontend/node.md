---
sidebarDepth: 4
---
# Node

## 模块化

**在Node中引入模块，会发生什么？**

在Node中，模块分为两类：一类是node提供的**核心模块**，一类是用户编写的**文件模块**

- 路径分析

  如果发现引入的是核心模块，则不用进行接下来的两步了，因为核心模块早已编译为二进制，当node进程启动时，部分核心代码已经直接加载进内存中。

- 文件定位

- 编译执行



##### 立即执行函数

立即执行函数（IIFE）是以前主流的模块化方案，比如`Jquery`就使用该方案。

``` javascript
// 定义模块
(function (window) {
    function A() {
        return 'aaa'
    }

    function B() {
        return 'bbb'
    }

    window.myModule = {A, B}
})(window)

// 使用模块
myModule.A()
```



##### AMD

很久以前的一种模块化方案，类似的方案还有CMD。需要额外安装`require.js`库，使用`define`定义模块，使用`require`加载模块。

现在基本不用。



##### CommonJS

最主流的模块化方案。

``` javascript
// a.js
function getName() {
    return 'Akara'
}
module.exports = getName

// b.js
const getName = require('./a')
getName() // 'Akara'
```

`require`可以简单看作包了一层立即执行函数，该立即执行函数返回了那个模块的`module.exports`

``` javascript
const getName = require('./a')
// 等价于
const getName = (function () {
    function getName() {
        return 'Akara'
    }

    module.exports = getName

    // 返回module.exports
    return module.exports
})()
```



模块内部有`module`和`exports`两个变量，其中`module.exports`和`exports`指向同一片内存。

又因为我们模块实际返回的是`module.exports`，所以如果直接对`exports`变量重新赋值肯定是错误的操作。

``` js
module: {
    id: '.'
	exports: {}
}
```



##### UMD 

`UMD`是上述三种模块化方案`IIFE`、`AMD`、`CommonJS`的结合，即用来兼容多套模块化系统。

``` js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // 如果支持AMD模块化
        define(['b'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // 如果支持CommonJS模块化
        module.exports = factory(require('b'));
    } else {
        // 如果以上两种都不支持，设置全局变量来保存模块内容
        root.returnExports = factory(root.b);
    }
}(this, function (b) {
    // 模块的业务代码放在这
    return {}
}));
```



##### ES6模块

ES6模块使用`import`和`export`来导入和导出模块。

新版本Node已经支持`node app.mjs`的写法，老版本Node需要开启`--experimental-modules`使用该特性。

除了通过文件后缀名来区分`ES`模块，我们也可以设置`package.json`的`type`字段为`module`来表示这是一个`ES`模块，此时文件可以是`.js`后缀。

``` js
// a.js
const name = 'aka'
export default name // 等价于 export { name as default }
export function getName() { // 等价于 export { getName as getName }
    return name
}

// b.js
import name from './a.js' // 等价于 import { default as name }
import { getName } from './a.js' // 等价于 import { getName as getName }
```

我们也可以自行定义模块接口的名字

``` js
// a.js
const name = 'aka'
export { name as alias }

// b.js
import { alias as myName } from './a.js'
```

我们还可以使用`import * as xx from`的写法来加载整个模块。

``` js
// a.js
export const name = 'aka'
export const age = 20

// b.js
import * as m from './a.js'
console.log(m)
// Module {
//   age: 20
//   name: "aka"
//   Symbol(Symbol.toStringTag): "Module"
//   __esModule: true
// }
```



事实上，在`ES`模块中我们可以加载`CommonJS`模块。

``` js
// a.js
module.exports = function() {
    console.log('common模块')
}

// b.mjs
import a from './a.js' // 默认导入了a.js文件的module.exports
a()
```

###### 对比

`CJS`模块和`MJS`模块存在几大区别

1. `CJS`模块不存在默认导出`default`，`MJS`模块存在`default`。

2. `CJS`模块会被整体导入，而`MJS`可以被部分导入。因此使用`MJS`可以`tree shaking`。

3. `import`命令会在**其他所有代码执行前**就被JavaScript引擎静态分析，可以说它是在**编译时加载模块**。

   所以我们通常只能把`import`放在模块的顶层，并且不能放在如`if`之类的代码块中。

   并且由于这个特性，我们不能在JS代码执行中根据条件来动态加载模块，而`require`可以做到这一点，`require`是**运行时加载模块**。

   好在，我们可以使用`import()`来实现**运行时加载模块**，组件的懒加载通常就是使用`import()`搭配代码分割来实现的。



## pakeage.json

##### bin

我们可以借助`bin`字段来开发命令行工具。

``` json
{
    "name": "myapp",
    "bin": {
        "myapp": "./cli.js"
    }
}
```

``` js
#!/usr/bin/env node
console.log('aka')
```

``` bash
npm i myapp 
npx myapp
```

当我们成功安装好一个模块，NPM会自动根据`package.json`的`bin`字段来添加对应的符号链接。我们从而可以使用`./node_module/.bin/myapp`或`npx myapp`，又或是`package.json`的`script`字段来直接执行脚本。

如果我们需要本地开发一个命令行工具，那么在添加`bin`字段后需要自行使用`npm link`来创建符号链接。



##### script

`npm`除了`npm ci`、`npm install`等内置脚本，还包括`hook script`（`pre/post script）`和`lifecycle script`。

###### pre/post script

对于一个脚本我们可能想要在其执行之前或之后执行某些操作，此时可以使用`pre`或`post`前缀。

``` json
{
    "script": {
        "test": "echo \"i'm test\"",
        "pretest": "echo \"在test脚本执行前执行\"",
        "posttest": "echo \"在test脚本执行后执行\""
    }
}
```

###### lifecycle script

`npm`存在一些会在特定场景触发的脚本，比如`prepare`脚本会在执行`npm install`前执行。

``` json
{
    "script": {
        "prepare": "echo \"hello akara\""
    }
}
```

##### dependencies

项目的依赖。



##### devDependencies

项目的开发依赖。如果我们在NPM发布了一个模块A，之后当我们`npm install A`时会自动安装模块A的依赖，但不会安装模块A的开发依赖。



##### type

`.cjs`文件会被视为`CommonJS`模块，`.mjs`会被视为`es`模块，`.js`则会根据`package.json`的`type`字段视为不同的模块。

默认情况`package.json`不包括`type`字段，`.js`文件被视为`CommonJS`模块，我们能够使用`require`而不能使用`import`。

当我们加上`type: module`，则`.js`文件会被视为`es`模块，我们能够使用`import`语法。



##### files

`files`字段用来规定模块的哪些文件能够被外部下载引入，默认值为`[*]`，即模块的所有文件都能被外部下载引用。

``` js
// my-module/public/test.js
module.exports = function() {
    console.log('我是模块的内部文件')
}

// app.js
const test = require('my-module/public/test')
import 'antd/dist/antd.css'
```

我们能够通过修改`files`字段来限制模块能够被下载的文件，不过需要注意的是以下文件永远都会被外部下载：`package.json`、`README`、`CHANGE / CHANGELOG / HISTORY 	`、`LICENSE / LICENCE`、`NOTICE`、`main`字段指向的文件。



##### main

用来规定模块的默认入口，默认值为`index.js`。

``` js
const test = require('my-module') // 引入my-module模块的根目录的index.js文件
```



##### browser | module

一般`browser`字段指向`cjs`或`umd`模块，`module`字段指向`es`模块，大多数情况下这两个字段都没什么用处。

在某些情况下，特别是使用`webpack`打包模块时，当`webpack`配置的`target`为`web`（默认值），会根据模块的`browser`字段导入模块；通过设置`target`为`node`，会根据`module`字段导入模块。

另外，当`package.json`不存在对应的入口字段，会根据`browser -> module -> main`的优先级导入模块。这个优先级是根据配置`resolve.mainFields`字段指定的，我们可以通过修改该字段来调整优先级：

``` js
// webpack.config.js
module.exports = {
    target: 'node', // 默认值web
    resolve: {
        mainFields: ['main', 'module', 'browser'] // 默认值 ['browser', 'module', 'main']
    }
}
```









##### exports

`exports`字段在功能上和`main`相近，使用起来更加灵活。如果同时存在`exports`和`main`，`exports`的优先级更高。

``` json
{
    "exports": {
        ".": "./index.js", // 需要加上./
        "./test": "./src/test.js" 
    }
}
```

``` js
const test = require('my-module') // ./index.js
const test2 = require('my-module/test') // ./src/test.js
```

需要特别注意的是，使用`exports`字段时，`files`字段的作用就会失效。

``` js
import test from 'my-module/main.js' // 报错
```

`exports`最大的特性是能够根据导入模块时使用的是`require`还是`import`选择不同的导出。

``` json
{
    "exports": {
        ".": {
            "require": "./a.js",
            "import": "./b.mjs"
        }
    }
}
```







## package-lock.json

在`package.json`的`dependencies`字段中我们经常能看见这种形式的版本号`"react": "^17.0.2"`、`"xx": "~0.10.0"`，这种写法通常被称为[`semver`表示法](https://github.com/npm/node-semver)，三个数字分别表示主要版本、次要版本、补丁版本。

当我们`clone`项目后使用`npm install`来安装依赖，或者是在已有的项目中使用`npm update`来更新依赖，都会根据`semver`规则安装对应版本的模块，也就是说**实际安装版本并不是固定的**。

- `^`：表示只会执行不更改最左边非零数字的更新。比如`^0.10.0`，意味着我们可以安装（或更新，下同）`0.10.1`等版本，但不能安装`0.11.0`或更高的版本；又比如`^1.10.0`，意味着我们可以安装`1.10.1`、`1.11.0`等版本，但不能安装`2.0.0`或更高的版本。

- `~`：如果我在比较器中指定了次要版本，那么只允许补丁版本的更新；如果没有指定次要版本，那么可以允许次要版本的更新，所以通常情况`~`只允许补丁级别的更新。比如`~1.10.0`的依赖，意味着我们只能安装`1.10.x`的版本，不能安装`1.11.0`的版本。



使用`semver`表示法，**不锁版本的好处**是当我们项目所依赖的某个模块存在漏洞时，该模块的开发者可以发布一个补丁级别的新版本，而我们开发者可以直接`npm update`来更新所有模块。

而**不锁版本的坏处是**，当项目所依赖的某个模块偷偷地更新了小版本，对我们来说是无感知的。一旦这个依赖的更新引入了一些破坏性变更，那么当我们`clone`项目并`npm install`后可能发现项目跑不起来（特别是使用CI进行构建的时候）

针对这样的问题，`yarn`和新版的`npm`都默认启用了`lock`机制，当我们`npm i`的时候会生成`package-lock.json`文件**固定依赖的版本号**，今后每次修改`package.json`依赖的时候（如`npm i xx@latest`），`package-lock.json`也会相应的改变，这两个文件的**依赖强关联**。

当项目中存在`package-lock.json`时，我们通过`npm i`或`npm update`安装的都是指定版本的模块。

------

不过很明显锁不锁版本都有对应的好处和坏处，所以社区对是否锁版本还存在着一些[争论](https://www.zhihu.com/question/65536076)。

另外，无论是否使用`lock`机制，都不应该把`package-lock.json`写入`.gitignore`中。

如果我们使用`lock`机制，应该直接把`package-lock.json`提交进仓库；如果我们不使用`lock`机制，则应该在`.npmrc`中写入`package-lock=false`来关闭`lock`机制，并把`package-lock.json`提交到仓库中。[参考](https://www.zhihu.com/question/264560841)

## NPM

##### node_modules

在`NPM`的早期版本，`node_modules`使用嵌套结构来管理模块之间的依赖关系。而我们的很多模块都又可能依赖于同一个模块，这样的结构可能导致性能的浪费。

``` 
- A -> B
- C -> B
```

所以在`NPM@3.x`以后，`node_modules`主要使用扁平结构来管理模块之间的依赖关系。假设我们安装了A和C模块，这两个模块同时依赖于同一个版本的B模块，此时`node_modules`结构如下。

``` 
- A
- C
- B
```



不过有的时候，我们安装的模块A和C可能依赖于同一个模块B的不同版本。

1. 假设`node_modules`存在`B@1.1.0`。然后我们安装的模块A依赖于`B@^1.1.0`，即使模块B最新版本已经到了`1.9.0`，我们也会复用原本已安装的模块。

   ```
   - A
   - B@1.1.0
   ```

2. 假设`node_modules`存在`B@1.1.0`。然后我们安装的模块A依赖于`B@^1.2.0`，则会安装最新的模块（如`B@1.9.0`）

   ``` 
   - A -> B@1.9.0 
   - B@1.1.0
   ```

   

##### npx

在`npx@5.2`之后引入了`npx`这个强大的命令。

除了提供了像`npx pm2`这样的脚本执行方式，`npx`的另一个特性是无需安装即可执行命令。



比如`npx create-react-app my-app`，我们无需提前安装`create-react-app`，借助`npx`会下载并使用该库来生成我们的项目，并在任务执行完成后删除下载好的`create-react-app`。



##### npm ci

`npm ci`的作用和`npm i`一样，用来安装依赖模块，而该命令经常被用在持续集成CI当中。

使用该命令时需要确保项目中存在`package-lock.json`或`npm-shrinkwrap.json`，并且当`package.json`和`package-lock.json`中依赖的版本不一致时`npm ci`会抛出错误。





##### 模块发布

在使用`npm login`登陆自己的NPM账号之后，我们可以在项目目录使用`npm publish`发布模块，使用`npm unpublish --force`来删除发布的模块，需要注意的是NPM的镜像源需要是官方镜像`npm config set registry https://registry.npmjs.org`

NPM的模块分为公共模块和私有模块，发布私有模块是需要付费的。除此之外NPM的模块还存在形如`@akara/my-package`这样子的，属于用户作用域的模块，如果想要发布这样的模块，首先需要确保模块的名字形如`@akara/my-package`，并且由于这种模块默认是私有的，为了不花钱我们需要使用`npm publish --access public`来发布公共的作用域模块。







当我们发布一个npm库时，通常目的是发布构建后的文件，所以我们需要控制哪些文件可以被发布，哪些文件不会被发布。

1. `.gitignore`中的文件不会被发布
2. `.npmignore`中的文件不会被发布
3. `package.json`中的`files`字段指定哪些文件会被发布



## 事件循环

浏览器和Node环境都存在事件循环这一概念，但因为它们基于不同的架构所以实现原理也有些许不同，比如浏览器环境的事件循环是通过主线程和工作线程之间的调度实现的。另外，在Node的`11.0`版本的发布之后，同一段代码在两个不同环境的表现也越来越相似了，所以在这里我会主要以浏览器环境介绍事件循环的原理。

众所周知浏览器是基于多线程的，除了用来渲染页面的GUI渲染线程，还有执行JavaScript代码的主线程和各种工作线程，不同的工作线程分别用来处理定时器任务、I/O操作、事件等操作。

当我们在主线程执行一段代码时，通常会使用`fetch`来发出一个请求，发请求的这个操作是交给专门的工作线程来执行的，因此该操作本身并不会阻塞后续代码的执行。而当我们收到了对应的响应时，该工作线程会把一个**任务**交给主线程执行，这就是所谓的**异步**。

当然了，此时我们的主线程可能还在执行代码中，所以实际上任务并不会立刻被交给主线程执行，与之对应的是该任务会被添加进一个专门的**任务队列**当中，主线程执行完代码后会从任务队列中取出任务来执行。不仅如此，根据不同的类型我们又把任务分为**宏任务**和**微任务**，因此我们的队列也有两个：**宏任务队列**和**微任务队列**。

那么先让我们明确哪些任务属于宏任务和微任务，首先我们可以把最初交给主线程执行的代码视为一个宏任务，其他的宏任务包括：`setTimeout`或`setInterval`、`I/O`操作（如`ajax`或文件读取）、事件（如点击事件）、`setImmediate`（Node专有）。而最常见的微任务有`promise.then()`。

事件循环的基本规则就是，执行完一个宏任务，再执行微任务队列中的所有微任务，再执行下一个宏任务...如此往复。因此一个事件循环可以视为一个宏任务+所有微任务，另外也可以把执行一个宏任务的阶段，或着执行所有微任务的阶段，称作一个`tick`，由此可见一个事件循环由两个`tick`组成。无论是对于Node中的`process.nextTick`还是`Vue`中的`$.nextTick`，理解何为`tick`都是很有帮助的。

##### nextTick

`process.nextTick`是Node独有的一个方法，顾名思义我们可以知道这个方法的目的是让某个任务在下一个`tick`的最开始执行。比如，当我们处在一个宏任务阶段调用`process.nextTick`，那么会在当前宏任务执行结束后，在后续的微任务阶段执行前执行`nextTick`接受的回调函数。

事实上在Node中专门维护了一个`nextTick`队列，每当我们执行完一个`tick`，就会执行`nextTick`队列中的所有任务（行为很像微任务队列）。

``` js
// 可以想一想这个代码的结果
setTimeout(() => {
    console.log(1)
    process.nextTick(() => {
        console.log(2)
    })
}, 0)

new Promise((resolve) => resolve())
.then(() => {
    console.log(3)
    process.nextTick(() => {
        console.log(4)
    })
})

process.nextTick(() => {
    console.log(5)
    process.nextTick(() => {
        console.log(6)
    })
    setImmediate(function () {
        console.log(7)
    })
})

process.nextTick(function () {
    console.log(8)
    process.nextTick(() => {
        console.log(9)
    })
})
```





##### Node事件循环

Node的架构和浏览器有很大不同，因此它实现事件循环的方式也大相径庭。Node的事件循环中有**六个阶段**，**每个阶段中都有一个宏队列，总共只有一个微队列和一个`nextTick`队列**。

1. `Timer`: `SetTimeout`和`SetInterval`的回调放进该阶段的任务队列。
2. `pending callback`: 执行一些系统操作的回调，例如TCP的错误。
3. `idle, prepare`: 处理一些内部调用。
4. `poll`: **大部分其他回调会被仿佛该阶段的任务队列**
5. `check`: `SetImmediate`的回调放进该阶段的任务队列。
6. `close callback`: 一些结束时的回调，例如`Socket.on("close")`

我们可以只重点关注三个阶段，`Timer`、`poll`、`check`。



低版本（`v11.0`以前）的Node表现的行为和浏览器环境有很大的不同，是因为低版本下的Node在执行完**一个阶段的所有宏任务**再执行微任务；而**高版本的Node表现和浏览器一致**，即执行完一个宏任务再执行微任务。

以下的这段代码在不同版本的Node下表现的行为就会有所不同

``` js
setImmediate(function(){
    console.log(1);
    process.nextTick(function(){
        console.log(4)
    }) 
})
process.nextTick(function(){
    console.log(2)
    setImmediate(function(){
        console.log(3);
    })
})
```

1. 当我们遇到`setImmediate`后，将其回调函数放进`check`阶段的宏队列中。
2. 当我们遇到`process.nextTick`后，将其回调函数放进`nextTick`队列中。因为此时同步代码（或者说最初的宏任务）执行完毕，那么执行`nextTick`队列中的任务。
3. **输出2**， 遇到`setImmediate`后，将其回调函数放进`check`阶段的宏队列中。
4. 开始执行`check`队列中的宏任务。
5. 执行`check`第一个宏任务，**输出1**，将`nextTick`的回调放进队列里。

以上五步，无论版本如何都是一致的，接下来就是高低版本Node的不同。

**低版本Node**

因为低版本Node是执**行完一个阶段中的全部宏任务后，再执行微队列的全部任务**。所以**先输出3，再输出4。**

**高版本Node**

因为高版本Node是**执行完一个宏任务，就执行微队列的全部任务**。所以**先输出4，再输出3。**

## http模块

``` javascript
const http = require('http')
const server = http.createServer((req, res) => {
    console.log(req.url) // 请求url
    console.log(req.method) // 请求方法
    console.log(req.headers) // 请求头部

    if (req.url === '/') {
        // 设置响应的状态码和头部
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})

        // 单独设置状态码
        res.statusCode = 200
        // 单独设置响应头部
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        // Set-Cookie
        res.setHeader('Set-Cookie', 'name=akara; secure')
		
        // 设置响应实体
        res.write("hello world")
        res.write("!!!")
        // 发送响应报文
        res.end()
    }

})

server.listen(3000, () => {
    console.log("服务器跑在3000端口")
})
```

##### 静态目录

``` javascript
const http = require('http')
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // ...
    }
    else {
        let filePath = path.join(__dirname, 'static', url.pathname)
        try {
            let file = await fs.readFileAsync(filePath)
            res.statusCode = 200
            res.end(file)
        } catch (error) {
            res.statusCode = 404
            res.end("404 Not Found")
        }
    }
    // 或者
    else {
        let fileName = url.pathname
        let type
        switch(fileName.substr(fileName.lastIndexOf('.') + 1)) {
            case 'css':
                type = 'text/css; charset=utf-8'
                break
            case 'js':
                type = 'applaction/javascript; charset=utf-8'
                break
            // other situations 
            default:
                type = 'application/octet-stream'
                break
        }
        try {
            let file = await fs.readFileAsync(`./static${url.pathname}`)
            res.writeHead(200, {'Content-Type': type})
            res.end(file)
        } catch (error) {
            res.writeHead(400, {'Content-Type': 'text/plain; charset=utf-8'})
            res.end("404错误啦！")
        }
    }
}).listen(3000)


```

##### 处理Post请求

``` javascript
// 前端 (省略部分代码)
let type = typeof data
let header
if (type === 'string') {
    header = 'application/x-www-form-urlencoded'
}
else if (data instanceof File || data instanceof FormData) {
    header = 'multipart/form-data; boundary=---xxxxxxxxxxxx'
}
else {
    header = 'application/json'
    data = JSON.stringify(data)
}
xhr.setRequestHeader('Content-type', header)
xhr.send(data)


// 后端
const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    if (req.url === '/upload') {

        let segment = []

        req.on('data', (chunk) => {
            // chunk为Buffer对象
            // 字符串aaa=bbb对应的Buffer对象如下
            // <Buffer 61 61 61 3d 62 62 62>
            segment.push(chunk)
        })

        req.on('end', () => {
            // 文件上传代码
            segment = Buffer.concat(segment)
            // 下方代码获取buffer转成的字符串
            // segment = Buffer.concat(segment).toString()
            fs.writeFile('fileName', segment, (err) => {
                res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
                res.write("文件上传成功！")
                res.end()
            })
        })
    }
})

server.listen(3000, () => {
    console.log("服务器跑在3000端口")
})
```



## fs模块

``` javascript
const fs = require('fs')
```

##### `readFile`

``` javascript
fs.readFile('./image.png', (err, buffer) => {
    if (err) throw err
})
```

##### `writeFile`

``` javascript
// 写入文本
fs.writeFile('index.txt', 'hello world', 'utf8')
// 写入buffer
fs.writeFile('image.png', buffer)
```

##### `createReadStream`

##### `createWriteStream`

``` javascript
const reader = fs.createReadStream(data.path)
const stream = fs.createWriteStream(`./image/${Math.floor(Math.random() * 10000)}.jpg`)
reader.pipe(stream)
```

## path模块

``` javascript
const path = require('path')
```

##### `__dirname`

返回当前文件所在的**绝对路径**

##### `path.resolve`

``` js
const url = path.resolve('static')
```

根据传入的参数解析出对应的**绝对路径**。

- 当传入的参数是相对路径，如`index`、`../index`，会算出相对**`process.cwd()`**的绝对路径

  ``` js
  const url = path.resolve('.') // 等于process.cwd()
  ```

- 当传入的参数是绝对路径，如`/index`，会算出相对**根路径**的绝对路径

##### `path.join`

用来拼接传入的参数得到一个**相对路径**，它的好处是可以抹平不同平台的分割符号的差异（如Linux环境下分隔符为`/`，而Windows环境下分隔符为`\`）

``` javascript
const path1 = path.join('a', 'b') // 'a/b'
const path2 = path.join('a', 'b', '../c') // 'a/c'
const path3 = path.join(__dirname, '..', 'b') 
```



## process模块

##### `process.cwd()`

获得执行脚本时所处的绝对路径。当我们使用`fs.readFile`等函数并传入`./index.html`形式的相对路径时，相对路径实际上是相对于执行脚本时所在的目录路径，也就是相对于`process.cwd()`。

因此根据执行脚本时所处路径的不同，结果也可能有很大的差异，所以很多时候我们会传入绝对路径，如

``` js
fs.readFile(`${__dirname}/../index.html`)
fs.readFile(path.join(__dirname, '../index.html'))
```



##### `process.argv`

获取执行脚本时命令行输入的参数

``` js
$node index.js abc
[
    'node',
    'index.js',
    'abc'
] // process.argv
```





##### `process.stdout`

标准输出流

``` js
process.stdout.write('Hello world')
```



##### `process.stdin`

标准输入流

``` js
process.stdin.on('data', (chunk) => {
    process.stdout.write('Hello' + chunk)
    process.exit()
})
```



## 环境变量

##### `process.env`

在`Node`中可以通过`process.env`拿到环境变量，从而根据不同的环境执行不同的代码。



##### cross-env

通常不同系统设置环境变量的方式不同，为此可以使用第三方库`cross-env`来设置环境变量。

``` json
// package.json
{
    "script": {
        "start": "cross-env NODE_ENV=development node app.js"
    }
}
```

##### dotenv

除了在命令行中设置环境变量，我们也可以使用单独的文件`.env`来保存环境变量，并搭配`dotenv`库来读取`.env`文件中的环境变量。

``` .env
NODE_ENV=development
name=aka
```

``` js
// app.js
const dotenv = require('dotenv')
dotenv.config() // 读取.env文件中的信息

console.log(process.env.NODE_ENV)
```

或者我们可以写一个`config.js`

``` js
// config.js
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    name: process.env.name
}
```

``` js
// app.js
const { NODE_ENV, name } = require('./config.js')
console.log(NODE_ENV, name)
```

## util模块

这个模块提供了诸多很有用的小工具。

##### `deprecate`

``` js
const util = require('util')
function A() {
    console.log('aaa');
}

module.exports = util.deprecate(A, 'A() is deprecated. Use B() instead.')
```



##### `promisify`

``` js
const util = require('util')
const fs = require('fs')
const readFile = util.promisify(fs.readFile)

async function A() {
    const data = await readFile('./index.html') 
}
```





## child_process模块

Node的`child_process`模块提供了创建子进程的四种方式，分别是`folk`、`exec`、`execFile`、`spawn`。

其中，只有`fork`是用来创建Node程序的子进程，其他三种可以用来创建`shell`子进程。

##### `fork`

``` js
// parent.js
const cp = require('child_process')
const path = require('path')
const child = cp.fork('./child.js')

child.on('message', (msg) => { // 进程通信
  	console.log(msg);
  	child.disconnect()
})
child.send('hello')

// child.js
process.on('message', (msg) => {
  	console.log(msg);
  	process.send('akara')
})
```

`exec`可以直接在Node代码中写入`shell`命令，并且在执行一些危险的脚本（如`rm / -rf`）是不会提示的；而`execFile`和`spawn`的参数都是文件的名字，并且`execFile`在执行危险操作时会爆出异常，因此更加的安全。

##### `exec`

``` js
const exec = util.promisify(cp.exec)

(async function () {
  const res = await exec(cat ${file})
  console.log(res.stdout);
})()
```

##### `execFile`

``` js
const exec = util.promisify(cp.execFile)

(async function () {
  	const res = await exec('cat', [file])
  	console.log(res.stdout);
})()
```

##### `spawn`

`spawn`的特点是基于流的，因此可以使用`pipe`显得更加灵活

``` js
const cat = cp.spawn('cat', [file])
const sort = cp.spawn('sort')

cat.stdout.pipe(sort.stdin)
sort.stdout.pipe(process.stdout)
```



## cluster模块

使用cluster来搭建集群node应用

怎么讲呢，直接看网上的代码吧。

``` js
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length; // 获取CPU的个数

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
 }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
 });
} else {
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
 }).listen(8000);
}

```

以上代码，父进程根据CPU的数量创建子进程。只看代码的话，容易理解成每一个进程都创建了一个server来监听8000端口，但这是不切实际的。其实cluster做了很多事情，在实际的情况下，父进程会创建server监听端口，收到的请求会分发给不同的进程去处理。

cluster让我们不用亲自去管理进程通信的事情（process.on('message')），而且也自带负载均衡的策略。

默认情况，除了windows系统下，使用cluster时的负载均衡策略为round-robin。比如刚才的服务器，收到了8个请求，第一个请求交给第一个子进程处理，第二个请求交给第二个子进程...

在windows系统下，通过以下代码来设置负载均衡策略为round-robin

`cluster.schedulingPolicy = cluster.SCHED_RR;`

另外，pm2也自带cluster，比如可以靠以下代码创建8个子进程。

`pm2 start app.js -i 8`



## url模块

``` javascript
// 当请求url为 http://localhost:3000/index.html?name=akara#aa
const url = require('url')
let {
    search, // '?name=akara'
    query, // 'name=akara'
    pathname, // '/index.html'
    path, // '/index.html?name=akara'
} = url.parse(req.url)
```

## querystring模块

``` javascript
const qs = require('querystring')
var str = 'foo=bar&abc=xyz&abc=123';

querystring.parse(str)
// { foo: 'bar', abc: [ 'xyz', '123' ] }
```

## os模块

获取操作系统相关信息。

``` js
const os = require('os')
const homedir = os.homedir() // 获取用户目录
```



## event模块

> 实现原理见本文的设计模式-发布订阅章节

``` javascript
var EventEmitter = require('events').EventEmitter
var emitter = new EventEmitter()

emitter.on('ev', function () {

})

emitter.emit('ev')
```



------

以上是Node自带的核心库，下面介绍一些常用的第三方库。

## bluebird库

可以将回调函数实现的异步改写成Promise的方式来写的第三方库。

##### bluebird + fs

回调

``` javascript
const fs = require('fs')
fs.readFile('index.html', (err, data) => {
    response.end(data)
})
```

Promise

``` javascript
const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs'))

fs.readFileAsync('index.html')
.then(data => {
    response.end(data)
})
```

##### bluebird + mysql

回调

``` javascript
const mysql = require('mysql')
// mysql配置文件
let config = require('./config')
conn.connect()

// 使用
conn.query(`sql code here...`, (err, data) => {

})
```

Promise

``` javascript
const bluebird = require('bluebird')
const mysql = require('mysql')
// mysql配置文件
let config = require('./config')
const conn = bluebird.promisifyAll(mysql.createConnection(config))
conn.connect()

// 使用
let data = await conn.queryAsync(`sql code here...`)
```



## PM2

除了常见的`pm2 start index.js`，我们也可以使用配置文件。

``` js
// 比如取名为 ecosystem.config.js
module.exports = {
  apps: [{
    script: './server/app.js',
    watch: '.',
    env_development: {
      "REACT_APP_NODE_ENV": "development"
    },
    env_production: {
      "REACT_APP_NODE_ENV": "production"
    }
  }]
}
```

之后通过以下命令来启动服务

``` shell
pm2 start ecosystem.config.js --env development
// or
pm2 start ecosystem.config.js --env production
```



##### 常用命令

``` js
pm2 start app.js
pm2 list
pm2 delete [app-id]
pm2 logs
pm2 logs [app-name]
pm2 monit
// ...
```







## 命令行工具

介绍常用的命令行工具

##### chalk

给日志输出加上颜色。

``` js
import chalk from 'chalk'
console.log(chalk.blue('akara'))  // 蓝色字体
console.log(chalk.blue.bgRed('akara')) // 蓝色字体，红色背景
```



##### yargs

提供了对命令行参数的解析功能，并且默认提供了`--help`、`--version`选项。

``` js
#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const http = require("http");

yargs(hideBin(process.argv)) // hideBin(process.argv) 相当于 process.argv.slice(2)
    .command( 
        "serve [port]", // [port]为可选参数
        "启动服务器",
        { // 设置命令参数的别名、默认值等信息
            port: {
                alias: "p",
                default: 3000,
            },
        },
        (argv) => {
            http.createServer((req, res) => {}).listen(argv.port, () => {
                console.log(`服务器运行在${argv.port}端口`);
            });
        }
    )
    .command("curl <url>", "发送请求", {}, (argv) => { // <url>为必须参数
        if (argv.verbose) console.log('已经开启verbose')
        console.log(argv.url);
    })
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Run with verbose logging'
    })
    .argv;
```

``` bash
cli --help
cli --version
cli serve 8000 # cli serve -p 8000 | cli serve --port=8000
cli curl 'google.com' -v
```

##### commander

和`yargs`作用差不多，可以选择其中一个来开发自己的命令行工具。

``` js
#!/usr/bin/env node
const { program } = require('commander')

program
    .version('1.0.0')
    .description('cli tool')
    .option('--verbose', 'use verbose') // 布尔值
    .option('-u, --url <url>', 'url参数') // 必须参数
    .option('-p, --port [port]', 'port参数', 3000) // 可选参数，可设置默认值
    .parse(process.argv)

console.log(program.opts());
```

##### inquirer

非常有用的命令行工具，常见于各种脚手架中。

``` js
#!/usr/bin/env node
const inquirer = require('inquirer')
const questions = [
    {
        type: 'confirm',
        name: 'isPeople',
        message: '你是人吗?',
        default: false
    },
    {
        type: 'input',
        name: 'name',
        message: '请输入你的名字',
    },
    {
        type: 'input',
        name: 'phone',
        message: '请输入你的电话号码',
        validate(value) {
            const pass = value.match(/^1[34578]\d{9}$/g)
            if (pass) return true
            return '请输入正确的电话号码'
        }
    },
    {
        type: 'list',
        name: 'sex',
        message: '请选择你的性别',
        choices: ['Male', 'Female', 'None'],
        filter(val) {
            return val.toLowerCase();
        },

    }
]
inquirer
    .prompt(questions)
    .then(answers => {
        console.log(JSON.stringify(answers, null, ' '));
    })
```







##### readline

``` js
// 官网代码
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('你好', (answer) => {
    console.log('666');
    rl.close()
})
```

``` js
// 官网代码
const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('log.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // 注意：我们使用 crlfDelay 选项将 input.txt 中的所有 CR LF 实例（'\r\n'）识别为单个换行符。

  for await (const line of rl) {
    // input.txt 中的每一行在这里将会被连续地用作 `line`。
    console.log(`Line from file: ${line}`);
  }
}

processLineByLine();
```

##### puppeteer

使用`puppeteer.connect`来复用已启动的浏览器进程。

1. 启动Chrome的时候加上`--remote-debugging-port=9222 `，重启浏览器

2. 访问`http://127.0.0.1:9222/json/version`拿到`webSocketDebuggerUrl`字段

3. ``` js
   const url = 'ws://127.0.0.1:9222/devtools/browser/81daad69-fb53-49ea-9f97-3683b73afea0'
   const browser = await puppeteer.connect({
       browserWSEndpoint: url,
   });
   ```

   

参考：https://medium.com/@jaredpotter1/connecting-puppeteer-to-existing-chrome-window-8a10828149e0