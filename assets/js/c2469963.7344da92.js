"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[2380],{3905:(e,r,t)=>{t.d(r,{Zo:()=>u,kt:()=>f});var n=t(7294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=n.createContext({}),l=function(e){var r=n.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},u=function(e){var r=l(e.components);return n.createElement(p.Provider,{value:r},e.children)},s="mdxType",d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),s=l(t),m=a,f=s["".concat(p,".").concat(m)]||s[m]||d[m]||o;return t?n.createElement(f,c(c({ref:r},u),{},{components:t})):n.createElement(f,c({ref:r},u))}));function f(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,c=new Array(o);c[0]=m;var i={};for(var p in r)hasOwnProperty.call(r,p)&&(i[p]=r[p]);i.originalType=e,i[s]="string"==typeof e?e:a,c[1]=i;for(var l=2;l<o;l++)c[l]=t[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},7166:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>p,contentTitle:()=>c,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var n=t(7462),a=(t(7294),t(3905));const o={},c=void 0,i={unversionedId:"\u7b2c\u4e09\u65b9\u5e93",id:"\u7b2c\u4e09\u65b9\u5e93",title:"\u7b2c\u4e09\u65b9\u5e93",description:"Three Party Library",source:"@site/docs/\u7b2c\u4e09\u65b9\u5e93.md",sourceDirName:".",slug:"/\u7b2c\u4e09\u65b9\u5e93",permalink:"/blog/docs/\u7b2c\u4e09\u65b9\u5e93",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/\u7b2c\u4e09\u65b9\u5e93.md",tags:[],version:"current",frontMatter:{}},p={},l=[{value:"Three Party Library",id:"three-party-library",level:3},{value:"React-DnD",id:"react-dnd",level:5},{value:"Item Type",id:"item-type",level:6}],u={toc:l},s="wrapper";function d(e){let{components:r,...t}=e;return(0,a.kt)(s,(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"three-party-library"},"Three Party Library"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u8bb0\u5f55\u4e00\u4e9b\u7279\u5b9a\u60c5\u51b5\u5f88\u6709\u7528\u7684\u7b2c\u4e09\u65b9\u5e93")),(0,a.kt)("h5",{id:"react-dnd"},"React-DnD"),(0,a.kt)("p",null,"\u63d0\u4f9b\u4e86\u62d6\u653e\u529f\u80fd\uff0c\u57fa\u4e8eReact\u548cHook"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"import { DndProvider } from 'react-dnd'\nimport { HTML5Backend } from 'react-dnd-html5-backend'\n\nfunction App() {\n    return (\n        <DndProvider backend={HTML5Backend}>\n            <Example />\n        </DndProvider>\n    )\n}\n")),(0,a.kt)("p",null,"\u88ab\u62d6\u653e\u5143\u7d20\uff0c\u5373",(0,a.kt)("inlineCode",{parentName:"p"},"Drag Source")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"function S() {\n    const [{ isDragging }, drag] = useDrag({\n        item: { type: 'test' },\n        collect: (monitor) => ({\n          isDragging: !!monitor.isDragging(), // \u5143\u7d20\u662f\u5426\u6b63\u5728\u88ab\u62d6\u52a8\n        }),\n      })\n    return (\n        <div ref={drag}></div>\n    )\n}\n")),(0,a.kt)("p",null,"\u653e\u7f6e\u533a\uff0c\u5373",(0,a.kt)("inlineCode",{parentName:"p"},"Drop Target")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"function T() {\n    const [{ isOver, canDrop }, drop] = useDrop({\n        accept: 'test', // \n        canDrop: () => canMoveKnight(x, y), // canDrop\u53d6\u51b3\u4e8e\u51fd\u6570\u7684\u8fd4\u56de\u503c\n        drop: () => moveKnight(x, y), // \u5f53\u5143\u7d20\u88ab\u62d6\u8fdb\u5230\u653e\u7f6e\u533a\u65f6\u8c03\u7528\u8be5\u51fd\u6570\n        collect: (monitor) => ({\n          isOver: !!monitor.isOver(), // \u5143\u7d20\u662f\u5426\u5904\u4e8e\u653e\u7f6e\u533a\u4e0a\u65b9\n          canDrop: !!monitor.canDrop(),\n        }),\n      })\n    return (\n        <div ref={drop}></div>\n    )\n}\n")),(0,a.kt)("h6",{id:"item-type"},"Item Type"),(0,a.kt)("p",null,"\u6bd4\u5982\u6709\u53ef\u62d6\u52a8\u5143\u7d20A\u548cB\uff0c\u653e\u7f6e\u533aC\u3002\u5e0c\u671b\u53ea\u6709A\u80fd\u88ab\u62d6\u653e\u5230C\u4e0a\u9762\uff0c\u53ef\u4ee5\u8fd9\u6837\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"// A\nitem: { type: 'a' }\n// B\nitem: { type: 'b' }\n// C\naccept: 'a'\n")))}d.isMDXComponent=!0}}]);