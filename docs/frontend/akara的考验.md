## 代码记录

> 主要是记录一些有趣的例子，不然每过一阵子总要从头码一遍

1. 词法作用域

> 函数的作用域位于声明函数时所在的作用域

``` js
let x = 1
let A, B, C
{
    let x = 2
    A = function() {
        console.log(x)
    }
   	B = function() {
        x = 10
    }
}
{
    let x = 3
    C = function() {
        console.log(x)
    }
    A()
}
B()
C()
```

2. 尾调用

> 函数作用域在其被调用时创建，执行完销毁

``` js
function A() {
    let a = 1
    let b = 2
    A()
}
// vs 
function A() {
    let a = 1
    let b = 2
    A()
    let c = 3
}
```

3. 异步的写法

``` js
// 改写
A('file', (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data)
    A('file', (err, data2) => {
        if (err) {
            console.log(err)
        }
        console.log(data2)
    })
})

// 完美写法
async function B() {
    try {
        let data = await A('file')
        console.log(data)
        let data2 = await A('file')
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}
```

