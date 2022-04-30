# 持续集成(CI)

市面上存在多款开源的持续集成工具，如`Jenkins`、`travis-ci`、`Github Action`，本博客就是借助`travis-ci`搭建的，而个人感觉`Github Action`很明显要更加优秀。

## Github Action

想要使用`Github Action`，我们只需要在项目的根目录创建`.github/workflows/index.yml`（`yaml`文件名可以随便取）。

对于一个`workflow`来说，我们需要设置何时触发工作流，以及工作流的具体任务。简单来说，一个`workflow`包括多个`job`，每个`job`包括多个`step`，我们可以在`step`中使用`action`或执行命令。

``` yaml
# ./.github/workflows/npm-publish.yml 

name: Node.js Package

on: # 何时触发工作流
  push:
    branches:
      - master # master分支push成功时触发
jobs:
  build: # 第一个job名
    runs-on: ubuntu-latest # 虚拟机环境
    steps:
      - uses: actions/checkout@v2 # 拉取仓库代码
      - uses: actions/setup-node@v2 # 搭建node环境
        with:
          node-version: 14
      - run: npm ci
      - run: npm run test
  publish-npm: # 第二个job名
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 14
          registry-url: https://registry.npmjs.org/
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}
  github-page:
    needs: build
    runs-on: ubuntu-latest
    steps:
        - uses: actions/checkout@v2
        - uses: crazy-max/ghaction-github-pages@v2
          with:
            target_branch: gh-pages
            build_dir: public
          env:
            GITHUB_TOKEN: ${{ secrets.REPO_TOKEN }}
```

在该配置中，我使用了官方的`action`：`actions/checkout@v2`、`actions/setup-node@v2`，以及第三方的`action`，我们也可以自己编写`action`供他人使用。

为了能够在CI中发布NPM模块，或是创建Git分支，我们都需要能够拿到对应的读写权限。为此我们可以先在这两个网站创建`Person Access Token`，然后以键值对的形式保存在`repo - Settings - Secrets`，之后我们的脚本就能够通过环境变量的键名拿到该Token。


