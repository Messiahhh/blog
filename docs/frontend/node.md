---
sidebarDepth: 4
---
# Node

## 模块

**在Node中引入模块，会发生什么？**

在Node中，模块分为两类：一类是node提供的**核心模块**，一类是用户编写的**文件模块**

- 路径分析

  如果发现引入的是核心模块，则不用进行接下来的两步了，因为核心模块早已编译为二进制，当node进程启动时，部分核心代码已经直接加载进内存中。
- 文件定位
- 编译执行

##### IIFE

立即执行函数（IIFE）是以前主流的模块化方案，比如 `Jquery`就使用该方案。

```javascript
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

很久以前的一种模块化方案，类似的方案还有CMD。需要额外安装 `require.js`库，使用 `define`定义模块，使用 `require`加载模块。

现在基本不用。

##### CommonJS模块

和`ES`模块是目前最主流的两个模块化方案。

```javascript
// a.js
function getName() {
    return 'Akara'
}
module.exports = getName

// b.js
const getName = require('./a')
getName() // 'Akara'
```

`require`可以简单看作包了一层立即执行函数，该立即执行函数返回了那个模块的 `module.exports`

```javascript
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

模块内部有 `module`和 `exports`两个变量，其中 `module.exports`和 `exports`指向同一片内存。

又因为我们模块实际返回的是 `module.exports`，所以如果直接对 `exports`变量重新赋值肯定是错误的操作。

```js
module: {
    id: '.'
	exports: {}
}
```

##### UMD

`UMD`是上述三种模块化方案 `IIFE`、`AMD`、`CommonJS`的结合，即用来兼容多套模块化系统。

```js
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

##### ES模块

通常我们把`.mjs`文件视为`ES`模块，或者`package.json`的`type`为`module`时该项目下所有`.js`文件都视为`ES`模块。ES6模块使用 `import`和 `export`语法来导入和导出模块。

###### export

``` js
// a.js
const A = 'akara'
export default A // 等价于 export { name as default }
export function B() { // 等价于 export { getName as getName }
    return name
}
const C = 'akara'
export { C as alias }
```

###### import

``` js
// b.js
import A from './a.js' // 等价于 import { default as name }
import { B } from './a.js' // 等价于 import { getName as getName }
import { alias as C } from './a.js'
console.log(A, B, C)
```

除了逐个接口`import`，我们甚至可以一次性`import`整个模块

``` js
// b.js
import * as myModule from './a.js' 
console.log(myModule)
// [Module: null prototype] {
//     B: [Function: B],
//     alias: 'akara',
//     default: 'akara'
// }
```

###### import CJS

通常来说我们会使用`CommonJS`模块引用`CommonJS`模块，使用`ES`模块引用`ES`模块，而我们甚至可以使用`ES`模块引用`CommonJS`模块（当然，`CommonJS`是无法引用`ES`模块的）

``` js
// a.js
module.exports = function A() {
    console.log('common模块')
}

// b.mjs
import * as myModule from './a.js' // 默认导入了a.js文件的module.exports
console.log(myModule)
// [Module: null prototype] { 
//     default: [Function A] 
// }

import A from './a.js'
console.log(A)
// [Function: A]
```

由此可见，`CommonJS`模块只能定义一个`default`接口，而`ES`模块除了`default`接口还可以定义其他自定义接口。从这个角度来看`ES`模块能引用`CommonJS`模块是比较科学的，因为`ES`模块能处理`default`接口；而`CommonJS`模块无法引用`ES`模块是因为`CommonJS`无法处理`ES`模块可能暴露的非`default`接口。



###### 对比

`CJS`模块和 `MJS`模块存在几大区别

1. `CJS`模块会被整体导入，而 `MJS`可以被部分导入。因此使用 `MJS`可以 `tree shaking`。
2. `import`命令会在**其他所有代码执行前**就被JavaScript引擎静态分析，可以说它是在**编译时加载模块**。

   所以我们通常只能把 `import`放在模块的顶层，并且不能放在如 `if`之类的代码块中。

   并且由于这个特性，我们不能在JS代码执行中根据条件来动态加载模块，而 `require`可以做到这一点，`require`是**运行时加载模块**。

   好在，我们可以使用 `import()`来实现**运行时加载模块**，组件的懒加载通常就是使用 `import()`搭配代码分割来实现的。





## NPM

### .npmrc

NPM的配置文件

``` shell
registry=https://registry.npmjs.org/
package-lock=false # 不启用NPM锁
```



### 命令

##### npm config

``` shell
npm config set registry https://registry.npmjs.org/
npm config get prefix 
npm config delete registry
npm config 
```

##### npm init

初始化`package.json`

``` shell
npm init -y
```

##### npm install

``` shell
npm install <name> --save # yarn add <name>
npm install <name> --save-dev # yarn add <name> -D
npm install -g <name> # yarn global add <name>

