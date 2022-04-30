# 前端测试

我们通常会使用`console.log(fn())`来测试函数输出是否符合预期，而这种做法有几点缺陷：

1. 不直观。我们需要把实际的输出和内心的预期进行对比，才能知道输出是否正确。
2. 测试用例没有持久化。
3. 测试用例无法脱离浏览器运行。

于是，测试框架出现了。

## 断言

**断言通常指我们期望A和B的值相等或具有某种关系**，否则就会**抛出异常**。比如使用`console.log(fn())`我们就在断言`fn()`的返回值和内心预期值相等。

通常我们会采用专门的断言库，比如Node核心库`assert`，又或者最主流的社区断言库`Chai`。

### Node#assert

``` js
import assert from 'assert'

function fn() { 
    return 100
}
assert.strictEqual(fn(), 100) // 不报错就说明结果正确
assert.strictEqual(fn(), 200) // 抛出异常
```

### Chai

`Chai`支持三种风格的断言，分别是TDD（测试驱动开发）风格的`assert`、`BDD`（行为驱动开发）风格的`expect`、以及`BDD`风格的`should`。

``` js
import {
    assert,
} from 'chai'

function fn() {
    return 100
}
assert.equal(fn(), 100) // TDD风格
```

``` js
import {
    expect,
} from 'chai'

function fn() {
    return 100
}
expect(fn()).to.equal(200) // BDD风格
```

``` js
import {
    should
} from 'chai'

function fn() {
    return 100
}
should()
fn().should.equal(100) // BDD风格
```

## Mocha

`Mocha`是一个较主流的测试框架，它本身不具备断言的功能，因此通常和`Chai`搭配使用。默认的测试文件放置在项目根目录的`test`文件夹下面。

``` bash
npm i mocha -D
npx mocha
```

``` js
// test/index.js
import { expect } from 'chai'

describe('测试用例组', () => {
    it('test one', () => {
       // 通过用例
    })
    it('test two', () => {
        throw new Error('233') // 未通过用例
    })

    it('test three', () => {
        expect(100).to.equal(200) // 未通过用例
    })
})
```

## Jest

`Jest`是`Facebook`出品的主流测试框架，`Create-React-App`内置`Jest`作为测试框架，`Jest`本身拥有断言的能力，同时`Jest`框架内部还集成了`jsdom`环境，我们只需要将`Jest`配置项`testEnvironment`从`node`改为`jsdom`即可在单元测试中操作DOM。

默认的测试文件为根目录文件夹`__tests__`内部的文件和`*.test.js`后缀的文件。

``` bash
npm i jest -D
npx jest
# or
npx jest --watch 
```

``` js
// __tests__/index.js
test('1 + 1 equal 2', () => { // test 也可以写成 it
    expect(1 + 1).toBe(2) // Jest自带expect断言
})

test('空测试用例', () => {
    // 通过用例
})

describe('', () => { 
    it('测试用例1', () => {
        expect(1 + 1).toBe(2)
    })

    it('测试用例2', () => {
        expect(10 / 2).toBe(5)
    })
})
```

### 配置文件

``` js
// jest.config.js 
module.exports = {
      testMatch: [ // 默认值
        "**/__tests__/**/*.[jt]s?(x)", 
        "**/?(*.)+(spec|test).[tj]s?(x)"
      ],
      testEnvironment: "node", // 默认值node，可以改成jsdom来操作DOM
}
```

我们可以通过修改配置信息来调整测试文件的位置，或者是改成`jsdom`环境。

``` js
module.exports = {
    testMatch: ['<rootDir>/test/**/*.js'],
    testEnvironment: 'jsdom'
}
```

``` js
it('测试DOM', () => {
    document.body.innerHTML = `<div class="test">akara</div>`
    const el = document.querySelector('.test')
    expect(el.innerHTML).toBe('akara')
})
```

### Matchers

``` js
// 等值判断
toBe
toEqual // 用于对比两个对象的所有属性
toBeUndefined
toBeNull

// 包含判断
toHaveProperty
toContain
toMatch

// 逻辑判断
toBeTruthy // 1 '1' 也是 truthy
toBeFalsy // 0 '' 也是 falsy
toBeGreaterThan
toBeLessThan

// 取反 .not.
expect(1 + 1).not.toBe(3)
```

### 异步测试

``` js
it('测试异步', () => {
    setTimeout(() => {
        expect(1 + 1).toBe(3)
    }, 1000)
})
```

通常当我们的测试函数在调用结束时也没有抛出异常就代表着通过了测试用例。上述代码在函数调用结束时还没有调用`expect`断言函数来抛出异常，因此通过了测试用例，而这与我们的预期不符。

