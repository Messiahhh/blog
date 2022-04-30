# `tsconfig.json`

``` json
{
  // 指定待编译的文件
  "files": [
      
  ],
  // 指定待编译文件的目录
  "include": [
      
  ],
  // 指定哪些文件不被编译，默认值包括node_modules等
  "exclude": [
      
  ],
  "compilerOptions": {
    	// 编译产物的输出目录
      "outDir": "dist",
      // 根据多个源文件生成一个产物，可搭配`emitDeclarationOnly`来生成一份完整的声明文件
      "outFile": "./test.js",
       
      
      // 生成声明文件
      "declaration": true, 
    	// 只生成声明文件
    	"emitDeclarationOnly": true,
      // 生成sourceMap文件
      "sourceMap": true,
    	// 不生成编译产物
      "noEmit": true, 
    
      "allowJs": true, // 允许编译JS文件
      "checkJs": true, // 检查JS文件语法
      "strict": true, // 严格模式
      "jsx": "react", // 支持react jsx
        
     	/**
       * 编译目标
       */
      "target": "es5", 
      "lib": [
        "dom",
        "dom.iterable",
        "esnext"
      ],
      // 跳过.d.ts的类型检查，节约时间
      "skipLibCheck": true,
    
      /**
       * 编译后产物的模块类型
       */
      "module": "esnext", // commonjs es6 amd

      /**
       * module为commonjs时为node（推荐），否则为classic。
       * 使用和node类似的模块解析策略
       */
      "moduleResolution": "node",

      /**
       * TypeScript在编译前会先进行模块解析，被解析的模块之后也会被TypeScript编译
       * 通过noResolve: true可以关闭解析功能
       * import fs from 'fs' // 报错
       */
      "noResolve": true,

      /**
       * 当使用baseUrl，绝对路径是相对于baseUrl的
       * 如import A from 'lib/test' 
       * 实际的路径是baseUrl和'lib/test'拼接后的结果./src/lib/test（相对于tsconfig.json）
       */
      "baseUrl": "./src",

      /**
       * 路径映射
       * webpack设置了resolve.alias的时候需要
       * 使用时通常设置"baseUrl": "."
       */
      "paths": {  
        "@test/*": ["./src/test/*"],
        "jquery": ["node_modules/jquery/dist/jquery"] // This mapping is relative to "baseUrl"
      },
      
        
      /**
       * 没有指定`types`字段时，`node_modules/@types`下的所有库的入口声明文件都会生效，但当指定了
       * `types`字段，只有`types`包含的类型模块才会生效
       */
      "types": [],
      "typeRoots": ["node_modules/@types"],

      "esModuleInterop": true, // 模块互通
      /**
       * 允许从没有设置默认导出的模块中默认导入
       * esModuleInterop为true时默认开启
       */
      "allowSyntheticDefaultImports": true, 
      /**
       * 开启时，被编译的所有文件必须是模块（import/export）而不能是脚本
       */
      "isolatedModules": true,
        
      "noEmitOnError": false, // 错误时不生成产物
      "noImplicitAny": true // 参数如果是隐式any类型，就会报错
    	/**
    	 * let str: string = undefined // 默认不会报错, 为true时报错
    	 * let str: string | undefined // 为true时需要这样写
    	 */
    	"strictNullChecks": true
  },
  
  
  // 继承配置文件
  "extends": "./config/base"
}
```


