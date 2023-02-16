"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[2461],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return d}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,u=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),f=l(r),d=a,m=f["".concat(c,".").concat(d)]||f[d]||s[d]||u;return r?n.createElement(m,o(o({ref:t},p),{},{components:r})):n.createElement(m,o({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var u=r.length,o=new Array(u);o[0]=f;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var l=2;l<u;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},4015:function(e,t,r){r.r(t),r.d(t,{assets:function(){return p},contentTitle:function(){return c},default:function(){return d},frontMatter:function(){return i},metadata:function(){return l},toc:function(){return s}});var n=r(7462),a=r(3366),u=(r(7294),r(3905)),o=["components"],i={},c="Tauri",l={unversionedId:"rust/tauri",id:"rust/tauri",title:"Tauri",description:"Tauri\u662f\u57fa\u4e8eRust\u5b9e\u73b0\u7684\u591a\u5e73\u53f0App\u89e3\u51b3\u65b9\u6848\uff0c\u76f8\u8f83\u4e8eElectron\u81ea\u5e26Chromiun\u548cNode\u7684\u81c3\u80bf\uff0cTauri\u5e94\u7528\u7684\u4f53\u79ef\u975e\u5e38\u5c0f\uff0c\u8fd9\u5f97\u76ca\u4e8eTauri\u4f7f\u7528\u64cd\u4f5c\u7cfb\u7edf\u6240\u81ea\u5e26\u7684\u6e32\u67d3\u5668\uff08\u6216\u8005\u8bf4WebView\uff09\u3002",source:"@site/docs/rust/tauri.md",sourceDirName:"rust",slug:"/rust/tauri",permalink:"/blog/docs/rust/tauri",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/rust/tauri.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"WebAssembly",permalink:"/blog/docs/rust/wasm"},next:{title:"\u97f3\u89c6\u9891\u5b66\u4e60",permalink:"/blog/docs/\u97f3\u89c6\u9891\u5b66\u4e60"}},p={},s=[{value:"Setup",id:"setup",level:2},{value:"Build",id:"build",level:2}],f={toc:s};function d(e){var t=e.components,r=(0,a.Z)(e,o);return(0,u.kt)("wrapper",(0,n.Z)({},f,r,{components:t,mdxType:"MDXLayout"}),(0,u.kt)("h1",{id:"tauri"},"Tauri"),(0,u.kt)("p",null,"Tauri\u662f\u57fa\u4e8eRust\u5b9e\u73b0\u7684\u591a\u5e73\u53f0App\u89e3\u51b3\u65b9\u6848\uff0c\u76f8\u8f83\u4e8eElectron\u81ea\u5e26Chromiun\u548cNode\u7684\u81c3\u80bf\uff0cTauri\u5e94\u7528\u7684\u4f53\u79ef\u975e\u5e38\u5c0f\uff0c\u8fd9\u5f97\u76ca\u4e8eTauri\u4f7f\u7528\u64cd\u4f5c\u7cfb\u7edf\u6240\u81ea\u5e26\u7684\u6e32\u67d3\u5668\uff08\u6216\u8005\u8bf4WebView\uff09\u3002"),(0,u.kt)("h2",{id:"setup"},"Setup"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-shell"},"pnpm create tauri-app\npnpm i\npnpm tauri dev\n")),(0,u.kt)("h2",{id:"build"},"Build"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-shell"},"pnpm tauri build\n")))}d.isMDXComponent=!0}}]);