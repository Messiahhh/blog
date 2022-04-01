---
sidebarDepth: 4
---

# TypeScript

``` shell
yarn add typescript -D
tsc index.tsx
```

## `tsconfig.json`

``` json
{
  // 指定待编译的文件
  "files": [
      
  ],
  // 指定待编译文件的目录
  "include": [
      
  ],
  // 指定哪些文件不被编译，默认值包括node_modules等
  "exclude": [
      
  ],
  "compilerOptions": {
    	// 编译产物的输出目录
      "outDir": "dist",
      // 根据多个源文件生成一个产物，可搭配`emitDeclarationOnly`来生成一份完整的声明文件
      "outFile": "./test.js",
       
      
      // 生成声明文件
      "declaration": true, 
    	// 只生成声明文件
    	"emitDeclarationOnly": true,
      // 生成sourceMap文件
      "sourceMap": true,
    	// 不生成编译产物
      "noEmit": true, 
    
      "allowJs": true, // 允许编译JS文件
      "checkJs": true, // 检查JS文件语法
      "strict": true, // 严格模式
      "jsx": "react", // 支持react jsx
        
     	/**
       * 编译目标
       */
      "target": "es5", 
      "lib": [
        "dom",
        "dom.iterable",
        "esnext"
      ],
      // 跳过.d.ts的类型检查，节约时间
      "skipLibCheck": true,
    
      /**
       * 编译后产物的模块类型
       */
      "module": "esnext", // commonjs es6 amd

      /**
       * module为commonjs时为node（推荐），否则为classic。
       * 使用和node类似的模块解析策略
       */
      "moduleResolution": "node",

      /**
       * TypeScript在编译前会先进行模块解析，被解析的模块之后也会被TypeScript编译
       * 通过noResolve: true可以关闭解析功能
       * import fs from 'fs' // 报错
       */
      "noResolve": true,

      /**
       * 当使用baseUrl，绝对路径是相对于baseUrl的
       * 如import A from 'lib/test' 
       * 实际的路径是baseUrl和'lib/test'拼接后的结果./src/lib/test（相对于tsconfig.json）
       */
      "baseUrl": "./src",

      /**
       * 路径映射
       * webpack设置了resolve.alias的时候需要
       * 使用时通常设置"baseUrl": "."
       */
      "paths": {  
        "@test/*": ["./src/test/*"],
        "jquery": ["node_modules/jquery/dist/jquery"] // This mapping is relative to "baseUrl"
      },
      
        
      /**
       * 没有指定`types`字段时，`node_modules/@types`下的所有库的入口声明文件都会生效，但当指定了
       * `types`字段，只有`types`包含的类型模块才会生效
       */
      "types": [],
      "typeRoots": ["node_modules/@types"],

      "esModuleInterop": true, // 模块互通
      /**
       * 允许从没有设置默认导出的模块中默认导入
       * esModuleInterop为true时默认开启
       */
      "allowSyntheticDefaultImports": true, 
      /**
       * 开启时，被编译的所有文件必须是模块（import/export）而不能是脚本
       */
      "isolatedModules": true,
        
      "noEmitOnError": false, // 错误时不生成产物
      "noImplicitAny": true // 参数如果是隐式any类型，就会报错
    	/**
    	 * let str: string = undefined // 默认不会报错, 为true时报错
    	 * let str: string | undefined // 为true时需要这样写
    	 */
    	"strictNullChecks": true
  },
  
  
  // 继承配置文件
  "extends": "./config/base"
}
```



## 声明文件

相比于`JavaScript`，`TypeScript`存在着变量上下文和类型上下文，如当`index.ts`被编译成`index.js`和`index.d.ts`，`index.js`包含着变量上下文，而`index.d.ts`包含着类型上下文（包括变量的声明和类型）

我们可以自行编写声明文件`index.d.ts`来辅助我们进行一些工作，事实上`tsconfig.json#includes`内所有的`ts`和`.d.ts`文件都是有效的，除此之外`tsconfig.json#types`和`tsconfig.json#lib`默认就会分别把`node_modules/@types/node`和`node_modules/typescript/lib`下对应的声明文件加入到整个编译系统当中。（比如当我们安装了`@types/react`后就能在代码中直接使用`JSX.Element`这个类型了，这是因为该声明文件内部通过`declare global`来声明了全局变量的类型）

