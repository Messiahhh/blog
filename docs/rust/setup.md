# 安装

## rustup（rust版本管理）

`rustup`是管理`rust`版本的工具，通过以下命令即可安装最新的`rust`编译器`rustc`及其包管理工具`cargo`

``` shell
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
rustup update
```



## rustc（编译器）

``` sh
rustc --version 

rustc main.rs
./main
```



## cargo（包管理）

> 功能类似NPM，包括项目的初始化、模块的安装与管理、便捷的脚本命令

``` sh
cargo --version 

cargo new projectName # 初始化项目
cargo build # 构建/编译
cargo run # 编译后立刻运行
cargo check # 编译并进行代码检查，但不生成产物
```

## Cargo.toml（配置文件）

项目配置文件，类似`package.json`

``` toml
[package]
name = "guessing_game"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html
[dependencies]
```