为此在异步测试的场合，我们需要**告知一个测试用例何时结束**，通常我们有几种手段：手动调用`done`函数、函数返回`Promise`、使用`async/await`。

``` js
// 手动调用done函数
it('测试异步', (done) => {
    setTimeout(() => {
        try {
            expect(1 + 1).toBe(3)
            done() 
        } catch(e) {
            done(e)
        }
    }, 1000)
})
```

``` js
// 函数返回Promise
it('Promise test 1', () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                expect(1 + 1).toBe(3)
                resolve()
            } catch(e) {
                reject(e)
            }
        }, 1000)
    })
})

function sleep() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000)
    })
}

it('Promise test 1', () => {
    return sleep.then(() => {
        expect(1 + 1).toBe(3) // 异常会让返回的promise改变状态，从而结束测试用例
    })
})
```

``` js
// async + await
function sleep() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000)
    })
}

it('test', async () => {
    await sleep()
    expect(1 + 1).toBe(3)
})
```

### Setup

多个单元测试可能需要相同的设置，我们可以将这些设置放在一个单独的文件中，并在`Jest`的`setupFilesAfterEnv`配置项中给出文件的位置。

``` js
// jest.config.js
module.exports = {
    setupFilesAfterEnv: ['./jest.setup.js']
}
```

``` js
// jest.setup.js
beforeAll(() => {
    // 测试开始前调用
})

beforeEach(() => {
    // 每个测试用例前调用
})

afterAll(() => {
    // 测试结束后调用
})
```

事实上在`Create-React-App`中默认的`setup`文件位于`src/setupTests.js`。该文件默认只有一行代码

``` js
// src/setupTests.js
import '@testing-library/jest-dom';
```

`@testing-library/jest-dom`提供了一些`matcher`方法来辅助我们进行断言。





### Mock Function

``` js
test('mock fn', () => {
    const arr = [1, 2, 3]
    const fn = jest.fn()
    arr.forEach(fn)
    expect(fn.mock.calls.length).toBe(3) 
    expect(fn.mock.calls[0][0]).toBe(1)
    expect(fn.mock.calls[1][0]).toBe(2)
    expect(fn.mock.calls[2][0]).toBe(3)
})

test('mock fn2', () => {
    const arr = [1, 2, 3]
    const fn = jest.fn(x => x * x)
    arr.forEach(fn)
    expect(fn.mock.calls.length).toBe(3) 
    expect(fn.mock.results[0].value).toBe(1)
    expect(fn.mock.results[1].value).toBe(4)
    expect(fn.mock.results[2].value).toBe(9)
})
```

以上代码的`jest.fn(x => x * x)`算是`mock`了返回值，还有其他方式可以用来`mock`返回值：

``` js
// 前两个是Once，最后的不是
const fn = jest.fn()
fn.mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValue(100) 
const result = [1, 1, 1, 1].map(fn)
expect(result).toEqual([1, 2, 100, 100])
```

### Mock Module

假设我们的目录结构如下

- `getUser.js`
- `test`
  - `index.js`
- `node_modules`
- `package.json`

其中`getUser`是我们待测试的文件：

``` js
// getUser.js
const axios = require('axios')

module.exports = async function getUser() {
    const data = await axios.get('localhost:3000/getUsers') // {name: 'akara'}
    return data
}
```

测试代码如下：

``` js
const getUser = require('../getUser')

it('模块测试', () => {
    return getUser().then(data => expect(data).toEqual({name: 'akara'}))
})
```

如果要进行代码测试，我们必须要运行后端服务器；并且测试过程中发请求会让测试流程更长且脆弱。因此我们要来模拟`axios`这个模块。

为了模拟`axios`，已知`axios`安装在`node_modules`里，因此我们要在`node_modules`的同级目录，也就是项目根目录中新建文件夹`__mocks__`，并在该文件夹中创建和模块同名的文件`axios.js`：

``` js
// __mocks__/axios.js
module.exports = {
    get() {
         return new Promise((resolve, reject) => {
            resolve({name: 'akara'}) 
        })
    }
}
```

除此之外，我们也需要稍微修改一下测试用例的代码：

``` js
const getUser = require('../getUser')
jest.mock('axios') // 只新加了这个代码

it('模块测试', () => {
    return getUser().then(data => expect(data).toEqual({name: 'akara'}))
})
```

加上了`jest.mock('axios')`后，测试代码中需要使用`axios`时，并不是去找真正的`axios`模块，而是找到了`__mocks__`下的那个我们写的模块。

