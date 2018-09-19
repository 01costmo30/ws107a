# 習題1

請寫一個 server

1. 如果路徑是 /hello, 就輸出 "你好"
2. 如果路徑是 /name,  就輸出 "你的名字"
3. 如果路徑是 /id,  就輸出 "你的學號"
4. 否則請輸出 404 

提示

```js
switch (req.url) {
  case '/hello': .... break;
  case '/name': .... break;
  ...
}
```

參考資料：https://nodejust.com/nodejs-routing-request/zh-cn/
         https://stackoverflow.com/questions/16056591/font-scaling-based-on-width-of-container
         https://stackoverflow.com/questions/28822034/simple-node-js-server-that-sends-htmlcss-as-response