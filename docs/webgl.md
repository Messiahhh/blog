---
sidebarDepth: 4
---

# Three.js

[更多代码案例](https://github.com/Messiahhh/PointsCloud)

### scene

``` js
const scene = new THREE.Scene()
```

### camera

``` js
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
```

### renderer

``` js
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
```

### geometry and material

给场景添加物品

``` js
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

const material = new THREE.PointsMaterial({
    size: 1,
    vertexColors: true
})

const points = new THREE.Points(geometry, material)
scene.add(points)
```

### 渲染

``` js
const animate = function () {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()
```

### controls

常用controls，比如`OrbitControl.js`，提供了良好的交互效果

``` js
const controls = new THREE.OrbitControls(camera, renderer.domElement)

camera.position.z = 10
controls.update()

const animate = function () {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}

animate()
```

### dat.gui.js

这个和Three.js没关系，不过有的官网例子中有用到，可以方便的修改数据。

``` js
const params = {
    name: 'akara', // 开发者
    size: 1, // 粒子大小
    color: '#25d25b', // 粒子颜色
    background: 0x000000, // 背景颜色
    flag: true,
}
const gui = new dat.GUI()
gui.add(params, 'name').name('开发者')
gui.add(params, 'size', 1, 10, 0.5).name('粒子大小').onChange(sizeChangeHandler)
gui.addColor(params, 'color').name('粒子颜色').onChange(colorChangeHandler)
gui.addColor(params, 'background').name('背景颜色').onChange(backgroundChangeHandler)
gui.add(params, 'flag').name('开启')
```

### stats.js

这个也和Three.js没关系，不过可以显示实时的帧数









