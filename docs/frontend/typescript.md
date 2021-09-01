---
sidebarDepth: 4
---

## TypeScript

> 注：本节参考自官网文档，部分代码直接引用于原文档的例子



### 安装 

``` shell
npm install typescript -g
tsc index.tsx
```

##### 项目中添加TS

``` shell
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

比如在已有的CRA项目中添加TS支持



### 配置

##### noEmitOnError

``` shell
tsc --noEmitOnError index.tsx
```

当不开启该标志时，当调用`tsc`时，即使`ts`代码存在错误，依然会生成一份新的`js`代码。

当开启该标志时，只有`ts`代码没有错误时，才生成新的代码。



##### noImplicitAny

当开启该标志时，参数如果是隐式any类型，就会报错。

``` tsx
function A(name) { // 隐式any类型，报错
    console.log(name)
}
```



##### strictNullChecks

当不开启该标志时，`undefined`和`null`的值可以被赋值给其他类型的变量（如`string`类型）

``` tsx
let str: string = undefined // 不会报错
```

当开启该标志时，该代码就会报错。

此时只能：

``` tsx
let str: string | undefined = undefined
```

### 概念

##### 类型推导

``` tsx
// 报错！！！因为第一句会自动将value的类型推导为string
let value = 'abcd' 
value = 123456

// 等价于以下代码
let value : string = 'abcd'
value = 123456
```



##### 类型断言

``` tsx
const el = document.querySelector('.el') as HTMLCanvasElement 

// or

const el = <HTMLCanvasElement>document.querySelector('.el')
```



###### const 断言

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



###### Not-null 断言

``` tsx
function liveDangerously(x?: number | undefined) {
  console.log(x!.toFixed());
}
```





### 类型系统

##### 基本类型

``` tsx
let success : boolean = true // 布尔值
let age : number = 20 // 数字
let name : string = 'akara' // 字符串
let u : undefined = undefined // undefined
let n : null = null // null

// void 用来代表空值，值只能是undefined或null
let value : void = undefined
value = null
```

##### 数组

TS中数组只可以储存一种数据类型，数组长度可变。

``` tsx
let arr: number[] = [1, 2, 3]
let arr: Array<number> = [1, 2, 3]
```

##### 元组

元组可以储存多种数据类型，但是元组长度不可变。

```ts
let aka: [string, number] = ['akara', 20]

aka = ['akara', 20, 100] // 报错
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

``` js
let value: any = 'akara'
value = 100 // 不报错
let num: boolean = value // 不报错

let obj: any = {}
obj.getName() // 不报错

```

`any`类型的变量可以获取它的任何属性和方法

##### unknown

`unknown`表示某个变量的类型是未知的，也意味着这个变量可能是任意类型的值，这个值可能是来自于动态内容。

``` tsx
let value: unknown = 'akara'
value = 100 // 不报错
let num: boolean = value // 报错！这里和any的表现不同

let obj: unknown = {
    getName: function() {}
}
obj.getName() // 报错！
```

我们可以通过类型守卫（如`typeof`）来`narrow`变量的类型范围

``` tsx
let value: unknown = 100
let num: number 
if (typeof value === 'number') {
	num = value // 此时不报错
}
```

##### never

> The `never` type represents the type of values that never occur. For instance, `never` is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns. Variables also acquire the type `never` when narrowed by any type guards that can never be true.

``` tsx
function error(message: string): never { 
  throw new Error(message); // 抛出错误，函数并没有返回值
}

function infiniteLoop(): never {
  while (true) {} // 函数没有返回值
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





### 函数

```ts
function sum(x: number, y: number): number { // 函数声明
    return x + y;
}

let mySum = function (x: number, y: number): number { // 函数表达式
    return x + y;
};
```

##### 类型表示

``` tsx
const A: (name: string) => void = fn1

const B: {
    (name: string): void;
    id: number;
} = fn2

const C: {
    id: number;
    new (name: string): People;
} = People 
```

##### 参数

TypeScript中函数对参数的长度要求很严格，可使用`?`表示可选参数，也可以使用参数默认值：

``` tsx
function A(name?: string): string | undefined { // name的实际类型为string | undefined
    return name
}
```

``` tsx
function A(name = 'akara'): string { 
    return name
}
```

##### 匿名函数

匿名函数中会自动推导参数的类型

``` tsx
let arr = [1, 2, 3]
arr.forEach(item => console.log(item)) // 不用给item加类型注解
```



##### this

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

##### 重载

假设对于函数A存在参数a、b，我们希望`a`为字符串时`b`为数字，`a`为数字时`b`为字符串，如果单纯使用联合类型就可能出现`a`为数字时`b`也为数字。

``` ts
function A<T extends string | number>(a: T, b: T): T | undefined {
    if (a === '1') return b
    if (a === 1) return b
    return
}

