---
sidebarDepth: 4
---
## React

### 基础

##### JSX

``` jsx
const element = <h1>hello, world!</h1>
```

以上的JSX代码会被Babel编译成`React.createElement`函数并调用

``` jsx
const element = React.createElement('h1', null, 'hello, world')
```

由此可见当我们写JSX代码时必须提前引入React库。



##### 组件

组件名必须大写，因为小写会被当成HTML标签。

如`<app />`会被编译成`React.createElement('app')`；而`<App />`会被编译成`React.createElement(App)`



React的组件分为**函数组件**和**class组件**

**函数组件**没有内部的**状态**，也没有**生命周期**。

``` javascript
// 函数组件
function Hello(props) {
    return (
        <div>
        	// 函数组件使用props
            hello world {props.name}
        </div>
    )
}
```

**Class组件**则拥有**状态**，**生命周期**

``` js
class Count extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
            	// class组件使用props
                {this.props.count}
            </div>
        )
    }
}


class App extends React.Component {
    constructor(props) {
        super(props)
        // 根组件的状态
        this.state = {
            count: 0,
            name: 'akara'
        }
    }

    render() {
        return (
            <div>
                {this.state.count}
                <button onClick={this.handlerClick}>click me</button>
				// 根组件传值给子组件的props
                <Hello name={this.state.name}/>
                <Count count={this.state.count}/>
            </div>
        )
    }

    // 根组件的方法，已绑定this
    handlerClick = () => {
        this.setState({
            count: this.state.count + 1
        })
    }


}
```

##### 事件处理

传统的HTML使用的纯小写`onclick`，React使用的驼峰式`onClick`

``` html
// html
<button onclick='func'></button>
```

``` jsx
// react
<button onClick={activateLasers}>
	Activate Lasers
</button>
```

传统的HTML可以通过`return false`来阻止默认行为，React不行，必须使用`event.preventDefault`

``` html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

``` javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

React中的e为**合成事件**，因此无需担心浏览器的兼容性问题。

当我们使用`onClick={this.handleClick}`时，我们需要给handleClick绑定this。

1. ``` javascript
   constructor() {
       this.handlerClick = this.handlerClick.bind(this)
   }
   ```

2. 使用箭头函数

   ``` jsx
    <button onClick={(e) => this.handleClick(e)}>
       Click me
     </button>
   ```

3. ``` javascript
   // 实验性语法
   // Create-React-App 默认支持
   class Btn extends React.component {
       handlerClick = (e) => {
           console.log(this)
       }

       render() {
           return (
           	 <button onClick={this.handlerClick}>
                   Click me
                </button>
           )
       }
   }
   ```

##### [组件生命周期](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

###### 挂载

- **constructor()**
- static getDerivedStateFromProps()
- **render()**
- **componetDidMount()**

###### 更新

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- **render()**
- getSnapshotBeforeUpdate()
- **componetDidUpdate()**

###### 卸载

- **componentWillUnmount()**

##### setState

**不要直接修改State**

``` javascript
// Wrong
// 此代码不会重新渲染组件
this.state.comment = 'Hello';
```

而是应该使用`setState()`

``` javascript
// Correct
this.setState({comment: 'hello'})
```

**State的更新可能/通常是异步的**

``` javascript
class App ..{
    ..() {
        this.state = {
            count: 0
        }
    }

    ..() {
        this.setState({
        	count: 1
    	})
        console.log(this.state.count) // 输出0
    }
}
```

想要获取修改后的值，我们可以传一个回调函数给setState

``` javascript
this.setState({
    count: 1
}, () => {
    console.log(this.state.count) // 输出1
})
```

如果setState依赖于之前的state，如

``` javascript
this.setState({
    count: 1
}, () => {
    console.log(this.state.count);
})

this.setState({
    count: this.state.count + 1
})
```

由于setState是异步的，那么第二个setState中获取到的`this.state.count`为初始的0

为了解决这个问题，setState的参数可以设置为函数

