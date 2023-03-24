# Rust + Web

目前Rust有两种方式运用在泛前端领域，分别是WebAssembly和Node-API

- WebAssembly，可以被使用在Web端和Node端，优点是可以兼容不同的平台。
- Node-API，只可以被使用在Node端，优点是性能更强，缺点是需要为每一个平台编译一份`.node`产物。



## WebAssembly

WebAssembly是一门偏向底层的类汇编语言，不仅能直接被浏览器解释执行，还能够和JavaScript代码进行相互调用，如今WASM通常会作为C++、Rust这类高级语言的编译产物来改进Web端的部分性能瓶颈。



### wasm-pack

`wasm-pack`是Rust官方提供的一站式构建、测试和发布工具，可以用来将Rust编译成WASM，在[官网](https://rustwasm.github.io/wasm-pack/)中即可进行全局安装。

一般我们会搭配`wasm-bindgen`、`js-sys`、`web-sys`、`wasm-bindgen-futures`来促进WASM模块和JS模块的交互性，完整的`Cargo.toml`配置信息如下：

``` toml title="Cargo.toml"
[package]
name = "hello_world"
version = "0.1.0"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2.84"
js-sys = "0.3.61"
wasm-bindgen-futures = "0.4.34"

[dependencies.web-sys]
version = "0.3.4"
features = [
  'Document',
  'Element',
  'HtmlElement',
  'Node',
  'Window',
]
```

``` rust title="lib.rs"
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, learn-wasm!");
}
```

- 用于构建工具打包，在Webpack中借助`@wasm-tool/wasm-pack-plugin`插件来实现，同时需要开启实验标志`experiments.asyncWebAssembly`

  ``` shell
  wasm-pack build # 用于webpack打包
  ```

- 不使用构建工具，直接Web加载

  ``` shell
  wasm-pack build --target web # 用于网页直接加载
  ```

- 用于Node环境

  ``` shell
  wasm-pack build --target node # 用于node环境
  ```

  



### wasm-bindgen

在上面的简单例子中我们通过使用`#[wasm_bindgen]`宏实现了WASM和JS模块的相互调用能力，通过手动定义各种方法的声明，我们能够在Rust代码中直接调用像`alert`、`console`这样的内置对象。



#### js-sys

该模块提供了JavaScript内置的标准对象的绑定，诸如`Object`、`Function`、`Reflect`、` WebAssembly`等等。

``` rust title="lib.rs"
use js_sys::{Function, Object, Reflect, WebAssembly};
```



#### web-sys

提供了各种Web API的绑定，诸如`Window`、`Document`等等。

``` rust title="lib.rs"
use wasm_bindgen::prelude::*;

// Called by our JS entry point to run the example
#[wasm_bindgen(start)]
pub fn run() -> Result<(), JsValue> {
    // Use `web_sys`'s global `window` function to get a handle on the global
    // window object.
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");

    // Manufacture the element we're gonna append
    let val = document.create_element("p")?;
    val.set_text_content(Some("Hello from Rust!"));

    body.append_child(&val)?;

    Ok(())
}
```





## Node-API

在Node环境中除了使用上一节介绍的WASM，我们还可以使用Node-API。众所周知，Node的源码是由C++编写而成的，它所提供的诸多内置模块`fs`、`path`、`http`等都是由C++实现的，除此之外Node甚至允许编写C++插件addons。根据Node的官方文档，它提供了几种方式来实现C++ addons，一种主流的方式是使用Node官方提供的Node-API接口来进行实现。而Rust社区中，又有人基于Node-API实现在Node项目中编写Rust代码，主流的库包括`neon`和`napi-rs`。



### @napi-rs



