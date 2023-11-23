/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [

    // "browser",
    "HTML",
    "css",
    {
      type: 'category',
      label: 'JavaScript',
      link: {
        type: 'doc',
        id: 'javascript/basic',
      },
      items: [
        'javascript/数组',
        'javascript/对象',
        'javascript/函数',
        'javascript/Class',
        'javascript/Promise',
        'javascript/Generator',
        {
          type: 'doc',
          id: 'javascript/Set-Map',
          label: 'Set And Map'
        },
        'javascript/AJAX',
        // 'javascript/Fetch',
        'javascript/BOM',
        'javascript/DOM',
        'javascript/正则',
        'javascript/Date',
        'javascript/Proxy',
        // 'javascript/Reflect',
        // {
        //   type: 'doc',
        //   id:  'javascript/Set-Map',
        //   label: 'Set/Map'
        // },
        'javascript/装饰器',
        // 'javascript/Graphql',
        // 'javascript/BOM',
        // 'javascript/DOM',
        // 'javascript/事件',
        'javascript/杂项'
      ],
    },
    // "javascript",
    {
      type: 'category',
      label: 'Typescript',
      items: [
        {
          type: 'doc',
          id: 'typescript/config',
          label: 'tsconfig.json'
        },
        {
          type: 'doc',
          id: 'typescript/declaration',
          label: 'd.ts'
        },
        {
          type: 'doc',
          id: 'typescript/basic',
          label: '基础'
        },
        {
          type: 'doc',
          id: 'typescript/类型操作.mdx',
        },
        {
          type: 'doc',
          id: 'typescript/类型守卫',
        },
        {
          type: 'doc',
          id: 'typescript/类型断言',
        },
        {
          type: 'doc',
          id: 'typescript/声明合并',
        },
        {
          type: 'doc',
          id: 'typescript/逆变与协变',
        },
        {
          type: 'doc',
          id: 'typescript/工具类型',
        },
        {
          type: 'doc',
          id: 'typescript/版本更新日志.mdx',
        },
      ],
    },
    // "typescript",
    {
      type: 'category',
      label: 'Node',
      items: [
        {
          type: 'doc',
          id: 'node/module',
          label: '模块化'
        },
        {
          type: 'doc',
          id: 'node/npm',
          label: 'NPM'
        },
        {
          type: 'doc',
          id: 'node/pnpm',
          label: 'PNPM'
        },
        {
          type: 'doc',
          id: 'node/eventloop',
          label: '事件循环'
        },
        {
          type: 'doc',
          id: 'node/build-in-modules',
          label: '内置模块'
        },
        {
          type: 'doc',
          id: 'node/library',
          label: '第三方库'
        },
      ],
    },
    "vue",
    {
      type: 'category',
      label: 'React',
      link: {
        type: 'doc',
        id: 'react/React',
      },
      items: [
        'react/基础',
        'react/Hook',
        'react/进阶',
        'react/第三方库',
        {
          type: 'doc',
          id: 'react/types',
          label: '@types/react'
        }
      ],
    },
    {
      type: 'category',
      label: '前端工程化',
      link: {
        type: 'doc',
        id: 'infra/前端工程化',
      },
      items: [
        'infra/Babel',
        'infra/PostCSS',
        'infra/Webpack',
        'infra/Rollup',
        'infra/Test',
        'infra/CI',
        'infra/ESLint-and-Prettier'
      ],
    },
    {
      type: 'doc',
      id: 'binary',
      label: '二进制与编码'
    },
    {
      type: 'doc',
      id: 'browser',
      label: '浏览器原理'
    },
    {
      type: 'doc',
      id: 'canvas',
      label: 'Canvas学习'
    },
    '音视频学习',
    "git",
    "计算机网络",
    "前端安全",
    "异常处理",
    "编译原理",
    {
      type: 'category',
      label: 'Rust',
      items: [
        'rust/setup',
        'rust/index',
        'rust/modules',
        'rust/wasm',
        'rust/tauri'
      ],
    },
    "网站优化",
    "数据结构",
    "排序",
    "编程题",
    "mongodb",
    "mysql",
    "linux",
    "docker",
    // "设计模式",
    "websocket",
    // "webgl",
    "php",
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};

module.exports = sidebars;