``` javascript
this.setState({
    count: 1
}, () => {
    console.log(this.state.count);
})

this.setState((state, props) => {
    return {
        count: state.count + 1
    }
})
```



**setState何时是异步的**

一句话描述，在**合成事件**和**组件的生命周期**中`setState`是异步的；在**原生事件**和**定时器**中`setState`是同步的。

React内部维护了一个标识`isBatchingUpdates`，当这个值为`true`表示把setState缓存进队列，最后进行批量更新；当这个值为`false`表示直接进行更新。

**合成事件**和**组件的生命周期**中，会把`isBatchingUpdates`设置为true

**原生事件**和**定时器**中，会把`isBatchingUpdates`设置为false



当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state。



##### 条件渲染

&&运算符

``` jsx
function App(props) {
    return (
    	<div>
        	{ props.count > 0 &&
            	<span>hello world</span>
            }
        </div>
    )
}
```

三目运算符

``` javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

阻止组件渲染

``` javascript
function App(props) {
    if(props.flag) return null
    ...
}
```

##### 列表渲染

``` javascript
{
    props.todos.map((todo) => {
        return <Todo todo={todo} key={todo.id}/>
    })
}
```

##### 表单

React把`input`元素分为**受控组件**和**非受控组件**，受控组件的意思是`input`元素的内部值完全由我们的`state`控制。

比如在`input`中，我们可以使用`value`或`defaultValue`，但不能同时使用这两个。使用前者时为受控组件，使用后者时为非受控组件。

``` jsx
// 受控组件
handleChange = (e) => {
    this.setState({
        name: e.target.value.toUpperCase()
    })
}

render() {
    return <input type="text" value={name} onChange={this.handleChange}/>
}
```



##### Refs

现代框架的原则是不直接操作DOM，不过在某些特定情况我们希望打破该原则，比如当我们希望管理输入框的焦点，这个时候我们可以使用`ref`来获取对应的DOM元素。

``` javascript
class App extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    handleClick = () => {
        this.myRef.current.focus()
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.myRef} />
                <button onClick={this.handleClick}>点我</button>
            </div>
        )
    }
}
```

###### forwardRef

正常函数组件不能被分配`refs`，比如以下代码会报错。

``` jsx
const FancyButton = () => <button>aka</button>

<FancyButton ref={myRef}></FancyButton>
```

此时可以使用`forwardRef`来把`refs`向下传递。

``` jsx
const FancyButton = React.forwardRef((props, ref) => {
    return <button ref={ref}>aka</button>
})

<FancyButton ref={myRef}></FancyButton>
```









##### 组件通信

###### 父子组件通信

父组件通过props传递数据给子组件。

父组件通过props把自己的函数传递给子组件，子组件内部可直接调用，实现子组件向父组件通信。



``` js
class Parent extends React.Component {
    state = {
        name: 'akara'
    }

	obj = {
        user: 'aaa',
        psw: 123456
    }
    render() {
        return (
        	<Child p1={this} p2={this.state} p3={this.obj}/> // 用来测试所以放了三个prop..
        )
    }
}

class Child extends React.Component {
    // ...
}
```

父组件可以通过Props传值给子组件使用，子组件后拿到Props后**可以直接操作父组件的数据**，但此时即使修改了父组件的数据也**不会触发父组件的重新渲染**。

``` js
// 子组件中修改props，父组件的obj.user会被修改，但不会重渲染
this.props.p2.name = 'bbb'
```

所以在子组件想**修改父组件数据的同时触发父组件的渲染**，应该用下面这种常用的方法。

``` jsx
// 父组件
class Parent extends React.Component {
	handleChange = () => {
        this.setState({name: 'bbb'})
    }
    render() {
        return (
            <Child p1={this} p2={this.state} p3={this.obj} handleChange={this.handleChange}/>
        )
    }
}

