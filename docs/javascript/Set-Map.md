# Set And Map
## Set

它类似于数组，但是成员的值都是唯一的，没有重复的值。

```js
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

```js
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4] 实现了数组的去重
```

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

- `add(value)`：添加某个值，返回 Set 结构本身。
- `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `clear()`：清除所有成员，没有返回值。

## Map

类似于对象，是键值对的集合，但普通的对象的键只能是字符串，Map的键可以不是。

```js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

比如这里， Map实例m的一个键是对象o，键值为'content'。

## WeakSet / WeakMap

WeakSet 的成员只能是对象。其次，WeakSet 中的对象都是弱引用。

`WeakMap`只接受对象作为键名。其次，WeakMap 中的键名所指向的对象都是弱引用。



**弱引用**

指的是不被在引用计数中被计数的引用。


