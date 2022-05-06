# 逆变与协变

## 子类型

在`TypeScript`中，如果`A`类型的值可以赋值给`B`类型的值，那么我们把`A`类型称为`B`类型的子类型，记作`A extends B`。

机智的小伙伴能够很快发现`extends`主要被用在范型约束和条件类型当中，范型约束中`extends`把类型参数`T`的类型限制为给定类型的子类型，条件类型中`A extends B ? C : D`表示当`A`是`B`的子类型是返回`true`分支的类型。



### 例子一：🌰

字面量类型是其对应类型的子类型。如`'name' extends string`、`100 extends number`

``` typescript
declare let a: 'name';
declare let b: string;

b = a; // ok a是b的子类型
a = b; // wrong 
```

### 例子二：🌰

``` typescript
type A = {
	name: string;
  	age: number;
}
type B = A & {
    id: number
}

declare let a: A;
declare let b: B; 
```

对于上方的`A`和`B`类型，我们需要先判定二者的值能否相互赋值，才能知道谁是谁的子类型。

首先我们尝试把`a`赋值给`b`，之后再调用`b.id.toFixed()`，很明显能看出在运行时会报错，因为`a`并不存在`id`字段。所以`a`不是`b`的子类型。

``` typescript
b = a // wrong
b.id.toFixed() // 不存在id字段
```

接下来我们尝试把`b`赋值给`a`，之后再调用`a`上的方法，由于`a`的方法在`b`都存在，因此这是类型安全的。`a`是`b`的子类型，记作`a extends b`

``` typescript
a = b; // ok
a.name.toString() 
```

:::info

我们平时也可以根据这个思路来判断两个值是否可以相互赋值，进而判断对应类型之间的关系。

:::

### 例子三：🌰

对于联合类型来说，`string extends string | number`，其他情况类似。

``` typescript
declare let a: string | number;
declare let b: string;

a = b; // ok
b = a; // wrong
```



## 协变（covariant）

先看例子。

### 例子四：🌰

``` typescript
type A = {
	name: string;
  	age: number;
}
type B = A & {
	id: number
}

declare let a: A;
declare let b: B; 

type Test<T> = {
    value: T;
}

declare let c: Test<A>
declare let d: Test<B>

d = c; // wrong
d.value.id.toFixed() // 不存在id字段

c = d; // ok
c.value.name.toString()
```

对于上方的代码我们已知`B`是`A`的子类型，现在有一个范型`Test<T>`，根据例子二中相同的判定思路我们能够判断出`d`可以赋值给`c`，即 `Test<B> `是`Test<A>`的子类型，记作`Test<B> extends Test<A> `。

`B`是`A`的子类型，而`Test<B>`又是`Test<A>`的子类型，所以我们称范型`Test<T>`的类型参数`T`在`value: T`这个位置是协变的。



### 例子五：🌰

``` typescript
type A = {
	name: string;
  	age: number;
}
type B = A & {
	id: number
}

declare let a: A;
declare let b: B; 

type Fn<T> = () => T
declare let c: Fn<A>
declare let d: Fn<B>

d = c; // wrong
d().id.toFixed() // 不存在id字段

c = d; // ok
c().name.toString()
```

同样的，在本例中有存在范型`Fn<T> = () => T`，我们用相同的判定思路判断出`Fn<B>`是`Fn<A>`的子类型。

`B`是`A`的子类型，而`Fn<B>`又是`Fn<A>`的子类型，所以我们称范型`Fn<T>`的类型参数`T`在函数返回值这个位置是协变的。





## 逆变（contravariant）

先说结论，范型的类型参数在函数的参数位置上的逆变的。

给定范型`Fn<T> = (arg: T) => void`，如果`B`是`A`的子类型，则`Fn<B>`是`Fn<A>`的父类型。

### 例子六：🌰

``` typescript
type A = {
	name: string;
  	age: number;
}
type B = A & {
	id: number
}

declare let a: A;
declare let b: B; 

type Fn<T> = (arg: T) => void;
let c: Fn<A> = (arg: A) => console.log(arg.name.toString())
let d: Fn<B> = (arg: B) => console.log(arg.id.toFixed())

c = d;
c(a) // wrong 运行时函数内部访问arg.id报错

d = c;
d(b) // ok 运行时函数内部访问arg.name和arg.age都是安全的
```



## 来点类型体操

> [参考](https://github.com/Microsoft/TypeScript/pull/21496)

### 例子七：🌰

``` typescript
type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;
type A = Foo<{ a: string, b: string }>;  // string
type B = Foo<{ a: string, b: number }>;  // string | number
```

对于上方的范型`Foo<T>`，观察可知类型参数`U`所在的两个位置都是协变的，并且`T`是`{ a: infer U, b: infer U}`的子类型。



因此对于`type A = Foo<{ a: string, b: string}>`来说，`string(a)`是`U`的子类型，`string(b)`是`U`的子类型，因此`U`的最小边界值被限定为`string`。

而对于`type B = Foo<{ a: string, b: number}>`来说，`string(a)`是`U`的子类型，`number(b)`是`U`的子类型，因此`U`的最小边界值被设定为`string`和`number`的合集，即`A | B`。

:::info

速记：同一个类型参数在协变位置上的多个候选将会推导成联合类型

:::



### 例子八：🌰

``` typescript
type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;
type A = Bar<{ a: (x: string) => void, b: (x: string) => void }>;  // string
type B = Bar<{ a: (x: string) => void, b: (x: number) => void }>;  // string & number
```

对于上方的范型`Bar<T>`，观察可知类型参数`U`所在的两个位置都是逆变的。



因此对于`type A `来说， `U`是`string(a)`的子类型，同时也是`string(b)`的子类型，因此`U`的最大边界被限定为`string`。

而对于`type A `来说， `U`是`string(a)`的子类型，同时也是`number(b)`的子类型，因此`U`的最大边界被限定`string`和`number`的交集，即`A & B`。

:::info

速记：同一个类型参数在逆变位置上的多个候选将会推导成交叉类型

:::



## 双向协变（Bivariant）

首先有一点我们需要格外注意，`TypeScript`中有两种方式声明对象的方法。

``` typescript
// Object method
interface One<T> {
	fn(arg: T): void;
}

// Property with function type
interface Two<T> {
	fn: (arg: T) => void
}
```

这两种写法几乎没有任何差别，除了一点。范型`Two<T>`的`T`在参数位置是逆变的，但`One<T>`的`T`在参数位置是双向协变的！

那么，什么是双向协变呢？简单来说，对于`B extends A`，那么这里的`One<B> extends One<A>`和`One<A> extends One<B>`是同时成立的。

可以看出双向协变相较于逆变来说是更加宽松也更加不安全，所以通常来说对象方法的定义我们应该采取第二种方式。



## 不变（Invariant）

简单来说，对于`B extends A`，`Test<A>`和`Test<B>`无法互相分配，即互不为子类型。





