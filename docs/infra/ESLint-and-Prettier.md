# ESLint And Prettier 
## ESLint

``` shell
npm i eslint -D

npx eslint --init # 创建配置文件
npx eslint index.js # 只输出正确格式的文件内容，不修改源文件
npx eslint indexjs --fix # 自动修复语法或格式错误
```

### 配置文件

`eslint`社区存在诸多第三方配置文件（以`eslint-config-`开头）和插件（以`eslint-plugin-`开头）以供我们使用，我们可以在`extends`和`plugins`字段中引用这些类库，此时我们可以省略对应的前缀。

> 对于作用域模块，规则如下
>
> ``` json
> {
>   "extends": ["@akara/test", "prettier"], // 等于@akara/eslint-config-test eslint-config-prettier
>   "plugins": ["@akara"] // 等于@akara/eslint-plugin
> }
> ```



##### [extends](https://eslint.org/docs/user-guide/configuring/configuration-files#adding-shared-settings)

有几种常见的配置文件可以提供给我们继承。

1. `eslint`核心规则`eslint:recommended`和`eslint:all`
2. `eslint-config-*`导出的配置
3. `eslint-plugin-*`导出的配置

``` json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // @typescript-eslint/eslint-plugin
    "prettier" // eslint-config-prettier
  ]
}
```



##### parser

如同我在`编译器`一节所述，`eslint`默认解析器`espree`并不支持对`TS`代码的解析，我们可以使用`@typescript-eslint/parser`进行替代。

``` bash
npm i --save-dev typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

``` js
module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint"
    ],
};

