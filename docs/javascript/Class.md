# Class

``` js
// 实例属性的新写法
class People {
    name
    age
    
    getName() {
        return this.name
    }
}

new People() // {name: undefined, age: undefined}

// 类似于

People.call({
    name: undefined,
	age: undefined,
    __proto__: People.prototype
})
```

在以往构造函数的写法中，实例的属性都是执行构造函数时添加的；而通过这种新写法，在执行构造函数之前，实例已经拥有该属性了（以上代码属性的值为`undefined`，我们也可以最开始的时候就赋值，如：

``` js
class People {
    name = 'akara'
    age = 996
}
new People() // {name: "akara", age: 996}
```

这也是为什么，在`TypeScript`中我们应该这样写

``` tsx
class People {
  name: string
  id: number

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
  }
}

// 而不是

class People {
  constructor(name: string, id: number) {
    this.name = name // Property 'name' does not exist on type 'People'
    this.id = id // Property 'id' does not exist on type 'People'
  }
}
```



## class中的箭头函数

``` js
class People {
    name = 'akara'

	getNameA = () => {
        console.log(this)
    }
    
    getNameB() {
        console.log(this)
    }
}

const p = new People()  // {name: "a", getNameA: ƒ}

p.name
p.getNameA() // 实例p
p.getNameB() // 实例p
```

这里有几个注意的点

一：

`getNameA`是实例的方法，而`getNameB`是原型对象上的方法

``` js
getNameA: () => { console.log(this) }
name: "akara"
__proto__:
	constructor: class People
	getNameB: ƒ getNameB()
	__proto__: Object
```

二：

`p.getNameA`输出的是实例p，这可能并不符合我们的预期。

我们都知道，如果是下面这样的对象，输出结果应该会符合预期。因为箭头函数本身没有`this`值，那么需要输出`this`的时候就沿着作用域链寻找，也就找到了`window`

``` js
const obj = {
    name: 'akara',
    getNameA: () => {
    	console.log(this)  
    },
	getNameB: function() {
        console.log(this)
    }    
}
obj.getNameA() // window
obj.getNameB() // obj
```

既然如此，为什么通过class创建的实例的箭头函数，输出的`this`却是实例本身。简单来说，这是一个**特性**，或者说**JS引擎的机制**。

我们可以通过`babel`把代码编译成`es5`的代码，来破解其背后的玄机。

``` js
// es6
class People {
  name = 'akara'
  getName = () => {
    console.log(this.name)
  }
  
  getMyName() {
    console.log(this.name)
  }
}

// 通过babel编译后 (stage-1, stage-3)

class People {
  constructor() {
    _defineProperty(this, "name", 'akara');

    _defineProperty(this, "getName", () => {
      console.log(this.name);
    });
  }

  getMyName() {
    console.log(this.name);
  }
}
```










