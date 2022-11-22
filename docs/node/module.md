# 模块化
## 立即执行函数（IIFE）

立即执行函数（IIFE）是早期主流的模块化方案，比如 `Jquery`就使用该方案。

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



## CommonJS

通过`module.exports`定义模块的导出，通过`require`进行模块的导入。

``` js title="a.js"
function getName() {
    return 'Akara'
}
module.exports = getName
```

```js title="b.js"
const getName = require('./a')
getName() // 'Akara'
```



### require()做了什么

> https://www.ruanyifeng.com/blog/2015/05/require.html

1. 解析出文件的绝对路径
2. Node内部存储着文件绝对路径和模块的映射关系。根据文件路径查询是否存在缓存，如果有则直接返回该模块的导出（`module.exports`）
3. 判断目标是否为内置模块
4. 通过`new Module()`生成模块实例`module`并缓存起来
5. 将模块实例`module`变量注入并运行被`require`的代码
6. 返回模块实例的导出（`module.exports`）

也可以把`require`简单地看作包了一层立即执行函数，该立即执行函数返回了那个模块的 `module.exports`

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

因此有以下点需要注意

- 多次`require`同一个模块时，只有第一次`require`会执行该模块内的代码，后续的`require`只会直接返回该模块的导出（`module.exports`）

- 虽然默认`module.exports`或者`exports`这两个地址指向同一块内存，但最终返回的是`module.exports`，所以不应该直接修改`exports`的地址

  ``` js
  exports.hp = 100; // ok
  exports = { // wrong
    hp: 100;
  }
  ```



## UMD

*AMD*和*CMD*都是比较早期的模块化方案，以*AMD*为例使用时需要额外安装 `require.js`库，使用 `define`定义模块，使用 `require`加载模块。

而*UMD*指的是同时兼容立即执行函数、AMD、CommonJS的一种方案，相对来说使用的更加广泛。

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









## esModule

当项目的`package.json`中设置了`type: module`时，该项目下所有`.js`文件都视为`ES`模块。除此之外，凡是以`.mjs`为后缀的文件也被视为`ES`模块。ES6模块使用 `import`和 `export`语法来导入和导出模块。



### 基本语法

``` js title="a.ja"
const A = 'akara'
export default A // 等价于 export { name as default }
export function B() { // 等价于 export { getName as getName }
    return name
}
const C = 'akara'
export { C as alias }
```

``` js title="b.js"
import A from './a.js' // 等价于 import { default as name }
import { B } from './a.js' // 等价于 import { getName as getName }
import { alias as C } from './a.js'
console.log(A, B, C)
```

除了逐个接口`import`，我们甚至可以一次性`import`整个模块

``` js title="b.js"
import * as myModule from './a.js' 
console.log(myModule)
// [Module: null prototype] {
//     B: [Function: B],
//     alias: 'akara',
//     default: 'akara'
// }
```







## 模块互通

*esModule*的技术规范一经出台就收到前端社区的广大追捧，大家都急切着希望拥抱新的技术，但我们又不可能立刻放弃原本占据广大生态的*CommonJS*，我们还面临着这样的问题：两种截然不同的模块系统应该如何进行交互和引用？因此我们不仅需要esModule这种新的模块化方案，还需要一种友好的**模块互通方案**。

NodeJS需要较长的一段时间才能够正式支持*esModule*和它的模块互通方案，前端开发者显然有些等不及，而正巧此时Babel风头正盛，开发者通过使用Babel就可以提前用到最新的*esModule*语法，并且由于它的本质是将esModule语法的代码编译为CommonJS语法的代码，因此**Babel也相当于提供了一套自己的模块互通方案**。然而，Babel最初提供的实现存在着比较明显的错误，尽管后续修复后已经是相对自洽的，但和如今NodeJS官方所提供的实现是存在着较大的割裂的，并且由于Babel的强大的影响力，导致包括TypeScript、Esbuild等前端工具也采纳相同的实现，导致事实上前端社区和Node社区是存在两种模块互通方案的。