npm install
npm ci # 通常用于CI，使用该命令时需要确保项目中存在 package-lock.json或 npm-shrinkwrap.json，并且当 package.json和 package-lock.json中依赖的版本不一致时 npm ci会抛出错误。
```



本地安装时，模块会被安装在`/project/node_modules`下，同时如果该模块的`package.json`中存在`bin`字段时，则会自动根据`bin`表示的字典在`/project/node_modules/.bin`下面创建对应的符号链接。

全局安装时，模块会被安装在`/usr/local/lib/node_modules`（以MacOS举例）下，同时如果该模块的`package.json`中存在`bin`字段时，则会自动根据`bin`表示的字典在`/usr/local/bin`下面创建对应的符号链接（可理解为Windows中的快捷方式）。



举个例子，`akara-project`的`package.json`中的`bin`字段如下，那么当全局安装`akara-project`时会创建`/usr/local/bin/akara`这个文件（符号链接），这个文件实际指向着`akara-project`根路径下的`index.js`。（其实这就是开发命令行工具的原理）

``` json
{
  "bin": {
    "akara": "index.js"
	}
}
```



##### npm uninstall

``` shell
npm uninstall <name> # yarn remove <name>
```

##### npm update

``` shell
npm update <name> # yarn upgrade <name>

npm update
```



举个例子，如果我们的项目（采用锁机制）存在老版本的`react@^16.0.0`，此时我们（包括CI）只能拿到`16.0.0`版本的`react`。如果我们现在想要升级`react`可以采取两种方式：`npm install react`或`npm update react`。前者更类似于重新安装`react`，并会重写`package.json`中的依赖关系；而`npm update`并不会改动`package.json`，它仅仅是根据`package.json`中的版本`semver`来重新安装可安装的最新`react`。二者都会重新生成`package-lock.json`。

##### npm outdated

查看项目中哪些模块不是最新版本

``` shell
npm outdated 
```

##### npm run 

``` shell
npm run start # 执行脚本
npm run-script <stage>
```

##### npm link

> alias: npm ln

简单来说这个命令存在两种用法，可用于将本地模块链接到全局，或是将全局模块链接到本地。

用法一：

当我们位于模块`akara-project`项目中时，直接执行`npm link`会把当前模块链接到全局（具体来说的话，会在`/usr/local/lib/node_modules`下创建一个符号链接指向着`akara-project`这个模块，如果该模块的`package.json`存在`bin`字段时还会在`/usr/local/bin`下面创建对应的符号链接）

用法二：

当我们位于某个项目中时，并假设我们已经全局安装了一个模块（如`pm2`），此时在项目中执行`npm link webpack`会把全局模块链接到本地（具体来说的话，会在当前项目的`node_modules`创建一个符号链接`pm2`指向着全局的`pm2`模块，如果该模块的`package.json`存在`bin`字段时还会在`/project/node_modules/.bin`下面创建对应的符号链接）



通过结合方法一和方法二我们可以实现这样的功能：假设我们同时维护着项目A和模块B，并在项目A中引用着模块B。那么比较传统的方法来维护这两个库是这样的，更新完模块B后发布，然后在项目A中更新模块B从而查看最新的效果；而通过`npm link`我们可以简化这个流程，我们只需要先在B模块中通过`npm link`来把B模块链接到全局，然后在A项目中通过`npm link B`来把全局B模块链接到A项目本地。



##### npm exec

可以直接执行`node_modules/.bin`下的可执行文件

``` shell
npm exec webpack # 等于npx webpack
```



##### npm publish

``` shell
npm publish # 发布模块
npm unpublish --force # 下架模块

