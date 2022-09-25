# Rust

> 刚开始学

[参考：Rust Book](https://doc.rust-lang.org/book/title-page.html)



## 安装

### rustup（rust版本管理）

`rustup`是管理`rust`版本的工具，通过以下命令即可安装最新的`rust`编译器`rustc`及其包管理工具`cargo`

``` shell
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
rustup update
```



### rustc（编译器）

``` sh
rustc --version 

rustc main.rs
./main
```



### cargo（包管理）

> 功能类似NPM，包括项目的初始化、模块的安装与管理、便捷的脚本命令

``` sh
cargo --version 

cargo new projectName # 初始化项目
cargo build # 构建/编译
cargo run # 编译后立刻运行
cargo check # 编译并进行代码检查，但不生成产物
```

### Cargo.toml（配置文件）

项目配置文件，类似`package.json`

``` toml
[package]
name = "guessing_game"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html
[dependencies]
```



## 基础

### 常量

通过`const`定义常量值或常量表达式，但不能为运行时的求值结果

``` rust
const HP: u32 = 100;
const PI: f32 = 3.14;
const N: u32 = 1 + 1;
```

``` rust
// error[E0015]: cannot call non-const fn `test` in constants
const hp: u32 = test();

fn test() -> u32 {
    return 200
}
```



### 变量

通过`let`声明变量。默认情况声明不可变（immutable）的变量，通过`let mut`声明可变（mutable）变量。

``` rust
let mut mp: u32 = 100;
mp = 200; // ok

let hp: u32 = 100;
hp = 200; // error
```

#### shadow

在同一个作用域下可以多次`let`同一个变量名，后一次将会`shadow`前一次的声明。举个JavaScript的例子为什么我们需要这样的功能：

``` javascript
function main() {
	  const { data } = test()
    const data2 = test2(data)
    return {
    	data: data2
    }
}

// 期望的写法
function main() {
   const { data } = test()
    const data = test2(data)
    return {
    	data // 更简洁
    }
}
```

``` rust
let hp: u32 = 100;
let hp: f32 = 100.12;
println!("{}", hp) // 100.12
```



### 基本数据类型

#### 标量类型（scalar）

- 整数
  - 符号整数，如`i32`、`i64`
  - 无符号整数，如`u32`、`u64`
- 浮点数
  - 如`f32`、`f64`
- 布尔值
  - `let value: bool = true;`
- 字符
  - `let c: char = 'a';`



#### 复合类型（compound）

标量类型只能包含一个值；而复合类型可以包含多个值。

##### 元组

每一项的类型可以不同，长度固定

``` rust
fn main() {
  let tup: (i32, f64, u8) = (500, 6.4, 1);
  let a = tup.0;
  let b = tup.1;
  let c = tup.2;
  let (x, y, z) = tup;
}

```



##### 数组

每一项的类型必须相同，长度同样固定（这一点和JavaScript不同）

``` rust
fn main() {
    let q = [1, 2, 3, 4, 5];
    let w: [i32; 5] = [1, 2, 3, 4, 5];
    let e = [3; 5]; // [3, 3, 3, 3, 3]
  	let x = q[0];
  	let y = q[1];
}
```



### 函数

``` rust
fn main() {
    let value = test();
}

fn test() -> i32 {
    return 200
}
```



### 语句和表达式

#### 语句（statement）

语句不包含求值操作，它是一个独立的单元。



#### 表达式（expression）

表达式求值的结果将返回给上层的AST节点去使用。对于`x + 1`，如果我们给它加上分号，它会被视为独立的语句；如果我们不给他加上分号，它就会被视为表达式。

除了常见的各种表达式（如`1 + 1`、函数调用等），在Rust中`if`、`loop`、`match`（类似`switch`）也是表达式，甚至块级作用域也是表达式。

``` rust
let value = {
    let x = 1;
    x + 1
};
println!("{:?}", value) // 2
```

``` rust
let value = {};
println!("{:?}", value) // ()
```

### 控制流

#### if expression

Rust不会自动把目标值转化为对应的布尔值

``` rust
if 2 > 1 { // 没有小括号

} else if 3 > 2 {

} else {

}
```

``` rust
let condition = true;
let number = if condition { 5 } else { 6 };

println!("The value of number is: {number}");
```



#### loop expression

通过`loop`关键字循环执行某些操作，通过`break`退出当前循环，同时`break`的值会作为`loop`表达式的求值结果进行返回。

``` rust
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };

    println!("The result is {result}"); // 20
}
```

##### loop label

通过给`loop`一个指定的名称，在多个`loop`表达式嵌套的情况下，我们可以`break`某个具名的`loop`

``` rust
fn main() {
  'test: loop {
    loop {
      break 'test;
    }
  }
}
```



#### while

``` rust
fn main() {
  while true {
    // do somethign
  }
}
```



#### for...in

与JavaScript中用来迭代对象的key值集合不同，Rust中`for...in`直接用来迭代集合

``` rust
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {element}");
    }
}

```

``` rust
fn main() {
    for number in (1..4).rev() { // (1..4)为Range，左闭右开区间
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}
```



### 所有权（Ownership）

> - Each value in Rust has an *owner*.
> - There can only be one owner at a time.
> - When the owner goes out of scope, the value will be dropped.

Rust中有一个独特的概念叫做**所有权**。对于像C、C++这类的传统语言，我们需要在运行时手动进行内存的分配与释放，这会增大我们的心智负担；因此更多的语言（如Go、Java、JavaScript），都是通过垃圾收集（GC）实现对无用的内存进行自动的回收，一种常见的做法是“引用计数”，我们会收集内存被引用的情况，当一块内存不再被任何指针指向，我们就会自动释放这块内存空间。GC可以降低我们的心智负担，但同时也会降低运行效率。而Rust引入的所有权概念，就是专门用来管理内存回收的。

对于一块内存，可能存在多个变量同时指向，因此我们很难知道什么时候才去释放这块内存。而所有权表示着这块内存只能被一个变量所有，此时其他的变量都无法访问这块内存，因此当该变量离开作用域的时候我们可以无负担的释放掉这块内存。

``` rust
fn test() {
  let A = String::from("hello");
	let B = A;

	A.as_bytes(); // error
}

test();
```

对于上方代码，我们通过`String::from("hello")`分配了一块堆内存，变量A的指针指向着这块堆内存，此时变量A拥有这块堆内存的所有权。当我们执行`let B = A`的时候，会把变量A的指针赋值给变量B，那么此时变量A和变量B都指向着这块堆内存，但这块内存的所有权也同时从变量A转移到变量B身上了，因此虽然变量A的指针是指向着这块堆内存的，但它已经无权访问这块堆内存了，具体的表现是我们不再能调用`A.as_bytes()`这种方法了。而当函数调用完成后，变量A就离开作用域了，此时我们会自动释放变量A所指向的堆内存。





#### 所有权转移（move）

``` rust
fn main() {
    let A = String::from("hello");

    let B = test(A);
  	B.as_bytes();
}

fn test(C: String) -> String {
    println!("{:?}", C.as_bytes());
    C
}
```

所有权的转移不仅发生在赋值操作中，函数的传参、返回值，都会发生所有权的转移。

对于以上代码，`main`函数中变量A指向着一块堆内存，调用`test`函数的时候所有权从变量A转移到函数内部的参数C身上，为了能在后续继续使用这块内存我们又需要从`test`函数从把C返回出来，从而实现把所有权从参数C转移到变量B身上。

可以看出虽然所有权很大程度解决了内存释放的问题，但使用起来却很麻烦，Rust引入了**引用**的概念来处理这样的问题。





#### 引用（borrow）

``` rust
let A: String = String::from("hello");
let B: &String = &A;
```

在这个例子中，我们通过`&A`创建了一个引用B，B通过地址指向A，而A又通过指针指向堆内存。A拥有这块堆内存的所有权，而B则通过A来间接读/写这块内存，因此也被称为借用`borrow`。

Rust中指针和引用的区别在于，指针通常除了地址`ptr`外，还会保存`len`和`capacity`，即指针是拥有所指向内存的所有权的；而一般引用只会保存地址`ptr`，一种特别的引用`Slice`除了保存地址外还会保存`len`，但无论如何引用都不会保存`capacity`，因此不拥有任何的所有权。





#### 生命周期

引用的生命周期，指的是从该引用被创建（或者叫`borrow`）到最后一次用到的这段区间。

通过引入所有权和引用的概念，Rust中实际上会存在多个地址指向同一块内存，只不过只有一个地址（即指针）拥有这块内存的所有权，当该指针离开作用域时会自动释放对应的内存。所以在编译时Rust编译器会通过Borrow Checker来对所有引用的生命周期进行检查，Borrow Checker有几条规则，其中一条最显而易见的就是引用的生命周期应该在对应指针的生命周期范围内。



比如以下例子中，我们创建了指针`s`，同时创建了一个`s`的引用赋值给`r`，当块级作用域结束时`s`变量释放，我们不能再通过`r`去获取该内存，这类问题会在编译时就提前暴露出来。

``` rust
fn main() {
    let r;
    {
        let s = String::from("hello");
        r = &s; // 报错
    }
    r.as_bytes();
}
```



#### Generic Lifetimes Parameter

Rust中的泛型除了常见的类型参数（`type parameter`，如`T`）还支持一个特殊的参数，叫做生命周期参数（`lifetimes parameter`，如`'a`）。类型参数`T`用来实现多个参数和返回值的类型的显式关联，对应的生命周期参数`'a`用来实现多个参数和返回值的生命周期的显式关联。

我们之前提到过在编译时Rust需要通过Borrow Checker来检查所有引用的生命周期是否都是有效的，以下方的代码举例，函数`longest`接收两个引用作为参数，并会将其中的一个引用作为函数返回值。在使用该函数的时候，我们无法确定确定`longest`返回值的生命周期，因此无法通过Borrow Checker的检查。为了解决这个问题，在定义`longest`函数的时候我们需要通过`lifetimes parameter`显式的建立参数和返回值的生命周期的联系。

``` rust
fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {}", result);
}

fn longest(x: &str, y: &str) -> &str { // 报错
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

``` rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { // 正确
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```





#### Static Lifetimes

``` rust
let s: &str = "hello world"
```

所有的字符串字面量都是直接存储在程序的二进制当中，在整个程序的任何时候都是可用的，因此它们的引用的生命周期被用`'static`标识，表示这个引用可以在整个程序的周期中存在。











### 结构体（Struct）

#### impl

通过`impl`关键字实现结构体的方法（类似原型方法），第一个参数不是实例`self`的方法被称作关联函数`associted function`（类似静态方法）

``` rust
struct People {
    name: String,
    age: u32,
    male: bool,
}

impl People {
    fn is_male(&self) -> bool {
        self.male
    }

    fn is_young(&self) -> bool {
        self.age < 20
    }

    fn new(name: String, age: u32, male: bool) -> People {
        People {
            name,
            age,
            male,
        }
    }
}

fn main() {
   let p = People::new(String::from("akara"), 20, true);

   let is_male = p.is_male();
   let is_young = p.is_young();

   println!("{}, {}, {}", p.name, is_male, is_young);
}
```

#### struct update syntax

类似扩展运算符`spread syntax`，Rust通过`..`来根据一个结构体生成一个新的结构体

``` rust
let p3 = People {
    age: 30,
    ..p2 // 两个点
};
println!("{}, {}", p1.is_male(), p3.age)
```

#### tuple struct

``` rust
struct Point(i32, i32, i32);

let p = Point(1, 1, 0);
let People(x, y, z) = p;
let a = p.0;
```

#### unit-like struct

``` rust
struct Point;

let p = Point;
```







### Enum

在Rust中使用`enum`定义枚举，其实等价于定义了一组类型相同的`struct`。如下方我们通过`enum Days`定义了四个枚举的变体`variants`，这四个变体其实分别是`unit-like struct`、`tuple struct`以及普通的`struct`，它们的类型都用`Days`表示。



``` rust
enum Days {
    One,
    Two(u32),
    Three(bool, bool),
  	Four {
        x: i32,
        y: i32,
  	}
}

fn main() {
    let num = test(Days::Two(20));
    println!("{}", num);
}


fn test(e: Days) -> u32 {
    match e {
        Days::One => (),
        Days::Two(num) => {
            num
        },
      	Days::Three(a, b) => (),
      	Days::Four { x, y } => (),
        _ => (),
    }
}
```



#### `Option<T>`

Rust中不存在空值的概念，一般通过内置的`Option<T>`模拟可能为空值的情况

``` rust
enum Option<T> {
    None,
    Some(T),
}
```

``` rust
fn main() {
    let a = test(Option::Some(20));
    println!("{}", a)
}

fn test(o: Option<u32>) -> u32 {
    match o {
        None => 0,
        Some(value) => {
            value
        }
    }
}
```

#### match expression

Rust中的`match`表达式类似一般的`switch`但功能更加强大，因为它支持模式匹配`pattern match `，模式可以是字面量的值、变量名、`wildcards`、以及其他的东西。

`match`经常被用来对枚举进行模式匹配，并能够获取到对应的枚举内部值。



#### If let

Rust还提供了`match`的语法糖，`if let`可以让我们快速匹配某个模式并提取值

``` rust

fn main() {
    let a = test(Option::Some(20));
    let b = test(Option::None);
    println!("{}, {}", a, b)
}


fn test(o: Option<u32>) -> u32 {
    if let Some(value) = o { // 单等号
        value
    } else {
        0
    }
}
```





### 模式匹配（pattern match）

模式（`pattern`）通常由以下内容组成：

- 字面量，如`1`
- 变量，如`x`
- 解构数组、元祖、结构体、枚举，如`[x, y, z]`、`(a, b, c)`、`Point { x, y }`、`Some(x)`
- 通配符与占位符，如`_`或以`_`开头的变量



模式主要在以下地方使用：

- match

  ``` rust
  match VALUE {
      PATTERN => EXPRESSION,
      PATTERN => EXPRESSION,
      PATTERN => EXPRESSION,
  }
  ```

- if let

  ``` rust
  if let Some(x) = y {
    
  } else if xx {
    
  } else if let Some(z) = w {
    
  } else {
    
  }
  ```

- while let

  ``` rust
  while let Some(x) = y {
    
  }
  ```

- for...in

  ``` rust
  let vector = vec![Point { x: 100, y: 200}, Point { x: 200, y: 400}];
  for &Point { x, y } in vector.iter() {
      println!("{}, {}", x, y);
  }
  ```

- let

  事实上`let`语句中的变量名也是表达式

  ``` rust
  let x = 5; // let PATTERN = EXPRESSION;
  ```

- 函数参数

  ``` rust
  fn print_coordinates(&(x, y): &(i32, i32)) {
      println!("Current location: ({}, {})", x, y);
  }
  
  fn main() {
      let point = (3, 5);
      print_coordinates(&point);
  }
  ```





#### `refutable`、`irrefutable`

模式的两种形式，`refutable`和`irrefutable`

- `irrefutable`，指的是能够匹配任何可能的值，如`let x = 1`中的模式`x`，或者结构体，又或者只有一个变体的枚举
- `refutable`，值得是可能存在无法匹配的情况，如`if let Some(x) = y`中的模式`Some(x)`，当`y`为`None`时匹配失败

函数参数、`let`语句、`for`循环只接收`irrefutable`模式，即我们不能使用类似这样的语法`let Some(x) = 100`；而`if let`、`while let`接收任何模式，只是在接收`irrefutable`的模式时会进行警告，因为一般不推荐这么做，如`if let x = 100`。





#### Multiple patterns

``` rust
let x = 1;

match x {
    1 | 2 => println!("one or two"),
    3 => println!("three"),
    _ => println!("anything"),
}
```



#### 匹配范围`..=`

``` rust
let x = 5;

match x {
    1..=5 => println!("one through five"),
    _ => println!("something else"),
}
```

``` rust
let x = 'c';

match x {
    'a'..='j' => println!("early ASCII letter"),
    'k'..='z' => println!("late ASCII letter"),
    _ => println!("something else"),
}
```



#### 解构赋值

##### 解构Struct

``` rust
let p = Point { x: 0, y: 7 };

let Point { x: a, y: b } = p;
```

##### 解构枚举

通常来说枚举存在多个变体`variants`，这些变体的类型都是相同的。对于只有一种变体的枚举会被视为`irrefutable`，可以通过`let`直接解构赋值，而存在多个变体的枚举通常都需要使用`match`来匹配每一种变体

``` rust
enum Akara {
    P2 { x: u32, y: u32},
}

let aka = Akara::P2 { x: 100, y: 200 };
let Akara::P2 { x, y } = aka; // success
```

``` rust
enum Akara {
    P1,
    P2 { x: u32, y: u32},
}

let aka = Akara::P2 { x: 100, y: 200 };
let Akara::P2 { x, y } = aka; // error

match aka {
    Akara::P1 => (),
    Akara::P2 { x, y } => (),
    _ => () 
}
```

##### 解构元组

``` rust
let ((feet, inches), Point { x, y }) = ((3, 10), Point { x: 3, y: -10 });
```



#### 省略变量

通过`_`或者以`_`开头的变量来省略变量，`_`和`_x`的区别在于`_x`仍然会绑定具体的值只不过编译器并不会报错，而`_`并不会绑定任何的值。

``` rust
struct Point {
    x: i32,
    y: i32,
    z: i32,
}

let origin = Point { x: 0, y: 0, z: 0 };

match origin {
    Point { x, .. } => println!("x is {}", x),
}
```

#### Match Guard

在`match`表达式中，对于一些模式难以表达的复杂逻辑我们可以使用`match guard`来辅助加强模式的功能，所谓`match guard`指的是`match`分支中模式后面的`if`条件

``` rust
let num = Some(4);

match num {
    Some(x) if x % 2 == 0 => println!("The number {} is even", x),
    Some(x) => println!("The number {} is odd", x),
    None => (),
}
```



#### @bindings

``` rust
enum Akara {
    P1,
    P2 { x: u32, y: u32},
}

let aka = Akara::P2 { x: 100, y: 200 };
match aka {
   Akara::P1 => (),
   Akara::P2 { x: 1..=200, y} => println!("{}, {}", x, y), // error. cannot find value `x` in this scope
   _ => () 
}
```

对于上述情况，我们需要使用`@`进行显式的绑定

``` rust
match aka {
   Akara::P1 => (),
   Akara::P2 { x: xx @ 1..=200, y} => println!("{}, {}", xx, y),
   _ => () 
}
```





### 集合类型

Rust提供了一些常用的内置集合类型，如`Vec`、`String`、`HashMap`、`Range`，这些类型都是通过`struct`实现的

#### Vec

`Vec`是长度可变，参数类型相同的集合。也可以通过`Vec`存枚举，来间接实现长度可变，类型不同的集合

``` rust
fn main() {
  let mut value: Vec<i32> = Vec::new();
  value.push(1);
  value.push(2);

  let mut value2 = vec![1, 2, 3]; // macro

  let a: &mut i32 = &mut value2[0];
  *a = 4;
  println!("{}", a);

  let b: Option<&i32> = value2.get(1);
  if let Some(x) = b {
      println!("{}", x);
  }



  for i in &mut value2 {
      *i = 20;
      println!("{}", i);
  }

  // ---


  fn largest(list: &[i32]) -> i32 {
      let mut largest = list[0];

      for &item in list { // 18章,模式匹配
          if item > largest {
              largest = item;
          }
      }

      largest
  }
}
```



#### String

需要注意的是`String`并不支持直接通过索引进行取值

``` rust
fn main() {
  let mut s = String::from("hello");
  s.push_str(" world");
  s.push('!'); // char是单引号
  println!("{}", s); 
}

```



#### HashMap

虽然都在标准库当中，但是由于不像`Vec`、`String`使用的那么频繁，因此`HashMap`并没有被`preclude`，所以使用的时候需要通过`use`手动引入

``` rust
use std::collections::HashMap;

fn main() {
  let mut scores = HashMap::new();
  scores.insert(String::from("Blue"), 10);
  scores.insert(String::from("Yellow"), 50);

  for (key, value) in &scores {
      println!("{}: {}", key, value);
  }
}

```



#### Range

``` rust
use core::ops::Range;

let v: Vec<i32> = (1..4).into_iter().map( |x| x * x).collect();
```



### 错误处理

Rust把错误分为两种类型，可恢复错误和不可恢复错误。

可恢复错误，比如说读取一个文件，如果文件不存在时我们应该让外部能够感知到；不可恢复错误，比如越界访问数组，一旦出现了这种不安全的内存访问BUG我们可能会直接通过`panic!`来退出进程。



#### panic

`panic`也存在两种行为，默认的`unwind`和`abort`。其中`unwind`意味着退出程序的时候Rust会自动展开堆栈并清空数据，但这会有一些工作量。而一旦采用`abort`，那么程序中使用的内存就不会被自动回收，我们需要通过操作系统来手动进行清除。一般通过修改配置文件来调整该行为。

``` toml
# cargo.toml
[profile.release]
panic = 'abort'
```



#### Result

``` rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

在枚举一节中，我们了解到可以使用`Option<T>`来包装表明某个值可能为空。类似的道理，我们通过`Result<T, E>`来作为函数的返回值，来表明这个函数可能会存在异常情况。

``` rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => panic!("Problem opening the file: {:?}", error),
    };
}
```

一般通过`match`来匹配枚举的不同可能值，但这有些冗余，因此`Result`实现了一些方便的方法



##### unwrap

`unwrap`方法能够在`Result`为`Ok`的时候返回内部值，为`Err`的时候`panic`。

``` rust
fn main() {
    let f = File::open("hello.txt").unwrap();
}
```



##### expect

与`unwrap`功能一致，区分在于我们可以指定报错时显示给用户的信息

``` rust
fn main() {
    let f = File::open("hello.txt").expect("错误信息");
}
```



##### propagating errors

当一个函数的实现调用了可能报错的其他函数时，我们可以手动对错误进行处理，但也可以直接把错误抛出去，这被称为`propagating errors`，`Result`提供了`?`操作符来快速实现。

对于以下代码，当`Result`为`Ok`时会返回内部值，为`Err`的时候会直接把`Err`作为`test`函数的返回值返回出去。

``` rust
fn test() {
    let f = File::open("hello.txt")?;
}
```



##### unwrap_or_else

之前提到的`unwrap`和`expect`都会在`Err`的时候直接`panic`，这可能不是我们想要的结果，这时候我们需要使用`unwrap_or_else`并传递一个闭包作为参数



``` rust
fn main() {
    let f = File::open("hello.txt").unwrap_or_else(|error| {
      // do something
  	})
}
```



### 泛型

#### 单态化

Rust提供了强大的类型系统，但是使用泛型并不会给运行时带来任何额外的开销，即并不会降低运行时的效率，这依赖于Rust在编译时对所有泛型类型进行**单态化（*monomorphization*）**。

``` rust
fn main() {
		let integer = Some(5);
		let float = Some(5.0);
}
```

即对于以上代码，会被编译成以下代码，这也被称为**静态分发（*static dispatch*）**

``` rust
enum Option_i32 {
    Some(i32),
    None,
}

