"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[8707],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>d});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=r.createContext({}),u=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=u(e.components);return r.createElement(i.Provider,{value:n},e.children)},s="mdxType",f={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),s=u(t),m=a,d=s["".concat(i,".").concat(m)]||s[m]||f[m]||o;return t?r.createElement(d,l(l({ref:n},c),{},{components:t})):r.createElement(d,l({ref:n},c))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=m;var p={};for(var i in n)hasOwnProperty.call(n,i)&&(p[i]=n[i]);p.originalType=e,p[s]="string"==typeof e?e:a,l[1]=p;for(var u=2;u<o;u++)l[u]=t[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},7668:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>l,default:()=>f,frontMatter:()=>o,metadata:()=>p,toc:()=>u});var r=t(7462),a=(t(7294),t(3905));const o={},l=void 0,p={unversionedId:"infra/Rollup",id:"infra/Rollup",title:"Rollup",description:"Webpack\u4f5c\u4e3a\u4e00\u4e2a\u6210\u719f\u7684\u6784\u5efa\u5de5\u5177\u88ab\u5e7f\u6cdb\u8fd0\u7528\u5728\u9879\u76ee\u7684\u5f00\u53d1\u5f53\u4e2d\uff0c\u800c\u5982\u679c\u6211\u4eec\u53ea\u662f\u60f3\u8981\u5f00\u53d1\u4e00\u4e2a\u7b2c\u4e09\u65b9\u6a21\u5757\uff0c\u6216\u8bb8Rollup\u662f\u4e2a\u4e0d\u9519\u7684\u9009\u62e9\u3002",source:"@site/docs/infra/Rollup.md",sourceDirName:"infra",slug:"/infra/Rollup",permalink:"/blog/docs/infra/Rollup",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/infra/Rollup.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Webpack",permalink:"/blog/docs/infra/Webpack"},next:{title:"\u524d\u7aef\u6d4b\u8bd5",permalink:"/blog/docs/infra/Test"}},i={},u=[],c={toc:u},s="wrapper";function f(e){let{components:n,...t}=e;return(0,a.kt)(s,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"Webpack"),"\u4f5c\u4e3a\u4e00\u4e2a\u6210\u719f\u7684\u6784\u5efa\u5de5\u5177\u88ab\u5e7f\u6cdb\u8fd0\u7528\u5728\u9879\u76ee\u7684\u5f00\u53d1\u5f53\u4e2d\uff0c\u800c\u5982\u679c\u6211\u4eec\u53ea\u662f\u60f3\u8981\u5f00\u53d1\u4e00\u4e2a\u7b2c\u4e09\u65b9\u6a21\u5757\uff0c\u6216\u8bb8",(0,a.kt)("inlineCode",{parentName:"p"},"Rollup"),"\u662f\u4e2a\u4e0d\u9519\u7684\u9009\u62e9\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'npm i -D rollup\nnpx rollup main.js --file bundle.js --format umd --name "myModule"\n')),(0,a.kt)("p",null,"\u901a\u8fc7",(0,a.kt)("inlineCode",{parentName:"p"},"Rollup"),"\u6211\u4eec\u80fd\u591f\u5c06\u6e90\u4ee3\u7801\u6253\u5305\u6210",(0,a.kt)("inlineCode",{parentName:"p"},"iife"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"cjs"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"umd"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"es"),"\u683c\u5f0f\u7684\u6a21\u5757\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"// rollup.config.js\nmodule.exports = {\n    input: 'src/main.js',\n    output: {\n        file: 'bundle.js',\n        format: 'es'\n    },\n    // \u4e5f\u53ef\u4ee5\u4e00\u6b21\u6027\u6784\u5efa\u591a\u79cd\u7c7b\u578b\u7684\u6a21\u5757\n    output: [\n        {\n            file: 'bundle.es.js',\n            format: 'es'\n        },\n        {\n            file: 'bundle.umd.js',\n            format: 'umd'\n        }\n    ]\n}\n")))}f.isMDXComponent=!0}}]);