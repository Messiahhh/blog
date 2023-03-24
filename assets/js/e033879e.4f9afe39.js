"use strict";(self.webpackChunkakara=self.webpackChunkakara||[]).push([[7042],{3905:(e,t,n)=>{n.d(t,{Zo:()=>g,kt:()=>d});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var o=a.createContext({}),m=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},g=function(e){var t=m(e.components);return a.createElement(o.Provider,{value:t},e.children)},c="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,o=e.parentName,g=p(e,["components","mdxType","originalType","parentName"]),c=m(n),k=i,d=c["".concat(o,".").concat(k)]||c[k]||s[k]||r;return n?a.createElement(d,l(l({ref:t},g),{},{components:n})):a.createElement(d,l({ref:t},g))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=k;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p[c]="string"==typeof e?e:i,l[1]=p;for(var m=2;m<r;m++)l[m]=n[m];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},2278:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>s,frontMatter:()=>r,metadata:()=>p,toc:()=>m});var a=n(7462),i=(n(7294),n(3905));const r={sidebarDepth:4},l="Git",p={unversionedId:"git",id:"git",title:"Git",description:"\u57fa\u7840\u547d\u4ee4",source:"@site/docs/git.md",sourceDirName:".",slug:"/git",permalink:"/blog/docs/git",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/git.md",tags:[],version:"current",frontMatter:{sidebarDepth:4},sidebar:"tutorialSidebar",previous:{title:"\u6d4f\u89c8\u5668\u76f8\u5173",permalink:"/blog/docs/browser"},next:{title:"\u8ba1\u7b97\u673a\u7f51\u7edc",permalink:"/blog/docs/\u8ba1\u7b97\u673a\u7f51\u7edc"}},o={},m=[{value:"\u57fa\u7840\u547d\u4ee4",id:"\u57fa\u7840\u547d\u4ee4",level:2},{value:"git restore",id:"git-restore",level:3},{value:"git commit",id:"git-commit",level:3},{value:"git branch",id:"git-branch",level:3},{value:"git tag",id:"git-tag",level:3},{value:"git stash",id:"git-stash",level:3},{value:"\u5206\u652f\u5408\u5e76",id:"\u5206\u652f\u5408\u5e76",level:2},{value:"git merge",id:"git-merge",level:3},{value:"fast-forward",id:"fast-forward",level:4},{value:"non-fast-forward",id:"non-fast-forward",level:4},{value:"git rebase",id:"git-rebase",level:3},{value:"\u51b2\u7a81",id:"\u51b2\u7a81",level:4},{value:"\u8fdc\u7a0b\u64cd\u4f5c",id:"\u8fdc\u7a0b\u64cd\u4f5c",level:2},{value:"Remote-Tracking Branch",id:"remote-tracking-branch",level:3},{value:"git branch -vv",id:"git-branch--vv",level:4},{value:"\u8bbe\u7f6e\u4e0a\u6e38\u5206\u652f",id:"\u8bbe\u7f6e\u4e0a\u6e38\u5206\u652f",level:4},{value:"git fetch",id:"git-fetch",level:3},{value:"git pull",id:"git-pull",level:3},{value:"git push",id:"git-push",level:3},{value:"\u7248\u672c\u56de\u9000",id:"\u7248\u672c\u56de\u9000",level:2},{value:"git rebase -i",id:"git-rebase--i",level:2},{value:"git cherry-pick",id:"git-cherry-pick",level:2},{value:"\u5e95\u5c42\u539f\u7406",id:"\u5e95\u5c42\u539f\u7406",level:2},{value:"git object",id:"git-object",level:3},{value:"\u5176\u4ed6",id:"\u5176\u4ed6",level:2},{value:".gitkeep",id:"gitkeep",level:3}],g={toc:m},c="wrapper";function s(e){let{components:t,...n}=e;return(0,i.kt)(c,(0,a.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"git"},"Git"),(0,i.kt)("h2",{id:"\u57fa\u7840\u547d\u4ee4"},"\u57fa\u7840\u547d\u4ee4"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u521d\u59cb\u5316git\u4ed3\u5e93\ngit init \n\n# \u67e5\u770b\u63d0\u4ea4\u8bb0\u5f55\ngit log \n\n# \u67e5\u770b\u5386\u53f2\u547d\u4ee4\ngit reflog \n\n# \u67e5\u770b\u5f53\u524d\u72b6\u6001\ngit status \n")),(0,i.kt)("h3",{id:"git-restore"},"git restore"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u5de5\u4f5c\u76ee\u5f55\u5185\u5bb9\u6dfb\u52a0\u8fdb\u7d22\u5f15\u533a\u57df\ngit add <name>\ngit add .\n\n# \u5f53\u4fee\u6539\u4e86\u5de5\u4f5c\u533a\u7684\u6587\u4ef6\u4f46\u8fd8\u672a\u6682\u5b58\u66f4\u6539\uff08git add\uff09\u65f6\uff0c\u53ef\u4ee5\u901a\u8fc7\u8be5\u547d\u4ee4\u653e\u5f03\u66f4\u6539\ngit restore <name> \ngit restore .\n\n# \u5f53\u4fee\u6539\u4e86\u5de5\u4f5c\u533a\u7684\u6587\u4ef6\u5e76\u4e14\u6682\u5b58\u66f4\u6539\u65f6\uff0c\u53ef\u4ee5\u901a\u8fc7\u8be5\u547d\u4ee4\u653e\u5f03\u6682\u5b58\u66f4\u6539\uff0c\u53d8\u6210\u5c1a\u672agit add\u7684\u72b6\u6001\ngit restore --staged <name>\ngit restore --staged .\n")),(0,i.kt)("h3",{id:"git-commit"},"git commit"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u6839\u636e\u6682\u5b58\u533a\u7684\u5185\u5bb9\u751f\u6210\u65b0\u7684commit\ngit commit\ngit commit -m 'feat: moyu' \n\n# \u53ef\u4ee5\u7528\u6765\u91cd\u5199\u5f53\u524d\u7684commit\u5185\u5bb9\u548c\u6d88\u606f\uff0c\u53ef\u4ee5\u7528\u6765\u4fdd\u8bc1\u63d0\u4ea4\u8bb0\u5f55\u7684\u7b80\u6d01\ngit commit --amend \ngit commit --amend --reset-author \n")),(0,i.kt)("h3",{id:"git-branch"},"git branch"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u663e\u793a\u6240\u6709\u5206\u652f\ngit branch \n\n# \u663e\u793a\u6240\u6709\u8fdc\u7a0b\u5206\u652f\ngit branch -r\n\n# \u521b\u5efa\u5206\u652f\ngit branch <name> \n\n# \u5220\u9664\u672c\u5730\u5206\u652f\ngit branch -D <name> \n\n# \u4fee\u6539\u5206\u652f\u540d\ngit branch -m <nameA> <nameB> \n\n# \u5207\u6362\u5206\u652f\ngit checkout <name> \n\n# \u5207\u6362\u5230\u4e0a\u4e00\u4e2a\u5206\u652f\ngit checkout - \n\n# \u521b\u5efa\u5206\u652f\u5e76\u5207\u6362\u8fc7\u53bb\ngit checkout -b <name> \n\n\n# \u67e5\u770b\u5206\u652f\u7684track\u4fe1\u606f\ngit branch -vv\n\n# \u8bbe\u7f6e\u5f53\u524d\u5206\u652f\u7684\u4e0a\u6e38\u5206\u652f\uff0c\u7b49\u4ef7\u4e8e--set-upstream\ngit branch -u origin/feature\n")),(0,i.kt)("h3",{id:"git-tag"},"git tag"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u67e5\u770b\u6240\u6709tag\ngit tag \n\n# \u7ed9\u5f53\u524dcommit\u6253tag\ngit tag v1.0.1 \n\n# \u7ed9\u67d0\u4e2acommit\u6253tag\ngit tag v1.0.1 <commit> \n\n# \u5220\u9664tag\ngit tag --delete v1.0.1 \n")),(0,i.kt)("h3",{id:"git-stash"},"git stash"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u6682\u5b58\u5de5\u4f5c\u533a\u7684\u4fee\u6539\ngit stash \n\n# \u67e5\u770b\u5df2stash\u7684\u5185\u5bb9\ngit stash list \n\n# \u91ca\u653e\u6700\u65b0stash\u7684\u5185\u5bb9\u5230\u5de5\u4f5c\u533a\ngit stash pop 0 \n\n# \u6e05\u7a7a\u6682\u5b58\u533a\u7684\u5185\u5bb9\ngit stash clear\n")),(0,i.kt)("h2",{id:"\u5206\u652f\u5408\u5e76"},"\u5206\u652f\u5408\u5e76"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"git"),"\u5b58\u5728\u4e24\u79cd\u5206\u652f\u5408\u5e76\u7684\u7b56\u7565\uff0c\u5373",(0,i.kt)("inlineCode",{parentName:"p"},"git merge"),"\u548c",(0,i.kt)("inlineCode",{parentName:"p"},"git rebase"),"\u3002\u672c\u4eba\u5f3a\u70c8\u5efa\u8bae\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"git rebase"),"\u6765\u8fdb\u884c\u5206\u652f\u7ba1\u7406\uff0c\u9996\u5148\u8fd9\u79cd\u7b56\u7565\u5341\u5206\u7b80\u5355\uff0c\u800c\u4e14\u80fd\u4fdd\u8bc1\u63d0\u4ea4\u5386\u53f2\u975e\u5e38\u7b80\u6d01\u3002"),(0,i.kt)("h3",{id:"git-merge"},"git merge"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u5408\u5e76\u76ee\u6807\u5206\u652f\ngit merge <name> \n")),(0,i.kt)("p",null,"\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"git merge"),"\u65f6\uff0c\u6839\u636e\u5206\u652f\u60c5\u51b5\u7684\u4e0d\u540c\u4f1a\u5b58\u5728\u4e24\u79cd\u5408\u5e76\u60c5\u51b5\uff0c ",(0,i.kt)("inlineCode",{parentName:"p"},"fast-forward"),"\uff08\u5feb\u8fdb\uff09\u548c",(0,i.kt)("inlineCode",{parentName:"p"},"non-fast-forward"),"\u3002\u591a\u4eba\u534f\u4f5c\u7684\u65f6\u5019\u591a\u6570\u662f",(0,i.kt)("inlineCode",{parentName:"p"},"non-fast-forward"),"\u7684\u60c5\u51b5\uff0c\u6b64\u65f6\u5408\u5e76\u5206\u652f\u4f1a\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u63d0\u4ea4\u3002"),(0,i.kt)("h4",{id:"fast-forward"},"fast-forward"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_1.png",alt:"fast-forward"})),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_2.png",alt:"fast-forward\u5408\u5e76"})),(0,i.kt)("h4",{id:"non-fast-forward"},"non-fast-forward"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_3.png",alt:"\u5206\u652f\u5408\u5e76"})),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_4.png",alt:"\u5206\u652f\u5408\u5e76\u7ed3\u679c"})),(0,i.kt)("h3",{id:"git-rebase"},"git rebase"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u5408\u5e76\u76ee\u6807\u5206\u652f\ngit rebase <name> \n")),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_6.png",alt:"git-rebase"})),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://backlog.com/git-tutorial/cn/img/post/stepup/capture_stepup1_4_7.png",alt:"git-rebase\u7ed3\u679c"})),(0,i.kt)("h4",{id:"\u51b2\u7a81"},"\u51b2\u7a81"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"git rebase"),"\u65f6\u5982\u679c\u78b0\u5230\u4ee3\u7801\u51b2\u7a81\uff0c\u5728\u89e3\u51b3\u5b8c\u51b2\u7a81\u540e\u901a\u8fc7",(0,i.kt)("inlineCode",{parentName:"p"},"git add ."),"\u548c",(0,i.kt)("inlineCode",{parentName:"p"},"git rebase --continue"),"\u53ef\u8fdb\u5165\u4e0b\u4e00\u6b65\uff1b\u5982\u679c\u53c8\u4e0d\u60f3\u8981\u5408\u5e76\u4e86\uff0c\u4e5f\u53ef\u4ee5\u901a\u8fc7",(0,i.kt)("inlineCode",{parentName:"p"},"git rebase --abort"),"\u653e\u5f03\u5408\u5e76\u3002"),(0,i.kt)("h2",{id:"\u8fdc\u7a0b\u64cd\u4f5c"},"\u8fdc\u7a0b\u64cd\u4f5c"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"git remote # \u67e5\u770b\u8fdc\u7a0b\u4ed3\u5e93\u7684\u4fe1\u606f\ngit remote add origin <url> # \u6dfb\u52a0\u4ed3\u5e93\u5730\u5740\u6620\u5c04\ngit remote remove origin # \u5220\u9664\u5730\u5740\u6620\u5c04\n\ngit clone <url> # \u62c9\u53d6\u8fdc\u7a0b\u4ed3\u5e93\u5230\u672c\u5730\n")),(0,i.kt)("p",null,"\u5927\u591a\u6570\u60c5\u51b5\u4e0b\uff0c\u6211\u4eec\u7684\u672c\u5730\u4ed3\u5e93\u53ea\u9700\u8981\u548c\u4e00\u4e2a\u8fdc\u7a0b\u4ed3\u5e93\u8fdb\u884c\u5173\u8054\uff0c\u6b64\u65f6\u901a\u5e38\u4f1a\u4f7f\u7528\u7279\u6b8a\u7684\u6807\u8bc6",(0,i.kt)("inlineCode",{parentName:"p"},"origin"),"\u6765\u4ee3\u8868\u8fd9\u4e2a\u8fdc\u7a0b\u4ed3\u5e93\u3002"),(0,i.kt)("p",null,"\u5728\u5c11\u6570\u60c5\u51b5\u4e0b\u672c\u5730\u4ed3\u5e93\u9700\u8981\u548c\u591a\u4e2a\u8fdc\u7a0b\u4ed3\u5e93\u8fdb\u884c\u5173\u8054\uff0c\u4e00\u79cd\u5e38\u89c1\u7684\u573a\u666f\u662f\u6211\u4eec\u60f3\u8981\u7ed9",(0,i.kt)("em",{parentName:"p"},"Github"),"\u7684\u67d0\u4e2a\u5f00\u6e90\u5e93\u8d21\u732e\u4ee3\u7801\uff0c\u8fd9\u65f6\u5019\u6211\u4eec\u4f1a\u5148",(0,i.kt)("inlineCode",{parentName:"p"},"fork"),"\u5e76\u628a",(0,i.kt)("inlineCode",{parentName:"p"},"fork"),"\u540e\u751f\u6210\u7684\u4ed3\u5e93",(0,i.kt)("inlineCode",{parentName:"p"},"clone"),"\u5230\u672c\u5730\uff0c\u6b64\u65f6",(0,i.kt)("inlineCode",{parentName:"p"},"origin"),"\u4ee3\u8868\u7740\u81ea\u5df1\u7684\u8fdc\u7a0b\u4ed3\u5e93\uff0c\u901a\u5e38\u6211\u4eec\u8fd8\u4f1a\u624b\u52a8\u901a\u8fc7",(0,i.kt)("inlineCode",{parentName:"p"},"git remote add upstream <url>"),"\u6765\u5173\u8054\u539f\u672c\u7684\u5f00\u6e90\u5e93\u7528\u4e8e\u66f4\u65b0\u6700\u65b0\u4ee3\u7801\uff0c\u6b64\u65f6",(0,i.kt)("inlineCode",{parentName:"p"},"upstream"),"\u4ee3\u8868\u539f\u672c\u7684\u5f00\u6e90\u5e93\u3002"),(0,i.kt)("h3",{id:"remote-tracking-branch"},"Remote-Tracking Branch"),(0,i.kt)("p",null,"\u8fdc\u7a0b\u4ed3\u5e93\u7684\u5206\u652f\u901a\u5e38\u88ab\u79f0\u4e3a",(0,i.kt)("strong",{parentName:"p"},"\u8fdc\u7a0b\u5206\u652f"),"\uff08",(0,i.kt)("em",{parentName:"p"},"Remote Branch"),"\uff09\uff0c\u901a\u5e38\u53ef\u4ee5\u5728Github\u6216Gitlab\u4e0a\u8fdb\u884c\u67e5\u770b\u3002"),(0,i.kt)("p",null,"\u4e0e\u4e4b\u76f8\u5173\u7684\u4e00\u4e2a\u91cd\u8981\u6982\u5ff5\u53eb\u505a",(0,i.kt)("strong",{parentName:"p"},"\u8fdc\u7a0b\u8ddf\u8e2a\u5206\u652f"),"\uff08",(0,i.kt)("em",{parentName:"p"},"Remote-Tracking Branch"),"\uff09\uff0c\u901a\u5e38\u4ee5\u7c7b\u4f3c",(0,i.kt)("inlineCode",{parentName:"p"},"origin/master"),"\u7684\u5f62\u5f0f\u8868\u793a\uff0c\u5728\u6267\u884c\u5982",(0,i.kt)("inlineCode",{parentName:"p"},"git fetch"),"\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"git push"),"\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"git pull"),"\u8fd9\u6837\u7684\u8fdc\u7a0b\u64cd\u4f5c\u540egit\u4f1a\u81ea\u52a8\u79fb\u52a8\u5bf9\u5e94\u7684\u8fdc\u7a0b\u8ddf\u8e2a\u5206\u652f\uff0c\u4ee5\u786e\u4fdd\u5b83\u603b\u662f\u6307\u5411\u8fdc\u7a0b\u4ed3\u5e93\u5bf9\u5e94\u7684\u5206\u652f\u3002"),(0,i.kt)("p",null,"\u5728\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"git clone"),"\u6765\u751f\u6210\u672c\u5730\u4ed3\u5e93\u65f6\uff0c\u4e0d\u4ec5\u9ed8\u8ba4\u4f1a\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"origin"),"\u6765\u8868\u793a\u8fdc\u7a0b\u4ed3\u5e93\uff0c\u8fd8\u4f1a\u81ea\u52a8\u7ed9\u672c\u5730\u5206\u652f\u5efa\u7acb\u8ffd\u8e2a\u5173\u7cfb\uff0c\u5982",(0,i.kt)("inlineCode",{parentName:"p"},"master"),"\u5206\u652f\u4f1a\u81ea\u52a8\u8ffd\u8e2a",(0,i.kt)("inlineCode",{parentName:"p"},"origin/master"),"\uff0c\u6b64\u65f6\u4e5f\u4f1a\u628a",(0,i.kt)("inlineCode",{parentName:"p"},"master"),"\u5206\u652f\u79f0\u4e3a",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"Tracking Branch")),"\uff0c\u628a",(0,i.kt)("inlineCode",{parentName:"p"},"origin/master"),"\u79f0\u4e3a",(0,i.kt)("strong",{parentName:"p"},"\u4e0a\u6e38\u5206\u652f"),"\uff08Upstream branch\uff09\u3002\u4e8b\u5b9e\u4e0a\uff0c\u5f53\u4e0d\u6307\u5b9a\u5206\u652f\u4fe1\u606f\u76f4\u63a5\u6267\u884c",(0,i.kt)("inlineCode",{parentName:"p"},"git push"),"\u6216",(0,i.kt)("inlineCode",{parentName:"p"},"git pull"),"\u65f6\uff0c\u4f1a\u6839\u636e\u5f53\u524d\u5206\u652f\u7684\u8ffd\u8e2a\u5173\u7cfb\u6765\u51b3\u5b9a\u76ee\u6807\u5206\u652f\u3002"),(0,i.kt)("h4",{id:"git-branch--vv"},"git branch -vv"),(0,i.kt)("p",null,"\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"git branch -vv"),"\u53ef\u4ee5\u67e5\u770b\u6240\u6709\u7684\u8ffd\u8e2a\u4fe1\u606f"),(0,i.kt)("h4",{id:"\u8bbe\u7f6e\u4e0a\u6e38\u5206\u652f"},"\u8bbe\u7f6e\u4e0a\u6e38\u5206\u652f"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u5e0c\u671bfeature\u5206\u652f\u8ddf\u8e2aorigin/master\u5206\u652f\u7684\u56db\u79cd\u5199\u6cd5\ngit branch -u origin/master <branchname>\ngit branch -u origin/master # \u4e0d\u6307\u5b9abranchname\u65f6\u9ed8\u8ba4\u4e3a\u5f53\u524d\u5206\u652f\n\ngit branch --set-upstream-to=origin/master <branchname>\ngit branch --set-upstream-to=origin/master\n")),(0,i.kt)("h3",{id:"git-fetch"},"git fetch"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u83b7\u53d6\u6240\u6709remote\u7684\u8fdc\u7a0b\u63d0\u4ea4\u548c\u5206\u652f\ngit fetch \n\n# \u62c9\u53d6origin remote\u7684\u8fdc\u7a0b\u63d0\u4ea4\u548c\u5206\u652f\ngit fetch origin \n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"git fetch"),"\u4f1a\u62c9\u53d6\u76ee\u6807",(0,i.kt)("inlineCode",{parentName:"p"},"remote"),"\u7684\u6240\u6709\u63d0\u4ea4\u5e76\u66f4\u65b0\u672c\u5730\u7684\u8fdc\u7a0b\u8ddf\u8e2a\u5206\u652f\u3002\u56e0\u6b64\u53ef\u4ee5\u76f4\u63a5",(0,i.kt)("inlineCode",{parentName:"p"},"git rebase"),"\u6700\u65b0\u7684\u8fdc\u7a0b\u8ddf\u8e2a\u5206\u652f\u6765\u83b7\u53d6\u6700\u65b0\u7684\u4ee3\u7801\uff0c\u6bd4\u5982\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"git fetch && git rebase origin/master\n")),(0,i.kt)("h3",{id:"git-pull"},"git pull"),(0,i.kt)("p",null,"\u672c\u8d28\u4e0a\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"git pull"),"\u547d\u4ee4\u4f1a\u4f7f\u7528\u7ed9\u5b9a\u7684\u53c2\u6570\u8fd0\u884c",(0,i.kt)("inlineCode",{parentName:"p"},"git fetch"),"\u547d\u4ee4\uff0c\u5e76\u9ed8\u8ba4\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"git merge"),"\u7b56\u7565\u6765\u5408\u5e76\u76ee\u6807\u5206\u652f\uff0c\u56e0\u6b64",(0,i.kt)("inlineCode",{parentName:"p"},"git pull origin master"),"\u7b49\u4ef7\u4e8e",(0,i.kt)("inlineCode",{parentName:"p"},"git fetch origin master && git merge origin/master"),"\u3002"),(0,i.kt)("p",null,"\u6211\u4eec\u4e5f\u53ef\u4ee5\u8c03\u6574",(0,i.kt)("inlineCode",{parentName:"p"},"git pull"),"\u65f6\u91c7\u7528\u7684\u5206\u652f\u5408\u5e76\u7b56\u7565\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"git config pull.rebase false # git merge\uff08\u9ed8\u8ba4\uff09\ngit config pull.rebase true # git rebase\uff08\u4e2a\u4eba\u63a8\u8350\uff09\ngit config pull.ff only # git merge but fast-forward only\n")),(0,i.kt)("h3",{id:"git-push"},"git push"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"git push"),"\u7528\u4e8e\u63a8\u9001\u6307\u5b9a\u5206\u652f\u5230\u76ee\u6807",(0,i.kt)("inlineCode",{parentName:"p"},"remote"),"\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"git push origin main # \u5c06\u672c\u4ed3\u5e93\u7684main\u5206\u652f\u63a8\u9001\u5230origin\u7684main\u5206\u652f\n\ngit push origin test --delete # \u5220\u9664\u8fdc\u7a0b\u5206\u652f\n")),(0,i.kt)("p",null,"\u66f4\u8fdb\u9636\u7684\u7528\u6cd5\uff0c\u6211\u4eec\u53ef\u4ee5\u628a\u672c\u5730\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"A"),"\u5206\u652f\u63a8\u9001\u5230\u8fdc\u7a0b\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"B"),"\u5206\u652f"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"git push origin branchA:branchB\n")),(0,i.kt)("h2",{id:"\u7248\u672c\u56de\u9000"},"\u7248\u672c\u56de\u9000"),(0,i.kt)("p",null,"\u901a\u8fc7",(0,i.kt)("inlineCode",{parentName:"p"},"git reset --hard"),"\u5373\u53ef\u5b9e\u73b0\u7248\u672c\u56de\u9000\u548c\u524d\u8fdb\uff0c\u672c\u8d28\u4e0a\u662f\u5207\u6362",(0,i.kt)("inlineCode",{parentName:"p"},"HEAD"),"\u6307\u9488\u6240\u6307\u5411\u7684\u63d0\u4ea4\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"HEAD^"),"\u8868\u793a",(0,i.kt)("inlineCode",{parentName:"p"},"HEAD"),"\u7684\u4e0a\u4e00\u4e2a\u63d0\u4ea4\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"HEAD~2"),"\u8868\u793a",(0,i.kt)("inlineCode",{parentName:"p"},"HEAD"),"\u7684\u4e0a\u4e24\u4e2a\u63d0\u4ea4\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u56de\u9000\u5230\u4e0a\u4e00\u4e2acommit\ngit reset --hard HEAD^ \ngit reset --hard Head^^ \ngit reset --hard Head~3 \n\n # \u56de\u9000\u5230\u4e0a\u4e00\u4e2acommit\uff0c\u4f46\u5f53\u524dcommit\u4fee\u6539\u7684\u5185\u5bb9\u5e76\u4e0d\u4f1a\u6d88\u5931\uff0c\u800c\u662f\u4fdd\u5b58\u5728\u5de5\u4f5c\u76ee\u5f55\u4e2d\ngit reset head^\n")),(0,i.kt)("p",null,"\u9664\u4e86",(0,i.kt)("inlineCode",{parentName:"p"},"git reset"),"\uff0c\u6211\u4eec\u8fd8\u53ef\u4ee5\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"git revert"),"\u6765\u64a4\u9500\u67d0\u6b21\u7684\u63d0\u4ea4\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"git revert"),"\u4f1a\u4ea7\u751f\u4e00\u4e2a\u65b0\u7684\u63d0\u4ea4\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u64a4\u9500\u5f53\u524dcommit\ngit revert HEAD \n")),(0,i.kt)("h2",{id:"git-rebase--i"},"git rebase -i"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"git rebase -i origin/main \n")),(0,i.kt)("p",null,"\u901a\u8fc7\u4ea4\u4e92\u5f0f\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"git rebase"),"\u53ef\u4ee5\u5b9e\u73b0\u63d0\u4ea4\u7684\u538b\u7f29\u3001\u5220\u9664\u3001\u987a\u5e8f\u5207\u6362\u3001\u7f16\u8f91\u67d0\u4e2a\u5386\u53f2\u63d0\u4ea4\u7b49\u529f\u80fd\u3002"),(0,i.kt)("h2",{id:"git-cherry-pick"},"git cherry-pick"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"git cherry-pick <commit>\n")),(0,i.kt)("h2",{id:"\u5e95\u5c42\u539f\u7406"},"\u5e95\u5c42\u539f\u7406"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("a",{parentName:"p",href:"https://zhuanlan.zhihu.com/p/96631135"},"\u53c2\u8003"))),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"commit"),"\u8282\u70b9\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"tree"),"\u8282\u70b9\u8bb0\u5f55\u7740\u67d0\u4e2a\u65f6\u523b\u5bf9\u5e94\u7684\u6587\u4ef6\u4fe1\u606f\uff0c\u8fd9\u4e9b\u5bf9\u5e94\u7684\u6587\u4ef6\u4fdd\u5b58\u5728\u7d22\u5f15\u533a\u57df\u4e2d\uff08\u4e25\u683c\u6765\u8bf4\uff0c\u8fd9\u4e9b\u6587\u4ef6\u88ab\u5f53\u4f5c ",(0,i.kt)("inlineCode",{parentName:"p"},"object"),"\u8282\u70b9\u5b58\u4e8e ",(0,i.kt)("inlineCode",{parentName:"p"},"git"),"\u4ed3\u5e93\u4e2d\uff0c\u7d22\u5f15\u6307\u5411\u7740\u8fd9\u4e9b\u6587\u4ef6\uff09\uff0c\u5f53\u6211\u4eec\u5207\u6362\u5230\u67d0\u4e2a ",(0,i.kt)("inlineCode",{parentName:"p"},"commit"),"\u65f6\uff0c\u4f1a\u6839\u636e\u7d22\u5f15\u628a\u5bf9\u5e94\u7684\u6587\u4ef6\u540c\u6b65\u5230\u5de5\u4f5c\u76ee\u5f55\u4e2d\u3002"),(0,i.kt)("p",null,"\u901a\u5e38\u5f53\u6211\u4eec\u4fee\u6539\u5de5\u4f5c\u76ee\u5f55\u4e2d\u7684\u6587\u4ef6\u540e\uff0c\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"git add"),"\u628a\u66f4\u65b0\u540c\u6b65\u5230\u7d22\u5f15\u4e2d\uff08\u5373\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"git"),"\u4ed3\u5e93\u4e2d\u521b\u5efa\u4e00\u4e2a\u65b0\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"object"),"\u7ed3\u70b9\uff0c\u5e76\u66f4\u65b0\u7d22\u5f15\u7684\u6307\u5411\uff09\uff0c\u7136\u540e\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"git commit"),"\u6765\u751f\u6210\u4e00\u4e2a\u65b0\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"commit"),"\u8282\u70b9\uff08\u5373\u5148\u6839\u636e\u7d22\u5f15\u7684\u6307\u5411\u751f\u6210\u4e00\u4e2a ",(0,i.kt)("inlineCode",{parentName:"p"},"tree"),"\u8282\u70b9\uff0c\u518d\u751f\u6210 ",(0,i.kt)("inlineCode",{parentName:"p"},"commit"),"\u8282\u70b9\uff09\uff0c\u65b0\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"commit"),"\u8282\u70b9\u8bb0\u5f55\u7740\u65b0\u7684\u6587\u4ef6\u4fe1\u606f\u3002"),(0,i.kt)("p",null,"\u5047\u8bbe ",(0,i.kt)("inlineCode",{parentName:"p"},"commitA"),"\u548c ",(0,i.kt)("inlineCode",{parentName:"p"},"commitB"),"\u90fd\u8bb0\u5f55\u7740\u6587\u4ef6 ",(0,i.kt)("inlineCode",{parentName:"p"},"test"),"\uff0c\u90a3\u4e48\u5f53\u6211\u4eec\u5904\u4e8e ",(0,i.kt)("inlineCode",{parentName:"p"},"commitA"),"\u65f6\u5e76\u4fee\u6539\u5de5\u4f5c\u76ee\u5f55\u7684\u6587\u4ef6\u540e\uff0c\u6216\u8005\u5df2\u7ecf\u540c\u6b65\u5230\u7d22\u5f15\u533a\u57df\uff0c\u53ea\u8981\u8fd8\u6ca1\u6709\u63d0\u4ea4\u8bb0\u5f55\u7684\u8bdd\uff0c\u8fd9\u65f6\u5019\u5982\u679c\u6211\u4eec\u5207\u6362\u5230 ",(0,i.kt)("inlineCode",{parentName:"p"},"commitB"),"\uff0c\u90a3\u6211\u4eec\u7684\u672c\u5730\u4fee\u6539\u4f1a\u540c\u6b65\u5230 ",(0,i.kt)("inlineCode",{parentName:"p"},"commitB"),"\u5f53\u4e2d\u3002"),(0,i.kt)("p",null,"\u4e0d\u8fc7\uff0c\u5982\u679c\u6211\u4eec\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"commitA"),"\u8bb0\u5f55\u7740\u6587\u4ef6 ",(0,i.kt)("inlineCode",{parentName:"p"},"a"),"\uff0c\u800c ",(0,i.kt)("inlineCode",{parentName:"p"},"commitB"),"\u4e2d\u4e0d\u5b58\u5728\u6587\u4ef6 ",(0,i.kt)("inlineCode",{parentName:"p"},"a"),"\uff0c\u7136\u540e\u6211\u4eec\u5904\u4e8e ",(0,i.kt)("inlineCode",{parentName:"p"},"commitA"),"\u65f6\u4fee\u6539\u6587\u4ef6 ",(0,i.kt)("inlineCode",{parentName:"p"},"a"),"\uff0c\u8fd9\u65f6\u5019\u76f4\u63a5\u5207\u6362\u5230 ",(0,i.kt)("inlineCode",{parentName:"p"},"commitB"),"\u5c31\u4f1a\u5931\u8d25\uff0c\u5e76\u4e14\u4f1a\u63d0\u9192\u6211\u4eec\u5e94\u8be5\u5148\u63d0\u4ea4\u6211\u4eec\u7684\u4fee\u6539\uff0c\u6216\u8005\u53ef\u4ee5\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"git stash"),"\u6765\u628a\u6211\u4eec\u7684\u4fee\u6539\u6682\u5b58\u5230 ",(0,i.kt)("inlineCode",{parentName:"p"},"commitA"),"\u4e2d\u3002"),(0,i.kt)("p",null,"\u6bd4\u5982\u6211\u4eec\u53ef\u4ee5\u5148\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"git stash"),"\u6682\u5b58\u4fee\u6539\uff0c\u7136\u540e\u5c31\u53ef\u4ee5\u76f4\u63a5\u5207\u6362\u5230 ",(0,i.kt)("inlineCode",{parentName:"p"},"commitB"),"\u4e86\uff0c\u672a\u6765\u56de\u5230 ",(0,i.kt)("inlineCode",{parentName:"p"},"commitA"),"\u65f6\u53c8\u53ef\u4ee5\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"git stash pop"),"\u628a\u6682\u5b58\u7684\u4fee\u6539\u5185\u5bb9\u62ff\u51fa\u6765\u3002"),(0,i.kt)("h3",{id:"git-object"},"git object"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"# \u663e\u793a\u6240\u6709object\nls .git/objects/\n10/ ea/ 1c/ ... /info /pack\n\n# \u67e5\u770bobject\u7c7b\u578b/\u503c\uff0c\u5e38\u89c1\u7c7b\u578b\uff1ablob(git add \u540e\u521b\u5efa), tree\u548ccommit(git commit \u540e\u521b\u5efa)\ngit cat-file -t 58c9 \ngit cat-file -p 58c9 # 58c9\u4e3a\u60f3\u627e\u7684object\u7684\u503c\n")),(0,i.kt)("h2",{id:"\u5176\u4ed6"},"\u5176\u4ed6"),(0,i.kt)("h3",{id:"gitkeep"},".gitkeep"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"git"),"\u901a\u5e38\u65e0\u6cd5\u8ffd\u8e2a\u7a7a\u6587\u4ef6\u5939\uff0c\u5982\u679c\u6211\u4eec\u8ffd\u8e2a\u7a7a\u6587\u4ef6\u5939\uff0c\u53ef\u4ee5\u5728\u8be5\u6587\u4ef6\u5939\u4e0b\u65b0\u5efa\u4e00\u4e2a\u7a7a\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},".gitkeep"),"\u6587\u4ef6\u3002"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"\u5f53\u6211\u4eec\u65b0\u5efa\u6587\u4ef6 ",(0,i.kt)("inlineCode",{parentName:"p"},"akara.txt"),"\uff0c\u5e76\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"git add ."),"\u6dfb\u52a0\u8fdb\u7f13\u5b58\u533a\u3002\u6b64\u65f6\u6211\u4eec\u53ef\u4ee5\uff1a"),(0,i.kt)("ol",{parentName:"blockquote"},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git commit -m ''"),"\uff1a \u63d0\u4ea4\u8bb0\u5f55\u3002"),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git reset HEAD <file>"),": \u91ca\u653e\u7f13\u5b58\u3002\u7c7b\u4f3c\u7684\u8fd8\u6709 ",(0,i.kt)("inlineCode",{parentName:"li"},"git rm --cached <file>"),"\u7528\u6765\u5220\u9664\u7f13\u5b58\u533a\u7684\u5185\u5bb9")),(0,i.kt)("p",{parentName:"blockquote"},"\u5f53\u6211\u4eec\u65b0\u5efa\u6587\u4ef6 ",(0,i.kt)("inlineCode",{parentName:"p"},"akara.txt"),"\uff0c\u5e76\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"git add ."),"\u6dfb\u52a0\u8fdb\u7f13\u5b58\u533a\uff0c\u4e4b\u540e\u4fee\u6539\u8be5\u6587\u4ef6\u7684\u5185\u5bb9\u3002\u6b64\u65f6\u6211\u4eec\u53ef\u4ee5\uff1a"),(0,i.kt)("ol",{parentName:"blockquote"},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git add ."),"\uff1a\u7f13\u5b58\u4fee\u6539\u540e\u7684\u5185\u5bb9\u3002"),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git checkout -- <file> "),"\uff1a\u4e22\u5f03\u4fee\u6539\u7684\u5185\u5bb9\u3002\u672c\u8d28\u662f\u7528\u539f\u672c\u7f13\u5b58\u533a\u7684\u5185\u5bb9\u66ff\u4ee3\u5de5\u4f5c\u76ee\u5f55\u4e2d\u7684\u6587\u4ef6\u5185\u5bb9\u3002"))))}s.isMDXComponent=!0}}]);