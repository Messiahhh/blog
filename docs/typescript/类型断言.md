# 类型断言

``` tsx
const el = document.querySelector('.el') as HTMLCanvasElement 

// or

const el = <HTMLCanvasElement>document.querySelector('.el')
```



## const assertion

``` tsx
let obj = {
    name: 'aka' // string
}

let obj = {
    name: 'aka' // readonly 'aka' 
} as const
```

`const`断言还可以把数组断言成只读元组：

``` tsx
let arr = [1, 2, 3] as const
```



## Not-null assertion

``` tsx
function liveDangerously(x?: number | undefined) {
  console.log(x!.toFixed());
}
```



## assertion function

``` ts
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') throw new Error('Assert Error')
}

declare const value: unknown;
isNumber(value)

value.toFixed()
value.toPrecision()
```


