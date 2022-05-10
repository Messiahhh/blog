# `tsconfig.json`

## compilerOptions

### strict

严格模式。开启时会自动设置几个相关的`flag`，如`strictNullChecks: true`

### outDir

编译产物的输出目录



### outFile

根据多个源文件生成一个产物。如果源文件是模块而不是脚本（即使用了`import`或`export`），那么开启`outFile`的同时还需要指定`module: 'amd' | 'system' `。

我们可以搭配`declaration: true`来生成一份包括各个模块导出类型的声明文件。

### declaration

生成声明文件`.d.ts`。



### emitDeclarationOnly

只生成声明文件，不生成任何`JavaScript`文件。



### sourceMap

生成`sourceMap`。



### noEmit

不生成编译产物。



### allowJs

允许在程序中使用`JavaScript`文件，比如我们甚至可以在`A.ts`中引入`B.js`。



### checkJs

在`allowJs: true`的基础上，开启`checkJs`会在编译时检查`JavaScript`的语法错误。



### target

编译产物`JavaScript`的目标版本。如指定`es5`会把源代码中的箭头函数转化为普通函数。

指定`target`字段的同时会自动设置对应的`lib`。



### lib

指定库的声明文件。如`lib: ["dom", "esnext"]`则包含了`DOM`元素的类型和诸多`JS`内置对象和函数的类型。（这些声明文件被存放在`node_modules/typescript/lib`下）



### skipLibCheck

跳过对所有声明文件`d.ts`的类型检查。



### module

指定编译产物`JavaScript`所采用的模块类型，如`commonJs`、`es6`、`esnext`等。





### moduleResolution

模块解析策略。通常为`node`，即采取和Node一致的模块解析策略。



### noResolve

`TypeScript`默认会解析`import`或`/// <reference />`引用的文件，将其纳入整个程序当中，通过`noResolve`可以关闭这个过程。



### baseUrl

当指定`baseUrl`时，绝对路径是相对于`baseUrl`的。


如当给定`"baseUrl": "./src"`时， `import A from 'lib/test' `实际表达的是`./src/lib/test`

​    

### paths

设置路径的映射关系，通常在开启了`webpack`的`resolve.alias`时需要进行设置

``` json
{
  "paths": {  
    "@test/*": ["./src/test/*"],
    "jquery": ["node_modules/jquery/dist/jquery"] // This mapping is relative to "baseUrl"
  },
}
```



### types

指定第三方库的声明文件，如`@types/react`、`@types/react-dom`、`@types/node`，默认情况`node_modules/@types`下所有库都是生效的。

``` json
{
  "types": [], // 只让具体的几个库生效
  "typeRoots": ["node_modules/@types"],
}
```



### esModuleInterop

模块互通。





### allowSyntheticDefaultImports

允许从没有设置默认导出的模块中默认导入，`esModuleInterop: true`时默认开启



### isolatedModules

开启时，被编译的所有文件必须是模块（import/export）而不能是脚本





### noEmitOnError

编译错误时不生成产物。



### noImplicitAny

不允许隐式any类型



### strictNullChecks

严格的空值检测。

``` typescript
let str: string = undefined // 不开启严格模式的话这行代码能通过
let str: string | undefined // 通常需要这样写
```





## files

指定待编译的文件。



## includes

指定待编译文件的目录。



## exclude

指定哪些文件不被编译，默认值包括node_modules等。



## extends

继承配置文件。



