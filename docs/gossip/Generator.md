
# Generator
> 本文为初学前端时所写，未进行勘误便移植了过来，若有错误请见谅。

Generator是种特殊的函数，让我们直接上手看下哪里特殊吧。



### 函数声明

```
function* A() {
	yield 'a'
	yield 'b'
	return 'c'
}

```

- 在function后面有个星号
- 函数内部使用了yield关键字



### 函数调用

```
var x = A()
console.log(x)
```

> Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，遍历器对象。



遍历器对象部署了next方法，调用next方法会返回对象，对象具有两个属性

```
x.next()
//{value: 'a'; done: false}
x.next()
//{value: 'b'; done: false}
x.next()
//{value: 'c'; done: true}
```

从现在来看，就是可以一个函数，可以调用，暂停，调用。





### 给next传递参数

`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

相当于在外面改变了函数内部的行为。

而这，也让Generator具有了代替回调地狱的功能。

详情见下一篇文章。
