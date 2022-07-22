# Rust

> 刚开始学

[Rust Book](https://doc.rust-lang.org/book/title-page.html)



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



### 数据类型

#### 标量类型（scalar）



- 整数
  - 符号整数，如`i32`、`i64`
  - 非符号整数，如`u32`、`u64`
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

每一项的类型可以不同，长度同样固定（这一点和JavaScript不同）

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

#### if表达式

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



#### loop

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

多个`loop`表达式嵌套的情况下，我们可以给`loop`一个`label`，`break`的之后可以`break`指定`label`对应的`loop`

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

- Each value in Rust has an *owner*.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

C、C++的内存管理是手动分配和释放;而更多的语言是使用GC来进行垃圾回收;Rust通过所有权的机制来实现对堆内存中用不到的数据进行回收.

对于JavaScript来说,可以同时存在a、b、c变量指向同一块堆内存,因此只有当a、b、c都被释放后GC才会回收那块内存;而对于Rust,同时只能有一个变量拥有这块内存的所有权

``` rust
let a = String::from("hello");
let b = a;
let c = b;

a.as_bytes(); // error
```

此时,a和b都已经无效了,本质上是堆内存的所有权已经从a转移(move)到b再move到c上.



当拥有所有权的变量离开当前作用域时,就会自动释放对应的堆内存.



所以本质上,一块堆内存只能由一个指针指向,因此在该变量离开作用域的时候就能够直接释放内存了.

所有权的转移不仅发生在赋值操作,比如函数的传参、返回值也会发生move



那么,当我们把一个变量的所有权move到函数内的变量,又需要在函数外继续使用的话,就要求函数把内部的参数又return出去,很麻烦



所以此时引出一个“reference”和“borrow”, `&a`

``` rust
let a = String::from("hello")
let b = &a;
```



### Struct

``` rust
struct People {
    name: String,
    age: u32,
    male: bool
}

impl People {
    fn is_male(&self) -> bool {
        self.male == true
    } 

    fn create(name: String, age: u32, male: bool) -> People { // associted function
        People {
        name,
        age,
        male,
        }
    } 
}

fn main() {
    let p1 = People {
        name: String::from("akara"),
        age: 20,
        male: true
    };
    
    let p2 = People::create(String::from("akara"), 20, false);
    let p3 = People {
        age: 30,
        ..p2 // 两个点
    };
    println!("{}, {}", p1.is_male(), p3.age)
}
```









### Enum

``` rust

enum Days {
    One,
    Two(u32),
    Three(bool),
}

fn main() {
    let num = test(Days::Two(20));
    println!("{}", num);
}


fn test(e: Days) -> u32 {
    match e {
        Days::One => 1,
        Days::Two(num) => {
            num
        },
        _ => 3
    }
}
```



#### `Option<T>`

Rust中不存在null空值的概念,通过`Option<T>`可以模拟某个变量值为空的情况.

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



#### If let

match语法糖

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



### 集合

#### Vec

``` rust
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

```

Vec是存储长度可变的,但类型相同的数据

可以搭配enum来存储长度可变,类型不相同的数据(通过枚举内部值实现)







#### String

``` rust
let mut s = String::from("hello");
s.push_str(" world");
s.push('!'); // char是单引号
println!("{}", s);
```

String不应该通过索引取值





#### HashMap

标准库中,而不是语言本身内置,需要手动引入

``` rust
let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }
```



#### Range

``` rust
use core::ops::Range;

let v: Vec<i32> = (1..4).into_iter().map( |x| x * x).collect();
```









### 错误处理

两种错误,可恢复错误和不可恢复错误(此时panic)



panic存在两种,unwind(默认)和abort,前者会释放程序内存,但需要一些工作量(二进制体积更大);后者直接退出,内存需要操作系统手动释放



``` toml
# cargo.toml
[profile.release]
panic = 'abort'
```





#### Result

枚举,ok和error



unwrap和expect,ok返回内部值,error时panic



Result? , 类似unwrap和expect,但是err的时候会把err返回而不是panic(用在函数中)

Wrap_or_else 闭包



### trait

类似interface,稍微不同

``` rust
struct People {
  name: String;
  age: i32;
}

impl xxx for People {
  fn say() -> bool;
}
```

使用对应方法的时候需要通过use引入对应的trait



trait内的方法,也可以提供默认实现.其他人实现的时候可以保留默认实现,或者覆盖



``` rust
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

类型约束,item必须要实现Summary这个trait

实际上是下面代码的语法糖,下述被称为trait bound(类似泛型约束)

``` rust
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}
```



多个特征的情况(TS中是&, T extends A & B )

``` rust
pub fn notify(item: &(impl Summary + Display)) {
  
  
pub fn notify<T: Summary + Display>(item: &T) {
```



Where子句(trait bounds太长了怎么办,写在参数列表后面)

``` rust
// before
fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {}
  
// after
fn some_function<T, U>(t: &T, u: &U) -> i32
    where T: Display + Clone,
          U: Clone + Debug
{}
```

### 引用生命周期





### 闭包





### 迭代器

对于常见的集合，都部署了迭代器方法，我们也可以手动调用迭代器方法拿到迭代器对象

#### iter tier_mut into_iter

> Also note that the values we get from the calls to `next` are immutable references to the values in the vector. The `iter` method produces an iterator over immutable references. If we want to create an iterator that takes ownership of `v1` and returns owned values, we can call `into_iter` instead of `iter`. Similarly, if we want to iterate over mutable references, we can call `iter_mut` instead of `iter`.

``` rust
let v: Vec<i32> = vec![1, 2, 3].into_iter().map( |x| x * x).collect();
```

https://stackoverflow.com/questions/65766866/why-the-closure-passed-to-map-does-not-take-a-reference-while-the-one-passed-t 







### 智能指针

Deref、drop



#### Box

#### Rc

#### RefCell



