"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[2063],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>f});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),c=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d=function(e){var n=c(e.components);return r.createElement(p.Provider,{value:n},e.children)},m="mdxType",s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=c(t),u=a,f=m["".concat(p,".").concat(u)]||m[u]||s[u]||o;return t?r.createElement(f,l(l({ref:n},d),{},{components:t})):r.createElement(f,l({ref:n},d))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=u;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i[m]="string"==typeof e?e:a,l[1]=i;for(var c=2;c<o;c++)l[c]=t[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},769:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>l,default:()=>s,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=t(7462),a=(t(7294),t(3905));const o={sidebarDepth:4},l="React",i={unversionedId:"react/React",id:"react/React",title:"React",description:"\u865a\u62dfDOM",source:"@site/docs/react/React.mdx",sourceDirName:"react",slug:"/react/",permalink:"/blog/docs/react/",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/react/React.mdx",tags:[],version:"current",frontMatter:{sidebarDepth:4},sidebar:"tutorialSidebar",previous:{title:"Vue",permalink:"/blog/docs/vue"},next:{title:"\u57fa\u7840",permalink:"/blog/docs/react/\u57fa\u7840"}},p={},c=[{value:"\u865a\u62dfDOM",id:"\u865a\u62dfdom",level:2},{value:"Fiber Node",id:"fiber-node",level:2}],d={toc:c},m="wrapper";function s(e){let{components:n,...t}=e;return(0,a.kt)(m,(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"react"},"React"),(0,a.kt)("h2",{id:"\u865a\u62dfdom"},"\u865a\u62dfDOM"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'const element = <h1 class="hello">hello, world!</h1>\nconst component = <App /> \n')),(0,a.kt)("p",null,"\u4e0a\u65b9\u7684\u4ee3\u7801\u88ab\u79f0\u4e4b\u4e3a",(0,a.kt)("inlineCode",{parentName:"p"},"JSX"),"\u8bed\u6cd5\uff0c\u5b9e\u9645\u4e0a\u4f1a\u88ab\u7f16\u8bd1\u6210",(0,a.kt)("inlineCode",{parentName:"p"},"React.createElement"),"\uff0c\u56e0\u6b64\u7b49\u4ef7\u4e8e\u4ee5\u4e0b\u4ee3\u7801"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"const element = React.createElement('h1', { class: 'hello' }, 'hello, world')\nconst component = React.createElement(App, null, null)\n")),(0,a.kt)("p",null,"\u5b9e\u9645\u4e0a",(0,a.kt)("inlineCode",{parentName:"p"},"React.createElement"),"\u8fd4\u56de\u7684\u662f\u4e00\u4e2a\u666e\u901a\u7684\u5bf9\u8c61\uff0c\u8fd9\u79cd\u5bf9\u8c61\u88ab\u79f0\u4e4b\u4e3a",(0,a.kt)("inlineCode",{parentName:"p"},"JSX.Element"),"\u6216",(0,a.kt)("inlineCode",{parentName:"p"},"React.ReactElement"),"\uff0c\u4e5f\u53ef\u4ee5\u88ab\u53eb\u505a",(0,a.kt)("strong",{parentName:"p"},"\u865a\u62dfDOM")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'const element = {\n    $$typeof: Symbol(react.element),\n    key: null,\n    props: {class: "hello", children: "hello, world!"},\n    ref: null,\n    type: "h1",\n}\n\nconst component = {\n    $$typeof: Symbol(react.element),\n    key: null,\n    props: {},\n    ref: null,\n    // highlight-next-line\n    type: App(), // \u6e32\u67d3\u51fd\u6570\n}\n')),(0,a.kt)("h2",{id:"fiber-node"},"Fiber Node"),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"\u4ece\u4e0a\u8ff0\u4ee3\u7801\u4e2d\u6211\u4eec\u80fd\u4e86\u89e3\u5230\uff0c\u865a\u62dfDOM\u672c\u8eab\u4e0d\u5b58\u5728\u6307\u5411\u5176\u4ed6\u865a\u62dfDOM\u7684\u6307\u9488\uff0c\u5b9e\u9645\u4e0a\u9664\u4e86\u6211\u4eec\u6700\u521d\u4f20\u7ed9",(0,a.kt)("inlineCode",{parentName:"p"},"ReactDOM.render"),"\u7684\u865a\u62dfDOM\uff0c\u5927\u591a\u6570\u865a\u62dfDOM\u90fd\u662f\u5728\u6e32\u67d3\u51fd\u6570",(0,a.kt)("strong",{parentName:"p"},"\u8fd0\u884c\u65f6"),"\u52a8\u6001\u751f\u6210\u7684\uff0c\u901a\u8fc7\u5728\u8fd0\u884c\u65f6\u9012\u5f52\u8c03\u7528\u6e32\u67d3\u51fd\u6570\u6211\u4eec\u80fd\u591f\u6784\u5efa\u51fa\u4e00\u9897\u771f\u6b63\u7684\u6811\u3002")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"function App() {\n  return <Test />;\n}\n\nfunction Test() {\n  return <div>test</div>;\n}\n\nReactDOM.render(<App />, document.getElementById('root'));\n")),(0,a.kt)("p",null,"\u5bf9\u4e8e\u4e0a\u65b9\u7684\u4ee3\u7801\uff0c\u901a\u8fc7",(0,a.kt)("inlineCode",{parentName:"p"},"ReactDOM.render"),"\u6211\u4eec\u80fd\u591f\u9012\u5f52\u8c03\u7528\u6e32\u67d3\u51fd\u6570\uff0c\u5e76\u4e14\u5bf9\u4e8e\u6bcf\u4e00\u4e2a\u7ec4\u4ef6\u5b9e\u4f8b\uff08\u6216\u8005\u8bf4\u865a\u62dfDOM\uff09\u6211\u4eec\u90fd\u4f1a\u521b\u5efa\u4e00\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"Fiber Node"),"\uff0c\u56e0\u4e3a\u662f\u8fd0\u884c\u65f6\u521b\u5efa\u6240\u4ee5",(0,a.kt)("inlineCode",{parentName:"p"},"Fiber Node"),"\u80fd\u591f\u77e5\u9053\u5176\u6240\u5173\u8054\uff08",(0,a.kt)("inlineCode",{parentName:"p"},"parent"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"child"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"sibling"),"\uff09",(0,a.kt)("inlineCode",{parentName:"p"},"Fiber Node"),"\n\u662f\u8c01\u3002"),(0,a.kt)("p",null,"\u503c\u5f97\u4e00\u63d0\u7684\u662f",(0,a.kt)("inlineCode",{parentName:"p"},"Hook"),"\u6240\u4f7f\u7528\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"memorizedState"),"\u5c31\u662f",(0,a.kt)("inlineCode",{parentName:"p"},"Fiber Node"),"\u7684\u4e00\u4e2a\u5c5e\u6027\u3002"),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"\u4f2a\u4ee3\u7801\uff0c\u4e3b\u8981\u7528\u6765\u8868\u8fbe",(0,a.kt)("inlineCode",{parentName:"p"},"FiberNode"),"\u4e4b\u95f4\u7684\u8fde\u63a5\u5173\u7cfb")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"{\n    type: App(),\n    fiberNode: { // fiberNode1\n        child: fiberNode2,\n        return: null, // parent\n        memoizedState: {},\n        ...rest,\n    } \n}\n\n{\n    type: Test(),\n    fiberNode: { //  fiberNode2\n        child: fiberNode3,\n        return: fiberNode1\n    }\n}\n\n{\n    type: 'div',\n    fiberNode: { //  fiberNode3\n        child: null,\n        return: fiberNode2,\n    }\n}\n")),(0,a.kt)("admonition",{title:"\u603b\u7ed3",type:"info"},(0,a.kt)("p",{parentName:"admonition"},(0,a.kt)("inlineCode",{parentName:"p"},"ReactDOM.render"),"\u4ee5\u6211\u4eec\u4f20\u5165\u7684\u865a\u62dfDOM\u4e3a\u5165\u53e3\uff0c\u9012\u5f52\u8c03\u7528\u6e32\u67d3\u51fd\u6570\u751f\u6210\u865a\u62dfDOM\uff0c\u5e76\u4e14\u6bcf\u4e2a\u865a\u62dfDOM\u90fd\u6709\u5bf9\u5e94\u7684\u4e00\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},"Fiber Node"),"\uff0c\u8fd9\u4e9b",(0,a.kt)("inlineCode",{parentName:"p"},"Fiber Node"),"\u901a\u8fc7\u5730\u5740\u5f62\u6210\u4e86\u4e00\u9897\u5b8c\u6574\u7684\u6811\u3002")))}s.isMDXComponent=!0}}]);