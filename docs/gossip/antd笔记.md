## antd学习

``` shell
yarn add antd 
```



假设我们的项目是基于create-react-app开发的，那么配置通常是默认的。

为了修改webpack配置，我们可以使用`react-app-rewired`

由于新的 [react-app-rewired@2.x](https://github.com/timarney/react-app-rewired#alternatives) 版本的关系，还需要安装 [customize-cra](https://github.com/arackaf/customize-cra)

``` shell
yarn add react-app-rewired customize-cra
```

安装好包后，修改package.json文件

``` json
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

然后在项目根目录创建一个 `config-overrides.js` 用于修改默认配置。

``` js
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```





这样我们就可以修改默认的webpack配置了。



### 使用 babel-plugin-import

又来到了webpack的配置环节，通过该babel插件，实现按需加载组件代码和样式。