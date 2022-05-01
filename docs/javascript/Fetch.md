``` javascript
fetch(url, options).then(res => res.json()).then(data => console.log(data))
```

通常我们可以使用`Content-Disposition: attachment`响应头部来下载资源。

不过似乎我们只能靠`a`标签/`form`表单/`window.open`来下载资源，如果使用`ajax`/`fetch`请求资源，并不会默认下载资源。

不过想要使用`fetch`来下载资源依然是有办法的。

``` js
fetch()
.then(res => res.blob())
.then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'example.xlsx';
    a.href = url;
    document.body.appendChild(a);
    a.click();
})
```





## Diff with Ajax 

1. AJAX和Fetch发送同源请求时都默认携带Cookie，跨域请求则都默认不携带Cookie。

   当我们使用CORS来进行跨域的时候，若想使其携带Cookie。

   服务端设置

   ``` http
   Access-Control-Allow-Credentials: true
   ```

   若想要使我们的Ajax或Fetch携带Cookie，只需如此。

   ``` javascript
   // Ajax
   var xhr = new XMLHttpRequest()
   xhr.withCredentials = true
   
   // Fetch
   fetch(url, {
       credentials: "include"
   })
   ```

   Fetch的credentials属性，默认值为same-origin，想要跨域发送Cookie则设置为include

   - `omit`: 从不发送cookies.
   - `same-origin`: 只有当URL与响应脚本同源才发送 cookies、 HTTP Basic authentication 等验证信息.(浏览器默认值,在旧版本浏览器，例如safari 11依旧是omit，safari 12已更改)
   - `include`: 不论是不是跨域的请求,总是发送请求资源域在本地的 cookies、 HTTP Basic authentication 等验证信息.

2. ajax原生支持abort，fetch需要使用AbortController才能实现abort

   ``` js
   // ajax
   xhr.abort()
   
   // fetch
   let controller = new AbortController()
   let signal = controller.signal
   
   fetch(url, {
       signal
   })
   
   controller.abort()
   
   ```

3. fetch不支持超时控制

   何为超时控制。比如我们请求一个后端不存在的接口，同时后端没有做`fallback`处理，那么我们就请求不到资源，并可能等上十多秒才能看到错误信息。

   ``` js
   // 如果2S内没有收到响应，则Cancel这次通信
   xhr.timeout = 2000 
   xhr.ontimeout = () => {}
   ```

   我们如何实现**fetch的超时控制**，不过此时通信依然存在，并没有手动`cancel/abort`掉

   ``` javascript
   Promise.race([
       fetch(url),
       new Promise((resolve, reject) => {
           setTimeout(() => reject(new Error("request timeout")), 2000)
       })
   ])
   .then(data => {}) // 请求成功
   .catch(reason => {}) // 请求失败
   ```

4. fetch无法检测请求的进度(onprogress)


