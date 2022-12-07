"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[7266],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),s=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),m=s(n),d=a,y=m["".concat(o,".").concat(d)]||m[d]||c[d]||i;return n?r.createElement(y,l(l({ref:t},u),{},{components:n})):r.createElement(y,l({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=m;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:a,l[1]=p;for(var s=2;s<i;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6213:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return o},default:function(){return d},frontMatter:function(){return p},metadata:function(){return s},toc:function(){return c}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),l=["components"],p={},o="\u7248\u672c\u66f4\u65b0\u65e5\u5fd7",s={unversionedId:"typescript/\u7248\u672c\u66f4\u65b0\u65e5\u5fd7.mdx",id:"typescript/\u7248\u672c\u66f4\u65b0\u65e5\u5fd7.mdx",title:"\u7248\u672c\u66f4\u65b0\u65e5\u5fd7",description:"\u4eceTypeScript\u5b98\u65b9\u7248\u672c\u65e5\u5fd7\u4e2d\u5217\u4e3e\u4e00\u4e9b\u65e5\u5e38\u5de5\u4f5c\u4e2d\u53ef\u80fd\u4f1a\u9ad8\u9891\u4f7f\u7528\u7684\u529f\u80fd\u3002",source:"@site/docs/typescript/\u7248\u672c\u66f4\u65b0\u65e5\u5fd7.mdx.md",sourceDirName:"typescript",slug:"/typescript/\u7248\u672c\u66f4\u65b0\u65e5\u5fd7.mdx",permalink:"/blog/docs/typescript/\u7248\u672c\u66f4\u65b0\u65e5\u5fd7.mdx",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/typescript/\u7248\u672c\u66f4\u65b0\u65e5\u5fd7.mdx.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5de5\u5177\u7c7b\u578b\u5b9e\u73b0",permalink:"/blog/docs/typescript/\u5de5\u5177\u7c7b\u578b"},next:{title:"\u6a21\u5757\u5316",permalink:"/blog/docs/node/module"}},u={},c=[{value:"4.5",id:"45",level:2},{value:"Awaited",id:"awaited",level:3},{value:"top-level await",id:"top-level-await",level:3},{value:"type modifier",id:"type-modifier",level:3},{value:"4.4",id:"44",level:2},{value:"\u589e\u5f3a\u63a7\u5236\u6d41\u5206\u6790",id:"\u589e\u5f3a\u63a7\u5236\u6d41\u5206\u6790",level:3},{value:"\u7d22\u5f15\u7c7b\u578b\u652f\u6301Symbol\u3001\u6a21\u677f\u5b57\u7b26\u4e32",id:"\u7d22\u5f15\u7c7b\u578b\u652f\u6301symbol\u6a21\u677f\u5b57\u7b26\u4e32",level:3},{value:"4.3",id:"43",level:2},{value:"Contextual Narrowing for Generics",id:"contextual-narrowing-for-generics",level:3},{value:"4.2",id:"42",level:2},{value:"\u5143\u7956\u652f\u6301\u524d\u7f6e\u3001\u4e2d\u7f6e rest \u5143\u7d20",id:"\u5143\u7956\u652f\u6301\u524d\u7f6e\u4e2d\u7f6e-rest-\u5143\u7d20",level:3},{value:"4.1",id:"41",level:2},{value:"\u65b0\u589e\u6a21\u677f\u5b57\u9762\u91cf\u7c7b\u578b",id:"\u65b0\u589e\u6a21\u677f\u5b57\u9762\u91cf\u7c7b\u578b",level:3},{value:"\u6620\u5c04\u7c7b\u578b\uff08Mapped types\uff09\u652f\u6301 as \u5b50\u53e5",id:"\u6620\u5c04\u7c7b\u578bmapped-types\u652f\u6301-as-\u5b50\u53e5",level:3},{value:"\u4f8b\u5b50\u4e00\uff1a\ud83c\udf30",id:"\u4f8b\u5b50\u4e00",level:4},{value:"\u4f8b\u5b50\u4e8c\uff1a\ud83c\udf30",id:"\u4f8b\u5b50\u4e8c",level:4},{value:"\u4f8b\u5b50\u4e09\uff1a\ud83c\udf30",id:"\u4f8b\u5b50\u4e09",level:4},{value:"4.0",id:"40",level:2},{value:"Variadic Tuple Types",id:"variadic-tuple-types",level:3},{value:"labeld tuple",id:"labeld-tuple",level:3},{value:"3.8",id:"38",level:2},{value:"Type-Only Imports and Export",id:"type-only-imports-and-export",level:3},{value:"\u79c1\u6709\u5b57\u6bb5",id:"\u79c1\u6709\u5b57\u6bb5",level:3},{value:"<code>export * as xxx from &#39;&#39;</code>",id:"export--as-xxx-from-",level:3},{value:"3.7",id:"37",level:2},{value:"\u53ef\u9009\u94fe\uff08Optional Chaining\uff09",id:"\u53ef\u9009\u94feoptional-chaining",level:3},{value:"??\uff08Nullish Coalescing\uff09",id:"nullish-coalescing",level:3},{value:"\u65ad\u8a00\u51fd\u6570\uff08Assertion Function\uff09",id:"\u65ad\u8a00\u51fd\u6570assertion-function",level:3}],m={toc:c};function d(e){var t=e.components,n=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"\u7248\u672c\u66f4\u65b0\u65e5\u5fd7"},"\u7248\u672c\u66f4\u65b0\u65e5\u5fd7"),(0,i.kt)("p",null,"\u4ece",(0,i.kt)("inlineCode",{parentName:"p"},"TypeScript"),"\u5b98\u65b9\u7248\u672c\u65e5\u5fd7\u4e2d\u5217\u4e3e\u4e00\u4e9b\u65e5\u5e38\u5de5\u4f5c\u4e2d\u53ef\u80fd\u4f1a\u9ad8\u9891\u4f7f\u7528\u7684\u529f\u80fd\u3002"),(0,i.kt)("h2",{id:"45"},"4.5"),(0,i.kt)("h3",{id:"awaited"},"Awaited"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"type p1 = Promise<number>\ntype A1 = Awaited<p1> // number;\ntype A2 = Awaited<string | Promise<number>> // string | number\n")),(0,i.kt)("h3",{id:"top-level-await"},"top-level await"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"module: es2022"),"\u652f\u6301",(0,i.kt)("inlineCode",{parentName:"p"},"top-level await"),"\uff08\u6b64\u65f6",(0,i.kt)("inlineCode",{parentName:"p"},"target"),"\u9700\u8981\u5927\u4e8e\u7b49\u4e8e",(0,i.kt)("inlineCode",{parentName:"p"},"es2017"),"\uff09"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"const value = await Promise.resolve(233)\n\nexport {}\n")),(0,i.kt)("h3",{id:"type-modifier"},"type modifier"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"import { age } from './test'\nimport type { People } from './test' // \u8001\u5199\u6cd5\n\nlet p: People;\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"import { age, type People } from './test' // \u65b0\u5199\u6cd5\n")),(0,i.kt)("h2",{id:"44"},"4.4"),(0,i.kt)("h3",{id:"\u589e\u5f3a\u63a7\u5236\u6d41\u5206\u6790"},"\u589e\u5f3a\u63a7\u5236\u6d41\u5206\u6790"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"function fn(value: unknown) {\n    const flag = typeof value === 'number';\n    if (flag) {\n        value.toFixed()\n    }\n}\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"function doSomeChecks(\n  inputA: string | undefined,\n  inputB: string | undefined,\n  shouldDoExtraWork: boolean\n) {\n  const mustDoWork = inputA && inputB && shouldDoExtraWork;\n  if (mustDoWork) {\n    // We can access 'string' properties on both 'inputA' and 'inputB'!\n    const upperA = inputA.toUpperCase();\n    const upperB = inputB.toUpperCase();\n    // ...\n  }\n}\n")),(0,i.kt)("h3",{id:"\u7d22\u5f15\u7c7b\u578b\u652f\u6301symbol\u6a21\u677f\u5b57\u7b26\u4e32"},"\u7d22\u5f15\u7c7b\u578b\u652f\u6301Symbol\u3001\u6a21\u677f\u5b57\u7b26\u4e32"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"interface T {\n    [name: symbol]: string;\n    [data: `data-${string}`]: string;\n}\n")),(0,i.kt)("h2",{id:"43"},"4.3"),(0,i.kt)("h3",{id:"contextual-narrowing-for-generics"},(0,i.kt)("a",{parentName:"h3",href:"https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#contextual-narrowing-for-generics"},"Contextual Narrowing for Generics")),(0,i.kt)("p",null,"\u6781\u5927\u6539\u5584\u4e86\u8303\u578b\u53c2\u6570\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"narrow"),"\uff0c\u8be6\u60c5\u89c1",(0,i.kt)("a",{parentName:"p",href:"https://github.com/microsoft/TypeScript/pull/43183"},"\u94fe\u63a5"),"\uff0c\u907f\u514d\u4e86\u5982\u4e0b\u8fd9\u79cd\u5e38\u89c1\u7684\u9519\u8bef\u63d0\u793a\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"declare function takeA(a: 'a'): void;\nfunction f2<T extends 'a' | 'b'>(x: T) {\n    if (x === 'a') {\n        // Argument of type 'T' is not assignable to parameter of type '\"a\"'.\n            // Type '\"a\" | \"b\"' is not assignable to type '\"a\"'.\n            // Type '\"b\"' is not assignable to type '\"a\"'.(2345)\n        takeA(x); // 4.2\u7248\u672c\u53ca\u4ee5\u524d\u90fd\u4f1a\u62a5\u9519\n    }\n}\n")),(0,i.kt)("h2",{id:"42"},"4.2"),(0,i.kt)("h3",{id:"\u5143\u7956\u652f\u6301\u524d\u7f6e\u4e2d\u7f6e-rest-\u5143\u7d20"},"\u5143\u7956\u652f\u6301\u524d\u7f6e\u3001\u4e2d\u7f6e rest \u5143\u7d20"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"type tuple = [number, ...string[], number];\nfunction fn(...args: [...string[], number]) {\n\n}\nfn('a', 'b', 'c', 3)\n")),(0,i.kt)("h2",{id:"41"},"4.1"),(0,i.kt)("h3",{id:"\u65b0\u589e\u6a21\u677f\u5b57\u9762\u91cf\u7c7b\u578b"},"\u65b0\u589e\u6a21\u677f\u5b57\u9762\u91cf\u7c7b\u578b"),(0,i.kt)("h3",{id:"\u6620\u5c04\u7c7b\u578bmapped-types\u652f\u6301-as-\u5b50\u53e5"},"\u6620\u5c04\u7c7b\u578b\uff08Mapped types\uff09\u652f\u6301 as \u5b50\u53e5"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/microsoft/TypeScript/pull/40336"},"\u53c2\u8003")),(0,i.kt)("p",null,"\u901a\u8fc7\u652f\u6301",(0,i.kt)("inlineCode",{parentName:"p"},"as"),"\u5b50\u53e5\u5b9e\u73b0\u952e\u503c\u7684\u91cd\u65b0\u6620\u5c04\uff0c\u8bed\u6cd5\u5982\u4e0b\uff0c\u80fd\u591f\u628a",(0,i.kt)("inlineCode",{parentName:"p"},"P"),"\u91cd\u65b0\u6620\u5c04\u4e3a",(0,i.kt)("inlineCode",{parentName:"p"},"N"),"\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"type A = { \n  [P in K as N]: X \n}\n")),(0,i.kt)("h4",{id:"\u4f8b\u5b50\u4e00"},"\u4f8b\u5b50\u4e00\uff1a\ud83c\udf30"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"type Getters<T> = {\n    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]\n};\n \ninterface Person {\n    name: string;\n    age: number;\n    location: string;\n}\n \ntype LazyPerson = Getters<Person>;\n")),(0,i.kt)("p",null,"\u9700\u8981\u6ce8\u610f\u7684\u662f\u5982\u540c\u6211\u4eec\u5728\u6620\u5c04\u7c7b\u578b\u4e00\u8282\u6240\u63d0\u5230\u7684\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"[K in T]"),"\u4e2d\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"T"),"\u9700\u8981\u6ee1\u8db3\u662f",(0,i.kt)("inlineCode",{parentName:"p"},"string | number | symbol"),"\u7684\u5b50\u7c7b\u578b\uff0c\u540c\u65f6\u6211\u4eec\u5728\u8fd9\u4e2a\u4f8b\u5b50\u4e2d\u5e76\u6ca1\u6709\u7ea6\u675f",(0,i.kt)("inlineCode",{parentName:"p"},"T"),"\u7684\u7c7b\u578b\uff0c\u6240\u4ee5\u5728\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"Captialize"),"\u7684\u65f6\u5019\u6211\u4eec\u9700\u8981\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"string & K"),"\u6765\u6392\u9664",(0,i.kt)("inlineCode",{parentName:"p"},"K"),"\u53ef\u80fd\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"number | symbol"),"\u7c7b\u578b\u3002"),(0,i.kt)("h4",{id:"\u4f8b\u5b50\u4e8c"},"\u4f8b\u5b50\u4e8c\uff1a\ud83c\udf30"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"When the type specified in an ",(0,i.kt)("inlineCode",{parentName:"p"},"as")," clause resolves to ",(0,i.kt)("inlineCode",{parentName:"p"},"never"),", no property is generated for that key\u3002")),(0,i.kt)("p",null,"\u5f53",(0,i.kt)("inlineCode",{parentName:"p"},"as"),"\u5b50\u53e5\u4e2d\u6307\u5b9a\u7684\u7c7b\u578b\u88ab\u89e3\u6790\u6210",(0,i.kt)("inlineCode",{parentName:"p"},"never"),"\uff0c\u90a3\u4e48\u5bf9\u4e8e\u8fd9\u4e2a\u952e\u6ca1\u6709\u5bf9\u5e94\u7684\u5c5e\u6027\u751f\u6210\uff0c\u6240\u4ee5",(0,i.kt)("inlineCode",{parentName:"p"},"as"),"\u5b50\u53e5\u53ef\u4ee5\u7528\u6765\u505a\u8fc7\u6ee4\u5668\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"type Methods<T> = { [P in keyof T as T[P] extends Function ? P : never]: T[P] };\ntype T60 = Methods<{ foo(): number, bar: boolean }>;  // { foo(): number }\n")),(0,i.kt)("h4",{id:"\u4f8b\u5b50\u4e09"},"\u4f8b\u5b50\u4e09\uff1a\ud83c\udf30"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"When the type specified in an ",(0,i.kt)("inlineCode",{parentName:"p"},"as")," clause resolves to a union of literal types, multiple properties with the same type are generated")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"type DoubleProp<T> = { [P in keyof T & string as `${P}1` | `${P}2`]: T[P] }\ntype T70 = DoubleProp<{ a: string, b: number }>;  // { a1: string, a2: string, b1: number, b2: number }\n")),(0,i.kt)("h2",{id:"40"},"4.0"),(0,i.kt)("h3",{id:"variadic-tuple-types"},"Variadic Tuple Types"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"function tail<T extends any[]>(arr: readonly [any, ...T]) {\n  const [_ignored, ...rest] = arr;\n  return rest;\n}\n\ntype Arr = readonly any[];\nfunction concat<T extends Arr, U extends Arr>(arr1: T, arr2: U): [...T, ...U] {\n  return [...arr1, ...arr2];\n}\n\n\n// spreads\ntype Strings = [string, string];\ntype Numbers = [number, number];\n\ntype StrStrNumNumBool = [...Strings, ...Numbers, boolean];\n")),(0,i.kt)("h3",{id:"labeld-tuple"},"labeld tuple"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"type Range = [start: number, end: number];\n")),(0,i.kt)("h2",{id:"38"},"3.8"),(0,i.kt)("h3",{id:"type-only-imports-and-export"},"Type-Only Imports and Export"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="a.ts"',title:'"a.ts"'},"export interface People {\n    name: string;\n}\n\nexport const value = 100;\nexport class Animal {\n    age = 20;\n}\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="b.ts"',title:'"b.ts"'},"import type { People, value, Animal } from './a.ts'\n\ntype p = People;\ntype a = Animal;\ntype v = typeof value;\n\nlet value2 = value // error\n")),(0,i.kt)("h3",{id:"\u79c1\u6709\u5b57\u6bb5"},"\u79c1\u6709\u5b57\u6bb5"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'class Person {\n  #name: string;\n  constructor(name: string) {\n    this.#name = name;\n  }\n  greet() {\n    console.log(`Hello, my name is ${this.#name}!`);\n  }\n}\nlet jeremy = new Person("Jeremy Bearimy");\njeremy.#name; // error\n')),(0,i.kt)("h3",{id:"export--as-xxx-from-"},(0,i.kt)("inlineCode",{parentName:"h3"},"export * as xxx from ''")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="\u8001\u5199\u6cd5"',title:'"\u8001\u5199\u6cd5"'},'import * as utilities from "./utilities.js";\nexport { utilities };\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="\u65b0\u5199\u6cd5"',title:'"\u65b0\u5199\u6cd5"'},'export * as utilities from "./utilities.js";\n')),(0,i.kt)("h2",{id:"37"},"3.7"),(0,i.kt)("h3",{id:"\u53ef\u9009\u94feoptional-chaining"},"\u53ef\u9009\u94fe\uff08Optional Chaining\uff09"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"A?.B?.[0]?.C?.()\n")),(0,i.kt)("h3",{id:"nullish-coalescing"},"??\uff08Nullish Coalescing\uff09"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"let result = 0 ?? 'test' // 0\nlet result2 = 0 || 'test' // 'test'\n")),(0,i.kt)("h3",{id:"\u65ad\u8a00\u51fd\u6570assertion-function"},"\u65ad\u8a00\u51fd\u6570\uff08Assertion Function\uff09"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="\u7528\u6cd5\u4e00"',title:'"\u7528\u6cd5\u4e00"'},'function fn(value: unknown) {\n  assert(typeof value === "number");\n  return value.toFixed() // number\n}\nfunction assert(condition: any, msg?: string): asserts condition {\n  if (!condition) {\n    throw new Error(msg);\n  }\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="\u7528\u6cd5\u4e8c"',title:'"\u7528\u6cd5\u4e8c"'},'function fn(value: unknown) {\n  isNumber(value);\n  return value.toFixed() // number\n}\n\nfunction isNumber(val: unknown): asserts val is number {\n  if (typeof val !== "number") {\n    throw new Error("Not a number!");\n  }\n}\n')))}d.isMDXComponent=!0}}]);