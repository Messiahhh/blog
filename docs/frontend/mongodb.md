---
sidebarDepth: 4
---

## Mongodb

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