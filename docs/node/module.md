# 模块化
## IIFE

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

## AMD

很久以前的一种模块化方案，类似的方案还有CMD。需要额外安装 `require.js`库，使用 `define`定义模块，使用 `require`加载模块。

现在基本不用。

## CommonJS模块

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

## UMD

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

## ES模块

通常我们把`.mjs`文件视为`ES`模块，或者`package.json`的`type`为`module`时该项目下所有`.js`文件都视为`ES`模块。ES6模块使用 `import`和 `export`语法来导入和导出模块。

### export

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

### import

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

### import CJS

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



### 对比

`CJS`模块和 `MJS`模块存在几大区别

1. `CJS`模块会被整体导入，而 `MJS`可以被部分导入。因此使用 `MJS`可以 `tree shaking`。
2. `import`命令会在**其他所有代码执行前**就被JavaScript引擎静态分析，可以说它是在**编译时加载模块**。

   所以我们通常只能把 `import`放在模块的顶层，并且不能放在如 `if`之类的代码块中。

   并且由于这个特性，我们不能在JS代码执行中根据条件来动态加载模块，而 `require`可以做到这一点，`require`是**运行时加载模块**。

   好在，我们可以使用 `import()`来实现**运行时加载模块**，组件的懒加载通常就是使用 `import()`搭配代码分割来实现的。