// 子组件
this.props.handleChange()
```

> 一个组件什么时候会重新渲染？基本只有两种情况，一个是通过调用setState修改state时会重新渲染；还有一个是当父组件重新渲染时（如果子组件是纯组件则还需要浅对比一次props，如果前后浅对比发生了变化，则重新渲染）





> 来观察一个代码例子。这里把state作为props传下去，并通过调用了this.setState。实际上这个this.state的引用会被改变！所以实际上哪怕Child组件是纯组件也会重新渲染，因为props.p 前后的引用不一致了！！！
>
> 类似于
>
> this.state = Object.assign(this.state, {name: 'aaa'}) 
>
> 一个要点是this.state被重新赋值了，另一个要点是Object.assign的浅合并



``` js
state = {
    name: 'aaa'
}

this.setState({name: 'aaa'}) // this.state重新被赋值，所以会重新渲染

<Child p={this.state} /> 
    
// -------- 分割 -------
state = {
    o: {
        name: 'aaa'
    }
}

this.setState({o: {name: 'aaa'}}) // 浅合并，this.state.o得到新的引用，所以也会重新渲染 
<Child p={this.state.o} /> 
```

> 另外，如果父组件只是改了要传给子组件的值，但父组件没有重新渲染时，此时是不符合上面所说的第二个条件，因此子组件并不会重新渲染（不过子组件拿到的props确实发生了变化，毕竟引用类型）。比如：

``` jsx
// 父组件
// 子组件通过props handleChange修改父组件的实例数据（不是state数据），没有触发父组件的重渲染
class Parent extends React.Component {
    obj = {
        user: 'akara'
    }
	handleChange = () => {
        this.obj.user 
    }
    render() {
        return (
            <Child p1={this} p2={this.state} p3={this.obj} handleChange={this.handleChange}/>
        )
    }
}

// 子组件
this.props.handleChange()
```









###### 非父子组件通信

可以通过`events`实现发布-订阅。也可以借助于Context。



复杂的情况可以考虑使用Redux。



##### Context

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

> 借用官方代码说明，偷个懒。
>

``` javascript
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

##### Fragment

``` js
function App () {
    return (
        <table>
            <tr>
                <Todos />
            </tr>
        </table>
    )
}

function Todos() {
    return (
        <React.Fragment>
            <td>111</td>
            <td>222</td>
            <td>333</td>
        </React.Fragment>
    )
}
```

可以使用短语法：

``` js
function Todos() {
    return (
        <>
            <td>111</td>
            <td>222</td>
            <td>333</td>
        </>
    )
}
```



### 状态逻辑复用

通常有三种方式

1. 高阶组件（HOC）
2. Render props
3. Hook



##### 高阶组件

``` js
function App () {
    const MouseWithCat = withMouse(Cat)
    return (
        <MouseWithCat />
    )
}

function Cat (props) {
    let {x, y} = props.mouse
    x += 20
    y += 20
    return (
        <img src='https://messiahhh.github.io/blog/logo.png' style={{position: 'absolute', left: x , top: y, width: '40px', height: '40px'}}/>
    )
}

function withMouse(WrappedComponent) {
    return function () {
        let [point, setPoint] = useState({
            x: 0,
            y: 0,
        })

        const move = (e) => {
            setPoint({
                x: e.clientX,
                y: e.clientY
            })
        }

        return (
            <div style={{height: '100vh'}} onMouseMove={move}>
                鼠标的位置：{ point.x } , { point.y }
                <WrappedComponent mouse={point} />
            </div>
        )
    }
}
```

##### Render Props

``` js
function App () {
    return (
        <Mouse render={point =>
            <Cat mouse={point} />
        }/>
    )
}

function Cat (props) {
    let {x, y} = props.mouse
    x += 20
    y += 20
    return (
        <img src='https://messiahhh.github.io/blog/logo.png' style={{position: 'absolute', left: x , top: y, width: '40px', height: '40px'}}/>
    )
}


function Mouse(props) {
    let [point, setPoint] = useState({
        x: 0,
        y: 0,
    })

    const move = (e) => {
        setPoint({
            x: e.clientX,
            y: e.clientY
        })
    }

    return (
        <div style={{height: '100vh'}} onMouseMove={move}>
            鼠标的位置：{ point.x } , { point.y }
            {props.render(point)}
        </div>
    )
}
```

