# 模块化

Rust中每个包`package`都包含了一个`Cargo.toml`配置文件，并且一个包内部可能有一个或者多个`crate`组成。那么`crate`是什么呢？首先，`crate`分为`binary crate`和`library crate`，`binary crate`的入口文件中需要包含一个`main`函数，它通常被用来编译成可执行文件，被作为命令行工具或者服务端来使用；而`binary crate`则不包括`main`函数，通常作为第三方库被其他人的项目所引用。

默认情况下通过`cargo new <name>`创建项目时，生成的`src/main.rs`中包含`main`函数，表明这是一个`binary crate`；我们也可以通过`cargo new <name> --lib`来默认创建`library crate`，会生成`src/lib.rs`文件。当然这只是初始化的差异而已，一般来说一个`package`可以包含多个`crate`，**其中可以有多个`binary crate`，但最多只能有一个`library crate`。**

`crate`可以被理解成一个模块树，上方所提到的`src/main.rs`和`src/lib.rs`分别是对应`crate`的根文件`crate root file`。通过在根文件`src/main.rs`中使用`mod`关键字来声明模块，最终将形成一颗完整的模块树，编译器将根据以下优先级查找模块对应的代码：

1. 是否为内联模块，形如

   ``` rust title="src/main.rs"
   mod akara {
   	pub fn hello() {
       println!("hello");
     }
   }
   ```

2. 查找`src/<name>.rs`

3. 查找`src/<name>/mod.rs`

我们可以在`crate`中的任意模块中引用其他模块（只要隐私规则允许），一般形如`crate::AAA::BBB::ccc`，但在所有地方都通过这么长一串使用的话未免有些繁琐，所以Rust提供了**关键字`use`**来帮助我们简化使用的流程。

``` rust title="src/main.rs"
mod AAA;
use crate::AAA::BBB::ccc;

fn main() {
  ccc();
}
```



## 隐私规则

模块下的变量或方法如果希望能够被其他模块访问，那就需要在它们的声明前添加`pub`前缀，形如：

``` rust
pub fn hello() {}
```

同时，如果希望一个模块是公共的，也需要通过`pub mod`来进行声明。



## Library Crate

对于一个普通的二进制项目，我们也可以把一些逻辑代码放进`src/lib.rs`中，在`src/main.rs`中通过`<packageName>::AAA`来使用。