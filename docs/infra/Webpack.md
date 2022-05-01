``` bash
npm install webpack webpack-cli webpack-dev-server -D
npx webpack
npx webpack serve --open
```

``` js
// webpack.config.js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
      main: './src/main.js',
      lib: './src/lib.js'
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "js/[name].[contenthash].js",
    clean: true,  
    chunkFilename: '[contenthash].js'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, "./public/index.html"),
    }),
  ],
  module: {
      rules: [
          {
            test: /.css$/,
            use: ['style-loader', 'css-loader'] 
          },
          {
              test: /.txt$/,
              type: 'asset/source' 
          },
          {
            test: /.jpg$/,
            type: 'asset/resource',
            generator: {
              filename: 'images/[hash][ext]'
            }
          },
          {
            test: /.png$/,
            type: 'asset/inline',
          },
      ]
  },
  devServer: {
    static: './dist'
  },
  devtool: "inline-source-map",
  optimization: {
    splitChunks: {
      chunks: 'all'
    },    
    runtimeChunk: 'single',
  },
  externals: {
    lodash: '_'
  },
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      
    }
  },
};
```

## mode 

- `development`，即开发模式。此时代码没有`tree shaking`、也没有经过压缩处理。
- `production`，即生产模式，是配置的默认值。此时打包`ES`模块时默认开启`tree shaking`，代码经过压缩处理。

## entry

`webpack`能够从一个入口模块出发，递归查找所有被依赖的模块，将其打包生成构建产物。通常来说一个入口文件对应一个构建产物`js`（称之为`chunk`），但是通过代码分割技术（见后续章节），一个入口文件是能够对应多个构建产物`js`（多个`chunk`，主要那个`chunk`被称为`initial-chunk`，其余的都被称为`non-initial-chunk`）的。

``` js
// 单文件入口
entry: './src/index.js',  
entry: {
    home: './src/index.js' 
}

// 多文件入口
entry: { 
    home: './src/index.js', 
    test: './src/test.js' 
},
```

## output

用来指示构建产物的存放路径和文件名等信息

``` js
entry: {
    home: './src/index.js',
    test: './src/test.js'
},
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].bundle.js', // initial-chunk的文件名
    chunkFilename: '[contenthash].js', // non-initial-chunk的文件名
    clean: true, // 每次构建清空构建目录，以前用clean-webpack-plugin实现
},
```

### [name]

`chunk`名，如上述配置的`home`、`test`



### [contenthash]

`chunk`内容的哈希值



## loader

在`webpack`只能理解`js`模块之间的引用关系，如果我们想要在`js`文件中引入其他类型的文件就需要使用对应的`loader`，简单来说`loader`起到一个转化的功能。

需要注意的是`loader`的执行顺序是**从右往左**，如`['style-loader', 'css-loader']`表示当被依赖的模块是`css`文件时，会先将`css`文件内容传给`css-loader`处理，处理后的结果再传给`style-loader`处理，最终处理的结果会被依赖该`css`文件的模块所使用。



### style-loader

在`js`模块中引入`css`文件的常见做法只直接`import './style.css'`，实际上`style-loader`的作用是返回一段`js`代码，这段代码的作用是动态生成一个`style`标签，标签的内容是`css`文件内表达的样式。



### css-loader

用来处理`css`文件，并会将处理后的内容交给`style-loader`来动态生成`style`标签从而注入样式。除此之外，还提供了`css module`的能力，允许我们通过`import xx from './style.module.css'`从`css`文件中导入具体的内容（默认情况下只有`.module.css`的文件才能使用该功能，可通过`options.modules: true`来令所有`css`文件都能这样引用）

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
};
```

``` css
/* style.module.css */
.Root {
  background: 'pink'
}
```

``` jsx
import { Root } from './style.module.css'

