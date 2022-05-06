# 声明合并

## Merging Interfaces

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



## Merging Namespaces

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



## Merging Namespaces With Value

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












