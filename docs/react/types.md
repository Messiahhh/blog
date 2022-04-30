---
sidebarDepth: 4
---

> 参考https://react-typescript-cheatsheet.netlify.app/

### 函数组件

``` tsx
type myProps = {
    count: number
}
const App = ({ count }: myProps) => <div>{count}</div>
```

### 类组件

``` tsx
type myProps = {
    count: number;
}

type myState = {
    name: string;
}
class Parent extends React.Component<myProps, myState> {
    state: myState = {
        name: 'akara'
    }
    render() {
        const { name } = this.state 
        return <div>{name}</div>
    }
}

```



### 常见类型

##### `React.ReactElement`

``` tsx
type Key = string | number
interface ReactElement<T, P> { // 伪代码
    type: T,
    props: P,
    Key: Key | null
}
```

``` tsx
const el: React.ReactElement = <div>hello</div>
// 等价于
const el: React.ReactElement = React.createElement('div', null, 'hello')
```

##### `JSX.Element`

近似于`ReactElement`

``` tsx
namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
}
```

##### `React.ReactText`

``` tsx
type ReactText = string | number
```

``` tsx
const el: React.ReactText = 'aka'
```

##### `React.ReactChild`

``` tsx
type ReactChild = ReactElement | ReactText
```

##### `React.ReactNode`

``` tsx
interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```



##### `React.CSSProperties`

``` tsx
type props = {
    style: React.CSSProperties;
}
```



##### 事件类型

``` tsx
type props = {
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}
```



##### `React.ComponentPropsWithRef<E>`

可以用来获取元素的原生属性：

``` tsx
type ChildProps = {
    style?: React.CSSProperties;
} & React.ComponentPropsWithoutRef<'input'>

function Child(props: ChildProps) {
    const {
        style,
        ...rest
    } = props
    return <input style={style} {...rest} />
}
```

### 表单

``` tsx
handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {}
handleChange = (e: React.FormEvent<HTMLInputElement>) => {}

// or

handleChange: React.ChangeEventHandler = (e) => {}
```

### Ref

``` tsx
export default class App extends React.Component<appProps, appState> {
    myRef = React.createRef<HTMLButtonElement>()
    render() {
        return (
            <>
                <FancyButton ref={this.myRef} style={{color: 'red'}}>
                    akara
                </FancyButton>     
                <button onClick={() => console.log(this.myRef.current)}>点我</button>           
            </>
        )
    }
}

type myProps = {
    style?: React.CSSProperties;
    children: React.ReactNode;
} 

const FancyButton = React.forwardRef<HTMLButtonElement, myProps>((props, ref) => {
    const {
        style,
        children,
    } = props
    return <button style={style} ref={ref}>{children}</button>
})
```







### 常见问题

##### class组件和函数组件的返回值类型不同

因为历史遗留原因，`class`组件返回值类型为`React.ReactNode`；而函数组件的返回值类型为`JSX.Element | null`。

``` tsx
class A extends React.Component {
    render() {
        return 'aka' // React.ReactNode
    }
}

function B() {
    return 'aka' // 报错
}
```

##### 不推荐使用React.FC

今天的普遍共识是不要去使用`React.FC`。



顺带一提，`React.FC`和普通的函数组件还是有些区别的，比如`React.FC`提供了**隐式的`children`类型定义**：

``` tsx
const A = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => {
    return <div>{title}{children}</div>
}

const B: React.FC<{
    title: string;
    // 隐式的定义了children
}> = ({
    title,
    children,
}) => {
    return <div>{title}{children}</div>
}
```











