"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[1060],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>g});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):u(u({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},i="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),i=l(r),d=a,g=i["".concat(c,".").concat(d)]||i[d]||m[d]||o;return r?n.createElement(g,u(u({ref:t},p),{},{components:r})):n.createElement(g,u({ref:t},p))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,u=new Array(o);u[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[i]="string"==typeof e?e:a,u[1]=s;for(var l=2;l<o;l++)u[l]=r[l];return n.createElement.apply(null,u)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},3742:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>u,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const o={},u="\u5b89\u88c5",s={unversionedId:"rust/setup",id:"rust/setup",title:"\u5b89\u88c5",description:"rustup\uff08rust\u7248\u672c\u7ba1\u7406\uff09",source:"@site/docs/rust/setup.md",sourceDirName:"rust",slug:"/rust/setup",permalink:"/blog/docs/rust/setup",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/rust/setup.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u7f16\u8bd1\u539f\u7406",permalink:"/blog/docs/\u7f16\u8bd1\u539f\u7406"},next:{title:"\u8bed\u6cd5",permalink:"/blog/docs/rust/"}},c={},l=[{value:"rustup\uff08rust\u7248\u672c\u7ba1\u7406\uff09",id:"rustuprust\u7248\u672c\u7ba1\u7406",level:2},{value:"rustc\uff08\u7f16\u8bd1\u5668\uff09",id:"rustc\u7f16\u8bd1\u5668",level:2},{value:"cargo\uff08\u5305\u7ba1\u7406\uff09",id:"cargo\u5305\u7ba1\u7406",level:2},{value:"Cargo.toml\uff08\u914d\u7f6e\u6587\u4ef6\uff09",id:"cargotoml\u914d\u7f6e\u6587\u4ef6",level:2}],p={toc:l},i="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(i,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u5b89\u88c5"},"\u5b89\u88c5"),(0,a.kt)("h2",{id:"rustuprust\u7248\u672c\u7ba1\u7406"},"rustup\uff08rust\u7248\u672c\u7ba1\u7406\uff09"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"rustup"),"\u662f\u7ba1\u7406",(0,a.kt)("inlineCode",{parentName:"p"},"rust"),"\u7248\u672c\u7684\u5de5\u5177\uff0c\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5373\u53ef\u5b89\u88c5\u6700\u65b0\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"rust"),"\u7f16\u8bd1\u5668",(0,a.kt)("inlineCode",{parentName:"p"},"rustc"),"\u53ca\u5176\u5305\u7ba1\u7406\u5de5\u5177",(0,a.kt)("inlineCode",{parentName:"p"},"cargo")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh\nrustup update\n")),(0,a.kt)("h2",{id:"rustc\u7f16\u8bd1\u5668"},"rustc\uff08\u7f16\u8bd1\u5668\uff09"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"rustc --version \n\nrustc main.rs\n./main\n")),(0,a.kt)("h2",{id:"cargo\u5305\u7ba1\u7406"},"cargo\uff08\u5305\u7ba1\u7406\uff09"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u529f\u80fd\u7c7b\u4f3cNPM\uff0c\u5305\u62ec\u9879\u76ee\u7684\u521d\u59cb\u5316\u3001\u6a21\u5757\u7684\u5b89\u88c5\u4e0e\u7ba1\u7406\u3001\u4fbf\u6377\u7684\u811a\u672c\u547d\u4ee4")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"cargo --version \n\ncargo new projectName # \u521d\u59cb\u5316\u9879\u76ee\ncargo build # \u6784\u5efa/\u7f16\u8bd1\ncargo run # \u7f16\u8bd1\u540e\u7acb\u523b\u8fd0\u884c\ncargo check # \u7f16\u8bd1\u5e76\u8fdb\u884c\u4ee3\u7801\u68c0\u67e5\uff0c\u4f46\u4e0d\u751f\u6210\u4ea7\u7269\n")),(0,a.kt)("h2",{id:"cargotoml\u914d\u7f6e\u6587\u4ef6"},"Cargo.toml\uff08\u914d\u7f6e\u6587\u4ef6\uff09"),(0,a.kt)("p",null,"\u9879\u76ee\u914d\u7f6e\u6587\u4ef6\uff0c\u7c7b\u4f3c",(0,a.kt)("inlineCode",{parentName:"p"},"package.json")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-toml"},'[package]\nname = "guessing_game"\nversion = "0.1.0"\nedition = "2021"\n\n# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html\n[dependencies]\n')))}m.isMDXComponent=!0}}]);