# 事件循环

浏览器和Node环境都存在事件循环这一概念，但因为它们基于不同的架构所以实现原理也有些许不同，比如浏览器环境的事件循环是通过主线程和工作线程之间的调度实现的。另外，在Node的 `11.0`版本的发布之后，同一段代码在两个不同环境的表现也越来越相似了，所以在这里我会主要以浏览器环境介绍事件循环的原理。

众所周知浏览器是基于多线程的，除了用来渲染页面的GUI渲染线程，还有执行JavaScript代码的主线程和各种工作线程，不同的工作线程分别用来处理定时器任务、I/O操作、事件等操作。

当我们在主线程执行一段代码时，通常会使用 `fetch`来发出一个请求，发请求的这个操作是交给专门的工作线程来执行的，因此该操作本身并不会阻塞后续代码的执行。而当我们收到了对应的响应时，该工作线程会把一个**任务**交给主线程执行，这就是所谓的**异步**。

当然了，此时我们的主线程可能还在执行代码中，所以实际上任务并不会立刻被交给主线程执行，与之对应的是该任务会被添加进一个专门的**任务队列**当中，主线程执行完代码后会从任务队列中取出任务来执行。不仅如此，根据不同的类型我们又把任务分为**宏任务**和**微任务**，因此我们的队列也有两个：**宏任务队列**和**微任务队列**。

那么先让我们明确哪些任务属于宏任务和微任务，首先我们可以把最初交给主线程执行的代码视为一个宏任务，其他的宏任务包括：`setTimeout`或 `setInterval`、`I/O`操作（如 `ajax`或文件读取）、事件（如点击事件）、`setImmediate`（Node专有）。而最常见的微任务有 `promise.then()`。

事件循环的基本规则就是，执行完一个宏任务，再执行微任务队列中的所有微任务，再执行下一个宏任务...如此往复。因此一个事件循环可以视为一个宏任务+所有微任务，另外也可以把执行一个宏任务的阶段，或着执行所有微任务的阶段，称作一个 `tick`，由此可见一个事件循环由两个 `tick`组成。无论是对于Node中的 `process.nextTick`还是 `Vue`中的 `$.nextTick`，理解何为 `tick`都是很有帮助的。

## nextTick

`process.nextTick`是Node独有的一个方法，顾名思义我们可以知道这个方法的目的是让某个任务在下一个 `tick`的最开始执行。比如，当我们处在一个宏任务阶段调用 `process.nextTick`，那么会在当前宏任务执行结束后，在后续的微任务阶段执行前执行 `nextTick`接受的回调函数。

事实上在Node中专门维护了一个 `nextTick`队列，每当我们执行完一个 `tick`，就会执行 `nextTick`队列中的所有任务（行为很像微任务队列）。

```js
// 可以想一想这个代码的结果
setTimeout(() => {
    console.log(1)
    process.nextTick(() => {
        console.log(2)
    })
}, 0)

new Promise((resolve) => resolve())
.then(() => {
    console.log(3)
    process.nextTick(() => {
        console.log(4)
    })
})

process.nextTick(() => {
    console.log(5)
    process.nextTick(() => {
        console.log(6)
    })
    setImmediate(function () {
        console.log(7)
    })
})

process.nextTick(function () {
    console.log(8)
    process.nextTick(() => {
        console.log(9)
    })
})
```

## Node事件循环

Node的架构和浏览器有很大不同，因此它实现事件循环的方式也大相径庭。Node的事件循环中有**六个阶段**，**每个阶段中都有一个宏队列，总共只有一个微队列和一个 `nextTick`队列**。

1. `Timer`: `SetTimeout`和 `SetInterval`的回调放进该阶段的任务队列。
2. `pending callback`: 执行一些系统操作的回调，例如TCP的错误。
3. `idle, prepare`: 处理一些内部调用。
4. `poll`: **大部分其他回调会被仿佛该阶段的任务队列**
5. `check`: `SetImmediate`的回调放进该阶段的任务队列。
6. `close callback`: 一些结束时的回调，例如 `Socket.on("close")`

我们可以只重点关注三个阶段，`Timer`、`poll`、`check`。

低版本（`v11.0`以前）的Node表现的行为和浏览器环境有很大的不同，是因为低版本下的Node在执行完**一个阶段的所有宏任务**再执行微任务；而**高版本的Node表现和浏览器一致**，即执行完一个宏任务再执行微任务。

以下的这段代码在不同版本的Node下表现的行为就会有所不同

```js
setImmediate(function(){
    console.log(1);
    process.nextTick(function(){
        console.log(4)
    }) 
})
process.nextTick(function(){
    console.log(2)
    setImmediate(function(){
        console.log(3);
    })
})
```

1. 当我们遇到 `setImmediate`后，将其回调函数放进 `check`阶段的宏队列中。
2. 当我们遇到 `process.nextTick`后，将其回调函数放进 `nextTick`队列中。因为此时同步代码（或者说最初的宏任务）执行完毕，那么执行 `nextTick`队列中的任务。
3. **输出2**， 遇到 `setImmediate`后，将其回调函数放进 `check`阶段的宏队列中。
4. 开始执行 `check`队列中的宏任务。
5. 执行 `check`第一个宏任务，**输出1**，将 `nextTick`的回调放进队列里。

以上五步，无论版本如何都是一致的，接下来就是高低版本Node的不同。

**低版本Node**

因为低版本Node是执**行完一个阶段中的全部宏任务后，再执行微队列的全部任务**。所以**先输出3，再输出4。**

**高版本Node**

因为高版本Node是**执行完一个宏任务，就执行微队列的全部任务**。所以**先输出4，再输出3。**
