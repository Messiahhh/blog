# Canvas And WebGL
> 不会，TODO...

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

``` js
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  return shader;
}

function createProgram(gl, vertex, fragment) {
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.useProgram(program);
  return program;
}

function generatePoints() {
  const points = [1, 0, 0, 1, 0, 0];

  const buffer = new Float32Array(points);

  return buffer;
}

// 初始化
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

const vertex = createShader(
  gl,
  gl.VERTEX_SHADER,
  document.querySelector("#vertex").text 
);
const fragment = createShader(
  gl,
  gl.FRAGMENT_SHADER,
  document.querySelector("#fragment").text
);
const program = createProgram(gl, vertex, fragment);

// 数据写入buffer
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, generatePoints(), gl.STATIC_DRAW);

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttributeLocation);

// 画布调整
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 绘制
gl.drawArrays(gl.POINTS, 0, 3);

```

### OpenGL Shading Language（GLSL）

#### Vertex Shader

``` glsl
// vertex shader 顶点着色器
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
```



#### Fragment Shader

``` glsl
// fragment shader 片段着色器/像素着色器
precision mediump float;

void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
}
```



#### atrribute

通常我们通过CPU将顶点坐标、颜色/UV、法向量写入GPU的显存当中，CPU的每个线程/管道会逐个读取（因此对于不同的线程，该值通常是不同的）对应的数据交给**顶点着色器Vertex Shade**，这些值通常用`attribute`声明。



#### uniform

同样也是通过CPU写入，但`uniform`可以被顶点着色器以及片段着色器访问，另外对于不同GPU线程来说该值是相同的。



#### varying

该值通常在顶点着色器中定义和赋值，后续对应的片段着色器中可以取到对应的值。





### drawArrays

`wegl`的实际绘制指令，我们实际上是绘制无数个顶点，绘制线段或三角形，本质上是在点与点之间进行线性插值。

``` js
gl.drawArrays(gl.POINTS, 0, 3) // 绘制三个顶点

gl.drawArrays(gl.LINES, 0, 2) // 绘制两个顶点，两个顶点之间的内容通过线性插值，因此最终看到的是线段

gl.drawArrays(gl.TRIANGLES, 0, 3) // 绘制三个顶点，三个顶点之间的内容通过线性插值，因此最终看到的是三角形

// 先绘制buffer中前三个顶点，再绘制后三个顶点，总共六个
gl.drawArrays(gl.TRIANGLES, 0, 3)
gl.drawArrays(gl.TRIANGLES, 3, 3)

```



### Texture 与 UV

把一张图片作为Texture纹理，图片左下角为(0, 0)，右上角为(1, 1)，可以通过UV坐标来进行采样。




### 裁剪空间
### MVP
> 不会，TODO
