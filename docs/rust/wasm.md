# WebAssembly

WebAseembly是一门跨平台的类汇编语言，并且可以在浏览器或者Node环境中通过双向调用的形式执行（JS调用WASM提供的方法，WASM调用JS提供的方法）。一般会通过编译将C、C++、Rust等高级语言编译为WebAssembly进行使用。



## cargo-generate

`cargo-generate`可以用来根据模板创建项目，我们可以使用官方提供的`wasm`模板：

``` shell
cargo generate --git https://github.com/rustwasm/wasm-pack-template
```

生成的项目中核心代码如下，表示`WASM`暴露了`greet`函数供`JS`侧使用，并且`WASM`侧会使用`JS`侧所提供的`alert`函数。

``` rust
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



## wasm-pack

:::info

对于C、C++项目，一般通过Emscripten编译为WebAssembly

:::

`wasm-pack`是官方提供的一站式构建、测试和发布工具，通过以下命令安装：

``` shell
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

之后在项目根目录下可以通过以下命令进行编译，产物会被放置在`pkg`目录下，产物中包含`.wasm`、胶水层`.js`文件和入口文件`.js`等。

``` shell
wasm-pack build
```

在构建完成后，我们可以将`pkg`发布为`npm`包供前端工程中使用（也可以先通过`npm link`进行本地调试），在前端工程中引入并使用即可（以Webpack5举例，需要开启`experiments.asyncWebAssembly`）














