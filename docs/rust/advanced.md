# 进阶

## Unsafe Rust

## Advanced Traits

## Advanced Type

## Advanced Function 

## 宏（Macro）

宏是一种元编程，通过在编译时对指定的源代码进行替换（即宏展开）可实现各种进阶的能力。Rust中的宏分为**声明宏**（*declarative macros*）和以下三种**过程宏**（ *procedural macros*）

- 派生宏（*Custom `#[derive]` macros*）
- 属性宏（*Attribute-like macros*）
- 函数式宏（*Function-like macros*）

声明宏和过程宏中的函数式宏在功能上十分贴近，使用上也都和普通函数非常相似，二者区别在于声明宏主要是做字符串层面上的匹配与替换，而过程宏是基于Token流乃至语法树层面上的操作。另外相较于普通函数的功能来说，宏最大的特别是在编译时进行展开，具备更强大的表达能力。

### 声明宏

#### 定义

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

#### 使用

``` rust
let v: Vec<u32> = vec![1, 2, 3];
```



### 过程宏

#### 派生宏

派生宏主要被结构体或枚举类型进行消费，最常见的做法是给结构体提供某个Trait的默认实现。

#### 定义

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

#### 使用

``` rust
use hello_macro::HelloMacro;
use hello_macro_derive::HelloMacro;

#[derive(HelloMacro)]
struct Pancakes;

fn main() {
    Pancakes::hello_macro();
}
```





#### 属性宏

属性宏不仅可以被用来替换结构体和枚举，还能替换函数等源代码的内容，并且使用属性宏的时候可以接收更多额外的参数。

#### 定义

``` rust
#[proc_macro_attribute]
pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {
}
```



#### 使用

``` rust
#[route(GET, "/")]
fn index() {
}
```





#### 函数式宏

函数式宏在使用上类似于直接调用函数。

#### 定义

``` rust
#[proc_macro]
pub fn sql(input: TokenStream) -> TokenStream {
}
```



#### 使用

``` rust
let sql = sql!(SELECT * FROM posts WHERE id=1);
```