npm publish --access publish # 发布公共模块
```



在通过`npm login`登陆了`npm`账户后，我们可以在任意项目下通过`npm publish`来进行模块的发布，此时NPM镜像源需要是官方镜像源。

除了通常的模块，我们还可以发布类似`@akara/my-package`这样的作用域模块，此时我们需要`npm publish --access publish`。这是因为NPM模块分为公共模块和私有模块，通常我们发布的都是公共模块，而发布私有模块是收费的，同时发布作用域模块默认是发布私有模块，因此我们需要显式的制定模块的类型。



发布NPM模块时，`.gitignore`和`.npmignore`中指定的文件不会被发布出去。除此之外我们还可以通过`package.json`的`files`来指定只有哪些文件能被发布。

1. `.gitignore`中的文件不会被发布
2. `.npmignore`中的文件不会被发布
3. `package.json`中的 `files`字段指定哪些文件会被发布

##### npm view

查看一个模块的信息

``` shell
npm view <name> # e.g npm view antd
```

##### npm version

``` shell
npm version # 查看当前版本
npm version patch # 升级一个补丁版本，同时自动git commit并打上版本号对应的git tag，如v1.0.1
npm version minor # 升级一个小版本，如v1.1.1
npm version major # 升级一个大版本，如v2.0.0
```

##### npm audit

``` shell
npm audit # 查看当前项目所有依赖模块的漏洞
npm audit --fix # 更新所有存在漏洞的模块来修复漏洞
```

当我们安装模块时会自动提示当前版本的模块的漏洞，我们也可以通过该命令来查找当前项目所有依赖中可能存在的漏洞

##### npm fund

``` shell
npm fund
```

当我们安装模块时会自动提示有多少个模块正在寻找投资/资助，我们也可以通过该命令来查看具体是哪些命令在寻找投资





### package.json

##### type

以`.cjs`结尾的文件会被视为`CommonJS`模块，以`.mjs`结尾的文件会被视为`ES`模块，而普通的`.js`文件则会根据`type`字段的不同视为不同的模块，默认不带`type`视为`CommonJS`模块，`type: 'module'`则视为`ES`模块。



##### files

对于一些模块而言，用户只需要引用该模块源码构建后的产物，而并不想连源代码也一起安装。这样的模块通常会通过`files`字段来规定哪些模块才会被发布，如`"file": ["dist", "README.md"]`

需要注意的是以下文件永远都会被外部下载：`package.json`、`README`、`CHANGE / CHANGELOG / HISTORY 	`、`LICENSE / LICENCE`、`NOTICE`、`main`字段指向的文件。

##### main

用来规定模块的默认入口，默认值为 `index.js`。

```js
const test = require('my-module') // 引入my-module模块的根目录的index.js文件
```

##### exports

功能类似`main`，同时存在`exports`和`main`时，`exports`字段的优先级更高

```json
{
    "exports": {
        ".": "./index.js", 
        "./test": "./src/test.js" 
    }
}
```

```js
const test = require('my-module') // ./index.js
const test2 = require('my-module/test') // ./src/test.js
```

可以看到一旦使用了`exports`字段，那么模块的引用规则就和以往有较大的区别，此时我们不再能根据模块的任意路径来引用相对应的文件，只能根据`exports`所指定的映射关系来引用所给定的文件。

`exports`还能够根据导入模块时使用的是 `require`还是 `import`选择不同的导出。

```json
{
    "exports": {
        ".": {
            "require": "./a.js",
            "import": "./b.mjs"
        }
    }
}
```



##### bin

如之前说过那样，当我们通过`npm install`安装模块时，会根据该模块`package.json`中的`bin`字段来创建指向指定文件的符号链接

``` json
{
	"bin": {
    "akara": "index.js"
	}
}
```

假设`akara-project`的配置如上，那么全局安装`akara-project`时会创建`/usr/local/bin/akara`符号链接（指向着`/usr/local/lib/node_modules/akara-project/index.js`），所以现在我们可以直接在命令行中输入`akara`来执行对应的`index.js`（当然实际上我们还需要两个小步骤，一是我们需要规定`index.js`这个文件执行的环境，因此需要在`index.js`代码的第一行加上`#!/usr/bin/env node`；二是我们需要通过执行`chmod +x index.js`来给予该文件可执行权限）



如果我们是本地安装而不是全局安装`akara-project`，那么创建的符号链接`akara`会被放在`project/node_modules/.bin`下面，此时无法直接通过在命令行输入`akara`来执行命令，我们有其他的几种方式

1. `./node_modules/.bin/akara`

2. `package.json`的 `script`字段中填写执行方式，如

   ```1
   {
       "script": {
           "run-my-script": "akara"
       }
   }
   ```

3. `npm exec akara`

4. `npx akara`

##### script

`npm`除了 `npm ci`、`npm install`等内置脚本，还包括 `hook script`（`pre/post script）`和 `lifecycle script`。

###### pre & Post 

对于一个脚本我们可能想要在其执行之前或之后执行某些操作，此时可以使用 `pre`或 `post`前缀。

```json
{
    "script": {
        "test": "echo \"i'm test\"",
        "pretest": "echo \"在test脚本执行前执行\"",
        "posttest": "echo \"在test脚本执行后执行\""
    }
}
```

###### LifeCycle

`npm`内置了一些生命周期脚本，如`prepare`、`prepack`等

```json
{
    "script": {
        "prepare": "echo \"hello akara\""
    }
}
```

##### dependencies

项目的依赖

##### devDependencies

项目的开发依赖。如果我们在NPM发布了一个模块A，之后当我们 `npm install A`时会自动安装模块A的依赖，但不会安装模块A的开发依赖。

##### peerDependencies

假设存在A库，该库存在一个插件B，那么很明显插件B自身是不依赖于库A的，但是又需要你的项目中存在库A，那么插件B的 `package.json`中就可以通过 `peerDependencies`来指定同级依赖关系。比如插件B只能在1.0版本的A库中起作用，那么 `peerDependencies`可能是 `A@1.0.0`，当你的项目中同时安装了插件B和2.0版本的A库时就会出现警告。



##### browser | module

一般 `browser`字段指向 `cjs`或 `umd`模块，`module`字段指向 `es`模块，大多数情况下这两个字段都没什么用处。

在某些情况下，特别是使用 `webpack`打包模块时，当 `webpack`配置的 `target`为 `web`（默认值），会根据模块的 `browser`字段导入模块；通过设置 `target`为 `node`，会根据 `module`字段导入模块。

另外，当 `package.json`不存在对应的入口字段，会根据 `browser -> module -> main`的优先级导入模块。这个优先级是根据配置 `resolve.mainFields`字段指定的，我们可以通过修改该字段来调整优先级：

