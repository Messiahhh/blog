
# 声明文件

相比于`JavaScript`，`TypeScript`存在着变量上下文和类型上下文，如当`index.ts`被编译成`index.js`和`index.d.ts`，`index.js`包含着变量上下文，而`index.d.ts`包含着类型上下文（包括变量的声明和类型）

我们可以自行编写声明文件`index.d.ts`来辅助我们进行一些工作，事实上`tsconfig.json#includes`内所有的`ts`和`.d.ts`文件都是有效的，除此之外`tsconfig.json#types`和`tsconfig.json#lib`默认就会分别把`node_modules/@types/node`和`node_modules/typescript/lib`下对应的声明文件加入到整个编译系统当中。（比如当我们安装了`@types/react`后就能在代码中直接使用`JSX.Element`这个类型了，这是因为该声明文件内部通过`declare global`来声明了全局变量的类型）

目前主流库有两种方案来包含声明文件。第一种方式就是把声明文件作为另一个库发布到上文提到过的`node_modules/@types`下；第二种方式是把声明文件也放在当前库下面，通过在`package.json#types`中指定声明文件的位置，第二种方式需要注意的是需要显式的把模块引入后才能得到对应的类型提示。



## 三斜线注释

我们可以在声明文件中使用三斜线注释来手动引入其他声明文件，需要注意的是该注释需要放在文件开头。

- `/// <reference path="test.d.ts"/>`可以引入相同路径下的`test.d.ts`文件
- `/// <reference types="react/next" />`可以引入`node_modules/@types/react/next.d.ts`
- `/// <reference lib="es2015" />`来引入`node_modules/typescript/lib/es2015.d.ts`



## 脚本与模块

在`TypeScript`中我们把使用了`import`或`export`语法的文件视为**模块**，否则则被视为**全局作用域下的脚本**。脚本内部声明的变量和类型是全局可见的，而模块内部的变量和类型是不可见的，需要外部进行相对应的导入。

`TypeScript`中导出的语法包括以下几种：`export {}`、`export default {}`、`export = {}`。其中`export = {}`是`TypeScript`专有的一种导出语法，可以简单地视为`CommonJS`（`module.exports = `）和`AMD`导出的一种兼容，外部导入时需要使用`import React = require('react')`或者`import * as React from 'react'`来进行导入，使用`import React from 'react'`导入会报错（如果我们想要使用`import React from 'react'`这种写法进行导入，则需要设置`"esModuleInterop": true`开启模块互动功能，此时`TypeScript`会使用工具函数来帮我们处理这种不同模块导入的问题）

``` ts
// React.d.ts
declare namespace React {
  
}

export = React
export as namespace React
```



## export as namespace

设想我们是通过外链引入`React`，因此在源码中希望不`import`也能够拿到`React`对应的类型声明，上方代码中的`export as namespace React`就是起这个作用的。



## declare global {}

对于一个模块文件来说，我们可以使用`declare global {}`来提供全局的类型提示

``` ts
// a.ts 模块
declare global {
		const akara: string;
    interface People {
        age: number;
    }
}
export {}

// b.ts 脚本
let a = akara; // 不报错
let b: People
```







## declare module

可用来声明一个模块的类型和导出内容，如果一个库自身不存在声明文件，`node_modules/@types`也不存在对应声明文件，我们可以在自己的代码中`mock`该模块的导出接口

``` ts
// node_modules/@types/node/os.d.ts
declare module os {
  function hostname(): string;
}

// node_modules/@types/node/fs.d.ts
declare module fs {
  import * as promises from 'node:fs/promises';

  export { promises }
  export function readFile(): void;
}
```

``` ts
import os from 'os'
import fs, { promises } from 'fs'

os.hostname()
fs.readFile()
```

`module`默认会导出所有内容，而当`module`内部包括`import`或`export`时，那么`module`也必须显式导出内容。












