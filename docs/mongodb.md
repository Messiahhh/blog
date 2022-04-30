---
sidebarDepth: 4
---

# MongoDB

## 常用命令

``` shell
mongo # 进入数据库的cli交互界面
```



### 查看数据库

``` shell
show dbs
# 默认有这三个（还有个test数据库，由于初始该数据库内容为空，所以不显示）
# admin 
# config
# local
```



### 新建/切换数据库

``` 
use <数据库名>
```



### 删除数据库

``` shell
use <目标数据库>
db.dropDatabase() 
```



### 查看所有Collections

``` shell
show collections
# 显示当前数据库的所有集合（类似Mysql中的数据库表）
```



### 新建Collection

``` shell
db.createCollection(<集合名>)
# js代码 
# const p = mongoose.model('people', schema)
# p.save()
# 会创建一个集合peoples（注意：这里是复数）
```



### 删除Collection

``` shell
db.<集合名>.drop()
```



### 查找数据

``` shell
db.<集合名>.find() #查找当前集合的所有数据 
db.<集合名>.find({name: 'akara'}) # 根据条件查找
```



## Mongoose

`Node`中主要有两个库来连接`Mongodb`数据库，分别是同名的`mongodb`和`mongoose`，通常我们使用`Mongoose`

``` js
const mongoose = require('mongoose')
// mongodb默认运行在27017 port
mongoose.connect('mongodb://localhost/test', { // test为数据库名
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
const db = mongoose.connection
db.once('open', function () {
    // 定义Schema
    const peopleSchema = new mongoose.Schema({ 
        name: String,
    })

    // 定义Model
    // 会建立一个名为peoples(复数)的Collection
    const People = mongoose.model('people', peopleSchema) // Model { people }

    // p是一个Document
    const p = new People({ 
        name: 'akara'
    }) 

    await p.save()
})
```



### 添加数据

``` js
const People = mongoose.model('people', peopleSchema)
const p = new People({
    name: 'www'
})
p.save() // Document的实例方法save
```

这里我们使用了`Document`的实例方法`save`，我们同样可以自定义实例方法。

``` js
peopleSchema.methods.say = function() {
    console.log('say something')
}
const Model = mongoose.model('people', peopleSchema) 
p.say()
```



### 查找数据

``` js
const People = mongoose.model('people', peopleSchema)

// 查找Collection中所有Document
People.find(function (err, data) {  // Model的静态方法find
    console.log(data)
})

// 根据搜索条件查找数据
People.find({name: 'akara'}, function (err, data) { 
    console.log(data)
})

// ----------------- 分割线 ----------------
// 当然，除了使用回调函数的方式，我们也可以使用async/await来实现

const data = await People.find()
// or 
const data = await People.find({name: 'akara'})
console.log(data)
```

这里我们使用了`Model`的静态方法`find`来查找数据，除了自带的静态方法，我们也可以自己给`Model`这个类添加静态方法。

``` js
peopleSchema.statics.findByName = function(name) {
    return this.find({ name }) // 这里的this是Model
}
// or
peopleSchema.static('findByName', function(name) {
    return this.find({ name })
})

const People = mongoose.model('people', peopleSchema)
let data = await People.findByName('akara')
```

常用API：

- `Model.find()`
- `Model.findOne()`
- `Model.count()` 



### 更新数据

在`mongoose`中更新数据很简单，我们需要先查询到目标Document，然后以纯JS的形式修改它的属性，最后调用`save`即可。

``` js
const People = mongoose.model('people', peopleSchema)
let p = await People.findOne()
p.name = 'newName'
await p.save()
```

以上是大多数情况下我们应该用来更新数据的方式，只有少数情况下我们可以考虑使用`update()`、`updateOne()`、`updateMany()`、`findOneAndUpdate()`等方式来更新数据。



### Query

`Model.find()`本身返回的值是一个`Query`类的实例，这个类当然是`Mongoose`库自带的。

``` js
console.log(Model.find()) // Query {}
```

`Query`类实际上是继承于`Promise`的，所以我们才可以使用`await Model.find()`的形势获取其内部值。

``` js
const data = await Model.find()
```

`Query`是可以链式操作的，就像`Promise`也可以通过`.then`来链式操作一样。

``` js
let data = await People.find().where('age').gte(10).lte(20)
```

我们也可以去自定义链式操作的方法，也就是编写官网所说的`Query Helper`

``` js
peopleSchema.query.byName = function(name) {
    return this.find({name})
}

let data = await People.find().byName('akara')
```

另外`Query`实例上的`exec`方法，也可以让我们拿到数据

``` js
const query = People.find()
query.exec((err, data) => console.log(data))
```



### `_id`

每个Document默认都会有一条`_id`的属性

``` js
{ _id: ObjectId("5ff59ae87b43e51eccf83237"), ...} // _id是个对象

await Model.findById('5ff59ae87b43e51eccf83237') // 可以找到对应的数据 
```



### `createdAt`、`updatedAt`

用于自动给字段添加创建时间和修改时间

``` js
const peopleSchema = new mongoose.Schema({ 
    name: String,
}, {
    timestamps: {},
    // 也可以给字段改名
    // timestamps: {
    //     createdAt: 'created_at'
    // }
})
```

