
## `Element.scrollLeft | Element.scrollTop` 

## `Element.scrollIntoView()`

通过滚动元素的父容器使得内部元素可见。

``` js
el.scrollIntoView()
el.scrollIntoView({
  behavior: 'auto', // 'auto' | 'smooth'
  block: 'start', // 垂直方向的对齐 'start' | 'center' | 'end' | 'nearest'
  inline: 'nearest', // 水平方向的对齐 'start' | 'center' | 'end' | 'nearest'
})
```

## `Element.getBoundingClientRect()`

获取DOM元素的大小和相对视口的位置

`<img src="https://mdn.mozillademos.org/files/15087/rect.png" style="zoom:50%;" />`

``` js
{
  bottom: 300
  height: 200
  left: 400
  right: 600
  top: 100
  width: 200
  x: 400
  y: 100
}
```




