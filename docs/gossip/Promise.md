
# Promise
> 本文为初学前端时所写，未进行勘误便移植了过来，若有错误请见谅。

[Promise/A+规范](https://promisesaplus.com/)

[完整规范的中文翻译](https://segmentfault.com/a/1190000002452115)

### 术语

promise是个遵循Promise/A+规范且部署了then方法的对象或函数

thenable是个部署了then方法的对象或函数

value是个合法的JavaScript值（包括undefined，thenable，promise）

exception是个通过`throw`抛出的值

reason是指出为何promise变为rejected的理由

### Promise

Promise是个对象， 它必须处于下面三种状态中的一种，pending（进行中），fulfilled（成功），rejected（失败）

- 处于pending的时候，可以转化成fulfilled或rejected
- 处于fulfilled的时候，不能转化成其他状态；且promise对象需要拥有value值
- 处于rejected的时候，不能转化成其他状态；且promise对象需要拥有reason值



注：下文会用fulfilled promise with x / rejected promise with x。应该不难理解。

### 生成Promise对象

使用

```
new Promise((resolve, reject) => {

})
```

会返回一个Promise对象，初始状态是pending。

当调用resolve函数的时候

- 当resolve的参数不是promise对象， fulfilled promise with x
- 当resolve的参数是promise对象，promise的状态会随着参数的promise的状态改变。

当调用reject函数的时候，Promise对象会转化成rejected状态，且把reject的函数参数传递给reason。





### then方法

Promise对象上部署了then方法，此方法接受两个函数参数

```
promise.then(onFulfilled, onRejected)
```

当promise对象的状态为fulfilled，会调用onFulfilled函数。并且会把promise对象的value传递给onFulfilled函数的参数中。

当promise对象的状态为rejected，会调用onRejected函数。并且会把promise对象的reason传递给onRejected函数的参数中。



除此之外，then方法会返回一个Promise对象

```
promise2 = promise1.then(onFulfilled, onRejected);
```

1.如果`onFulfilled` 或 `onRejected`返回了一个值x

- 若x不是promise对象，那么fulfilled promise2 with x。


- 若x是promise对象，那么
  - 若x为pending， promise2保持pending直到x变为fulfilled或rejected
  - 若/当x为fulfilled， fulfilled promise2 with same value
  - 若/当x为rejected， rejected promise2 with  same reason

2.如果`onFulfilled` 或 `onRejected`抛出了异常`e`, 则`promise2`应当以`e`为`reason`转化成`rejected`。

3.如果 `onFulfilled` 不是一个函数且`promise1`已经fulfilled，则`promise2`必须以`promise1`的值fulfilled.

4.如果 `OnReject` 不是一个函数且`promise1`已经rejected, 则`promise2`必须以相同的reason被拒绝.







### Catch方法

```
promise.catch(onRejected)
```

是以下代码的别名

```
promise.then(null, onRejected)
```

因此可以使用链式调用

```
promise
	.then(() => {})
	.then(() => {})
	.then(() => {})
	.catch(() => {})
```

无论哪里出错，最后catch都能捕获， 而不用在每个then里都写一个`OnReject`







### Promise.all()

```
const p = Promise.all([p1, p2, p3])
```

接受一个数组为参数

> `p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。
>
> （1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
>
> （2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。
