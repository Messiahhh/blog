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

// 向集合people存新数据
p.save() 

// 定义方法
peopleSchema.methods.say = function() {
    console.log('say something')
}
const Model = mongoose.model('people', peopleSchema) // 必须在这行代码前定义实例原型的方法
p.say()

// 查询数据
let data = await Model.find() 
```











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