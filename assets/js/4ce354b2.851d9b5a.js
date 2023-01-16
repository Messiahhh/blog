"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[5012],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return m}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=r.createContext({}),l=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},p=function(e){var n=l(e.components);return r.createElement(i.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},k=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,c=e.originalType,i=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),k=l(t),m=o,d=k["".concat(i,".").concat(m)]||k[m]||u[m]||c;return t?r.createElement(d,s(s({ref:n},p),{},{components:t})):r.createElement(d,s({ref:n},p))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var c=t.length,s=new Array(c);s[0]=k;var a={};for(var i in n)hasOwnProperty.call(n,i)&&(a[i]=n[i]);a.originalType=e,a.mdxType="string"==typeof e?e:o,s[1]=a;for(var l=2;l<c;l++)s[l]=t[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}k.displayName="MDXCreateElement"},9502:function(e,n,t){t.r(n),t.d(n,{assets:function(){return p},contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return a},metadata:function(){return l},toc:function(){return u}});var r=t(7462),o=t(3366),c=(t(7294),t(3905)),s=["components"],a={sidebarDepth:4},i="WebSocket",l={unversionedId:"websocket",id:"websocket",title:"WebSocket",description:"\u57fa\u672c\u7528\u6cd5",source:"@site/docs/websocket.md",sourceDirName:".",slug:"/websocket",permalink:"/blog/docs/websocket",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/websocket.md",tags:[],version:"current",frontMatter:{sidebarDepth:4},sidebar:"tutorialSidebar",previous:{title:"Docker",permalink:"/blog/docs/docker"},next:{title:"php",permalink:"/blog/docs/php"}},p={},u=[{value:"ws",id:"ws",level:3},{value:"socket.io",id:"socketio",level:3},{value:"\u5fc3\u8df3\u5305",id:"\u5fc3\u8df3\u5305",level:3}],k={toc:u};function m(e){var n=e.components,t=(0,o.Z)(e,s);return(0,c.kt)("wrapper",(0,r.Z)({},k,t,{components:n,mdxType:"MDXLayout"}),(0,c.kt)("h1",{id:"websocket"},"WebSocket"),(0,c.kt)("p",null,"\u57fa\u672c\u7528\u6cd5"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-js"},"let ws = new WebSocket('ws://url.com:port')\nws.onopen = () => {}\nws.onclose = () => {}\nws.onerror = () => {}\nws.onmessage = (e) => {}\n\nws.send()\n")),(0,c.kt)("p",null,"\u5e38\u7528\u7684WebSocket\u5e93\u6709",(0,c.kt)("inlineCode",{parentName:"p"},"socket.io"),"\u548c",(0,c.kt)("inlineCode",{parentName:"p"},"ws"),"\uff0c \u57fa\u7840\u7528\u6cd5\u7c7b\u4f3c\uff0c\u4e0d\u8fc7",(0,c.kt)("inlineCode",{parentName:"p"},"ws"),"\u53ea\u80fd\u7528\u4e8e\u540e\u7aef\uff0c\u524d\u8005\u53ef\u4ee5\u7528\u4e8e\u524d\u540e\u7aef\u3002"),(0,c.kt)("h3",{id:"ws"},"ws"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-js"},"// \u524d\u7aef\u4f7f\u7528\u539f\u751fWebsocket Api\nlet ws = new WebSocket('ws://localhost:8080')\nws.onopen = () => {}\nws.onmessage = () => {}\n\n// \u540e\u7aef\nconst WebSocket = require('ws');\nconst wss = new WebSocket.Server({ port: 8080 });\n\nwss.on('connection', function connection(ws) {\n  ws.on('message', function incoming(message) {\n    console.log('received: %s', message);\n  });\n\n  ws.send('something');\n});\n")),(0,c.kt)("h3",{id:"socketio"},"socket.io"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-html"},'\x3c!-- \u524d\u7aef\u4e5f\u9700\u8981\u5f15\u7528socket.io\u5e93 --\x3e\n<script src="/socket.io/socket.io.js"><\/script>\n<script>\n  var socket = io();\n<\/script>\n')),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-js"},"// \u540e\u7aef\nvar io = require('socket.io')(http);\nio.on('connection', function(socket){\n  console.log('a user connected');\n  socket.on('disconnect', function(){\n    console.log('user disconnected');\n  });\n});\n")),(0,c.kt)("p",null,"\u5f53\u6b63\u5e38\u60c5\u51b5\u4e0b\uff0c\u82e5\u8fde\u63a5\u4e2d\u65ad\uff0c\u6211\u4eec\u9700\u8981\u91cd\u65b0\u8fdb\u884c\u8fde\u63a5\u3002"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-js"},"ws.onclose = () => {\n    reconnect()\n}\nws.onerror = () => {\n    reconnect()\n}\n")),(0,c.kt)("h3",{id:"\u5fc3\u8df3\u5305"},"\u5fc3\u8df3\u5305"),(0,c.kt)("p",null,"\u6b63\u5e38\u60c5\u51b5\u4e0b\uff0c\u8fde\u63a5\u4e2d\u65ad\u4f1a\u89e6\u53d1",(0,c.kt)("inlineCode",{parentName:"p"},"onclose"),"\u4e8b\u4ef6\uff0c\u6211\u4eec\u53ea\u9700\u8981\u5728",(0,c.kt)("inlineCode",{parentName:"p"},"onclose"),"\u4e8b\u4ef6\u4e2d\u8fdb\u884c\u91cd\u8fde\u5373\u53ef\u3002"),(0,c.kt)("p",null,"\u4f46\u5982\u679c\u662f\u56e0\u4e3a\u7f51\u7edc\u5f02\u5e38\uff0c\u6216\u662f\u4fe1\u53f7\u4e0d\u4f73\uff0c\u5219\u4e0d\u4f1a\u89e6\u53d1",(0,c.kt)("inlineCode",{parentName:"p"},"onclose"),"\u4e8b\u4ef6\uff0c\u56e0\u6b64\u4e0d\u4f1a\u89e6\u53d1\u91cd\u8fde\u64cd\u4f5c\u3002\u5982\u679c\u6211\u4eec\u5b9a\u671f\u5411\u670d\u52a1\u5668\u53d1\u9001\u6d88\u606f\uff0c\u90a3\u4e48\u5373\u4f7f\u7f51\u7edc\u65ad\u5f00\u65f6\u6ca1\u6709\u89e6\u53d1",(0,c.kt)("inlineCode",{parentName:"p"},"onclose"),"\u4e8b\u4ef6\uff0c\u56e0\u4e3a\u6211\u4eec\u5b9a\u671f\u7684\u6d88\u606f\u65e0\u6cd5\u53d1\u5f80\u670d\u52a1\u5668\uff0c\u90a3\u4e48\u6b64\u65f6\u4f1a\u89e6\u53d1",(0,c.kt)("inlineCode",{parentName:"p"},"onclose"),"\u4e8b\u4ef6\uff0c\u6765\u6267\u884c\u91cd\u8fde\u64cd\u4f5c\u3002"),(0,c.kt)("p",null,"\u4e0a\u6587\u8bf4\u7684\u5b9a\u671f\u7684\u5411\u670d\u52a1\u5668\u53d1\u9001\u6d88\u606f\u5c31\u662f\u5fc3\u8df3\u5305\uff0c\u987e\u540d\u601d\u4e49\uff0c\u5fc3\u8df3\u5305\u6307\u50cf\u5fc3\u8df3\u4e00\u6837\uff0c\u6bcf\u9694\u56fa\u5b9a\u7684\u65f6\u95f4\u5411\u670d\u52a1\u5668\u53d1\u9001\u4e00\u6b21\u6d88\u606f\u3002"),(0,c.kt)("p",null,"\u7b80\u964b\u7684\u4ee3\u7801\u5b9e\u73b0\uff0c\u53ea\u662f\u7528\u6765\u5c55\u793a\u5927\u6982\u7684\u539f\u7406\u3002"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-js"},"let ws = new WebSocket('ws://localhost:3001')\nws.onopen = () => {\n    heartCheck.start()\n}\nws.onmessage = (data) => {\n    heartCheck.reset()\n}\nws.onclose = () => {\n    reconnect()\n}\nws.onerror = () => {\n    reconnect()\n}\n\nlet heartCheck = {\n    timeout: 60000, // 1\u5206\u949f\u53d1\u4e00\u6b21\n    timer: null,\n    start() {\n        this.timer = setTimeout(() => {\n            ws.send('heart')\n        }, timeout)\n    },\n    reset() {\n        clearTimeout(this.timer)\n        this.start()\n    }\n}\n")))}m.isMDXComponent=!0}}]);