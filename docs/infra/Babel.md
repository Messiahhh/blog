
:::tip 扩展阅读

如果想要了解Babel的底层原理，可以看[编译原理一节](https://messiahhh.github.io/blog/docs/%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86)

:::

`@babel/core`是`babel`的核心库，提供了**`JS`代码的编译功能**。`@babel/cli`允许我们在命令行中使用`babel`；而我们大多数情况是在`webpack`中搭配使用`@babel/core`，此时需要额外安装`babel-loader`。

默认情况下编译前后代码格式一样，我们需要**使用插件来指定转化功能**。

``` bash
npm install --save-dev @babel/core @babel/cli
```

``` bash
npx babel src --out-dir output # 把src目录的代码编译进output目录里
npx babel src --out-dir output --extensions ".ts" # 搭配@babel/preset-typescript
npx babel src --out-dir output --plugins=@babel/plugin-transform-arrow-functions
```



## plugin

默认情况下`babel`编译前后代码格式一致，我们需要使用插件指定不同的代码转换规则，一个插件通常对应一条转换规则。

``` bash
npm install --save-dev @babel/plugin-transform-arrow-functions @babel/plugin-proposal-class-properties
```

``` bash
npx babel src --out-dir output --plugins=@babel/plugin-transform-arrow-functions
```

## preset

一个预设对应多个插件，即对应多条转换规则。

### @babel/preset-env

把`JS`代码编译成大多数浏览器可以支持的语法

``` js
// a.js 源码
export default function() {
    console.log('hello');
}

export function A() {
    console.log('aka');
}

// a.js 编译后
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.A = A;

function _default() {
  console.log('hello');
}

function A() {
  console.log('aka');
}
```

``` js
// b.js 源码
import fn from './a'
fn()

// b.js 编译后
"use strict";

var _a = _interopRequireDefault(require("./a"));

function _interopRequireDefault(obj) { 
    return obj && obj.__esModule ? obj : { default: obj }
}

(0, _a.default)();
```

### @babel/preset-react

实现对`JS`语法的支持。

### @babel/preset-typescript

实现对`TS`语法的支持



## browsersList

`@babel/preset-env`的目的是让我们写出的高级语法通过编译后能在低版本的浏览器上进行支持，如果编译后的代码浏览器也不支持我们还需要上`polyfill`。

通常我们会指定支持的浏览器版本，从而让`babel`只编译一部分语法。

``` js
module.exports = {
    "presets": [
        [
            "@babel/preset-env", {
                "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1"
                }
            }
        ]
    ]
}
```

像这种通常被称为`browsersList`，除了以上的配置方式我们还可以在`package.json`字段或`.browserslistrc.js`中专门进行配置。

``` json
// package.json
{
    "browserslist": [
        "defaults",
        "not IE 11",
        "maintained node versions"
  	]
}
```





## 其他

### `@babel/register`

让你的Node代码在运行时进行编译

``` bash
npm install @babel/core @babel/register -S
```

``` js
// index.js
require('@babel')
require('./app.js')

// app.js
import koa from 'koa'
```

``` bash
node index.js
```



### `@babel/polyfill`

现在不推荐直接使用`@babel/polyfill`，而是分别安装`core-js/stable`和`regenerator-runtime/runtime`，并在入口文件顶部进行[引用](https://babeljs.io/docs/en/babel-polyfill)。

``` js
import "core-js/stable";
import "regenerator-runtime/runtime";
```