function App() {
  return <div className={Root}></div>
}
```





## asset modules

`webpack5`通过`asset modules`内置了`raw-loader`、`url-loader`、`file-loader`的功能



### type/resource

等同于`file-loader`

``` js
module.exports = {
  module: {
   rules: [
     // webpack5
     {
       test: /\.png/,
       type: 'asset/resource'
     },
     
     // webpack4 使用file-loader实现
     {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
   ]
 },
}
```

``` js
import mainImage from './images/main.png';

img.src = mainImage; // '/dist/151cfcfa1bd74779aadb.png'
```



默认情况下资源会存放在`output.path`根目录，我们可以使用`output.assetModuleFilename`或`Rule.generator`调整资源的生成目录。

``` js
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]', // 
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource'
     	},
      {
        test: /\.html/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]',
        },
      },
    ],
  },
};
```









### type/inline

等同于`url-loader`

``` js
module.exports = {
  module: {
    rules: [
      // webpack5
      {
       	test: /\.svg/,
       	type: 'asset/inline'
     	},
      
      // webpack4 使用url-loader实现
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 资源大小大于该值时自动换成file-loader处理
            }
          },
        ],
      },
    ]
  }
}
```

``` js
import svg from './images/default.svg';

el.style.background = `url(${svg})`; // url(data:image/svg+xml;base64,xxxxxx)
```





### type

根据资源的大小自动选择`type/resource`和`type/inline`，`url-loader`其实也内置了`file-loader`，以前也是一样通过`url-loader`根据资源的大小选择不同的处理方式



### type/source

等同于`raw-loader`

``` js
module.exports = {
  module: {
    rules: [
      // webpack5
      {
       	test: /\.txt/,
       	type: 'asset/source'
     	},
      
      // webpack4 使用raw-loader实现
      {
        test: /\.txt$/,
        use: [
          { loader: 'raw-loader' },
        ],
      },
    ]
  }
}
```

``` markdown
Hello world
```

``` js
import txt from './hello.txt'
console.log(txt) // hello world
```



## plugins

插件，顾名思义，就是对`webpack`功能进行拓展。

``` js
plugins: [
    new HtmlWebpackPlugin({}),
    new webpack.HotModuleReplacementPlugin({}),
]
```



### html-webpack-plugin

`webpack`本身的作用是构建出`bundle.js`，然后构建文件需要在我们的`html`中使用。

`html-webpack-plugin`插件的作用是每次使用`webpack`命令，都会自动在`dist`（指构建出口）生成一个`html`文件，这个`html`文件会自动引入我们的`bundle.js`

``` js
// npm i -D html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
    plugins: [
        new HtmlWebpackPlugin({
    		template: path.resolve(__dirname, 'public/index.html'),
		}),
    ],
};
```

``` html
<!-- public/index.html 模板文件 -->
<body>
    <div id="root"></div>
</body>

<!-- dist/index.html 自动生成的文件 -->
<body>
    <div id="root"></div>
    <script src="bundle.js"></script>
</body>
```

### clean-webpack-plugin

通常每次使用`webpack`进行构建，都希望能先清除上次构建的产物

``` js
// npm i -D clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackConfig = {
    plugins: [
        new CleanWebpackPlugin(),
    ],
};
```

## resolve

### extensions

``` js
resolve: {
    extensions: [".js", ".mjs", ".cjs", ".jsx", ".tsx"]
}
```

``` js
import test from './app' // 检索各种后缀，如app.mjs、app.cjs
```



### alias

导入模块时的别名。

``` js
const path = require('path');

module.exports = {
  	resolve: {
    	alias: {
      		Test: path.resolve(__dirname, 'src/test/'),
    	},
  	},
};
```

``` js
import Test from 'Test/index.js' // src/test/index.js
```

### mainFields

[Node#package.json](https://messiahhh.github.io/blog/frontend/node.html#browser-module)



## devtool

构建的时候生成`sourceMap`

``` json
module.exports = {
  	devtool: 'source-map'
};
```



### source-map

在构建产物`index.js`同目录下生成`index.js.map`，同时`index.js`末尾会附上`//# sourceMappingURL=index.js.map`

