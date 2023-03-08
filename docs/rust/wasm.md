# WebAssembly

WebAssembly是一门偏向底层的类汇编语言，不仅能直接被浏览器解释执行，还能够和JavaScript代码进行相互调用，如今WASM通常会作为C++、Rust这类高级语言的编译产物来改进Web端的部分性能瓶颈。



## wasm-pack

`wasm-pack`是Rust官方提供的一站式构建、测试和发布工具，可以用来将Rust编译成WASM，在[官网](https://rustwasm.github.io/wasm-pack/)中即可进行安装。除了打包工具外，通常我们还会搭配`wasm-bindgen`库来促进WASM模块和JS模块的交互性，完整的`Cargo.toml`配置信息如下：

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

一个简单的例子源码如下，可以看出代码中存在着`Rust`（会被编译成WASM）和`JavaScript`的双向调用。

通过`wasm-pack build`命令即可进行编译，产物默认被放置在`pkg`目录下，主要产物包括JS入口文件、WASM文件和胶水层JS代码。

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





## wasm-bindgen

在上面的简单例子中我们通过使用`#[wasm_bindgen]`宏实现了WASM和JS模块的相互调用能力，通过手动定义各种方法的声明，我们能够在Rust代码中直接调用像`alert`、`console`这样的内置对象。

而通过使用`js-sys`、`web-sys`和`wasm-bindgen-futures`，我们能够更加轻松的实现各种高级功能。



### js-sys

该模块提供了JavaScript内置的标准对象的绑定，诸如`Object`、`Function`、`Reflect`、` WebAssembly`等等。

``` rust title="lib.rs"
use js_sys::{Function, Object, Reflect, WebAssembly};
```



### web-sys

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





## @wasm-tool/wasm-pack-plugin

在上文的例子中，我们直接通过`wasm-pack build`来生成WASM产物，为了在Webpack5的项目工程中引入该产物，我们不仅需要开启试验性标识`experiments.asyncWebAssembly`，还需要额外安装`@wasm-tool/wasm-pack-plugin`插件进行支持。

``` js
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
    plugins: [
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, ".")
        }),
    ],
    experiments: {
        asyncWebAssembly: true
   }
};
```



如果不想要使用构建工具，我们可以使用`wasm-pack build --target web`命令来进行构建，可以观察两个命令对应的产物的差异。通过后者命令编译时，我们需要请求到WASM数据后通过`WebAssembly.instantiate`进行加载。

