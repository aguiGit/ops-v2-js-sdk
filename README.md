# Install
```bash
$ npm i ops-sdk-js
```

# Usage
```js
const ops = require('./index');

let chainId = 3; //链ID 1:OPS主网 2：OPS测试网 3以上其他链
let passWord = "";
let prefix = "semo"; //链前缀

//创建地址
const newAddress = ops.newAddress(chainId, passWord, prefix);
console.log(newAddress);

//导入地址
const key ="";
const importAddress = ops.importByKey(chainId, key, passWord,prefix);
console.log(importAddress);



