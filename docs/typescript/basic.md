
# 基础
## 类型推导

``` tsx
let value = 'abcd' 
value = 123456

// 等价于以下代码
let value : string = 'abcd'
value = 123456
```



## 类型系统

### 基本类型

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



### 字面量类型

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





### 数组

数组只可以储存一种数据类型，数组长度可变。

``` tsx
let arr: number[] = [1, 2, 3]
let arr: Array<number> = [1, 2, 3]
```

### 元组

元组可以储存多种数据类型，但是元组长度不可变。

```ts
let arr: [number, number] = [1, 2]
arr = [1, 2, 3] // 报错

let arr2: [numer, number?] = [1]
arr2 = [1, 2] // 不报错
```



### 函数

函数对参数数量和类型有着严格的要求

``` ts
function A(name?: string): string | undefined { // name的实际类型为string | undefined
    return name
}

function A(name = 'akara'): string { 
    return name
}
```

#### 函数声明

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

#### 函数类型

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



### 枚举

``` tsx
enum Color {
  One,
  Two
}

Color.One === 0;
Color.Two === 1;
Color[0] === 'One'
Color[1] === 'Two'
```



### any

`anyscript === javascript`（笑

``` js
let value: any = 'akara'
value = 100 // 不报错
let num: boolean = value // 不报错

let obj: any = {}
obj.getName() // 不报错
```

### unknown

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

### never

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

### object

可以用来表示对象的类型

``` tsx
let obj: object = {
  name: 'akara'
}
```

### Object

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





## Type Alias

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

我们可以在类型上下文使用`typeof`获取值所对应的类型

``` tsx
let source = {
    name: 'aka',
}

let target: typeof source = {
    name: 'bkb',
}
```



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

#### `infer`

使用条件类型时，我们还可以在内部使用`infer`关键字

``` tsx
type A<T> = T extends Array<infer U> ? U : T 
                            
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
```



#### [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types)

当`Conditional Types`中被检查的`type parameter`是[naked type parameter](https://stackoverflow.com/questions/51651499/typescript-what-is-a-naked-type-parameter)时，我们称之为Distributive Conditional Types（分布式条件类型），`naked type paramter`指的是类型参数并没有被其他类型包裹（包括`Array`、`tuple`、`function`或者其他范型）。

``` ts
type NakedUsage<T> = T extends boolean ? "YES" : "NO"
type WrappedUsage<T> = [T] extends [boolean] ? "YES" : "NO"; // wrapped in a tuple
```

比如这里第一行就是分布式条件类型，此时当类型参数`T`被实例化为联合类型时，那么条件类型将会分发给联合类型的每一个成员。

``` ts
type Distributed = NakedUsage<number | boolean > // = NakedUsage<number> | NakedUsage<boolean> =  "NO" | "YES" 
type NotDistributed = WrappedUsage<number | boolean > // "NO"   
```

利用这个特性，我们还可以实现以下功能
``` ts
type Test<T> = T extends any ? T[] : any;
type Test2<T> = T[]

type A = Test<number | string> // number[] | string[]
type B = Test2<number | string> // (number | string)[]
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



## 类型守卫

`TypeScript`的`Control Flow Analysis`（控制流分析）能够根据**代码逻辑**把联合类型`narrow`到一个更小范围的类型，同时对于`unknown`的类型我们也可以`narrow`成一个更具体的类型，这样的代码类型一般称为类型守卫（`type guard`）

常见的类型守卫有这些`typeof`、`instanceof`、`in`、`switch...case...`等

``` ts
if (typeof value === 'string') {}
if (value instanceof Array) {}
if ('type' in value) {}

value // string | number
if (value.length) {} // value: string
```

``` ts
type V = {type: 'a', name: string } | {type: 'b', age: number }
switch (value.type) {
  case 'a':
    return value.name
  case 'b'
    return value.age;
  default:
    throw new Error('')
}
```

除了这些基础的类型守卫，我们还可以自己定义类型守卫函数，比如常见的`Array.isArray`就是一个典型的类型守卫函数

``` ts
type fn = {
  // highlight-next-line
  isArray(arg: any): arg is any[];
}
```

``` ts
type A = {
  type: 'a',
  name: string;
}

type B = {
  type: 'b',
  age: number;
}

function isA(value: A | B): value is A {
  return 'name' in value
}

function fn(value: A | B) {
  if (isA(value)) {
    return value.name
  }
  return value.age;
}
```



## 类型断言

``` tsx
const el = document.querySelector('.el') as HTMLCanvasElement 

// or

const el = <HTMLCanvasElement>document.querySelector('.el')
```



### const assertion

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



### Not-null assertion

``` tsx
function liveDangerously(x?: number | undefined) {
  console.log(x!.toFixed());
}
```



### assertion function

``` ts
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') throw new Error('Assert Error')
}

declare const value: unknown;
isNumber(value)

value.toFixed()
value.toPrecision()
```



## 声明合并

### Merging Interfaces

``` ts
interface A {
    name: string;
}

interface A {
    age: number;
}

let a: A = {
    name: 'aaa',
    age: 20
}
```

``` ts
class D {
    name = 'ddd'

    run() {

    }
}

interface D {
    age: number;
}

let d: D = {
    name: 'ddd',
    run() {},
    age: 20,
}
```



### Merging Namespaces

``` ts
namespace B {
    export interface C {
        name: string;
    }
    export const name = 10;
}

namespace B {
    export interface C {
        age: number;
    }
    export const age = 20;
}

let c: B.C = {
    name: 'ccc',
    age: 20
}

let c2 = B.age
let c3 = B.name;
```



### Merging Namespaces With Value

我们知道像`变量`、`函数`只能在值上下文中使用，`interface`、`type alias`只能在类型上下文中使用，而`class`、`enum`既可以在值上下文中使用也可以在类型上下文中使用。

而`namespace`则更加特殊，这个关键字原本在`TypeScript`中代表的含义是内部模块（`internal module`），主要的作用是将相关的类型和值挂载在一个对象上，事实上在编译后我们能够得到的就是一个对象。

``` ts
namespace Obj {
   export const age = 20;
}

// --- 等价于 ---

const Obj = {
   age: 20
}
```

因此我们可以使用`namespace`来给`Classes`、`Functions`、`Enums`合并静态的属性或方法（后者本质上都是对象）

``` ts
function fn() {
    
}

namespace fn {
    export const age = 20;
}

console.log(fn.age);
```

``` ts
enum Color {
    One,
    Two,
}

namespace Color { 
    export const age = 20;
}

console.log(Color.One, Color.Two, Color[0], Color[1], Color.age)

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