A(1, 1) // 没报错，我们不希望这种情况
```

通常这种情况我们可以使用函数重载。

``` ts
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



### 对象类型

##### 接口

接口作用：①描述对象的形状，②对类的行为进行抽象。本节介绍作用①。

``` tsx
interface Person {
	name: string;
	age: number;
}

let me: Person = {
	name: 'akara',
	age: 20,
};
```

接口的属性**不可以多，也不可以少**

```ts
let me : Person = { // 报错，少了属性
	name: 'aka' 
}

let tom : Person = { // 报错，多了属性
	name: 'aka',
	age: 20,
	gender: 'male'
}
```

**可选属性**

```tsx
interface Person {
	name: string;
	age?: number; // 此时age的实际类型为number | undefined
}

let tom: Person = {
	name: 'aka' // 不报错
};
```

**只读属性**

```ts
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

###### 索引类型

首先，索引类型分为**字符串索引类型**和数字索引类型。

``` tsx
interface test {
    [n: number]: number; 
    [s: string]: number | string; // 这里的n和s除了可读性，没有任何意义
}
```

再来看几个例子：

``` tsx
interface test {
    name: string;
    age: number;
}

let o: keyof test // 'name' | 'age'
```

``` tsx
interface test {
    [n: number]: number; // 数字索引类型
}

let o = keyof test // number
```

``` tsx
interface test {
    [s: string]: string; // 字符串索引类型
}

let o = keyof test // string | number
```

从中我们能得出一个结论：**数字索引类型是字符串索引类型的子集**。

``` tsx
interface test2 {
    1: number;
    'a': string;
    [n: number]: number;
    [s: string]: string | number; // 注意这里
}
```

在这个代码例子中，接口属性有以下几种类型：数字字面量1、字符串字面量'a'、`number`、`string `。**其中数字字面量是`[n: number]`的子集，字符串字面量是`[s:string]`的子集，`[n: number]`又是`[s: string]`的子集。**

所以`[s: string]`的值的类型必须包含`[n: number]`的值的类型和字面量的值的类型。

> There are two types of supported index signatures: string and number. It is possible to support both types of indexers, but **the type returned from a numeric indexer must be a subtype of the type returned from the string indexer. This is because when indexing with a `number`, JavaScript will actually convert that to a `string` before indexing into an object.** That means that indexing with `100` (a `number`) is the same thing as indexing with `"100"` (a `string`), so the two need to be consistent.

##### Type alias

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



### 类

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



### 泛型

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



##### 泛型约束

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





### 类型操作



##### 联合类型

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



##### 交叉类型

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



##### `typeof`

在JavaScript中`typeof`用来获取变量的基本类型，而在TypeScript中可以在`type context`使用`typeof`获取类型

``` tsx
let source = {
    name: 'aka',
}

let target: typeof source = {
    name: 'bkb',
}
```



##### `keyof`

``` tsx
let source = {
    name: 'aka',
    age: 20
}
let target: keyof typeof source = 'name' // 'name' | 'age' 
```





##### `Indexed Access Types`

我们的接口类型也是类似对象的结构，那么我们自然可以使用索引来获取接口类型的某个键值的类型

``` tsx
type source = {
    name: string;
    age: number;
}

// 获取一个键的类型
let target: source['name'] = 'aka' // string

// 获取多个键的类型
let target: source['name' | 'age'] = 'aka' // string | number 
target = 20

// 因此也可以搭配keyof使用
let target: source[keyof source] = 'aka' // string | number 
```

我们也可以拿到`interface`中索引类型的值：

``` tsx
interface source {
    name: string;
    [s: string]: string;
}

let target: source[string] = 'akara' // string

// or

interface source {
    name: string;
    [n: number]: number;
}

