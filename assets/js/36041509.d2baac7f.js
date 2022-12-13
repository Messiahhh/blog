"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[3781],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return d}});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=a.createContext({}),i=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=i(e.components);return a.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=i(t),d=r,g=m["".concat(p,".").concat(d)]||m[d]||u[d]||o;return t?a.createElement(g,l(l({ref:n},c),{},{components:t})):a.createElement(g,l({ref:n},c))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,l=new Array(o);l[0]=m;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s.mdxType="string"==typeof e?e:r,l[1]=s;for(var i=2;i<o;i++)l[i]=t[i];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},7269:function(e,n,t){t.r(n),t.d(n,{assets:function(){return c},contentTitle:function(){return p},default:function(){return d},frontMatter:function(){return s},metadata:function(){return i},toc:function(){return u}});var a=t(7462),r=t(3366),o=(t(7294),t(3905)),l=["components"],s={},p="Class",i={unversionedId:"javascript/Class",id:"javascript/Class",title:"Class",description:"\u5728\u4ee5\u5f80\u6784\u9020\u51fd\u6570\u7684\u5199\u6cd5\u4e2d\uff0c\u5b9e\u4f8b\u7684\u5c5e\u6027\u90fd\u662f\u6267\u884c\u6784\u9020\u51fd\u6570\u65f6\u6dfb\u52a0\u7684\uff1b\u800c\u901a\u8fc7\u8fd9\u79cd\u65b0\u5199\u6cd5\uff0c\u5728\u6267\u884c\u6784\u9020\u51fd\u6570\u4e4b\u524d\uff0c\u5b9e\u4f8b\u5df2\u7ecf\u62e5\u6709\u8be5\u5c5e\u6027\u4e86\uff08\u4ee5\u4e0a\u4ee3\u7801\u5c5e\u6027\u7684\u503c\u4e3aundefined\uff0c\u6211\u4eec\u4e5f\u53ef\u4ee5\u6700\u5f00\u59cb\u7684\u65f6\u5019\u5c31\u8d4b\u503c\uff0c\u5982\uff1a",source:"@site/docs/javascript/Class.md",sourceDirName:"javascript",slug:"/javascript/Class",permalink:"/blog/docs/javascript/Class",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/javascript/Class.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Function",permalink:"/blog/docs/javascript/\u51fd\u6570"},next:{title:"Promise",permalink:"/blog/docs/javascript/Promise"}},c={},u=[{value:"class\u4e2d\u7684\u7bad\u5934\u51fd\u6570",id:"class\u4e2d\u7684\u7bad\u5934\u51fd\u6570",level:2}],m={toc:u};function d(e){var n=e.components,t=(0,r.Z)(e,l);return(0,o.kt)("wrapper",(0,a.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"class"},"Class"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// \u5b9e\u4f8b\u5c5e\u6027\u7684\u65b0\u5199\u6cd5\nclass People {\n    name\n    age\n    \n    getName() {\n        return this.name\n    }\n}\n\nnew People() // {name: undefined, age: undefined}\n\n// \u7c7b\u4f3c\u4e8e\n\nPeople.call({\n    name: undefined,\n    age: undefined,\n    __proto__: People.prototype\n})\n")),(0,o.kt)("p",null,"\u5728\u4ee5\u5f80\u6784\u9020\u51fd\u6570\u7684\u5199\u6cd5\u4e2d\uff0c\u5b9e\u4f8b\u7684\u5c5e\u6027\u90fd\u662f\u6267\u884c\u6784\u9020\u51fd\u6570\u65f6\u6dfb\u52a0\u7684\uff1b\u800c\u901a\u8fc7\u8fd9\u79cd\u65b0\u5199\u6cd5\uff0c\u5728\u6267\u884c\u6784\u9020\u51fd\u6570\u4e4b\u524d\uff0c\u5b9e\u4f8b\u5df2\u7ecf\u62e5\u6709\u8be5\u5c5e\u6027\u4e86\uff08\u4ee5\u4e0a\u4ee3\u7801\u5c5e\u6027\u7684\u503c\u4e3a",(0,o.kt)("inlineCode",{parentName:"p"},"undefined"),"\uff0c\u6211\u4eec\u4e5f\u53ef\u4ee5\u6700\u5f00\u59cb\u7684\u65f6\u5019\u5c31\u8d4b\u503c\uff0c\u5982\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class People {\n    name = 'akara'\n    age = 996\n}\nnew People() // {name: \"akara\", age: 996}\n")),(0,o.kt)("p",null,"\u8fd9\u4e5f\u662f\u4e3a\u4ec0\u4e48\uff0c\u5728",(0,o.kt)("inlineCode",{parentName:"p"},"TypeScript"),"\u4e2d\u6211\u4eec\u5e94\u8be5\u8fd9\u6837\u5199"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"class People {\n  name: string\n  id: number\n\n  constructor(name: string, id: number) {\n    this.name = name\n    this.id = id\n  }\n}\n\n// \u800c\u4e0d\u662f\n\nclass People {\n  constructor(name: string, id: number) {\n    this.name = name // Property 'name' does not exist on type 'People'\n    this.id = id // Property 'id' does not exist on type 'People'\n  }\n}\n")),(0,o.kt)("h2",{id:"class\u4e2d\u7684\u7bad\u5934\u51fd\u6570"},"class\u4e2d\u7684\u7bad\u5934\u51fd\u6570"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"class People {\n    name = 'akara'\n\n    getNameA = () => {\n        console.log(this)\n    }\n    \n    getNameB() {\n        console.log(this)\n    }\n}\n\nconst p = new People()  // {name: \"a\", getNameA: \u0192}\n\np.name\np.getNameA() // \u5b9e\u4f8bp\np.getNameB() // \u5b9e\u4f8bp\n")),(0,o.kt)("p",null,"\u8fd9\u91cc\u6709\u51e0\u4e2a\u6ce8\u610f\u7684\u70b9"),(0,o.kt)("p",null,"\u4e00\uff1a"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"getNameA"),"\u662f\u5b9e\u4f8b\u7684\u65b9\u6cd5\uff0c\u800c",(0,o.kt)("inlineCode",{parentName:"p"},"getNameB"),"\u662f\u539f\u578b\u5bf9\u8c61\u4e0a\u7684\u65b9\u6cd5"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'getNameA: () => { console.log(this) }\nname: "akara"\n__proto__:\n    constructor: class People\n    getNameB: \u0192 getNameB()\n    __proto__: Object\n')),(0,o.kt)("p",null,"\u4e8c\uff1a"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"p.getNameA"),"\u8f93\u51fa\u7684\u662f\u5b9e\u4f8bp\uff0c\u8fd9\u53ef\u80fd\u5e76\u4e0d\u7b26\u5408\u6211\u4eec\u7684\u9884\u671f\u3002"),(0,o.kt)("p",null,"\u6211\u4eec\u90fd\u77e5\u9053\uff0c\u5982\u679c\u662f\u4e0b\u9762\u8fd9\u6837\u7684\u5bf9\u8c61\uff0c\u8f93\u51fa\u7ed3\u679c\u5e94\u8be5\u4f1a\u7b26\u5408\u9884\u671f\u3002\u56e0\u4e3a\u7bad\u5934\u51fd\u6570\u672c\u8eab\u6ca1\u6709",(0,o.kt)("inlineCode",{parentName:"p"},"this"),"\u503c\uff0c\u90a3\u4e48\u9700\u8981\u8f93\u51fa",(0,o.kt)("inlineCode",{parentName:"p"},"this"),"\u7684\u65f6\u5019\u5c31\u6cbf\u7740\u4f5c\u7528\u57df\u94fe\u5bfb\u627e\uff0c\u4e5f\u5c31\u627e\u5230\u4e86",(0,o.kt)("inlineCode",{parentName:"p"},"window")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const obj = {\n    name: 'akara',\n    getNameA: () => {\n        console.log(this)  \n    },\n    getNameB: function() {\n        console.log(this)\n    }    \n}\nobj.getNameA() // window\nobj.getNameB() // obj\n")),(0,o.kt)("p",null,"\u65e2\u7136\u5982\u6b64\uff0c\u4e3a\u4ec0\u4e48\u901a\u8fc7class\u521b\u5efa\u7684\u5b9e\u4f8b\u7684\u7bad\u5934\u51fd\u6570\uff0c\u8f93\u51fa\u7684",(0,o.kt)("inlineCode",{parentName:"p"},"this"),"\u5374\u662f\u5b9e\u4f8b\u672c\u8eab\u3002\u7b80\u5355\u6765\u8bf4\uff0c\u8fd9\u662f\u4e00\u4e2a",(0,o.kt)("strong",{parentName:"p"},"\u7279\u6027"),"\uff0c\u6216\u8005\u8bf4",(0,o.kt)("strong",{parentName:"p"},"JS\u5f15\u64ce\u7684\u673a\u5236"),"\u3002"),(0,o.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"p"},"babel"),"\u628a\u4ee3\u7801\u7f16\u8bd1\u6210",(0,o.kt)("inlineCode",{parentName:"p"},"es5"),"\u7684\u4ee3\u7801\uff0c\u6765\u7834\u89e3\u5176\u80cc\u540e\u7684\u7384\u673a\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// es6\nclass People {\n  name = 'akara'\n  getName = () => {\n    console.log(this.name)\n  }\n  \n  getMyName() {\n    console.log(this.name)\n  }\n}\n\n// \u901a\u8fc7babel\u7f16\u8bd1\u540e (stage-1, stage-3)\n\nclass People {\n  constructor() {\n    _defineProperty(this, \"name\", 'akara');\n\n    _defineProperty(this, \"getName\", () => {\n      console.log(this.name);\n    });\n  }\n\n  getMyName() {\n    console.log(this.name);\n  }\n}\n")))}d.isMDXComponent=!0}}]);