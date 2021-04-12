---
sidebarDepth: 4
---
## React

### 基础

##### JSX

``` jsx
const element = <h1>hello, world!</h1>
```

该JSX代码会被Babel编译成`React.createElement`函数并调用，它等价于：

``` jsx
const element = React.createElement('h1', null, 'hello, world')
```

这也是为什么写JSX代码时必须提前引入React库。







##### 组件

组件名必须大写，因为小写会被当成HTML标签，如`<app />`会被编译成`React.createElement('app')`；而`<App />`会被编译成`React.createElement(App)`。



当通过`setState`操作数据时，又或者`props`改变时（通过浅对比），组件会重新渲染。另外对于非纯组件来说，只要父组件渲染了，子组件也会跟着重新渲染。



React的组件分为**函数组件**和**class组件**，函数组件没有内部状态和生命周期。

``` javascript
function Hello(props) {
    return (
        <div>
        	// 函数组件使用props
            hello world {props.name}
        </div>
    )
}
```

``` js
class Count extends React.Component {
    state = {
        count: 0
    }
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {this.props.name}
                {this.state.count}
            </div>
        )
    }
}
```



##### 状态

在Class组件中通过调用`this.setState`来操作`State`。只有通过该方式操作数据后，组件才会重新渲染。

``` javascript
this.setState({name: 'aka'})
```

`setState`实际上是把我们提供的对象合并进原本的对象中，调用`setState`之后，**`this.state`的地址实际上改变了**，而不仅仅是修改了内部的值。

``` jsx
state = Object.assign(state, { name: 'aka' }) // 相当于
```

另外**State的更新通常是异步的**。

``` tsx
this.setState({
    count: 1 // 初始值为0
})
console.log(this.state.count) // 输出0
```

想要获取修改后的值，我们可以传一个回调函数给`setState`

``` javascript
this.setState({
    count: 1
}, () => {
    console.log(this.state.count) // 输出1
})
```

如果`setState`依赖之前的State，`setState`的参数可以为函数

``` jsx
this.setState((state, props) => {
    return {
        count: state.count + 1
    }
})
```



事实上，在**合成事件**和**组件的生命周期**中`setState`是异步的；而在**原生事件**和**定时器**中`setState`是同步的。

这是因为，React内部维护了一个标识：`isBatchingUpdates`。在**合成事件**和**组件的生命周期**中，该值为`true`，那么`setState`会被缓存进队列，最后才批量更新；而在**原生事件**和**定时器**中，该值为`false`，调用`setState`时会直接同步更新。



##### 事件

React使用驼峰式`onClick`来进行事件处理：

``` jsx
<button onClick={handleClick}>
	aka
</button>
```

React中的`event`是**合成事件**，我们无需担心任何浏览器的兼容性问题。

另外要注意一下Class组件中的`this`问题

``` tsx
// 方法一
constructor() {
    this.handlerClick = this.handlerClick.bind(this)
}

// 方法二
<button onClick={(e) => this.handleClick(e)}>
    Click me
</button>

// 方法三
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





##### 生命周期

详细的生命周期可以参考[该链接](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)



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

正常函数组件不能被分配`refs`，比如以下代码会报错。

``` jsx
const FancyButton = () => <button>aka</button>

<FancyButton ref={myRef}></FancyButton>
```

此时可以使用**`forwardRef`**来把`refs`向下传递。

``` jsx
const FancyButton = React.forwardRef((props, ref) => {
    return <button ref={ref}>aka</button>
})

<FancyButton ref={myRef}></FancyButton>
```



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

``` jsx
function App() {
    return (
    	<>
            <React.Fragment>
        		<div></div>
            	<div></div>
        	</React.Fragment>
        </>
    )
}
```



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



### 服务端渲染(SSR)

[完整代码例子](https://github.com/Messiahhh/react-ssr-demo)

通常进行客户端渲染时，先从后端获取**空页面**，通过代码渲染出**模板页面**，再从后端获取**动态数据**，之后再渲染出**完整页面**。

那么当进行服务端渲染时，我们希望**在服务端获取动态数据**，并在**服务端渲染出完整页面返回给浏览器**。

我们可以在后端使用`react-dom/server`提供的`renderToString`来生成静态页面，静态页面被返回给浏览器后，我们还需要在前端使用`react-dom`提供的`hydrate`来给静态标记附加事件、生命周期等信息。

``` jsx
// server.js 后端
import { renderToString } from 'react-dom/server'

