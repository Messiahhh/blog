---
sidebarDepth: 2
---
# 前端博客

[toc]

> 要秋招了，求Star...
>





## 其他

##### 分号的问题

平时我写JavaScript代码的时候习惯不加分号，因为这样子代码看着更加简洁，不过有的时候必须得加

``` javascript
let y = 2
let x = 1
[y, x] = [x, y]
```

以上代码就被会当成

``` javascript
let y = 2
let x = 1[y, x] = [x, y]
```

##### forEach中的async

``` javascript
function handle(x) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(x)
		}, 1000 * x)
	})
}

async function test() {
    const arr = [4, 2, 1]
    arr.forEach(async item => {
        const res = await handle(item)
        console.log(res)
    })
}
// 等价于
async function test() {
    const arr = [4, 2, 1]
    async function A(item) {
        const res = await handle(item)
        console.log(res)
    }
    A(4)
    A(2)
    A(1)
}

```

期望的结果

``` js
4 
2 
1
结束
```

实际上的输出

``` js
结束
1
2
4
```

这是由于第一个函数的执行并没有阻塞第二个函数的执行。



**解决方案**

``` js
async function test() {
	let arr = [4, 2, 1]
    for (let i of arr) {
        let res = await handle(i)
        console.log(res);
    }
	console.log('结束')
}
```





##### 移动端300ms延迟

以前的移动端网页，点击事件会有个300ms的延迟，Fastclick库就是为了解决这个问题的。

不过现代化的浏览器已经没有这问题了。

``` html
<meta name="viewport" content="width=device-width, initial-scale=1">
```



##### 二维码登录流程

[流程](https://mp.weixin.qq.com/s/xVk2hGnBRRCgtL9tYWWarw)





## 参考链接

> 本博客攥写过程中所参考过的网站/博客，或是一些个人觉得十分有价值的网站。目前就放了几个链接，以后会把更多优质的链接放在下面



[ECMAScript 6 入门教程](https://es6.ruanyifeng.com/)

[前端面试查漏补缺](https://juejin.im/post/5c73347cf265da2dd773e7dc)

[前端工程师面试宝典](https://fecommunity.github.io/front-end-interview/)

[React 源码剖析系列 － 不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)

[这才是真正的Git——Git内部原理揭秘！](https://zhuanlan.zhihu.com/p/96631135)

[浏览器将标签转成 DOM 的过程](https://segmentfault.com/a/1190000018730884)

[探秘 flex 上下文中神奇的自动 margin](https://www.cnblogs.com/coco1s/p/10910588.html)

[神三元的博客](http://47.98.159.95/my_blog/)