在深入介绍Babel的模块互动方案之前，让我们首先了解NodeJS所提供的官方实现是怎样的吧。



### Node

在NodeJS正式发布它的esModule实现和模块互通方案的时候，前端社区普通采用的Babel所提供的模块互通方案，NodeJS并没有向不优雅的Babel实现妥协，但这却使得社区存在着两种割裂的模块互通实现。

在NodeJS的实现中，**esModule的默认导出会被视为等价于CommonJS中的`module.exports`**。这是基于esModule和CommonJS本身的特性决定的，我们都知道esModule是可以被静态分析的，而CommonJS是动态的（即我们无法提前知道会有哪些导出接口），因此我们把`module.exports`整体视为一种**默认导出**。

``` js
import mo, { level } from './test.cjs'

console.log(mo, level) // { hp: 100, mp: 200, level: 999 } 999
```

``` js
module.exports = {
    hp: 100,
    mp: 200
}

module.exports.level = 999;
```





### Babel

上文提到过Babel的模块互通方式是一种经过修复后的不优雅的方案，那么不妨让我们直接观察esModule代码会被其编译成怎样的CommonJS代码吧。

#### 模块导出

``` js title="编译前"
export default {
    hp: 100,
    mp: 200
}
```

``` js title="编译后"
Object.defineProperty(exports, "__esModule", {
		value: true
});

exports.default = {
  	hp: 100,
  	mp: 200
};
```

从这个例子中可以得知，在Babel的模块互通方案中**`export default`会被编译成`module.exports.default`**，这一点和NodeJS的实现完全不同，这就是Babel早期所引入的**错误实现**，后续为了修复这个错误实现，Babel通过定义`__esModule`字段来标识这是由esModule模块转化而来的CommonJS模块，在导入该模块时发现存在这个`__esModule`时会取它的`default`值，从而抹平差异。





#### 模块导入

例子一：🌰

``` js title="编译前"
import mo from './test.js'

console.log(mo)
```

``` js title="编译后"
var _test = _interopRequireDefault(require("./test.js"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
console.log(_test.default);
```

从这个例子中可以得知，在引入模块时Babel会根据模块的类型不同返回不同的结果。当被引用存在`__esModule`属性时，Babel会返回这个模块`module.exports`的`default`属性，从而修复自身在模块导出时所引入的错误；当被引用的模块不存在`__esModule`属性时，表明这是原生的CommonJS模块，此时直接返回`module.exports`，从而完成了`export default`等价于`module.exports`的正确实现。

根据上述内容，我们了解到Babel在模块导出时的错误实现，以及在模块导入时根据被引用模块的类型不同，分别采取了修复方案和正确的实现。这样的Babel实现了一定程度的自洽，但我们需要特别注意的是，对于一个通过Babel（由于包括TypeScript、ESBuild在内的诸多前端工具也采用了和Babel一致的方案，这里的Babel可以被替代成相关的名词）从esModule转化而来的CommonJS模块，在不同的模块系统中（可以理解为在前端工具链中使用或在Node中直接使用）被引用后会得到不同的结果。

拿`@babel/traverse`这个库举例子，通过观察它的入口文件会发现存在`__esModule`属性的定义，就表明它是由esModule转化而来的CommonJS，原本的`export default`被挂载在`module.exports.default`上。当我们基于前端工具链引用该库时，由于我们编写的esModule代码也同样会被转化，因此能够正确的获取到它的默认导出；但当我们在Node中通过`import traverse from "@babel/traverse"`引用该库时，我们实际上只能拿到`module.exports`，因此需要手动的去取`default`的值，如下：

``` js
import _traverse from "@babel/traverse";
const traverse = _traverse.default;
```

实际上这种情况还是很容易遇见的，如今了解了根本性的原理后，再碰到类似的情况也不会感到奇怪了。





例子二：🌰

``` js
import mo, { hp } from './test.js'

console.log(mo, hp)
```

``` js title="编译后"
var _test = _interopRequireWildcard(require("./test.js"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
console.log(_test.default, _test.hp);
```

