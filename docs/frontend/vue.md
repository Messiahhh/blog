---
sidebarDepth: 4
---
## Vue

### Vue基础

``` vue
<div class='app'>
	{{ count }}
    <button @click='increment'>
        点我加一
    </button>
</div>
<script>
	const vm = new Vue({
        el: '.app',
        data: {
            count: 0
        },
        methods: {
            increment: function () {
                this.count++
            }
        }
    })
</script>
```

##### 指令

- `v-bind` 缩写为`:`
- `v-on` 缩写为`@`
- `v-show`
- `v-if`
- `v-else-if`
- `v-else`
- `v-for`
- `v-model`
- `v-text` ：等价于`{{}}`
- `v-html`
- `v-once`



##### v-if vs v-show

> `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
>
> `v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
>
> 相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
>
> 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。





##### options

- `el`
- `data`
- `computed`
- `methods`
- `template`
- `store`
- `router`

##### 生命周期

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestory
- destoryed

##### 组件间通信

###### 父子组件通信

父组件通过props传递数据给子组件。

父组件对子组件的自定义事件使用`v-on:eventName=doSomething`进行监听，当子组件内部触发了该自定义事件时（使用`$emit('eventName')`），父组件执行doSomething，从而实现子组件向父组件的通信。



###### 非父子组件通信

在简单的场景下，可以使用一个空的 Vue 实例作为事件总线。

``` javascript
var bus = new Vue()
// 触发组件 A 中的事件
bus.$emit('id-selected', 1)

// 在组件 B 创建的钩子中监听事件
bus.$on('id-selected', function (id) {
  // ...
})
```

复杂的情况下，我们可以使用Vuex。



### Vuex

``` javascript
const store = new Vuex.Store({
    state: {
        count: 0
    },

    getters: {
        countPlus: state => {
            return state.count + 1
        }
    },

    mutations: {
        increment: (state, payload) => {
            state.count += payload
        }
    }
})
new Vue({
    el: '.app',
    store,
    computed: {
        count: function() {
            return this.$store.state.count
        }
    },
    methods: {
        increment: function() {
            this.$store.commit('increment', 10)
        }
    },
    template: `
        <div>
            {{ count }}
            <button @click='increment'>点我</button>
        </div>
    `
})
```

##### mutation 和 action

action类似于mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作，Mutation只能包括同步操作。

### Vue Router

``` html
<div class="app">
    <router-link :to="/login"></router-link>
    <router-link :to="/logout"></router-link>
    <router-view></router-view>
</div>
```

``` javascript
const routes = [
    {
        path: '/login',
        component: { template: '<login></login>' }
    },
    {
        path: '/logout',
        component: { template: '<logout></logout>' }
    },
]

const router = new VueRouter({
    routes
})

const vm = new Vue({
    el: '.app',
    router
})
```

##### 动态路由匹配

如同/user/:id，/user/akara和/user/messiah都可以匹配到这个路由

``` javascript
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

##### 嵌套路由

简单来说就是router-view里面还有router-view

``` html
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

``` javascript
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

##### 路由导航

`router-link`提供了声明式导航，我们也可以使用`this.$router.push`进行函数式导航

``` javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

##### Hash模式和History模式

Hash模式的Url结构类似：`https://example.com/#user/akara`

History模式的Url结构类似：`https://example.com/user/akara`

无论哪种模式，本质都是使用的`history.pushState`，每次pushState后，会在浏览器的浏览记录中添加一个新的记录，但是并**不会触发页面刷新**，也**不会请求新的数据**。

```js
// 使用history模式
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

不过使用History模式需要后端进行配置，如果不配置，当用户访问 `https://example.com/user/akara`的时候会返回404。所以我们需要设置当URL匹配不到任何资源的时候，同返回同一个`index.html`。

##### 导航卫士



### 底层原理

##### nextTick

当我们修改`State`会重新渲染真实DOM，而这一步操作实际上是**异步的**。当我们修改`State`，它会把数据的改变缓存进一个队列当中，当一个事件循环结束（在Vue中把一个事件循环阶段称为`tick`）后，再渲染真实的DOM。

通过这种方式，即使我们在一个事件循环中修改多次数据，也只会渲染一次，提高了整体的性能。

如果我们需要在代码中获取更新后的DOM的值，需要使用`this.$nextTick`



``` vue
<template>
	<div>
        {{ state }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                state: '没更新'
            }
        },
        methods() {
            onClick() {
                this.state = '已更新'
                // 尝试获取DOM的值
                console.log(this.$el.textContent) // 没更新
                this.$nextTick(() => {
                    console.log(this.$el.textContent) // 已更新
                })
            }
        } 
    }
</script>
```







##### 双向绑定

Vue是通过数据劫持结合发布-订阅模式的方式，实现的双向绑定。通过Object.defineProperty()来劫持属性的，使用属性的时候触发getter函数，收集依赖；修改属性的时候触发setter函数，触发相应的回调。

1. Observer 对数据的属性进行递归遍历，使用Object.defineProperty进行数据劫持。
2. Compiler 用于将模板编译为渲染函数，并渲染视图页面
   1. parse使用正则等方式解析template中的指令，class，style等数据，生成AST（抽象语法树）
   2. optimize进行优化，标记静态节点，该节点会跳过diff
   3. generate，把AST转化为渲染函数，渲染函数用于生成虚拟DOM