```js
// webpack.config.js
module.exports = {
    target: 'node', // 默认值web
    resolve: {
        mainFields: ['main', 'module', 'browser'] // 默认值 ['browser', 'module', 'main']
    }
}
```

### package-lock.json

在 `package.json`的 `dependencies`字段中我们经常能看见这种形式的版本号 `"react": "^17.0.2"`、`"xx": "~0.10.0"`，这种写法通常被称为[`semver`表示法](https://github.com/npm/node-semver)，三个数字分别表示主要版本、次要版本、补丁版本。

当我们使用 `npm install <name>`来安装依赖，或者是在已有的项目中使用 `npm update`来更新依赖，都会根据 `semver`规则安装对应版本的模块，也就是说**实际安装版本并不是固定的**。

- `^`：表示只会执行不更改最左边非零数字的更新。比如 `^0.10.0`，意味着我们可以安装（或更新，下同）`0.10.1`等版本，但不能安装 `0.11.0`或更高的版本；又比如 `^1.10.0`，意味着我们可以安装 `1.10.1`、`1.11.0`等版本，但不能安装 `2.0.0`或更高的版本。
- `~`：如果我在比较器中指定了次要版本，那么只允许补丁版本的更新；如果没有指定次要版本，那么可以允许次要版本的更新，所以通常情况 `~`只允许补丁级别的更新。比如 `~1.10.0`的依赖，意味着我们只能安装 `1.10.x`的版本，不能安装 `1.11.0`的版本。

而这也带来了一个新的问题，对于同一个项目在不同时机安装的依赖版本可能不一致，这就带来了相当大的风险和不可控性，特别是当依赖的某个包更新了一个漏洞，那也会影响到我们新构建的代码。

因此高版本`yarn`和`npm`都默认启用了`lock`机制，当我们`npm install <name>`安装依赖或`npm update`更新依赖的时候都会生成`package-lock.json`（`yarn`对应`yarn.lock`），那当其他人`clone`项目并`npm install`时则会根据`package-lock.json`来安装指定版本的模块。



---

不过很明显锁不锁版本都有对应的好处和坏处，所以社区对是否锁版本还存在着一些[争论](https://www.zhihu.com/question/65536076)。

另外，无论是否使用 `lock`机制，都不应该把 `package-lock.json`写入 `.gitignore`中。

如果我们使用 `lock`机制，应该直接把 `package-lock.json`提交进仓库；如果我们不使用 `lock`机制，则应该在 `.npmrc`中写入 `package-lock=false`来关闭 `lock`机制，并把 `package-lock.json`提交到仓库中。[参考](https://www.zhihu.com/question/264560841)





### node_modules

在 `NPM`的早期版本，`node_modules`使用嵌套结构来管理模块之间的依赖关系。而我们的很多模块都又可能依赖于同一个模块，这样的结构可能导致性能的浪费。

```
- A -> B
- C -> B
```

所以在 `NPM@3.x`以后，`node_modules`主要使用扁平结构来管理模块之间的依赖关系。假设我们安装了A和C模块，这两个模块同时依赖于同一个版本的B模块，此时 `node_modules`结构如下。

```
- A
- C
- B
```

不过有的时候，我们安装的模块A和C可能依赖于同一个模块B的不同版本。

1. 假设 `node_modules`存在 `B@1.1.0`。然后我们安装的模块A依赖于 `B@^1.1.0`，即使模块B最新版本已经到了 `1.9.0`，我们也会复用原本已安装的模块。

   ```
   - A
   - B@1.1.0
   ```
2. 假设 `node_modules`存在 `B@1.1.0`。然后我们安装的模块A依赖于 `B@^1.2.0`，则会安装最新的模块（如 `B@1.9.0`）

   ```
   - A -> B@1.9.0 
   - B@1.1.0
   ```





## 事件循环

浏览器和Node环境都存在事件循环这一概念，但因为它们基于不同的架构所以实现原理也有些许不同，比如浏览器环境的事件循环是通过主线程和工作线程之间的调度实现的。另外，在Node的 `11.0`版本的发布之后，同一段代码在两个不同环境的表现也越来越相似了，所以在这里我会主要以浏览器环境介绍事件循环的原理。

众所周知浏览器是基于多线程的，除了用来渲染页面的GUI渲染线程，还有执行JavaScript代码的主线程和各种工作线程，不同的工作线程分别用来处理定时器任务、I/O操作、事件等操作。

当我们在主线程执行一段代码时，通常会使用 `fetch`来发出一个请求，发请求的这个操作是交给专门的工作线程来执行的，因此该操作本身并不会阻塞后续代码的执行。而当我们收到了对应的响应时，该工作线程会把一个**任务**交给主线程执行，这就是所谓的**异步**。

当然了，此时我们的主线程可能还在执行代码中，所以实际上任务并不会立刻被交给主线程执行，与之对应的是该任务会被添加进一个专门的**任务队列**当中，主线程执行完代码后会从任务队列中取出任务来执行。不仅如此，根据不同的类型我们又把任务分为**宏任务**和**微任务**，因此我们的队列也有两个：**宏任务队列**和**微任务队列**。

那么先让我们明确哪些任务属于宏任务和微任务，首先我们可以把最初交给主线程执行的代码视为一个宏任务，其他的宏任务包括：`setTimeout`或 `setInterval`、`I/O`操作（如 `ajax`或文件读取）、事件（如点击事件）、`setImmediate`（Node专有）。而最常见的微任务有 `promise.then()`。

事件循环的基本规则就是，执行完一个宏任务，再执行微任务队列中的所有微任务，再执行下一个宏任务...如此往复。因此一个事件循环可以视为一个宏任务+所有微任务，另外也可以把执行一个宏任务的阶段，或着执行所有微任务的阶段，称作一个 `tick`，由此可见一个事件循环由两个 `tick`组成。无论是对于Node中的 `process.nextTick`还是 `Vue`中的 `$.nextTick`，理解何为 `tick`都是很有帮助的。

##### nextTick

`process.nextTick`是Node独有的一个方法，顾名思义我们可以知道这个方法的目的是让某个任务在下一个 `tick`的最开始执行。比如，当我们处在一个宏任务阶段调用 `process.nextTick`，那么会在当前宏任务执行结束后，在后续的微任务阶段执行前执行 `nextTick`接受的回调函数。

事实上在Node中专门维护了一个 `nextTick`队列，每当我们执行完一个 `tick`，就会执行 `nextTick`队列中的所有任务（行为很像微任务队列）。

```js
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

Node的架构和浏览器有很大不同，因此它实现事件循环的方式也大相径庭。Node的事件循环中有**六个阶段**，**每个阶段中都有一个宏队列，总共只有一个微队列和一个 `nextTick`队列**。

1. `Timer`: `SetTimeout`和 `SetInterval`的回调放进该阶段的任务队列。
2. `pending callback`: 执行一些系统操作的回调，例如TCP的错误。
3. `idle, prepare`: 处理一些内部调用。
4. `poll`: **大部分其他回调会被仿佛该阶段的任务队列**
5. `check`: `SetImmediate`的回调放进该阶段的任务队列。
6. `close callback`: 一些结束时的回调，例如 `Socket.on("close")`

我们可以只重点关注三个阶段，`Timer`、`poll`、`check`。

低版本（`v11.0`以前）的Node表现的行为和浏览器环境有很大的不同，是因为低版本下的Node在执行完**一个阶段的所有宏任务**再执行微任务；而**高版本的Node表现和浏览器一致**，即执行完一个宏任务再执行微任务。

以下的这段代码在不同版本的Node下表现的行为就会有所不同

```js
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

1. 当我们遇到 `setImmediate`后，将其回调函数放进 `check`阶段的宏队列中。
2. 当我们遇到 `process.nextTick`后，将其回调函数放进 `nextTick`队列中。因为此时同步代码（或者说最初的宏任务）执行完毕，那么执行 `nextTick`队列中的任务。
3. **输出2**， 遇到 `setImmediate`后，将其回调函数放进 `check`阶段的宏队列中。
4. 开始执行 `check`队列中的宏任务。
5. 执行 `check`第一个宏任务，**输出1**，将 `nextTick`的回调放进队列里。

以上五步，无论版本如何都是一致的，接下来就是高低版本Node的不同。

**低版本Node**

因为低版本Node是执**行完一个阶段中的全部宏任务后，再执行微队列的全部任务**。所以**先输出3，再输出4。**

**高版本Node**

因为高版本Node是**执行完一个宏任务，就执行微队列的全部任务**。所以**先输出4，再输出3。**

## http模块

```javascript
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

```javascript
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

```javascript
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

```javascript
const fs = require('fs')
```

##### `readFile`

```javascript
fs.readFile('./image.png', (err, buffer) => {
    if (err) throw err
})
```

##### `writeFile`

```javascript
// 写入文本
fs.writeFile('index.txt', 'hello world', 'utf8')
// 写入buffer
fs.writeFile('image.png', buffer)
```

##### `createReadStream`

##### `createWriteStream`

```javascript
const reader = fs.createReadStream(data.path)
const stream = fs.createWriteStream(`./image/${Math.floor(Math.random() * 10000)}.jpg`)
reader.pipe(stream)
```

## path模块

```javascript
const path = require('path')
```

##### `__dirname`

返回当前文件所在的**绝对路径**

##### `path.resolve`

```js
const url = path.resolve('static')
```

根据传入的参数解析出对应的**绝对路径**。

- 当传入的参数是相对路径，如 `index`、`../index`，会算出相对**`process.cwd()`**的绝对路径

  ```js
  const url = path.resolve('.') // 等于process.cwd()
  ```
- 当传入的参数是绝对路径，如 `/index`，会算出相对**根路径**的绝对路径

##### `path.join`

用来拼接传入的参数得到一个**相对路径**，它的好处是可以抹平不同平台的分割符号的差异（如Linux环境下分隔符为 `/`，而Windows环境下分隔符为 `\`）

```javascript
const path1 = path.join('a', 'b') // 'a/b'
const path2 = path.join('a', 'b', '../c') // 'a/c'
const path3 = path.join(__dirname, '..', 'b') 
```

## process模块

##### `process.cwd()`

获得执行脚本时所处的绝对路径。当我们使用 `fs.readFile`等函数并传入 `./index.html`形式的相对路径时，相对路径实际上是相对于执行脚本时所在的目录路径，也就是相对于 `process.cwd()`。

因此根据执行脚本时所处路径的不同，结果也可能有很大的差异，所以很多时候我们会传入绝对路径，如

```js
fs.readFile(`${__dirname}/../index.html`)
fs.readFile(path.join(__dirname, '../index.html'))
```

##### `process.argv`

获取执行脚本时命令行输入的参数

```js
$node index.js abc
[
    'node',
    'index.js',
    'abc'
] // process.argv
```

##### `process.stdout`

标准输出流

```js
process.stdout.write('Hello world')
```

##### `process.stdin`

标准输入流

```js
process.stdin.on('data', (chunk) => {
    process.stdout.write('Hello' + chunk)
    process.exit()
})
```

## 环境变量

##### `process.env`

在 `Node`中可以通过 `process.env`拿到环境变量，从而根据不同的环境执行不同的代码。

##### cross-env

通常不同系统设置环境变量的方式不同，为此可以使用第三方库 `cross-env`来设置环境变量。

```json
// package.json
{
    "script": {
        "start": "cross-env NODE_ENV=development node app.js"
    }
}
```

##### dotenv

除了在命令行中设置环境变量，我们也可以使用单独的文件 `.env`来保存环境变量，并搭配 `dotenv`库来读取 `.env`文件中的环境变量。

```.env
NODE_ENV=development
name=aka
```

```js
// app.js
const dotenv = require('dotenv')
dotenv.config() // 读取.env文件中的信息

console.log(process.env.NODE_ENV)
```

或者我们可以写一个 `config.js`

```js
// config.js
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    name: process.env.name
}
```

```js
// app.js
const { NODE_ENV, name } = require('./config.js')
console.log(NODE_ENV, name)
```

## util模块

这个模块提供了诸多很有用的小工具。

##### `deprecate`

```js
const util = require('util')
function A() {
    console.log('aaa');
}

module.exports = util.deprecate(A, 'A() is deprecated. Use B() instead.')
```

##### `promisify`

```js
const util = require('util')
const fs = require('fs')
const readFile = util.promisify(fs.readFile)

async function A() {
    const data = await readFile('./index.html') 
}
```

## child_process模块

Node的 `child_process`模块提供了创建子进程的四种方式，分别是 `folk`、`exec`、`execFile`、`spawn`。

其中，只有 `fork`是用来创建Node程序的子进程，其他三种可以用来创建 `shell`子进程。

##### `fork`

```js
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

`exec`可以直接在Node代码中写入 `shell`命令，并且在执行一些危险的脚本（如 `rm / -rf`）是不会提示的；而 `execFile`和 `spawn`的参数都是文件的名字，并且 `execFile`在执行危险操作时会爆出异常，因此更加的安全。

##### `exec`

```js
const exec = util.promisify(cp.exec)

(async function () {
  const res = await exec(cat ${file})
  console.log(res.stdout);
})()
```

##### `execFile`

```js
const exec = util.promisify(cp.execFile)

(async function () {
  	const res = await exec('cat', [file])
  	console.log(res.stdout);
})()
```

##### `spawn`

`spawn`的特点是基于流的，因此可以使用 `pipe`显得更加灵活

```js
const cat = cp.spawn('cat', [file])
const sort = cp.spawn('sort')

cat.stdout.pipe(sort.stdin)
sort.stdout.pipe(process.stdout)
```

## cluster模块

使用cluster来搭建集群node应用

怎么讲呢，直接看网上的代码吧。

```js
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

```javascript
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

```javascript
const qs = require('querystring')
var str = 'foo=bar&abc=xyz&abc=123';

querystring.parse(str)
// { foo: 'bar', abc: [ 'xyz', '123' ] }
```

## os模块

获取操作系统相关信息。

```js
const os = require('os')
const homedir = os.homedir() // 获取用户目录
```

## event模块

> 实现原理见本文的设计模式-发布订阅章节

```javascript
var EventEmitter = require('events').EventEmitter
var emitter = new EventEmitter()

emitter.on('ev', function () {

})

emitter.emit('ev')
```

---

以上是Node自带的核心库，下面介绍一些常用的第三方库。

## bluebird库

可以将回调函数实现的异步改写成Promise的方式来写的第三方库。

##### bluebird + fs

回调

```javascript
const fs = require('fs')
fs.readFile('index.html', (err, data) => {
    response.end(data)
})
```

Promise

```javascript
const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs'))

fs.readFileAsync('index.html')
.then(data => {
    response.end(data)
})
```

##### bluebird + mysql

回调

```javascript
const mysql = require('mysql')
// mysql配置文件
let config = require('./config')
conn.connect()

// 使用
conn.query(`sql code here...`, (err, data) => {

})
```

Promise

```javascript
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

除了常见的 `pm2 start index.js`，我们也可以使用配置文件。

```js
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

```shell
pm2 start ecosystem.config.js --env development
// or
pm2 start ecosystem.config.js --env production
```

##### 常用命令

```js
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

```js
import chalk from 'chalk'
console.log(chalk.blue('akara'))  // 蓝色字体
console.log(chalk.blue.bgRed('akara')) // 蓝色字体，红色背景
```

##### yargs

提供了对命令行参数的解析功能，并且默认提供了 `--help`、`--version`选项。

```js
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

```bash
cli --help
cli --version
cli serve 8000 # cli serve -p 8000 | cli serve --port=8000
cli curl 'google.com' -v
```

##### commander

和 `yargs`作用差不多，可以选择其中一个来开发自己的命令行工具。

```js
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

```js
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

```js
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

```js
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

## puppeteer

使用 `puppeteer.connect`来复用已启动的浏览器进程。

1. 启动Chrome的时候加上 `--remote-debugging-port=9222 `，重启浏览器
2. 访问 `http://127.0.0.1:9222/json/version`拿到 `webSocketDebuggerUrl`字段
3. ```js
   const url = 'ws://127.0.0.1:9222/devtools/browser/81daad69-fb53-49ea-9f97-3683b73afea0'
   const browser = await puppeteer.connect({
       browserWSEndpoint: url,
   });
   ```

参考：https://medium.com/@jaredpotter1/connecting-puppeteer-to-existing-chrome-window-8a10828149e0

## Koa

##### 基础

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


// response
app.use(ctx => {
  ctx.status = 200
  ctx.set('Content-type', 'text/plain; charset=utf-8')
  ctx.body = 'Hello Koa'
});

app.listen(3000);

// 一些其他的方法
ctx.redirect('/home')
// 相当于
// res.status = 302
// res.setHeader('Location', '/home')
```

###### 核心实现

```javascript
const Emitter = require('events')
// 三个对象，提前定义好原型的方法
const context = require('./context')
const request = require('./request')
const response = require('./response')
class Koa extends Emitter {
    constructor() {
        super()
        this.middleware = []
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
    }

    callback() {
        const fn = compose(this.middleware)
        return (req, res) => {
            const ctx = this.createContext(req, res)
            return this.handlerRequest(ctx, fn)
        }
    }

    use(fn) {
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
        this.middleware.push(fn)
        return this
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        return server.listen(...args)
    }

    createContext(req, res) {
        // 其实就是根据已有的req和res创建上下文context
        const context = Object.create(this.context);
        const request = Object.create(this.request);
        const response = Object.create(this.response);
        context.request = request
        context.response = response
        context.app = request.app = response.app = this;
        // 重点，挂载req和res
        context.req = request.req = response.req = req;
        context.res = request.res = response.res = res;
        // 互相引用
        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;
        return context
    }

    handlerRequest(ctx, fn) {
        const res = ctx.res
        res.statusCode = 404
        fn(ctx).catch(reason => {
            console.log(reason)
        })
    }
}
```

Koa的实例app有三个公共的API

- use

  ```javascript
  app.use((ctx, next) => {
  
  })
  ```

  use方法用于将参数中间件放进app的middleware数组里
- listen

  ```javascript
  app.listen(3000)
  ```

  等价于

  ```javascript
   const server = http.createServer(this.callback())
   server.listen(3000)
  ```
- callback

  该函数内部实现三个功能

  1. 使用koa-compose函数将middleware中间件数组转化为中间件fn
  2. 调用app.createContext函数。创建context，request，response对象；将request和response挂载在context上；把req和res挂载在三个对象上。

     例如：request的原型对象上部分代码如下

     ```javascript
     get header() {
     	return this.req.headers;
     },
     set header(val) {
     	this.req.headers = val;
     },
     ```

     我们现在就可以根据 `ctx.request.header`获取req的headers了
  3. 执行handleRequest函数，本质是把组装好的context传入中间件fn执行

Koa源码中使用到了Koa-compose， 用于将多个中间件函数组合为一个中间件函数

###### koa-compose

```javascript
const compose = (middleware) => {
    if (!Array.isArray(middleware)) throw new TypeError("Middleware stack must be an array!")
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError("Middleware must be composed of functions!")
    }
    let length = middleware.length
    return function (ctx, next) {
        let index = -1
        return dispatch(0)
        function dispatch(i) {
            // 一个中间件内部多次调用next时，index大于等于i
            if ( index >= i) {
                return Promise.reject(new Error('next() called multiple times'))
            }
            let fn
            index = i
            if (i < length) {
                fn = middleware[i]
            }
            else if (i === length) {
                // 重点， 外部compose的next传进内部compose
                fn = next
            }
            // 最后一个中间件调用next时，什么也不做
            if (!fn) return
            // 官方源码使用Promise是为了使用async中间件，不过这里没有怎么实现这个功能，就一个样子
            return Promise.resolve(fn(ctx, dispatch.bind(null, (i + 1))))
        }
    }
}
```

##### koa-router

```javascript
const Router = require('koa-router')
const router = new Router()
router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', (ctx, next) => {
    // ...
  })
  .put('/users/:id', (ctx, next) => {
    // ...
  })
  .del('/users/:id', (ctx, next) => {
    // ...
  })
  .all('/users/:id', (ctx, next) => {
    // ...
  });