**模拟用户模块**

除了`axios`这种安装在`node_modules`的Node模块，我们也可以模拟自己写的用户模块。

比如我们需要模拟`lib/ajax.js`这个模块，只需要在`lib`文件夹下面创建`__mocks__`，并在`__mocks__`下新建`ajax.js`即可。



### Mock 静态资源

我们的React组件代码通常如下：

``` jsx
import React from 'react'
import './index.css'

export default function App() {
    return <div>hello world</div>
}
```

这里的`import './index.css'`能使用主要是依靠了`webpack`的`loader`。

因此，当我们直接使用`jest`来测试这个文件的时候，就会出现问题。因为`jest`是和`webpack`独立的。

这个时候，我们可以来Mock这个`import './index.css'`

``` js
// jest.config.js
module.exports = {
    "moduleNameMapper": {
        "\\.css$": "<rootDir>/__mocks__/styleMock.js"
    }
}
```

然后在项目根目录的`__mocks__`下新建`styleMock.js`即可

``` js
module.exports = {}
```



## 组件测试

组件测试的重点在于我们需要能够在Node环境下执行对DOM元素的操作，为此我们通常会使用第三方库`jsdom`和`global-jsdom`在Node环境中引入DOM。

`Jest`框架内部继承了`jsdom`，我们只需要将`Jest`配置项`testEnvironment`从`node`改为`jsdom`即可在单元测试中操作DOM。

``` js
test('Jest内部集成了JSDOM', () => {
    const el = document.createElement('div')
    el.innerHTML = 'akara'
    expect(el.innerHTML).toBe('akara')
})
```

### jsdom

``` js
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const container = new JSDOM(`
    <html>
        <div>akara</div>
    </html>
`) 
console.log(container.window.document.querySelector('div').innerHTML);
```

### global-jsdom

``` bash
npm i -D jsdom global-jsdom
```

``` js
require('global-jsdom/register')

const el = document.createElement('div')
el.innerHTML = 'akara'
console.log(el);
```



### @testing-library

我们可以使用`@testing-library`来实现对DOM或组件的测试，`@testing-library/dom`是个用来实现DOM测试的**核心库**，我们还可以使用封装了`@testing-library/dom`的`@testing-library/react`或`@testing-library/vue`等库来实现对相关组件的测试。

事实上`Create-React-App`创建的项目默认就使用了`Jest`和`@testing-library/react`来提供组件测试的功能。

### @testing-library/dom

作为核心库，`@testing-library/dom`提供了一系列有用的工具来帮助我们进行DOM元素的测试。

``` js
const { 
    getByText,
    screen,
    fireEvent,
    waitfor,
} = require('@testing-library/dom')

test('测试', () => {
    const container = document.createElement('div')
    container.innerHTML = `<div>aka</div>`
    const el = getByText(container, 'akara')
    // 也可以使用screen，但需要先将DOM元素添加进body中
    // document.body.appendChild(container)
    // const el = screen.getByText('aka')
    el.addEventListener('click', function(e) {
        e.target.innerHTML = 'bkb'
    })
    fireEvent.click(el)
    expect(el.innerHTML).toBe('bkb')
})
```



### @testing-library/react

``` js
// 默认的 App.test.js
import { 
	render, 
    screen,
    fireEvent,
    waitfor
} from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  	render(<App />);
  	const linkElement = screen.getByText(/learn react/i);
  	expect(linkElement).toBeInTheDocument();
});
```

## Mock Service Worker

`NSW`自称是下一代的`API Mocking`工具，在浏览器环境中可以`Mock`后端接口，或者也可以在`Jest`这样的Node环境`Mock`后端接口。

在浏览器环境下`NSW`实际上会创建一个`Service Worker`，而在Node环境下`NSW`会创建一个服务器来实现相关的功能。

> Jest的Mock Module也能够实现对后端接口的Mock，使用Mock Module还是NSW就是个见仁见智的问题了。



### 浏览器环境Mock

[建议看官网](https://mswjs.io/docs/getting-started/integrate/browser)

### Node环境Mock

``` js
// src/setupTests.js
const { rest } = require('msw')
const { setupServer } = require('msw/node')

const server = setupServer(
    rest.get('http://localhost:3000/test', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                name: 'akara'
            })
        )
    })
)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
```

``` js
// index.test.js
const fetch = require('node-fetch')

test('测试', async () => {
    const data = await fetch('http://localhost:3000/test').then(res => res.json())
    expect(data.name).toBe('akara')
})
```











## 测试覆盖率

> todo 伊斯坦布尔


