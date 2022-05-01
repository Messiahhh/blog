---
sidebarDepth: 4
---
# Mysql

> 主要是记一些API，记忆力下降容易忘

``` sql
mysql -u root -p password # 连接数据库

SHOW DATABASES; # 显示所有数据库
CREATE DATABASE xxx; # 创建数据库 
DROP DATABASE xxx; # 删除数据库

use xxx; # 选择数据库

SHOW TABLES; # 显示所有表
CREATE TABLE yyy(column_name column_type); # 新建表。可以同时设置主键/not null/递增/字符集等表的属性
DROP TABLE yyy;

SHOW CREATE TABLE yyy; # 查看某个表的具体属性
ALTER TABLE yyy engine=innodb # ALTER用于修改表的属性，此例子用来修改引擎

INSERT INTO user VALUES(null, 'akara', 'root') # 插入数据
DELETE FROM user WHERE user_id = '111' # 删除数据
UPDATE user SET user_name = 'admin' WHERE user_id = '111' # 更新数据
SELECT user_name, user_psw FROM user WHERE user_id = '111' # 查找数据
```



**Node中使用Mysql**

``` js
const mysql = require('mysql')
const bluebird = require('bluebird') // 非必须
const config = {
    host: 'localhost',
    user: 'user', // 数据库用户名
    password: 'password', // 数据库密码
    database: 'node', // 选中的数据库
}
let conn = mysql.createConnection(config)
conn = bluebird.promisifyAll(conn) // 非必须

conn.connect() // 好像不加这个也能用，建议加上

async function A() {
    let data = await conn.queryAsync('SELECT * FROM user')
    // do something
}
```

**联表查询**

比如我们有两个表user和question，大概结构如下

| user_id | user_name | user_psw |
| ------- | --------- | -------- |
| 1       | akara     | 123456   |

| q_id | q_title  | q_info   | user_id |
| ---- | -------- | -------- | ------- |
| 1    | 我是问题 | 我是描述 | 1       |

通过**内联表查询**，可以获得每个问题的提问人。

``` sql
SELECT u.user_name, q.q_title, q.q_info FROM user as u, question as q WHERE u.user_id = q.user_id
```



**事务**

首先，在MYSQL中只有使用了**Innodb**数据库引擎的数据库或表才支持事务。可以通过`show create table yyy`来查询一个表所使用的引擎。

通常Mysql默认是自动提交模式（即变量autocommit为ON），也就是会自动进行commit操作。

``` sql
show session variables like 'autocommit'; # 查询autocommit的值
set autocommit=0 # 不会自动提交，此时为OFF
set autocommit=1 # 自动提交，此时为ON
```

> 不过通过这样修改变量，并不会永久生效。若想永久生效，需要修改mysql配置文件。

- BEGIN 开始事务
- COMMIT 提交事务
- ROLLBACK 回滚事务

``` sql
BEGIN;
INSERT INTO user VALUES(NULL, 'A', 'a'); # 还未COMMIT，数据库无该数据
INSERT INTO user VALUE(NULL, 'B', 'b'); # 还未COMMIT，数据库无该数据
COMMIT; # 数据库有了A和B的数据
INSERT INTO user VALUES(NULL, 'C', 'c');
ROLLBACK; # 回滚了，相当于上一条没输入过
COMMIT; # 因为已经回滚，即使COMMIT也无C的数据
```