3. Watcher 是Observer和Compiler之间通信的桥梁
   1. 自身实例化的时候，调用getter函数，向deps添加watch
   2. 当数据修改时，调用setter函数，调用deps.notify，执行watch的update函数
   3. 执行watch的update函数，重新生成虚拟DOM，并进行Diff对页面进行修改



###### 流水线解释

当我们使用`new Vue()  `生成Vue实例的时候，先会调用Vue._init 进行初始化。

1. 初始化生命周期，事件（以及initRender）

2. 调用BeforeCreate生命周期函数

3. 初始化数据（以及initInjections）

   1. 使用Object.defineProperty对data的属性进行数据劫持
   2. 当数据被渲染进页面时，调用get函数，把属性的Watcher放进dep内部的数组内
   3. 当数据被修改时，调用set函数，调用dep的notify方法，从而调用dep内部数组内所有Watcher的update方法

4. 调用Created生命周期函数

5. 查看有没有el参数，没有的话当vm.$mount()调用时进入下一步

6. 查看有没有template参数，有的话则把template转化成渲染函数，没有的话把el的outerHTML转化为渲染函数，渲染函数生成虚拟DOM

   1. parse用正则等方式解析template中的指令，class，style等数据，生成AST（抽象语法树）
   2. optimize用来标记静态节点，之后diff算法中就会跳过静态节点的对比
   3. generate把AST转化为渲染函数

7. 调用beforeMount生命周期函数

8. 利用虚拟DOM生成真实DOM并挂载在el元素上

9. 调用Mounted生命周期函数

   数据改变时

   1. 调用beforeUpdate生命周期函数

   2. 数据改变时，调用所有监听对应属性的Watcher的update函数，这个函数会把Watcher放进一个队列中，等到下一个tick时才取出。从而实现异步更新DOM。

   3. 重新生成虚拟DOM，并对新老VDom进行patch（patch的核心是diff算法）处理

      1. 如果oldVnode不存在，不存在则直接根据newVnode新建节点

      2. 调用sameVnode对oldVnode和newVnode进行比较，只有当key， tag， isComment都相同，同时定义或同时未定义data， 或者两个都是input且type相同时才是sameVnode。那么就对两个VNode进行patchVnode操作。如果不是sameVode，则直接进行替换。

         1. 如果新老VNode都是静态的，且key值相同，并且新的VNode标记了v-once或是clone，则只需替换elm和componentsinstance
         2. 新老VNode都有children，则使用updateChildren对子节点进行diff

            1. 对于oldVnode的children，用oldCh表示。对于newVnode的children，用newCh表示


            2. 首先定义 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 分别是新老两个 children 的两边的索引，同时 oldStartVnode、newStartVnode、oldEndVnode 以及 newEndVnode 分别指向这几个索引对应的VNode 节点。
            3. while循环，循环中oldStartIdx和oldEndIdx不断靠拢，newStartIdx和newEndIdx也不断靠拢。
            4. 比较，oldStartVnode和newStartVnode，oldEndVnode和newEndVnode   ，  oldStartVnode和newEndVnode  ， oldEndVnode和newStartVnode。如果两个是sameVnode则进行patchVnode, 不是就进行下一个的比较
            5. 如果以上四次比较都不是sameVnode，那么找oldCh有没有和newStartVnode是sameVnode的节点
               1.  如果设置了key，直接通过newStartVnode的key查看有没有key相同的Vnode
               2. 如果没有key，则通过循环，一个个的调用sameVnode函数比较。（体现了**key能够提高diff算法的效率**）
               3. 如果找不到相同的Vnode，则新建一个Vnode
            6. 循环结束。处理多余的或者不够的真实节点。oldStartIdx > oldEndIdx 新增节点 或者 newStartIdx > newEndIdx 删除节点。
    
         3. 如果oldVnode没有children，newVnode有，则先清空老节点的文本内容，再为DOM加入子节点
    
         4. 如果oldVnode有children，newVnode没有，则删除该节点所有子节点
    
         5. 如果新老节点都没有子节点，替换DOM的文本

10. 调用updated生命周期函数
11. 调用vm.$destroy()
12. 调用beforeDestroy生命周期函数
13. 删除组件（包括watchers和事件监听器等）
14. 调用destroyed生命周期函数





##### Vue的坑

准确来说是`Object.defineProperty`的坑。

也是为什么Vue3.0要用`proxy`改写。

###### Vue 不能检测对象属性的添加或删除

```js
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 `Vue.set(object, key, value)` 方法向嵌套对象添加响应式属性。例如，对于：

```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```

你可以添加一个新的 `age` 属性到嵌套的 `userProfile` 对象：

```js
Vue.set(vm.userProfile, 'age', 27)
```

你还可以使用 `vm.$set` 实例方法，它只是全局 `Vue.set` 的别名：

```js
vm.$set(vm.userProfile, 'age', 27)
```

###### 使用数组的方法

虽然数组也是对象，`Object.defineProperty`却不支持数组。

为了解决这种情况，Vue重写了数组的很多方法，如`push`，`pop`，`shift`，`unshift`，`splice`，`sort`，`reverse`。所以这些方法也将会触发视图更新。



尽管如此，由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

1. 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将触发状态更新

```js
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)

// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)
```

为了解决第二类问题，你可以使用 `splice`：

```
example1.items.splice(newLength)
```