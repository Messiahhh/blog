"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[4693],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>s});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),m=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},u=function(e){var t=m(e.components);return a.createElement(o.Provider,{value:t},e.children)},d="mdxType",k={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=m(n),c=r,s=d["".concat(o,".").concat(c)]||d[c]||k[c]||l;return n?a.createElement(s,p(p({ref:t},u),{},{components:n})):a.createElement(s,p({ref:t},u))}));function s(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,p=new Array(l);p[0]=c;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[d]="string"==typeof e?e:r,p[1]=i;for(var m=2;m<l;m++)p[m]=n[m];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},4078:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>p,default:()=>k,frontMatter:()=>l,metadata:()=>i,toc:()=>m});var a=n(7462),r=(n(7294),n(3905));const l={},p="RegExp",i={unversionedId:"javascript/\u6b63\u5219",id:"javascript/\u6b63\u5219",title:"RegExp",description:"\u6b63\u5219\u8868\u8fbe\u5f0f\u4e2d\u5206\u7ec4\u53ef\u4ee5\u5206\u4e3a\u6355\u83b7\u5206\u7ec4\u548c\u975e\u6355\u83b7\u5206\u7ec4\u3002",source:"@site/docs/javascript/\u6b63\u5219.md",sourceDirName:"javascript",slug:"/javascript/\u6b63\u5219",permalink:"/blog/docs/javascript/\u6b63\u5219",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/javascript/\u6b63\u5219.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"DOM",permalink:"/blog/docs/javascript/DOM"},next:{title:"Date",permalink:"/blog/docs/javascript/Date"}},o={},m=[{value:"\u5e38\u7528\u5b57\u7b26",id:"\u5e38\u7528\u5b57\u7b26",level:2},{value:"\u6b63\u5219\u9898\u76ee",id:"\u6b63\u5219\u9898\u76ee",level:2},{value:"\u5339\u914dURL\u53c2\u6570",id:"\u5339\u914durl\u53c2\u6570",level:3},{value:"\u5339\u914dcookie\u53c2\u6570",id:"\u5339\u914dcookie\u53c2\u6570",level:3},{value:"\u57df\u540d\u5224\u65ad",id:"\u57df\u540d\u5224\u65ad",level:3},{value:"\u7535\u8bdd\u53f7\u7801\u5224\u65ad",id:"\u7535\u8bdd\u53f7\u7801\u5224\u65ad",level:3},{value:"\u9a7c\u5cf0\u5316",id:"\u9a7c\u5cf0\u5316",level:3},{value:"\u6570\u5b57\u7684\u5343\u5206\u4f4d\u5206\u5272",id:"\u6570\u5b57\u7684\u5343\u5206\u4f4d\u5206\u5272",level:3},{value:"\u66ff\u6362\u5143\u7d20",id:"\u66ff\u6362\u5143\u7d20",level:3},{value:"\u6587\u7ae0\u51fa\u73b0\u6700\u591a\u7684\u5355\u8bcd",id:"\u6587\u7ae0\u51fa\u73b0\u6700\u591a\u7684\u5355\u8bcd",level:3}],u={toc:m},d="wrapper";function k(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"regexp"},"RegExp"),(0,r.kt)("p",null,"\u6b63\u5219\u8868\u8fbe\u5f0f\u4e2d\u5206\u7ec4\u53ef\u4ee5\u5206\u4e3a\u6355\u83b7\u5206\u7ec4\u548c\u975e\u6355\u83b7\u5206\u7ec4\u3002"),(0,r.kt)("p",null,"\u6355\u83b7\u5206\u7ec4\u5f88\u7b80\u5355\uff0c\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"()"),"\u6765\u8868\u793a\u3002"),(0,r.kt)("p",null,"\u975e\u6355\u83b7\u5206\u7ec4\uff0c\u5219\u57fa\u672c\u53ef\u4ee5\u5206\u4e3a\u4e94\u79cd\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"(?:)")," \u6700\u57fa\u7840\u4e5f\u662f\u6700\u5e38\u89c1\u7684\u975e\u6355\u83b7\u5206\u7ec4\u3002"),(0,r.kt)("p",{parentName:"li"},"\u6211\u4eec\u53ef\u4ee5\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"(?:)"),"\u6765\u8fdb\u884c\u975e\u6355\u83b7\u7684\u5206\u7ec4\uff0c\u56e0\u4e3a\u5f88\u591a\u65f6\u5019\u6211\u4eec\u9700\u8981\u4f7f\u7528\u5206\u7ec4\uff0c\u6bd4\u5982",(0,r.kt)("inlineCode",{parentName:"p"},"(\\d{3})+"),"\uff0c\u4f46\u6211\u4eec\u53c8\u5e76\u4e0d\u60f3\u6355\u83b7\u8fd9\u4e2a\u5206\u7ec4\uff0c\u8fd9\u65f6\u5019\u5c31\u53ef\u4ee5\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"(?:)"),"\u4e86\u3002")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"(?=)"),"\u96f6\u5bbd\u6b63\u5411\u5148\u884c\u65ad\u8a00\uff08zero-width positive lookahead assertion\uff09\u3002")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"(?!)"),"\u96f6\u5bbd\u8d1f\u5411\u5148\u884c\u65ad\u8a00\u3002")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"(?<=)"),"\u96f6\u5bbd\u6b63\u5411\u540e\u884c\u65ad\u8a00\u3002")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"(?<!)"),"\u96f6\u5bbd\u8d1f\u5411\u540e\u884c\u65ad\u8a00\u3002"))),(0,r.kt)("p",null,"\u96f6\u5bbd\uff08zero-width\uff09\u8868\u793a\u7740\u5b83\u5339\u914d\u7684\u662f\u4e00\u4e2a\u4f4d\u7f6e\uff0c\u5c31\u50cf",(0,r.kt)("inlineCode",{parentName:"p"},"^"),"\u6216",(0,r.kt)("inlineCode",{parentName:"p"},"$"),"\u53c8\u6216\u8005\u662f",(0,r.kt)("inlineCode",{parentName:"p"},"\\b"),"\u4e00\u6837\uff0c\u800c\u4e0d\u662f\u5339\u914d\u5b57\u7b26\u3002"),(0,r.kt)("p",null,"\u8fd9\u91cc\u7684",(0,r.kt)("strong",{parentName:"p"},"\u5148\u884c"),"\uff0c\u8868\u793a\u7740\u4f4d\u7f6e\u7684\u53f3\u8fb9\uff1b",(0,r.kt)("strong",{parentName:"p"},"\u540e\u884c"),"\u8868\u793a\u7740\u4f4d\u7f6e\u7684\u5de6\u8fb9\u3002\u800c",(0,r.kt)("strong",{parentName:"p"},"\u6b63\u5411"),"\u548c",(0,r.kt)("strong",{parentName:"p"},"\u8d1f\u5411"),"\uff0c\u5219\u5c31\u662f\u6709\u4e0e\u65e0\u7684\u5173\u7cfb\u4e86\u3002"),(0,r.kt)("p",null,"\u53e6\u5916\u9ed8\u8ba4\u60c5\u51b5\u4e0b",(0,r.kt)("inlineCode",{parentName:"p"},".+"),"\u662f\u4f1a\u8fdb\u884c\u8d2a\u5a6a\u5339\u914d\uff0c\u800c\u91cf\u8bcd\u540e\u52a0\u4e0a?\u4f1a\u8fdb\u884c\u60f0\u6027\u5339\u914d\uff0c\u6bd4\u5982",(0,r.kt)("inlineCode",{parentName:"p"},".+?"),"\u3002"),(0,r.kt)("h2",{id:"\u5e38\u7528\u5b57\u7b26"},"\u5e38\u7528\u5b57\u7b26"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u5b57\u7b26"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"."),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d\u9664\u6362\u884c\u7b26 \\n \u4e4b\u5916\u7684\u4efb\u4f55\u5355\u5b57\u7b26")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"+"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d\u524d\u9762\u7684\u5b50\u8868\u8fbe\u5f0f\u4e00\u6b21\u6216\u591a\u6b21\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"*"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d\u524d\u9762\u7684\u5b50\u8868\u8fbe\u5f0f\u96f6\u6b21\u6216\u591a\u6b21\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"?"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d\u524d\u9762\u7684\u5b50\u8868\u8fbe\u5f0f\u96f6\u6b21\u6216\u4e00\u6b21\uff0c\u6216\u6307\u660e\u4e00\u4e2a\u975e\u8d2a\u5a6a\u9650\u5b9a\u7b26\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"\\ "),(0,r.kt)("td",{parentName:"tr",align:null},"\u8f6c\u4e49\u7b26\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"^"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d\u8f93\u5165\u5b57\u7b26\u4e32\u7684\u5f00\u59cb\u4f4d\u7f6e\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"$"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d\u8f93\u5165\u5b57\u7b26\u4e32\u7684\u7ed3\u5c3e\u4f4d\u7f6e\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"( )"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5b50\u8868\u8fbe\u5f0f\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"[]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5b50\u8868\u8fbe\u5f0f\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"\\S"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d\u4efb\u4f55\u975e\u7a7a\u767d\u5b57\u7b26\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"\\s"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d\u4efb\u4f55\u7a7a\u767d\u5b57\u7b26\uff0c\u5305\u62ec\u7a7a\u683c\u3001\u5236\u8868\u7b26\u3001\u6362\u9875\u7b26\u7b49\u7b49\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"\\w"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d\u6570\u5b57\uff0c\u5b57\u6bcd\u6216\u4e0b\u5212\u7ebf\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"\\d"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d\u6570\u5b57\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"{n}"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914dn\u6b21\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"|"),(0,r.kt)("td",{parentName:"tr",align:null},"\u6307\u660e\u4e24\u9879\u4e4b\u95f4\u7684\u4e00\u4e2a\u9009\u62e9")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"\\b"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d\u4e00\u4e2a\u5355\u8bcd\u8fb9\u754c\uff0c\u5373\u5b57\u4e0e\u7a7a\u683c\u95f4\u7684\u4f4d\u7f6e\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"\\B"),(0,r.kt)("td",{parentName:"tr",align:null},"\u975e\u5355\u8bcd\u8fb9\u754c\u5339\u914d\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"(x)"),(0,r.kt)("td",{parentName:"tr",align:null},"\u50cf\u4e0b\u9762\u7684\u4f8b\u5b50\u5c55\u793a\u7684\u90a3\u6837\uff0c\u5b83\u4f1a\u5339\u914d 'x' \u5e76\u4e14\u8bb0\u4f4f\u5339\u914d\u9879\u3002\u5176\u4e2d\u62ec\u53f7\u88ab\u79f0\u4e3a",(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("em",{parentName:"strong"},"\u6355\u83b7\u62ec\u53f7")),"\u3002\u6a21\u5f0f ",(0,r.kt)("inlineCode",{parentName:"td"},"/(foo) (bar) \\1 \\2/")," \u4e2d\u7684 '",(0,r.kt)("inlineCode",{parentName:"td"},"(foo)"),"' \u548c '",(0,r.kt)("inlineCode",{parentName:"td"},"(bar)"),'\' \u5339\u914d\u5e76\u8bb0\u4f4f\u5b57\u7b26\u4e32 "foo bar foo bar" \u4e2d\u524d\u4e24\u4e2a\u5355\u8bcd\u3002\u6a21\u5f0f\u4e2d\u7684 ',(0,r.kt)("inlineCode",{parentName:"td"},"\\1")," \u548c ",(0,r.kt)("inlineCode",{parentName:"td"},"\\2")," \u8868\u793a\u7b2c\u4e00\u4e2a\u548c\u7b2c\u4e8c\u4e2a\u88ab\u6355\u83b7\u62ec\u53f7\u5339\u914d\u7684\u5b50\u5b57\u7b26\u4e32\uff0c\u5373 ",(0,r.kt)("inlineCode",{parentName:"td"},"foo")," \u548c ",(0,r.kt)("inlineCode",{parentName:"td"},"bar"),"\uff0c\u5339\u914d\u4e86\u539f\u5b57\u7b26\u4e32\u4e2d\u7684\u540e\u4e24\u4e2a\u5355\u8bcd\u3002\u6ce8\u610f ",(0,r.kt)("inlineCode",{parentName:"td"},"\\1"),"\u3001",(0,r.kt)("inlineCode",{parentName:"td"},"\\2"),"\u3001...\u3001",(0,r.kt)("inlineCode",{parentName:"td"},"\\n")," \u662f\u7528\u5728\u6b63\u5219\u8868\u8fbe\u5f0f\u7684\u5339\u914d\u73af\u8282\uff0c\u8be6\u60c5\u53ef\u4ee5\u53c2\u9605\u540e\u6587\u7684 \\n \u6761\u76ee\u3002\u800c\u5728\u6b63\u5219\u8868\u8fbe\u5f0f\u7684\u66ff\u6362\u73af\u8282\uff0c\u5219\u8981\u4f7f\u7528\u50cf ",(0,r.kt)("inlineCode",{parentName:"td"},"$1"),"\u3001",(0,r.kt)("inlineCode",{parentName:"td"},"$2"),"\u3001...\u3001",(0,r.kt)("inlineCode",{parentName:"td"},"$n")," \u8fd9\u6837\u7684\u8bed\u6cd5\uff0c\u4f8b\u5982\uff0c",(0,r.kt)("inlineCode",{parentName:"td"},"'bar foo'.replace(/(...) (...)/, '$2 $1')"),"\u3002",(0,r.kt)("inlineCode",{parentName:"td"},"$&")," \u8868\u793a\u6574\u4e2a\u7528\u4e8e\u5339\u914d\u7684\u539f\u5b57\u7b26\u4e32\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"(?:x)"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d 'x' \u4f46\u662f\u4e0d\u8bb0\u4f4f\u5339\u914d\u9879\u3002\u8fd9\u79cd\u62ec\u53f7\u53eb\u4f5c",(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("em",{parentName:"strong"},"\u975e\u6355\u83b7\u62ec\u53f7")),"\uff0c\u4f7f\u5f97\u4f60\u80fd\u591f\u5b9a\u4e49\u4e0e\u6b63\u5219\u8868\u8fbe\u5f0f\u8fd0\u7b97\u7b26\u4e00\u8d77\u4f7f\u7528\u7684\u5b50\u8868\u8fbe\u5f0f\u3002\u770b\u770b\u8fd9\u4e2a\u4f8b\u5b50 ",(0,r.kt)("inlineCode",{parentName:"td"},"/(?:foo){1,2}/"),"\u3002\u5982\u679c\u8868\u8fbe\u5f0f\u662f ",(0,r.kt)("inlineCode",{parentName:"td"},"/foo{1,2}/"),"\uff0c",(0,r.kt)("inlineCode",{parentName:"td"},"{1,2}")," \u5c06\u53ea\u5e94\u7528\u4e8e 'foo' \u7684\u6700\u540e\u4e00\u4e2a\u5b57\u7b26 'o'\u3002\u5982\u679c\u4f7f\u7528\u975e\u6355\u83b7\u62ec\u53f7\uff0c\u5219 ",(0,r.kt)("inlineCode",{parentName:"td"},"{1,2}")," \u4f1a\u5e94\u7528\u4e8e\u6574\u4e2a 'foo' \u5355\u8bcd\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"x(?=y)"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5339\u914d'x'\u4ec5\u4ec5\u5f53'x'\u540e\u9762\u8ddf\u7740'y'.\u8fd9\u79cd\u53eb\u505a",(0,r.kt)("strong",{parentName:"td"},"\u5148\u884c\u65ad\u8a00"),"\u3002 \u4f8b\u5982\uff0c/Jack(?=Sprat)/\u4f1a\u5339\u914d\u5230'Jack'\u4ec5\u5f53\u5b83\u540e\u9762\u8ddf\u7740'Sprat'\u3002")))),(0,r.kt)("p",null,"\u5f53\u4f7f\u7528\u6784\u9020\u51fd\u6570\u521b\u9020\u6b63\u5219\u5bf9\u8c61\u65f6\uff0c\u9700\u8981\u5e38\u89c4\u7684\u5b57\u7b26\u8f6c\u4e49\u89c4\u5219",(0,r.kt)("strong",{parentName:"p"},"\uff08\u5728\u524d\u9762\u52a0\u53cd\u659c\u6760 \\\uff09"),"\u3002\u6bd4\u5982\uff0c\u4ee5\u4e0b\u662f\u7b49\u4ef7\u7684\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'var re = new RegExp("\\\\w+");\nvar re = /\\w+/;\n')),(0,r.kt)("p",null,"\u5b57\u7b26\u4e32\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"match"),"\u53ef\u4ee5\u83b7\u53d6\u6240\u6709\u5339\u914d\u6b63\u5219\u7684\u7ed3\u679c\uff0c\u4f46\u83b7\u53d6\u4e0d\u5230\u5bf9\u5e94\u7684\u6355\u83b7\u503c\u3002\u901a\u5e38\u60f3\u6355\u83b7\u90fd\u662f\u7528\u6b63\u5219\u8868\u8fbe\u5f0f\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"exec"),"\u65b9\u6cd5\uff0c\u4f46\u8981\u6355\u83b7\u5168\u90e8\u7684\u8bdd\u9700\u8981\u8fdb\u884c\u5faa\u73af",(0,r.kt)("inlineCode",{parentName:"p"},"exec"),"\u3002"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"es2020"),"\u65b0\u589e\u4e86\u4e00\u4e2a\u5b57\u7b26\u4e32\u65b9\u6cd5",(0,r.kt)("inlineCode",{parentName:"p"},"matchAll"),"\uff0c\u76f8\u5f53\u4e8e\u5faa\u73af\u6267\u884c\u4e86",(0,r.kt)("inlineCode",{parentName:"p"},"exec"),"\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const reg = /[a-c]/g\nconst str = 'abc'\nfor (let i of str.matchAll(reg)) console.log(i)\n")),(0,r.kt)("h2",{id:"\u6b63\u5219\u9898\u76ee"},"\u6b63\u5219\u9898\u76ee"),(0,r.kt)("h3",{id:"\u5339\u914durl\u53c2\u6570"},"\u5339\u914dURL\u53c2\u6570"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"// \u6b63\u5219\nfunction getUrlParams(name) {\n    const reg = new RegExp(`(?:^|&)${name}=([^&]*)(?:$|&)`)\n    const match = location.search.substr(1).match(reg)\n    if (match) {\n        return match[1]\n    }\n} \n\nfunction getUrl(key) {\n    let map = {}\n    let ret \n    const reg = /(?:^|&)(.*?)=(.*?)(?=&|$)/g\n    const search = 'name=akara&age=21&type=normal&sex=male'\n    while (ret !== null) {\n        ret = reg.exec(search)\n        if (ret) {\n            map[ret[1]] = ret[2]\n        }\n    }\n    return map[key]\n}\n\n// split\nfunction getUrlParams(name) {\n    const arr = location.search.substr(1).split('&')\n    let obj = {}\n    arr.forEach(item => {\n        let tempArr = item.split('=')\n        obj[tempArr[0]] = tempArr[1]\n    })\n    return obj[name]\n}\n")),(0,r.kt)("h3",{id:"\u5339\u914dcookie\u53c2\u6570"},"\u5339\u914dcookie\u53c2\u6570"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"function getUrlParams(name) {\n    const reg = new RegExp(`(\\\\s|^)${name}=([^;]*)($|;)`) //    \\s \u524d\u9762\u8981\u591a\u4e00\u4e2a \\\n    const match = document.cookie.match(reg)\n    if (match) {\n        return match[2]\n    }\n} \n")),(0,r.kt)("h3",{id:"\u57df\u540d\u5224\u65ad"},"\u57df\u540d\u5224\u65ad"),(0,r.kt)("p",null,"\u5224\u65ad\u5f53\u524d\u57df\u540d\u662f\u5426\u4e3aqq.com\uff0c\u6216\u8005\u5176\u5b50\u57df\u540d"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"function isMatch(url) {\n    return /^https?:\\/\\/(.+\\.)?qq\\.com/.test(url)\n}\nisMatch('http://a.qq.com') // true\nisMatch('https://qq.com') // true\n")),(0,r.kt)("h3",{id:"\u7535\u8bdd\u53f7\u7801\u5224\u65ad"},"\u7535\u8bdd\u53f7\u7801\u5224\u65ad"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const isPhone = (str) => {\n    const reg = /^1[34578]\\d{9}$/g\n    return reg.test(str)\n}\n")),(0,r.kt)("h3",{id:"\u9a7c\u5cf0\u5316"},"\u9a7c\u5cf0\u5316"),(0,r.kt)("p",null,"\u5c06",(0,r.kt)("inlineCode",{parentName:"p"},"aaa-bbb-ccc"),"\u8f6c\u6362\u4e3a\u9a7c\u5cf0",(0,r.kt)("inlineCode",{parentName:"p"},"aaaBbbCcc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"function toCamel(str) {\n    return str.replace(/-\\w/g, (s) => {\n        return s.slice(1).toUpperCase()\n    })\n}\n// \\w \u5339\u914d\u6570\u5b57\uff0c\u5b57\u6bcd\u4e0e\u4e0b\u5212\u7ebf\n")),(0,r.kt)("h3",{id:"\u6570\u5b57\u7684\u5343\u5206\u4f4d\u5206\u5272"},"\u6570\u5b57\u7684\u5343\u5206\u4f4d\u5206\u5272"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"// \u6b63\u5219\uff0c\u6ce8\u610f\u4f7f\u7528\u5230\u4e86?=\u5148\u884c\u65ad\u8a00\uff0c?:\u4e3a\u975e\u6355\u83b7\uff0c\u53ef\u52a0\u53ef\u4e0d\u52a0\nfunction format(num) {\n    return num.toString().replace(/(?=(?<!^)(?:\\d{3})+$)/g, ',')\n}\n\n// function format(num) {\n//     const reg = /\\d{1,3}(?=(?:\\d{3})+$)/g\n//     return num.toString().replace(reg, '$&,')\n// }\n\n// const format = (number) => {\n//     const str = number + ''\n//     return str.replace(/(?=(?!^)(\\d{3})+$)/g, ',')\n//     // return str.replace(/\\d{1,3}(?=(\\d{3})+$)/, '$&,')\n// }\n\n// \u4e5f\u53ef\u4ee5\u7528toLocaleString\u8f7b\u677e\u5b9e\u73b0\nfunction format(num) {\n    return num.toLocaleString()\n}\n\n// \u6216\u8005\u7528\u6570\u5b57\u6765\u5206\u5272\nfunction format (num) {\n    let arr = []\n    while (num >= 1000) {\n        let value = num % 1000\n        num = num / 1000\n        if (value >= 100) {\n            value = '' + value\n        } else if (100 > value && value >= 10 ){\n            value = `0${value}`\n        } else {\n            value = `00${value}`\n        }\n        \n        arr.unshift(value)\n    }\n    num = '' + num\n    arr.unshift(num)\n    return arr.join(',')\n}\n")),(0,r.kt)("h3",{id:"\u66ff\u6362\u5143\u7d20"},"\u66ff\u6362\u5143\u7d20"),(0,r.kt)("p",null,"\u628a\u975eP\u5143\u7d20\u66ff\u6362\u6210P\u5143\u7d20 ",(0,r.kt)("inlineCode",{parentName:"p"},"<div></div> => <p></p>")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const replaceP = (str) => {\n    return str.replace(/<(\\/)?.*?>/g, '<$1p>')\n}\n")),(0,r.kt)("h3",{id:"\u6587\u7ae0\u51fa\u73b0\u6700\u591a\u7684\u5355\u8bcd"},"\u6587\u7ae0\u51fa\u73b0\u6700\u591a\u7684\u5355\u8bcd"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const wordOfArticle = (str) => {\n    const reg = /(?=\\b)(.+?)(?=\\b)/g\n    console.log(str.match(reg))\n}\n")))}k.isMDXComponent=!0}}]);