##### Hook

在下一节重点介绍。





### Hook

Hook 是一个特殊的函数，它可以让你“钩入” React 的特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 class组件的特性。

##### useState

``` javascript
import React, { useState } from 'react'
function example(props) {
    let [count, setCount] = useState(0) // 初始值0
    return (
    	<div>
        	{ count }
            <button onClick={() => setCount(count + 1)}>
            	Click me
          	</button>
        </div>
    )
}
```

##### useEffect

*Effect Hook* 可以让你在函数组件中执行副作用操作

``` javascript
import React, {
    useState,
    useEffect,
} from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

`useEffect` 会在每次渲染后都执行，包括初次渲染和每次数据更新之后。

`useEffect`可以返回一个函数来清除副作用

``` javascript
useEffect(() => {
    // 运行副作用
    ChatAPI.subscribe()
    // 清除副作用
    return () => {
        ChatAPI.unsubscribe()
    }
})
```

组件挂载时，运行副作用（effect）。

组件更新时，先清除上一个effect，再运行下一个effect

组件卸载时，清除最后一个effect

``` javascript
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

``` javascript
// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // 运行第一个 effect

// Update with { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // 清除上一个 effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // 运行下一个 effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // 清除上一个 effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // 运行下一个 effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // 清除最后一个 effect
```

##### useRef

``` javascript
import React, { useRef } from 'react'

function App(props) {
    let refs = useRef(null)
    return (
    	<input ref={refs}>
    )
}
```

##### useReducer

简化版本如下

```js
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

我们可以这样使用

``` js
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}

function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        text: action.text,
        completed: false
      }];
    // ... other actions ...
    default:
      return state;
  }
}
```

##### useImperativeHandle

这个Hook通常和`forwardRef`一起使用，二者的搭配常见于各类组件库当中。

`forwardRef`可以向外界暴露DOM元素，而`useImperativeHandle`可以限制我们只能访问哪些方法。

比如以下代码，我们可以获取到输入框，却被限制了只能使用`focus`来控制焦点。

``` js
// forwardRef + useImperativeHandle
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

以下是单独使用`forwardRef`时的代码结构

``` js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));
```

##### useMemo 与 useCallback

Vue和React有一个比较明显的差异。

由于Vue使用了对数据的劫持，知道具体数据的变化。因此当父组件数据改变，而子组件数据没有改变时，只有父组件会重新渲染。

而React的方式很粗暴，只要父组件的数据改变，强制会让子组件也重新渲染，很多时候这不是我们想要的结果。

 

当然，React提供了解决方式。

首先，React中的类组件分React.Component和React.PureComponent，而类组件都是具有shouldComponentUpdate这个方法的。

对于普通的类组件，这个方法总是返回true。而对于PureComponent，React会浅对比该组件的前后state和props，如果没有变化，则不会重新渲染组件。

而对于函数组件来说，默认情况也是会重新渲染的，我们可以通过React.memo包裹函数组件来实现类似PureComponent的效果。

总的来说，类组件我们可以使用PureComponent，函数组件我们可以使用React.memo来提高性能。

 

接下来聊一下useMemo和useCallback

什么是useMemo，这是个类似Vue中计算属性的概念，相对来说比较好理解。

``` js
const revertMsg = useMemo(() => msg.split('').reverse().join(''), [msg])
```

而useCallback可能稍微难理解一点，首先我们需要搞清楚为什么需要这个hook，我用代码举个例子。
``` jsx
const Child = (props) => {
   useEffect(() => {
       console.log('子组件渲染');
  })
   return (
       <div>
           <div>子组件</div>
           <button onClick={props.onClick}>子组件按钮</button>
       </div>
  )
}

const MemoChild = React.memo(Child)

const Father = () => {
   const [count, setCount] = useState(0)
   return (
       <div>
           <span>父组件</span>
           <span>计数器:{count}</span>
           <button onClick={() => setCount(count + 1)}>父组件按钮</button>
           <MemoChild onClick={() => setCount(count + 1)}/>
       </div>
  )
}
```
在这个代码中，即使我们使用了React.memo包括子组件，当父组件的count数据变化时，子组件也会重新渲染。

