"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[2724],{3905:function(n,e,t){t.d(e,{Zo:function(){return p},kt:function(){return g}});var r=t(7294);function o(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function a(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function c(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?a(Object(t),!0).forEach((function(e){o(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function i(n,e){if(null==n)return{};var t,r,o=function(n,e){if(null==n)return{};var t,r,o={},a=Object.keys(n);for(r=0;r<a.length;r++)t=a[r],e.indexOf(t)>=0||(o[t]=n[t]);return o}(n,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(r=0;r<a.length;r++)t=a[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(o[t]=n[t])}return o}var s=r.createContext({}),l=function(n){var e=r.useContext(s),t=e;return n&&(t="function"==typeof n?n(e):c(c({},e),n)),t},p=function(n){var e=l(n.components);return r.createElement(s.Provider,{value:e},n.children)},u={inlineCode:"code",wrapper:function(n){var e=n.children;return r.createElement(r.Fragment,{},e)}},f=r.forwardRef((function(n,e){var t=n.components,o=n.mdxType,a=n.originalType,s=n.parentName,p=i(n,["components","mdxType","originalType","parentName"]),f=l(t),g=o,m=f["".concat(s,".").concat(g)]||f[g]||u[g]||a;return t?r.createElement(m,c(c({ref:e},p),{},{components:t})):r.createElement(m,c({ref:e},p))}));function g(n,e){var t=arguments,o=e&&e.mdxType;if("string"==typeof n||o){var a=t.length,c=new Array(a);c[0]=f;var i={};for(var s in e)hasOwnProperty.call(e,s)&&(i[s]=e[s]);i.originalType=n,i.mdxType="string"==typeof n?n:o,c[1]=i;for(var l=2;l<a;l++)c[l]=t[l];return r.createElement.apply(null,c)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},2129:function(n,e,t){t.r(e),t.d(e,{assets:function(){return p},contentTitle:function(){return s},default:function(){return g},frontMatter:function(){return i},metadata:function(){return l},toc:function(){return u}});var r=t(7462),o=t(3366),a=(t(7294),t(3905)),c=["components"],i={},s="Decorator",l={unversionedId:"javascript/\u88c5\u9970\u5668",id:"javascript/\u88c5\u9970\u5668",title:"Decorator",description:"",source:"@site/docs/javascript/\u88c5\u9970\u5668.md",sourceDirName:"javascript",slug:"/javascript/\u88c5\u9970\u5668",permalink:"/blog/docs/javascript/\u88c5\u9970\u5668",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/javascript/\u88c5\u9970\u5668.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Proxy And Reflect",permalink:"/blog/docs/javascript/Proxy"},next:{title:"\u6742\u9879",permalink:"/blog/docs/javascript/\u6742\u9879"}},p={},u=[],f={toc:u};function g(n){var e=n.components,t=(0,o.Z)(n,c);return(0,a.kt)("wrapper",(0,r.Z)({},f,t,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"decorator"},"Decorator"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"// 1. \u7528\u4e8eclass\n// target\u8868\u793a\u7c7b\u672c\u8eab\nfunction setClassProperty(target) {\n   target.n = 'akara'\n}\n\n@setClassProperty\nclass People {\n   \n}\n\nconsole.log(People.n) // akara\n\n// 2. \u7528\u4e8e\u7c7b\u65b9\u6cd5\nfunction log(target, key, descriptor) {\n   const fn = descriptor.value\n   descriptor.value = function (...args) {\n       console.log(`calling ${key} with args: ${args}`)\n       return fn.apply(this, args)\n  }\n   return descriptor\n}\n\nclass People {\n   constructor(name, age) {\n       this.name = name\n       this.age = age\n  }\n\n   @log\n   getName() {\n       return this.name\n  }\n}\n\nconst p = new People('akara', 20)\nconsole.log(p.getName())\n\n// 3. \u7528\u4e8e\u5b9e\u4f8b\u5c5e\u6027\n// \u88c5\u9970\u5b9e\u4f8b\u5c5e\u6027\u7684\u65f6\u5019\uff0cdescriptor\u6709\u4e2a\u5c5e\u6027\u4e3ainitializer\n// \u901a\u8fc7\u4fee\u6539\u8fd9\u4e2a\u51fd\u6570\u7684\u8fd4\u56de\u503c\uff0c\u5b9e\u4f8b\u5316\u65f6\u7684\u5c5e\u6027\u503c\u4e5f\u4e0d\u540c\nfunction test(target, key, descriptor) {\n   const fn = descriptor.initializer\n   descriptor.initializer = function () {\n       const v = fn.apply(this)\n       const randomNumber = ~~(Math.random() * 1000)\n       return `${v}-${randomNumber}`\n  }\n}\n\nclass People {\n   @test\n   name = 'akara'\n}\n\nconst p = new People()\nconsole.log(p.name)\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"// \u6267\u884c\u987a\u5e8f 1 3 4 2\nfunction f() {\n  console.log(1);\n  return function (\n    target,\n    key,\n    descriptor,\n  ) {\n    console.log(2);\n  };\n}\n\nfunction g() {\n  console.log(3);\n  return function (\n    target,\n    key,\n    descriptor,\n  ) {\n    console.log(4);\n  };\n}\n\nclass C {\n  @f()\n  @g()\n  method() {}\n}\n\n// @f @g test \u76f8\u5f53\u4e8e\u6570\u5b66\u4e2d\u7684 f(g(test))\n")))}g.isMDXComponent=!0}}]);