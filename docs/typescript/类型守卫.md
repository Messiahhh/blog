# 类型守卫

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




