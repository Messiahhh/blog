# NPM

## .npmrc

NPM的配置文件

``` shell
registry=https://registry.npmjs.org/
package-lock=false # 不启用NPM锁
```



## 命令

### npm config

``` shell
npm config set registry https://registry.npmjs.org/
npm config get prefix 
npm config delete registry
npm config 
```

### npm init

初始化`package.json`

``` shell
npm init -y
```

### npm install

``` shell
npm install <name> --save # yarn add <name>
npm install <name> --save-dev # yarn add <name> -D
npm install -g <name> # yarn global add <name>

npm install
npm ci # 通常用于CI，使用该命令时需要确保项目中存在 package-lock.json或 npm-shrinkwrap.json，并且当 package.json和 package-lock.json中依赖的版本不一致时 npm ci会抛出错误。
```



本地安装时，模块会被安装在`/project/node_modules`下，同时如果该模块的`package.json`中存在`bin`字段时，则会自动根据`bin`表示的字典在`/project/node_modules/.bin`下面创建对应的符号链接。

全局安装时，模块会被安装在`/usr/local/lib/node_modules`（以MacOS举例）下，同时如果该模块的`package.json`中存在`bin`字段时，则会自动根据`bin`表示的字典在`/usr/local/bin`下面创建对应的符号链接（可理解为Windows中的快捷方式）。



举个例子，`akara-project`的`package.json`中的`bin`字段如下，那么当全局安装`akara-project`时会创建`/usr/local/bin/akara`这个文件（符号链接），这个文件实际指向着`akara-project`根路径下的`index.js`。（其实这就是开发命令行工具的原理）

``` json
{
  "bin": {
    "akara": "index.js"
	}
}
```



### npm uninstall

``` shell
npm uninstall <name> # yarn remove <name>
```

### npm update

``` shell
npm update <name> # yarn upgrade <name>

npm update
```



举个例子，如果我们的项目（采用锁机制）存在老版本的`react@^16.0.0`，此时我们（包括CI）只能拿到`16.0.0`版本的`react`。如果我们现在想要升级`react`可以采取两种方式：`npm install react`或`npm update react`。前者更类似于重新安装`react`，并会重写`package.json`中的依赖关系；而`npm update`并不会改动`package.json`，它仅仅是根据`package.json`中的版本`semver`来重新安装可安装的最新`react`。二者都会重新生成`package-lock.json`。

### npm outdated

查看项目中哪些模块不是最新版本

``` shell
npm outdated 
```

### npm run 

``` shell
npm run start # 执行脚本
npm run-script <stage>
```

### npm link

> alias: npm ln

简单来说这个命令存在两种用法，可用于将本地模块链接到全局，或是将全局模块链接到本地。

用法一：

当我们位于模块`akara-project`项目中时，直接执行`npm link`会把当前模块链接到全局（具体来说的话，会在`/usr/local/lib/node_modules`下创建一个符号链接指向着`akara-project`这个模块，如果该模块的`package.json`存在`bin`字段时还会在`/usr/local/bin`下面创建对应的符号链接）

用法二：

当我们位于某个项目中时，并假设我们已经全局安装了一个模块（如`pm2`），此时在项目中执行`npm link webpack`会把全局模块链接到本地（具体来说的话，会在当前项目的`node_modules`创建一个符号链接`pm2`指向着全局的`pm2`模块，如果该模块的`package.json`存在`bin`字段时还会在`/project/node_modules/.bin`下面创建对应的符号链接）



通过结合方法一和方法二我们可以实现这样的功能：假设我们同时维护着项目A和模块B，并在项目A中引用着模块B。那么比较传统的方法来维护这两个库是这样的，更新完模块B后发布，然后在项目A中更新模块B从而查看最新的效果；而通过`npm link`我们可以简化这个流程，我们只需要先在B模块中通过`npm link`来把B模块链接到全局，然后在A项目中通过`npm link B`来把全局B模块链接到A项目本地。



### npm exec

可以直接执行`node_modules/.bin`下的可执行文件

``` shell
npm exec webpack # 等于npx webpack
```



### npm publish

``` shell
npm publish # 发布模块
npm unpublish --force # 下架模块

npm publish --access publish # 发布公共模块
```



在通过`npm login`登陆了`npm`账户后，我们可以在任意项目下通过`npm publish`来进行模块的发布，此时NPM镜像源需要是官方镜像源。

除了通常的模块，我们还可以发布类似`@akara/my-package`这样的作用域模块，此时我们需要`npm publish --access publish`。这是因为NPM模块分为公共模块和私有模块，通常我们发布的都是公共模块，而发布私有模块是收费的，同时发布作用域模块默认是发布私有模块，因此我们需要显式的制定模块的类型。



发布NPM模块时，`.gitignore`和`.npmignore`中指定的文件不会被发布出去。除此之外我们还可以通过`package.json`的`files`来指定只有哪些文件能被发布。

1. `.gitignore`中的文件不会被发布
2. `.npmignore`中的文件不会被发布
3. `package.json`中的 `files`字段指定哪些文件会被发布

### npm view