let target: source[number] = 0 // number
```



##### `Conditional Types`

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



###### `infer`

使用条件类型时，我们还可以在内部使用`infer`关键字

``` tsx
type A<T> = T extends Array<infer U> ? U : T 
                            
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
```



##### Mapped Types

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



###### 修饰符

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



### 工具类型实现

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







### Follow TypeScript Version

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





### 声明文件

当我们编写`a.ts`文件时，因为`TypeScript`存在着变量上下文和类型上下文，我们在`b.ts`文件中可以享受到到`a.ts`所提供的**变量类型提示**，以及各种**类型或接口**。

而当我们使用第三方库的时候，由于目前大多数库提供的都是`TypeScript`源码编译打包而来的`JavaScript`产物，我们项目中引入的`JS`文件已经不存在类型系统了，而我们实际上还是希望能够得到对应的**变量类型提示**（至少我们想要清楚地知道库包括了哪些方法和属性）、以及库所提供的类型，为了实现这个目的我们需要引入库所对应的声明文件（`xxx.d.ts`）。

目前主流库有两种方案来处理声明文件。第一种方案是将声明文件也一起放在模块内部，比如`chalk`库就同时提供了`index.js`和`index.d.ts`（通过`package.json`的`main`字段指定入口文件，`types`字段指定声明文件的位置），这种方案的特点是我们必须显式引入这个库，才能使用库提供的声明文件所带来的变量类型提示；另一种方案是将声明文件作为一个独立的模块发布在`@types`模块作用域下，比如`@types/react`和`@types/node`。

> 有的库比如`mockjs`模块内部没有声明文件，当我们`import mockjs from 'mockjs'`会提示找不到`mockjs`，这时候就得乖乖去安装一个`@types/mockjs`

除了使用库所提供的声明文件，我们也可以自己在项目中创建声明文件（`.ts`和`.d.ts`文件都需要被`files`或`include`包括才生效），之后项目中的`TS`代码就可以得到声明文件所提供的变量类型提示和类型系统。事实上在我们安装了`typescript`模块后，也能使用它内置的声明文件（如`node_modules/typescript/lib/index.d.ts`）。

``` ts
// global.d.ts
interface People {
  name: string;
  age: number;
}
declare const p: People

// index.ts
console.log(p.name) // 不报错

const p: People = { // 缺失属性，报错
  name: 'aaa',
}
```



##### 三斜线注释

除了以上的方式引入声明文件，我们还可以使用三斜线注释来手动引入声明文件。

比如`/// <reference path="test.d.ts"/>`可以引入相同路径下的`test.d.ts`文件；再比如`/// <reference types="react/next" />`可以引入`node_modules/@types/react/next.d.ts`（这个文件默认不生效）；又或者`/// <reference lib="es2015" />`来引入`node_modules/typescript/lib/es2015.d.ts`声明文件。

当`compilerOptions`中没有指定`types`字段时，`node_modules/@types`下的所有库的入口声明文件都会生效，但当指定了`types`字段时，只有`types`包含的类型模块才会生效。（比如`types`字段只有`['react']`，此时`@types/node`不会生效）

我们也可以通过设置`lib`或`target`字段，来设置默认生效的内置声明文件。



##### 模块

依托于`TypeScript`提供的类型系统，我们在`b.ts`文件中可以享受到到`a.ts`所提供的**变量类型提示**，以及各种**类型或接口**，这可以极大加强我们的开发效率。

不过考虑到现代项目都是模块化的，模块内的变量和类型对外应该是未知的，因此在`TypeScript`中我们把包括`import`或`export`语法的文件视为**模块**，我们必须显式引入模块才能得到对应的变量类型提示；反之则被视为**全局作用域下的脚本**。

``` ts
// a.ts
interface People {}
export {}

// b.ts
let p: People // 报错，找不到People
```

`TypeScript`中导出的语法包括以下几种：`export {}`、`export default {}`，`export = {}`。最后一种看起来很奇怪，简单来说可以视为`CommonJS`和`AMD`导出的一种兼容。

> `export as namespace XXX`不是模块导出

事实上`@types/react`的声明文件是这样写的：

``` ts
declare namespace React {
  
}

export = React
export as namespace React
```

通过使用`export = React`来使其被视为一个模块，此时我们必须手动引入`React`才能得到对应的类型提示，但细心的话会发现就算我们不引入`React`，在代码中输入`React`也会提示它拥有的方法和类型，这是通过`export as namespace React`实现的。

##### declare module

像`@types/react`只是提供了一个库的声明文件，因此可以用以上的写法。那么对于`@types/node`这种需要提供`fs`、`path`、`http`、`os`等多个库的声明文件，写法就如下所示：

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









### tsconfig.json

``` tsx
{
    "compilerOptions": {
        "outDir": "dist", // 编译后的输出目录
        "noEmit": true, // 不生成编译产物
        "declaration": true, // 生成声明文件
				"moduleResolution": "node", // 推荐
        "module": "esnext", // 推荐
        "jsx": "react", // 支持react jsx
        "target": "es5", // 构建目标
        "lib": [], // 包括的库文件
        "allowJs": true, // 允许编译JS文件
        "checkJs": true, // 检查JS文件语法
        "paths": {  // 路径别名
          "@test/*": ["./src/test/*"]
        },
    },
    // 指定待编译的文件
    "files": [
        
    ],
    // 指定待编译文件的目录
    "include": [
        
    ],
    // 指定哪些文件不被编译，默认值包括node_modules等
    "exclude": [
        
    ]
}
```



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

