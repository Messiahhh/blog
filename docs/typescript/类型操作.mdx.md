# 类型操作

## `typeof`

我们可以在类型上下文使用`typeof`获取值所对应的类型

``` tsx
let source = {
    name: 'aka',
}

let target: typeof source = {
    name: 'bkb',
}
```



## `keyof`

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

type o = keyof test // number
```

``` ts
interface test {
    [s: string]: string; // 字符串索引类型
}

type o = keyof test // string | number
```





## Union Type

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



## Intersection Type

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

## Indexed Access Types

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









## Conditional Types

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



### [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types)

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



:::note

需要注意的是，对于以下代码的结果是`boolean`，猜测内部实现中`boolean`只是`true`和`false`的联合类型，所以这里也触发了类型分发。

``` typescript
type Test<U> = U extends true ? true : false;
type Result = Test<boolean> // boolean
```

事实上我们手动声明`true | false`，编译器上看到的就是单纯的`boolean`，这也印证了我们的观点



:::








## 映射类型（Mapped Types）

``` tsx
type A = {
    name: string;
    age: number
}

type B = {
    [p in keyof A]+?: string
}

type C = {
    [p in keyof A]+?: A[p]
} & {
  id: number
}
```

需要注意的是`[K in P]`中的`P`只能是`string | number | symbol`的子类型，如以下代码就会报错

``` typescript
type P = 'age' | boolean;
type A = {
  [K in P]: K
}
// Type 'string | boolean' is not assignable to type 'string | number | symbol'.
// Type 'boolean' is not assignable to type 'string | number | symbol'.
```





## 修饰符

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

