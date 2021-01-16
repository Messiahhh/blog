---
sidebarDepth: 4
---

## TypeScript

> 注：本章节部分代码与解释**引用于官方文档或网络资源**！章节的顺序也是和官网Handbook保持一致。

### 基本类型

``` tsx
let success : boolean = true // 布尔值
let age : number = 20 // 数字
let name : string = 'akara' // 字符串

// void 用来代表空值，值只能是undefined或null
let value : void = undefined
value = null

let u : undefined = undefined // undefined
let n : null = null // null
```

与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型，而`void`并不是其他类型的子类型。因此 `undefined` 类型的变量，可以赋值给 `number` 类型的变量；而`void`类型的变量，不可以赋值给其他类型。

```tsx
// 这样不会报错
let num: number = undefined; // 不设置 --strictNullChecks时

// 会报错
let u: void;
let num: number = u;
```

> However, when using the `--strictNullChecks` flag, `null` and `undefined` are only assignable to `unknown`, `any` and their respective types (the one exception being that `undefined` is also assignable to `void`). This helps avoid *many* common errors. In cases where you want to pass in either a `string` or `null` or `undefined`, you can use the union type `string | null | undefined`.
>
> Union types are an advanced topic that we’ll cover in a later chapter.
>
> > As a note: we encourage the use of `--strictNullChecks` when possible, but for the purposes of this handbook, we will assume it is turned off.

根据官网的这段补充，可以知道如果设置了`--strictNullChecks`，`undefined`和`null`就不能赋值给`string`的变量了。不过这个时候我们依然可以这样：

``` tsx
let num: number | undefined = undefined
```

##### 数组

###### 「类型 + 方括号」表示法

> 数组只能包括同一种数据类型

```ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

###### 泛型表示

我们也可以使用数组泛型（Array Generic） 来表示数组

```ts
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

##### 元组

元组可以包括多种不同的数据类型

```ts
let tom: [string, number] = ['Tom', 25];
```

数组的长度是可变的，而元组的长度是不可变的

```ts
tom[0] = 'jack' // ok

tom = ['jack', 20] // ok

tom = ['jack'] // wrong. 元组的长度不能改变
```

##### 枚举

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

```ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
```

枚举成员会被赋值为从 `0` 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

```ts
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

```ts
enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
```

上面的例子中，未手动赋值的枚举项会接着上一个枚举项递增。

##### unknown

> Todo

##### any

```ts
let value : string = 'akara'
value = 20 // 报错，类型不能更改

let value : any = 'akara'
value = 20 // 不报错
```

在任意值上访问任何属性都是允许的，也允许调用任何方法。

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。

```ts
let value
// 等于
let value : any
```

##### never

> Todo

##### Object

> todo

##### 类型推导

```ts
// 报错！！！因为第一句会自动将value的类型推导为string
let value = 'abcd' 
value = 123456

// 等价于以下代码
let value : string = 'abcd'
value = 123456
```



### 字面量类型

`string literal`是`string`的子集，`number literal`是`number`的子集，`boolean literal`是`boolean`的子集

```ts
// 字符串字面量类型
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick');

// 数字字面量类型
let aka: 1 | 2 | 3 = 2

// 布尔字面量类型
let aka: true = true
```



### 接口

接口作用基本可以分为两类，①是对类的一部分行为进行抽象，②是对对象的形状进行描述。本节介绍的就是第二个作用：描述对象的形状。

``` tsx
interface Person {
 name: string;
 age: number;
}

let tom: Person = {
 name: 'Tom',
 age: 25
};
```

定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的

```ts
// 报错！！！不能少属性
let tom : Person = {
 name: 'Tom'
}

// 报错！！！不能多属性
let tom : Person = {
 name: 'Tom',
 age: 25,
 gender: 'male'
}
```

##### 可选属性

有时我们希望不要完全匹配一个形状，那么可以用可选属性

```tsx
interface Person {
 name: string;
 age?: number;
}

let tom: Person = {
 name: 'Tom'
};
```

##### 任意属性

有时候我们希望一个接口允许有任意的属性，可以使用如下方式：

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**

```ts
// 错误！
// Property 'age' of type 'number | undefined' is not assignable to string index type 'string'
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

如果接口中有多个类型的属性，则可以在任意属性中使用联合类型

```tsx
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

##### 只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性

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

// 报错！！！
tom.id = 9527;
```





### 联合类型

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



### 交叉类型

交叉类型（Intersection Type）

``` tsx
type a = {
  id: number
}
type b = {
  name: string
}

let test: a & b = {
  id: 2,
  name: 'aa'
}

```





### 函数

```ts
// 函数声明
function sum(x: number, y: number): number {
    return x + y;
}

// 函数表达式
let mySum = function (x: number, y: number): number {
    return x + y;
};
```