enum Option_f64 {
    Some(f64),
    None,
}

fn main() {
    let integer = Option_i32::Some(5);
    let float = Option_f64::Some(5.0);
}
```

单态化最大的好处是零运行时开销，但也存在着对应的缺点：

1. 产物体积增大
2. 编译时间变长





### Trait

Rust中的*trait*类似于通常的*interface*，有以下几个比较明显的区别

- *trait*可以提供方法的默认实现
- 在使用实现了某个*trait*的结构体时，我们需要通过*use*把该*trait*引入

``` rust
struct People {
    name: String,
}

trait Test {
    fn run(&self) { // 可以提供默认实现
        println!("run") 
    } 
    fn get_name(&self) -> &str;
}

impl Test for People {
    fn get_name(&self) -> &str {
        &self.name
    }
}

fn main() {
    let p = People {
        name: String::from("akara"),
    };
    p.run();
    println!("{}", p.get_name());
}
```



#### Trait Bound

*trait bound*类似于泛型约束，如以下代码中要求类型参数T必须实现了*Summary*这个*trait*

``` rust
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}

// 语法糖
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

当类似参数需要满足多个特征时，使用`+`进行关联，类似*TS*中的`&`

``` rust
pub fn notify<T: Summary + Display>(item: &T);
  
pub fn notify(item: &(impl Summary + Display));
```

