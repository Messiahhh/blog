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



##### tsconfig.json

很多项目的根目录下都存在`tsconfig.json`文件，也就是`TypeScript`的配置文件，当我们使用`tsc`命令来编译代码的时候，会向上层目录中寻找该配置文件。

需要注意的一点是，当我们使用`tsc index.tsx`来直接指定待编译文件时，`tsconfig.json`的配置并不会生效。因此我们大多数时候都是直接在`tsconfig.json`中指定编译的输入与输出，比如使用`files/include/exclude`等参数。

另外，即使`tsconfig.json`为空，只要存在就拥有对应的默认参数。



当我们在ts项目引用一个外部的js库时，需要拥有该文件对应的声明，通常可以使用`npm i @types/xxx`，或者是项目中存在对应的声明文件（xx.d.ts）

``` tsx
// xx.d.ts
// 一种普通的场景
declare module 'module-name' {
    export function methodA(): void
}
```

`tsconfig.json`中的一些配置：

``` tsx
{
    "compilerOptions": {
        // 编译后的输出目录
        "outDir": "lib",
        // true表示不会生成输出文件
        "noEmit": true,
        // true表示ts编译成js的同时，会生成对应的.d.ts声明文件
        "declaration": true,
		// 生成的js是严格模式
        "strict": true,
		// 生成的目标，通常是es5
        "target": "es5"
        // 等等...
    },
    // 指定待编译的文件
    "files": [
        
    ],
    // 指定待编译文件的目录
    "include": [
        
    ],
    // 指定哪些文件不被编译，默认值包括node_modules等
    "exclude": [
        
    ]
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

