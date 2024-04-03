"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[3897],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>k});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),m=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=m(e.components);return r.createElement(p.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),c=m(n),u=a,k=c["".concat(p,".").concat(u)]||c[u]||d[u]||l;return n?r.createElement(k,o(o({ref:t},s),{},{components:n})):r.createElement(k,o({ref:t},s))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=u;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[c]="string"==typeof e?e:a,o[1]=i;for(var m=2;m<l;m++)o[m]=n[m];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},2227:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>m});var r=n(7462),a=(n(7294),n(3905));const l={sidebarDepth:4},o="HTML",i={unversionedId:"HTML",id:"HTML",title:"HTML",description:"\u8d44\u6e90\u9884\u52a0\u8f7d",source:"@site/docs/HTML.md",sourceDirName:".",slug:"/HTML",permalink:"/blog/docs/HTML",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/HTML.md",tags:[],version:"current",frontMatter:{sidebarDepth:4},sidebar:"tutorialSidebar",next:{title:"CSS",permalink:"/blog/docs/css"}},p={},m=[{value:"\u8d44\u6e90\u9884\u52a0\u8f7d",id:"\u8d44\u6e90\u9884\u52a0\u8f7d",level:3},{value:"async and defer",id:"async-and-defer",level:3},{value:"DOMContentLoaded\u548cLoad",id:"domcontentloaded\u548cload",level:3},{value:"\u5176\u4ed6",id:"\u5176\u4ed6",level:2},{value:"\u91cd\u5b9a\u5411",id:"\u91cd\u5b9a\u5411",level:3},{value:"markdown to html",id:"markdown-to-html",level:3},{value:"link\u548c@import\u7684\u533a\u522b",id:"link\u548cimport\u7684\u533a\u522b",level:3}],s={toc:m},c="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(c,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"html"},"HTML"),(0,a.kt)("h3",{id:"\u8d44\u6e90\u9884\u52a0\u8f7d"},"\u8d44\u6e90\u9884\u52a0\u8f7d"),(0,a.kt)("p",null,"\u9884\u52a0\u8f7d\u8d44\u6e90\u65f6\u8fdb\u5165\u8bf7\u6c42\u961f\u5217\u7684\u5148\u540e\u987a\u5e8f\u662f\u6839\u636e\u8d44\u6e90\u5728\u4ee3\u7801\u4e2d\u51fa\u73b0\u7684\u987a\u5e8f\u51b3\u5b9a\u7684\uff0c\u6211\u4eec\u4e5f\u53ef\u4ee5\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"preload"),"\u6765\u624b\u52a8\u8c03\u6574\u8d44\u6e90\u7684\u9884\u52a0\u8f7d\u987a\u5e8f\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<body>\n    <script src="a.js"><\/script>\n    <script src="b.js"><\/script>\n    <script src="c.js"><\/script>\n</body>\n')),(0,a.kt)("p",null,"\u5bf9\u4e8e\u4ee5\u4e0a\u6587\u6863\u7684\u811a\u672c\u8d44\u6e90\u7684\u52a0\u8f7d\u987a\u5e8f\u662f",(0,a.kt)("inlineCode",{parentName:"p"},"a\u3001b\u3001c"),"\uff0c\u5982\u679c\u60f3\u8981\u5728\u4e0d\u6539\u53d8\u811a\u672c\u6267\u884c\u987a\u5e8f\u7684\u540c\u65f6\u8ba9",(0,a.kt)("inlineCode",{parentName:"p"},"c.js"),"\u4f18\u5148\u4e8e",(0,a.kt)("inlineCode",{parentName:"p"},"a.js"),"\u8fdb\u5165\u8bf7\u6c42\u961f\u5217\uff0c\u6211\u4eec\u53ef\u4ee5\u8fd9\u6837\u6539\u3002\u6b64\u65f6\u811a\u672c\u8d44\u6e90\u7684\u52a0\u8f7d\u987a\u5e8f\u662f",(0,a.kt)("inlineCode",{parentName:"p"},"c\u3001a\u3001b")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<body>\n    <link rel="preload" as="script" href="c.js">\n    <script src="a.js"><\/script>\n    <script src="b.js"><\/script>\n    <script src="c.js"><\/script>\n</body>\n')),(0,a.kt)("h3",{id:"async-and-defer"},"async and defer"),(0,a.kt)("p",null,"\u89e3\u6790HTML\u7684\u65f6\u5019\u9700\u8981\u6ce8\u610fJavaScript",(0,a.kt)("strong",{parentName:"p"},"\u811a\u672c\u7684\u6267\u884c\u4f1a\u963b\u585eHTML\u7684\u89e3\u6790"),"\uff0c\u56e0\u6b64\u5f53\u89e3\u6790HTML\u89e3\u6790\u5230\u4e00\u884c\u5916\u94fe\u811a\u672c\u7684\u65f6\u5019\uff0c\u6211\u4eec\u9700\u8981\u7b49\u5f85",(0,a.kt)("strong",{parentName:"p"},"\u811a\u672c\u7684\u52a0\u8f7d"),"\u3001\u518d\u7b49\u5f85",(0,a.kt)("strong",{parentName:"p"},"\u811a\u672c\u7684\u6267\u884c"),"\uff0c\u624d\u80fd\u7ee7\u7eed\u540e\u7eedHTML\u7684\u89e3\u6790\u3002"),(0,a.kt)("p",null,"\u5982\u679c\u6211\u4eec\u4e0d\u5e0c\u671b",(0,a.kt)("strong",{parentName:"p"},"\u811a\u672c\u7684\u52a0\u8f7d"),"\u963b\u585eHTML\u7684\u89e3\u6790\uff0c\u6211\u4eec\u53ef\u4ee5\u7ed9",(0,a.kt)("inlineCode",{parentName:"p"},"script"),"\u6807\u7b7e\u52a0\u4e0a",(0,a.kt)("inlineCode",{parentName:"p"},"async"),"\u6216\u8005",(0,a.kt)("inlineCode",{parentName:"p"},"defer"),"\uff0c\u6b64\u65f6\u8be5\u5916\u94fe\u811a\u672c\u7684\u52a0\u8f7d\u5c06\u4e0d\u4f1a\u963b\u585e\u540e\u7eedHTML\u7684\u89e3\u6790\uff08\u4e5f\u5c31\u662f\u89e3\u6790\u540e\u7eedHTML\u7684\u540c\u65f6\u5e76\u884c\u52a0\u8f7d\u8be5\u811a\u672c\uff0c\u5f53\u8be5\u811a\u672c\u88ab\u6210\u529f\u52a0\u8f7d\u540e\u5219\u4f1a\u505c\u6b62\u540e\u7eedHTML\u7684\u89e3\u6790\u5e76\u5f00\u59cb\u6267\u884c\u8be5\u811a\u672c\uff09"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"async"),"\uff1a\u5916\u94fe\u811a\u672c\u52a0\u8f7d\u5b8c\u6210\u540e\u4f1a\u7acb\u523b\u505c\u6b62HTML\u7684\u89e3\u6790\u5e76\u5f00\u59cb\u6267\u884c\u8be5\u811a\u672c"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"defer"),"\uff1a\u5916\u94fe\u811a\u672c\u4f1a\u5728\u6574\u4e2aHTML\u90fd\u88ab\u89e3\u6790\u5b8c\u6210\u540e\uff08\u6216\u8005\u8bf4",(0,a.kt)("inlineCode",{parentName:"li"},"DOMContentLoaded"),"\u4e8b\u4ef6\u89e6\u53d1\uff09\u624d\u6267\u884c")),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://image-static.segmentfault.com/215/179/2151798436-59da4801c6772_articlex",alt:"defer and async"})),(0,a.kt)("h3",{id:"domcontentloaded\u548cload"},"DOMContentLoaded\u548cLoad"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"DOMContentLoaded"),"\uff1aHTML\u88ab\u5b8c\u5168\u52a0\u8f7d\u548c\u89e3\u6790\u540e\u89e6\u53d1\uff0c\u901a\u5e38\u6b64\u65f6\u6837\u5f0f\u3001\u56fe\u7247\u7b49\u8d44\u6e90\u6ca1\u6709\u5b8c\u5168\u52a0\u8f7d\u597d"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Load"),"\uff1a\u5f53\u6240\u6709\u7684\u8d44\u6e90\u90fd\u52a0\u8f7d\u5b8c\u6210\uff0c\u5373\u5305\u62ecHTML\u3001\u6837\u5f0f\u3001\u56fe\u7247\u3001\u811a\u672c\u7b49\u8d44\u6e90\u3002")),(0,a.kt)("p",null,"\u5728\u6d4f\u89c8\u5668",(0,a.kt)("inlineCode",{parentName:"p"},"network"),"\u4e00\u680f\u4e2d\u53ef\u4ee5\u770b\u5230\u8fd9\u4e24\u4e2a\u4e8b\u4ef6\u5b8c\u6210\u6240\u7ecf\u8fc7\u7684\u65f6\u95f4\u3002"),(0,a.kt)("h2",{id:"\u5176\u4ed6"},"\u5176\u4ed6"),(0,a.kt)("h3",{id:"\u91cd\u5b9a\u5411"},"\u91cd\u5b9a\u5411"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-html"},"<meta http-equiv=\"refresh\" content='2;https://messiahhh.github.io/blog'>\n"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-js"},"location.href = 'https://messiahhh.github.io/blog'\n"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-js"},"res.statusCode = 301 // or 302\nres.setHeader('Location', 'https://messiahhh.github.io/blog')\n")))),(0,a.kt)("h3",{id:"markdown-to-html"},"markdown to html"),(0,a.kt)("p",null,"\u6211\u4eec\u7684\u5e38\u89c1\u9700\u6c42\u662f\u628a",(0,a.kt)("inlineCode",{parentName:"p"},"markdown"),"\u6587\u4ef6\u89e3\u6790\u6210\u9875\u9762\uff0c\u6709\u5f88\u591a\u79cd\u5de5\u5177\u53ef\u4ee5\u5b9e\u73b0\u8fd9\u4e00\u76ee\u7684\uff0c\u6bd4\u5982\u53ef\u4ee5\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"gray-matter"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"remark"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"remark-html"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"remark-prism"),"\u6765\u5b9e\u73b0\u3002"),(0,a.kt)("p",null,"\u5176\u4e2d",(0,a.kt)("inlineCode",{parentName:"p"},"gray-matter"),"\u53ef\u4ee5\u7528\u6765\u83b7\u53d6",(0,a.kt)("inlineCode",{parentName:"p"},"markdown"),"\u7684\u5185\u5bb9\u548c",(0,a.kt)("inlineCode",{parentName:"p"},"yaml"),"\u5143\u6570\u636e\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"import matter from 'gray-matter'\nimport remark from 'remark'\nimport html from 'remark-html'\nimport prism from 'remark-prism'\n\nconst markdown = fs.readFileSync(path, 'utf8')\nconst matterResult = matter(markdown)\nconst processedContent = await remark()\n    .use(html)\n    .use(prism)\n    .process(matterResult.content)\nconst contentHtml = processedContent.toString()\n")),(0,a.kt)("h3",{id:"link\u548cimport\u7684\u533a\u522b"},"link\u548c@import\u7684\u533a\u522b"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"link\u662fXHTML\u63d0\u4f9b\u7684\u6807\u7b7e\uff0c\u4e0d\u4ec5\u53ef\u4ee5\u52a0\u8f7dCSS\u3002@import\u662fCSS\u63d0\u4f9b\u7684\u8bed\u6cd5\u89c4\u5219\uff0c\u53ea\u80fd\u52a0\u8f7dCSS"),(0,a.kt)("li",{parentName:"ol"},"\u52a0\u8f7d\u9875\u9762\u65f6\uff0c",(0,a.kt)("inlineCode",{parentName:"li"},"link"),"\u6807\u7b7e\u5f15\u5165\u7684 CSS \u88ab\u540c\u65f6\u52a0\u8f7d\uff1b",(0,a.kt)("inlineCode",{parentName:"li"},"@import"),"\u5f15\u5165\u7684 CSS \u5c06\u5728\u9875\u9762\u52a0\u8f7d\u5b8c\u6bd5\u540e\u88ab\u52a0\u8f7d\u3002")))}d.isMDXComponent=!0}}]);