"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[994],{3905:(e,n,t)=>{t.d(n,{Zo:()=>k,kt:()=>N});var o=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=o.createContext({}),c=function(e){var n=o.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},k=function(e){var n=c(e.components);return o.createElement(p.Provider,{value:n},e.children)},m="mdxType",s={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},d=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,p=e.parentName,k=i(e,["components","mdxType","originalType","parentName"]),m=c(t),d=r,N=m["".concat(p,".").concat(d)]||m[d]||s[d]||a;return t?o.createElement(N,l(l({ref:n},k),{},{components:t})):o.createElement(N,l({ref:n},k))}));function N(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,l=new Array(a);l[0]=d;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i[m]="string"==typeof e?e:r,l[1]=i;for(var c=2;c<a;c++)l[c]=t[c];return o.createElement.apply(null,l)}return o.createElement.apply(null,t)}d.displayName="MDXCreateElement"},8594:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>l,default:()=>s,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var o=t(7462),r=(t(7294),t(3905));const a={},l="\u4e8b\u4ef6\u5faa\u73af",i={unversionedId:"node/eventloop",id:"node/eventloop",title:"\u4e8b\u4ef6\u5faa\u73af",description:"\u6d4f\u89c8\u5668\u548cNode\u73af\u5883\u90fd\u5b58\u5728\u4e8b\u4ef6\u5faa\u73af\u8fd9\u4e00\u6982\u5ff5\uff0c\u4f46\u56e0\u4e3a\u5b83\u4eec\u57fa\u4e8e\u4e0d\u540c\u7684\u67b6\u6784\u6240\u4ee5\u5b9e\u73b0\u539f\u7406\u4e5f\u6709\u4e9b\u8bb8\u4e0d\u540c\uff0c\u6bd4\u5982\u6d4f\u89c8\u5668\u73af\u5883\u7684\u4e8b\u4ef6\u5faa\u73af\u662f\u901a\u8fc7\u4e3b\u7ebf\u7a0b\u548c\u5de5\u4f5c\u7ebf\u7a0b\u4e4b\u95f4\u7684\u8c03\u5ea6\u5b9e\u73b0\u7684\u3002\u53e6\u5916\uff0c\u5728Node\u7684 11.0\u7248\u672c\u7684\u53d1\u5e03\u4e4b\u540e\uff0c\u540c\u4e00\u6bb5\u4ee3\u7801\u5728\u4e24\u4e2a\u4e0d\u540c\u73af\u5883\u7684\u8868\u73b0\u4e5f\u8d8a\u6765\u8d8a\u76f8\u4f3c\u4e86\uff0c\u6240\u4ee5\u5728\u8fd9\u91cc\u6211\u4f1a\u4e3b\u8981\u4ee5\u6d4f\u89c8\u5668\u73af\u5883\u4ecb\u7ecd\u4e8b\u4ef6\u5faa\u73af\u7684\u539f\u7406\u3002",source:"@site/docs/node/eventloop.md",sourceDirName:"node",slug:"/node/eventloop",permalink:"/blog/docs/node/eventloop",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/node/eventloop.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"pnpm",permalink:"/blog/docs/node/pnpm"},next:{title:"\u5185\u7f6e\u6a21\u5757",permalink:"/blog/docs/node/build-in-modules"}},p={},c=[{value:"nextTick",id:"nexttick",level:2},{value:"Node\u4e8b\u4ef6\u5faa\u73af",id:"node\u4e8b\u4ef6\u5faa\u73af",level:2}],k={toc:c},m="wrapper";function s(e){let{components:n,...t}=e;return(0,r.kt)(m,(0,o.Z)({},k,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\u4e8b\u4ef6\u5faa\u73af"},"\u4e8b\u4ef6\u5faa\u73af"),(0,r.kt)("p",null,"\u6d4f\u89c8\u5668\u548cNode\u73af\u5883\u90fd\u5b58\u5728\u4e8b\u4ef6\u5faa\u73af\u8fd9\u4e00\u6982\u5ff5\uff0c\u4f46\u56e0\u4e3a\u5b83\u4eec\u57fa\u4e8e\u4e0d\u540c\u7684\u67b6\u6784\u6240\u4ee5\u5b9e\u73b0\u539f\u7406\u4e5f\u6709\u4e9b\u8bb8\u4e0d\u540c\uff0c\u6bd4\u5982\u6d4f\u89c8\u5668\u73af\u5883\u7684\u4e8b\u4ef6\u5faa\u73af\u662f\u901a\u8fc7\u4e3b\u7ebf\u7a0b\u548c\u5de5\u4f5c\u7ebf\u7a0b\u4e4b\u95f4\u7684\u8c03\u5ea6\u5b9e\u73b0\u7684\u3002\u53e6\u5916\uff0c\u5728Node\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"11.0"),"\u7248\u672c\u7684\u53d1\u5e03\u4e4b\u540e\uff0c\u540c\u4e00\u6bb5\u4ee3\u7801\u5728\u4e24\u4e2a\u4e0d\u540c\u73af\u5883\u7684\u8868\u73b0\u4e5f\u8d8a\u6765\u8d8a\u76f8\u4f3c\u4e86\uff0c\u6240\u4ee5\u5728\u8fd9\u91cc\u6211\u4f1a\u4e3b\u8981\u4ee5\u6d4f\u89c8\u5668\u73af\u5883\u4ecb\u7ecd\u4e8b\u4ef6\u5faa\u73af\u7684\u539f\u7406\u3002"),(0,r.kt)("p",null,"\u4f17\u6240\u5468\u77e5\u6d4f\u89c8\u5668\u662f\u57fa\u4e8e\u591a\u7ebf\u7a0b\u7684\uff0c\u9664\u4e86\u7528\u6765\u6e32\u67d3\u9875\u9762\u7684GUI\u6e32\u67d3\u7ebf\u7a0b\uff0c\u8fd8\u6709\u6267\u884cJavaScript\u4ee3\u7801\u7684\u4e3b\u7ebf\u7a0b\u548c\u5404\u79cd\u5de5\u4f5c\u7ebf\u7a0b\uff0c\u4e0d\u540c\u7684\u5de5\u4f5c\u7ebf\u7a0b\u5206\u522b\u7528\u6765\u5904\u7406\u5b9a\u65f6\u5668\u4efb\u52a1\u3001I/O\u64cd\u4f5c\u3001\u4e8b\u4ef6\u7b49\u64cd\u4f5c\u3002"),(0,r.kt)("p",null,"\u5f53\u6211\u4eec\u5728\u4e3b\u7ebf\u7a0b\u6267\u884c\u4e00\u6bb5\u4ee3\u7801\u65f6\uff0c\u901a\u5e38\u4f1a\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"fetch"),"\u6765\u53d1\u51fa\u4e00\u4e2a\u8bf7\u6c42\uff0c\u53d1\u8bf7\u6c42\u7684\u8fd9\u4e2a\u64cd\u4f5c\u662f\u4ea4\u7ed9\u4e13\u95e8\u7684\u5de5\u4f5c\u7ebf\u7a0b\u6765\u6267\u884c\u7684\uff0c\u56e0\u6b64\u8be5\u64cd\u4f5c\u672c\u8eab\u5e76\u4e0d\u4f1a\u963b\u585e\u540e\u7eed\u4ee3\u7801\u7684\u6267\u884c\u3002\u800c\u5f53\u6211\u4eec\u6536\u5230\u4e86\u5bf9\u5e94\u7684\u54cd\u5e94\u65f6\uff0c\u8be5\u5de5\u4f5c\u7ebf\u7a0b\u4f1a\u628a\u4e00\u4e2a",(0,r.kt)("strong",{parentName:"p"},"\u4efb\u52a1"),"\u4ea4\u7ed9\u4e3b\u7ebf\u7a0b\u6267\u884c\uff0c\u8fd9\u5c31\u662f\u6240\u8c13\u7684",(0,r.kt)("strong",{parentName:"p"},"\u5f02\u6b65"),"\u3002"),(0,r.kt)("p",null,"\u5f53\u7136\u4e86\uff0c\u6b64\u65f6\u6211\u4eec\u7684\u4e3b\u7ebf\u7a0b\u53ef\u80fd\u8fd8\u5728\u6267\u884c\u4ee3\u7801\u4e2d\uff0c\u6240\u4ee5\u5b9e\u9645\u4e0a\u4efb\u52a1\u5e76\u4e0d\u4f1a\u7acb\u523b\u88ab\u4ea4\u7ed9\u4e3b\u7ebf\u7a0b\u6267\u884c\uff0c\u4e0e\u4e4b\u5bf9\u5e94\u7684\u662f\u8be5\u4efb\u52a1\u4f1a\u88ab\u6dfb\u52a0\u8fdb\u4e00\u4e2a\u4e13\u95e8\u7684",(0,r.kt)("strong",{parentName:"p"},"\u4efb\u52a1\u961f\u5217"),"\u5f53\u4e2d\uff0c\u4e3b\u7ebf\u7a0b\u6267\u884c\u5b8c\u4ee3\u7801\u540e\u4f1a\u4ece\u4efb\u52a1\u961f\u5217\u4e2d\u53d6\u51fa\u4efb\u52a1\u6765\u6267\u884c\u3002\u4e0d\u4ec5\u5982\u6b64\uff0c\u6839\u636e\u4e0d\u540c\u7684\u7c7b\u578b\u6211\u4eec\u53c8\u628a\u4efb\u52a1\u5206\u4e3a",(0,r.kt)("strong",{parentName:"p"},"\u5b8f\u4efb\u52a1"),"\u548c",(0,r.kt)("strong",{parentName:"p"},"\u5fae\u4efb\u52a1"),"\uff0c\u56e0\u6b64\u6211\u4eec\u7684\u961f\u5217\u4e5f\u6709\u4e24\u4e2a\uff1a",(0,r.kt)("strong",{parentName:"p"},"\u5b8f\u4efb\u52a1\u961f\u5217"),"\u548c",(0,r.kt)("strong",{parentName:"p"},"\u5fae\u4efb\u52a1\u961f\u5217"),"\u3002"),(0,r.kt)("p",null,"\u90a3\u4e48\u5148\u8ba9\u6211\u4eec\u660e\u786e\u54ea\u4e9b\u4efb\u52a1\u5c5e\u4e8e\u5b8f\u4efb\u52a1\u548c\u5fae\u4efb\u52a1\uff0c\u9996\u5148\u6211\u4eec\u53ef\u4ee5\u628a\u6700\u521d\u4ea4\u7ed9\u4e3b\u7ebf\u7a0b\u6267\u884c\u7684\u4ee3\u7801\u89c6\u4e3a\u4e00\u4e2a\u5b8f\u4efb\u52a1\uff0c\u5176\u4ed6\u7684\u5b8f\u4efb\u52a1\u5305\u62ec\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"setTimeout"),"\u6216 ",(0,r.kt)("inlineCode",{parentName:"p"},"setInterval"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"I/O"),"\u64cd\u4f5c\uff08\u5982 ",(0,r.kt)("inlineCode",{parentName:"p"},"ajax"),"\u6216\u6587\u4ef6\u8bfb\u53d6\uff09\u3001\u4e8b\u4ef6\uff08\u5982\u70b9\u51fb\u4e8b\u4ef6\uff09\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"setImmediate"),"\uff08Node\u4e13\u6709\uff09\u3002\u800c\u6700\u5e38\u89c1\u7684\u5fae\u4efb\u52a1\u6709 ",(0,r.kt)("inlineCode",{parentName:"p"},"promise.then()"),"\u3002"),(0,r.kt)("p",null,"\u4e8b\u4ef6\u5faa\u73af\u7684\u57fa\u672c\u89c4\u5219\u5c31\u662f\uff0c\u6267\u884c\u5b8c\u4e00\u4e2a\u5b8f\u4efb\u52a1\uff0c\u518d\u6267\u884c\u5fae\u4efb\u52a1\u961f\u5217\u4e2d\u7684\u6240\u6709\u5fae\u4efb\u52a1\uff0c\u518d\u6267\u884c\u4e0b\u4e00\u4e2a\u5b8f\u4efb\u52a1...\u5982\u6b64\u5f80\u590d\u3002\u56e0\u6b64\u4e00\u4e2a\u4e8b\u4ef6\u5faa\u73af\u53ef\u4ee5\u89c6\u4e3a\u4e00\u4e2a\u5b8f\u4efb\u52a1+\u6240\u6709\u5fae\u4efb\u52a1\uff0c\u53e6\u5916\u4e5f\u53ef\u4ee5\u628a\u6267\u884c\u4e00\u4e2a\u5b8f\u4efb\u52a1\u7684\u9636\u6bb5\uff0c\u6216\u7740\u6267\u884c\u6240\u6709\u5fae\u4efb\u52a1\u7684\u9636\u6bb5\uff0c\u79f0\u4f5c\u4e00\u4e2a ",(0,r.kt)("inlineCode",{parentName:"p"},"tick"),"\uff0c\u7531\u6b64\u53ef\u89c1\u4e00\u4e2a\u4e8b\u4ef6\u5faa\u73af\u7531\u4e24\u4e2a ",(0,r.kt)("inlineCode",{parentName:"p"},"tick"),"\u7ec4\u6210\u3002\u65e0\u8bba\u662f\u5bf9\u4e8eNode\u4e2d\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"process.nextTick"),"\u8fd8\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"Vue"),"\u4e2d\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"$.nextTick"),"\uff0c\u7406\u89e3\u4f55\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"tick"),"\u90fd\u662f\u5f88\u6709\u5e2e\u52a9\u7684\u3002"),(0,r.kt)("h2",{id:"nexttick"},"nextTick"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"process.nextTick"),"\u662fNode\u72ec\u6709\u7684\u4e00\u4e2a\u65b9\u6cd5\uff0c\u987e\u540d\u601d\u4e49\u6211\u4eec\u53ef\u4ee5\u77e5\u9053\u8fd9\u4e2a\u65b9\u6cd5\u7684\u76ee\u7684\u662f\u8ba9\u67d0\u4e2a\u4efb\u52a1\u5728\u4e0b\u4e00\u4e2a ",(0,r.kt)("inlineCode",{parentName:"p"},"tick"),"\u7684\u6700\u5f00\u59cb\u6267\u884c\u3002\u6bd4\u5982\uff0c\u5f53\u6211\u4eec\u5904\u5728\u4e00\u4e2a\u5b8f\u4efb\u52a1\u9636\u6bb5\u8c03\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"process.nextTick"),"\uff0c\u90a3\u4e48\u4f1a\u5728\u5f53\u524d\u5b8f\u4efb\u52a1\u6267\u884c\u7ed3\u675f\u540e\uff0c\u5728\u540e\u7eed\u7684\u5fae\u4efb\u52a1\u9636\u6bb5\u6267\u884c\u524d\u6267\u884c ",(0,r.kt)("inlineCode",{parentName:"p"},"nextTick"),"\u63a5\u53d7\u7684\u56de\u8c03\u51fd\u6570\u3002"),(0,r.kt)("p",null,"\u4e8b\u5b9e\u4e0a\u5728Node\u4e2d\u4e13\u95e8\u7ef4\u62a4\u4e86\u4e00\u4e2a ",(0,r.kt)("inlineCode",{parentName:"p"},"nextTick"),"\u961f\u5217\uff0c\u6bcf\u5f53\u6211\u4eec\u6267\u884c\u5b8c\u4e00\u4e2a ",(0,r.kt)("inlineCode",{parentName:"p"},"tick"),"\uff0c\u5c31\u4f1a\u6267\u884c ",(0,r.kt)("inlineCode",{parentName:"p"},"nextTick"),"\u961f\u5217\u4e2d\u7684\u6240\u6709\u4efb\u52a1\uff08\u884c\u4e3a\u5f88\u50cf\u5fae\u4efb\u52a1\u961f\u5217\uff09\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"// \u53ef\u4ee5\u60f3\u4e00\u60f3\u8fd9\u4e2a\u4ee3\u7801\u7684\u7ed3\u679c\nsetTimeout(() => {\n    console.log(1)\n    process.nextTick(() => {\n        console.log(2)\n    })\n}, 0)\n\nnew Promise((resolve) => resolve())\n.then(() => {\n    console.log(3)\n    process.nextTick(() => {\n        console.log(4)\n    })\n})\n\nprocess.nextTick(() => {\n    console.log(5)\n    process.nextTick(() => {\n        console.log(6)\n    })\n    setImmediate(function () {\n        console.log(7)\n    })\n})\n\nprocess.nextTick(function () {\n    console.log(8)\n    process.nextTick(() => {\n        console.log(9)\n    })\n})\n")),(0,r.kt)("h2",{id:"node\u4e8b\u4ef6\u5faa\u73af"},"Node\u4e8b\u4ef6\u5faa\u73af"),(0,r.kt)("p",null,"Node\u7684\u67b6\u6784\u548c\u6d4f\u89c8\u5668\u6709\u5f88\u5927\u4e0d\u540c\uff0c\u56e0\u6b64\u5b83\u5b9e\u73b0\u4e8b\u4ef6\u5faa\u73af\u7684\u65b9\u5f0f\u4e5f\u5927\u76f8\u5f84\u5ead\u3002Node\u7684\u4e8b\u4ef6\u5faa\u73af\u4e2d\u6709",(0,r.kt)("strong",{parentName:"p"},"\u516d\u4e2a\u9636\u6bb5"),"\uff0c",(0,r.kt)("strong",{parentName:"p"},"\u6bcf\u4e2a\u9636\u6bb5\u4e2d\u90fd\u6709\u4e00\u4e2a\u5b8f\u961f\u5217\uff0c\u603b\u5171\u53ea\u6709\u4e00\u4e2a\u5fae\u961f\u5217\u548c\u4e00\u4e2a ",(0,r.kt)("inlineCode",{parentName:"strong"},"nextTick"),"\u961f\u5217"),"\u3002"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"Timer"),": ",(0,r.kt)("inlineCode",{parentName:"li"},"SetTimeout"),"\u548c ",(0,r.kt)("inlineCode",{parentName:"li"},"SetInterval"),"\u7684\u56de\u8c03\u653e\u8fdb\u8be5\u9636\u6bb5\u7684\u4efb\u52a1\u961f\u5217\u3002"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"pending callback"),": \u6267\u884c\u4e00\u4e9b\u7cfb\u7edf\u64cd\u4f5c\u7684\u56de\u8c03\uff0c\u4f8b\u5982TCP\u7684\u9519\u8bef\u3002"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"idle, prepare"),": \u5904\u7406\u4e00\u4e9b\u5185\u90e8\u8c03\u7528\u3002"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"poll"),": ",(0,r.kt)("strong",{parentName:"li"},"\u5927\u90e8\u5206\u5176\u4ed6\u56de\u8c03\u4f1a\u88ab\u4eff\u4f5b\u8be5\u9636\u6bb5\u7684\u4efb\u52a1\u961f\u5217")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"check"),": ",(0,r.kt)("inlineCode",{parentName:"li"},"SetImmediate"),"\u7684\u56de\u8c03\u653e\u8fdb\u8be5\u9636\u6bb5\u7684\u4efb\u52a1\u961f\u5217\u3002"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"close callback"),": \u4e00\u4e9b\u7ed3\u675f\u65f6\u7684\u56de\u8c03\uff0c\u4f8b\u5982 ",(0,r.kt)("inlineCode",{parentName:"li"},'Socket.on("close")'))),(0,r.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u53ea\u91cd\u70b9\u5173\u6ce8\u4e09\u4e2a\u9636\u6bb5\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"Timer"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"poll"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"check"),"\u3002"),(0,r.kt)("p",null,"\u4f4e\u7248\u672c\uff08",(0,r.kt)("inlineCode",{parentName:"p"},"v11.0"),"\u4ee5\u524d\uff09\u7684Node\u8868\u73b0\u7684\u884c\u4e3a\u548c\u6d4f\u89c8\u5668\u73af\u5883\u6709\u5f88\u5927\u7684\u4e0d\u540c\uff0c\u662f\u56e0\u4e3a\u4f4e\u7248\u672c\u4e0b\u7684Node\u5728\u6267\u884c\u5b8c",(0,r.kt)("strong",{parentName:"p"},"\u4e00\u4e2a\u9636\u6bb5\u7684\u6240\u6709\u5b8f\u4efb\u52a1"),"\u518d\u6267\u884c\u5fae\u4efb\u52a1\uff1b\u800c",(0,r.kt)("strong",{parentName:"p"},"\u9ad8\u7248\u672c\u7684Node\u8868\u73b0\u548c\u6d4f\u89c8\u5668\u4e00\u81f4"),"\uff0c\u5373\u6267\u884c\u5b8c\u4e00\u4e2a\u5b8f\u4efb\u52a1\u518d\u6267\u884c\u5fae\u4efb\u52a1\u3002"),(0,r.kt)("p",null,"\u4ee5\u4e0b\u7684\u8fd9\u6bb5\u4ee3\u7801\u5728\u4e0d\u540c\u7248\u672c\u7684Node\u4e0b\u8868\u73b0\u7684\u884c\u4e3a\u5c31\u4f1a\u6709\u6240\u4e0d\u540c"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"setImmediate(function(){\n    console.log(1);\n    process.nextTick(function(){\n        console.log(4)\n    }) \n})\nprocess.nextTick(function(){\n    console.log(2)\n    setImmediate(function(){\n        console.log(3);\n    })\n})\n")),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u5f53\u6211\u4eec\u9047\u5230 ",(0,r.kt)("inlineCode",{parentName:"li"},"setImmediate"),"\u540e\uff0c\u5c06\u5176\u56de\u8c03\u51fd\u6570\u653e\u8fdb ",(0,r.kt)("inlineCode",{parentName:"li"},"check"),"\u9636\u6bb5\u7684\u5b8f\u961f\u5217\u4e2d\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u5f53\u6211\u4eec\u9047\u5230 ",(0,r.kt)("inlineCode",{parentName:"li"},"process.nextTick"),"\u540e\uff0c\u5c06\u5176\u56de\u8c03\u51fd\u6570\u653e\u8fdb ",(0,r.kt)("inlineCode",{parentName:"li"},"nextTick"),"\u961f\u5217\u4e2d\u3002\u56e0\u4e3a\u6b64\u65f6\u540c\u6b65\u4ee3\u7801\uff08\u6216\u8005\u8bf4\u6700\u521d\u7684\u5b8f\u4efb\u52a1\uff09\u6267\u884c\u5b8c\u6bd5\uff0c\u90a3\u4e48\u6267\u884c ",(0,r.kt)("inlineCode",{parentName:"li"},"nextTick"),"\u961f\u5217\u4e2d\u7684\u4efb\u52a1\u3002"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("strong",{parentName:"li"},"\u8f93\u51fa2"),"\uff0c \u9047\u5230 ",(0,r.kt)("inlineCode",{parentName:"li"},"setImmediate"),"\u540e\uff0c\u5c06\u5176\u56de\u8c03\u51fd\u6570\u653e\u8fdb ",(0,r.kt)("inlineCode",{parentName:"li"},"check"),"\u9636\u6bb5\u7684\u5b8f\u961f\u5217\u4e2d\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u5f00\u59cb\u6267\u884c ",(0,r.kt)("inlineCode",{parentName:"li"},"check"),"\u961f\u5217\u4e2d\u7684\u5b8f\u4efb\u52a1\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u6267\u884c ",(0,r.kt)("inlineCode",{parentName:"li"},"check"),"\u7b2c\u4e00\u4e2a\u5b8f\u4efb\u52a1\uff0c",(0,r.kt)("strong",{parentName:"li"},"\u8f93\u51fa1"),"\uff0c\u5c06 ",(0,r.kt)("inlineCode",{parentName:"li"},"nextTick"),"\u7684\u56de\u8c03\u653e\u8fdb\u961f\u5217\u91cc\u3002")),(0,r.kt)("p",null,"\u4ee5\u4e0a\u4e94\u6b65\uff0c\u65e0\u8bba\u7248\u672c\u5982\u4f55\u90fd\u662f\u4e00\u81f4\u7684\uff0c\u63a5\u4e0b\u6765\u5c31\u662f\u9ad8\u4f4e\u7248\u672cNode\u7684\u4e0d\u540c\u3002"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u4f4e\u7248\u672cNode")),(0,r.kt)("p",null,"\u56e0\u4e3a\u4f4e\u7248\u672cNode\u662f\u6267",(0,r.kt)("strong",{parentName:"p"},"\u884c\u5b8c\u4e00\u4e2a\u9636\u6bb5\u4e2d\u7684\u5168\u90e8\u5b8f\u4efb\u52a1\u540e\uff0c\u518d\u6267\u884c\u5fae\u961f\u5217\u7684\u5168\u90e8\u4efb\u52a1"),"\u3002\u6240\u4ee5",(0,r.kt)("strong",{parentName:"p"},"\u5148\u8f93\u51fa3\uff0c\u518d\u8f93\u51fa4\u3002")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u9ad8\u7248\u672cNode")),(0,r.kt)("p",null,"\u56e0\u4e3a\u9ad8\u7248\u672cNode\u662f",(0,r.kt)("strong",{parentName:"p"},"\u6267\u884c\u5b8c\u4e00\u4e2a\u5b8f\u4efb\u52a1\uff0c\u5c31\u6267\u884c\u5fae\u961f\u5217\u7684\u5168\u90e8\u4efb\u52a1"),"\u3002\u6240\u4ee5",(0,r.kt)("strong",{parentName:"p"},"\u5148\u8f93\u51fa4\uff0c\u518d\u8f93\u51fa3\u3002")))}s.isMDXComponent=!0}}]);