目前主流库有两种方案来包含声明文件。第一种方式就是把声明文件作为另一个库发布到上文提到过的`node_modules/@types`下；第二种方式是把声明文件也放在当前库下面，通过在`package.json#types`中指定声明文件的位置，第二种方式需要注意的是需要显式的把模块引入后才能得到对应的类型提示。



### 三斜线注释

我们可以在声明文件中使用三斜线注释来手动引入其他声明文件，需要注意的是该注释需要放在文件开头。

- `/// <reference path="test.d.ts"/>`可以引入相同路径下的`test.d.ts`文件
- `/// <reference types="react/next" />`可以引入`node_modules/@types/react/next.d.ts`
- `/// <reference lib="es2015" />`来引入`node_modules/typescript/lib/es2015.d.ts`



### 脚本与模块

在`TypeScript`中我们把使用了`import`或`export`语法的文件视为**模块**，否则则被视为**全局作用域下的脚本**。脚本内部声明的变量和类型是全局可见的，而模块内部的变量和类型是不可见的，需要外部进行相对应的导入。

`TypeScript`中导出的语法包括以下几种：`export {}`、`export default {}`、`export = {}`。其中`export = {}`是`TypeScript`专有的一种导出语法，可以简单地视为`CommonJS`（`module.exports = `）和`AMD`导出的一种兼容，外部导入时需要使用`import React = require('react')`或者`import * as React from 'react'`来进行导入，使用`import React from 'react'`导入会报错（如果我们想要使用`import React from 'react'`这种写法进行导入，则需要设置`"esModuleInterop": true`开启模块互动功能，此时`TypeScript`会使用工具函数来帮我们处理这种不同模块导入的问题）

``` ts
// React.d.ts
declare namespace React {
  
}

export = React
export as namespace React
```



### export as namespace

设想我们是通过外链引入`React`，因此在源码中希望不`import`也能够拿到`React`对应的类型声明，上方代码中的`export as namespace React`就是起这个作用的。



### declare global {}

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







### declare module

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













## 类型推导

``` tsx
// 报错！！！因为第一句会自动将value的类型推导为string
let value = 'abcd' 
value = 123456

// 等价于以下代码
let value : string = 'abcd'
value = 123456
```



## 类型断言

``` tsx
const el = document.querySelector('.el') as HTMLCanvasElement 

// or

const el = <HTMLCanvasElement>document.querySelector('.el')
```



##### const 断言

``` tsx
let obj = {
    name: 'aka' // string
}

let obj = {
    name: 'aka' // readonly 'aka' 
} as const
```

`const`断言还可以把数组断言成只读元组：

``` tsx
let arr = [1, 2, 3] as const
```



##### not-null 断言

``` tsx
function liveDangerously(x?: number | undefined) {
  console.log(x!.toFixed());
}
```





## 类型系统

##### 基本类型

``` tsx
let success : boolean = true 
let age : number = 20 
let name : string = 'akara' 
let u : undefined = undefined 
let n : null = null 

// void 用来代表空值，值只能是undefined或null
let value : void = undefined
value = null
```

##### 数组

数组只可以储存一种数据类型，数组长度可变。

``` tsx
let arr: number[] = [1, 2, 3]
let arr: Array<number> = [1, 2, 3]
```

##### 元组

元组可以储存多种数据类型，但是元组长度不可变。

```ts
let arr: [number, number] = [1, 2]
arr = [1, 2, 3] // 报错

let arr2: [numer, number?] = [1]
arr2 = [1, 2] // 不报错
```

##### 枚举

``` tsx
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```

##### any

`anyscript === javascript`（笑

``` js
let value: any = 'akara'
value = 100 // 不报错
let num: boolean = value // 不报错

let obj: any = {}
obj.getName() // 不报错
```

##### unknown

`unknown`表示某个变量的类型是未知的，也意味着这个变量可能是任意类型的值

``` tsx
let value: unknown;
let num: boolean = value // 报错！这里和any的表现不同

let obj: unknown = {
    getName: function() {}
}
```

使用时通常搭配类型守卫来`narrow`该变量的类型范围

``` tsx
let str: unknown;
if (typeof value === 'string') {
  value.toString() // 被断言成string类型
}
```

##### never

``` ts
function fn(value: 1 | 2) {
  switch (value) {
    case 1:
    case 2:
      return value;
    default:
      return neverThrow(value) // 此时value的类型为value。这种写法的好处是当其他人给联合类型时加类型时，此处会报错提醒
  }
}

function neverThrow(value: never): never { // 函数永远不会返回值
  throw new Error(`${value}`)
}
```

##### object