const content = renderToString(<App />)
ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React App</title>
    </head>
    <body>
        <div id="root">${content}</div>
        <script src="/client.js"></script>
    </body>
    </html>
`
```

``` jsx
// client.js 前端
import { hydrate } from 'react-dom'

hydrate(<App />, document.querySelector('#root'))
```

##### 同构

所谓同构，指的是一份代码可以分别在前端和后端运行。

比如上述代码例子中的`App`组件，分别在前后端运行了一次。值得注意的是，只有在前端使用`hydrate`后才会触发对应的生命周期或事件，而仅在后端使用`renderToString`时并不会触发组件的生命周期，所以我们无法通过生命周期在后端获取动态数据。



##### 服务端加载数据

通常使用服务端渲染都会用到`react-router-dom`和`redux` ，要注意后端需要使用`StaticRouter`而不是`BrowserRouter`

我们在服务端创建一个`store`，再调用指定的方法来获取动态数据，并更新`store`的值。在这之后再把`store`作为`Provider`的值，使用`renderToString`渲染完整的页面。



浏览器收到静态页面后，使用`hydrate`给静态页面绑定事件时我们也需要给`Provider`指定`store`。所以在之前渲染完整页面时可以在页面插入一段`window.__STATE__ = XXX`，从而进行`store`在前后端的传递。

``` js
export const loadData = () => (dispatch) => {
    dispatch(setFetching(true))
    return axios.get('http://localhost:3000/getData')
        .then(res => {
            dispatch(setLists(res.data.lists))
        })
        .catch(err => console.log(err))
}


export const load = (store) => {
    return store.dispatch(loadData())
}

export const routes = [
    {
        path: '/',
        key: 'home',
        component: Contain,
        loadData: load, // 在这里加载数据
        exact: true,
    },
    {
        path: '/signup',
        key: 'signup',
        component: Signup
    },
]
```

``` js
// server.js 后端
app.use(async (ctx) => {
    const store = configureStore(initialState) // 创建store
    const promiseArr = []
    routes.forEach(route => {
        if (route.loadData) {
            promiseArr.push(route.loadData(store)) // 加载数据
        }
    })
    await Promise.all(promiseArr) // 需要等所有数据都加载完毕
    const content = await renderToHTML(ctx.url, store) // 生成完整页面
    ctx.body = content
})

export default async function renderToHTML(url, store) {
    const template = await fs.readFileAsync((`./template/index.html`), 'utf8')
      
    const content = renderToString(
        <Provider store={store}> // 此时store已经是最新值
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </Provider>
    )
    
    // 后端把store放在window里，从而向前端传递
    const state = `
        <script>
            window.__STATE__ = ${JSON.stringify(store.getState())} 
        </script>
    `
    return template
    .replace(`<!-- CONTENT -->`, content)
    .replace(`<!-- STATE -->`, state)
}
```


``` js
// client.js 前端
export default function App() {
    return (
        <Switch>
            {
                routes.map(route => {
                    return <Route  {...route}></Route> 
                })
            }
        </Switch>
    )
}

const state = window.__STATE__ // 获取后端传过来的store

delete window.__STATE__

const store = configureStore(state)

hydrate(
    <Provider store={store}>
    	<Router>
        	<App />
        </Router>
    </Provider>, 
    document.querySelector('#root')
)
```

##### 服务端加载CSS

在`App`组件中需要使用`import 'index.css'`来加载样式，通过`style-loader`来调用`document.createElement('style')`创建标签，又因为Node环境中并不存在`document`变量，所以这种思路是行不通的。

那么我们切换一下思路，与其引入`index.css`时自动创建标签，我们实际上可以在引入`index.css`后，获取对应的样式信息，再手动的在模板HTML中添加这段信息，就像我们之前手动添加`CONTENT`和`STATE`一样。



为了实现该目的，我们首先需要安装`isomorphic-style-loader`，并在`webpack`配置中替换掉原本用来转换CSS的`style-loader`。此时，我们引入样式文件时不会自动创建标签。