``` js
function A() {}
//# sourceMappingURL=index.js.map
```



### Inline-source-map

将`sourceMap`通过内联的方式附在构建产物`index.js`的末尾

``` js
function A() {}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2Zxxxxxxxxxx
```



### eval-source-map

构建产物`index.js`内部实现变成通过`eval`执行模块对应的代码，并在`eval`的末尾内联`sourceMap`（热知识，`eval`可以在代码末尾内联`sourceMap`来方便`eval`执行出错时进行调试）

``` js
// index.js 伪代码
var __webpack_modules__ = {
      138: () => {
        eval(
          "const test = __webpack_require__(4)\n\ntest()//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2Zxxxxxxxxxx\n//# sourceURL=webpack-internal:///138\n"
        );
      },
      4: (module) => {
        eval(
          "module.exports = function test(a) {\n    let arr = [];\n    console.log(arr[4].age);\n    return 'test'\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2Zxxxxxxxxxx\n//# sourceURL=webpack-internal:///4\n"
        );
      },
    },
```

另外使用`eval-source-map`构建的产物可以在浏览器`source`的`webpack-internal://`一栏看到每个模块的源码









## devServer

``` bash
npx webpack serve
```

### publicPath

> Imagine that the server is running under `http://localhost:8080` and [`output.filename`](https://webpack.js.org/configuration/output/#outputfilename) is set to `bundle.js`. By default the `devServer.publicPath` is `'/'`, so your bundle is available as `http://localhost:8080/bundle.js`.

```javascript
module.exports = {
  //...
  devServer: {
    publicPath: 'http://localhost:8080/assets/',
  },
};
```

> The bundle will also be available as `http://localhost:8080/assets/bundle.js`.

### contentBase

主要用来访问非构建生成的静态资源，默认值为当前工作目录，也就是说当前目录的所有文件都能通过开发服务器获取。

>  Content not from webpack is served from ~/workshop/repo

### Hot Module Replacement

模块热替换功能应该只用在开发环境当中，可以通过`npx webpack serve --hot`来开启该功能，此时`webpack`会自动使用`HotModuleReplacementPlugin`内置插件。

对于CSS文件由于我们使用了`style-loader`，文件的改变会自动触发热更新；而对于JS文件我们需要额外加一些代码，如下代码当我们修改了`child.js`会进行模块热替换。

``` js
// parent.js
if (module.hot) { // 通过该守卫来避免生产环境报错
    module.hot.accept('./child.js')
}
```

## optimization

### runtimeChunk

``` js
module.exports = {
  optimization: {
    runtimeChunk: 'single',
  },
}
```



### splitChunksPlugin

``` js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all'
    },    
  },
}    
```



## externals

``` typescript
import _ from 'lodash'
console.log(_)
```

假设我们的代码是这样的，在某些情况下我们可能希望`webpack`构建的时候不把`lodash`也打包进去。事实上这种场景是很常见的。

场景一：我们的`HTML`已经通过外链引用了`lodash`，所以构建产物自然不希望包括`lodash`，这样做的好处是我们能够在开发过程中通过代理来将外链的`lodash`替换成本地的`lodash`代码，方便开发调试。

场景二：我们正在开发一个插件，通过`yarn add lodash -P`把`lodash`作为一个`peer dependencies`安装，这意味着对于该插件的使用者需要自行安装`lodash`，我们需要使用`externals`来把`lodash`从构建的产物中排除。

``` js
module.exports = {
  externals: {
    lodash: '_'
  }
}
```

场景三：我们正在开发一个后端库，与前端库相比后端库其实并不需要将库所依赖的第三库模块（`node_modules`）和`Node`内置模块也打包，通常我们会用`webpack-node-externals`来排除这些模块

``` js
const nodeExternals = require('webpack-node-externals');

module.exports = {
  externalsPresets: { node: true }, // webpack5，对于webpack4的target: node
  externals: [nodeExternals()]
}
```



## 代码分割

常见的代码分割方式有以下几种

1. 使用多入口而非单一入口构建
2. 使用`splitChunksPlugin`把公共依赖或是第三方库（如`lodash`、`Jquery`）提取到一个单独的`chunk`中
3. 使用`import()`动态加载模块



## 原理

`webpack`可以打包`ES`模块和`CommonJS`模块。

`webpack`把每个文件模块都当成一个对象`var module = { exports: {}}`。并通过对文件模块的解析来给该对象赋予属性，如`ES`模块对应的形式如

``` js
// ES模块 a.js
export default function() {
    console.log('111')
}
export function A() {
    console.log('222')
}

// 打包后对应的对象
var module = {
    exports: {
        default: function() { console.log('111') }, // 严格来讲这里是getter 
        A: function() { console.log('222') }, // 同理，此处为了看起来简单
    }
}
```

而由于`CommonJS`模块**没有默认导出**，所以对应的打包后对象也不存在`default`属性。

``` js
// CommonJS模块 b.js
module.exports.A = function() {
    console.log('111');
}

module.exports.B = function() {
    console.log('222');
}

// 打包后对应的对象
var module = {
    exports: {
        A: function() { console.log('111') },
        B: function() { console.log('222') },
    }
}
```

当我们在`webpack`导入模块时，`require`返回模块整体导出`module.exports`；`import * as xxx from`也可以整体导入模块，或者是导入模块的不同导出接口，包括`default`接口。

至于如何分辨属于何种模块，则根据`module.__esModule`判断，这个属性是由`__webpack_require__.r`定义的。



## 动态加载

`webpack`中每个文件都是一个模块。

从一个`entry`文件开始打包所依赖的所有模块，可以得到一个包括一个`thunk`的`thunkGroup`

如果有多个`entry`，那么打包之后得到的是多个`thunkGroup`，每个`thunkGroup`包括一个`thunk`。



包括一个`thunk`的`thunkGroup`听起来有点奇怪，什么时候包括多个`thunk`呢？通常是使用动态加载`import()`时

``` js
// webpack.config.js
entry: './src/index.js'

// index.js
import('./test.js').then(() => {
    ReactDOM.render(
        <App />,
        document.querySelector('#root')
    )
})
```

通过`webpack`，我们的`dist`会生成两个`js`文件，或者说是两个`main.js`和`[id].js`（这里的`id`是个随机数字）。

这里的`/dist/main.js`称为`initial thunk` ；`/dist/[id].js`称为`non-initial thunk` 。

其中`initial thunk`的名字可以在`output.filename`中指定；而`non-initial thunk`的名字可以在`output.chunkFileName`中指定，除此之外也可以使用`Magic comment`来指定，如：

``` js
// index.js
import(
    /* webpackChunkName: "akara" */
    './test.js'
).then(() => {
    ReactDOM.render(
        <App />,
        document.querySelector('#root')
    )
})
```

这样我们得到的`non-initial thunk`文件名就是`akara.js`



现在，在我们的`index.html`引入`main.js`时，`main.js`会自动地加载`akara.js`文件。







## 构建后端代码

通常我们使用`webpack`打包前端项目，如果需要打包后端项目我们需要`target`和`externals`配置项，因为后端项目我们希望内置模块和第三方模块不要被打包进`bundle`中。

``` js
const nodeExternals = require('webpack-node-externals')
module.exports = {
    target: 'node', // 不打包path, fs等内置核心模块
    externals: [nodeExternals()], // 不打包node_modules的第三方模块
}
```



## 构建第三方库

像上一小节打包得到的代码只能直接调用，没有导出的接口，如果我们想要打包Node模块可以使用`output.libraryTarget`配置项。

``` js
// webpack.config.js
output: {
    library: {
        type: 'umd',
    }
},
```


