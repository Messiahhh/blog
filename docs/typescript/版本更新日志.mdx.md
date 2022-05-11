# 版本更新日志

从`TypeScript`官方版本日志中列举一些日常工作中可能会高频使用的功能。



## 4.5

### Awaited

``` typescript
type p1 = Promise<number>
type A1 = Awaited<p1> // number;
type A2 = Awaited<string | Promise<number>> // string | number
```



### top-level await

`module: es2022`支持`top-level await`（此时`target`需要大于等于`es2017`）

``` typescript
const value = await Promise.resolve(233)

export {}
```



### type modifier

``` typescript
import { age } from './test'
import type { People } from './test' // 老写法

let p: People;
```

``` typescript
import { age, type People } from './test' // 新写法
```







## 4.4

### 增强控制流分析

``` typescript
function fn(value: unknown) {
    const flag = typeof value === 'number';
    if (flag) {
        value.toFixed()
    }
}
```

``` typescript
function doSomeChecks(
  inputA: string | undefined,
  inputB: string | undefined,
  shouldDoExtraWork: boolean
) {
  const mustDoWork = inputA && inputB && shouldDoExtraWork;
  if (mustDoWork) {
    // We can access 'string' properties on both 'inputA' and 'inputB'!
    const upperA = inputA.toUpperCase();
    const upperB = inputB.toUpperCase();
    // ...
  }
}
```



### 索引类型支持Symbol、模板字符串

``` typescript
interface T {
    [name: symbol]: string;
    [data: `data-${string}`]: string;
}
```



## 4.3 

### [Contextual Narrowing for Generics](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#contextual-narrowing-for-generics)

极大改善了范型参数的`narrow`，详情见[链接](https://github.com/microsoft/TypeScript/pull/43183)，避免了如下这种常见的错误提示。

``` typescript
declare function takeA(a: 'a'): void;
function f2<T extends 'a' | 'b'>(x: T) {
    if (x === 'a') {
      	// Argument of type 'T' is not assignable to parameter of type '"a"'.
  			// Type '"a" | "b"' is not assignable to type '"a"'.
    		// Type '"b"' is not assignable to type '"a"'.(2345)
        takeA(x); // 4.2版本及以前都会报错
    }
}
```







## 4.2

### 元祖支持前置、中置 rest 元素

``` typescript
type tuple = [number, ...string[], number];
function fn(...args: [...string[], number]) {

}
fn('a', 'b', 'c', 3)
```



## 4.1

### 新增模板字面量类型





### 映射类型（Mapped types）支持 as 子句

[参考](https://github.com/microsoft/TypeScript/pull/40336)

通过支持`as`子句实现键值的重新映射，语法如下，能够把`P`重新映射为`N`。

``` typescript
type A = { 
  [P in K as N]: X 
}
```

#### 例子一：🌰

``` typescript
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};
 
interface Person {
    name: string;
    age: number;
    location: string;
}
 
type LazyPerson = Getters<Person>;
```

需要注意的是如同我们在映射类型一节所提到的，`[K in T]`中的`T`需要满足是`string | number | symbol`的子类型，同时我们在这个例子中并没有约束`T`的类型，所以在使用`Captialize`的时候我们需要使用`string & K`来排除`K`可能的`number | symbol`类型。



#### 例子二：🌰

> When the type specified in an `as` clause resolves to `never`, no property is generated for that key。

当`as`子句中指定的类型被解析成`never`，那么对于这个键没有对应的属性生成，所以`as`子句可以用来做过滤器。

``` typescript
type Methods<T> = { [P in keyof T as T[P] extends Function ? P : never]: T[P] };
type T60 = Methods<{ foo(): number, bar: boolean }>;  // { foo(): number }
```



#### 例子三：🌰

> When the type specified in an `as` clause resolves to a union of literal types, multiple properties with the same type are generated

``` typescript
type DoubleProp<T> = { [P in keyof T & string as `${P}1` | `${P}2`]: T[P] }
type T70 = DoubleProp<{ a: string, b: number }>;  // { a1: string, a2: string, b1: number, b2: number }
```











## 4.0

### Variadic Tuple Types

``` typescript
function tail<T extends any[]>(arr: readonly [any, ...T]) {
  const [_ignored, ...rest] = arr;
  return rest;
}

type Arr = readonly any[];
function concat<T extends Arr, U extends Arr>(arr1: T, arr2: U): [...T, ...U] {
  return [...arr1, ...arr2];
}


// spreads
type Strings = [string, string];
type Numbers = [number, number];

type StrStrNumNumBool = [...Strings, ...Numbers, boolean];
```



### labeld tuple

``` typescript
type Range = [start: number, end: number];
```



## 3.8

### Type-Only Imports and Export

``` typescript title="a.ts"
export interface People {
    name: string;
}

export const value = 100;
export class Animal {
    age = 20;
}
```

``` typescript title="b.ts"
import type { People, value, Animal } from './a.ts'

type p = People;
type a = Animal;
type v = typeof value;

let value2 = value // error
```



### 私有字段

``` typescript
class Person {
  #name: string;
  constructor(name: string) {
    this.#name = name;
  }
  greet() {
    console.log(`Hello, my name is ${this.#name}!`);
  }
}
let jeremy = new Person("Jeremy Bearimy");
jeremy.#name; // error
```



### `export * as xxx from ''`

``` typescript title="老写法"
import * as utilities from "./utilities.js";
export { utilities };
```

``` typescript title="新写法"
export * as utilities from "./utilities.js";
```



## 3.7 

### 可选链（Optional Chaining）

``` typescript
A?.B?.[0]?.C?.()
```





### ??（Nullish Coalescing）

``` typescript
let result = 0 ?? 'test' // 0
let result2 = 0 || 'test' // 'test'
```



### 断言函数（Assertion Function）

``` typescript title="用法一"
function fn(value: unknown) {
  assert(typeof value === "number");
  return value.toFixed() // number
}
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}
```

``` typescript title="用法二"
function fn(value: unknown) {
  isNumber(value);
  return value.toFixed() // number
}

function isNumber(val: unknown): asserts val is number {
  if (typeof val !== "number") {
    throw new Error("Not a number!");
  }
}
```









