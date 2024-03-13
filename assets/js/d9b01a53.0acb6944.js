"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[9570],{3905:(e,a,t)=>{t.d(a,{Zo:()=>m,kt:()=>g});var n=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function i(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?i(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function o(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=n.createContext({}),p=function(e){var a=n.useContext(s),t=a;return e&&(t="function"==typeof e?e(a):l(l({},a),e)),t},m=function(e){var a=p(e.components);return n.createElement(s.Provider,{value:a},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},k=n.forwardRef((function(e,a){var t=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),c=p(t),k=r,g=c["".concat(s,".").concat(k)]||c[k]||d[k]||i;return t?n.createElement(g,l(l({ref:a},m),{},{components:t})):n.createElement(g,l({ref:a},m))}));function g(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var i=t.length,l=new Array(i);l[0]=k;var o={};for(var s in a)hasOwnProperty.call(a,s)&&(o[s]=a[s]);o.originalType=e,o[c]="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=t[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}k.displayName="MDXCreateElement"},726:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var n=t(7462),r=(t(7294),t(3905));const i={},l="Canvas",o={unversionedId:"canvas/canvas",id:"canvas/canvas",title:"Canvas",description:"toBlob",source:"@site/docs/canvas/canvas.mdx",sourceDirName:"canvas",slug:"/canvas/",permalink:"/blog/docs/canvas/",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/canvas/canvas.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u6d4f\u89c8\u5668\u76f8\u5173",permalink:"/blog/docs/browser"},next:{title:"2D\u6e32\u67d3",permalink:"/blog/docs/canvas/2d"}},s={},p=[{value:"toBlob",id:"toblob",level:2},{value:"toDataURL",id:"todataurl",level:2},{value:"captureStream",id:"capturestream",level:2},{value:"drawImage",id:"drawimage",level:2},{value:"getImageData/putImageData",id:"getimagedataputimagedata",level:2},{value:"OffscreenCanvas",id:"offscreencanvas",level:2},{value:"transferControlToOffscreen",id:"transfercontroltooffscreen",level:2},{value:"transferToImageBitmap",id:"transfertoimagebitmap",level:2},{value:"ImageBitmap",id:"imagebitmap",level:2},{value:"createImageBitMap",id:"createimagebitmap",level:2},{value:"\u7ed8\u5236 API",id:"\u7ed8\u5236-api",level:2},{value:"\u77e9\u5f62\u7ed8\u5236",id:"\u77e9\u5f62\u7ed8\u5236",level:2},{value:"\u8def\u5f84\u7ed8\u5236",id:"\u8def\u5f84\u7ed8\u5236",level:2},{value:"\u5750\u6807\u53d8\u6362",id:"\u5750\u6807\u53d8\u6362",level:2},{value:"save/restore",id:"saverestore",level:2}],m={toc:p},c="wrapper";function d(e){let{components:a,...t}=e;return(0,r.kt)(c,(0,n.Z)({},m,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"canvas"},"Canvas"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const canvas = document.querySelector('canvas');\nconst context = canvas.getContext('2d');\n")),(0,r.kt)("h2",{id:"toblob"},"toBlob"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'canvas.toBlob(blob => {\n  const url = URL.createObjectURL(blob);\n}, "image/jpeg", 1) // quality\n')),(0,r.kt)("h2",{id:"todataurl"},"toDataURL"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'const dataUrl = canvas.toDataURL("image/jpeg", 1); // quality\n')),(0,r.kt)("h2",{id:"capturestream"},"captureStream"),(0,r.kt)("p",null,"\u83b7\u53d6Canvas\u7684\u5a92\u4f53\u6d41\uff0c\u4ece\u800c\u5b9e\u73b0Video\u9884\u89c8\u6216\u8005\u5a92\u4f53\u5f55\u5236\u7684\u80fd\u529b\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const stream = canvas.captureStream();\n\n// \u9884\u89c8\u80fd\u529b \nvideo.srcObject = stream;\n\n// \u5f55\u5236\u80fd\u529b\nconst recorder = new MediaRecorder(stream);\n")),(0,r.kt)("h2",{id:"drawimage"},"drawImage"),(0,r.kt)("p",null,"Canvas\u63d0\u4f9b\u4e86",(0,r.kt)("inlineCode",{parentName:"p"},"drawImage"),"\u65b9\u6cd5\u5c06\u4e0d\u540c\u7684\u56fe\u50cf\u6e90\u7ed8\u5236\u5230\u6211\u4eec\u7684\u76ee\u6807Canvas\u4e0a\uff0c\u56fe\u50cf\u6e90\u5305\u62ecImage\u3001Video\u751a\u81f3\u53e6\u4e00\u4e2aCanvas\u5bf9\u8c61\uff0c\u4ee5\u53ca\u540e\u6587\u4f1a\u4ecb\u7ecd\u7684ImageBitMap\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"ctx.drawImage(image, 0, 0)\nctx.drawImage(video, 0, 0)\nctx.drawImage(canvas2, 0, 0)\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"drawImage"),"\u51fd\u6570\u662f\u4e2a\u91cd\u8f7d\u51fd\u6570\uff0c\u6709\u51e0\u79cd\u4e0d\u540c\u7684\u7528\u6cd5\u3002\uff08\u6ce8\uff1a\u4e0b\u6587\u4e2d\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"d"),"\u8868\u793a\u76ee\u6807Canvas Destination\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"s"),"\u8868\u793a\u56fe\u50cf\u6e90\u5934Source\uff09"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"drawImage(source, dx, dy)"),"\u3002\u7b80\u5355\u7684\u7528\u6cd5\uff0c\u4ee5",(0,r.kt)("inlineCode",{parentName:"p"},"(dx, dy)"),"\u4e3a\u539f\u70b9\u7ed8\u5236\u76ee\u6807\u56fe\u50cf\u3002")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"drawImage(source, dx, dy, dWidth, dHeight)"),"\u3002\u548c\u7528\u6cd5\u4e00\u7c7b\u4f3c\uff0c\u989d\u5916\u63d0\u4f9b\u4e86",(0,r.kt)("inlineCode",{parentName:"p"},"width"),"\u548c",(0,r.kt)("inlineCode",{parentName:"p"},"height"),"\u7684\u53c2\u6570\u5141\u8bb8\u6211\u4eec\u8c03\u6574\u6240\u7ed8\u5236\u7684\u56fe\u50cf\u7684\u5927\u5c0f\uff0c\u4ece\u800c\u5b9e\u73b0\u7c7b\u4f3c\u7f29\u653e\u7684\u6548\u679c\u3002")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"drawImage(source, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)"),"\u3002\u8fd9\u4e2a\u7528\u6cd5\u8c03\u6574\u4e86\u53c2\u6570\u7684\u987a\u5e8f\uff0c\u53ef\u7528\u6765\u88c1\u526a\u6570\u636e\u6e90\u7684\u90e8\u5206\u533a\u57df\u8fdb\u884c\u7ed8\u5236\u3002"),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("img",{parentName:"p",src:"https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage/canvas_drawimage.jpg",alt:null})))),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"drawImage"),"\u4f7f\u7528\u4e0d\u540c\u7684\u56fe\u50cf\u6e90\u65f6\u7684\u884c\u4e3a\u4e0d\u540c\uff0c\u6027\u80fd\u4e0a\u4e5f\u7565\u6709\u5dee\u5f02\uff0c\u7b14\u8005\u5728M2 Macbook Pro\u4e0b\uff0c\u5c06CPU\u964d\u901f6\u500d\u4e0b\u752815000*15000\u7684\u56fe\u7247\u8fdb\u884c\u6027\u80fd\u6d4b\u8bd5\u540e\u5f97\u51fa\u4ee5\u4e0b\u7ed3\u8bba\u3002"),(0,r.kt)("blockquote",{parentName:"admonition"},(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("a",{parentName:"p",href:"https://github.com/Messiahhh/canvas-perf-demo"},"Demo\u94fe\u63a5"))),(0,r.kt)("ol",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"drawImage(Image)"),"\uff0cJS\u7ebf\u7a0bAPI\u8c03\u7528\u5f88\u5feb\uff0c\u6e32\u67d3\u7ebf\u7a0b\u7ed8\u5236\u4e0a\u5c4f\u8f83\u6162\uff08\u5c06\u8fd13\u79d2\uff0c\u8017\u65f6\u4e3b\u8981\u96c6\u4e2d\u5728\u56fe\u50cf\u89e3\u7801\u4e0a\uff09\u3002"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"drawImage(Canvas)"),"\uff0cJS\u7ebf\u7a0bAPI\u8c03\u7528\u5f88\u5feb\uff0c\u6e32\u67d3\u7ebf\u7a0b\u7ed8\u5236\u4e0a\u5c4f\u4e5f\u5f88\u5feb\u3002",(0,r.kt)("strong",{parentName:"li"},"\u63a8\u8350"),"\u3002"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"drawImage(OffscreenCanvas)"),"\uff0cJS\u7ebf\u7a0bAPI\u8c03\u7528\u5f88\u6162\uff08\u5c06\u8fd13\u79d2\uff0c\u8017\u65f6\u4e3b\u8981\u96c6\u4e2d\u5728\u56fe\u50cf\u89e3\u7801\u4e0a\uff0c\u53ef\u80fd\u662f\u6d4f\u89c8\u5668\u5185\u90e8\u673a\u5236\u7684\u539f\u56e0\u56fe\u50cf\u89e3\u7801\u5b8c\u6210\u540e\u8be5\u51fd\u6570\u624d\u8fd4\u56de\uff09\uff0c\u6e32\u67d3\u7ebf\u7a0b\u7ed8\u5236\u4e0a\u5c4f\u5feb\u3002\u4e8b\u5b9e\u53d1\u73b0",(0,r.kt)("inlineCode",{parentName:"li"},"drawImage(image)"),"\u5230OffscreenCanvas\u4e0a\u65f6\u4e0d\u4f1a\u89e6\u53d1\u56fe\u50cf\u89e3\u7801\uff0c\u540e\u7eed\u5728\u628aOffscreenCanvas\u7ed8\u5236\u5230Canvas\u4e0a\u624d\u4f1a\u89e6\u53d1\u56fe\u50cf\u89e3\u7801\uff0c\u56e0\u6b64\u5728\u79bb\u5c4f\u6e32\u67d3\u7684\u65f6\u5019\u5e94\u8be5\u9009\u62e9\u4f7f\u7528Canvas\u800c\u4e0d\u662fOffscreenCanvas\u3002"),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"drawImage(ImageBitmap)"),"\u3002JS\u7ebf\u7a0bAPI\u8c03\u7528\u5f88\u5feb\uff0c\u6e32\u67d3\u7ebf\u7a0b\u7ed8\u5236\u4e0a\u5c4f\u4e5f\u5f88\u5feb\u3002\u548c\u7528\u4f8b2\u5dee\u4e0d\u591a\u3002",(0,r.kt)("strong",{parentName:"li"},"\u63a8\u8350"),"\u3002")),(0,r.kt)("p",{parentName:"admonition"},"\u5728\u4f8b\u5b502\u548c\u4f8b\u5b503\u4e2d\uff0c\u6211\u4eec\u9700\u8981\u5148\u901a\u8fc7drawImage\u628a\u56fe\u7247\u7ed8\u5236\u5230\u7528\u6765\u7f13\u5b58\u7684Canvas/OffscreenCanvas\u4e0a\uff0c\u4f46\u6211\u6ca1\u6709\u7acb\u523b\u540c\u6b65\u5730\u628a\u7f13\u5b58\u7684Canvas\u7ed8\u5236\u5230\u6211\u4eec\u7684\u76ee\u6807Canvas\u4e0a\uff0c\u800c\u662f\u4f7f\u7528\u4e86\u4e00\u4e2a\u5b9a\u65f6\u5668\u6765\u786e\u4fdd\u5148\u6267\u884c\u6e32\u67d3\u7ebf\u7a0b\uff0c\u4ece\u800c\u4fdd\u8bc1\u6211\u4eec\u7684Canvas\u56fe\u50cf\u6e90\u672c\u8eab\u5df2\u7ecf\u7ed8\u5236\u5b8c\u6bd5ready\u4e86\u3002\n\u6b64\u65f6\u6574\u4f53\u6267\u884c\u987a\u5e8f\u5982\u4e0b\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"1. JS\u7ebf\u7a0b drawImage(image) -> 2. \u6e32\u67d3\u7ebf\u7a0b \u628a\u56fe\u7247\u7ed8\u5236\u5230Canvas\u4e0a -> 3. JS\u7ebf\u7a0b drawImage(canvas) -> 4. \u6e32\u67d3\u7ebf\u7a0b \u7ed8\u5236Canvas\u5230Canvas"),"\u3002\n\u56e0\u6b64\u6211\u5b9e\u9645\u4e0a\u6d4b\u91cf\u7684\u662f3\u548c4\u7684\u603b\u65f6\u957f\uff0c\u8fd9\u4e5f\u662f\u79bb\u5c4f\u6e32\u67d3\u7684\u5e38\u89c1\u573a\u666f\u2014\u2014\u2014\u2014\u6211\u5df2\u7ecf\u63d0\u524d\u7f13\u5b58\u597d\u4e86Canvas/\u56fe\u50cf\u6e90\u4e86\uff0c\u73b0\u5728\u5173\u5fc3\u7684\u662f\u8c03\u7528drawImage(canvas)\u65f6\u4e0a\u5c4f\u6240\u9700\u8981\u7684\u65f6\u95f4\u3002"),(0,r.kt)("p",{parentName:"admonition"},"\u5728\u5176\u4ed6\u7684\u4e00\u4e9b\u573a\u666f\u4e0b\uff0c\u6211\u4eec\u4f1a\u5728JS\u7ebf\u7a0b\u8c03\u7528\u4e86",(0,r.kt)("inlineCode",{parentName:"p"},"drawImage(image)"),"\u540e\u7acb\u523b\u8c03\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"drawImage(canvas)"),"\uff0c\u76f8\u5f53\u4e8e\u6211\u4eec\u4f8b\u5b50\u4e2d\u628a\u5b9a\u65f6\u5668\u53bb\u6389\u7684\u6548\u679c\u3002\n\u6b64\u65f6\u6574\u4f53\u7684\u6267\u884c\u987a\u5e8f\u5982\u4e0b\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"1. JS\u7ebf\u7a0b drawImage(image) -> 2. JS\u7ebf\u7a0b drawImage(canvas) -> 3. \u6e32\u67d3\u7ebf\u7a0b"),"\u3002\u5176\u5b9e\u8fd9\u4e2a\u884c\u4e3a\u548c\u4e0a\u9762\u4f8b\u5b503 OffscreenCanvas\u662f\u57fa\u672c\u4e00\u81f4\u7684\uff0c\u4e8b\u5b9e\u4e5f\u8bc1\u660e\u6b64\u65f6\u4f1a\u5728\u6b65\u9aa42\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"drawImage(canvas)"),"\n\u4e2d\u8017\u65f6\u5c06\u8fd13\u79d2\u7528\u6765\u56fe\u50cf\u8f6c\u7801\u3002")),(0,r.kt)("h2",{id:"getimagedataputimagedata"},"getImageData/putImageData"),(0,r.kt)("p",null,"\u901a\u8fc7",(0,r.kt)("inlineCode",{parentName:"p"},"getImageData"),"\u53ef\u4ee5\u76f4\u63a5\u62ff\u5230Canvas\u6307\u5b9a\u533a\u57df\u5bf9\u5e94\u7684\u539f\u59cb\u50cf\u7d20\u6570\u636e\u3002\u53ef\u4ee5\u901a\u8fc7\u6307\u5b9a\u7684\u6570\u5b66\u8f6c\u6362\u5b9e\u73b0\u4e0d\u540c\u7684\u6548\u679c\uff0c\u6bd4\u5982Konva\u7684\u9ad8\u65af\u6a21\u7cca\u7b49\u6ee4\u955c\u5c31\u662f\u901a\u8fc7\u7eafCPU\u8ba1\u7b97\u5b9e\u73b0\u7684\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)\n\nfor (let i = 0; i < imageData.data.length; i += 4) {\n    imageData.data[i] = 255; // red channel\n    imageData.data[i + 1] = 0; // green channel\n    imageData.data[i + 2] = 255; // blue channel\n    imageData.data[i + 3] = 200; // alpha channel\n}\nctx.putImageData(imageData, 0, 0)\n")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"\u9700\u8981\u7279\u522b\u6ce8\u610f\u7684\u662f\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"getImageData"),"\u548c",(0,r.kt)("inlineCode",{parentName:"p"},"putImageData"),"\u90fd\u662f\u975e\u5e38\u8017CPU\u7684\u64cd\u4f5c\uff0c\u5bb9\u6613\u9020\u6210\u957f\u4efb\u52a1\u3002\u9664\u975e\u6211\u4eec\u786e\u5b9e\u9700\u8981\u5bf9\u50cf\u7d20\u505a\u4e00\u4e9b\u64cd\u4f5c\uff0c\u5426\u5219\u90fd\u5e94\u8be5\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"drawImage"),"\u7b49\u65b9\u6cd5\u6765\u8fdb\u884c\u7ed8\u5236\u3002")),(0,r.kt)("admonition",{title:"GPU/CPU Canvas",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"\u9ed8\u8ba4\u60c5\u51b5\u4e0bCanvas\u7684\u521b\u5efa\u548c\u7ed8\u5236\u90fd\u662f\u5728GPU\u4e0a\u7684\uff08\u786c\u4ef6\u52a0\u901f\uff09\uff0c\u5f53\u6211\u4eec\u8c03\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"getImageData"),"\u6216\u8005",(0,r.kt)("inlineCode",{parentName:"p"},"putImageData"),"\u65f6\u672c\u8d28\u90fd\u662fGPU\u663e\u5b58\u548cCPU\u5185\u5b58\u7684\u8bfb\u5199\u6570\u636e\uff0c\u8fd9\u662f\u4e2a\u6bd4\u8f83\u8017\u8d39\u6027\u80fd\u7684\u64cd\u4f5c\u3002\u5982\u679c\u6211\u4eec\u7684Canvas\u5b58\u5728\u5f88\u9891\u7e41\u7684\u8fd9\u7c7b\u8bfb\u5199\u64cd\u4f5c\uff0c\u53ef\u4ee5\u8003\u8651\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"willReadFrequently"),"\u6807\u8bc6\uff0c\u8fd9\u6837Canvas\u7684\u7ed8\u5236\u6570\u636e\u90fd\u4f1a\u88ab\u5b58\u50a8\u5728CPU\u5185\u5b58\u4e2d\uff0c\u51cf\u5c11\u8bfb\u5199\u64cd\u4f5c\u7684\u5ef6\u65f6\uff0c\u4f46\u540c\u65f6\u4e5f\u4f1a\u5931\u53bbGPU\u786c\u4ef6\u52a0\u901f\u7684\u80fd\u529b\u3002"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const ctx = canvas.getContext('2d', {\n  willReadFrequently: true\n})\n")),(0,r.kt)("blockquote",{parentName:"admonition"},(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"willReadFrequently")),(0,r.kt)("p",{parentName:"blockquote"},"A boolean value that indicates whether or not a lot of read-back operations are planned. This will force the use of a software (instead of hardware accelerated) 2D canvas and can save memory when calling getImageData() frequently."))),(0,r.kt)("h2",{id:"offscreencanvas"},"OffscreenCanvas"),(0,r.kt)("p",null,"\u6211\u4eec\u7684\u4e3b\u9875\u9762\u5b58\u5728\u7740\u4e92\u65a5\u7684JS\u7ebf\u7a0b\uff08\u901a\u5e38\u4e5f\u88ab\u79f0\u4e3a\u4e3b\u7ebf\u7a0b\uff09\u548c\u6e32\u67d3\u7ebf\u7a0b\u3002\u6bcf\u5f53JS\u7ebf\u7a0b\u6267\u884c\u5b8c\u4e00\u4e2aJS\u4efb\u52a1\uff0c\u5c31\u4f1a\u5207\u5230\u6e32\u67d3\u7ebf\u7a0b\u6267\u884c\u6e32\u67d3\u4efb\u52a1\uff08\u5373\u5c4f\u5e55\u5185\u5bb9\u7684\u7ed8\u5236\uff09\uff0c\u7ed8\u5236\u5b8c\u540e\u53c8\u56de\u5230JS\u7ebf\u7a0b\u6267\u884c\u4e0b\u4e00\u4e2aJS\u4efb\u52a1\u3002\n\u8fd9\u4e5f\u662f\u4e3a\u4ec0\u4e48\u957f\u4efb\u52a1\u4f1a\u5bfc\u81f4\u9875\u9762\u5361\u987f\uff0c\u4e00\u822c\u4e3a\u4e86\u4fdd\u8bc1\u753b\u9762\u7a33\u5b9a\u572860\u5e27\u7684\u5237\u65b0\u7387\uff0c\u6211\u4eec\u9700\u8981\u6bcf16.6\u79d2\u7ed8\u5236\u4e00\u6b21\uff0c\u4f46\u8003\u8651\u5230\u6e32\u67d3\u7ebf\u7a0b\u672c\u8eab\u7684\u6267\u884c\u4e5f\u662f\u9700\u8981\u65f6\u95f4\u7684\uff0c\u6240\u4ee5\u6700\u7ec8\u7559\u7ed9\u6211\u4eec\u7684\u6bcf\u4e2aJS\u4efb\u52a1\u7684\u6267\u884c\u65f6\u95f4\u662f\u6bd4\u8fd9\u66f4\u77ed\u7684\u3002"),(0,r.kt)("p",null,"\u4e00\u822c\u5bf9\u4e8e",(0,r.kt)("strong",{parentName:"p"},"\u524d\u540e\u4f9d\u8d56\u7684\u957f\u65f6\u95f4JS\u540c\u6b65\u4efb\u52a1"),"\uff0c\u6709\u79cd\u4f18\u5316\u624b\u6bb5\u662f\u5229\u7528\u5982",(0,r.kt)("inlineCode",{parentName:"p"},"setTimeout"),"\u6216\u8005",(0,r.kt)("inlineCode",{parentName:"p"},"Promise.then"),"\u7684\u80fd\u529b\u628a\u4efb\u52a1\u62c6\u5206\u6210\u591a\u4e2a\u4efb\u52a1\u6765\u5f02\u6b65\u6267\u884c\uff08JS\u4e2d\u7684\u5f02\u6b65\u6307\u7684\u662f\u5355\u7ebf\u7a0b\u5f02\u6b65\uff09\uff0c\u4ece\u800c\u907f\u514d\u4efb\u52a1\u8fc7\u957f\u5bfc\u81f4\u9875\u9762\u5361\u987f\u3002\u4f46\u4efb\u52a1\u6574\u4f53\u7684\u8017\u65f6\u662f\u4e0d\u4f1a\u51cf\u5c11\u7684\uff08\u751a\u81f3\u66f4\u957f\u4e86\uff09\u3002"),(0,r.kt)("p",null,"\u800c\u5bf9\u4e8e",(0,r.kt)("strong",{parentName:"p"},"\u4e92\u76f8\u72ec\u7acb\u7684\u540c\u6b65\u4efb\u52a1\uff08JS\u4efb\u52a1\u6216\u8005\u6e32\u67d3\u4efb\u52a1\uff09"),"\uff0c\u6211\u4eec\u53ef\u4ee5\u501f\u52a9Web Worker\u7684\u80fd\u529b\u5b9e\u73b0\u5e76\u884c\u7684\u8ba1\u7b97\u548c\u6e32\u67d3\u3002\nWeb Worker\u90fd\u6709\u7740\u81ea\u5df1\u7684JS\u7ebf\u7a0b\u548c\u6e32\u67d3\u7ebf\u7a0b\uff0c\u5b83\u4eec\u7684\u6267\u884c\u4e0d\u4f1a\u5f71\u54cd\u5230\u6211\u4eec\u4e3b\u9875\u9762\u7684\u6267\u884c\u548c\u6e32\u67d3\u3002\u800c\u4e3a\u4e86\u5229\u7528\u5230Web Worker\u7684\u6e32\u67d3\u7ebf\u7a0b\uff0c\u6211\u4eec\u9700\u8981\u4f7f\u7528\u5230Canvas\uff0c\u7136\u800c\u4e0d\u5e78\u7684\u662fWeb Worker\u73af\u5883\u4e0b\u65e0\u6cd5\u8bbf\u95ee\u5230DOM\u5143\u7d20\uff0c\u4e3a\u4e86\u89e3\u51b3\u8fd9\u4e2a\u95ee\u9898\u6d4f\u89c8\u5668\u5728Web Worker\u4e0b\u63d0\u4f9b\u4e86\u548cDOM\u5b8c\u5168\u89e3\u8026\u7684Canvas\u2014\u2014\u2014\u2014OffscreenCanvas\u3002"),(0,r.kt)("p",null,"\u5728\u4e0a\u6587\u4e2d\u6211\u4eec\u4e5f\u7b80\u5355\u63d0\u5230\u8fc7OffscreenCanvas\uff0c\u5b83\u672c\u8eab\u7684\u7ed8\u5236\u80fd\u529b\u548c\u666e\u901a\u7684Canvas\u57fa\u672c\u4e00\u81f4\uff0c\u5e76\u6ca1\u6709\u795e\u5947\u7684\u9b54\u6cd5\u6765\u63d0\u5347\u6211\u4eec\u7684\u7ed8\u5236\u6027\u80fd\u3002\u80fd\u591f\u5728Web Worker\u4e0b\u6267\u884c\uff0c\u5145\u5206\u5229\u7528Web Worker\u7684\u6e32\u67d3\u7ebf\u7a0b\u80fd\u529b\uff0c\u662f\u5b83\u6700\u5927\u7684\u4eae\u70b9\u3002\u6bd4\u5982\u6211\u4eec\u53ef\u4ee5\u4f7f\u7528\u4e0b\u6587\u5c06\u8981\u4ecb\u7ecd\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"transferControlToOffscreen"),"\uff0c\u5b9e\u73b0\u901a\u8fc7Web Worker\u7684\u6e32\u67d3\u7ebf\u7a0b\u7ed8\u5236\u4e3b\u9875\u9762\u7684\u5185\u5bb9\u3002"),(0,r.kt)("admonition",{title:"\u5e76\u884c\u5904\u7406",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Web Worker\u63d0\u4f9b\u7ed9\u6211\u4eec\u5e76\u884c\u8ba1\u7b97\u548c\u6e32\u67d3\u7684\u80fd\u529b\uff0c\u5f53\u6211\u4eec\u5b58\u5728\u7279\u522b\u591a\u4e92\u76f8\u72ec\u7acb\u7684\u4efb\u52a1\u65f6\uff0c\u7406\u8bba\u4e0a\u6211\u4eec\u53ef\u4ee5\u521b\u5efa\u65e0\u6570\u4e2aWeb Worker\u6765\u5b9e\u73b0\u5e76\u884c\u52a0\u901f\u3002\u4f46\u5b9e\u9645\u4e0aWeb Worker\u7684\u521b\u5efa\u5f00\u9500\u662f\u4e0d\u5c0f\u7684\uff08\u8fdb\u7a0b\u7ea7\u522b\uff09\uff0c\u6240\u4ee5\u5e76\u4e0d\u73b0\u5b9e\u3002\u6211\u4eec\u4e00\u822c\u4f1a\u501f\u52a9GPU\u7684\u80fd\u529b\uff0c\u6765\u5904\u7406\u5404\u79cd\u5e76\u884c\u8ba1\u7b97\u7684\u590d\u6742\u573a\u666f\u3002")),(0,r.kt)("h2",{id:"transfercontroltooffscreen"},"transferControlToOffscreen"),(0,r.kt)("p",null,"\u5728JS\u7ebf\u7a0b\u8c03\u7528Canvas\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"transferControlToOffscreen"),"\u65b9\u6cd5\u53ef\u4ee5\u751f\u6210\u4e00\u4e2aOffscreenCanvas\u5b9e\u4f8b\uff0c\u540c\u65f6\u4f1a\u628a\u81ea\u8eab\u4e0a\u4e0b\u6587\u7684\u6240\u6709\u6743\u8f6c\u79fb\u7ed9\u8be5\u5b9e\u4f8b\u3002"),(0,r.kt)("p",null,"\u8fd9\u610f\u5473\u7740\u6211\u4eec\u5c06\u65e0\u6cd5\u76f4\u63a5\u8bbf\u95eeCanvas\u7684\u4e0a\u4e0b\u6587\uff0c\u4f46\u901a\u8fc7OffscreenCanvas\u5374\u53ef\u4ee5\u62ff\u5230Canvas\u7684\u4e0a\u4e0b\u6587\u3002\u800c\u6211\u4eec\u53ef\u4ee5\u628aOffscreenCanvas\u4f20\u9012\u7ed9Web Worker\uff0c\u5373\u53ef\u901a\u8fc7\u5728Web Woker\u4e2d\u8c03\u7528OffscreenCanvas\u7684\u80fd\u529b\u6765\u95f4\u63a5\u7ed8\u5236JS\u7ebf\u7a0b\u7684Canvas\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="main.js"',title:'"main.js"'},"const canvas = document.createElement('canvas')\ncanvas.width = 5000\ncanvas.height = 5000\ndocument.body.appendChild(canvas)\n\nconst offscreenCanvas = canvas.transferControlToOffscreen()\nconst worker = new Worker('./worker.js')\nworker.postMessage({ canvas: offscreenCanvas }, [offscreenCanvas])\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="worker.js"',title:'"worker.js"'},"let canvas = null;\nself.onmessage = function(evt) {\n    if (evt.data.canvas) {\n        canvas = evt.data.canvas;\n        draw()\n    }\n}\n\nfunction draw() {\n    if (canvas) {\n        const ctx = canvas.getContext('2d');\n        ctx.fillStyle = 'pink'\n        ctx.fillRect(0, 0, canvas.width, canvas.height);\n        requestAnimationFrame(draw)\n    }\n}\n")),(0,r.kt)("h2",{id:"transfertoimagebitmap"},"transferToImageBitmap"),(0,r.kt)("p",null,"\u9664\u4e86\u4e0a\u8ff0\u7684\u65b9\u6cd5\u5916\uff0c\u6211\u4eec\u4e5f\u53ef\u4ee5\u76f4\u63a5\u5728Web Worker\u4e2d\u521d\u59cb\u5316OffscreenCanvas\u5b9e\u4f8b\u5e76\u8fdb\u884c\u7ed8\u5236\u64cd\u4f5c\u3002\u800c\u4e3a\u4e86\u5c06\u7ed8\u5236\u5185\u5bb9\u540c\u6b65\u5230JS\u7ebf\u7a0b\u7684Canvas\u4e0a\uff0c\u6211\u4eec\u9996\u5148\u53ef\u80fd\u4f1a\u60f3\u5230",(0,r.kt)("inlineCode",{parentName:"p"},"getImageData"),"\u4f46\u5f88\u660e\u663e\u8fd9\u592a\u8017\u6027\u80fd\u4e86\uff0c\u53c8\u6216\u8005\u628aOffscreenCanvas\u4f20\u9012\u5230JS\u7ebf\u7a0b\u4f46\u6211Worker\u7ebf\u7a0b\u540e\u9762\u8fd8\u8981\u7528\u5230\u6240\u4ee5\u4e5f\u4e0d\u884c\u3002\u56e0\u6b64\u6d4f\u89c8\u5668\u7ed9OffscreenCanvas\u63d0\u4f9b\u4e86",(0,r.kt)("inlineCode",{parentName:"p"},"transferToImageBitmap"),"\u7684\u80fd\u529b\u6765\u89e3\u51b3\u8fd9\u4e2a\u95ee\u9898\u3002"),(0,r.kt)("p",null,"\u5728\u524d\u8ff0\u7ae0\u8282\u4e2d\u6211\u4eec\u4ecb\u7ecd\u8fc7\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"getImageData"),"\u7684\u672c\u8d28\u662f\u628aGPU\u663e\u5b58\u4e2d\u7684\u6570\u636e\u5199\u5165\u5230CPU\u5185\u5b58\u4e2d\uff0c\u5b58\u5728\u4e0d\u5c0f\u7684\u6027\u80fd\u5f00\u9500\u3002\u800c",(0,r.kt)("inlineCode",{parentName:"p"},"transferToImageBitmap"),"\u53ef\u4ee5\u7b80\u5355\u7406\u89e3\u6210GPU\u663e\u5b58\u5230GPU\u663e\u5b58\u7684\u4f20\u9012\uff0c\u5373\u628aOffscreenCanvas\u5f53\u524d\u7ed8\u5236\u7684\u5185\u5bb9\u8f6c\u79fb\u5230\u53e6\u4e00\u5757GPU\u663e\u5b58\u7a7a\u95f4\u4e2d\uff0c\u6027\u80fd\u662f\u6bd4\u8f83\u597d\u7684\uff0c\u5e76\u4e14\u6b64\u65f6\u5982\u679c\u518d\u5c1d\u8bd5\u901a\u8fc7",(0,r.kt)("inlineCode",{parentName:"p"},"getImageData"),"\u8bfb\u53d6OffscreenCanvas\u7684\u6570\u636e\u4f1a\u53d1\u73b0\u90fd\u5df2\u7ecf\u88ab\u91cd\u7f6e\u4e86\u3002"),(0,r.kt)("h2",{id:"imagebitmap"},"ImageBitmap"),(0,r.kt)("h2",{id:"createimagebitmap"},"createImageBitMap"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const image = new Image();\nimage.src = '';\nimage.onload = function() {\n  createImageBitmap(image).then(bitMap => {\n    ctx.drawImage(bitMap, 0, 0);\n  })\n}\n")),(0,r.kt)("h2",{id:"\u7ed8\u5236-api"},"\u7ed8\u5236 API"),(0,r.kt)("h2",{id:"\u77e9\u5f62\u7ed8\u5236"},"\u77e9\u5f62\u7ed8\u5236"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"fillRect()")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"strokeRect()")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"clearRect()"))),(0,r.kt)("h2",{id:"\u8def\u5f84\u7ed8\u5236"},"\u8def\u5f84\u7ed8\u5236"),(0,r.kt)("p",null,"\u8def\u5f84\u5373\u4e3a\u591a\u4e2a\u70b9\u7684\u8fde\u7ebf\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"ctx.beginPath()\n\nctx.fill()\nctx.stroke()\n\nctx.closePath()\n")),(0,r.kt)("h2",{id:"\u5750\u6807\u53d8\u6362"},"\u5750\u6807\u53d8\u6362"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"ctx.translate(x, y)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"ctx.rotate(radians)"),"\u3002\u5c06\u5750\u6807\u7cfb\u987a\u65f6\u9488\u65cb\u8f6c\uff0c\u5f27\u5ea6\u5236\u6bd4\u5982",(0,r.kt)("inlineCode",{parentName:"li"},"ctx.rotate(Math.PI)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"ctx.scale(x, y)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"ctx.transform(a, b, c, d, e, f)"))),(0,r.kt)("h2",{id:"saverestore"},"save/restore"),(0,r.kt)("p",null,"Canvas\u76842D\u4e0a\u4e0b\u6587\u7684\u672c\u8d28\u662f\u4e00\u4e2a\u72b6\u6001\u673a\uff0c\u56e0\u6b64\u5b83\u8fd8\u63d0\u4f9b\u4e86\u4fdd\u5b58\u548c\u6062\u590d\u5f53\u524d\u72b6\u6001\u7684\u80fd\u529b\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"ctx.save()\nctx.tranlate(10, 10)\nctx.fillRect(0, 0, 100, 100)\nctx.restore()\n")))}d.isMDXComponent=!0}}]);