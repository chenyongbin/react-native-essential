# pipeline  

实现同时多次调用一个异步方法时只执行一次异步操作的管道方法，详细介绍看[这里](https://juejin.im/post/5dbd2c426fb9a020594d12ee)。  

## @1.0  

### 引入路径  

```js
import { default as pipeline } from "react-native-essential/utils/pipeline/@1.0";
```  

**入参**  

| 名称 | 类型 | 说明 | 是否必填 | 默认值 |  
| - | - | - | :-: | :- |   
| target | `T` | 目标函数 | 是 | 无 |   

**出参**  

| 名称 | 类型 | 说明 | 
| - | - | - | 
| wrapper | `Function` | 包装后的函数 |  