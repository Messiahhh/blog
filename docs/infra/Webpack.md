# Webpack

## Setup

``` bash
npm install webpack webpack-cli webpack-dev-server -D
npx webpack
npx webpack serve --open
```



## Mode 

- `development`，即开发模式。此时代码没有`tree shaking`、也没有经过压缩处理。
- `production`，即生产模式，是配置的默认值。此时打包`ES`模块时默认开启`tree shaking`，代码经过压缩处理。

## Entry

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

## Output

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

### publicPath

一般本地开发时该字段取默认值即可，而在进行生产环境部署时，我们通常会将静态资源部署到TOS中并借助CDN实现资源的缓存，因此此时`publicPath`通常为该TOS的地址，如：

``` js
module.exports = {
		output: {
				publicPath: 'https://tos.xxx.com/yyy/'
		}
}
```

此时我们构建后生成的HTML页面中是通过类似这样的形式引用静态资源的

``` html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
<script defer src="https://tos.xxx.com/yyy/js/main.5883839b305c23966b80.js"></script></head>
<body>
    <div id="root">hello</div>
</body>
</html>
```



### library

``` js
// webpack.config.js
output: {
    library: {
        type: 'umd',
    }
},
```





## Module

Webpack默认只能理解JavaScript模块之间的引用关系，为了引用非JavaScript文件我们需要通过*loader*来将目标文件转化为我们可以理解的内容。

需要注意的是`loader`的执行顺序是**从右往左**，如`['style-loader', 'css-loader']`表示当被依赖的模块是`css`文件时，会先将`css`文件内容传给`css-loader`处理，处理后的结果再传给`style-loader`处理，最终处理的结果会被依赖该`css`文件的模块所使用。

### loader

#### style-loader

主要用于动态生成*style*标签实现样式的插入。

#### css-loader

> The `css-loader` interprets `@import` and `url()` like `import/require()` and will resolve them.

除此之外还提供了CSS Modules的能力（默认情况下只有`.module.css`的文件才能使用该功能，可通过`options.modules: true`来令所有`css`文件都能这样引用）

``` json
 {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
 }
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



#### sass-loader

``` shell
npm i sass sass-loader -D
```

``` json
{
    test: /\.s?css$/i,
    use: ['style-loader', 'css-loader', 'sass-loader'],
}
```



#### @svgr/webpack

用于将SVG转化为React组件。

``` shell
npm i @svgr/webpack -D
```

``` js
{
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack'],
}
```

``` tsx
import Star from './star.svg'