```

##### parserOptions

解析器的选项，默认为`espree`的选项。当我们使用其他解析器时，解析器选项的属性可能有一些出入。

``` json
{
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
    "ecmaFeature": {
      "jsx": true
    }
  }
}
```

###### ecmaVersion

>  set to 3, 5 (default), 6, 7, 8, 9, 10, 11, or 12 to specify the version of ECMAScript syntax you want to use. You can also set to 2015 (same as 6), 2016 (same as 7), 2017 (same as 8), 2018 (same as 9), 2019 (same as 10), 2020 (same as 11), or 2021 (same as 12) to use the year-based naming. You can also set "latest" to use the most recently supported version.

###### sourceType

> set to `"script"` (default) or `"module"` if your code is in ECMAScript modules.

代码存在`import`或`export`时需要设置为`module`

###### ecmaFeature

>  an object indicating which additional language features you'd like to use:
>
> - `globalReturn` - allow `return` statements in the global scope
> - `impliedStrict` - enable global [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) (if `ecmaVersion` is 5 or greater)
> - `jsx` - enable [JSX](https://facebook.github.io/jsx/)

我们需要先安装`eslint-plugin-react`，再将`JSX`设置为`true`

``` json
{
    "parserOptions": {
        "ecmaFeature": {
            "jsx": true
        }
    },
    "extends": [
        "plugin:react/recommended"
    ],
}
```

> If you do not use a preset you will need to specify individual rules and add extra configuration.
>
> ``` json
> {
>   "parserOptions": {
>     "ecmaFeatures": {
>       "jsx": true
>     }
>   },
>   "plugins": [
>     "react"
>   ],
>   "rules": {
>     // 定制规则
>   }
> }
> ```



##### env

支持不同环境的内置变量

``` json
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  }
}
```

###### browser

支持`window`等浏览器环境变量



###### node

支持`process`等node环境变量



###### commonjs

> CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack).

支持`module`变量



###### es2021

``` json
{
  "env": {
    "es2021": true
  }
}
```

> supporting ES6 syntax is not the same as supporting new ES6 globals (e.g., new types such as `Set`). For ES6 syntax, use `{ "parserOptions": { "ecmaVersion": 6 } }`; for new ES6 global variables, use `{ "env": { "es6": true } }`. `{ "env": { "es6": true } }` enables ES6 syntax automatically, but `{ "parserOptions": { "ecmaVersion": 6 } }` does not enable ES6 globals automatically.

##### globals

指定全局变量

``` json
{
  "globals": {
        "Promise": 'off'
  },
}
```



##### plugins

列出几个常见插件。

###### @typescript-eslint/eslint-plugin

###### eslint-plugin-react

通过`ecmaFeature.JSX`，支持`react`代码提示

###### eslint-plugin-react-hooks

支持`hook`提示，比如提示`useCallback`函数依赖项

###### eslint-plugin-prettier

把`prettier`作为`eslint`的格式化工具

##### rules

定义规则，每个`eslint`规则有三种模式：`off`，`warn`，`error`。分别是：关闭，警告，报错。

``` js
module.exports = {
    "rules": {
        "quotes": ["warn", "double"], // 不是双引号就提醒
        "semi": ["error", "always"] // 不带分号就报错 
    }
}
```



## Prettier

``` shell
npm i prettier -D
prettier filename # 只输出正确格式的文件内容，不修改源文件
prettier filename --check # 检查文件格式是否错误
prettier filename --write # 格式化源文件
```

使用`prettier`并不强制要求存在配置文件，不过为了自定义我们都会创建个配置文件

``` js
// prettier.config.js or .prettierrc.js
module.exports = {
   // 结尾不加分号
   semi: false,
   // 字符串单引号
   singleQuote: true,
   useTabs: false,
   // 四格缩进
   tabWidth: 4,
   // 箭头函数 总是有小括号
   arrowParens: 'always',
   printWidth: 120,
}
```





## ESLint With Prettier

`Prettier`用于实现代码的格式化，而`ESLint`虽然主要功能是代码质量的检查，但也能够实现代码的格式化。如果我们需要同时使用这两个工具，那么就可能要面对两个工具代码格式化的冲突，现在主流的思想是`ESLint`只用来检查代码质量，用`Prettier`实现格式化。

我们通常有两种办法实现这两个工具的整合。

- 方案一：`prettier-eslint`

  这个方案的思路是先使用`prettier`格式化源码，再使用`ESLint --fix`来处理代码。那么这个方案最大的问题就是`Prettier`的格式化规则会被`ESlint`覆盖。

  ``` bash
  npm install -D prettier-eslint prettier-eslint-cli
  npx prettier-eslint index.js
  ```

- 方案二（推荐）：`eslint-config-prettier` + `eslint-plugin-prettier`

  这个方案的思路是使用`eslint-config-prettier`屏蔽`ESLint`的代码格式化功能，让`ESLint`专注于代码质量的检查，同时使用`eslint-plugin-prettier`让`prettier`作为`ESLint`的插件来实现代码的格式化。

  > 这两个工具能够分别单独使用，只是主流都会搭配着使用

  ```bash
  npm install -D eslint-config-prettier eslint-plugin-prettier
  ```

  ``` json
  // .eslintrc.json
  {
      "extends": ["prettier"], // eslint-config-prettier
      "plugins": ["prettier"], //  eslint-plugin-prettier
      "rules": {
          "prettier/prettier": "error" //  eslint-plugin-prettier
      }
  }
  ```

  > `extends`中`prettier`需要放置在最后

  或者我们可以使用`eslint-plugin-prettier`提供的一种便捷写法，效果几乎等同于上述的配置。

  ``` json
  // .eslintrc.json
  {
    "extends": ["plugin:prettier/recommended"]
  }
  ```

  在这之后，我们就可以在`.eslintrc.js`中配置语法规则，在`.prettierrc.js`中配置代码格式化规则了。

  由于我们实际上使用的是`eslint`实现语法检查和格式化（以`prettier`为插件实现），我们在`VSCode`安装`ESLint`扩展也支持**代码提示**和**自动格式化功能**。

  ``` json
  // .vscode/setting.json
  "editor.codeActionsOnSave": {
      "source.fixAll": true,
  },
  ```



## CommitLint

在成熟的项目中我们需要保持`commit message`的整齐和一致，使用`commitlint`可以对其内容进行检查和约束。

``` bash
npm i -D @commitlint/cli @commitlint/config-conventional
```

``` js
// commitlint.config.js
module.exports = {
	extends: ['@commitlint/config-conventional']
}
```

默认情况`commitlint`会对标准输入流进行检查。

``` bash
echo 'chore: nothing' | npx commitlint
```

通常我们会搭配`husky`使用`CommitLint`。

``` js
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
git commit -m 'chore: nothing'
```

常见的提交类型如下

``` json
[
  'build', // 构建相关
  'chore', // 琐事
  'ci', // ci相关
  'docs', // 文档相关
  'feat', // 新特性
  'fix', // 修复bug
  'perf', // 性能相关
  'refactor', // 重构
  'revert', // 回退
  'style', // 代码样式相关
  'test' // 测试相关
]
```





## Husky

当项目中存在`eslint`和`prettier`，开发者只需要安装VSCode插件即可做到对代码错误的**检查**和**自动格式化**，除此之外我们还希望能在代码提交之前做一些**检查**和**自动格式化**，或者是对`commit message`格式进行**检查**，防止意外的提交出现。

事实上`git`自带了`hooks`功能，创建`.git/hook/pre-commit`并编写脚本内容，即可做到在代码提交前执行某些操作。不过由于`.git`文件夹不会被提交进代码仓库，在多人项目协作上这成为了一个痛点，此时我们可以使用`Husky`库来实现`git hook`

``` bash
npm install husky -D
npx husky install # 使用.husky作为git hooks目录
npm set-script prepare "husky install" # 多人项目中默认启用husky
npx husky add .husky/pre-commit "eslint --fix"
npx husky add .husky/commit-msg "commitlint"
```

通常`git hook`的配置都会被放进`.git/hooks`文件夹内部，而`git`已经引入了`core/hooksPath`，即能够让我们指定`hooks`存放的目录。`npx husky install`会在项目创建`.husky`目录来存放`hooks`。

> 老版本的Husky是基于`.huskyrc`或`package.json`进行配置，而现在已经放弃了这种做法 [Why husky has dropped conventional JS config](https://blog.typicode.com/husky-git-hooks-javascript-config/)



## Lint-Staged

通过`Husky`我们能够在提交代码前使用`ESLint`对代码进行检查，但此时我们需要手动指定`ESLint`作用的文件，但其实我们知道我们只想要检查已经`staged`（`git add`）的代码，`Lint-Staged`库可以轻松的实现这个功能。

``` json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": "eslint --cache --fix",
    "*.{js,css,md}": "prettier --write"
  }
}
```













