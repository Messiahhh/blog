# PostCSS

`postcss`提供了**CSS代码的编译功能**；`postcss-cli`允许我们在命令行进行编译；而我们大多数情况是在`webpack`中搭配使用`postcss`，此时需要额外安装`postcss-loader`。

除了命令行传参，我们还可以使用`postcss.config.js`写入配置信息。

类似`babel`，默认情况下编译前后代码格式一样，我们需要**使用插件来指定转化功能**。

## plugins

### autoprefixer

这是最常见的`PostCSS`插件，能够给CSS规则添加各种前缀从而兼容不同浏览器。

``` css
/* 源文件 */
::placeholder {
  color: gray;
}

/* 编译后文件 */
::-moz-placeholder {
  color: gray;
}
:-ms-input-placeholder {
  color: gray;
}
::placeholder {
  color: gray;
}
```

使用的方式也很简单，这里以`webpack`中使用为例子。

``` js
// webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"] // 在最后面加上了postcss-loader
            }
        ]
    },
}
```

``` js
// postcss.config.js
const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
        autoprefixer, // 或 autoprefixer()
    ]
}
```



### postcss-preset-env

该插件通过垫片（`poyfills`）让我们能在浏览器使用还没有成为规范的属性。

``` js
// postcss.config.js
const env = require('postcss-preset-env')
const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
        autoprefixer,
        env({ stage: 0 })
    ]
}
```

### postcss-modules

该插件能实现类名的转化，从而避免类名的重复。

``` css
/* 源文件 */
.name {
  color: gray;
}

/* 编译后文件 */
.Logo__name__SVK0g {
  color: gray;
}
```

编译的同时会生成一个`json`文件记录前后类名的对应关系，以方便我们合理地引入类名。