我们在例子一的基础上做了微小的修改，编译后的代码有兴趣的读者可以看看，从结论来说表现是和Node基本一致的。







### TypeScript

通过设置`module: 'CommonJS'`，TypeScript也能实现*esModule*到*CommonJS*的转化，事实上TypeScript的模块导出实现和Babel完全一致，只是在模块导入的实现上根据`esModuleInterop`的不同会有对应的区别。

#### 模块导出

和Babel完全一致。



#### 模块导入

##### `esModuleInterop: false`

``` js title="编译前"
import mo from './test.js'

console.log(mo)
```

``` js title="编译后"
Object.defineProperty(exports, "__esModule", { value: true });
var test_js_1 = require("./test.js");
console.log(test_js_1.default);
```

从这个例子中可以得知，当该字段为`false`时，`import mo from`相当于引入`module.exports.default`，这是和NodeJS完全不同的实现，也是Babel通过辅助函数来修复的问题。



##### `esModuleInterop: true`

``` js title="编译前"
import mo from './test.js'

console.log(mo)
```

``` js title="编译后"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var test_js_1 = __importDefault(require("./test.js"));
console.log(test_js_1.default);
```

从这个例子中可以得知，当该字段为`true`时（推荐），TypeScript将会通过辅助函数来修复导出时的错误实现，这和Babel的做法是完全一致的。



#### 扩展阅读

##### Module "react" has no default export

早期TypeScript项目并没有支持`esModuleInterop`选项，此时通过`import React from "react"`引用React时，会碰到这样的报错`Module "react" has no default export`。

首先我们先观察React的CommonJS产物的形式，部分代码如下，它并没有在`module.exports.default`挂载任何东西，因此TypeScript尝试引入`module.exports.default`自然就会报错。

``` js
// 注：并没有__esModule属性
exports.useRef = useRef;
exports.useState = useState;
exports.version = ReactVersion;
```

后来TypeScript被迫妥协，开启`esModuleInterop`选项后的表现和Babel完全一致，此时引入`import React from 'react'`等价于`const React = require('react')`，符合我们预期的结果。









## 循环引用

### CommonJS

```js title="a.js"
module.exports.a1 = 100;
const b = require("./b");

module.exports.a2 = 200;
console.log('模块B', b);
module.exports.a3 = 300;
```

``` js title="b.js"
module.exports.b1 = 100;
const a = require('./a');

module.exports.b2 = 200;
console.log('模块A', a)
module.exports.b3 = 300;
```

在这个例子中，当我们执行`node a.js`会输出什么呢？

问题的关键在于Node会在通过`new Module()`生成实例后，先将其进行缓存起来，再执行代码来给其添加导出项。因此在文件`b.js`中进行`require('./a')`时会从缓存中取到`module.exports`，而模块A的代码此时仅执行了两行而已，因此最终的输出如下：

```
模块A { a1: 100 }
模块B { b1: 100, b2: 200, b3: 300 }
```



### esModule

循环引用指的是形如A -> B -> C -> D -> A这样的引用关系，循环引用不一定会导致问题，但是一旦出现问题十分难定位，特别是在大型项目中碰到这类问题的概率也将会大幅提升。

当我们在父模块A中引用（`import`）子模块B时，会先执行子模块B的代码，之后才会回过头执行父模块A的代码。因此需要特别注意，此时不能在子模块中直接使用父模块中导出的值（多数情况我们都不会直接使用或调用引用进来的值，而是将其放在函数当中在某个时间调用，这类情况基本不用担心循环引用的问题）

``` js title="a.js"
import { b } from './b.js'
export const a = 100;
console.log(b)
```

``` js title="b.js"
import { a } from './a.js'

export const b = 200;
console.log(a);
```

:::danger

ReferenceError: Cannot access 'a' before initialization

:::

在使用Webpack打包时，也有可能遇到以下错误：

:::danger

Uncaught TypeError: Cannot read properties of undefined (reading 'xxx')

:::