问题其实是出在`<MemoChild onClick={() => setCount(count + 1)}/>`

总的来说，每次父组件重新渲染时，传给子组件的props的地址就发生了变化（注：也就是说只要是引用类型，都会存在这个问题），因此子组件也会重新渲染。

当然，换成以下写法也是行不通的，每次渲染，add函数的地址都会发生变化。
``` jsx
const Father = () => {
// ...
   function add() {
       setCount(count + 1)
  }
   // ...
   <MemoChild onClick={add}/>
}
```
作为对比，类组件中是怎样的场景？

``` jsx
class Father extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           count: 0
      }
       this.add = this.add.bind(this)
  }

   add() {
       this.setState((state) => ({
           count: state.count + 1
      }))
  }
   
   render() {
       return (
           <div>
               <span>父组件</span>
               <span>计数器:{this.state.count}</span>
               <button onClick={this.add}>父组件按钮</button>
               <MemoChild onClick={this.add}/>
           </div>
      )
  }
}
```
可以看出，在类组件中，组件的重新渲染不会影响add，因此不会影响子组件。

所以我们需要的是，在函数组件中保存某个函数的地址，可以立刻联想到hook

方法一：使用useState来保存函数，十分简单粗暴，但感觉很有用
``` jsx
const [cb, setCb] = useState(() => () => setCount(count => count + 1))

<MemoChild onClick={cb}/>
```
注：useState传入函数的时候，获取的是它的返回值，所以用了两个箭头函数

方法二（推荐）：我们自然可以使用官方自带的useCallback

``` jsx
const cb = useCallback(() => {
   setCount(count => count + 1)
}, [])

<MemoChild onClick={cb}/>
```

方法三（不推荐，只是一个思路）：我们甚至可以使用useMemo来实现

``` jsx
const cb = useMemo(() => {
   return () => setCount(count => count + 1)
}, [])

<MemoChild onClick={cb}/>
```

注：useEffect，useMemo和useCallback的第二个参数都是数组，用来存放依赖。

而在本例中，因为我们保存的是函数，它的地址无需变化，因此我传了一个空数组。

官方文档: useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

 

其实useCallback的作用应该不局限与此，但这个hook确实可以用来方便的处理类似的问题。



##### 其他Hook

如react-redux提供的`useSelector`，`useDispatch`等

如react-router提供的`useParams`, `useRouteMatch`,  `useLocation`等



##### Hook的闭包陷阱

在学习Hook的过程中，我们可能会听到这样的名词：“闭包陷阱”。那么什么是闭包陷阱呢，我们可以看一下以下两个代码的例子。

``` js
// 测试代码1
export default function Test1() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        setInterval(() => {
            console.log(count)
        }, 1000)
    }, []) // 空数组

    return (
        <div>
            {count}
            <button onClick={() => setCount(10)}>点我</button>
        </div>
    )
}

// 测试代码2
export default function Test2() {
    const [count, setCount] = useState(0)
    const fn = useCallback(() => {
        console.log(count)
    }, []) // 空数组
    return (
        <div>
            {count}
            <button onClick={() => setCount(100)}>点我</button>
            <button onClick={fn}>输出</button> // 输出的是0而不是100
        </div>
    )
}
```

首先看第一个例子，看起来很简单。组件挂载后运行一个定时器周期输出`count`的值。当我们点击按钮后，`count`从0变成100，这时候定时器输出的却依然是0而不是100。

再看第二个例子。我们通过`useCallback`创建一个函数，这个函数的作用是输出`count`的值。当我们点击按钮后，`count`从0变成100，这时候执行之前的函数，输出的却也是0而不是100。



简单解释一下。

首先每次操作`count`之后，函数组件都会重新调用一次来渲染页面，这是关键的地方。

