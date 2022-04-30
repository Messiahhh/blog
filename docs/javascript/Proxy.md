Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

## 代理对象

``` javascript
let handleer = {
    get: function (target, propKey, receiver) {
        console.log(target, propKey, receiver)
        console.log(target[propKey])
    },
    set: function (target, propKey, newValue, receiver) {
        target[propKey] = newValue
    }
}

let proxy = new Proxy({
    name: 'akara',
}, handler)

proxy.name
// 输出
// {name: 'akara'}   "name"   Proxy {name: 'akara'}
// 'akara'
```

## 代理函数

``` javascript
handler = {
    get: function (target, propKey, receiver) {
        return target[propKey]
    },

    apply: function (target, myThis, args) {
        console.log(target, myThis, args)
        target.apply(myThis, args)
    },

    construct(target, args) {
        return new target(...args)
    }
}

let proxy = new Proxy(function (a, b) {
    this.name = a
    this.age = b
}, handler)

proxy('akara', 20) 
// ƒ (a, b) {
//     this.name = a
//     this.age = b
//     console.log(a, b)
// } undefined (2) ["akara", 20]

proxy.call({}, 'akara', 20) 
// ƒ (a, b) {
//     this.name = a
//     this.age = b
//     console.log(a, b)
// } {} (2) ["akara", 20]
```

- **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
- **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。
- [其他的拦截操作](https://es6.ruanyifeng.com/#docs/proxy#Proxy-%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%96%B9%E6%B3%95)