其中函数表达式的写法，我们只对右边的匿名函数进行了类型定义，并没有给出`mySum`的类型。此时会类型推导出`mySum`的类型，因此代码等价于：

```ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

函数类型`(x: number, y: number) => number`中的`x`和`y`只是为了可读性，可以替换成任何其他名字，如：

``` tsx
let mySum = (one: number, two: number) => number = function (x: number, y: number): number {
    return x + y
}
```



我们还可以使用接口的形式表示函数类型

``` tsx
let mySum: {
    (x: number, y: number): number
} = function (x: number, y: number): number {
    return x + y
}

// 接口也可以继续拓展，如
function A(x: number, y: number): number {
    return x + y
}

A.id = 996
A.name = 'akara'

let mySum: {
    (x: number, y: number): number;
	id: number;
	name: string
} = A

// 同时构造函数的类型也可以用接口的形式来表示
class People {
  name: string
  id: number

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
  }
}


let People2: {
  new (name: string, id: number): People // class也可以当作类型
} = People

let p: People = new People('aka', 996)
```

##### 可选参数

TypeScript中函数对参数的类型和长度的要求很严格，不允许传入更多/更少的参数。

与接口中的可选属性类似，我们用 `?` 表示可选的参数：

```ts
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

##### 参数默认值

``` tsx
function A(name = 'akara'): string { // or (name: string = 'akara') 
    return name
}
```

##### this

> 待完善