对于第一个例子，函数组件第一次调用时创建一个定时器，这个定时器引用了当前函数作用域的`count`变量。因此当函数第二次被调用时，第一个函数作用域下的定时器输出了第一个函数作用域的变量`count`的值，也就是0。

对于第二个例子，函数组件第一次调用时通过`useCallback`创建了一个函数`fn`，这个函数`fn`引用了第一个函数作用域下的`count`变量，由于依赖的是空数组（或者说不依赖于其他值），当函数第二次被调用时，并不会创建一个新的函数`fn`，而是得到一个引用和`fn`相同的函数。所以，在第二个函数作用域下的函数`fn`，引用和第一个函数作用域的`fn`是相同的，所以最后输出的结果也是第一个函数作用域下的`count`，也就是0。



那么想要解决以上问题，只需要让`useCallback`创建的函数依赖某个值即可。

``` js
const fn = useCallback(() => {
    console.log(count)
}, [count]) 
```

这样子，当函数组件第二次被调用后，根据对于前后的依赖值`count`，发现`count`发现变化了，这时候就会重新创建一个新的函数`fn`，此时的函数`fn`的引用和第一次创建的`fn`的引用是不同的。因此这次的函数`fn`所引用的变量`count`，是第二个函数作用域的变量`count`，也就是100。



以前有聊过`useCallback`的作用，通常函数组件每次调用都会生成一个新的作用域，所以可能会经常重复的销毁并生成新的内部函数，造成浪费。`useCallback`允许我们，即使函数组件重新调用，我们也可以得到引用相同的内部函数，除了不会浪费性能这点外，因为引用不同，即使内部函数作为`props`传递给子组件，子组件也不会重新渲染。



但我们也可以看到，为了解决以上的“闭包陷阱”的问题，我们实际上在每次函数组件重新调用之后，都重新创建了内部函数，而`useCallback`最初的理念就是避免这种情况。

在`react`的官方文档中，确实提供了一种方式来解决类似的问题，它所使用的是`useRef`，其实原理很简单。

``` js
function Test3() {
  const [count, setCount] = useState(0);
  const Ref = useRef();

  useEffect(() => {
    Ref.current = count; 
  });

  const fn = useCallback(() => {
    const currentCount = Ref.current; 
    console.log(currentCount);
  }, [Ref]); // 

  return (
    <>
      { count }
      <button onClick={() => setCount(100)}>点我</button>
      <button onClick={fn}>输出</button>
    </>
  );
}
```



而在`ahooks`也提供了一个`usePersistFn`提供给我们使用。

``` js
export type noop = (...args: any[]) => any;

function usePersistFn<T extends noop>(fn: T) {
  const ref = useRef<any>(() => {
    throw new Error('Cannot call function while rendering.');
  });

  ref.current = fn;

  const persistFn = useCallback(((...args) => ref.current(...args)) as T, [ref]);

  return persistFn;
}

// 使用
const [count, setCount] = useState(0);
const showCountPersistFn = usePersistFn(() => {
message.info(`Current count is ${count}`);
});
```

本质是`ref`的`current`不断被赋予新的函数`fn`，所以可以拿到新的函数作用域下的值。



参考链接：