app.use(router.routes())
app.use(router.allowedMethods()) // 此处例子没有实现该方法
```

###### 简易实现

简易实现，只实现一个get方法，实际上要更复杂的多。

```javascript
class Router {
    constructor() {
        this.stack = []
    }

    get(url, fn) {
        function middleware(ctx, next) {
            if (ctx.req.method.toLowerCase() === 'get' && ctx.req.url === url) {
                console.log('路由匹配成功');
                fn(ctx, next)
            }
            else {
                console.log('路由匹配失败');
                next()
            }
        }
        this.stack.push(middleware)
        return this
    }

    routes() {
        return (ctx, next) => {
            let fn = compose(this.stack)
            // 必须加上next参数
            // koa本身有一个compose， 这里也有一个，所以要把外部的next传给内部
            fn(ctx, next)
        }
    }
}
```

##### koa-static

用于处理静态资源的koa中间件

```js
const static = require('koa-static')
app.use(static('public'))
```

##### koa-body

处理请求的中间件，可以轻松获得请求的内容

```js
const body = require('koa-body')
app.use(body({multipart: true}))
app.use((ctx) => {
    console.log(ctx.request.body)
})
```

##### koa-logger

```js
const logger = require('koa-logger')
app.use(logger())
```

##### koa-views

通常用于搭配模板引擎进行服务端渲染，不过似乎现在不怎么用了。

另外使用的场合要额外去安装对应的模板引擎，比如想用 `ejs`记得先 `npm i ejs`

```js
const views = require('koa-views')
const render = views('./views', { extension: 'ejs'})

