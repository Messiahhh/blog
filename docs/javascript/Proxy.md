# Proxy And Reflect
## Proxy
Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
### 代理对象

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

### 代理函数

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



## Reflect

`Reflect`对象的设计目的有这样几个。

1. 将许多`Object`上的方法，如`Object.defineProperty`放在了`Reflect`上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

2. 修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

   ``` js
   // 老写法
   try {
     Object.defineProperty(target, property, attributes);
     // success
   } catch (e) {
     // failure
   }
   
   // 新写法
   if (Reflect.defineProperty(target, property, attributes)) {
     // success
   } else {
     // failure
   }
   ```

   

3. 让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。

   ```javascript
   // 老写法
   'assign' in Object // true
   delete obj.name
   
   // 新写法
   Reflect.has(Object, 'assign') // true
   Reflect.deleteProperty(obj, 'name')
   ```

4. `Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。

   ``` js
   // 老写法
   Proxy(target, {
       set: function(target, name, value, receiver) {
           target[name] = value
       }
   })
   
   // 新写法
   Proxy(target, {
       set: function(target, name, value, receiver) {
       	Reflect.set(target, name, value, receiver)
       }
   })
   ```

   下面是另一个例子

   ```javascript
   var loggedObj = new Proxy(obj, {
     get(target, name) {
       console.log('get', target, name);
       return Reflect.get(target, name);
     },
     deleteProperty(target, name) {
       console.log('delete' + name);
       return Reflect.deleteProperty(target, name);
     },
     has(target, name) {
       console.log('has' + name);
       return Reflect.has(target, name);
     }
   });
   ```



`Reflect`对象一共有 13 个静态方法。

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)



除去一些`Object`上已经部署的方法，如`Object.getPrototypeOf`对应的`Reflect.getPrototypeOf`。`Reflect`上还部署了一些有意思的方法。

### Reflect.apply 

``` js
Reflect.apply(function (a, b) {
    console.log(this.name)
    console.log(a + b)
}, {name: 'akara'}, [1, 2])
```

### Reflect.construct

``` js
function People(name) {
    this.name = name
}

Reflect.construct(People, ['akara'])
```

### Reflect.ownKeys

`Reflect.ownKeys`方法用于返回对象的所有属性，基本等同于`Object.getOwnPropertyNames`与`Object.getOwnPropertySymbols`之和。

``` js
let obj = {
    [Symbol('name')]: 'akara',
    age: 21
}

Object.getOwnPropertyNames(obj)
// ["age"]

Object.getOwnPropertySymbols(obj)
// [Symbol(name)]

Reflect.ownKeys(obj)
// ["age", Symbol(name)]
```