[React Hook原理](https://github.com/brickspert/blog/issues/26)

[React useEffect的陷阱](https://zhuanlan.zhihu.com/p/84697185)











### 底层原理

##### Fiber架构

React在它的V16版本推出了Fiber架构，在弄清楚什么是Fiber之前，我们应该先了解为什么需要Fiber。

首先，浏览器是多线程的，这些线程包括JS引擎线程（主线程），以及GUI渲染线程，定时器线程，事件线程等工作线程。其中，JS引擎线程和GUI渲染线程是互斥的。又因为绝大多数的浏览器页面的刷新频率取决于显示器的刷新频率，即每16.6毫秒就会通过GUI渲染引擎刷新一次。所以，如果JS引擎线程一次性执行了一个长时间（大于16.6毫秒）的同步任务，就可能出现掉帧的情况，影响用户的体验。

而在旧版本的React中，对于一个庞大的组件，无论是组件的创建还是更新都可能需要较长的时间。而Fiber的思路是将原本耗时较长的同步任务分片为多个任务单元，执行完一个任务单元后可以保存当前的状态，切换到GUI渲染线程去刷新页面，接下来再回到主线程并从上个断点继续执行任务。

我的个人体会，React中的Fiber（纤程）类似或者说就是Coroutine（协程）。ES6的Generator本身也算是协程的一种实现，或者说是状态机，通过它能够得到一个可以暂停的函数任务；而React中的Fiber，将原本耗时很长的同步任务分成多个耗时短的分片，从而实现了浏览器中互斥的主线程与GUI渲染线程之间的调度。

除此之外，对于每一个Fiber的同步任务来说，都拥有一个优先级（总共定义了6种优先级）。

当主线程刚执行完一个任务A的一个分片，若此时出现了一个优先级更高的任务B，React就可能会把任务A废弃掉，待之后重新执行一次任务A。

为什么这里要加一个可能，这是因为对于使用了Fiber的React来说，组件可以分为两个阶段，分别是“Render/Reconciliation phase”和"Commit phase"，可以在官方的生命周期图谱看到具体的信息。第一个阶段是没有副作用的，也因此可以被React暂停，废弃又或者重新执行；而第二个阶段会涉及到实际的DOM，是有副作用的，所以无法被React暂停，重新执行。

那么结合上面两段，可以知道处于“Render/Reconciliation phase”的任务A，如果执行时出现了优先级更高的任务B，任务A就会被废弃，之后重新被执行。

举个例子。由于componentWillMount已经要被React废弃了，所以在以上链接中的图谱没有被标出来，它其实也是属于"Render/Reconciliation phase"的。那么当一个组件即将挂载时，就会调用这个生命周期钩子，假如在这之后我们就碰到了优先级更高的任务，那么原本的任务就会被废弃，并在之后被重新调用。导致的结果就是componentWillMount被调用了两次，这是一个值得注意的点。

##### Diff策略

[参考](https://zhuanlan.zhihu.com/p/20346379)

1. Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
3. 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。



针对第一点策略，React只对新老树进行同层的比较（Vue也是如此）。

> **tree diff**
>
> 基于策略一，React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较。
>
> 既然 DOM 节点跨层级的移动操作少到可以忽略不计，针对这一现象，React 通过 updateDepth 对 Virtual DOM 树进行层级控制，只会对相同颜色方框内的 DOM 节点进行比较，即同一个父节点下的所有子节点。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。



针对第二点策略，当React遇到不同类的两个组件，它会将旧组件删除，并增加新的组件。







### UI组件和容器组件

React-Redux中的Connect所返回的函数就是一个高阶组件，它会接收我们输入的UI组件，生成新的容器组件。

``` js
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App)
```

那么，UI组件和容器组件有什么不同呢？

##### UI组件

- 只负责UI的呈现，没有任何业务逻辑
- 没有State，参数由Props提供

##### 容器组件

- 不负责UI的呈现，负责处理业务逻辑
- 带有内部状态





### create-react-app

通常项目存在测试环境和正式环境，这两个环境所对应的后端域名也是不同的。

我们可以通过设置环境变量，代码中通过`process.env.xxx`读取该环境变量，从而实现根据环境的不同设置不同的接口域名。



有个注意的点是`create-react-app`创建的项目，会根据执行的命令自动设置环境变量`NODE_ENV`，比如当我们使用`npm start`时的环境变量的值为`development`，当我们使用`npm test`时环境变量的值为`test`，当我们使用`npm build`时环境变量的值为`production`。

除了这个点，还有个重要的地方是`react-script`只会读取到以`REACT_APP_`开头的环境变量，比如你的`package.json`可以这样写

``` js
"start:dev": "cross-env REACT_APP_NODE_ENV=development react-scripts start", // cross-env 用来跨操作系统设置环境变量
```