可以用来表示对象的类型

``` tsx
let obj: object = {
  name: 'akara'
}
```

##### Object

看起来`object`和`Object`只有大小写的区别，`Object`实际上表示的范围更加的广泛，除了表示对象还可以表示数字、字符串、布尔值等基本类型（但不包括`Null`和`Undefined`）。

``` tsx
const obj: Object = {
    name: 'aka'
}
const obj: Object = 'aka'
const obj: Object = 100
const obj: Object = true
```

另外，有的时候会看到这种写法`{}`，这和`Object`是完全等价的。

``` tsx
const obj: {} = { 
    name: 'akara'
}
```

通常表示对象建议使用`object`而不是`Object`









##### 字面量类型

```ts
// 字符串字面量类型
let str: 'small' = 'large'

// 数字字面量类型
let num: 1 = 1

// 布尔字面量类型
let boo: true = true
```

字面量类型可以视为相应类型的子集，如字符串字面量类型可以视为字符串类型的子集。

值得注意的是，用`let`和`const`声明变量时，其类型是不同的。

``` tsx
let name = 'aka' // string
const name = 'aka' // 'aka'
```





## 函数

函数对参数数量和类型有着严格的要求

``` ts
function A(name?: string): string | undefined { // name的实际类型为string | undefined
    return name
}

function A(name = 'akara'): string { 
    return name
}
```

### 函数声明

```ts
function sum(x: number, y: number): number { // 函数声明
    return x + y;
}

const mySum = function (x: number, y: number): number { // 函数表达式
    return x + y;
};

const mySum = (x: number, y: number): number => { // 箭头函数表达式
  
}

// 重载函数声明
function A(a: string, b: number): number;
function A(a: number, b: string): string;
function A<T extends string | number>(a: T, b: T): T | undefined {
    if (a === '1') return b
    if (a === 1) return b
    return
}

A(1, '1') // ok
A(1, 1) // 报错
```

### 函数类型

``` tsx
const A: (name: string) => void = fn1

const B: {
    (name: string): void;
    id: number;
} = fn2

type C = { // 函数重载
  (): void;
  (name: string): void
}

const D: {
    id: number;
    new (name: string): People;
} = People 
```



### this

> Tofix



TypeScript对`this`的使用很严格，使用的时候需要多加注意，比如声明类的时候最好不要使用构造函数。

