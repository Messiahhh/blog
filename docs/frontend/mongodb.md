---
sidebarDepth: 4
---

## MongoDB

### 常用命令

``` shell
mongo # 进入数据库的cli交互界面
> show dbs # 显示所有数据库
# 默认有这三个（还有个test数据库，由于初始该数据库内容为空，所以不显示）
admin 
config
local
> show collections # 显示当前数据库的所有集合（类似Mysql中的数据库表）
# js代码里的 mongoose.model('test', schema) 会创建一个集合tests（注意：复数）
> use <数据库名> # 切换数据库，如果没有则新建数据库
> db.help() 
> db.<集合名>.find() # 查该集合的所有数据
> db.<集合名>.find({name: 'akara'}) # 根据条件查找
```

### Mongoose

`Node`中主要有两个库来连接`Mongodb`数据库，分别是同名的`mongodb`和`mongoose`，后者用的更多也更方便。

``` js
const mongoose = require('mongoose')
// mongodb默认运行在27017 port
mongoose.connect('mongodb://localhost/test') // test 表示mongodb中的某个具体数据库
const db = mongoose.connection

const peopleSchema = new mongoose.Schema({ // 定义Schema
    name: String,
})

const Model = mongoose.model('people', peopleSchema) // 定义Model，同时会在数据库创建一个集合peoples来存放Documents

const p = new Model({
    name: 'akara'
}) // p是一个Document
```

##### _id

每个Document默认都会有一条`_id`的属性

``` js
{ _id: ObjectId("5ff59ae87b43e51eccf83237"), ...} // _id是个对象
```



##### 实例方法

> 自带

``` js
// 向集合people存新数据
p.save()
```

> 自己定义

``` js
peopleSchema.methods.say = function() {
    console.log('say something')
}
const Model = mongoose.model('people', peopleSchema) // 必须在这行代码前定义实例原型的方法
p.say()
```

##### 静态方法

> 自带

``` js
// 查询数据有两种方式，await（promise.then）或回调函数
let data = await Model.find() 
// or 
Model.find(function (err, data) {
    
})

// 但绝不能同时用await和回调函数
// 错误！会查询两次
await Model.find(function (err, data) {
    
})


// 此时为进行查询
let a = Model.find()

// 可以之后再进行查询
a.exec(function (err, data) {
    
})
```

>  自己定义

``` js
peopleSchema.statics.findByName = function(name) {
    return this.find({ name })
}
// or
peopleSchema.static('findByName', function(name) {
    return this.find({ name })
})

const People = mongoose.model('people', peopleSchema)
let data = await People.findByName('akara')
```

##### Query Helper

首先`Query`是什么？

``` js
console.log(People.find()) // 返回的是Query类的实例，豁然开朗
```

而`Query`本身是可以链式操作的，比如

``` js
let data = await People.find().where('age').gte(10).lte(20)
```

所以我们也可以自定义链式的方法，也就是这里的`Query Helper`

``` js
peopleSchema.query.byName = function(name) {
    return this.find({name})
}

let data = await People.find().byName('akara')
```

##### 其他

从mongoose数据库随机选一条数据

``` js
Article.statics.findByRandom = async function() {
 const count = await this.count().exec();
 const random = Math.floor(Math.random() * count);
 return this.findOne()
  .skip(random)
  .exec();
};
```