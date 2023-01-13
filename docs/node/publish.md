# 发布模块
通常会编译多份产物
1. es产物，方便使用者进行tree shaking
2. lib产物（commonjs），默认无法按需加载，但使用者可以使用具体的路径来只引用想要的内容，或者使用插件（如babel-plugins-import）
3. dist产物（umd），无法按需加载，可以浏览器直接加载