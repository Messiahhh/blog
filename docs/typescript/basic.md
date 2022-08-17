
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









### 数组与元祖

`JavaScript`中只存在数组的概念，`TypeScript`在数组的基本上抽象出元祖的概念，但本质都是一样的。

`TypeScript`中数组只可以存储一种数据类型，数组的长度可变；而元祖可以存储不同的数据类型，但元祖的长度不可变。

#### 数组

##### 定义

``` typescript
let a1: Array<number> = [1, 2, 3];
let a2: number[] = [1, 2, 3];
let a3 = [1, 2, 3];
```

##### 本质

``` typescript
type arr1 = [1, 2, 3];
type arr1 = { 
  	[x: number]: number;
    length: number;
    // 其他方法
}

// readonly的本质
type arr2 = readonly [1, 2, 3];
type arr2 = { 
  	[x: number]: number;
    readonly length: number;
    // 其他方法
}
```



#### 元组

##### 定义

``` typescript
let t1: [number, number] = [1, 2];
let t2 = [1, 2] as const;
```

通过`as const`能够将一个数组断言为`readonly`元组





##### 本质

``` typescript
type tuple = [1, 2, 3];
type tuple = {
  	[x: number]: 1 | 2 | 3;
    0: 1;
    1: 2;
    2: 3;
    length: 3;
    // 其他方法
}

// readonly的本质
type tuple = readonly [1, 2, 3];
type tuple = {
  	[x: number]: 1 | 2 | 3;
    readonly 0: 1;
    readonly 1: 2;
    readonly 2: 3;
    readonly length: 3;
    // 其他方法
}
```



#### any[]

所有非`readonly`元组都是`any[]`的子类型，所有元组都是`readonly any[]`的子类型。（`any[]`是`readonly any[]`的子类型）

因此如果我们的泛型可以同时接收数组和元组，可以使用`T extends readonly any[]`进行约束



``` typescript
type B = number[] extends readonly number[] ? true : false; // true
type A = readonly number[] extends number[] ? true : false; // false

// 对比 

type A = {
  readonly age: number;
}

type B = {
  age: number;
}

type Test = A extends B ? true : false; // true
type Test2 = B extends A ? true : false; // true
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




### Class

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