当trait bound太长时，我们可以使用Where子句来优化写法

``` rust
// before
fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {}
  
// after
fn some_function<T, U>(t: &T, u: &U) -> i32
    where T: Display + Clone,
          U: Clone + Debug
{}
```



#### Trait Object

泛型的功能很强大，但却难以表达异构（*heterogeneous*）集合，如以下代码中虽然我们使用*Trait Bound*对类型参数*T*进行了约束，但最终Vec集合的每一项类型都是相同的。

``` rust
pub trait Draw {
    fn draw(&self);
}

pub struct Screen<T: Draw> {
    pub components: Vec<T>,
}
```

通过使用*Trait Object*可以解决上述问题，这里的`Box<dyn Draw>`就是Trait Object，一个泛型类型参数只能被一个具体的类型替换，而Trait Object允许在运行时被多个具体的类型替换。

``` rust
pub trait Draw {
    fn draw(&self);
}

pub struct Screen {
    pub components: Vec<Box<dyn Draw>>,
}
```

> Recall in the [“Performance of Code Using Generics”](https://doc.rust-lang.org/book/ch10-01-syntax.html#performance-of-code-using-generics) section in Chapter 10 our discussion on the monomorphization process performed by the compiler when we use trait bounds on generics: the compiler generates nongeneric implementations of functions and methods for each concrete type that we use in place of a generic type parameter. The code that results from monomorphization is doing *static dispatch*, which is when the compiler knows what method you’re calling at compile time. This is opposed to *dynamic dispatch*, which is when the compiler can’t tell at compile time which method you’re calling. In dynamic dispatch cases, the compiler emits code that at runtime will figure out which method to call.





### 闭包

在*JavaScript*中，声明函数的时候我们会在该函数的`[[scope]]`属性中记录该函数的作用域链（执行上下文的变量对象VO组成的数组），在调用该函数的时候创建新的函数执行上下文，该函数执行上下文中包括函数自身的变量对象以及作用域链，执行时如果在当前作用域找不到某个变量，则会沿着作用域链向上查找。

对于这种，在声明函数时捕获函数作用域的行为通常也被称作闭包。

与*JavaScript*不同，*Rust*中的函数不会捕获当前的作用域，也就意味着以下的代码是无效的

``` rust
fn main() {
    let s = "hello";
    fn test() {
        println!("{}", s) // 错误
    }

    test();
}
```

为了解决这样的问题，Rust也引入了闭包函数，闭包可以捕获当前作用域，通常是作为匿名函数保存在变量中、或者直接作为函数的参数使用。

``` rust
fn main() {
    let s = "hello";
    let f = |name: &str| {
        println!("{}, {}", s, name)
    };
    f("world");
}
```

``` rust
let f = File::open("hello.txt").unwrap_or_else(|error| {
		// do something
})
```







### 迭代器（iteration）

常见的集合类型，如*Vector*部署的`.iter()`、`.into_iter()`等方法将会返回迭代器对象，迭代器都实现了*Iterator*这个*trait*，即可以通过不断调用`next`方法访问集合中的元素。

- `.iter()`

- `.iter_mut()`
- `.into_iter()`





#### *consuming adaptors*

在内部调用`next`方法的方法也被称为*consuming adaptor*，如`sum`方法

``` rust
fn main() {
    let v = vec![1, 2, 3];
    let sum: u32 = v.iter().sum();
    println!("{}", sum);
}
```





#### *Iterator adaptors*

返回一个新的迭代器的方法也被称为*iterator adaptor*，如`map`方法

``` rust
fn main() {
    let v = vec![1, 2, 3];
    let sum: u32 = v.iter().map(|x| 2 * x).sum();
    println!("{}", sum);
}
```

https://stackoverflow.com/questions/65766866/why-the-closure-passed-to-map-does-not-take-a-reference-while-the-one-passed-t 







### 智能指针

智能指针，通常指的是具备更强大能力的指针。智能指针通常由结构体实现，同时实现了`Deref`和`Drop`这两个*Trait*，我们之前使用到的String和Vector就是典型的智能指针，下文介绍标准库中比如重要的几个智能指针。



#### *Deref*

通过实现*Deref Trait*将允许我们自定义对结构体的解引用操作符`*`行为，使得其表现的和引用一样（引用可以直接进行解引用操作）

``` rust
fn main() {
    let x = 5;
    let y = &x;

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```

``` rust
use std::ops::Deref;

impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
```

`*y`实际上等价于`*(y.deref())`







#### *Drop*

通过实现*Drop Trait*将允许我们自定义变量离开作用域时的行为，主要用来释放文件资源或者网络连接。

``` rust
struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping CustomSmartPointer with data `{}`!", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer {
        data: String::from("my stuff"),
    };
    let d = CustomSmartPointer {
        data: String::from("other stuff"),
    };
    println!("CustomSmartPointers created.");
}
```





#### `Box<T>`

用来在堆内存分配值。

#### `Rc<T>`

引用计数智能指针，多个指针拥有同一块内存的所有权，只有当所有指针都离开作用域时才释放这块内存。

#### `RefCell<T>`





### 多线程编程

``` rust
use std::thread;
use std::time::Duration;

fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}
```

通过`thread::spawn`创建新的子线程，当主线程结束时会自动结束所有子线程。

#### Join Handles

`thread::spawn`返回值的类型为`JoinHandle`，当我们调用它的`join`方法时，会等待该线程结束，并可以通过`unwrap`方法获取该线程的返回值。

``` rust
fn main() {
    let handle: JoinHandle<u32> = thread::spawn(|| {
        thread::sleep(Duration::from_secs(1));
        println!("一秒后");
        100 + 200
    });
    
    let value = handle.join().unwrap();

    println!("{}", value); // 300
}
```

#### move 闭包

核心问题在于：Rust不知道子线程将运行多久，因此难以对闭包中捕获的引用进行静态分析（Borrow Check）

``` rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(|| { // error
        println!("Here's a vector: {:?}", v);
    });

    handle.join().unwrap();
}
```

解决办法：在创建线程时传入的闭包中显式指定`move`来转移所有权，而不是让Rust去隐式推导。

``` rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(move || {
        println!("Here's a vector: {:?}", v);
    });

    handle.join().unwrap();
}
```



#### 线程间通信

通过使用*channel*实现线程间的通信，下方的`tx`和`rx`分别表示着`transmitter`和`receiver`

``` rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}
```







### 模块化

``` rust
// src/main.rs
mod aaa {
    pub fn test() {
        println!("aaa")
    }
}
mod bbb;

fn main() {
    aaa::test();
    bbb::test();
    bbb::ccc::test();
}

// src/bbb.rs
pub fn test() {
    println!("bbb")
}

pub mod ccc;

// src/bbb/ccc.rs
pub fn test() {
    println!("ccc")
}
```



#### use

path太长,use来提供快捷方式

``` rust
mod bbb;

use bbb::ccc::test;

fn main() {
    test(); // bbb::ccc::test()
}
```



#### pub 

默认只能取sibling和parent的内容,需要把模块内部的东西变成pub才能取



##### struct

结构体自身的private和pub、字段的private和pub(默认private)

枚举enum的字段默认pub





## 高级特性

### Unsafe Rust



### Advanced Traits

#### 

### Advanced Type





### Advanced Function 











### 宏（Macro）

宏是一种元编程，通过在编译时对指定的源代码进行替换（即宏展开）可实现各种进阶的能力。Rust中的宏分为**声明宏**（*declarative macros*）和以下三种**过程宏**（ *procedural macros*）

- 派生宏（*Custom `#[derive]` macros*）
- 属性宏（*Attribute-like macros*）
- 函数式宏（*Function-like macros*）

声明宏和过程宏中的函数式宏在功能上十分贴近，使用上也都和普通函数非常相似，二者区别在于声明宏主要是做字符串层面上的匹配与替换，而过程宏是基于Token流乃至语法树层面上的操作。另外相较于普通函数的功能来说，宏最大的特别是在编译时进行展开，具备更强大的表达能力。

#### 声明宏

###### 定义

``` rust
#[macro_export]
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}
```

###### 使用

``` rust
let v: Vec<u32> = vec![1, 2, 3];
```



#### 过程宏

##### 派生宏

派生宏主要被结构体或枚举类型进行消费，最常见的做法是给结构体提供某个Trait的默认实现。

###### 定义

``` rust
use proc_macro::TokenStream;
use quote::quote;
use syn;

#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    // Construct a representation of Rust code as a syntax tree
    // that we can manipulate
    let ast = syn::parse(input).unwrap();

    // Build the trait implementation
    impl_hello_macro(&ast)
}

fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
    let name = &ast.ident;
    let gen = quote! {
        impl HelloMacro for #name {
            fn hello_macro() {
                println!("Hello, Macro! My name is {}!", stringify!(#name));
            }
        }
    };
    gen.into()
}
```

###### 使用

``` rust
use hello_macro::HelloMacro;
use hello_macro_derive::HelloMacro;

#[derive(HelloMacro)]
struct Pancakes;

fn main() {
    Pancakes::hello_macro();
}
```





##### 属性宏

属性宏不仅可以被用来替换结构体和枚举，还能替换函数等源代码的内容，并且使用属性宏的时候可以接收更多额外的参数。

###### 定义

``` rust
#[proc_macro_attribute]
pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {
}
```



###### 使用

``` rust
#[route(GET, "/")]
fn index() {
}
```





##### 函数式宏

函数式宏在使用上类似于直接调用函数。

###### 定义

``` rust
#[proc_macro]
pub fn sql(input: TokenStream) -> TokenStream {
}
```



###### 使用

``` rust
let sql = sql!(SELECT * FROM posts WHERE id=1);
```











## WebAssembly

### wasm-pack



## 其他

### r#...#

用来表示原始字符串，不用再手动转义

``` rust
let html = r#"
    <!DOCTYPE html>
    <meta charset="utf-8">
    <title>Hello, world!</title>
    <h1 class="foo">Hello, <i>world!</i></h1>
"#;
```















### 发布二进制

1. `cargo login`
2. `cargo publish`
3. `cargo install <name>`

通过`cargo publish`将源代码推送到crates.io，其他人cargo install的时候会拉下代码并自动通过cargo build --release生成二进制产物





## 内置模块

### std::fs

