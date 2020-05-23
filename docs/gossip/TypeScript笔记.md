# TypeScript摘录

**声明!!!**：本文非原创，不用于任何商业用途，大部分上是复制粘贴自[TypeScript 入门教程](https://ts.xcatliu.com/)网站上的教程，纯粹是为了方便用于个人学习。（所谓傻瓜式学习/囫囵吐槽式学习，求不吐槽）

[toc]



TypeScript是一个JavaScript的超集，由微软开发，主要提供了**类型系统**和**对 ES6 的支持**

## 安装

``` shell
npm install -g typescript

tsc index.ts # 生成 index.js
```

通常可通过npm来安装TypeScript的编译器，TypeScript文件通常以ts或tsx结尾，在命令行中执行tsc命令即可根据ts文件生成对应的js文件。

## 基础语法

### 原始类型

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

与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量

``` ts
// 这样不会报错
let num: number = undefined;

// 会报错
let u: void;
let num: number = u;
```

### 任意值（any）

``` ts
let value : string = 'akara'
value = 20 // 报错，类型不能更改

let value : any = 'akara'
value = 20 // 不报错
```

在任意值上访问任何属性都是允许的，也允许调用任何方法。



变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。

``` ts
let value
// 等于
let value : any
```



### 类型推导

``` ts
// 报错！！！因为第一句会自动将value的类型推导为string
let value = 'abcd' 
value = 123456

// 等价于以下代码

let value : string = 'abcd'
value = 123456
```



### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

``` ts
let value : string | number
value = 'akara'
value = 12345
```

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**。

``` ts
// 报错！！！
function getLength(something: string | number): number {
 return something.length;
}
```



上例中，`length` 不是 `string` 和 `number` 的共有属性，所以会报错。

访问 `string` 和 `number` 的共有属性是没问题的

``` ts
function getString(something: string | number): string {
 return something.toString();
}
```



### 接口

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。



在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于[对类的一部分行为进行抽象]()以外，也常用于对「对象的形状（Shape）」进行描述。

``` ts
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

``` ts
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

##### 可选属性(?:)

有时我们希望不要完全匹配一个形状，那么可以用可选属性

``` ts
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

``` ts
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

``` ts
// 报错！！！
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

``` ts
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



##### 只读属性（readonly）

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性

``` ts
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



### 数组的类型

在 TypeScript 中，数组类型有多种定义方式，比较灵活。

##### 「类型 + 方括号」表示法

``` ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

数组的项中**不允许**出现其他的类型（JavaScript的数组中可以存在多种类型的值）



##### 数组泛型

我们也可以使用数组泛型（Array Generic） `Array` 来表示数组

``` ts
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```



### 函数的类型

##### 函数声明

``` ts
function sum(x: number, y: number): number {
    return x + y;
}
```

注意，**输入多余的（或者少于要求的）参数，是不被允许的**（又是一处比JS严谨的地方）



##### 函数表达式

``` ts
let mySum = function (x: number, y: number): number {
    return x + y;
};
```

这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：



``` ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

吐槽：太繁琐了吧。

在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。



##### 可选参数(?:)

与接口中的可选属性类似，我们用 `?` 表示可选的参数：

``` ts
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



### 类型断言



##### 将一个联合类型断言为其中一个类型

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型中共有的属性或方法**

``` ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function getName(animal: Cat | Fish) {
    return animal.name;
    // 无法获取animal.run或者animal.swim
}

```

而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，此时可以使用类型断言。

``` ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
```







## 进阶语法

### 类型别名（type）

``` ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```



### 字符串字面量类型

``` ts
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick');
```





### 元组(tuple)

TypeScript的数组和JavaScript的数组不同，只能包括一种类型的对象。而TypeScript加入的元组（有其他语言那味了...）则可以包括不同类型的对象。

``` ts
let tom: [string, number] = ['Tom', 25];
```



有一点值得注意，对于元组我们可以

``` ts
tom[0] = 'jack'
// 也可以
tom = ['jack', 20]
```

而不能只赋值一项

``` ts
tom = ['jack']
```





### 枚举(enum)

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

``` ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
```

枚举成员会被赋值为从 `0` 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

``` ts
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

##### 手动赋值

``` ts
enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
```

上面的例子中，未手动赋值的枚举项会接着上一个枚举项递增。





### 类

#### ES7 中类的用法

ES7 中有一些关于类的提案，TypeScript 也实现了它们。

##### 实例属性

ES6 中实例的属性只能通过构造函数中的 `this.xxx` 来定义，ES7 提案中可以直接在类里面定义

``` ts
class Animal {
    name = 'Jack';

    constructor() {
        // ...
    }
}

let a = new Animal();
console.log(a.name); // Jack
```



##### 静态属性

ES7 提案中，可以使用 `static` 定义一个静态属性



#### TypeScript 中类的用法

##### public private 和 protected

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`。

- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的



（我是在学Java？）



##### 修饰符可以写在构造函数的参数中

``` ts
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

##### readonly

只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。

``` ts
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

``` ts
class Animal {
    // public readonly name;
    public constructor(public readonly name) {
        // this.name = name;
    }
}
```

#### 抽象类

`abstract` 用于定义抽象类和其中的抽象方法。

什么是抽象类？

首先，抽象类是不允许被实例化的；其次，抽象类中的抽象方法必须被子类实现。



下面是一个正确使用抽象类的例子

``` ts
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



##### 类的类型

``` ts
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayHi(): string {
      return `My name is ${this.name}`;
    }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```



### 类与接口

[之前学习过]()，接口（Interfaces）可以用于对「对象的形状（Shape）」进行描述。

这一章主要介绍接口的另一个用途，对类的一部分行为进行抽象。



实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 `implements` 关键字来实现。这个特性大大提高了面向对象的灵活性。



一个类可以实现多个接口

``` ts
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

``` ts
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```



### 代码草稿

> 用来打草稿

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