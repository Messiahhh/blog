---
sidebarDepth: 4
---

> 参考https://react-typescript-cheatsheet.netlify.app/


## 常用类型

### `React.ReactElement` ｜ `JSX.Element`

``` tsx
type Key = string | number
interface ReactElement<T, P> { // 伪代码
    type: T,
    props: P,
    Key: Key | null
}
namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
}
```

``` tsx
const App = (): JSX.Element => <div>test</div>;
```

### `React.ReactNode`

``` tsx
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

type ReactText = string | number
type ReactChild = ReactElement | ReactText
```
``` tsx
const App = ({ children }: { children?: React.ReactNode}) => {}
```

### `React.ComponentProps`
``` ts
type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
    T extends JSXElementConstructor<infer P>
        ? P
        : T extends keyof JSX.IntrinsicElements
            ? JSX.IntrinsicElements[T]
            : {};
```
``` tsx
const App = (props: { name: string } & React.ComponentProps<'button'>) => {
    const { name, ...rest } = props
    return <button {...rest} />
}

type Test = React.ComponentProps<typeof App>
```

:::info
需要注意的是`JSX.IntrinsicElements`会包括一个额外的`ref`字段，并且类型为`LegacyRef`
``` ts
type LegacyRef<T> = string | Ref<T>;
interface ClassAttributes<T> extends Attributes {
    ref?: LegacyRef<T> | undefined;
}
```
实际情况下我们更多会使用`ComponentPropsWithoutRef`获取组件或HTML元素的`props`，而对于通过`forwardRef`创建的组件我们可以使用`ComponentPropsWithRef`获取其`props`
:::



### `React.CSSProperties`

``` tsx
type props = {
    style: React.CSSProperties;
}
```



### Form and Event

``` tsx
type props = {
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
    onClick2: React.MouseEventHandler<HTMLButtonElement>;
};
```

:::info
如果不关心事件的具体类型，我们可以指定其为`React.SyntheticEvent`
:::


## 函数组件

``` tsx
type myProps = {
    count: number
}
const App = ({ count }: myProps) => <div>{count}</div>
```

## 类组件

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


## Ref

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







## 常见问题

### class组件和函数组件的返回值类型不同

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

### 不推荐使用React.FC

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











