## 核心代码

``` js
class Promise {
	constructor(executor) {
        // Promise的状态
		this.status = 'pending'
        // Promise状态对应的值
		this.value = undefined
		this.onResolvedCallback = []
		this.onRejectedCallback = []

        // 将Promise的状态转化从pending转化为fulfilled
		const resolve = (value) => {
			if (this.status === 'pending') {
                this.status = 'fulfilled'
                this.value = value
                this.onResolvedCallback.forEach(callback => callback())
			}
		}

        // 将Promise的状态转化从pending转化为rejected
		const reject = (reason) => {
			if (this.status === 'pending') {
				this.status = 'rejected'
				this.value = reason
				this.onRejectedCallback.forEach(callback => callback())
			}
		}
        
		try {
            // 执行传入的函数
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}

	then(onResolve, onReject) {
        // then函数需要返回一个新的Promise
		return new Promise((resolve, reject) => {
            // 和事件不同。事件先触发再监听则不会触发回调函数
            // 而Promise即使状态已经转化，也会触发回调
			if (this.status === 'fulfilled') {
                // 通过setTimeout实现异步。
                // 与真实的实现不同，setTimeout的回调会放进macro task队列。
                // 而真实的实现，then的回调会放进micro task队列。
				setTimeout(() => {
                    // onResolve的函数返回值会被新的Promise进行resolve
                    // var b = a.then(data => {
					//    return data * data
					//	})
                    // 此处若a的内部值为10，则b的内部值为100
					resolve(onResolve(this.value))
				})
			}
			else if (this.status === 'rejected') {
				setTimeout(() => {
                    // 注意这里也是resolve，不要误以为是 reject(onReject(this.value))
					resolve(onReject(this.value))
				})
			}
			else if (this.status === 'pending') {
				this.onResolvedCallback.push(() => {
					setTimeout(() => {
						resolve(onResolve(this.value))
					})
				})

				this.onRejectedCallback.push(() => {
					setTimeout(() => {
						resolve(onReject(this.value))
					})
				})
			}
		})
	}
}
```

好，核心功能实现了，再一点点加功能。

一：我们有的时候会`resolve`一个`Promise`，例如

``` js
var p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 2000)
})
var p2 = new Promise((resolve, reject) => {
    resolve(p1)
})

// 或者

var p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 2000)
})

var p2 = a.then(data => {
    return p1
})
```

我们希望p2的状态以及内部值和p1保持一致。那么我们稍微修改一下代码。

``` js
const resolve = (value) => {
    if (this.status === 'pending') {
        // 如果resolve的参数是Promise实例，则状态与其保持一致
        if (value instanceof Promise) {
            value.then((data) => {
                resolve(data)
            }, (reason) => {
                reject(reason)
            })
        } else {
            this.status = 'fulfilled'
            this.value = value
            this.onResolvedCallback.forEach(callback => callback())
        }
    }
}
```

二 异常的捕获

``` js
var p1 = new Promise((resolve, reject) => {
    reject(new Error())
})
var p2 = p1.then((data) => {
    
}, (reason) => {
    
})
```

当这里p1状态为rejected时，可能有人会误以为p2也是rejected，然而实际是fulfilled。

只有当`onFulfilled` 或 `onRejected`抛出了异常`e`, 则`p2`应当以`e`为`reason`转化成`rejected`。

所以我们需要对可能的异常进行捕获。

``` js
setTimeout(() => {
    try {
        resolve(onResolve(this.value))
    } catch (e) {
        reject(e)
    }
})
```

三

1. 如果 `onFulfilled` 不是一个函数且`promise1`已经fulfilled，则`promise2`必须以`promise1`的值fulfilled.

2. 如果 `OnReject` 不是一个函数且`promise1`已经rejected, 则`promise2`必须以相同的reason被reject.

``` js
if (typeof onReject !== 'function') {
    reject(this.value)
} else {
    resolve(onReject(this.value))
}
// ...
if (typeof onResolve !== 'function') {
    resolve(this.value)
} else {
    resolve(onResolve(this.value))	
}
```

代替原先的

``` js
resolve(onReject(this.value))
// ...
resolve(onResolve(this.value))	
```



那么我们现在的代码如下

## 复杂版

``` js
class Promise {
	constructor(executor) {
		if (typeof executor !== 'function') {
			throw new TypeError("Promise resolver undefined is not a function")
		}
		this.status = 'pending'
		this.value = undefined
		this.onResolvedCallback = []
		this.onRejectedCallback = []

		const resolve = (value) => {
			if (this.status === 'pending') {
				if (value instanceof Promise) {
					value.then((data) => {
						resolve(data)
					}, (reason) => {
						reject(reason)
					})
				} else {
					this.status = 'fulfilled'
					this.value = value
					this.onResolvedCallback.forEach(callback => callback())
				}
			}
		}

		const reject = (reason) => {
			if (this.status === 'pending') {
				this.status = 'rejected'
				this.value = reason
				this.onRejectedCallback.forEach(callback => callback())
			}
		}
		try {
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}

	then(onResolve, onReject) {
		return new Promise((resolve, reject) => {
			if (this.status === 'fulfilled') {
				setTimeout(() => {
					if (typeof onResolve !== 'function') {
						resolve(this.value)
					} else {
						try {
							resolve(onResolve(this.value))
						} catch (error) {
							reject(error)
						}
							
					}
				})
			}
			else if (this.status === 'rejected') {
				setTimeout(() => {
					if (typeof onReject !== 'function') {
						reject(this.value)
					} else {
						try {
							resolve(onReject(this.value))
						} catch (error) {
							reject(error)
						}
						
					}
				})
			}
			else if (this.status === 'pending') {
				this.onResolvedCallback.push(() => {
					setTimeout(() => {
						if (typeof onResolve !== 'function') {
							resolve(this.value)
						} else {
							try {
								resolve(onResolve(this.value))
							} catch (error) {
								reject(error)
							}
						}
					})
				})

				this.onRejectedCallback.push(() => {
					setTimeout(() => {
						if (typeof onReject !== 'function') {
							reject(this.value)
						} else {
							try {
								resolve(onReject(this.value))
							} catch (error) {
								reject(error)
							}
						}
					})
				})
			}
		})
	}
}

```

## 实现catch函数

``` js
catch(onReject) {
    return this.then(null, onReject)
}
```

## 实现finally函数

``` js
finally(cb) {
	let P = this.constructor
	return this.then(
		value => P.resolve(cb()).then(() => value),
		reason => P.resolve(cb()).then(() => {throw reaon})
	)
}
```

## 实现all函数

``` js
static all(promiseArr) {
    return new Promise((resolve, reject) => {
        let res = []
        let length = promiseArr.length
        let count = 0
        promiseArr.forEach((promise, index) => {
            promise.then(value => {
                res[index] = value
                count++
                if (count === length) {
                    resolve(res)
                }
            }, (reason) => {
                reject(reason)
            })
        })
    })
}
```

## 实现race函数

``` js
static race(promiseArr) {
    return new Promise((resolve, reject) => {
        promiseArr.forEach((promise) => {
            promise.then(value => {
                resolve(value)
            }, reason => {
                reject(reason)
            })
        })
    })
}
```

用代码测试一下

``` javascript
// example

let p1 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log(1);
        resolve(1)
    }, 3000)
})
let p2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log(2);
        resolve(2)
    }, 2000)
})
let p3 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log(3);
        resolve(3)
    }, 1000)
})

Promise.all([p1, p2, p3])
.then(console.log)
.catch(console.error)

```