查看一个模块的信息

``` shell
npm view <name> # e.g npm view antd
```

### npm version

``` shell
npm version # 查看当前版本
npm version patch # 升级一个补丁版本，同时自动git commit并打上版本号对应的git tag，如v1.0.1
npm version minor # 升级一个小版本，如v1.1.1
npm version major # 升级一个大版本，如v2.0.0
```

### npm audit

``` shell
npm audit # 查看当前项目所有依赖模块的漏洞
npm audit --fix # 更新所有存在漏洞的模块来修复漏洞
```

当我们安装模块时会自动提示当前版本的模块的漏洞，我们也可以通过该命令来查找当前项目所有依赖中可能存在的漏洞

### npm fund

``` shell
npm fund
```

当我们安装模块时会自动提示有多少个模块正在寻找投资/资助，我们也可以通过该命令来查看具体是哪些命令在寻找投资





## package.json

### type

以`.cjs`结尾的文件会被视为`CommonJS`模块，以`.mjs`结尾的文件会被视为`ES`模块，而普通的`.js`文件则会根据`type`字段的不同视为不同的模块，默认不带`type`视为`CommonJS`模块，`type: 'module'`则视为`ES`模块。



### files

对于一些模块而言，用户只需要引用该模块源码构建后的产物，而并不想连源代码也一起安装。这样的模块通常会通过`files`字段来规定哪些模块才会被发布，如`"file": ["dist", "README.md"]`

需要注意的是以下文件永远都会被外部下载：`package.json`、`README`、`CHANGE / CHANGELOG / HISTORY 	`、`LICENSE / LICENCE`、`NOTICE`、`main`字段指向的文件。

### main

用来规定模块的默认入口，默认值为 `index.js`。

```js
const test = require('my-module') // 引入my-module模块的根目录的index.js文件
```

### exports

功能类似`main`，同时存在`exports`和`main`时，`exports`字段的优先级更高

```json
{
    "exports": {
        ".": "./index.js", 
        "./test": "./src/test.js" 
    }
}
```

```js
const test = require('my-module') // ./index.js
const test2 = require('my-module/test') // ./src/test.js
```

可以看到一旦使用了`exports`字段，那么模块的引用规则就和以往有较大的区别，此时我们不再能根据模块的任意路径来引用相对应的文件，只能根据`exports`所指定的映射关系来引用所给定的文件。

`exports`还能够根据导入模块时使用的是 `require`还是 `import`选择不同的导出。

```json
{
    "exports": {
        ".": {
            "require": "./a.js",
            "import": "./b.mjs"
        }
    }
}
```



### bin

如之前说过那样，当我们通过`npm install`安装模块时，会根据该模块`package.json`中的`bin`字段来创建指向指定文件的符号链接

``` json
{
	"bin": {
    "akara": "index.js"
	}
}
```

假设`akara-project`的配置如上，那么全局安装`akara-project`时会创建`/usr/local/bin/akara`符号链接（指向着`/usr/local/lib/node_modules/akara-project/index.js`），所以现在我们可以直接在命令行中输入`akara`来执行对应的`index.js`（当然实际上我们还需要两个小步骤，一是我们需要规定`index.js`这个文件执行的环境，因此需要在`index.js`代码的第一行加上`#!/usr/bin/env node`；二是我们需要通过执行`chmod +x index.js`来给予该文件可执行权限）



如果我们是本地安装而不是全局安装`akara-project`，那么创建的符号链接`akara`会被放在`project/node_modules/.bin`下面，此时无法直接通过在命令行输入`akara`来执行命令，我们有其他的几种方式

1. `./node_modules/.bin/akara`

2. `package.json`的 `script`字段中填写执行方式，如

   ```1
   {
       "script": {
           "run-my-script": "akara"
       }
   }
   ```

3. `npm exec akara`

4. `npx akara`

### script

`npm`除了 `npm ci`、`npm install`等内置脚本，还包括 `hook script`（`pre/post script）`和 `lifecycle script`。

#### pre & Post 

对于一个脚本我们可能想要在其执行之前或之后执行某些操作，此时可以使用 `pre`或 `post`前缀。

```json
{
    "script": {
        "test": "echo \"i'm test\"",
        "pretest": "echo \"在test脚本执行前执行\"",
        "posttest": "echo \"在test脚本执行后执行\""
    }
}
```

#### LifeCycle

`npm`内置了一些生命周期脚本，如`prepare`、`prepack`等

```json
{
    "script": {
        "prepare": "echo \"hello akara\""
    }
}
```

### dependencies

项目的依赖

### devDependencies

项目的开发依赖。如果我们在NPM发布了一个模块A，之后当我们 `npm install A`时会自动安装模块A的依赖，但不会安装模块A的开发依赖。

### peerDependencies

假设存在A库，该库存在一个插件B，那么很明显插件B自身是不依赖于库A的，但是又需要你的项目中存在库A，那么插件B的 `package.json`中就可以通过 `peerDependencies`来指定同级依赖关系。比如插件B只能在1.0版本的A库中起作用，那么 `peerDependencies`可能是 `A@1.0.0`，当你的项目中同时安装了插件B和2.0版本的A库时就会出现警告。



