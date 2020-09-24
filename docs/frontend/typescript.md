---
sidebarDepth: 4
---

## TypeScript



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



##### Extract<T, U>

``` typescript
type Extract<T, K> = T extends K ? T : never
```





##### Omit<T, K>

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

