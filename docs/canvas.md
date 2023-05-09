# WebGL

浏览器所提供的WebGL给予了我们图形绘制的能力，WebGL本质上基于OpenGL ES2.0，而后者实际上是OpenGL的一个精简子集，缺少了一部分的能力（如几何着色器等）。

近年来WebGL2的实现也逐渐稳定，它基于OpenGL ES3.0。

``` js
const canvas = document.querySelector('canvas');
const webgl = canvas.getContext('webgl');
const webgl2 = canvas.getContext('webgl2');
```



## 渲染管线

1. CPU准备工作。着色器的编译、链接；顶点数据、顶点颜色、顶点UV坐标、顶点法线等数据的写入；纹理数据的写入等。

2. 顶点着色器。逐顶点执行，我们的顶点数据通常由3D建模软件导出，我们会先通过**模型矩阵Model**将模型空间转变为世界空间，再通过**视图矩阵View**将世界空间转变为观察空间，再通过**投影矩阵Projection（透视投影或正交投影）**转变为**齐次裁剪空间（Clip Space）**。以上的变换统称MVP变化。裁剪空间中坐标的XYZ三维都位于[-1,1]之间，W分量通常为1。后续（在第三步裁剪之后）GPU内部会通过**透视除法**将四维顶点转化成三维的**标准化设备坐标（NDC）**。

   ![](https://img-blog.csdn.net/20171229111837073?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYmllemhpaHVh/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

3. 图元装配、裁剪。根据指令将顶点组装成图元（线、三角形），并把齐次裁剪空间外的内容剔除。

4. 光栅化。

   ![img](https://img-blog.csdnimg.cn/b26e74a5ee5b4f8781cbe684ac25ebaa.png)

5. 片元着色器。GPU会将通过**视口变化**将NDC坐标转化成**屏幕空间（Screen Space）**坐标，并传入给片元着色器的`gl_FragCoord`。片元着色器逐屏幕像素执行，通常在此时实现滤镜（如通过LUT）或后处理（各种特效、模糊、边缘检测），最终将数据写入帧缓冲（显存）中。

6. 深度测试





## OpenGL Shading Language（GLSL）

### Vertex Shader

``` glsl
// vertex shader 顶点着色器
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
```
![vs](https://images2018.cnblogs.com/blog/669331/201803/669331-20180302113903143-870412752.png)



### Fragment Shader

``` glsl
// fragment shader 片段着色器/像素着色器
precision mediump float;

void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
}
```
![fs](https://img-blog.csdn.net/20140917135608231)

### atrribute

通常我们通过CPU将顶点坐标、颜色/UV、法向量写入GPU的显存当中，CPU的每个线程/管道会逐个读取（因此对于不同的线程，该值通常是不同的）对应的数据交给**顶点着色器Vertex Shade**，这些值通常用`attribute`声明。



### uniform

同样也是通过CPU写入，但`uniform`可以被顶点着色器以及片段着色器访问，另外对于不同GPU线程来说该值是相同的。



### varying

该值通常在顶点着色器中定义和赋值，后续对应的片段着色器中可以取到对应的值。插值。





### 数据类型

### 内置函数

- `abs(x)`，绝对值。
- `floor(x)`，获取整数部分。
- `fract(x)`，获取小数部分。
- `ceil(x)`，向上取整。
- `max(x, y)`，`min(x, y)`，`clamp(x, min, max)`
- `mix(a, b, t)`，混合（线性组合），`mix(a, b, t)`表示`a * (1 - t) + b * (t)`。
- `step(edge, x)`，当`x`小于`edge`时返回0，否则返回1。
- `smoothstep(edge0, edge1, x)`，当`x`小于`edge0`时返回0，当`x`大于`edge0`时返回1，否则返回的值为`edge0`到`edge1`的插值。
- `length(vec)`，返回向量的长度。





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

   











## 参考链接

1. https://juejin.cn/post/6891918137671811079

2. https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial
3. https://shaderific.com/glsl/common_functions.html
4. https://en.wikipedia.org/wiki/Blend_modes
