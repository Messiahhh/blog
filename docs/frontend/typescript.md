---
sidebarDepth: 4
---

## TypeScript

> 语法网上有，我就讲点别的东西

``` typescript
// 报错
let fruits1 = 'apple'
const Fruits1: 'orange' | 'apple' = fruits1

// 仅仅把let改为const，就不报错了
const fruits1 = 'apple'
const Fruits1: 'orange' | 'apple' = fruits1
```

发现直接用let声明的字符串的类型为string，而通过const声明的字符串的类型为字符串字面量（本例中为字符串字面量'apple'），有因为字符串字面量是继承于字符串的，所以把类型为字符串的变量赋值给类型为字面量的变量会出错。

另外，当我们声明一个对象时，比如以下代码

``` typescript
let fruits = {
   name: 'apple'
}
```

此时该变量的属性name的类型为string

而有的时候，我们想要完成以下操作，会报错

``` typescript
const Fruits: {
   name: 'orange' | 'apple'
} = fruits
```

这是由于string类型的值无法复制给字面量类型的值。

这个时候可以使用断言。

``` typescript
let fruits = {
   name: 'apple' as 'apple'
}
```





##### 随手记录

``` typescript
const test = <T extends unknown>(a: T): T[] => {
    return [a]
}

function test2<T>(a: T): T[] {
    return [a]
}


// class组件内的Ref
class Button extends React.Component {
    myRef: React.RefObject<HTMLButtonElement> // <button></button
    // <HTMLDivElement> <div></div>
    // <HTMLInputElement> <input />
    constructor(props: any) {
        super(props)
        this.myRef = React.createRef()
    }
    render() {
        return (
            <button ref={this.myRef}>{this.props.children}</button>
        )
    }
}
 
```

