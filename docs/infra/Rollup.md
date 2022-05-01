`Webpack`作为一个成熟的构建工具被广泛运用在项目的开发当中，而如果我们只是想要开发一个第三方模块，或许`Rollup`是个不错的选择。

``` bash
npm i -D rollup
npx rollup main.js --file bundle.js --format umd --name "myModule"
```

通过`Rollup`我们能够将源代码打包成`iife`、`cjs`、`umd`、`es`格式的模块。

``` js
// rollup.config.js
module.exports = {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'es'
    },
    // 也可以一次性构建多种类型的模块
    output: [
        {
            file: 'bundle.es.js',
            format: 'es'
        },
        {
            file: 'bundle.umd.js',
            format: 'umd'
        }
    ]
}
```






