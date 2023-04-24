# Canvas And WebGL
> TODO...

## Canvas

``` tsx
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d') as CanvasRenderingContext2D;
```



### toDataURL
``` js
canvas.toDataURL('image/png', 1)
```

### toBlob
``` js
canvas.toBlob(blob => {
    // 
}, 'image/png', 1)
```

### ImageData
除了`fillRect`、`fillStyle`、`drawImage`这类常见的Canvas API，我们还可以直接调用`putImageData`来逐个像素的绘制。

``` js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const [w, h] = [1, 1];
canvas.width = w;
canvas.height = h;
const imageData = new ImageData(new Uint8ClampedArray(Array(w * h).fill([0, 255, 0, 255]).flat(1)), w, h)
console.log(imageData)
context.putImageData(imageData, 0, 0)

canvas.toBlob(blob => {
    blob.arrayBuffer().then(buffer => {
        console.log('buffer1: ', new Uint8Array(buffer))
    })
}, 'image/png', 1);

fetch(canvas.toDataURL('image/png', 1)).then(res => res.arrayBuffer()).then(buffer => {
    console.log('buffer2:', new Uint8Array(buffer))
})
```
在上述例子中我们输出了`PNG`格式的图片编码内容，可以通过第三方的解码库将其还原为原本的内容。





## WebGL

``` tsx
const canvas = document.createElement('canvas');
const context = canvas.getContext('webgl') as WebGLRenderingContext;
```