### resolutions

假设我们项目直接依赖`react-router`，而`react-router`内部又依赖`@types/react: '*'`。这意味着当我们安装`react-router`时会自动安装最新版本的`@types/react`，又已知最新版本的`@types/react`（比如`v18`）引入了一些破坏性变更，我们此时希望能够安装更低版本的`@types/react`来避免错误提示，这个时候可以给`package.json`添加`resolutions`字段，并通过`yarn install`重新安装。[Selective dependency resolutions](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/)

``` json
{
  resolutions: {
    '@types/react': '^17.0.0'
  }
}
```







### browser | module

一般 `browser`字段指向 `cjs`或 `umd`模块，`module`字段指向 `es`模块，大多数情况下这两个字段都没什么用处。

在某些情况下，特别是使用 `webpack`打包模块时，当 `webpack`配置的 `target`为 `web`（默认值），会根据模块的 `browser`字段导入模块；通过设置 `target`为 `node`，会根据 `module`字段导入模块。

另外，当 `package.json`不存在对应的入口字段，会根据 `browser -> module -> main`的优先级导入模块。这个优先级是根据配置 `resolve.mainFields`字段指定的，我们可以通过修改该字段来调整优先级：

```js
// webpack.config.js
module.exports = {
    target: 'node', // 默认值web
    resolve: {
        mainFields: ['main', 'module', 'browser'] // 默认值 ['browser', 'module', 'main']
    }
}
```

## package-lock.json

在 `package.json`的 `dependencies`字段中我们经常能看见这种形式的版本号 `"react": "^17.0.2"`、`"xx": "~0.10.0"`，这种写法通常被称为[`semver`表示法](https://github.com/npm/node-semver)，三个数字分别表示主要版本、次要版本、补丁版本。

当我们使用 `npm install <name>`来安装依赖，或者是在已有的项目中使用 `npm update`来更新依赖，都会根据 `semver`规则安装对应版本的模块，也就是说**实际安装版本并不是固定的**。

- `^`：表示只会执行不更改最左边非零数字的更新。比如 `^0.10.0`，意味着我们可以安装（或更新，下同）`0.10.1`等版本，但不能安装 `0.11.0`或更高的版本；又比如 `^1.10.0`，意味着我们可以安装 `1.10.1`、`1.11.0`等版本，但不能安装 `2.0.0`或更高的版本。
- `~`：如果我在比较器中指定了次要版本，那么只允许补丁版本的更新；如果没有指定次要版本，那么可以允许次要版本的更新，所以通常情况 `~`只允许补丁级别的更新。比如 `~1.10.0`的依赖，意味着我们只能安装 `1.10.x`的版本，不能安装 `1.11.0`的版本。

而这也带来了一个新的问题，对于同一个项目在不同时机安装的依赖版本可能不一致，这就带来了相当大的风险和不可控性，特别是当依赖的某个包更新了一个漏洞，那也会影响到我们新构建的代码。

因此高版本`yarn`和`npm`都默认启用了`lock`机制，当我们`npm install <name>`安装依赖或`npm update`更新依赖的时候都会生成`package-lock.json`（`yarn`对应`yarn.lock`），那当其他人`clone`项目并`npm install`时则会根据`package-lock.json`来安装指定版本的模块。



---

不过很明显锁不锁版本都有对应的好处和坏处，所以社区对是否锁版本还存在着一些[争论](https://www.zhihu.com/question/65536076)。

另外，无论是否使用 `lock`机制，都不应该把 `package-lock.json`写入 `.gitignore`中。

如果我们使用 `lock`机制，应该直接把 `package-lock.json`提交进仓库；如果我们不使用 `lock`机制，则应该在 `.npmrc`中写入 `package-lock=false`来关闭 `lock`机制，并把 `package-lock.json`提交到仓库中。[参考](https://www.zhihu.com/question/264560841)





## node_modules

在 `NPM`的早期版本，`node_modules`使用嵌套结构来管理模块之间的依赖关系。而我们的很多模块都又可能依赖于同一个模块，这样的结构可能导致性能的浪费。

```
- A -> B
- C -> B
```

所以在 `NPM@3.x`以后，`node_modules`主要使用扁平结构来管理模块之间的依赖关系。假设我们安装了A和C模块，这两个模块同时依赖于同一个版本的B模块，此时 `node_modules`结构如下。

```
- A
- C
- B
```

不过有的时候，我们安装的模块A和C可能依赖于同一个模块B的不同版本。

1. 假设 `node_modules`存在 `B@1.1.0`。然后我们安装的模块A依赖于 `B@^1.1.0`，即使模块B最新版本已经到了 `1.9.0`，我们也会复用原本已安装的模块。

   ```
   - A
   - B@1.1.0
   ```
2. 假设 `node_modules`存在 `B@1.1.0`。然后我们安装的模块A依赖于 `B@^1.2.0`，则会安装最新的模块（如 `B@1.9.0`）

   ```
   - A -> B@1.9.0 
   - B@1.1.0
   ```