[可以参考这篇文](https://jkchao.github.io/typescript-book-chinese/typings/thisType.html)

``` tsx
function fn() {
    // 报错!
    // 'this' implicitly has type 'any' because it does not have a type annotation.
	console.log(this)
}

//-------------分割线-----------------

let obj = {
    fn() {
        console.log(this) // { fn(): void; }
    }
}

var fn2 = obj.fn
window.fn2() // ok

//-------------分割线-----------------

let obj2 = {
    // 报错！
    // 'obj2' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer.
    fn(this: typeof obj) {
        console.log(this) 
    }
}

//-------------分割线-----------------

type obj3Type = {
    fn(): void
}
let obj3: obj3Type = {
    fn(this: obj3Type) {
        console.log(this) // obj3Type
    }
}

var fn2 = obj3.fn
window.fn2() // 



function fn(this: typeof window) {
    console.log(this)
}

//-------------分割线-----------------
// 感觉差不多，都能获得到this
let obj = {
    fn() {
        console.log(this) // { fn(): void; }
    }
}

class People {
    constructor() {
        console.log(this)
    }
}

```



### 类

在JavaScript中，通常有两种方式去声明一个类，分别是`class`和`construct function`，如下：

``` js
// 使用class关键字
class People {
    constructor(name) {
        this.name = name
    }
}

// 直接声明构造函数
function People(name) {
    this.name = name
}

new People('akara')
```

不管怎么样，当我们通过`new`操作符来生成一个类的实例时，会经过几个步骤：先创建空的实例对象，再通过调用构造函数来给这个空对象增加新属性。像这样：

``` js
People.call({
    __proto__: People.prototype
}, 'akara')
```

而既然TypeScript引入了严格的类型系统，我们就不能在构造函数中给空对象增加属性，相反的做法是，我们传入构造函数的实例最初就应该拥有这几个属性了。

``` tsx
// 这个类在JS中肯定是正确的，但在TS中报错了
class People {
  constructor(name: string) {
    this.name = name // 错误！Property 'name' does not exist on type 'People'
  }
}

// 原因可以用以下伪代码解释

let obj = {
    __proto__: Object.prototype
}

// 错误！property 'name' does not exist on type '{ __proto__: Object; }'
People.call(obj, 'akara') // 等价于 obj.name = 'akara'
```

所以，在TypeScript中创建`class`的推荐写法如下：

``` tsx
class People {
  name: string // 传入构造函数前，实例就拥有name属性了
  constructor(name: string) {
    this.name = name // 正确，构造函数中只是重新给该属性赋值
  }
}

// 类似于

let obj = {
    name: undefined,
    __proto__: Object.prototype
}

People.call(obj, 'akara') // 等价于 obj.name = 'akara'  
```

上文解释了，因为TypeScript引入了类型系统，用以往的写法（实例属性在构造函数中设置）声明`class`的方式会报错，而多亏`class`的这种实例属性的写法（实例属性在构造函数外设置），我们稍微改动代码就可以了。

而类的声明除了使用`class`，也可以使用`construct function`，但后者并不能像`class`一样在构造函数调用前就给实例设置好属性，事实上我在官方文档中也没有看到相关的例子。所以在TypeScript中，建议只使用`class`来声明类，只有这样声明的类才能通过`new`操作符来初始化。



以下是一些失败的尝试：

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



再补充一点JS和TS的`class`声明的差异，JS中类的实例属性可以不初始化，而TS中类的实例属性必须初始化

``` ts
// Wrong! Property 'age' has no initializer and is not definitely assigned in the constructor
class Person {
    name: string;
    age: number;
}

// Ok
class Person {
    name: string = 'aka';
    age: number;
    constructor(age: number) {
        this.age = age
    }
}
```



另外，当我们用`class`来声明一个类，这个类名也可以被当成类型！也就是这个类的实例的类型

``` tsx
class People {
    name = 'akara'
}

let p: People = new People() // 实例

let People2: typeof People = People // 类
```



TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`。

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

// 可以改写为以下代码

class Animal {
    // public name: string;
    public constructor (public name) {
        // this.name = name;
    }
}
```



只读属性关键字`readonly`，只允许出现在属性声明或索引签名或构造函数中。

```ts
class Animal {
    readonly name;
    public constructor(name) {
        this.name = name;
    }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
// 报错
```

注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面。

```tsx
class Animal {
    // public readonly name;
    public constructor(public readonly name) {
        // this.name = name;
    }
}
```

##### 抽象类

`abstract` 用于定义抽象类和其中的抽象方法。

什么是抽象类？

首先，抽象类是不允许被实例化的；其次，抽象类中的抽象方法必须被子类实现。

下面是一个正确使用抽象类的例子

```tsx
abstract class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
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



### 泛型

```tsx
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```









### 值得注意的问题

##### string 和 literal string

``` typescript
// 报错
let fruits1 = 'apple'
const Fruits1: 'orange' | 'apple' = fruits1

// 仅仅把let改为const，就不报错了
const fruits1 = 'apple'
const Fruits1: 'orange' | 'apple' = fruits1
```

发现直接用let声明的字符串的类型为string，而通过const声明的字符串的类型为字符串字面量（本例中为字符串字面量'apple'）



##### const 断言

``` typescript
const o = {
    name: 'akara' // type为string
} 

const o = {
    name: 'akara' // type为'akara'，并且为readonly
} as const


const o = {
    age: 20
} as const
let b: typeof o.age = 30
// error: Type '30' is not assignable to type '20'

const o = {
    age: 20
} as const
o.age = 30
// error: Cannot assign to 'age' because it is a read-only property
```



以下代码会报错

``` typescript
function sum<T extends number>(a: T, b: T): T {
    return (a + b) as T
}

let arr = [1, 2]
sum(...arr) // error: Expected 2 arguments, but got 0 or more
```

这是因为数组`arr`的长度是为止的，而`sum`函数只接受两个参数。可以使用`const`断言解决这个问题。

``` typescript
function sum<T extends number>(a: T, b: T): T {
    return (a + b) as T
}

let arr = [1, 2] as const
sum(...arr)
```

此时，arr的类型为 `readonly [1, 2]`（元组）





##### intersection 和 indexed access type

``` typescript
// 发现这样的写法不行
type test = {
    [K in 'a' | 'b' | 'c']?: number;
    name: string;
}

// 必须得这样
type test = {
    [K in 'a' | 'b' | 'c']?: number
} & {
    name: string,
}
```



##### subtraction

``` typescript
interface test {
    one?: string;
    two?: string
}

let b: {
    [T in keyof test]-?: test[T]
}
```



##### indexed access type

``` typescript
// 其他代码笔记
interface test {
    [b: string]: string,
}

let a: keyof test // string | number



let b: string[][number] = '123'

interface test {
    [a: number]: string,
    [b: string]: string,
    ccc: number // 不能是number
}

let a: test = {
    1: '111',
    2: '222',
    '3': '333'
}

let c: keyof test // 'number' | 'string'

let b: test[number]
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



### tsconfig.json

很多项目的根目录下都存在`tsconfig.json`文件，也就是`TypeScript`的配置文件，当我们使用`tsc`命令来编译代码的时候，会向上层目录中寻找该配置文件。

需要注意的一点是，当我们使用`tsc index.tsx`来直接指定待编译文件时，`tsconfig.json`的配置并不会生效。因此我们大多数时候都是直接在`tsconfig.json`中指定编译的输入与输出，比如使用`files/include/exclude`等参数。

另外，即使`tsconfig.json`为空，只要存在就拥有对应的默认参数。



当我们在ts项目引用一个外部的js库时，需要拥有该文件对应的声明，通常可以使用`npm i @types/xxx`，或者是项目中存在对应的声明文件（xx.d.ts）

``` tsx
// xx.d.ts
// 一种普通的场景
declare module 'module-name' {
    export function methodA(): void
}
```

`tsconfig.json`中的一些配置：

``` tsx
{
    "compilerOptions": {
        // 编译后的输出目录
        "outDir": "lib",
        // true表示不会生成输出文件
        "noEmit": true,
        // true表示ts编译成js的同时，会生成对应的.d.ts声明文件
        "declaration": true,
		// 生成的js是严格模式
        "strict": true,
		// 生成的目标，通常是es5
        "target": "es5"
        // 等等...
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