[可以参考这篇文章](https://jkchao.github.io/typescript-book-chinese/typings/thisType.html)



以及一些代码例子以供参考：

``` tsx
function fn() {
    // 'this' implicitly has type 'any' because it does not have a type annotation.
	console.log(this)
}

let obj = {
    fn() {
        console.log(this) // 不报错
    }
}
```



## Interface

``` tsx
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527; // 报错
```





## Type alias

`interface`和`type alias`作用基本相当，但二者还是有一些区别的，这里挑几个重点的说说

``` tsx
interface A {
    name: string
}
interface B extends A {
    age: number
}

// ----- 分割线 -----

type A = {
    name: string
}
type B = A & {
    age: number
}
```

## 泛型

泛型主要被使用在**`interface`**和**函数**当中。

``` tsx
interface A<T> {
    name: T;
    age: T;
}

let a: A<string> = {
    name: 'aka',
    age: '20',
}
```

``` tsx
function A<T>(name: T, age: T): T[] {
    return [name, age]
} 
A('a', 'b')
```

无论是`interface`还是函数，都存在多个变量的类型，而很多时候我们希望这些变量的类型**强关联**，所以引入了泛型的概念。

函数有个好处是当我们调用的时候不需要显式传入泛型的值，它会根据函数的参数进行推导。



### 泛型约束

很多时候我们需要限定泛型的值在某个范围，也就是通过`extends`来对其进行约束。

``` tsx
function A<T extends { id: number }> (name: T) {
    console.log(name.id)
}
A({ id: 100 })

function B<T extends 'a' | 'b'> (name: T) {
    console.log(name)
}
B('a')
```









## 类型操作

### `typeof`

在`TypeScript`的类型上下文中可使用`typeof`获取类型

``` tsx
let source = {
    name: 'aka',
}

let target: typeof source = {
    name: 'bkb',
}
```



### Union Type

联合类型（Union Types）表示取值可以为多种类型中的一种。

```ts
let value : string | number
value = 'akara'
value = 12345
```

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**。

```ts
// 报错！！！
function getLength(something: string | number): number {
 	return something.length;
}
```

上例中，`length` 不是 `string` 和 `number` 的共有属性，所以会报错。

访问 `string` 和 `number` 的共有属性是没问题的

```ts
function getString(something: string | number): string {
 	return something.toString();
}
```



### Intersection Type

``` tsx
type a = {
    name: string;
}
type b = {
    age: number;
}
let o: a & b = {
    name: 'aka',
    age: 20,
}
```





### Indexed Access Types

``` ts
interface test {
  	0: number;
  	name: string;
    [n: number]: number;  // 数字索引类型
    [s: string]: string | number; // 字符串索引类型， number | string > number
};

type a = test[0] // number
type b = test['name'] // string
type c = test[number] // number
type d = test[string] // string | number

type e = test[0 | 'name'] // string | number
```

索引类型分为字符串索引类型和数字索引类型。以上代码中，`0`是数字索引类型的子集、`name`是字符串索引类型的子集、**数字索引类型是字符串索引类型的子集**





### `keyof`

``` tsx
let source = {
    name: 'aka',
    age: 20
}
let target: keyof typeof source // 'name' | 'age' 
```

``` ts
interface test {
    [n: number]: number; // 数字索引类型
}

let o = keyof test // number
```

``` ts
interface test {
    [s: string]: string; // 字符串索引类型
}

let o = keyof test // string | number
```





### Conditional Types

形式：`A extends B ? a : b`

``` tsx
interface IdLabel {
  	id: number /* some fields */;
}
interface NameLabel {
  	name: string /* other fields */;
}

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
	throw "unimplemented";
}
```

``` tsx
type MessageOf<T extends { message: unknown }> = T["message"];
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;
```

我们通常会使用泛型对类型进行约束，不过有的时候我们也希望当参数是约束外的类型时，有一个固定的返回值。此时可以使用第二行的写法。



### `infer`

使用条件类型时，我们还可以在内部使用`infer`关键字

``` tsx
type A<T> = T extends Array<infer U> ? U : T 
                            
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
```



### Mapped Types

``` tsx
type A = {
    name: string;
    age: number
}

type B = {
    [p in keyof A]+?: A[p]
}
```

> Note that this syntax describes a type rather than a member. If you want to add members, you can use an intersection type

``` tsx
// 错误的写法
type test = {
    [K in 'a' | 'b' | 'c']?: number;
    name: string;
}

// 正确的写法
type test = {
    [K in 'a' | 'b' | 'c']?: number
} & {
    name: string,
}
```



### 修饰符

可以使用`-readonly`、`-?`、`+readonly`、`+?`等操作符。

``` tsx
type B = {
    [p in keyof A]-?: A[p]
}

type B = {
    -readonly[p in keyof A]: A[p]
}

type B = {
    [p in keyof A]?: A[p] // 等于 +?
}
```





## Class

``` tsx
const d: Date = new Date()
const e: Error = new Error('wrong')

class People {
    name = 'aka'
}

const p: People = new People()
const People2: typeof People = People
```

在TypeScript中，强烈建议只使用`class`而不是构造函数来声明类，推荐写法：

``` tsx
class People {
  name: string 
  constructor(name: string) {
    this.name = name 
  }
}
```

TypeScript 有三种访问修饰符， `public`、`private` 和 `protected`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

```tsx
// 修饰符可以写在构造函数的参数中
class Animal {
    public name: string;
    public constructor (name) {
        this.name = name;
    }
}
```

```ts
class Animal {
    readonly name;
    public constructor(name) {
        this.name = name;
    }
}
```

##### 抽象类

```tsx
abstract class Animal {
    public name;
    public constructor(name: string) {
        this.name = name;
    }
    public abstract sayHi(): void;
}

class Cat extends Animal {
    public sayHi() {
        console.log(`Meow, My name is ${this.name}`);
    }
}

let cat = new Cat('Tom');
```

##### 接口实现

接口除了用于描述对象的形状，还可以对类的一部分行为进行抽象

```tsx
interface Alarm {
    alert(): void;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```





以及一些代码例子以供参考：

``` tsx
// 如果在TypeScript中使用construct function的方式创建类，感觉很多问题


// 错误
// 'new' expression, whose target lacks a construct signature, implicitly has an 'any' type.
function A() {}
new A()

// 错误
// Type '() => void' is not assignable to type 'new () => void'.
// Type '() => void' provides no match for the signature 'new (): void'.
const A: new() => void = function() {}


// 错误！
// 'this' implicitly has type 'any' because it does not have a type annotation.
function People (name: string, id: number) {
    this.name = name 
    this.id = id 
}
```









## 工具类型实现

##### `Partial<T>`

``` typescript
// example
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter"
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash"
});

// implement
type Partial<T> = {
    [P in keyof T]?: T[P]
}
```



##### `Require<T>`

``` typescript
type Require<T> = {
    [P in keyof T]-?: T[P]
}
```



##### `Readonly<T>`

``` typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P]
}
```



##### `Pick<T, K>`

``` typescript
// example
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false
};

// implement
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}
```



##### `Exclude<T, U>`

``` typescript
// example
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number

// implement
// extends搭配 ?: 运算符使用
type Exclude<T, U> = T extends U ? never : T;

// 相当于: type A = 'a' 
type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'>
```



##### `Extract<T, U>`

``` typescript
type Extract<T, K> = T extends K ? T : never
```





##### `Omit<T, K>`

``` typescript
// example
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false
};

// implement

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// or
type Omit<T, K> = {
    [P in Exclude<keyof T, K>]: T[P]
}
```



##### `Record<K, T>`

``` typescript
type _Record<K extends keyof any, T> = {
    [P in K]: T
}
```



##### `NonNullable<T>`

``` typescript
type NonNullable<T extends keyof any> = T extends null | undefined ? never : T
```



##### `Parameters<T>`

``` typescript
// infer 关键字
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```



##### `ReturnType<T>`

``` typescript
// infer 关键字
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never
```



##### `ConstructorParameters<T>`

``` typescript
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
```



##### `InstanceType<T>`

``` typescript
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
```







## Follow TypeScript Version

#### 4.4

1. 索引类型支持Symbol、模板字符串类型、联合类型
2. Try...Catch 中err的类型默认为any，现在可以通过`--useUnknownInCatchVariables`将默认值改为`unknown`
3. `--exactOptionalPropertyTypes`。可选符号应该意味着属性可以存在可以不存在，但不应该代表该属性的值可以为undefined

#### 4.3 

1. 允许set和get访问器拥有不同的类型。

   ``` ts
   class A {
       #size = 1
       
       // 4.3以前会报错
       // 'get' and 'set' accessor must have the same type
       get size(): number { 
           return this.#size;
       }
   
       set size(value: number | string) {
           if (typeof value === 'string') {
               this.#size = 0
           } else {
               this.#size = value  
           }
       }
   }
   ```

   ``` ts
   // Now valid!
   interface Thing {
       get size(): number
       set size(value: number | string | boolean);
   }
   ```

2. 新增override关键字用来在类的继承中显式声明方法的重写，同时新增`--noImplicitOverride`来禁止隐式重写（即必须使用override关键字重写，减少出错的可能）

3. 扩展私有域，支持#method()

#### 4.2

1. 元组支持可选参数和rest参数



#### 4.1

1. 模板字符串字面量类型



#### 4.0

##### Variadic Tuple Types

``` typescript
function tail<T extends any[]>(arr: readonly [any, ...T]) {
  const [_ignored, ...rest] = arr;
  return rest;
}


// spreads
type Strings = [string, string];
type Numbers = [number, number];

type StrStrNumNumBool = [...Strings, ...Numbers, boolean];
```



##### labeld tuple

``` typescript
type Range = [start: number, end: number];
```



#### 3.8

1. import type {}

   ``` tsx
   export const People = 'p1';
   export type People2 = 'p2';
   
   const p: typeof People = 'p1'; // ok
   const p2: People2 = 'p2'; // ok
   const p3 = People; // "People" 是使用 "import type" 导入的，因此不能用作值。
   ```

2. 私有字段（#xxx）

3. export * as xxx from xx

4. top-level await（只能在模块中用）





#### 3.7 

1. 可选链
2. 支持??（*nullish coalescing operator* ）



### 随手记录

``` typescript
const test = <T extends unknown>(a: T): T[] => {
    return [a]
}

function test2<T>(a: T): T[] {
    return [a]
}


// class组件内的Ref
class Button extends React.Component {
    myRef: React.RefObject<HTMLButtonElement> // <button></button
    // <HTMLDivElement> <div></div>
    // <HTMLInputElement> <input />
    constructor(props: any) {
        super(props)
        this.myRef = React.createRef()
    }
    render() {
        return (
            <button ref={this.myRef}>{this.props.children}</button>
        )
    }
}
 
```

``` tsx
function sum<T extends number>(a: T, b: T): T {
    return (a + b) as T // 不加T报错
}
```

