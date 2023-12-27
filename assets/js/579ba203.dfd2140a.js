"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[1269],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>b});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var i=a.createContext({}),p=function(e){var n=a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=p(e.components);return a.createElement(i.Provider,{value:n},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=p(t),c=r,b=d["".concat(i,".").concat(c)]||d[c]||m[c]||l;return t?a.createElement(b,s(s({ref:n},u),{},{components:t})):a.createElement(b,s({ref:n},u))}));function b(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,s=new Array(l);s[0]=c;var o={};for(var i in n)hasOwnProperty.call(n,i)&&(o[i]=n[i]);o.originalType=e,o[d]="string"==typeof e?e:r,s[1]=o;for(var p=2;p<l;p++)s[p]=t[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},2556:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>s,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=t(7462),r=(t(7294),t(3905));const l={},s="Rust + Web",o={unversionedId:"rust/wasm",id:"rust/wasm",title:"Rust + Web",description:"\u76ee\u524dRust\u6709\u4e24\u79cd\u65b9\u5f0f\u8fd0\u7528\u5728\u6cdb\u524d\u7aef\u9886\u57df\uff0c\u5206\u522b\u662fWebAssembly\u548cNode-API",source:"@site/docs/rust/wasm.md",sourceDirName:"rust",slug:"/rust/wasm",permalink:"/blog/docs/rust/wasm",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/rust/wasm.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5305\u7ba1\u7406\u4e0e\u6a21\u5757",permalink:"/blog/docs/rust/modules"},next:{title:"Tauri",permalink:"/blog/docs/rust/tauri"}},i={},p=[{value:"WebAssembly",id:"webassembly",level:2},{value:"wasm-pack",id:"wasm-pack",level:3},{value:"wasm-bindgen",id:"wasm-bindgen",level:3},{value:"js-sys",id:"js-sys",level:4},{value:"web-sys",id:"web-sys",level:4},{value:"Node-API",id:"node-api",level:2},{value:"@napi-rs",id:"napi-rs",level:3}],u={toc:p},d="wrapper";function m(e){let{components:n,...t}=e;return(0,r.kt)(d,(0,a.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"rust--web"},"Rust + Web"),(0,r.kt)("p",null,"\u76ee\u524dRust\u6709\u4e24\u79cd\u65b9\u5f0f\u8fd0\u7528\u5728\u6cdb\u524d\u7aef\u9886\u57df\uff0c\u5206\u522b\u662fWebAssembly\u548cNode-API"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"WebAssembly\uff0c\u53ef\u4ee5\u88ab\u4f7f\u7528\u5728Web\u7aef\u548cNode\u7aef\uff0c\u4f18\u70b9\u662f\u53ef\u4ee5\u517c\u5bb9\u4e0d\u540c\u7684\u5e73\u53f0\u3002"),(0,r.kt)("li",{parentName:"ul"},"Node-API\uff0c\u53ea\u53ef\u4ee5\u88ab\u4f7f\u7528\u5728Node\u7aef\uff0c\u4f18\u70b9\u662f\u6027\u80fd\u66f4\u5f3a\uff0c\u7f3a\u70b9\u662f\u9700\u8981\u4e3a\u6bcf\u4e00\u4e2a\u5e73\u53f0\u7f16\u8bd1\u4e00\u4efd",(0,r.kt)("inlineCode",{parentName:"li"},".node"),"\u4ea7\u7269\u3002")),(0,r.kt)("h2",{id:"webassembly"},"WebAssembly"),(0,r.kt)("p",null,"WebAssembly\u662f\u4e00\u95e8\u504f\u5411\u5e95\u5c42\u7684\u7c7b\u6c47\u7f16\u8bed\u8a00\uff0c\u4e0d\u4ec5\u80fd\u76f4\u63a5\u88ab\u6d4f\u89c8\u5668\u89e3\u91ca\u6267\u884c\uff0c\u8fd8\u80fd\u591f\u548cJavaScript\u4ee3\u7801\u8fdb\u884c\u76f8\u4e92\u8c03\u7528\uff0c\u5982\u4ecaWASM\u901a\u5e38\u4f1a\u4f5c\u4e3aC++\u3001Rust\u8fd9\u7c7b\u9ad8\u7ea7\u8bed\u8a00\u7684\u7f16\u8bd1\u4ea7\u7269\u6765\u6539\u8fdbWeb\u7aef\u7684\u90e8\u5206\u6027\u80fd\u74f6\u9888\u3002"),(0,r.kt)("h3",{id:"wasm-pack"},"wasm-pack"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"wasm-pack"),"\u662fRust\u5b98\u65b9\u63d0\u4f9b\u7684\u4e00\u7ad9\u5f0f\u6784\u5efa\u3001\u6d4b\u8bd5\u548c\u53d1\u5e03\u5de5\u5177\uff0c\u53ef\u4ee5\u7528\u6765\u5c06Rust\u7f16\u8bd1\u6210WASM\uff0c\u5728",(0,r.kt)("a",{parentName:"p",href:"https://rustwasm.github.io/wasm-pack/"},"\u5b98\u7f51"),"\u4e2d\u5373\u53ef\u8fdb\u884c\u5168\u5c40\u5b89\u88c5\u3002"),(0,r.kt)("p",null,"\u4e00\u822c\u6211\u4eec\u4f1a\u642d\u914d",(0,r.kt)("inlineCode",{parentName:"p"},"wasm-bindgen"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"js-sys"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"web-sys"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"wasm-bindgen-futures"),"\u6765\u4fc3\u8fdbWASM\u6a21\u5757\u548cJS\u6a21\u5757\u7684\u4ea4\u4e92\u6027\uff0c\u5b8c\u6574\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"Cargo.toml"),"\u914d\u7f6e\u4fe1\u606f\u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-toml",metastring:'title="Cargo.toml"',title:'"Cargo.toml"'},'[package]\nname = "hello_world"\nversion = "0.1.0"\n\n[lib]\ncrate-type = ["cdylib"]\n\n[dependencies]\nwasm-bindgen = "0.2.84"\njs-sys = "0.3.61"\nwasm-bindgen-futures = "0.4.34"\n\n[dependencies.web-sys]\nversion = "0.3.4"\nfeatures = [\n  \'Document\',\n  \'Element\',\n  \'HtmlElement\',\n  \'Node\',\n  \'Window\',\n]\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust",metastring:'title="lib.rs"',title:'"lib.rs"'},'use wasm_bindgen::prelude::*;\n\n#[wasm_bindgen]\nextern {\n    fn alert(s: &str);\n}\n\n#[wasm_bindgen]\npub fn greet() {\n    alert("Hello, learn-wasm!");\n}\n')),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u7528\u4e8e\u6784\u5efa\u5de5\u5177\u6253\u5305\uff0c\u5728Webpack\u4e2d\u501f\u52a9",(0,r.kt)("inlineCode",{parentName:"p"},"@wasm-tool/wasm-pack-plugin"),"\u63d2\u4ef6\u6765\u5b9e\u73b0\uff0c\u540c\u65f6\u9700\u8981\u5f00\u542f\u5b9e\u9a8c\u6807\u5fd7",(0,r.kt)("inlineCode",{parentName:"p"},"experiments.asyncWebAssembly")),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"wasm-pack build # \u7528\u4e8ewebpack\u6253\u5305\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u4e0d\u4f7f\u7528\u6784\u5efa\u5de5\u5177\uff0c\u76f4\u63a5Web\u52a0\u8f7d"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"wasm-pack build --target web # \u7528\u4e8e\u7f51\u9875\u76f4\u63a5\u52a0\u8f7d\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"\u7528\u4e8eNode\u73af\u5883"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"wasm-pack build --target node # \u7528\u4e8enode\u73af\u5883\n")))),(0,r.kt)("h3",{id:"wasm-bindgen"},"wasm-bindgen"),(0,r.kt)("p",null,"\u5728\u4e0a\u9762\u7684\u7b80\u5355\u4f8b\u5b50\u4e2d\u6211\u4eec\u901a\u8fc7\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"#[wasm_bindgen]"),"\u5b8f\u5b9e\u73b0\u4e86WASM\u548cJS\u6a21\u5757\u7684\u76f8\u4e92\u8c03\u7528\u80fd\u529b\uff0c\u901a\u8fc7\u624b\u52a8\u5b9a\u4e49\u5404\u79cd\u65b9\u6cd5\u7684\u58f0\u660e\uff0c\u6211\u4eec\u80fd\u591f\u5728Rust\u4ee3\u7801\u4e2d\u76f4\u63a5\u8c03\u7528\u50cf",(0,r.kt)("inlineCode",{parentName:"p"},"alert"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"console"),"\u8fd9\u6837\u7684\u5185\u7f6e\u5bf9\u8c61\u3002"),(0,r.kt)("h4",{id:"js-sys"},"js-sys"),(0,r.kt)("p",null,"\u8be5\u6a21\u5757\u63d0\u4f9b\u4e86JavaScript\u5185\u7f6e\u7684\u6807\u51c6\u5bf9\u8c61\u7684\u7ed1\u5b9a\uff0c\u8bf8\u5982",(0,r.kt)("inlineCode",{parentName:"p"},"Object"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"Function"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"Reflect"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"}," WebAssembly"),"\u7b49\u7b49\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust",metastring:'title="lib.rs"',title:'"lib.rs"'},"use js_sys::{Function, Object, Reflect, WebAssembly};\n")),(0,r.kt)("h4",{id:"web-sys"},"web-sys"),(0,r.kt)("p",null,"\u63d0\u4f9b\u4e86\u5404\u79cdWeb API\u7684\u7ed1\u5b9a\uff0c\u8bf8\u5982",(0,r.kt)("inlineCode",{parentName:"p"},"Window"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"Document"),"\u7b49\u7b49\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust",metastring:'title="lib.rs"',title:'"lib.rs"'},'use wasm_bindgen::prelude::*;\n\n// Called by our JS entry point to run the example\n#[wasm_bindgen(start)]\npub fn run() -> Result<(), JsValue> {\n    // Use `web_sys`\'s global `window` function to get a handle on the global\n    // window object.\n    let window = web_sys::window().expect("no global `window` exists");\n    let document = window.document().expect("should have a document on window");\n    let body = document.body().expect("document should have a body");\n\n    // Manufacture the element we\'re gonna append\n    let val = document.create_element("p")?;\n    val.set_text_content(Some("Hello from Rust!"));\n\n    body.append_child(&val)?;\n\n    Ok(())\n}\n')),(0,r.kt)("h2",{id:"node-api"},"Node-API"),(0,r.kt)("p",null,"\u5728Node\u73af\u5883\u4e2d\u9664\u4e86\u4f7f\u7528\u4e0a\u4e00\u8282\u4ecb\u7ecd\u7684WASM\uff0c\u6211\u4eec\u8fd8\u53ef\u4ee5\u4f7f\u7528Node-API\u3002\u4f17\u6240\u5468\u77e5\uff0cNode\u7684\u6e90\u7801\u662f\u7531C++\u7f16\u5199\u800c\u6210\u7684\uff0c\u5b83\u6240\u63d0\u4f9b\u7684\u8bf8\u591a\u5185\u7f6e\u6a21\u5757",(0,r.kt)("inlineCode",{parentName:"p"},"fs"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"path"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"http"),"\u7b49\u90fd\u662f\u7531C++\u5b9e\u73b0\u7684\uff0c\u9664\u6b64\u4e4b\u5916Node\u751a\u81f3\u5141\u8bb8\u7f16\u5199C++\u63d2\u4ef6addons\u3002\u6839\u636eNode\u7684\u5b98\u65b9\u6587\u6863\uff0c\u5b83\u63d0\u4f9b\u4e86\u51e0\u79cd\u65b9\u5f0f\u6765\u5b9e\u73b0C++ addons\uff0c\u4e00\u79cd\u4e3b\u6d41\u7684\u65b9\u5f0f\u662f\u4f7f\u7528Node\u5b98\u65b9\u63d0\u4f9b\u7684Node-API\u63a5\u53e3\u6765\u8fdb\u884c\u5b9e\u73b0\u3002\u800cRust\u793e\u533a\u4e2d\uff0c\u53c8\u6709\u4eba\u57fa\u4e8eNode-API\u5b9e\u73b0\u5728Node\u9879\u76ee\u4e2d\u7f16\u5199Rust\u4ee3\u7801\uff0c\u4e3b\u6d41\u7684\u5e93\u5305\u62ec",(0,r.kt)("inlineCode",{parentName:"p"},"neon"),"\u548c",(0,r.kt)("inlineCode",{parentName:"p"},"napi-rs"),"\u3002"),(0,r.kt)("h3",{id:"napi-rs"},"@napi-rs"))}m.isMDXComponent=!0}}]);