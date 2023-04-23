"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[2266],{3905:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>y});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},p=Object.keys(e);for(a=0;a<p.length;a++)t=p[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(a=0;a<p.length;a++)t=p[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var o=a.createContext({}),s=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},m=function(e){var n=s(e.components);return a.createElement(o.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,p=e.originalType,o=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),u=s(t),c=r,y=u["".concat(o,".").concat(c)]||u[c]||d[c]||p;return t?a.createElement(y,i(i({ref:n},m),{},{components:t})):a.createElement(y,i({ref:n},m))}));function y(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var p=t.length,i=new Array(p);i[0]=c;var l={};for(var o in n)hasOwnProperty.call(n,o)&&(l[o]=n[o]);l.originalType=e,l[u]="string"==typeof e?e:r,i[1]=l;for(var s=2;s<p;s++)i[s]=t[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},9245:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>d,frontMatter:()=>p,metadata:()=>l,toc:()=>s});var a=t(7462),r=(t(7294),t(3905));const p={},i="\u7c7b\u578b\u64cd\u4f5c",l={unversionedId:"typescript/\u7c7b\u578b\u64cd\u4f5c.mdx",id:"typescript/\u7c7b\u578b\u64cd\u4f5c.mdx",title:"\u7c7b\u578b\u64cd\u4f5c",description:"typeof",source:"@site/docs/typescript/\u7c7b\u578b\u64cd\u4f5c.mdx.md",sourceDirName:"typescript",slug:"/typescript/\u7c7b\u578b\u64cd\u4f5c.mdx",permalink:"/blog/docs/typescript/\u7c7b\u578b\u64cd\u4f5c.mdx",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/typescript/\u7c7b\u578b\u64cd\u4f5c.mdx.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u57fa\u7840",permalink:"/blog/docs/typescript/basic"},next:{title:"\u7c7b\u578b\u5b88\u536b",permalink:"/blog/docs/typescript/\u7c7b\u578b\u5b88\u536b"}},o={},s=[{value:"<code>typeof</code>",id:"typeof",level:2},{value:"<code>keyof</code>",id:"keyof",level:2},{value:"Union Type",id:"union-type",level:2},{value:"Intersection Type",id:"intersection-type",level:2},{value:"Indexed Access Types",id:"indexed-access-types",level:2},{value:"Conditional Types",id:"conditional-types",level:2},{value:"<code>infer</code>",id:"infer",level:3},{value:"Distributive Conditional Types",id:"distributive-conditional-types",level:3},{value:"\u6620\u5c04\u7c7b\u578b\uff08Mapped Types\uff09",id:"\u6620\u5c04\u7c7b\u578bmapped-types",level:2},{value:"\u4fee\u9970\u7b26",id:"\u4fee\u9970\u7b26",level:2}],m={toc:s},u="wrapper";function d(e){let{components:n,...t}=e;return(0,r.kt)(u,(0,a.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\u7c7b\u578b\u64cd\u4f5c"},"\u7c7b\u578b\u64cd\u4f5c"),(0,r.kt)("h2",{id:"typeof"},(0,r.kt)("inlineCode",{parentName:"h2"},"typeof")),(0,r.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u5728\u7c7b\u578b\u4e0a\u4e0b\u6587\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"typeof"),"\u83b7\u53d6\u503c\u6240\u5bf9\u5e94\u7684\u7c7b\u578b"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"let source = {\n    name: 'aka',\n}\n\nlet target: typeof source = {\n    name: 'bkb',\n}\n")),(0,r.kt)("h2",{id:"keyof"},(0,r.kt)("inlineCode",{parentName:"h2"},"keyof")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"let source = {\n    name: 'aka',\n    age: 20\n}\nlet target: keyof typeof source // 'name' | 'age' \n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"interface test {\n    [n: number]: number; // \u6570\u5b57\u7d22\u5f15\u7c7b\u578b\n}\n\ntype o = keyof test // number\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"interface test {\n    [s: string]: string; // \u5b57\u7b26\u4e32\u7d22\u5f15\u7c7b\u578b\n}\n\ntype o = keyof test // string | number\n")),(0,r.kt)("h2",{id:"union-type"},"Union Type"),(0,r.kt)("p",null,"\u8054\u5408\u7c7b\u578b\uff08Union Types\uff09\u8868\u793a\u53d6\u503c\u53ef\u4ee5\u4e3a\u591a\u79cd\u7c7b\u578b\u4e2d\u7684\u4e00\u79cd\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"let value : string | number\nvalue = 'akara'\nvalue = 12345\n")),(0,r.kt)("p",null,"\u5f53 TypeScript \u4e0d\u786e\u5b9a\u4e00\u4e2a\u8054\u5408\u7c7b\u578b\u7684\u53d8\u91cf\u5230\u5e95\u662f\u54ea\u4e2a\u7c7b\u578b\u7684\u65f6\u5019\uff0c\u6211\u4eec",(0,r.kt)("strong",{parentName:"p"},"\u53ea\u80fd\u8bbf\u95ee\u6b64\u8054\u5408\u7c7b\u578b\u7684\u6240\u6709\u7c7b\u578b\u91cc\u5171\u6709\u7684\u5c5e\u6027\u6216\u65b9\u6cd5"),"\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"// \u62a5\u9519\uff01\uff01\uff01\nfunction getLength(something: string | number): number {\n    return something.length;\n}\n")),(0,r.kt)("p",null,"\u4e0a\u4f8b\u4e2d\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"length")," \u4e0d\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"string")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"number")," \u7684\u5171\u6709\u5c5e\u6027\uff0c\u6240\u4ee5\u4f1a\u62a5\u9519\u3002"),(0,r.kt)("p",null,"\u8bbf\u95ee ",(0,r.kt)("inlineCode",{parentName:"p"},"string")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"number")," \u7684\u5171\u6709\u5c5e\u6027\u662f\u6ca1\u95ee\u9898\u7684"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"function getString(something: string | number): string {\n    return something.toString();\n}\n")),(0,r.kt)("h2",{id:"intersection-type"},"Intersection Type"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"type a = {\n    name: string;\n}\ntype b = {\n    age: number;\n}\nlet o: a & b = {\n    name: 'aka',\n    age: 20,\n}\n")),(0,r.kt)("h2",{id:"indexed-access-types"},"Indexed Access Types"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"interface test {\n    0: number;\n    name: string;\n    [n: number]: number;  // \u6570\u5b57\u7d22\u5f15\u7c7b\u578b\n    [s: string]: string | number; // \u5b57\u7b26\u4e32\u7d22\u5f15\u7c7b\u578b\uff0c number | string > number\n};\n\ntype a = test[0] // number\ntype b = test['name'] // string\ntype c = test[number] // number\ntype d = test[string] // string | number\n\ntype e = test[0 | 'name'] // string | number\n")),(0,r.kt)("p",null,"\u7d22\u5f15\u7c7b\u578b\u5206\u4e3a\u5b57\u7b26\u4e32\u7d22\u5f15\u7c7b\u578b\u548c\u6570\u5b57\u7d22\u5f15\u7c7b\u578b\u3002\u4ee5\u4e0a\u4ee3\u7801\u4e2d\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"0"),"\u662f\u6570\u5b57\u7d22\u5f15\u7c7b\u578b\u7684\u5b50\u96c6\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"name"),"\u662f\u5b57\u7b26\u4e32\u7d22\u5f15\u7c7b\u578b\u7684\u5b50\u96c6\u3001",(0,r.kt)("strong",{parentName:"p"},"\u6570\u5b57\u7d22\u5f15\u7c7b\u578b\u662f\u5b57\u7b26\u4e32\u7d22\u5f15\u7c7b\u578b\u7684\u5b50\u96c6")),(0,r.kt)("h2",{id:"conditional-types"},"Conditional Types"),(0,r.kt)("p",null,"\u5f62\u5f0f\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},"A extends B ? a : b")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},'interface IdLabel {\n    id: number /* some fields */;\n}\ninterface NameLabel {\n    name: string /* other fields */;\n}\n\ntype NameOrId<T extends number | string> = T extends number\n  ? IdLabel\n  : NameLabel;\n\nfunction createLabel<T extends number | string>(idOrName: T): NameOrId<T> {\n    throw "unimplemented";\n}\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},'type MessageOf<T extends { message: unknown }> = T["message"];\ntype MessageOf<T> = T extends { message: unknown } ? T["message"] : never;\n')),(0,r.kt)("p",null,"\u6211\u4eec\u901a\u5e38\u4f1a\u4f7f\u7528\u6cdb\u578b\u5bf9\u7c7b\u578b\u8fdb\u884c\u7ea6\u675f\uff0c\u4e0d\u8fc7\u6709\u7684\u65f6\u5019\u6211\u4eec\u4e5f\u5e0c\u671b\u5f53\u53c2\u6570\u662f\u7ea6\u675f\u5916\u7684\u7c7b\u578b\u65f6\uff0c\u6709\u4e00\u4e2a\u56fa\u5b9a\u7684\u8fd4\u56de\u503c\u3002\u6b64\u65f6\u53ef\u4ee5\u4f7f\u7528\u7b2c\u4e8c\u884c\u7684\u5199\u6cd5\u3002"),(0,r.kt)("h3",{id:"infer"},(0,r.kt)("inlineCode",{parentName:"h3"},"infer")),(0,r.kt)("p",null,"\u4f7f\u7528\u6761\u4ef6\u7c7b\u578b\u65f6\uff0c\u6211\u4eec\u8fd8\u53ef\u4ee5\u5728\u5185\u90e8\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"infer"),"\u5173\u952e\u5b57"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"type A<T> = T extends Array<infer U> ? U : T \n                            \ntype GetReturnType<Type> = Type extends (...args: never[]) => infer Return\n  ? Return\n  : never;\n")),(0,r.kt)("h3",{id:"distributive-conditional-types"},(0,r.kt)("a",{parentName:"h3",href:"https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types"},"Distributive Conditional Types")),(0,r.kt)("p",null,"\u5f53",(0,r.kt)("inlineCode",{parentName:"p"},"Conditional Types"),"\u4e2d\u88ab\u68c0\u67e5\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"type parameter"),"\u662f",(0,r.kt)("a",{parentName:"p",href:"https://stackoverflow.com/questions/51651499/typescript-what-is-a-naked-type-parameter"},"naked type parameter"),"\u65f6\uff0c\u6211\u4eec\u79f0\u4e4b\u4e3aDistributive Conditional Types\uff08\u5206\u5e03\u5f0f\u6761\u4ef6\u7c7b\u578b\uff09\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"naked type paramter"),"\u6307\u7684\u662f\u7c7b\u578b\u53c2\u6570\u5e76\u6ca1\u6709\u88ab\u5176\u4ed6\u7c7b\u578b\u5305\u88f9\uff08\u5305\u62ec",(0,r.kt)("inlineCode",{parentName:"p"},"Array"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"tuple"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"function"),"\u6216\u8005\u5176\u4ed6\u8303\u578b\uff09\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'type NakedUsage<T> = T extends boolean ? "YES" : "NO"\ntype WrappedUsage<T> = [T] extends [boolean] ? "YES" : "NO"; // wrapped in a tuple\n')),(0,r.kt)("p",null,"\u6bd4\u5982\u8fd9\u91cc\u7b2c\u4e00\u884c\u5c31\u662f\u5206\u5e03\u5f0f\u6761\u4ef6\u7c7b\u578b\uff0c\u6b64\u65f6\u5f53\u7c7b\u578b\u53c2\u6570",(0,r.kt)("inlineCode",{parentName:"p"},"T"),"\u88ab\u5b9e\u4f8b\u5316\u4e3a\u8054\u5408\u7c7b\u578b\u65f6\uff0c\u90a3\u4e48\u6761\u4ef6\u7c7b\u578b\u5c06\u4f1a\u5206\u53d1\u7ed9\u8054\u5408\u7c7b\u578b\u7684\u6bcf\u4e00\u4e2a\u6210\u5458\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'type Distributed = NakedUsage<number | boolean > // = NakedUsage<number> | NakedUsage<boolean> =  "NO" | "YES" \ntype NotDistributed = WrappedUsage<number | boolean > // "NO"   \n')),(0,r.kt)("p",null,"\u5229\u7528\u8fd9\u4e2a\u7279\u6027\uff0c\u6211\u4eec\u8fd8\u53ef\u4ee5\u5b9e\u73b0\u4ee5\u4e0b\u529f\u80fd"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"type Test<T> = T extends any ? T[] : any;\ntype Test2<T> = T[]\n\ntype A = Test<number | string> // number[] | string[]\ntype B = Test2<number | string> // (number | string)[]\n")),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0c\u5bf9\u4e8e\u4ee5\u4e0b\u4ee3\u7801\u7684\u7ed3\u679c\u662f",(0,r.kt)("inlineCode",{parentName:"p"},"boolean"),"\uff0c\u731c\u6d4b\u5185\u90e8\u5b9e\u73b0\u4e2d",(0,r.kt)("inlineCode",{parentName:"p"},"boolean"),"\u53ea\u662f",(0,r.kt)("inlineCode",{parentName:"p"},"true"),"\u548c",(0,r.kt)("inlineCode",{parentName:"p"},"false"),"\u7684\u8054\u5408\u7c7b\u578b\uff0c\u6240\u4ee5\u8fd9\u91cc\u4e5f\u89e6\u53d1\u4e86\u7c7b\u578b\u5206\u53d1\u3002"),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"type Test<U> = U extends true ? true : false;\ntype Result = Test<boolean> // boolean\n")),(0,r.kt)("p",{parentName:"admonition"},"\u4e8b\u5b9e\u4e0a\u6211\u4eec\u624b\u52a8\u58f0\u660e",(0,r.kt)("inlineCode",{parentName:"p"},"true | false"),"\uff0c\u7f16\u8bd1\u5668\u4e0a\u770b\u5230\u7684\u5c31\u662f\u5355\u7eaf\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"boolean"),"\uff0c\u8fd9\u4e5f\u5370\u8bc1\u4e86\u6211\u4eec\u7684\u89c2\u70b9")),(0,r.kt)("h2",{id:"\u6620\u5c04\u7c7b\u578bmapped-types"},"\u6620\u5c04\u7c7b\u578b\uff08Mapped Types\uff09"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"type A = {\n    name: string;\n    age: number\n}\n\ntype B = {\n    [p in keyof A]+?: string\n}\n\ntype C = {\n    [p in keyof A]+?: A[p]\n} & {\n  id: number\n}\n")),(0,r.kt)("p",null,"\u9700\u8981\u6ce8\u610f\u7684\u662f",(0,r.kt)("inlineCode",{parentName:"p"},"[K in P]"),"\u4e2d\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"P"),"\u53ea\u80fd\u662f",(0,r.kt)("inlineCode",{parentName:"p"},"string | number | symbol"),"\u7684\u5b50\u7c7b\u578b\uff0c\u5982\u4ee5\u4e0b\u4ee3\u7801\u5c31\u4f1a\u62a5\u9519"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"type P = 'age' | boolean;\ntype A = {\n  [K in P]: K\n}\n// Type 'string | boolean' is not assignable to type 'string | number | symbol'.\n// Type 'boolean' is not assignable to type 'string | number | symbol'.\n")),(0,r.kt)("h2",{id:"\u4fee\u9970\u7b26"},"\u4fee\u9970\u7b26"),(0,r.kt)("p",null,"\u53ef\u4ee5\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"-readonly"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"-?"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"+readonly"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"+?"),"\u7b49\u64cd\u4f5c\u7b26\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"type B = {\n    [p in keyof A]-?: A[p]\n}\n\ntype B = {\n    -readonly[p in keyof A]: A[p]\n}\n\ntype B = {\n    [p in keyof A]?: A[p] // \u7b49\u4e8e +?\n}\n")))}d.isMDXComponent=!0}}]);