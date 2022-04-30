``` js
const date = new Date()
const date = new Date(1620579575203) // 传入时间戳
const date = new Date('2020/10/1 20:50:00') // 传入字符串
```

## `getTime()`

获取日期所对应的时间戳。



## `toUTCString()`

返回日期对象对应的字符串，这里的UTC指的是使用世界标准时间（协调世界时）。我们已UTC时间为基准，北京位于东八区时区，领先UTC八个小时（UTC+8）。



## `toGMTString()`

GMT指的是英国格林尼治当地时间（UTC+0），因此这个方法返回的值和`toUTCString()`一致。



## `toISOString()`

该方法返回一个ISO格式的时间字符串（时区为UTC），其中z为后缀。

``` js
console.log(new Date().toISOString()) // 2021-05-09T16:34:10.534Z
```



## `toLocaleString()`

返回当地时区的时间。

``` js
const date = new Date()
console.log(date.toString()) // Mon May 10 2021 00:59:35 GMT+0800 (中国标准时间)
console.log(date.toLocaleString()) // 2021/5/10 上午12:59:35
console.log(date.toLocaleDateString()) // 2021/5/10
console.log(date.toLocaleTimeString()) // 上午12:59:35
```



## date-fns

对日期格式的处理是很常见的情况，比如一些日期组件库需要我们提供格式一致的数据，又或者有的时候我们要正确显示后端接口拿到的时间戳等等。

`moment.js`和`date-fns`都是用来处理时间格式的，后者的性能要好上不少。

``` js
const { format } = require('date-fns')
const zhCN = require('date-fns/locale/zh-CN')

format(new Date(), 'yyyy-MM-dd HH:mm:ss', { locale: zhCN })
```