const Example = () => (
  <div>
    <Star />
  </div>
)
```



#### esbuild-loader

``` js
{
    test: /\.(t|j)sx?$/,
    loader: 'esbuild-loader',
    options: {
      loader: 'tsx', // Or 'ts' if you don't need tsx
      target: 'es2015',
    },
},
```





### asset modules

*webpack5*通过*asset modules*内置了*Webpack4*中`raw-loader`、`url-loader`、`file-loader`的功能



#### type/resource

> 等同于`file-loader`

``` js
module.exports = {
  module: {
   rules: [
     // webpack5
     {
       test: /\.png/,
       type: 'asset/resource',
       generator: {
          filename: 'static/[hash][ext][query]',
       },
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



#### type/inline

>  等同于`url-loader`

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



#### type

根据资源的大小自动选择`type/resource`和`type/inline`，`url-loader`其实也内置了`file-loader`，以前也是一样通过`url-loader`根据资源的大小选择不同的处理方式



#### type/source

> 等同于`raw-loader`

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



## Plugins

插件，顾名思义，就是对`webpack`功能进行拓展。



### 内置插件

#### DefinePlugin

该插件在**编译时**对源码中的**变量**进行替换。

``` js
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('5fa3b9'),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: '1+1',
            'typeof window': JSON.stringify('object'),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        });
    ],
};
```



#### ProvidePlugin

> Automatically load modules instead of having to `import` or `require` them everywhere.

- 作用一：在每个*TSX*文件中都手动引入*React*会显得比较麻烦，可以通过该插件自动加载模块。

``` js
module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
        })
    ],
};
```

- 作用二：**Webpack5不再默认提供Node核心模块的Poyfill**，因此需要我们自行解决。其中对于像`process`、`Buffer`这类的Node内置变量我们可以通过该插件来提供*Poyfill*，而对于`import buffer from 'buffer'`、`import stream from 'stream'`这样的模块我们需要使用`resolve.fallback`来提供*Poyfill*

``` js
module.exports = {
		plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer/', 'Buffer'], // 相当于 require('buffer/').Buffer
        }),
    ]
}
```





### 第三方插件

#### html-webpack-plugin

每次构建时都根据模板HTML文件生成新的HTML文件，并会自动引入我们打包后的JS产物。

``` js
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
        plugins: [
            new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
    ],
};
```



## Resolve

### extensions

``` js
module.exports = {
		resolve: {
        extensions: [".js", ".mjs", ".cjs", ".jsx", ".tsx"]
    }
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
      		Test: path.join(__dirname, 'src/test/'),
    	},
  	},
};
```

``` js
import Test from 'Test/index.js' // src/test/index.js
```



### fallback

当解析一个模块失败时提供一个向后兼容的选项。一种常见的情况是项目所引用的第三方库引用了Node内置模块，此时我们需要将其替换成对应的可用模块。

``` js
module.exports = {
    resolve: {
        fallback: {
            stream: require.resolve('stream-browserify'), // npm i stream-browserify
            buffer: require.resolve('buffer/') // npm i buffer
        }
    }
}
```



### mainFields

[Node#package.json](https://messiahhh.github.io/blog/frontend/node.html#browser-module)



## Devtool

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









## DevServer

### static

``` js
module.exports = {
		devServer: {
      	open: true,
      	port: 9100,
      	static: {
          	directory: path.join(__dirname, 'dist'),
          	publicPath: "/",
        }
    }
}
```



### Hot Module Replacement

Webpack中存在两个容易混淆的概念，*Live Reloading*（对应配置中的`liveReload`字段）和*Hot Module Replacement*（对应配置中的`hot`字段，简称为HMR，又被称为热加载Hot Reloading）

- Live Reloading。当监听到任何依赖中的文件修改后，通知浏览器重新刷新页面，此时页面状态全部丢失。
- Hot Module Replacement。浏览器与本地服务器之间建立WebSocket连接，当检测到本地文件修改时服务器将主动通知浏览器，浏览器将会获取修改后的新模块进行局部替换，从而实现状态的保存。

可以看出HMR在Live Reloading的基础上做了进一步体验提升，默认情况下Webpack会开启HMR（即`hot: true`），此时需要在业务代码中手动实现新模块的接收与替换（即`module.hot.accept`），如果我们没有实现该功能，Webpack则会自动降级成Live Reloading，即刷新完整的页面。

不同种类的项目中，模块替换的实现自然存在着差异，拿React项目举例的话一下代码实现了一个非常简陋的HMR，此时当我们修改*Child.tsx*时，浏览器会主动向服务器发送`xxx.hot-update.json`和`xxx.hot.js`请求获取新模块的内容。

``` js
if (module.hot) {
    module.hot.accept('./Child.tsx', function() {
        ReactDOM.render(<App />, document.getElementById('root'));
    })
}
```

当然这样的实现是很脆弱的，因此建议使用React官方提供的实现。以前通常使用`React-Hot-Loader`来实现，但是现在推荐使用最新的**[React Fast Refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin)**



### proxy

``` js
module.exports = {
		devServer: {
      	proxy: {
          '/api': {
            target: 'http://localhost:9100', // 把接口代理给本地后端服务器
            changeOrigin: true,
          },
        },
    }
}
```



## Optimization

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
          	chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 15000,
          	cacheGroups: {
                babel: {
                  test: /[\\/]node_modules[\\/]@babel[\\/]/,
                  minChunks: 1,
                  chunks: 'all',
                  name: 'babel',
                  priority: 20,
                },
            }
        },    
    },
}    
```



## Externals

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







## Tree Shaking

*Tree Shaking*是JavaScript上下文中经常出现的术语，用于表示DCE(*dead-code elimination*)，它依赖于ES模块所提供的静态导入和导出语法`import`和`export`。通过实现Tree Shaking，能够剔除代码中未使用或无法触达的代码，从而减小产物的体积实现性能的优化。

Tree Shaking最先是由Rollup引入的概念，后面在Webpack中也得到了实现。Webpack中开发模式下默认不开启Tree Shaking，生产模式下默认开启Tree Shaking，而我们又知道两个模式的区别在于一些配置项的默认值不同，因此我们也可以自行配置来实现Tree Shaking。

先说结论，在开发模式下也可以通过开启`optimization`的`usedExports`、`minimize`、`concatenateModules`这三个配置项来达到生产模式下默认提供的Tree Shaking效果，那么接下来我们只需了解这几个配置项分别做了什么事情即可。

通过开启`usedExports`选项，Webpack构建时会在产物中通过形如`/* unused harmony export <name> */`的注释标识出未被使用到的导出，再通过开启`minimize`选项，默认会通过`terser`来优化代码并将这些标识出来的未用代码剔除，最后再通过`concatenateModules`实现模块的连接，暂且不提。

但即使开启了Tree Shaking，构建产物中依然可能存在一些我们所不期望的代码，这是因为通常模块内不仅包含导入和导出，还可能存在一些副作用（如函数的直接调用等），而通常Tree Shaking会采取保守的策略在最终的产物中包含这些副作用的代码以避免潜在的问题。拿以下的简单例子来说，在`index.tsx`文件中我们引入了App组件但并没使用，因此相关代码会被Tree Shaking剔除，但在`test.tsx`中存在着`memo`这个高阶函数的调用，这种函数的直接调用会被视为副作用并且会被保留在最终的产物当中。

``` tsx title="index.tsx"
import App, { test } from './test'
console.log(test())
```

``` tsx title="test.tsx"
import React from 'react'

function App() {
    return <div>app</div>
}

export function test() {
    return 'test'
}

export default React.memo(App)
```

如果我们能确信某些副作用是完全的**内部副作用**，即可以被安全的移除的内容，那么我们可以将相关的语句或者模块标识为Pure或`sideEffects: false`，从而在Tree Shaking的时候把这些无需引用的代码剔除，实现进一步的减小产物的体积。

还是以上述的代码为例，只需要在合适的语句前添加`/*#__PURE__*/`注释即可有效的剔除无用的代码，我们能够观察到构建后代码的数量得到有效的减少。

``` tsx title="test.tsx"
export default /*#__PURE__*/React.memo(App)
```

除了这个方法，我们还可以在`package.json`中的`sideEffects`中表明哪些文件存在副作用。拿第三方库`ahooks`举例，它的配置是`"sideEffects": false`，表明模块不存在**外部副作用**（即可能没有副作用，或者是内部副作用，不会影响外部逻辑）。再拿`antd`举例，它的配置如下：

``` json
{
  "sideEffects": [
    "dist/*",
    "es/**/style/*",
    "lib/**/style/*",
    "*.less"
  ],
}
```

一般来说`CSS`文件的引用方式都形如`import './style.css'`，这种是很明显有外部副作用，如果把这些样式相关的代码都剔除肯定会影响应用的展示效果。



































## 代码分割

常见的代码分割方式有以下几种

1. 使用多入口而非单一入口构建
2. 使用`splitChunksPlugin`把公共依赖或是第三方库（如`lodash`、`Jquery`）提取到一个单独的`chunk`中
3. 使用`import()`动态加载模块





### 动态加载

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