app.use(render)
app.use(async ctx => {
    await ctx.render('template', {
        content: 'hello'
    }) 
})
```

```ejs
<!-- template.ejs -->
<!DOCTYPE html>
<html>
<head></head>
<body>
    <div><%= content %></div>  
</body>
</html>
```

## NestJS

NestJS是个使用装饰器模式（风格类似前端的Angular）的Node后端框架，同时对TypeScript支持良好。

```js
npm i -g @nestjs/cli
nest new my-project
```

```tsx
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

```js
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController, MyController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, MyController],
  providers: [AppService],
})
export class AppModule {}
```

##### Controller

我们可以通过编写 `controller`来实现后端路由。

```js
// app.controller.ts
import { Controller, Get, Post, Req, Res, Body, Param, Query, Headers, Header, HttpCode } from '@nestjs/common';
import { Request } from 'express'

export class DTO { // 数据传输对象
  value: string
}

@Controller()
export class AppController {
  @Get() // 匹配/路径
  getText(): string {
    return 'hello'
  }

  @Get('admin') // 匹配/admin路径
  getAdmin(): string {
    return 'admin'
  }
}

@Controller('/api')
export class MyController {
  @Get('fetchAllInfo') // 匹配/api/fetchAllInfo
  fetchInfo(@Req() req: Request, @Query() query): string[] { // 拿到Req、Query
    console.log(req.url)
    console.log(query)
    return ['a', 'b', 'c']
  }

  @Get('/fetchOneInfo/:id')
  fetchOneInfo(@Param() params, @Headers() headers): string { // 拿到Params、响应头Headers
    console.log(params.id)
    console.log(headers)
    return 'a'
  }

  @Post('/updateOneInfo/:id')
  updateOneInfo(@Param('id') id: number, @Body() body: DTO) { // 通过@Param('id')可以直接拿到具体的Param。拿到Body
    console.log(id)
    console.log(body)
    return { // 自动序列化为JSON并设置对应Content-Type
      code: 200,
      msg: 'success'
    }
  }

  @Get('html')
  @Header('Cache-Control', 'none') // 设置响应头部
  getHtml(): string { // 自动设置Content-Type
    return `
      <html>
        <body>
          <h1>hello nest</hi>
        </body>
      </html>
    `
  }

  @HttpCode(404) // 设置响应状态码
  @Get('404')
  four0four() {
    return '404 not Found'
  }

  @Get('async')
  async testAsync(): Promise<string[]> {
    return ['aa', 'bb', 'cc']
  } 

  @Get('res')
  async testRes(@Res() res) {
    res.send('hello nest')
  }
}
```

##### Service

我们使用 `Controller`来进行路由控制，具体的数据操作或逻辑操作由 `Service`（`Service`是一种 `Provider`）负责。

首先创建 `Service`类，并在 `app.module.ts`中声明该 `Service`为 `Provider`，然后 `Controller`的构造函数添加一个入参（为 `Service`类的实例）。

```ts
// app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private name: string = 'akara'

  getName(): string {
    return this.name
  }

  setName(name: string): void {
    this.name = name
  }
}
```

```ts
// app.controller.ts
import { Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get/service')
  async testGetService() {
    return this.appService.getName()
  }

  @Get('/set/service')
  async testSetService() {
    return this.appService.setName('bkb')
  }
}
```