``` js
// webpack.config.js
{
    test: /\.module\.css$/,
    use: ["isomorphic-style-loader", {
        loader: "css-loader",
        options: {
            importLoaders: 1,
            esModule: false, // 注意这里
        }
    },
    "postcss-loader"
],
```

值得注意的是，与[官网文档上的例子](https://github.com/kriasoft/isomorphic-style-loader)不同，我这里使用了`esModule: false`。这主要是`css-loader`版本的差异导致的，在一些老的教程和文档中可能使用的是`css-loader@3.x`，而最新的版本已经是`css-loader@5.x`了。[在最新的情况下](https://stackoverflow.com/questions/63458657/isomorphic-style-loader-doesnt-work-as-it-supposed-to/63983963#63983963)，`css-loader`会生成一个`es模块`，而`isomorphic-style-loader`需要一个`commonjs模块`。

另外，有的教程使用`StaticRouter`的`context`来实现服务端中CSS的加载，而在`isomorphic-style-loader`的官网中，使用的是它自带的一些工具函数来实现，我可能更倾向于后者吧。



总之，在配置好后，我们可以跟着官网的教程来实现服务端加载CSS了。

``` js
// server.js 后端
const css = new Set() // CSS for all rendered React components
const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
const body = ReactDOM.renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <App />
    </StyleContext.Provider>
)
const html = `<!doctype html>
    <html>
      <head>
        <script src="client.js" defer></script>
        <style>${[...css].join('')}</style>
      </head>
      <body>
        <div id="root">${body}</div>
      </body>
    </html>
`
```

``` js
// client.js 前端

import React from 'react'
import withStyles from 'isomorphic-style-loader/withStyles'
import s from './App.scss'

function App(props, context) {
  return (
    <div className={s.root}>
      <h1 className={s.title}>Hello, world!</h1>
    </div>
  )
}

export default withStyles(s)(App) // <--

const insertCss = (...styles) => {
  // 不过，这两行代码有必要么
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

ReactDOM.hydrate(
  <StyleContext.Provider value={{ insertCss }}>
    <App />
  </StyleContext.Provider>,
  document.getElementById('root')
)
```



##### Next.js

`next.js`是一个React的服务端渲染框架，它有以下特点：

- 对项目的目录结构进行了约束，并提供了许多有用的内部组件，从而提供快速的开发能力
- 自带对`CSS Module`和`css-in-js`的支持
- 通过目录结构划分前端路由，并支持动态路由等功能
- 支持两种预渲染方案：①静态生成的页面，即在项目构建时生成静态页面；②服务端渲染，即每次收到请求时构建一次页面。

总的来说，我觉得是个很优秀的框架，拿来搭建博客也是个非常不错的选择，部署在它家的`Vercel`平台也十分方便。



### create-react-app

##### 环境变量

通常项目都会存在测试环境和正式环境，不同环境下接口请求的路径也是不同的。而`CRA`提供了`process.env`让我们在前端读取环境变量，从而可以根据环境的不同设置不同的接口参数。

``` json
// process.env 默认值
{
    NODE_ENV: "development" | "production" | "test"
    PUBLIC_URL: ""
    WDS_SOCKET_HOST: undefined
    WDS_SOCKET_PATH: undefined
    WDS_SOCKET_PORT: undefined
}
```

我们用的最多的是`NODE_ENV`这个环境变量，通常当我们使用`npm start`、`npm build`或`npm test`时，`NODE_ENV`的值分别为`development`、`production`、`test`。另外`PUBLIC_URL`也可以在模板HTML中看到它的使用方式。

我们也可以自己设置环境变量，不过需要注意的是我们设置的环境变量必须以`REACT_APP_`开头才能被`process.env`读取到，比如可以这么写：

``` json
{
    "dev": "cross-env REACT_APP_MY_ENV=development react-scripts start"
}
```



##### rewired

使用`create-react-app`创建的项目，其`webpack`配置等信息对我们是不可见的，也是不可直接修改的。

然而在有些场合我们还是希望能适度修改配置，除了`eject`我们也可以使用像`react-app-rewired`这样的库来拓展配置信息。