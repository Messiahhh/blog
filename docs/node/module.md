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




### 循环引用

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









## ES Module

当项目的`package.json`中设置了`type: module`时，该项目下所有`.js`文件都视为`ES`模块。除此之外，凡是以`.mjs`为后缀的文件也被视为`ES`模块。ES6模块使用 `import`和 `export`语法来导入和导出模块。



### export/import 

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





### 循环引用

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



### 模块互通

> https://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html



#### CommonJS模块加载ES模块

只能通过`import()`来实现：

``` js title="a.js"
import('./b.mjs').then(mo => {
    console.log(mo) // { default: 200, hp: 100 }
})
```

``` js title="b.js"
const hp = 100
const mp = 200

export { hp }
export default mp
```







#### ES模块加载CommonJS模块

``` js title="a.js"
module.exports = {
    hp: 100,
    mp: 200,
}
```

``` js title="b.mjs"
import mo from './a.js';
console.log(mo); // { hp: 100, mp: 200 }
```







## AMD/CMD/UMD

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

