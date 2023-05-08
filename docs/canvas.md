# WebGL

``` html
<canvas width="500" height="500"></canvas>
<script>
  const canvas = document.querySelector("canvas");
  const gl = canvas.getContext("webgl");

  // 颠倒图片
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  const vsSource = `
    precision mediump float;

    attribute vec2 aPosition;
    attribute vec2 aUV;

    varying vec2 vUV;
    varying vec2 vPos;

    void main() {
      gl_Position = vec4(aPosition, 0.0, 1.0);
      vUV = aUV;
      vPos = aPosition;
    }

  `;
  const fsSource = `
    precision mediump float;

    uniform sampler2D uTexture;
    uniform float uVar;

    varying vec2 vUV;
    varying vec2 vPos;

    void main() {
      vec4 sample_color = texture2D(uTexture, vUV);

      if (vPos.x > uVar) {
        gl_FragColor = vec4(sample_color.xyz, 0.8);
      } else {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0);
      }
    }
  `;

  const vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, vsSource);
  gl.compileShader(vs);

  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, fsSource);
  gl.compileShader(fs);

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      1.0, 1.0, 1, 1, -1.0, 1.0, 0, 1, -1.0, -1.0, 0, 0, -1.0, -1.0, 0, 0,
      1.0, -1.0, 1, 0, 1.0, 1.0, 1, 1,
    ]),
    gl.STATIC_DRAW
  );

  const location1 = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(location1, 2, gl.FLOAT, false, 16, 0);
  gl.enableVertexAttribArray(location1);
  const location2 = gl.getAttribLocation(program, "aUV");
  gl.vertexAttribPointer(location2, 2, gl.FLOAT, false, 16, 8);
  gl.enableVertexAttribArray(location2);

  const image = new Image();
  image.src = "./touxiang.JPG";
  image.onload = function () {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      image
    );

    // 宽高非2的幂时会返回纯黑图片
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const uniform1 = gl.getUniformLocation(program, "uTexture");
    gl.uniform1i(uniform1, 0); // texture0

    let value = 0.0;
    function draw() {
      const uniform2 = gl.getUniformLocation(program, "uVar");
      if (value <= 1.0) {
        gl.uniform1f(uniform2, (value += 0.01));
      } else {
        value = -1.0;
        gl.uniform1f(uniform2, value);
      }

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(draw);
    }
    draw();
  };
</script>
```

## OpenGL Shading Language（GLSL）

### Vertex Shader

``` glsl
// vertex shader 顶点着色器
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
```



### Fragment Shader

``` glsl
// fragment shader 片段着色器/像素着色器
precision mediump float;

void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
}
```



### atrribute

通常我们通过CPU将顶点坐标、颜色/UV、法向量写入GPU的显存当中，CPU的每个线程/管道会逐个读取（因此对于不同的线程，该值通常是不同的）对应的数据交给**顶点着色器Vertex Shade**，这些值通常用`attribute`声明。



### uniform

同样也是通过CPU写入，但`uniform`可以被顶点着色器以及片段着色器访问，另外对于不同GPU线程来说该值是相同的。



### varying

该值通常在顶点着色器中定义和赋值，后续对应的片段着色器中可以取到对应的值。插值。





### 数据类型

### 内置函数



### 纹理（Texture）、UV坐标与采样

把一张图片作为Texture纹理，图片左下角为(0, 0)，右上角为(1, 1)，可以通过UV坐标来进行采样。





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



## 随机数和噪声

噪声在图形学中存在着许多的应用，比如可以实现故障艺术。通常我们会借助随机数来生成噪声图，GLSL内置了`rand`这一确定性随机（即伪随机），但通常我们会自己实现一个伪随机函数。

``` glsl
y = fract(sin(x)*10000.0);
```

为了从二维向量生成随机数，以上的式子又可以被扩展成如下，式子中的魔法数字是经过实践后被广泛使用的数字。

``` glsl
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
```



## 混合模式

### 溶解

> TODO





## 模糊效果

> 高斯模糊





## WebGL渲染管线

1. CPU提供数据（顶点、颜色、UV、法线、纹理等）
2. 顶点着色器（MVP矩阵变换等）
3. 图元装配与裁剪
4. 光栅化
5. 片元着色器



## 线性代数

### 向量

- 向量相加
- 向量数乘
- 向量内积（点积），得到标量
- 向量外积（乘积），得到向量
- 向量的线性组合（常见的组合如线性插值）

### 矩阵

- 矩阵加法
- 矩阵乘法（向量的线性组合）



## Trouble Shooting

1. Shader代码记得加分号。

2. Shader代码中数字记得小数点。

3. 顶点顺序逆时针。

4. 图像绘制反了。

   ``` glsl
   this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
   ```

5. 图像绘制黑屏，纹理宽高需要是二的幂。

   ``` glsl
   this.gl.texParameteri(
     this.gl.TEXTURE_2D,
     this.gl.TEXTURE_MIN_FILTER,
     this.gl.LINEAR
   );
   this.gl.texParameteri(
     this.gl.TEXTURE_2D,
     this.gl.TEXTURE_WRAP_S,
     this.gl.CLAMP_TO_EDGE
   );
   this.gl.texParameteri(
     this.gl.TEXTURE_2D,
     this.gl.TEXTURE_WRAP_T,
     this.gl.CLAMP_TO_EDGE
   );
   ```

6. WebGL内置8个纹理单元，绑定多个纹理时需要提前激活。

   ``` glsl
   gl.activeTexture(gl.TEXTURE0);
   ```

   





## MVP和裁剪空间

> TODO



## 参考链接

1. https://juejin.cn/post/6891918137671811079

2. https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial
3. https://shaderific.com/glsl/common_functions.html
4. https://en.wikipedia.org/wiki/Blend_modes
